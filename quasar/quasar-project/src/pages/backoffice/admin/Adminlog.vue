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
          <h1 class="hero-title">บันทึกกิจกรรม Admin</h1>
          <p class="hero-sub">ประวัติการสร้าง แก้ไข และลบโดย Admin ทั้งหมด</p>
        </div>
        <q-space />
        <div class="hero-actions">
          <q-btn unelevated icon="arrow_back" label="กลับ" class="hero-back-btn"
            :class="$q.screen.xs ? 'full-width q-mt-sm' : ''" @click="$router.back()" />
          <q-btn unelevated icon="refresh" label="รีเฟรช" class="hero-refresh-btn"
            :class="$q.screen.xs ? 'full-width q-mt-sm' : ''" :loading="loading" @click="onRefresh" />
        </div>
      </div>
    </div>

    <div class="content-wrap">
      <!-- Stats -->
      <div class="top-bar">
        <div class="stats-row">
          <div class="stat-chip stat-chip--all">
            <q-icon name="list_alt" size="18px" />
            <span class="stat-num">{{ totalCount }}</span>
            <span class="stat-label">รายการ</span>
          </div>
          <div class="stat-chip stat-chip--create">
            <q-icon name="add_circle_outline" size="18px" />
            <span class="stat-num">{{ createCount }}</span>
            <span class="stat-label">สร้าง</span>
          </div>
          <div class="stat-chip stat-chip--update">
            <q-icon name="edit_note" size="18px" />
            <span class="stat-num">{{ updateCount }}</span>
            <span class="stat-label">แก้ไข</span>
          </div>
          <div class="stat-chip stat-chip--delete">
            <q-icon name="delete_outline" size="18px" />
            <span class="stat-num">{{ deleteCount }}</span>
            <span class="stat-label">ลบ</span>
          </div>
        </div>
        <q-input v-model="search" placeholder="ค้นหาใน log..." outlined rounded dense
          debounce="400" class="search-bar" bg-color="white" clearable @update:model-value="onSearch">
          <template v-slot:prepend><q-icon name="search" color="grey-5" /></template>
        </q-input>
      </div>

      <!-- Filter Pills -->
      <div class="filter-row">
        <button v-for="f in filterOptions" :key="f.value" class="filter-pill"
          :class="[`filter-pill--${f.value}`, { active: activeAction === f.value }]"
          @click="setAction(f.value)">
          <q-icon :name="f.icon" size="14px" class="q-mr-xs" />
          {{ f.label }}
          <span class="pill-count">{{ f.count }}</span>
        </button>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="rowKey"
          v-model:pagination="tablePagination"
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

          <!-- Action column -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <span class="action-badge" :class="`action-badge--${props.row.action.toLowerCase()}`">
                <q-icon :name="getActionIcon(props.row.action)" size="13px" class="q-mr-xs" />
                {{ actionLabel(props.row.action) }}
              </span>
            </q-td>
          </template>

          <!-- Actor column -->
          <template v-slot:body-cell-actor="props">
            <q-td :props="props">
              <div class="actor-wrap">
                <div class="actor-avatar-outer">
                  <div class="actor-avatar" :class="`actor-avatar--${getAvatarColor(props.row.actorName)}`">
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

          <!-- Preview column -->
          <template v-slot:body-cell-preview="props">
            <q-td :props="props">
              <span class="preview-text">{{ props.row.preview }}</span>
            </q-td>
          </template>

          <!-- Timestamp column -->
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

          <!-- Actions column -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="actions-wrap">
                <q-btn unelevated round dense color="indigo-1" icon="visibility" size="sm"
                  class="action-btn action-btn--view" @click="onView(props.row)">
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
    <q-dialog v-model="viewDialog" :maximized="$q.screen.xs">
      <div class="log-view-dialog" :class="{ 'log-view-dialog--mobile': $q.screen.xs }">
        <div v-if="$q.screen.xs" class="dialog-drag-handle" />

        <!-- Header -->
        <div class="lvd-header">
          <div class="lvd-header-icon">
            <q-icon name="manage_search" color="white" size="18px" />
          </div>
          <span class="lvd-header-title">รายละเอียดบันทึก</span>
          <q-space />
          <button class="lvd-close-btn" type="button" @click="viewDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>

        <!-- Body -->
        <div class="lvd-body" v-if="viewRow">

          <!-- Action type -->
          <div class="lvd-section">
            <div class="lvd-label">ประเภทการดำเนินการ</div>
            <span class="action-badge" :class="`action-badge--${viewRow.action.toLowerCase()}`">
              <q-icon :name="getActionIcon(viewRow.action)" size="13px" class="q-mr-xs" />
              {{ actionLabel(viewRow.action) }}
            </span>
          </div>

          <!-- Actor -->
          <div class="lvd-section">
            <div class="lvd-label">ผู้ดำเนินการ</div>
            <div class="actor-wrap">
              <div class="actor-avatar-outer">
                <div class="actor-avatar" :class="`actor-avatar--${getAvatarColor(viewRow.actorName)}`">
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

          <!-- UPDATE: diff -->
          <div class="lvd-section" v-if="viewRow.action === 'UPDATE'">
            <div class="lvd-label">การเปลี่ยนแปลง</div>
            <div v-if="viewRow.changedFields && viewRow.changedFields.length > 0" class="lvd-diff-wrap">
              <div v-for="d in viewRow.changedFields" :key="d.key" class="lvd-diff-row">
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

          <!-- Timestamp -->
          <div class="lvd-section">
            <div class="lvd-label">วันที่/เวลา</div>
            <div class="lvd-ts">
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

        <!-- Footer -->
        <div class="lvd-footer" :class="{ 'lvd-footer--mobile': $q.screen.xs }">
          <button type="button" class="dlg-btn dlg-btn--cancel" @click="viewDialog = false">ปิด</button>
        </div>
      </div>
    </q-dialog>

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
import type { AxiosError } from 'axios';

