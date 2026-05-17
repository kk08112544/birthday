<template>
  <q-page class="unpolite-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-icon-wrap">
          <q-icon name="block" size="2rem" color="white" />
        </div>
        <div>
          <h1 class="hero-title">คำไม่พึงประสงค์</h1>
          <p class="hero-sub">จัดการคำที่ไม่เหมาะสมในระบบ</p>
        </div>
        <q-space />
        <q-btn
          unelevated
          icon="add_circle"
          label="เพิ่มคำ"
          class="hero-add-btn"
          :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
          @click="onAdd"
        />
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <!-- Top bar: stats + search -->
      <div class="top-bar">
        <div class="stats-row">
          <div class="stat-chip">
            <q-icon name="format_list_numbered" size="18px" color="deep-purple-5" />
            <span class="stat-num">{{ pagination.rowsNumber }}</span>
            <span class="stat-label">คำทั้งหมด</span>
          </div>
          <div class="stat-chip">
            <q-icon name="description" size="18px" color="teal-6" />
            <span class="stat-num">{{ pagination.page }}</span>
            <span class="stat-label">
              / {{ Math.ceil(pagination.rowsNumber / pagination.rowsPerPage) || 1 }} หน้า
            </span>
          </div>
        </div>

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

      <!-- TABLE CARD -->
      <div class="table-card">
        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="upId"
          v-model:pagination="pagination"
          :loading="loading"
          :filter="search"
          binary-state-sort
          @request="onRequest"
          :rows-per-page-options="[10, 20, 50]"
          :table-style="$q.screen.xs ? 'font-size: 0.8rem' : ''"
          class="styled-table"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="deep-purple-5" />
          </template>

          <!-- Word column -->
          <template v-slot:body-cell-word="props">
            <q-td :props="props">
              <div class="word-badge">
                <q-icon name="label_off" size="14px" color="negative" class="q-mr-xs" />
                {{ props.row.word }}
              </div>
            </q-td>
          </template>

          <!-- Actions column -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="actions-wrap">
                <q-btn
                  v-if="props.row.actions.update"
                  unelevated
                  round
                  dense
                  color="amber-1"
                  icon="edit"
                  size="sm"
                  class="action-btn action-btn--edit"
                  @click="onEdit(props.row)"
                >
                  <q-tooltip class="bg-amber-8">แก้ไข</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="props.row.actions.delete"
                  unelevated
                  round
                  dense
                  color="red-1"
                  icon="delete_outline"
                  size="sm"
                  class="action-btn action-btn--delete"
                  @click="onDelete(props.row)"
                >
                  <q-tooltip class="bg-negative">ลบ</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>

          <!-- Empty state -->
          <template v-slot:no-data>
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <div class="empty-title">ไม่พบข้อมูล</div>
              <div class="empty-sub">ลองค้นหาด้วยคำอื่น หรือเพิ่มคำใหม่</div>
              <q-btn
                unelevated
                color="deep-purple-5"
                icon="add"
                label="เพิ่มคำแรก"
                class="q-mt-md"
                rounded
                @click="onAdd"
              />
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <!-- ===== ADD DIALOG ===== -->
    <q-dialog v-model="addDialog" persistent :maximized="$q.screen.xs">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.xs }">
        <div class="dialog-header dialog-header--purple">
          <div class="dialog-header-icon">
            <q-icon name="add_circle" color="white" size="20px" />
          </div>
          <span>เพิ่มคำไม่พึงประสงค์</span>
          <q-space />
          <button class="dialog-close-btn" @click="addDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit="submitAdd">
          <div class="dialog-body">
            <q-input
              v-model="addForm.word"
              label="คำไม่พึงประสงค์"
              outlined
              dense
              autofocus
              class="styled-input"
              :rules="[(val) => !!val?.trim() || 'กรุณากรอกข้อมูล']"
            >
              <template v-slot:prepend>
                <q-icon name="label_off" color="deep-purple-5" />
              </template>
            </q-input>
          </div>
          <div class="dialog-footer">
            <button type="button" class="dlg-btn dlg-btn--cancel" @click="addDialog = false">
              ยกเลิก
            </button>
            <button type="submit" class="dlg-btn dlg-btn--confirm" :disabled="isSubmitting">
              <q-circular-progress
                v-if="isSubmitting"
                indeterminate
                size="16px"
                color="white"
                class="q-mr-xs"
              />
              บันทึก
            </button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== EDIT DIALOG ===== -->
    <q-dialog v-model="editDialog" persistent :maximized="$q.screen.xs">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.xs }">
        <div class="dialog-header dialog-header--amber">
          <div class="dialog-header-icon dialog-header-icon--amber">
            <q-icon name="edit" color="white" size="20px" />
          </div>
          <span>แก้ไขคำไม่พึงประสงค์</span>
          <q-space />
          <button class="dialog-close-btn" @click="editDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit="submitEdit">
          <div class="dialog-body">
            <q-input
              v-model="editForm.word"
              label="คำไม่พึงประสงค์"
              outlined
              dense
              autofocus
              class="styled-input"
              :rules="[(val) => !!val?.trim() || 'กรุณากรอกข้อมูล']"
            >
              <template v-slot:prepend>
                <q-icon name="edit" color="amber-8" />
              </template>
            </q-input>
          </div>
          <div class="dialog-footer">
            <button type="button" class="dlg-btn dlg-btn--cancel" @click="editDialog = false">
              ยกเลิก
            </button>
            <button type="submit" class="dlg-btn dlg-btn--amber" :disabled="isSubmitting">
              <q-circular-progress
                v-if="isSubmitting"
                indeterminate
                size="16px"
                color="white"
                class="q-mr-xs"
              />
              อัปเดต
            </button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DELETE DIALOG ===== -->
    <q-dialog v-model="deleteDialog" persistent>
      <div class="custom-dialog delete-dialog">
        <div class="dialog-header dialog-header--danger">
          <div class="dialog-header-icon dialog-header-icon--danger">
            <q-icon name="warning_amber" color="white" size="20px" />
          </div>
          <span>ยืนยันการลบ</span>
          <q-space />
          <button class="dialog-close-btn" @click="deleteDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <div class="delete-confirm-body">
            <p class="delete-text">คุณต้องการลบคำว่า</p>
            <div class="delete-word-chip">
              <q-icon name="label_off" size="16px" color="negative" class="q-mr-xs" />
              {{ itemToDelete?.word }}
            </div>
            <p class="delete-warn">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button type="button" class="dlg-btn dlg-btn--cancel" @click="deleteDialog = false">
            ยกเลิก
          </button>
          <button
            type="button"
            class="dlg-btn dlg-btn--danger"
            :disabled="isSubmitting"
            @click="confirmDelete"
          >
            <q-circular-progress
              v-if="isSubmitting"
              indeterminate
              size="16px"
              color="white"
              class="q-mr-xs"
            />
            ยืนยันการลบ
          </button>
        </div>
      </div>
    </q-dialog>

    <!-- ===== NOTIFY DIALOG ===== -->
    <q-dialog v-model="showNotifyDialog">
      <div class="notify-dialog">
        <div
          class="notify-header"
          :class="notifySuccess ? 'notify-header--success' : 'notify-header--error'"
        >
          <div class="notify-header-icon">
            <q-icon
              :name="notifySuccess ? 'check_circle' : 'error_outline'"
              size="1.6rem"
              color="white"
            />
          </div>
          <div>
            <div class="notify-title">{{ notifySuccess ? 'สำเร็จ!' : 'เกิดข้อผิดพลาด' }}</div>
            <div class="notify-sub">
              {{ notifySuccess ? 'ดำเนินการเรียบร้อยแล้ว' : 'กรุณาลองใหม่อีกครั้ง' }}
            </div>
          </div>
        </div>
        <div class="notify-body">
          <div class="notify-emoji">{{ notifySuccess ? '✅' : '⚠️' }}</div>
          <p
            class="notify-msg"
            :class="notifySuccess ? 'notify-msg--success' : 'notify-msg--error'"
          >
            {{ notifyMessage }}
          </p>
        </div>
        <!-- :key forces progress animation to restart on every new notification -->
        <div
          :key="notifyKey"
          class="notify-progress"
          :class="notifySuccess ? 'notify-progress--success' : 'notify-progress--error'"
          :style="{ animationDuration: `${NOTIFY_DURATION}ms` }"
        />
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import type { QTableProps, QTableColumn } from 'quasar';
import type { AxiosError } from 'axios';

