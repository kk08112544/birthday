<template>
  <q-page class="log-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="history" size="2rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">บันทึกกิจกรรม</h1>
            <p class="hero-sub">ประวัติการเปลี่ยนแปลงเทศกาลทั้งหมด</p>
          </div>
        </div>
        <div class="hero-actions">
          <q-btn
            unelevated
            icon="arrow_back"
            label="กลับ"
            class="hero-back-btn"
            :class="$q.screen.xs ? 'full-width' : ''"
            @click="$router.back()"
          />
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <!-- Top Bar -->
      <div class="top-bar">
        <q-input
          v-model="search"
          placeholder="ค้นหาใน log..."
          outlined
          rounded
          dense
          debounce="400"
          class="search-bar"
          bg-color="white"
          @update:model-value="onSearch"
        >
          <template v-slot:prepend><q-icon name="search" color="grey-5" /></template>
          <template v-slot:append>
            <q-icon
              v-if="search"
              name="close"
              color="grey-5"
              class="cursor-pointer"
              @click="clearSearch"
            />
          </template>
        </q-input>
      </div>

      <!-- Filter Pills -->
      <div class="filter-row">
        <button
          v-for="f in filterOptions"
          :key="f.value"
          class="filter-pill"
          :class="[`filter-pill--${f.value}`, { active: activeAction === f.value }]"
          @click="setAction(f.value)"
        >
          <q-icon :name="f.icon" size="14px" class="q-mr-xs" />
          {{ f.label }}
          <span class="pill-count">{{ f.count }}</span>
        </button>
      </div>

      <!-- TABLE CARD -->
      <div class="table-card">
        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="rowKey"
          v-model:pagination="pagination"
          :loading="loading"
          binary-state-sort
          @request="onTableRequest"
          :rows-per-page-options="[10, 20, 50]"
          :table-style="$q.screen.xs ? 'font-size: 0.8rem' : ''"
          class="styled-table"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="deep-orange-5" />
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <span class="action-badge" :class="`action-badge--${props.row.action.toLowerCase()}`">
                <q-icon :name="actionIcon(props.row.action)" size="13px" class="q-mr-xs" />
                {{ actionLabel(props.row.action) }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-festival="props">
            <q-td :props="props">
              <div class="fest-cell">
                <q-icon name="celebration" size="14px" class="fest-cell-icon" />
                <span class="fest-cell-name">{{ props.row.festivalName }}</span>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actor="props">
            <q-td :props="props">
              <div class="actor-wrap">
                <div class="actor-avatar-outer">
                  <div
                    class="actor-avatar"
                    :class="`actor-avatar--${getAvatarColor(props.row.actorName)}`"
                  >
                    <span class="actor-initial">{{ getInitial(props.row.actorName) }}</span>
                    <span class="actor-avatar-shine" />
                  </div>
                </div>
                <div class="actor-info">
                  <span class="actor-name">{{ props.row.actorName }}</span>
                  <div class="actor-meta-row">
                    <span class="actor-username-chip">
                      <span class="actor-at-symbol">@</span>{{ props.row.actorUsername }}
                    </span>
                    <span class="role-badge" :class="`role-badge--${props.row.actorRole}`">
                      {{ getRoleLabel(props.row.actorRole) }}
                    </span>
                  </div>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-diff="props">
            <q-td :props="props">
              <template v-if="props.row.action === 'UPDATE'">
                <div v-if="props.row.changedFields.length > 0">
                  <div v-for="diff in props.row.changedFields" :key="diff.key" class="diff-row">
                    <span class="diff-old">{{ diff.old }}</span>
                    <q-icon name="arrow_forward" size="13px" class="diff-arrow" />
                    <span class="diff-new">{{ diff.new }}</span>
                  </div>
                </div>
                <div v-else class="diff-no-change">
                  <q-icon name="info_outline" size="13px" class="q-mr-xs" />
                  อัปเดตข้อมูล
                </div>
              </template>
              <span v-else class="no-diff">—</span>
            </q-td>
          </template>

          <template v-slot:body-cell-ts="props">
            <q-td :props="props">
              <div class="ts-block">
                <div class="ts-date-pill">
                  <q-icon name="calendar_month" size="11px" class="ts-pill-icon" />
                  <span>{{ formatDateOnly(props.row.ts) }}</span>
                </div>
                <div class="ts-time-row">
                  <q-icon name="schedule" size="11px" class="ts-clock-icon" />
                  <span class="ts-time-text">{{ formatTimeOnly(props.row.ts) }}</span>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="actions-wrap">
                <q-btn
                  unelevated
                  round
                  dense
                  color="orange-1"
                  icon="visibility"
                  size="sm"
                  class="action-btn action-btn--view"
                  @click="onView(props.row)"
                >
                  <q-tooltip class="bg-deep-orange-8">ดูรายละเอียด</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:no-data>
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <div class="empty-title">ไม่พบรายการ</div>
              <div class="empty-sub">ลองค้นหาด้วยคำอื่น หรือเลือกประเภทอื่น</div>
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <!-- ===== VIEW DIALOG ===== -->
    <q-dialog v-model="viewDialog" persistent :maximized="$q.screen.xs">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.xs }">
        <div v-if="$q.screen.xs" class="dialog-drag-handle" />

        <div class="dialog-header dialog-header--orange">
          <div class="dialog-header-icon dialog-header-icon--orange">
            <q-icon name="manage_search" color="white" size="18px" />
          </div>
          <div class="dialog-header-text">
            <span class="dialog-header-title">รายละเอียดบันทึก</span>
            <span class="dialog-header-sub" v-if="viewRow">{{ actionLabel(viewRow.action) }}</span>
          </div>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="viewDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>

        <div class="dialog-body" v-if="viewRow">
          <!-- ประเภท -->
          <div class="view-section">
            <div class="view-field-label">ประเภทการดำเนินการ</div>
            <span class="action-badge" :class="`action-badge--${viewRow.action.toLowerCase()}`">
              <q-icon :name="actionIcon(viewRow.action)" size="13px" class="q-mr-xs" />
              {{ actionLabel(viewRow.action) }}
            </span>
          </div>

          <!-- เทศกาล -->
          <div class="view-section">
            <div class="view-field-label">เทศกาล</div>
            <div class="fest-cell fest-cell--view">
              <q-icon name="celebration" size="15px" class="fest-cell-icon" />
              <span class="fest-cell-name">{{ viewRow.festivalName }}</span>
            </div>
          </div>

          <!-- ผู้ดำเนินการ -->
          <div class="view-section">
            <div class="view-field-label">ผู้ดำเนินการ</div>
            <div class="actor-wrap">
              <div class="actor-avatar-outer">
                <div
                  class="actor-avatar"
                  :class="`actor-avatar--${getAvatarColor(viewRow.actorName)}`"
                >
                  <span class="actor-initial">{{ getInitial(viewRow.actorName) }}</span>
                  <span class="actor-avatar-shine" />
                </div>
              </div>
              <div class="actor-info">
                <span class="actor-name">{{ viewRow.actorName }}</span>
                <div class="actor-meta-row">
                  <span class="actor-username-chip">
                    <span class="actor-at-symbol">@</span>{{ viewRow.actorUsername }}
                  </span>
                  <span class="role-badge" :class="`role-badge--${viewRow.actorRole}`">
                    {{ getRoleLabel(viewRow.actorRole) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- การเปลี่ยนแปลง -->
          <div class="view-section" v-if="viewRow.action === 'UPDATE'">
            <div class="view-field-label">การเปลี่ยนแปลง</div>
            <div v-if="viewRow.changedFields.length > 0" class="diff-wrap">
              <div v-for="d in viewRow.changedFields" :key="d.key" class="diff-row">
                <span class="diff-old">{{ d.old }}</span>
                <q-icon name="arrow_forward" size="14px" class="diff-arrow" />
                <span class="diff-new">{{ d.new }}</span>
              </div>
            </div>
            <div v-else class="diff-no-change">
              <q-icon name="info_outline" size="13px" class="q-mr-xs" />
              อัปเดตข้อมูลโดยไม่มีการเปลี่ยนแปลง
            </div>
          </div>

          <!-- วันที่/เวลา -->
          <div class="view-section">
            <div class="view-field-label">วันที่/เวลา</div>
            <div class="ts-block">
              <div class="ts-date-pill">
                <q-icon name="calendar_month" size="11px" class="ts-pill-icon" />
                <span>{{ formatDateOnly(viewRow.ts) }}</span>
              </div>
              <div class="ts-time-row">
                <q-icon name="schedule" size="11px" class="ts-clock-icon" />
                <span class="ts-time-text">{{ formatTimeOnly(viewRow.ts) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-footer" :class="{ 'dialog-footer--mobile': $q.screen.xs }">
          <button type="button" class="dlg-btn dlg-btn--cancel" @click="viewDialog = false">
            ปิด
          </button>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import type { QTableProps, QTableColumn } from 'quasar';
import type { AxiosError } from 'axios';

type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

interface CreatedByUser {
  uId?: number;
  firstName?: string;
  userName?: string;
  role?: string;
}

interface WisherItem {
  wId?: number;
  wishWord?: string;
  festivalId?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

interface CardItem {
  cId?: number;
  imageCard?: string;
  festivalId?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

interface LogData {
  fId?: number;
  festivalName?: string;
  image?: string;
  logo?: string;
  webName?: string;
  startDate?: string;
  endDate?: string;
  isEdit?: boolean;
  isDelete?: boolean;
  isEditStartEndDate?: boolean;
  createdBy?: number;
  updatedBy?: number | null;
  deletedBy?: number | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  createdByUser?: CreatedByUser;
  updatedByUser?: CreatedByUser | null;
  deletedByUser?: CreatedByUser | null;
  wisher?: WisherItem[];
  card?: CardItem[];
  [key: string]: unknown;
}

interface RawLogEntry {
  raw: string;
  timestamp: string;
  action: string;
  data?: LogData;
  oldData?: LogData;
  newData?: LogData;
}

interface Diff {
  key: string;
  old: string;
  new: string;
}

interface TableRow {
  rowKey: string;
  displayIndex: number;
  action: string;
  festivalName: string;
  actorName: string;
  actorUsername: string;
  actorRole: string;
  ts: string;
  rawEntry: RawLogEntry;
  changedFields: Diff[];
}

interface Particle {
  id: number;
  style: Record<string, string>;
}

const $q = useQuasar();

const rows = ref<TableRow[]>([]);
const loading = ref(false);
const search = ref('');
const activeAction = ref('ALL');
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

const createCount = ref(0);
const updateCount = ref(0);
const deleteCount = ref(0);
const serverPage = ref(1);
const serverLimit = ref(10);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: '',
  descending: false,
});

const columns: QTableColumn[] = [
  { name: 'no', label: '#', field: 'displayIndex', align: 'center', style: 'width: 48px' },
  { name: 'action', label: 'ประเภท', field: 'action', align: 'left', style: 'width: 100px' },
  {
    name: 'festival',
    label: 'เทศกาล',
    field: 'festivalName',
    align: 'left',
    style: 'width: 200px',
  },
  { name: 'actor', label: 'Admin', field: 'actorName', align: 'left', style: 'width: 200px' },
  { name: 'diff', label: 'การเปลี่ยนแปลง', field: 'changedFields', align: 'left' },
  { name: 'ts', label: 'วันที่/เวลา', field: 'ts', align: 'left', style: 'width: 140px' },
  { name: 'actions', label: '', field: 'actions', align: 'center', style: 'width: 60px' },
];

const filterOptions = computed(() => [
  {
    value: 'ALL',
    label: 'ทั้งหมด',
    icon: 'list_alt',
    count: createCount.value + updateCount.value + deleteCount.value,
  },
  { value: 'CREATE', label: 'สร้าง', icon: 'add_circle_outline', count: createCount.value },
  { value: 'UPDATE', label: 'แก้ไข', icon: 'edit_note', count: updateCount.value },
  { value: 'DELETE', label: 'ลบ', icon: 'delete_outline', count: deleteCount.value },
]);

const viewDialog = ref(false);
const viewRow = ref<TableRow | null>(null);

function onView(row: TableRow): void {
  viewRow.value = row;
  viewDialog.value = true;
}

const AVATAR_PALETTES = [
  'orange',
  'indigo',
  'teal',
  'rose',
  'amber',
  'sky',
  'emerald',
  'fuchsia',
] as const;

function getAvatarColor(name: string): string {
  const code = (name || '').charCodeAt(0) || 0;
  return AVATAR_PALETTES[code % AVATAR_PALETTES.length]!;
}

function getInitial(name: string): string {
  if (!name) return '?';
  const parts = name.split('-');
  const target = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  return (target?.trim().charAt(0) ?? '?').toUpperCase();
}

function getRoleLabel(role: string): string {
  const map: Record<string, string> = { superAdmin: 'Super Admin', admin: 'Admin' };
  return map[role] ?? role ?? '-';
}

function parseLogLine(line: string): RawLogEntry {
  const tsMatch = line.match(/^(\S+Z)/);
  const timestamp = tsMatch?.[1] ?? '';
  const actionMatch = line.match(/\[(CREATE|UPDATE|DELETE)\]/);
  const action = actionMatch?.[1] ?? 'UNKNOWN';

  if (action === 'UPDATE') {
    const oldMatch = line.match(/OLD:\s*(\{.*?\})\s*\|/s);
    const newMatch = line.match(/\|\s*NEW:\s*(\{.*\})/s);
    try {
      const oldData: LogData = oldMatch ? JSON.parse(oldMatch[1]!) : {};
      const newData: LogData = newMatch ? JSON.parse(newMatch[1]!) : {};
      return { raw: line, timestamp, action, oldData, newData };
    } catch {
      return { raw: line, timestamp, action };
    }
  } else {
    const jsonMatch = line.match(/\]\s*(\{.*\})/s);
    try {
      const data: LogData = jsonMatch ? JSON.parse(jsonMatch[1]!) : {};
      return { raw: line, timestamp, action, data };
    } catch {
      return { raw: line, timestamp, action };
    }
  }
}

const SKIP_KEYS = new Set(['createdAt', 'updatedAt', 'deletedAt']);

function getChangedFields(entry: RawLogEntry): Diff[] {
  if (!entry.oldData || !entry.newData) return [];
  const keys = new Set([...Object.keys(entry.oldData), ...Object.keys(entry.newData)]);
  const result: Diff[] = [];

  const normalize = (v: unknown): string => {
    if (v === null || v === undefined || v === '') return '';
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
    try {
      return JSON.stringify(v);
    } catch {
      return '';
    }
  };

  keys.forEach((k) => {
    if (SKIP_KEYS.has(k)) return;
    const o = normalize(entry.oldData![k]);
    const n = normalize(entry.newData![k]);
    if (o !== n) result.push({ key: k, old: o || '(ว่าง)', new: n || '(ว่าง)' });
  });

  return result;
}

function buildRow(entry: RawLogEntry, index: number): TableRow {
  const d = entry.data ?? entry.newData ?? entry.oldData;
  const actor = d?.createdByUser;
  return {
    rowKey: `${entry.timestamp}-${index}`,
    displayIndex: (serverPage.value - 1) * serverLimit.value + index + 1,
    action: entry.action,
    festivalName: d?.festivalName ?? '-',
    actorName: actor?.firstName ?? '-',
    actorUsername: actor?.userName ?? '-',
    actorRole: actor?.role ?? '',
    ts: entry.timestamp,
    rawEntry: entry,
    changedFields: entry.action === 'UPDATE' ? getChangedFields(entry) : [],
  };
}

const fetchLog = async (): Promise<void> => {
  loading.value = true;
  try {
    const res = await api.get('/backoffice/festival/log', {
      params: {
        page: serverPage.value,
        limit: serverLimit.value,
        search: search.value.trim() || undefined,
        action: activeAction.value !== 'ALL' ? activeAction.value : undefined,
      },
    });

    const d = res.data.festival as {
      data: string[];
      total: number;
      totalPages: number;
      createCount: number;
      updateCount: number;
      deleteCount: number;
    };

    createCount.value = d.createCount ?? 0;
    updateCount.value = d.updateCount ?? 0;
    deleteCount.value = d.deleteCount ?? 0;

    rows.value = d.data.map(parseLogLine).map((e, i) => buildRow(e, i));

    pagination.value.rowsNumber = d.total ?? 0;
    pagination.value.page = serverPage.value;
    pagination.value.rowsPerPage = serverLimit.value;
  } catch (err: unknown) {
    const e = err as AxiosError<{ message: string }>;
    console.error('fetch log error', e.response?.data?.message);
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

const onTableRequest: QTableProps['onRequest'] = (reqProps) => {
  serverPage.value = reqProps.pagination.page;
  serverLimit.value = reqProps.pagination.rowsPerPage;
  pagination.value.page = reqProps.pagination.page;
  pagination.value.rowsPerPage = reqProps.pagination.rowsPerPage;
  void fetchLog();
};

function onSearch(): void {
  serverPage.value = 1;
  pagination.value.page = 1;
  void fetchLog();
}

function clearSearch(): void {
  search.value = '';
  onSearch();
}

function setAction(val: string): void {
  activeAction.value = val;
  serverPage.value = 1;
  pagination.value.page = 1;
  void fetchLog();
}

function actionIcon(action: string): string {
  const map: Record<string, string> = {
    CREATE: 'add_circle_outline',
    UPDATE: 'edit_note',
    DELETE: 'delete_outline',
  };
  return map[action] ?? 'info_outline';
}

function actionLabel(a: string): string {
  if (a === 'CREATE') return 'สร้าง';
  if (a === 'UPDATE') return 'แก้ไข';
  if (a === 'DELETE') return 'ลบ';
  return a;
}

function formatDateOnly(ts: string): string {
  return new Date(ts).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTimeOnly(ts: string): string {
  return new Date(ts).toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

const PARTICLE_COLORS = [
  '#e11d48',
  '#fbbf24',
  '#6366f1',
  '#22c55e',
  '#fb7185',
  '#f59e0b',
  '#a78bfa',
  '#34d399',
  '#f472b6',
  '#38bdf8',
  '#4ade80',
  '#facc15',
];
const PARTICLE_EMOJIS = [
  '🎉',
  '✨',
  '🎊',
  '⭐',
  '💫',
  '🌟',
  '🎈',
  '🌸',
  '🌺',
  '🌼',
  '🎀',
  '💥',
  '🎆',
  '🎇',
  '🦋',
  '🍀',
  '❄️',
  '🎵',
  '💎',
  '🏵️',
];

function spawnParticles(x: number, y: number): void {
  const count = 12 + Math.floor(Math.random() * 6);
  const shapes: ShapeType[] = ['circle', 'circle', 'square', 'star', 'emoji'];

  for (let i = 0; i < count; i++) {
    const id = ++particleId;
    const dur = 0.7 + Math.random() * 0.5;
    const shape = shapes[Math.floor(Math.random() * shapes.length)]!;
    const isEmoji = shape === 'emoji';
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
    const dist = 80 + Math.random() * 80;

    const style: Record<string, string> = {
      '--x': `${x}px`,
      '--y': `${y}px`,
      '--dx': `${Math.cos(angle) * dist}px`,
      '--dy': `${Math.sin(angle) * dist}px`,
      '--dur': `${dur}s`,
      '--color': isEmoji
        ? 'transparent'
        : PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!,
      '--size': isEmoji ? '18px' : `${6 + Math.random() * 7}px`,
      '--shape': shape,
      '--emoji-content': isEmoji
        ? `"${PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]!}"`
        : '""',
      '--rot': `${Math.random() * 360 - 180}deg`,
    };

    activeParticles.value.push({ id, style });
    setTimeout(
      () => {
        activeParticles.value = activeParticles.value.filter((p) => p.id !== id);
      },
      dur * 1000 + 100,
    );
  }
}

const handleGlobalClick = (e: MouseEvent) => spawnParticles(e.clientX, e.clientY);

onMounted(() => {
  void fetchLog();
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$orange: #ea580c;
$orange-mid: #f97316;
$orange-soft: #fff7ed;
$gold: #f59e0b;
$amber: #d97706;
$amber-soft: #fef3c7;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-soft: #f0fdf4;
$surface: #ffffff;
$surface-2: #fff9f5;
$text-main: #431407;
$text-muted: #9ca3af;
$radius: 20px;

// ─── Page ─────────────────────────────────────────────────────────────────────
.log-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(150deg, #fff7ed 0%, #fdf4ff 45%, #f0fdfa 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #7c2d12 0%, $orange 55%, $gold 100%);
  padding: 1rem 1.5rem 2.5rem;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}
.hero-blob-1 {
  width: 300px;
  height: 300px;
  background: $gold;
  top: -80px;
  right: -80px;
  animation: drift 7s ease-in-out infinite;
}
.hero-blob-2 {
  width: 200px;
  height: 200px;
  background: #34d399;
  bottom: -60px;
  left: -50px;
  animation: drift 9s ease-in-out infinite reverse;
}
.hero-blob-3 {
  width: 120px;
  height: 120px;
  background: #fff;
  top: 10px;
  left: 38%;
  animation: drift 5s ease-in-out infinite 1.5s;
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-14px) scale(1.05);
  }
}

.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  max-width: 1100px;
  margin: 0 auto;
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.hero-icon-wrap {
  width: 54px;
  height: 54px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.25rem, 4vw, 1.85rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 3px;
  line-height: 1.15;
}
.hero-sub {
  font-size: clamp(0.75rem, 2.5vw, 0.88rem);
  color: rgba(255, 255, 255, 0.68);
  margin: 0;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
}

.hero-back-btn {
  background: rgba(255, 255, 255, 0.16) !important;
  backdrop-filter: blur(8px);
  color: white !important;
  border: 1.5px solid rgba(255, 255, 255, 0.32) !important;
  border-radius: 13px !important;
  font-family: 'Noto Sans Thai', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  transition:
    background 0.2s,
    transform 0.15s !important;
  &:hover {
    background: rgba(255, 255, 255, 0.26) !important;
    transform: translateY(-2px);
  }
}

// ─── Content ──────────────────────────────────────────────────────────────────
.content-wrap {
  max-width: 1100px;
  margin: -1.25rem auto 0;
  padding: 1.5rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  z-index: 2;
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
.top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
}

.search-bar {
  width: 100%;
  max-width: 320px;
  :deep(.q-field__control) {
    border-radius: 14px !important;
    box-shadow: 0 2px 12px rgba(234, 88, 12, 0.08);
  }
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────
.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: all 0.18s;
  font-family: 'Noto Sans Thai', sans-serif;

  .pill-count {
    margin-left: 6px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    padding: 1px 7px;
    font-size: 0.7rem;
  }

  &--ALL {
    background: $orange-soft;
    color: $orange-mid;
    border-color: rgba(234, 88, 12, 0.25);
    &.active,
    &:hover {
      background: $orange-mid;
      color: #fff;
      border-color: $orange-mid;
    }
  }
  &--CREATE {
    background: $green-soft;
    color: $green;
    border-color: rgba(22, 163, 74, 0.25);
    &.active,
    &:hover {
      background: $green;
      color: #fff;
      border-color: $green;
    }
  }
  &--UPDATE {
    background: $amber-soft;
    color: $amber;
    border-color: rgba(217, 119, 6, 0.25);
    &.active,
    &:hover {
      background: $amber;
      color: #fff;
      border-color: $amber;
    }
  }
  &--DELETE {
    background: $red-soft;
    color: $red;
    border-color: rgba(220, 38, 38, 0.25);
    &.active,
    &:hover {
      background: $red;
      color: #fff;
      border-color: $red;
    }
  }
}

// ─── Table Card ───────────────────────────────────────────────────────────────
.table-card {
  background: $surface;
  border-radius: $radius;
  overflow: hidden;
  box-shadow:
    0 4px 28px rgba(234, 88, 12, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(234, 88, 12, 0.1);
}

.styled-table {
  :deep(thead tr th) {
    font-family: 'Prompt', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: $text-main;
    background: $surface-2;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-bottom: 2px solid rgba(234, 88, 12, 0.1);
    white-space: nowrap;
    padding: 14px 16px;
  }
  :deep(tbody tr) {
    transition: background 0.15s;
    &:hover {
      background: rgba(234, 88, 12, 0.03) !important;
    }
  }
  :deep(tbody tr td) {
    font-size: clamp(0.78rem, 2vw, 0.875rem);
    color: $text-main;
    border-bottom: 1px solid rgba(234, 88, 12, 0.06);
    vertical-align: middle;
    padding: 12px 16px;
  }
  :deep(tbody tr td:first-child) {
    color: $text-muted;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
  }
  :deep(.q-table__bottom) {
    border-top: 1px solid rgba(234, 88, 12, 0.08);
    background: $surface-2;
    font-size: 0.82rem;
    padding: 8px 16px;
  }
}

// ─── Festival Cell ────────────────────────────────────────────────────────────
.fest-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(234, 88, 12, 0.08), rgba(245, 158, 11, 0.06));
  border: 1px solid rgba(234, 88, 12, 0.18);
  border-radius: 10px;
  padding: 5px 11px;
  max-width: 100%;

  &--view {
    padding: 7px 13px;
  }
}
.fest-cell-icon {
  color: $orange;
  flex-shrink: 0;
  opacity: 0.85;
}
.fest-cell-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: $text-main;
  line-height: 1.35;
  word-break: break-word;
  .fest-cell--view & {
    font-size: 0.88rem;
  }
}

// ─── Action Badge ─────────────────────────────────────────────────────────────
.action-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;

  &--create {
    background: $green-soft;
    color: #15803d;
    border: 1px solid rgba(22, 163, 74, 0.2);
  }
  &--update {
    background: #fef9c3;
    color: #b45309;
    border: 1px solid rgba(217, 119, 6, 0.2);
  }
  &--delete {
    background: $red-soft;
    color: #b91c1c;
    border: 1px solid rgba(220, 38, 38, 0.2);
  }
}

// ─── Diff ─────────────────────────────────────────────────────────────────────
.diff-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.diff-old {
  background: $red-soft;
  color: #b91c1c;
  border-radius: 6px;
  padding: 2px 8px;
  font-weight: 600;
  word-break: break-all;
}
.diff-new {
  background: $green-soft;
  color: #15803d;
  border-radius: 6px;
  padding: 2px 8px;
  font-weight: 600;
  word-break: break-all;
}
.diff-arrow {
  color: $text-muted;
}
.diff-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.diff-no-change {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: $text-muted;
}
.no-diff {
  font-size: 0.82rem;
  color: $text-muted;
}

// ─── Actor ────────────────────────────────────────────────────────────────────
$avatar-palettes: (
  'orange': (
    #ea580c,
    #f97316,
    rgba(234, 88, 12, 0.4),
  ),
  'indigo': (
    #f97316,
    #ea580c,
    rgba(249, 115, 22, 0.4),
  ),
  'teal': (
    #0d9488,
    #0f766e,
    rgba(13, 148, 136, 0.4),
  ),
  'rose': (
    #e11d48,
    #be123c,
    rgba(225, 29, 72, 0.4),
  ),
  'amber': (
    #d97706,
    #b45309,
    rgba(217, 119, 6, 0.4),
  ),
  'sky': (
    #cc7333,
    #ea580c,
    rgba(249, 115, 22, 0.4),
  ),
  'emerald': (
    #059669,
    #047857,
    rgba(5, 150, 105, 0.4),
  ),
  'fuchsia': (
    #a21caf,
    #86198f,
    rgba(162, 28, 175, 0.4),
  ),
);
.actor-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actor-avatar-outer {
  position: relative;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actor-avatar {
  position: relative;
  z-index: 1;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @each $name, $palette in $avatar-palettes {
    $from: nth($palette, 1);
    $to: nth($palette, 2);
    $ring: nth($palette, 3);
    &--#{$name} {
      background: linear-gradient(145deg, $from 0%, $to 100%);
      box-shadow:
        0 4px 14px $ring,
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
  }
}

.actor-avatar-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 52%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, transparent 100%);
  border-radius: 12px 12px 0 0;
  pointer-events: none;
}

.actor-initial {
  position: relative;
  z-index: 1;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.actor-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.actor-name {
  font-size: 0.84rem;
  font-weight: 600;
  color: $text-main;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25;
}

.actor-meta-row {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.actor-username-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: linear-gradient(135deg, rgba(234, 88, 12, 0.08), rgba(234, 88, 12, 0.05));
  border: 1px solid rgba(234, 88, 12, 0.18);
  border-radius: 20px;
  padding: 2px 9px 2px 7px;
  font-size: 0.67rem;
  font-weight: 700;
  color: $orange-mid;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actor-at-symbol {
  color: $orange;
  font-size: 0.72rem;
  font-weight: 800;
  opacity: 0.8;
  margin-right: 1px;
}

// ─── Role Badge ───────────────────────────────────────────────────────────────
.role-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.65rem;
  font-weight: 700;
  white-space: nowrap;
  &--superAdmin {
    background: linear-gradient(135deg, #fff7ed, #fef3c7);
    color: $orange;
    border: 1px solid rgba(234, 88, 12, 0.2);
  }
  &--admin {
    background: $orange-soft;
    color: $orange-mid;
    border: 1px solid rgba(234, 88, 12, 0.15);
  }
}

// ─── Timestamp ────────────────────────────────────────────────────────────────
.ts-block {
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
}

.ts-date-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(234, 88, 12, 0.07));
  border: 1px solid rgba(234, 88, 12, 0.2);
  border-radius: 20px;
  padding: 3px 10px 3px 7px;
  font-size: 0.75rem;
  font-weight: 700;
  color: $orange-mid;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(234, 88, 12, 0.1);
}
.ts-pill-icon {
  color: $orange-mid;
  flex-shrink: 0;
  opacity: 0.85;
}
.ts-time-row {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 2px;
}
.ts-clock-icon {
  color: $orange-mid;
  opacity: 0.55;
  flex-shrink: 0;
}
.ts-time-text {
  font-size: 0.7rem;
  color: $text-muted;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

// ─── Table Actions ────────────────────────────────────────────────────────────
.actions-wrap {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.action-btn {
  transition: transform 0.15s !important;
  &:hover {
    transform: scale(1.15);
  }
  &--view {
    color: $orange-mid !important;
    :deep(.q-icon) {
      color: $orange-mid !important;
    }
  }
}

// ─── Empty State ──────────────────────────────────────────────────────────────
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
}
.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
.empty-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: $text-main;
}
.empty-sub {
  font-size: 0.82rem;
  color: $text-muted;
  margin-top: 4px;
}

// ─── Dialog ───────────────────────────────────────────────────────────────────
.custom-dialog {
  background: $surface;
  border-radius: 24px;
  overflow: hidden;
  width: 500px;
  max-width: 95vw;
  box-shadow:
    0 24px 64px rgba(234, 88, 12, 0.14),
    0 4px 16px rgba(0, 0, 0, 0.06);
  &--mobile {
    border-radius: 24px 24px 0 0;
    width: 100%;
    max-width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.dialog-drag-handle {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $surface;
  &::before {
    content: '';
    width: 36px;
    height: 3px;
    border-radius: 2px;
    background: rgba(234, 88, 12, 0.2);
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: $text-main;
  border-bottom: 1px solid rgba(234, 88, 12, 0.08);
  &--orange {
    background: linear-gradient(135deg, $orange-soft, #fef3c7);
  }
}

.dialog-header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dialog-header-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: $text-main;
  line-height: 1.2;
}

.dialog-header-sub {
  font-size: 0.72rem;
  color: $orange-mid;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dialog-header-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &--orange {
    background: linear-gradient(135deg, $orange-mid, $orange);
    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.35);
  }
}

.dialog-close-btn {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: none;
  background: rgba(234, 88, 12, 0.07);
  color: $text-muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover {
    background: rgba(234, 88, 12, 0.14);
  }
}

.dialog-body {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 70vh;
  overflow-y: auto;
}

.view-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 1rem 1.25rem;
  background: $surface-2;
  border-radius: 14px;
  border: 1px solid rgba(234, 88, 12, 0.07);
}

.view-field-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: $text-muted;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(234, 88, 12, 0.07);
  &--mobile {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
  }
}

.dlg-btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 24px;
  border-radius: 10px;
  border: none;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.15s,
    opacity 0.15s;
  &:active {
    transform: scale(0.96);
  }
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
  &--cancel {
    background: rgba(234, 88, 12, 0.08);
    color: $text-muted;
    &:hover {
      background: rgba(234, 88, 12, 0.14);
    }
  }
}

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 600px) {
  .page-hero {
    padding: 1.5rem 1rem 3.5rem;
  }
  .content-wrap {
    padding: 0 0.75rem 3rem;
    gap: 1rem;
  }
  .hero-left {
    gap: 10px;
  }
  .hero-icon-wrap {
    width: 46px;
    height: 46px;
  }
  .hero-actions {
    width: 100%;
  }
  .actor-username-chip {
    display: none;
  }
  .role-badge {
    display: none;
  }
  .search-bar {
    max-width: 100%;
  }
  .dialog-body {
    max-height: 60vh;
  }
}

// ─── Click Particles ──────────────────────────────────────────────────────────
.click-particles-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
}

.click-particle {
  position: fixed;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: var(--color);
  pointer-events: none;
  will-change: transform, opacity;
  animation: clickFall var(--dur) cubic-bezier(0.2, 0.9, 0.4, 1) forwards;
  border-radius: 50%;

  &[style*='--shape: square'] {
    border-radius: 3px;
  }
  &[style*='--shape: star'] {
    border-radius: 0;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }
  &[style*='--shape: triangle'] {
    background: transparent !important;
    border-left: calc(var(--size) * 0.5) solid transparent;
    border-right: calc(var(--size) * 0.5) solid transparent;
    border-bottom: var(--size) solid var(--color);
    border-radius: 0;
    width: 0 !important;
    height: 0 !important;
  }
  &[style*='--shape: emoji'] {
    background: transparent;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: var(--emoji-content);
      font-size: var(--size);
      line-height: 1;
    }
  }
}

@keyframes clickFall {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(1);
  }
  12% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(calc(var(--dx) * 0.15), calc(var(--dy) * 0.15))
      rotate(calc(var(--rot) * 0.1)) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(0.1);
  }
}
</style>