// ─── Types ────────────────────────────────────────────────────────────────────
interface LogData {
  uId?: number; firstName?: string; userName?: string; role?: string;
  phoneNumber?: string; email?: string;
  createdAt?: string; updatedAt?: string; deletedAt?: string | null;
  [key: string]: unknown;
}
interface RawLogEntry {
  raw: string; timestamp: string; action: string;
  data?: LogData; oldData?: LogData; newData?: LogData;
}
interface TableRow {
  rowKey: string; displayIndex: number;
  action: string;
  actorName: string; actorUsername: string; actorRole: string;
  preview: string; ts: string; rawLine: string;
  rawEntry: RawLogEntry;
 changedFields: { key: string; old: string; new: string }[];
}
interface Particle { id: number; style: Record<string, string>; }
type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

const $q = useQuasar();
const rows = ref<TableRow[]>([]);
const loading = ref(false);
const search = ref('');
const activeAction = ref('ALL');
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// Dialog
const viewDialog = ref(false);
const viewRow = ref<TableRow | null>(null);
function onView(row: TableRow) { viewRow.value = row; viewDialog.value = true; }

const totalCount = ref(0); const createCount = ref(0);
const updateCount = ref(0); const deleteCount = ref(0);
const serverPage = ref(1); const serverLimit = ref(10);
const totalPages = ref(1);

const tablePagination = ref({ page: 1, rowsPerPage: 10, rowsNumber: 0, sortBy: '', descending: false });

const columns: QTableColumn[] = [
  { name: 'no',      label: 'ลำดับ',          field: 'displayIndex', align: 'center', style: 'width:60px' },
  { name: 'action',  label: 'ประเภท',          field: 'action',       align: 'left',   style: 'width:110px' },
  { name: 'actor',   label: 'Admin',            field: 'actorName',    align: 'left',   style: 'width:220px' },
  { name: 'preview', label: 'รายละเอียด',       field: 'preview',      align: 'left' },
  { name: 'ts',      label: 'วันที่/เวลา',      field: 'ts',           align: 'left',   style: 'width:150px' },
  { name: 'actions', label: 'จัดการ',           field: 'actions',      align: 'center', style: 'width:80px' },
];

const filterOptions = computed(() => [
  { value: 'ALL',    label: 'ทั้งหมด', icon: 'list_alt',           count: createCount.value + updateCount.value + deleteCount.value },
  { value: 'CREATE', label: 'สร้าง',   icon: 'add_circle_outline', count: createCount.value },
  { value: 'UPDATE', label: 'แก้ไข',   icon: 'edit_note',          count: updateCount.value },
  { value: 'DELETE', label: 'ลบ',       icon: 'delete_outline',     count: deleteCount.value },
]);