// ─── Constants ────────────────────────────────────────────────────────────────
const NOTIFY_DURATION = 2000;

// ─── Types ────────────────────────────────────────────────────────────────────
interface UnpoliteItem {
  upId: number | string;
  word: string;
}

interface TableRow {
  displayIndex: number;
  upId: number | string;
  word: string;
  actions: { create: boolean; update: boolean; delete: boolean };
}

interface Particle {
  id: number;
  style: Record<string, string>;
}

type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

// ─── Props & Quasar ───────────────────────────────────────────────────────────
const props = defineProps<{ id: string }>();
const $q = useQuasar();

// ─── Table State ──────────────────────────────────────────────────────────────
const rows = ref<TableRow[]>([]);
const loading = ref(false);
const search = ref('');

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: '',
  descending: false,
});

const columns: QTableColumn[] = [
  {
    name: 'no',
    label: 'ลำดับ',
    field: 'displayIndex',
    align: 'center',
    style: 'width: 64px',
  },
  {
    name: 'word',
    label: 'คำไม่พึงประสงค์',
    field: 'word',
    align: 'left',
    style: 'white-space: normal; word-break: break-word;',
  },
  {
    name: 'actions',
    label: 'จัดการ',
    field: 'actions',
    align: 'center',
    style: 'width: 110px',
  },
];

