<template>
  <q-page class="log-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-icon-wrap">
          <q-icon name="history" size="2rem" color="white" />
        </div>
        <div>
          <h1 class="hero-title">บันทึกกิจกรรม</h1>
          <p class="hero-sub">ประวัติการเปลี่ยนแปลงคำไม่พึงประสงค์</p>
        </div>
        <q-space />
        <div class="hero-actions">
          <q-btn
            unelevated
            icon="arrow_back"
            label="กลับ"
            class="hero-back-btn"
            :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
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
          placeholder="ค้นหาคำไม่พึงประสงค์..."
          outlined
          rounded
          dense
          debounce="300"
          class="search-bar"
          bg-color="white"
          @update:model-value="onSearch"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="grey-5" />
          </template>
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
          :class="[`filter-pill--${f.value}`, { active: activeFilter === f.value }]"
          @click="setFilter(f.value)"
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
            <q-inner-loading showing color="deep-purple-5" />
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <span class="action-badge" :class="`action-badge--${props.row.action.toLowerCase()}`">
                <q-icon :name="actionIcon(props.row.action)" size="13px" class="q-mr-xs" />
                {{ actionLabel(props.row.action) }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-word="props">
            <q-td :props="props">
              <div class="word-badge">
                <q-icon name="label_off" size="14px" color="negative" class="q-mr-xs" />
                {{ props.row.word }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-diff="props">
            <q-td :props="props">
              <template v-if="props.row.action === 'UPDATE'">
                <div v-if="props.row.diffs.length > 0">
                  <div v-for="diff in props.row.diffs" :key="diff.key" class="diff-row">
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

          <template v-slot:body-cell-actor="props">
            <q-td :props="props">
              <div class="actor-wrap">
                <div class="actor-avatar-outer">
                  <div
                    class="actor-avatar"
                    :class="`actor-avatar--${getAvatarColor(props.row.actor)}`"
                  >
                    <span class="actor-initial">{{ getInitial(props.row.actor) }}</span>
                    <span class="actor-avatar-shine" />
                  </div>
                </div>
                <div class="actor-info">
                  <span class="actor-name">{{ getActorName(props.row.actor) }}</span>
                  <span class="actor-username-chip">
                    <span class="actor-at-symbol">@</span>{{ getActorUsernameRaw(props.row.actor) }}
                  </span>
                </div>
              </div>
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
                  color="indigo-1"
                  icon="visibility"
                  size="sm"
                  class="action-btn action-btn--view"
                  @click="onView(props.row)"
                >
                  <q-tooltip class="bg-indigo-8">ดูรายละเอียด</q-tooltip>
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

        <div class="dialog-header dialog-header--indigo">
          <div class="dialog-header-icon dialog-header-icon--indigo">
            <q-icon name="manage_search" color="white" size="18px" />
          </div>
          <span>รายละเอียดบันทึก</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="viewDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>

        <div class="dialog-body" v-if="viewRow">
          <div class="view-section">
            <div class="view-field-label">ประเภทการดำเนินการ</div>
            <span class="action-badge" :class="`action-badge--${viewRow.action.toLowerCase()}`">
              <q-icon :name="actionIcon(viewRow.action)" size="13px" class="q-mr-xs" />
              {{ actionLabel(viewRow.action) }}
            </span>
          </div>

          <div class="view-section">
            <div class="view-field-label">คำไม่พึงประสงค์</div>
            <div class="word-chip">
              <q-icon
                name="label_off"
                size="18px"
                color="negative"
                class="q-mr-sm"
                style="flex-shrink: 0"
              />
              {{ viewRow.word }}
            </div>
          </div>

          <div class="view-section" v-if="viewRow.action === 'UPDATE'">
            <div class="view-field-label">การเปลี่ยนแปลง</div>
            <div v-if="viewRow.diffs.length > 0" class="diff-wrap">
              <div v-for="d in viewRow.diffs" :key="d.key" class="diff-row">
                <span class="diff-old">{{ d.old }}</span>
                <q-icon name="arrow_forward" size="14px" class="diff-arrow" />
                <span class="diff-new">{{ d.new }}</span>
              </div>
            </div>
            <div v-else class="diff-no-change">
              <q-icon name="info_outline" size="13px" class="q-mr-xs" />
              อัปเดตข้อมูลโดยไม่มีการเปลี่ยนแปลงคำ
            </div>
          </div>

          <div class="view-section">
            <div class="view-field-label">ผู้ดำเนินการ</div>
            <div class="actor-wrap">
              <div class="actor-avatar-outer">
                <div class="actor-avatar" :class="`actor-avatar--${getAvatarColor(viewRow.actor)}`">
                  <span class="actor-initial">{{ getInitial(viewRow.actor) }}</span>
                  <span class="actor-avatar-shine" />
                </div>
              </div>
              <div class="actor-info">
                <span class="actor-name">{{ getActorName(viewRow.actor) }}</span>
                <span class="actor-username-chip">
                  <span class="actor-at-symbol">@</span>{{ getActorUsernameRaw(viewRow.actor) }}
                </span>
              </div>
            </div>
          </div>

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

    <!-- ===== CLICK PARTICLES ===== -->
    <teleport to="body">
      <div class="click-particles-root" aria-hidden="true">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import type { QTableProps, QTableColumn } from 'quasar';

// ─── Types ────────────────────────────────────────────────────────────────────
type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';
type FilterType = 'all' | ActionType;
type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

interface LogUser {
  uId: number;
  firstName: string;
  userName: string;
}

interface LogData {
  upId: number | string;
  word: string;
  createdByUser?: LogUser | null;
  updatedByUser?: LogUser | null;
  deletedByUser?: LogUser | null;
  [key: string]: unknown;
}

interface LogEntry {
  ts: string;
  action: ActionType;
  data: LogData | null;
  oldData: LogData | null;
  newData: LogData | null;
}

interface Diff {
  key: string;
  old: string;
  new: string;
}

interface TableRow {
  rowKey: string;
  displayIndex: number;
  action: ActionType;
  word: string;
  diffs: Diff[];
  actor: string;
  ts: string;
  upId: number | string;
}

interface Particle {
  id: number;
  style: Record<string, string>;
}

interface LogStats {
  total: number;
  createCount: number;
  updateCount: number;
  deleteCount: number;
}

// ─── Quasar ───────────────────────────────────────────────────────────────────
const $q = useQuasar();

// ─── Table State ──────────────────────────────────────────────────────────────
const rows = ref<TableRow[]>([]);
const loading = ref(false);
const search = ref('');
const activeFilter = ref<FilterType>('all');

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: '',
  descending: false,
});