// ─── Avatar palette ───────────────────────────────────────────────────────────
const AVATAR_PALETTES = ['violet','indigo','teal','rose','amber','sky','emerald','fuchsia'];
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

// ─── Log parsing ──────────────────────────────────────────────────────────────
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
    } catch { return { raw: line, timestamp, action }; }
  } else {
    const jsonMatch = line.match(/\]\s*(\{.*\})/s);
    try {
      const data: LogData = jsonMatch ? JSON.parse(jsonMatch[1]!) : {};
      return { raw: line, timestamp, action, data };
    } catch { return { raw: line, timestamp, action }; }
  }
}

// function getChangedFields(entry: RawLogEntry): { key: string; old: string; new: string }[] {
//   if (!entry.oldData || !entry.newData) return [];
//   const keys = new Set([...Object.keys(entry.oldData), ...Object.keys(entry.newData)]);
//   const result: { key: string; old: string; new: string }[] = [];
//   keys.forEach(k => {
//     const o = String(entry.oldData![k] ?? ''), n = String(entry.newData![k] ?? '');
//     if (o !== n) result.push({ key: k, old: o, new: n });
//   });
//   return result;
// }

function getChangedFields(entry: RawLogEntry): { key: string; old: string; new: string }[] {
  if (!entry.oldData || !entry.newData) return [];
  const keys = new Set([...Object.keys(entry.oldData), ...Object.keys(entry.newData)]);
  const result: { key: string; old: string; new: string }[] = [];

  // ── ฟิลด์ที่ไม่ต้องแสดง (metadata / timestamps) ──
  const SKIP_KEYS = new Set(['createdAt', 'updatedAt', 'deletedAt']);

  keys.forEach(k => {
    if (SKIP_KEYS.has(k)) return;

    // normalize: null / undefined / "" → ถือเป็น "" เหมือนกัน
    const normalize = (v: unknown): string => {
      if (v === null || v === undefined || v === '') return '';
      return String(v);
    };

    const o = normalize(entry.oldData![k]);
    const n = normalize(entry.newData![k]);

    if (o !== n) result.push({ key: k, old: o || '(ว่าง)', new: n || '(ว่าง)' });
  });

  return result;
}

function buildRow(entry: RawLogEntry, index: number): TableRow {
  const d = entry.data ?? entry.newData ?? entry.oldData;
  const actorName = d?.firstName ?? '-';
  const actorUsername = d?.userName ?? '-';
  const actorRole = d?.role ?? '';
  let preview = '';
  if (entry.action === 'UPDATE') {
    preview = `อัปเดตข้อมูล: ${entry.newData?.firstName ?? ''} (@${entry.newData?.userName ?? ''})`;
  } else {
    preview = `${d?.firstName ?? ''} (@${d?.userName ?? ''})${d?.email ? ' — ' + d.email : ''}`;
  }
  return {
    rowKey: `${entry.timestamp}-${index}`,
    displayIndex: (serverPage.value - 1) * serverLimit.value + index + 1,
    action: entry.action,
    actorName, actorUsername, actorRole,
    preview, ts: entry.timestamp, rawLine: entry.raw,
    rawEntry: entry,
    // changedFields: entry.action === 'UPDATE' ? getChangedFields(entry) : undefined,
    changedFields: entry.action === 'UPDATE'
  ? getChangedFields(entry)
  : [],
  };
}

// ─── Fetch ────────────────────────────────────────────────────────────────────
const fetchLogs = async (): Promise<void> => {
  loading.value = true;
  try {
    const res = await api.get('/backoffice/admin/log', {
      params: {
        page: serverPage.value, limit: serverLimit.value,
        search: search.value.trim() || undefined,
        action: activeAction.value !== 'ALL' ? activeAction.value : undefined,
      },
    });
    const d = res.data;
    totalCount.value  = d.total ?? 0;
    totalPages.value  = d.totalPages ?? 1;
    createCount.value = d.createCount ?? 0;
    updateCount.value = d.updateCount ?? 0;
    deleteCount.value = d.deleteCount ?? 0;
    const entries = (d.data as string[]).map(parseLogLine);
    rows.value = entries.map((e, i) => buildRow(e, i));
    tablePagination.value.rowsNumber = d.total ?? 0;
    tablePagination.value.page = serverPage.value;
    tablePagination.value.rowsPerPage = serverLimit.value;
  } catch (err: unknown) {
    const e = err as AxiosError<{ message: string }>;
    console.error('fetch log error', e.response?.data?.message);
    rows.value = [];
  } finally { loading.value = false; }
};