// ─── Dialog State ─────────────────────────────────────────────────────────────
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const isSubmitting = ref(false);

const addForm = ref({ word: '' });
const editForm = ref<{ upId: number | string; word: string }>({ upId: '', word: '' });
const itemToDelete = ref<TableRow | null>(null);

// ─── Notify State ─────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
// Incremented on every notification to force progress animation restart
const notifyKey = ref(0);
let notifyTimer: ReturnType<typeof setTimeout> | null = null;

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const openNotify = (success: boolean, message: string) => {
  if (notifyTimer) clearTimeout(notifyTimer);
  notifySuccess.value = success;
  notifyMessage.value = message;
  notifyKey.value++;
  showNotifyDialog.value = true;
  notifyTimer = setTimeout(() => {
    showNotifyDialog.value = false;
  }, NOTIFY_DURATION);
};

const clearSearch = () => {
  search.value = '';
  onSearch();
};

// ─── Data Fetching ────────────────────────────────────────────────────────────
const fetchUnpolite = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await api.get('/backoffice/unpolite', {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        search: search.value.trim() || undefined,
      },
    });

    const res = response.data;
    const list: UnpoliteItem[] = res.unpolite?.data ?? [];
    const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;

    rows.value = list.map((item, index) => ({
      displayIndex: startIndex + index + 1,
      upId: item.upId,
      word: item.word || '-',
      actions: { create: false, update: true, delete: true },
    }));

    pagination.value.rowsNumber = res.unpolite?.total ?? 0;
  } catch {
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

// ─── CRUD Actions ─────────────────────────────────────────────────────────────
const onAdd = () => {
  addForm.value.word = '';
  addDialog.value = true;
};

const submitAdd = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.post('/backoffice/unpolite', {
      word: addForm.value.word.trim(),
    });
    addDialog.value = false;
    openNotify(true, response.data.message || 'เพิ่มคำสำเร็จ');
    void fetchUnpolite();
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
  } finally {
    isSubmitting.value = false;
  }
};

const onEdit = (row: TableRow) => {
  editForm.value = { upId: row.upId, word: row.word };
  editDialog.value = true;
};

const submitEdit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.patch(`/backoffice/unpolite/${editForm.value.upId}`, {
      word: editForm.value.word.trim(),
    });
    editDialog.value = false;
    openNotify(true, response.data.message || 'แก้ไขคำสำเร็จ');
    void fetchUnpolite();
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message ?? 'เกิดข้อผิดพลาด');
  } finally {
    isSubmitting.value = false;
  }
};

const onDelete = (row: TableRow) => {
  itemToDelete.value = row;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!itemToDelete.value || isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.delete(`/backoffice/unpolite/${itemToDelete.value.upId}`);
    deleteDialog.value = false;
    openNotify(true, response.data.message || 'ลบคำสำเร็จ');
    void fetchUnpolite();
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message ?? 'เกิดข้อผิดพลาด');
  } finally {
    isSubmitting.value = false;
    itemToDelete.value = null;
  }
};

// ─── Table Events ─────────────────────────────────────────────────────────────
const onRequest: QTableProps['onRequest'] = (reqProps) => {
  // Reset to page 1 when filter changes
  pagination.value.page = search.value !== reqProps.filter ? 1 : reqProps.pagination.page;
  pagination.value.rowsPerPage = reqProps.pagination.rowsPerPage;
  pagination.value.sortBy = reqProps.pagination.sortBy;
  pagination.value.descending = reqProps.pagination.descending;
  search.value = reqProps.filter as string;
  void fetchUnpolite();
};