const stats = ref<LogStats>({
  total: 0,
  createCount: 0,
  updateCount: 0,
  deleteCount: 0,
});

const columns: QTableColumn[] = [
  { name: 'no', label: 'ลำดับ', field: 'displayIndex', align: 'center', style: 'width: 64px' },
  { name: 'action', label: 'ประเภท', field: 'action', align: 'left', style: 'width: 110px' },
  {
    name: 'word',
    label: 'คำ',
    field: 'word',
    align: 'left',
    style: 'white-space: normal; word-break: break-word;',
  },
  { name: 'diff', label: 'การเปลี่ยนแปลง', field: 'diffs', align: 'left' },
  { name: 'actor', label: 'ผู้ดำเนินการ', field: 'actor', align: 'left', style: 'width: 200px' },
  { name: 'ts', label: 'วันที่/เวลา', field: 'ts', align: 'left', style: 'width: 150px' },
  { name: 'actions', label: 'จัดการ', field: 'actions', align: 'center', style: 'width: 130px' },
];

// ─── Filter Options ───────────────────────────────────────────────────────────
const filterOptions = computed(() => [
  {
    value: 'all' as const,
    label: 'ทั้งหมด',
    icon: 'list_alt',
    count: stats.value.createCount + stats.value.updateCount + stats.value.deleteCount,
  },
  {
    value: 'CREATE' as const,
    label: 'สร้าง',
    icon: 'add_circle_outline',
    count: stats.value.createCount,
  },
  { value: 'UPDATE' as const, label: 'แก้ไข', icon: 'edit_note', count: stats.value.updateCount },
  { value: 'DELETE' as const, label: 'ลบ', icon: 'delete_outline', count: stats.value.deleteCount },
]);