const onTableRequest: QTableProps['onRequest'] = (reqProps) => {
  serverPage.value = reqProps.pagination.page;
  serverLimit.value = reqProps.pagination.rowsPerPage;
  tablePagination.value.page = reqProps.pagination.page;
  tablePagination.value.rowsPerPage = reqProps.pagination.rowsPerPage;
  void fetchLogs();
};
function onSearch()  { serverPage.value = 1; tablePagination.value.page = 1; void fetchLogs(); }
function onRefresh() { serverPage.value = 1; tablePagination.value.page = 1; void fetchLogs(); }
function setAction(val: string) { activeAction.value = val; serverPage.value = 1; tablePagination.value.page = 1; void fetchLogs(); }

function getActionIcon(action: string | undefined): string {
  const map: Record<string,string> = { CREATE:'add_circle_outline', UPDATE:'edit_note', DELETE:'delete_outline' };
  return (action && map[action]) ? map[action]! : 'info_outline';
}
function actionLabel(a: string): string {
  return a === 'CREATE' ? 'สร้าง' : a === 'UPDATE' ? 'แก้ไข' : a === 'DELETE' ? 'ลบ' : a;
}
function formatDateOnly(ts: string) { return new Date(ts).toLocaleDateString('th-TH', { day:'2-digit', month:'short', year:'numeric' }); }
function formatTimeOnly(ts: string) { return new Date(ts).toLocaleTimeString('th-TH', { hour:'2-digit', minute:'2-digit', second:'2-digit' }); }

// ─── Particles ────────────────────────────────────────────────────────────────
const PARTICLE_COLORS = ['#e11d48','#fbbf24','#6366f1','#22c55e','#fb7185','#f59e0b','#a78bfa','#34d399','#f472b6','#38bdf8'];
const PARTICLE_EMOJIS = ['🎉','✨','🎊','⭐','💫','🌟','🎈','🌸','🌺','🌼'];
const spawnParticles = (x: number, y: number) => {
  const count = 10 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const id = ++particleId;
    const size = 5 + Math.random() * 6;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!;
    const dur = 0.6 + Math.random() * 0.5;
    const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]!;
    const shapes: ShapeType[] = ['circle','circle','square','star','emoji'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)]!;
    const isEmoji = shape === 'emoji';
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
    const dist = 70 + Math.random() * 70;
    const style: Record<string,string> = {
      '--x':`${x}px`,'--y':`${y}px`,
      '--dx':`${Math.cos(angle)*dist}px`,'--dy':`${Math.sin(angle)*dist}px`,
      '--dur':`${dur}s`,'--color':isEmoji?'transparent':color,
      '--size':isEmoji?'16px':`${size}px`,'--shape':shape,
      '--emoji-content':isEmoji?`"${emoji}"`:'"\"',
      '--rot':`${Math.random()*360-180}deg`,
    };
    activeParticles.value.push({ id, style });
    setTimeout(() => { activeParticles.value = activeParticles.value.filter(p => p.id !== id); }, dur*1000+100);
  }
};
const handleGlobalClick = (e: MouseEvent) => spawnParticles(e.clientX, e.clientY);
onMounted(() => { void fetchLogs(); document.addEventListener('click', handleGlobalClick); });
onUnmounted(() => { document.removeEventListener('click', handleGlobalClick); });
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Tokens ───────────────────────────────────────────────────────────────────
$purple:     #5b21b6;
$purple-mid: #7c3aed;
$indigo:     #3730a3;
$indigo-mid: #4f46e5;
$amber:      #d97706;
$amber-soft: #fef3c7;
$red:        #dc2626;
$red-soft:   #fee2e2;
$green:      #16a34a;
$green-soft: #f0fdf4;
$surface:    #ffffff;
$surface-2:  #f0f4ff;
$text-main:  #1e1b4b;
$text-muted: #9ca3af;
$border-c:   rgba(79,70,229,0.1);