const onSearch = () => {
  pagination.value.page = 1;
  void fetchUnpolite();
};

// ─── Particle Constants ───────────────────────────────────────────────────────
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
  '#ff6b6b',
  '#ffd93d',
  '#6bcb77',
  '#4d96ff',
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

const SHAPES: ShapeType[] = ['circle', 'square', 'star', 'triangle', 'emoji'];
const WEIGHTS = [0.25, 0.2, 0.2, 0.15, 0.2];

const pickShape = (): ShapeType => {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < SHAPES.length; i++) {
    cumulative += WEIGHTS[i] ?? 0;
    if (r < cumulative) return SHAPES[i] ?? 'circle';
  }
  return 'circle';
};

// ─── Particle Spawn ───────────────────────────────────────────────────────────
const spawnParticles = (x: number, y: number) => {
  const count = 36 + Math.floor(Math.random() * 12);
  const W = window.innerWidth;
  const H = window.innerHeight;

  const zones: Array<() => [number, number]> = [
    () => [Math.random() * W * 0.35, Math.random() * H * 0.35],
    () => [W * 0.25 + Math.random() * W * 0.5, Math.random() * H * 0.25],
    () => [W * 0.65 + Math.random() * W * 0.35, Math.random() * H * 0.35],
    () => [W * 0.65 + Math.random() * W * 0.35, H * 0.25 + Math.random() * H * 0.5],
    () => [W * 0.65 + Math.random() * W * 0.35, H * 0.65 + Math.random() * H * 0.35],
    () => [W * 0.25 + Math.random() * W * 0.5, H * 0.75 + Math.random() * H * 0.25],
    () => [Math.random() * W * 0.35, H * 0.65 + Math.random() * H * 0.35],
    () => [Math.random() * W * 0.25, H * 0.25 + Math.random() * H * 0.5],
  ];

  for (let i = 0; i < count; i++) {
    const id = ++particleId;
    const size = 7 + Math.random() * 11;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!;
    const dur = 1.2 + Math.random() * 1.2;
    const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]!;
    const shape = pickShape();
    const isEmoji = shape === 'emoji';

    const [targetX, targetY] = zones[i % zones.length]!();

    const style: Record<string, string> = {
      '--x': `${x}px`,
      '--y': `${y}px`,
      '--dx': `${targetX - x}px`,
      '--dy': `${targetY - y}px`,
      '--dur': `${dur}s`,
      '--color': isEmoji ? 'transparent' : color,
      '--size': isEmoji ? '22px' : `${size}px`,
      '--shape': shape,
      '--emoji-content': isEmoji ? `"${emoji}"` : '""',
      '--rot': `${Math.random() * 720 - 360}deg`,
    };

    activeParticles.value.push({ id, style });
    setTimeout(
      () => {
        activeParticles.value = activeParticles.value.filter((p) => p.id !== id);
      },
      dur * 1000 + 200,
    );
  }
};

const handleGlobalClick = (e: MouseEvent) => {
  spawnParticles(e.clientX, e.clientY);
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  void fetchUnpolite();
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (notifyTimer) clearTimeout(notifyTimer);
});

watch(
  () => props.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      pagination.value.page = 1;
      void fetchUnpolite();
    }
  },
);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$purple: #5b21b6;
$purple-mid: #7c3aed;
$purple-soft: #ede9fe;
$amber: #d97706;
$amber-soft: #fef3c7;
$red: #dc2626;
$red-soft: #fee2e2;
$teal: #0d9488;
$surface: #ffffff;
$surface-2: #f8f7ff;
$text-main: #1e1b4b;
$text-muted: #9ca3af;
$radius: 16px;