// ─── Dialog State ─────────────────────────────────────────────────────────────
const viewDialog = ref(false);
const viewRow = ref<TableRow | null>(null);

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Avatar Palette ───────────────────────────────────────────────────────────
const AVATAR_PALETTES = [
  'violet',
  'indigo',
  'teal',
  'rose',
  'amber',
  'sky',
  'emerald',
  'fuchsia',
] as const;

function getAvatarColor(actor: string): string {
  const code = actor.charCodeAt(0) || 0;
  return AVATAR_PALETTES[code % AVATAR_PALETTES.length]!;
}

// ─── Log Parsing ──────────────────────────────────────────────────────────────
function parseLogLine(line: string): LogEntry | null {
  const tsMatch = line.match(/^(\S+Z)/);
  const actionMatch = line.match(/\[(CREATE|UPDATE|DELETE)\]/);
  if (!tsMatch || !actionMatch) return null;

  const ts = tsMatch[1]!;
  const action = actionMatch[1]! as ActionType;
  let data: LogData | null = null;
  let oldData: LogData | null = null;
  let newData: LogData | null = null;

  if (action === 'UPDATE') {
    const m = line.match(/OLD: (\{.*?\}) \| NEW: (\{.*\})$/);
    if (m) {
      try {
        oldData = JSON.parse(m[1]!) as LogData;
      } catch {
        /* ignore */
      }
      try {
        newData = JSON.parse(m[2]!) as LogData;
      } catch {
        /* ignore */
      }
    }
  } else {
    const m = line.match(/\[(?:CREATE|DELETE)\] (\{.*\})$/);
    if (m) {
      try {
        data = JSON.parse(m[1]!) as LogData;
      } catch {
        /* ignore */
      }
    }
  }

  return { ts, action, data, oldData, newData };
}

function getWord(e: LogEntry): string {
  if (e.action === 'CREATE' && e.data) return String(e.data.word ?? '-');
  if (e.action === 'UPDATE' && e.newData) return String(e.newData.word ?? '-');
  if (e.action === 'DELETE' && e.data) return String(e.data.word ?? '-');
  return '-';
}

function getActor(e: LogEntry): string {
  const user =
    e.action === 'CREATE'
      ? e.data?.createdByUser
      : e.action === 'UPDATE'
        ? e.newData?.updatedByUser
        : e.data?.deletedByUser;
  return user ? `${user.firstName} (${user.userName})` : '-';
}

function getUpId(e: LogEntry): number | string {
  return (e.data ?? e.newData ?? e.oldData)?.upId ?? '-';
}

function getDiffs(e: LogEntry): Diff[] {
  if (!e.oldData || !e.newData) return [];
  return ['word']
    .filter((k) => String(e.oldData![k]) !== String(e.newData![k]))
    .map((k) => ({ key: k, old: String(e.oldData![k]), new: String(e.newData![k]) }));
}

function entryToRow(entry: LogEntry, index: number): TableRow {
  return {
    rowKey: `${entry.ts}-${index}`,
    displayIndex: (pagination.value.page - 1) * pagination.value.rowsPerPage + index + 1,
    action: entry.action,
    word: getWord(entry),
    diffs: getDiffs(entry),
    actor: getActor(entry),
    ts: entry.ts,
    upId: getUpId(entry),
  };
}

// ─── Actor Helpers ────────────────────────────────────────────────────────────
function getInitial(actor: string): string {
  if (!actor) return '?';
  const parts = actor.split('-');
  const target = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  return (target?.trim().charAt(0) ?? '?').toUpperCase();
}

function getActorName(actor: string): string {
  return actor.includes('(') ? actor.split('(')[0]!.trim() : actor;
}

function getActorUsernameRaw(actor: string): string {
  return actor.match(/\(([^)]+)\)/)?.[1] ?? '';
}

// ─── Format Helpers ───────────────────────────────────────────────────────────
function actionIcon(action: string): string {
  if (action === 'CREATE') return 'add_circle_outline';
  if (action === 'UPDATE') return 'edit_note';
  return 'delete_outline';
}