// ─── Page ─────────────────────────────────────────────────────────────────────
.log-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(150deg, #eef2ff 0%, #f0f9ff 50%, #f0fdf4 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
.page-hero {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #1e1b4b 0%, $indigo 45%, $indigo-mid 100%);
  padding: 2rem 1.5rem 3.5rem;
}
.hero-blob { position: absolute; border-radius: 50%; opacity: 0.12; }
.hero-blob-1 { width: 300px; height: 300px; background: #a5b4fc; top: -80px; right: -80px; animation: drift 7s ease-in-out infinite; }
.hero-blob-2 { width: 200px; height: 200px; background: #67e8f9; bottom: -60px; left: -50px; animation: drift 9s ease-in-out infinite reverse; }
.hero-blob-3 { width: 120px; height: 120px; background: #fbbf24; top: 10px; left: 40%; animation: drift 5s ease-in-out infinite 1.5s; }
@keyframes drift { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-14px) scale(1.05); } }
.hero-inner {
  position: relative; z-index: 2; display: flex; align-items: center;
  gap: 14px; flex-wrap: wrap; max-width: 980px; margin: 0 auto;
}
.hero-icon-wrap {
  width: 52px; height: 52px; border-radius: 14px;
  background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.hero-title { font-family: 'Prompt', sans-serif; font-size: clamp(1.2rem,4vw,1.75rem); font-weight: 700; color: #fff; margin: 0 0 2px; line-height: 1.2; }
.hero-sub   { font-size: clamp(0.75rem,2.5vw,0.9rem); color: rgba(255,255,255,0.65); margin: 0; }
.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.hero-back-btn {
  background: rgba(255,255,255,0.12) !important; color: rgba(255,255,255,0.85) !important;
  border: 1px solid rgba(255,255,255,0.25) !important; border-radius: 12px !important;
  font-family: 'Noto Sans Thai', sans-serif !important; font-weight: 600 !important;
  letter-spacing: 0 !important; transition: background 0.2s, transform 0.15s !important;
  &:hover { background: rgba(255,255,255,0.2) !important; transform: translateY(-2px); }
}
.hero-refresh-btn {
  background: rgba(251,191,36,0.18) !important; color: #fbbf24 !important;
  border: 1px solid rgba(251,191,36,0.4) !important; border-radius: 12px !important;
  font-family: 'Noto Sans Thai', sans-serif !important; font-weight: 600 !important;
  letter-spacing: 0 !important; transition: background 0.2s, transform 0.15s !important;
  &:hover { background: rgba(251,191,36,0.28) !important; transform: translateY(-2px); }
}

// ─── Content ──────────────────────────────────────────────────────────────────
.content-wrap { max-width: 980px; margin: -1.75rem auto 0; padding: 0 1rem 3rem; display: flex; flex-direction: column; gap: 1rem; }

// ─── Top Bar ──────────────────────────────────────────────────────────────────
.top-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.stats-row { display: flex; gap: 8px; flex-wrap: wrap; }
.stat-chip {
  display: flex; align-items: center; gap: 7px; background: $surface;
  border-radius: 12px; padding: 9px 14px;
  box-shadow: 0 2px 12px rgba(55,48,163,0.08); border: 1px solid $border-c;
  transition: transform 0.15s;
  &:hover { transform: translateY(-1px); }
  .q-icon { color: $text-muted; }
  &--create .q-icon { color: $green; } &--create .stat-num { color: $green; }
  &--update .q-icon { color: $amber; } &--update .stat-num { color: $amber; }
  &--delete .q-icon { color: $red;   } &--delete .stat-num { color: $red; }
  &--all    .q-icon { color: $indigo-mid; }
}
.stat-num   { font-family: 'Prompt', sans-serif; font-size: 1.05rem; font-weight: 700; color: $text-main; line-height: 1; }
.stat-label { font-size: 0.75rem; color: $text-muted; }
.search-bar {
  width: 100%; max-width: 280px;
  :deep(.q-field__control) { border-radius: 14px !important; box-shadow: 0 2px 12px rgba(55,48,163,0.08); }
  @media (max-width: 600px) { max-width: 100%; }
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────
.filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-pill {
  display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 20px;
  font-size: 0.78rem; font-weight: 600; cursor: pointer; border: 1.5px solid transparent;
  transition: all 0.18s; font-family: 'Noto Sans Thai', sans-serif;
  .pill-count { margin-left: 6px; background: rgba(0,0,0,0.08); border-radius: 10px; padding: 1px 7px; font-size: 0.7rem; }
  &--ALL    { background: #eef2ff; color: $indigo-mid; border-color: rgba(79,70,229,0.25);
              &.active,&:hover { background: $indigo-mid; color: #fff; border-color: $indigo-mid; } }
  &--CREATE { background: $green-soft; color: $green; border-color: rgba(22,163,74,0.25);
              &.active,&:hover { background: $green; color: #fff; border-color: $green; } }
  &--UPDATE { background: $amber-soft; color: $amber; border-color: rgba(217,119,6,0.25);
              &.active,&:hover { background: $amber; color: #fff; border-color: $amber; } }
  &--DELETE { background: $red-soft; color: $red; border-color: rgba(220,38,38,0.25);
              &.active,&:hover { background: $red; color: #fff; border-color: $red; } }
}

// ─── Table Card ───────────────────────────────────────────────────────────────
.table-card {
  background: $surface; border-radius: 16px; overflow: hidden;
  box-shadow: 0 4px 28px rgba(55,48,163,0.09); border: 1px solid $border-c;
}
.styled-table {
  :deep(thead tr th) {
    font-family: 'Prompt', sans-serif; font-size: clamp(0.75rem,2vw,0.82rem); font-weight: 600;
    color: $text-main; background: $surface-2; letter-spacing: 0.03em;
    border-bottom: 2px solid rgba(79,70,229,0.12); white-space: nowrap;
  }
  :deep(tbody tr) { transition: background 0.15s; &:hover { background: rgba(79,70,229,0.025) !important; } }
  :deep(tbody tr td) {
    font-size: clamp(0.78rem,2vw,0.875rem); color: $text-main;
    border-bottom: 1px solid rgba(79,70,229,0.055); vertical-align: middle;
  }
  :deep(tbody tr td:first-child) { color: $text-muted; font-size: 0.75rem; text-align: center; }
  :deep(.q-table__bottom) { border-top: 1px solid $border-c; background: $surface-2; font-size: 0.82rem; }
}

// ─── Action Badge ─────────────────────────────────────────────────────────────
.action-badge {
  display: inline-flex; align-items: center; border-radius: 8px; padding: 4px 10px;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap;
  &--create { background: $green-soft; color: #15803d; border: 1px solid rgba(22,163,74,0.2); }
  &--update { background: #fef9c3; color: #b45309; border: 1px solid rgba(217,119,6,0.2); }
  &--delete { background: $red-soft; color: #b91c1c; border: 1px solid rgba(220,38,38,0.2); }
}

// ─── Preview text ─────────────────────────────────────────────────────────────
.preview-text {
  font-size: 0.8rem; color: $text-muted;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; max-width: 280px;
}

// ─── Avatar palettes ──────────────────────────────────────────────────────────
$avatar-palettes: (
  'violet':  (#7c3aed, #5b21b6, #fff, rgba(124,58,237,0.4)),
  'indigo':  (#4f46e5, #3730a3, #fff, rgba(79,70,229,0.4)),
  'teal':    (#0d9488, #0f766e, #fff, rgba(13,148,136,0.4)),
  'rose':    (#e11d48, #be123c, #fff, rgba(225,29,72,0.4)),
  'amber':   (#d97706, #b45309, #fff, rgba(217,119,6,0.4)),
  'sky':     (#0284c7, #0369a1, #fff, rgba(2,132,199,0.4)),
  'emerald': (#059669, #047857, #fff, rgba(5,150,105,0.4)),
  'fuchsia': (#a21caf, #86198f, #fff, rgba(162,28,175,0.4)),
);

// ─── Actor ────────────────────────────────────────────────────────────────────
.actor-wrap { display: flex; align-items: center; gap: 10px; }
.actor-avatar-outer { position: relative; flex-shrink: 0; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; }
.actor-avatar {
  position: relative; z-index: 1; width: 38px; height: 38px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
  @each $name, $palette in $avatar-palettes {
    $from: nth($palette,1); $to: nth($palette,2); $ring: nth($palette,4);
    &--#{$name} { background: linear-gradient(145deg,$from 0%,$to 100%); box-shadow: 0 4px 14px $ring, inset 0 1px 0 rgba(255,255,255,0.25); }
  }
}
.actor-avatar-shine {
  position: absolute; top: 0; left: 0; right: 0; height: 52%;
  background: linear-gradient(180deg,rgba(255,255,255,0.28) 0%,transparent 100%);
  border-radius: 12px 12px 0 0; pointer-events: none;
}
.actor-initial {
  position: relative; z-index: 1; font-family: 'Prompt', sans-serif;
  font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.actor-info { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.actor-name {
  font-size: 0.84rem; font-weight: 600; color: $text-main;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.25;
}
.actor-meta-row { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
.actor-username-chip {
  display: inline-flex; align-items: center; gap: 2px;
  background: linear-gradient(135deg, rgba(79,70,229,0.08), rgba(55,48,163,0.06));
  border: 1px solid rgba(79,70,229,0.18); border-radius: 20px; padding: 2px 9px 2px 7px;
  font-size: 0.67rem; font-weight: 700; color: $indigo-mid;
  max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.actor-at-symbol { color: $indigo; font-size: 0.72rem; font-weight: 800; opacity: 0.8; margin-right: 1px; }

// ─── Role badge ───────────────────────────────────────────────────────────────
.role-badge {
  display: inline-flex; align-items: center; border-radius: 6px; padding: 2px 8px;
  font-size: 0.65rem; font-weight: 700; white-space: nowrap;
  &--superAdmin { background: linear-gradient(135deg,#ede9fe,#ddd6fe); color: #5b21b6; border: 1px solid rgba(139,92,246,0.2); }
  &--admin { background: #eef2ff; color: $indigo-mid; border: 1px solid rgba(79,70,229,0.15); }
}

// ─── Timestamp ────────────────────────────────────────────────────────────────
.ts-block { display: inline-flex; flex-direction: column; gap: 5px; }
.ts-date-pill {
  display: inline-flex; align-items: center; gap: 5px;
  background: linear-gradient(135deg,rgba(79,70,229,0.1),rgba(55,48,163,0.07));
  border: 1px solid rgba(79,70,229,0.2); border-radius: 20px; padding: 3px 10px 3px 7px;
  font-size: 0.75rem; font-weight: 700; color: $indigo-mid; white-space: nowrap;
  box-shadow: 0 1px 4px rgba(79,70,229,0.1);
}
.ts-pill-icon { color: $indigo-mid; flex-shrink: 0; opacity: 0.85; }
.ts-time-row { display: flex; align-items: center; gap: 5px; padding-left: 2px; }
.ts-clock-icon { color: $indigo-mid; opacity: 0.55; flex-shrink: 0; }
.ts-time-text { font-size: 0.7rem; color: $text-muted; font-variant-numeric: tabular-nums; letter-spacing: 0.04em; white-space: nowrap; }

// ─── Actions column ───────────────────────────────────────────────────────────
.actions-wrap { display: flex; justify-content: center; gap: 6px; }
.action-btn {
  transition: transform 0.15s !important;
  &:hover { transform: scale(1.15); }
  &--view { color: $indigo-mid !important; :deep(.q-icon) { color: $indigo-mid !important; } }
}

// ─── View Dialog ──────────────────────────────────────────────────────────────
.log-view-dialog {
  background: $surface; border-radius: 20px; overflow: hidden;
  width: 460px; max-width: 95vw;
  box-shadow: 0 20px 60px rgba(55,48,163,0.18);
  &--mobile { border-radius: 20px 20px 0 0; width: 100%; max-width: 100%; position: fixed; bottom: 0; left: 0; right: 0; }
}
.dialog-drag-handle {
  height: 20px; display: flex; align-items: center; justify-content: center; background: $surface;
  &::before { content: ''; width: 36px; height: 3px; border-radius: 2px; background: rgba(79,70,229,0.2); }
}
.lvd-header {
  display: flex; align-items: center; gap: 10px; padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #ede9fe, #f5f3ff);
  border-bottom: 1px solid rgba(124,58,237,0.08);
}
.lvd-header-icon {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: linear-gradient(135deg, $purple-mid, $purple);
  display: flex; align-items: center; justify-content: center;
}
.lvd-header-title { font-family: 'Prompt', sans-serif; font-size: 1rem; font-weight: 600; color: $text-main; }
.lvd-close-btn {
  width: 28px; height: 28px; border-radius: 8px; border: none;
  background: rgba(55,48,163,0.07); color: $text-muted;
  cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s;
  &:hover { background: rgba(55,48,163,0.14); }
}
.lvd-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 1.1rem; }
.lvd-section { display: flex; flex-direction: column; gap: 6px; }
.lvd-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: $text-muted; }
.lvd-diff-wrap { display: flex; flex-direction: column; gap: 6px; }
.lvd-diff-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.diff-field-key { font-size: 0.72rem; font-weight: 700; color: $text-muted; min-width: 60px; }
.diff-old { background: $red-soft; color: #b91c1c; border-radius: 6px; padding: 3px 9px; font-size: 0.78rem; font-weight: 600; word-break: break-all; }
.diff-new { background: $green-soft; color: #15803d; border-radius: 6px; padding: 3px 9px; font-size: 0.78rem; font-weight: 600; word-break: break-all; }
.diff-arrow { color: $text-muted; }
.diff-no-change { display: flex; align-items: center; font-size: 0.75rem; color: $text-muted; .q-icon { color: $indigo-mid; } }


.lvd-ts { display: flex; flex-direction: column; gap: 6px; }
.lvd-footer {
  display: flex; justify-content: flex-end; gap: 10px; padding: 0 1.25rem 1.25rem;
  &--mobile { display: grid !important; grid-template-columns: 1fr; }
}
.dlg-btn {
  display: inline-flex; align-items: center; padding: 9px 22px; border-radius: 10px; border: none;
  font-family: 'Noto Sans Thai', sans-serif; font-size: 0.88rem; font-weight: 600;
  cursor: pointer; transition: transform 0.1s, box-shadow 0.15s;
  &:active { transform: scale(0.96); }
  &--cancel { background: rgba(55,48,163,0.07); color: $text-muted; &:hover { background: rgba(55,48,163,0.13); } }
}

// ─── Empty ────────────────────────────────────────────────────────────────────
.empty-state { display: flex; flex-direction: column; align-items: center; padding: 3rem 1rem; }
.empty-icon  { font-size: 3rem; margin-bottom: 12px; }
.empty-title { font-family: 'Prompt', sans-serif; font-size: 1.05rem; font-weight: 600; color: $text-main; }
.empty-sub   { font-size: 0.82rem; color: $text-muted; margin-top: 4px; }

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 600px) {
  .page-hero    { padding: 1.5rem 1rem 3rem; }
  .content-wrap { padding: 0 0.75rem 2rem; gap: 0.85rem; }
  .hero-inner   { gap: 10px; }
  .hero-icon-wrap { width: 44px; height: 44px; }
  .hero-actions { width: 100%; }
  .hero-back-btn, .hero-refresh-btn { flex: 1; justify-content: center; }
  .actor-username-chip { display: none; }
  .role-badge { display: none; }
}

// ─── Click Particles ──────────────────────────────────────────────────────────
.click-particles-root { position: fixed; inset: 0; pointer-events: none; z-index: 99999; }
.click-particle {
  position: fixed; left: var(--x); top: var(--y);
  width: var(--size); height: var(--size); background: var(--color);
  pointer-events: none; will-change: transform, opacity;
  animation: clickFall var(--dur) cubic-bezier(0.2,0.9,0.4,1) forwards;
  border-radius: 50%;
  &[style*='--shape: square']   { border-radius: 3px; }
  &[style*='--shape: star']     { border-radius: 0; clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); }
  &[style*='--shape: triangle'] { background: transparent !important; border-left: calc(var(--size)*.5) solid transparent; border-right: calc(var(--size)*.5) solid transparent; border-bottom: var(--size) solid var(--color); border-radius: 0; width: 0 !important; height: 0 !important; }
  &[style*='--shape: emoji']    { background: transparent; border-radius: 0; &::after { content: var(--emoji-content); font-size: var(--size); line-height: 1; } }
}
@keyframes clickFall {
  0%   { opacity: 1; transform: translate(-50%,-50%) translate(0,0) rotate(0deg) scale(1); }
  12%  { opacity: 1; transform: translate(-50%,-50%) translate(calc(var(--dx)*.15),calc(var(--dy)*.15)) rotate(calc(var(--rot)*.1)) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%,-50%) translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(0.1); }
}
</style>