// ─── Page ─────────────────────────────────────────────────────────────────────
.unpolite-page {
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
  max-width: 900px;
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

.hero-add-btn {
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
  max-width: 900px;
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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.stats-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  background: $surface;
  border-radius: 12px;
  padding: 9px 16px;
  box-shadow: 0 2px 12px rgba(91, 33, 182, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.1);
}

.stat-num {
  font-family: 'Prompt', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: $text-main;
  line-height: 1;
}

.stat-label {
  font-size: 0.78rem;
  color: $text-muted;
}

.search-bar {
  width: 100%;
  max-width: 320px;

  :deep(.q-field__control) {
    border-radius: 14px !important;
    box-shadow: 0 2px 12px rgba(91, 33, 182, 0.08);
  }

  @media (max-width: 600px) {
    max-width: 100%;
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

.actions-wrap {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.action-btn {
  transition: transform 0.15s !important;

  &:hover {
    transform: scale(1.15);
  }

  &--edit {
    color: $amber !important;
    :deep(.q-icon) {
      color: $amber !important;
    }
  }

  &--delete {
    color: $red !important;
    :deep(.q-icon) {
      color: $red !important;
    }
  }
}

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

// ─── Dialogs ──────────────────────────────────────────────────────────────────
.custom-dialog {
  background: $surface;
  border-radius: 20px;
  overflow: hidden;
  width: 420px;
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

.delete-dialog {
  max-width: 380px;
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

  &--purple {
    background: linear-gradient(135deg, #ede9fe, #f5f3ff);
  }
  &--amber {
    background: linear-gradient(135deg, #fef3c7, #fffbeb);
  }
  &--danger {
    background: linear-gradient(135deg, #fee2e2, #fff1f2);
  }
}

.dialog-header-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, $purple-mid, $purple);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &--amber {
    background: linear-gradient(135deg, #f59e0b, $amber);
  }
  &--danger {
    background: linear-gradient(135deg, #ef4444, $red);
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
}

.styled-input :deep(.q-field__control) {
  border-radius: 12px !important;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 1.25rem 1.25rem;
}

// ─── Dialog Buttons ───────────────────────────────────────────────────────────
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

  &--confirm {
    background: linear-gradient(135deg, $purple-mid, $purple);
    color: white;
    box-shadow: 0 3px 12px rgba(91, 33, 182, 0.3);
    &:hover {
      box-shadow: 0 5px 18px rgba(91, 33, 182, 0.4);
    }
  }

  &--amber {
    background: linear-gradient(135deg, #f59e0b, $amber);
    color: white;
    box-shadow: 0 3px 12px rgba(217, 119, 6, 0.3);
    &:hover {
      box-shadow: 0 5px 18px rgba(217, 119, 6, 0.4);
    }
  }

  &--danger {
    background: linear-gradient(135deg, #ef4444, $red);
    color: white;
    box-shadow: 0 3px 12px rgba(220, 38, 38, 0.3);
    &:hover {
      box-shadow: 0 5px 18px rgba(220, 38, 38, 0.4);
    }
  }
}

// ─── Delete Confirm Body ──────────────────────────────────────────────────────
.delete-confirm-body {
  text-align: center;
  padding: 0.5rem 0;
}

.delete-text {
  font-size: 0.9rem;
  color: $text-muted;
  margin: 0 0 10px;
}

.delete-word-chip {
  display: inline-flex;
  align-items: center;
  background: $red-soft;
  color: $red;
  border-radius: 10px;
  padding: 7px 16px;
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.delete-warn {
  font-size: 0.78rem;
  color: $text-muted;
  margin: 0;
}

// ─── Notify Dialog ────────────────────────────────────────────────────────────
.notify-dialog {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 340px;
  max-width: 92vw;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.12);
}

.notify-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;

  &--success {
    background: linear-gradient(135deg, #14532d, #16a34a);
  }
  &--error {
    background: linear-gradient(135deg, #7f1d1d, #dc2626);
  }
}

.notify-header-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notify-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.notify-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}

.notify-body {
  padding: 1.5rem 1.5rem 0.75rem;
  text-align: center;
}

.notify-emoji {
  font-size: 2.8rem;
  margin-bottom: 0.75rem;
  display: block;
  animation: notifyPop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes notifyPop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  80% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.notify-msg {
  font-size: 0.92rem;
  font-weight: 600;
  color: #374151;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0 0 1rem;
  line-height: 1.6;

  &--success {
    background: #f0fdf4;
  }
  &--error {
    background: #fef2f2;
  }
}

// Auto-close progress bar
.notify-progress {
  height: 4px;
  width: 100%;
  animation: progressShrink linear forwards;

  &--success {
    background: linear-gradient(90deg, #14532d, #16a34a);
  }
  &--error {
    background: linear-gradient(90deg, #7f1d1d, #dc2626);
  }
}

@keyframes progressShrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
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