function actionLabel(action: string): string {
  if (action === 'CREATE') return 'สร้าง';
  if (action === 'UPDATE') return 'แก้ไข';
  return 'ลบ';
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

// ─── Data Fetching ────────────────────────────────────────────────────────────
const fetchLog = async (): Promise<void> => {
  loading.value = true;
  try {
    const res = await api.get('/backoffice/unpolite/log', {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        search: search.value.trim() || undefined,
        action: activeFilter.value === 'all' ? undefined : activeFilter.value,
      },
    });

    const d = res.data.unpolite as {
      data: string[];
      total: number;
      createCount: number;
      updateCount: number;
      deleteCount: number;
    };

    const entries = d.data.map(parseLogLine).filter((e): e is LogEntry => e !== null);

    rows.value = entries.map((entry, i) => entryToRow(entry, i));
    pagination.value.rowsNumber = d.total;

    stats.value = {
      total: d.total,
      createCount: d.createCount,
      updateCount: d.updateCount,
      deleteCount: d.deleteCount,
    };
  } catch {
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

// ─── Actions ──────────────────────────────────────────────────────────────────
function onView(row: TableRow): void {
  viewRow.value = row;
  viewDialog.value = true;
}

const onTableRequest: QTableProps['onRequest'] = (reqProps) => {
  pagination.value.page = reqProps.pagination.page;
  pagination.value.rowsPerPage = reqProps.pagination.rowsPerPage;
  void fetchLog();
};

function onSearch(): void {
  pagination.value.page = 1;
  void fetchLog();
}

function clearSearch(): void {
  search.value = '';
  onSearch();
}

function setFilter(f: FilterType): void {
  activeFilter.value = f;
  pagination.value.page = 1;
  void fetchLog();
}

// ─── Particles ────────────────────────────────────────────────────────────────
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

// ─── Lifecycle ────────────────────────────────────────────────────────────────
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
$purple: #5b21b6;
$purple-mid: #7c3aed;
$indigo: #3730a3;
$indigo-mid: #4f46e5;
$indigo-soft: #eef2ff;
$amber: #d97706;
$amber-soft: #fef3c7;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$surface: #ffffff;
$surface-2: #f8f7ff;
$text-main: #1e1b4b;
$text-muted: #9ca3af;
$radius: 16px;

// ─── Page ─────────────────────────────────────────────────────────────────────
.log-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(150deg, #f5f3ff 0%, #fdf4ff 40%, #f0fdf4 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #3b0764 0%, $purple 40%, $purple-mid 100%);
  padding: 2rem 1.5rem 3.5rem;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}
.hero-blob-1 {
  width: 300px;
  height: 300px;
  background: #a78bfa;
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
  background: #fbbf24;
  top: 10px;
  left: 40%;
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
  gap: 14px;
  flex-wrap: wrap;
  max-width: 960px;
  margin: 0 auto;
}

.hero-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.75rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 2px;
  line-height: 1.2;
}
.hero-sub {
  font-size: clamp(0.75rem, 2.5vw, 0.9rem);
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.hero-back-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px);
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px !important;
  font-family: 'Noto Sans Thai', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  transition:
    background 0.2s,
    transform 0.15s !important;
  &:hover {
    background: rgba(255, 255, 255, 0.25) !important;
    transform: translateY(-2px);
  }
}

// ─── Content ──────────────────────────────────────────────────────────────────
.content-wrap {
  max-width: 960px;
  margin: -1.75rem auto 0;
  padding: 0 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    box-shadow: 0 2px 12px rgba(91, 33, 182, 0.08);
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

  &--all {
    background: #f5f3ff;
    color: $purple;
    border-color: rgba(91, 33, 182, 0.3);
    &.active,
    &:hover {
      background: $purple;
      color: #fff;
      border-color: $purple;
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
  box-shadow: 0 4px 28px rgba(91, 33, 182, 0.09);
  border: 1px solid rgba(124, 58, 237, 0.08);
}

.styled-table {
  :deep(thead tr th) {
    font-family: 'Prompt', sans-serif;
    font-size: clamp(0.75rem, 2vw, 0.82rem);
    font-weight: 600;
    color: $text-main;
    background: $surface-2;
    letter-spacing: 0.03em;
    border-bottom: 2px solid rgba(124, 58, 237, 0.12);
    white-space: nowrap;
  }
  :deep(tbody tr) {
    transition: background 0.15s;
    &:hover {
      background: rgba(124, 58, 237, 0.03) !important;
    }
  }
  :deep(tbody tr td) {
    font-size: clamp(0.78rem, 2vw, 0.875rem);
    color: $text-main;
    border-bottom: 1px solid rgba(124, 58, 237, 0.06);
    vertical-align: middle;
  }
  :deep(tbody tr td:first-child) {
    color: $text-muted;
    font-size: 0.75rem;
    text-align: center;
  }
  :deep(.q-table__bottom) {
    border-top: 1px solid rgba(124, 58, 237, 0.08);
    background: $surface-2;
    font-size: 0.82rem;
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

// ─── Word Badge ───────────────────────────────────────────────────────────────
.word-badge {
  display: inline-flex;
  align-items: center;
  background: $red-soft;
  color: $red;
  border-radius: 8px;
  padding: 4px 10px;
  font-weight: 600;
  font-size: 0.85rem;
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 600px) {
    max-width: 130px;
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
  'violet': (
    #7c3aed,
    #5b21b6,
    rgba(124, 58, 237, 0.4),
  ),
  'indigo': (
    #4f46e5,
    #3730a3,
    rgba(79, 70, 229, 0.4),
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
    #0284c7,
    #0369a1,
    rgba(2, 132, 199, 0.4),
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
  gap: 11px;
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
  letter-spacing: -0.01em;
}

.actor-username-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(79, 70, 229, 0.06));
  border: 1px solid rgba(124, 58, 237, 0.18);
  border-radius: 20px;
  padding: 2px 9px 2px 7px;
  font-size: 0.67rem;
  font-weight: 700;
  color: $purple-mid;
  width: fit-content;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.actor-at-symbol {
  color: $purple;
  font-size: 0.72rem;
  font-weight: 800;
  opacity: 0.8;
  margin-right: 1px;
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
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.07));
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 20px;
  padding: 3px 10px 3px 7px;
  font-size: 0.75rem;
  font-weight: 700;
  color: $indigo-mid;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(79, 70, 229, 0.1);
}
.ts-pill-icon {
  color: $indigo-mid;
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
  color: $purple-mid;
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
    color: $indigo-mid !important;
    :deep(.q-icon) {
      color: $indigo-mid !important;
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
  border-radius: 20px;
  overflow: hidden;
  width: 460px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(91, 33, 182, 0.18);
  &--mobile {
    border-radius: 20px 20px 0 0;
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
    background: rgba(124, 58, 237, 0.2);
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 1.25rem;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: $text-main;
  border-bottom: 1px solid rgba(124, 58, 237, 0.07);
  &--indigo {
    background: linear-gradient(135deg, $indigo-soft, #e0e7ff);
  }
}

.dialog-header-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &--indigo {
    background: linear-gradient(135deg, $indigo-mid, $indigo);
  }
}

.dialog-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: rgba(91, 33, 182, 0.07);
  color: $text-muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover {
    background: rgba(91, 33, 182, 0.14);
  }
}

.dialog-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 1.25rem 1.25rem;
  &--mobile {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
  }
}

.view-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.view-field-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: $text-muted;
}

.word-chip {
  display: flex;
  align-items: flex-start;
  background: $red-soft;
  color: $red;
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  box-sizing: border-box;
  word-break: break-all;
  white-space: normal;
  line-height: 1.5;
}

.dlg-btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 22px;
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
    background: rgba(91, 33, 182, 0.07);
    color: $text-muted;
    &:hover {
      background: rgba(91, 33, 182, 0.13);
    }
  }
}

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 600px) {
  .page-hero {
    padding: 1.5rem 1rem 3rem;
  }
  .content-wrap {
    padding: 0 0.75rem 2rem;
    gap: 0.85rem;
  }
  .hero-inner {
    gap: 10px;
  }
  .hero-icon-wrap {
    width: 44px;
    height: 44px;
  }
  .hero-actions {
    width: 100%;
  }
  .hero-back-btn {
    flex: 1;
    justify-content: center;
  }
  .actor-username-chip {
    display: none;
  }
  .search-bar {
    max-width: 100%;
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
