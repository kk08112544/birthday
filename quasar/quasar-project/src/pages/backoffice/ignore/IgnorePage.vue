<template>
  <q-page class="ignore-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="visibility_off" size="2rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">คำที่ถูกละเว้น</h1>
            <p class="hero-sub">จัดการคำที่ระบบจะข้ามการตรวจสอบ</p>
          </div>
        </div>
        <div class="hero-actions">
          <q-btn
            unelevated
            icon="history"
            label="บันทึกกิจกรรม"
            class="hero-add-btn"
            :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
            @click="$router.push(`/backoffice/ignore/log`)"
          />
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
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <div class="top-bar">
        <div class="stats-row">
          <div class="stat-chip">
            <q-icon name="format_list_numbered" size="18px" color="teal-6" />
            <span class="stat-num">{{ pagination.rowsNumber }}</span>
            <span class="stat-label">คำทั้งหมด</span>
          </div>
          <div class="stat-chip">
            <q-icon name="description" size="18px" color="cyan-7" />
            <span class="stat-num">{{ pagination.page }}</span>
            <span class="stat-label">
              / {{ Math.ceil(pagination.rowsNumber / pagination.rowsPerPage) || 1 }} หน้า
            </span>
          </div>
        </div>

        <q-input
          v-model="search"
          placeholder="ค้นหาคำที่ถูกละเว้น..."
          outlined
          rounded
          dense
          debounce="300"
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

      <!-- TABLE CARD -->
      <div class="table-card">
        <q-table
          flat
          :rows="rows"
          :columns="columns"
          row-key="igId"
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
            <q-inner-loading showing color="teal-6" />
          </template>

          <template v-slot:body-cell-word="props">
            <q-td :props="props">
              <div class="word-badge">
                <q-icon name="visibility_off" size="14px" color="teal-7" class="q-mr-xs" />
                {{ props.row.word }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-category="props">
            <q-td :props="props">
              <q-badge
                :label="props.row.category || 'ทั่วไป'"
                :color="getCategoryColor(props.row.category)"
                rounded
                class="category-badge"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="actions-wrap">
                <q-btn
                  unelevated
                  round
                  dense
                  color="teal-1"
                  icon="visibility"
                  size="sm"
                  class="action-btn action-btn--view"
                  @click="onView(props.row)"
                >
                  <q-tooltip class="bg-teal-8">ดูรายละเอียด</q-tooltip>
                </q-btn>
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

          <template v-slot:no-data>
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <div class="empty-title">ไม่พบข้อมูล</div>
              <div class="empty-sub">ลองค้นหาด้วยคำอื่น หรือเพิ่มคำใหม่</div>
              <q-btn
                unelevated
                color="teal-6"
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

    <!-- ===== VIEW DIALOG ===== -->
    <q-dialog v-model="viewDialog" :maximized="$q.screen.xs">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.xs }">
        <div v-if="$q.screen.xs" class="dialog-drag-handle" />
        <div class="dialog-header dialog-header--teal">
          <div class="dialog-header-icon dialog-header-icon--teal">
            <q-icon name="visibility" color="white" size="18px" />
          </div>
          <span>รายละเอียดคำ</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="viewDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <div class="view-field-label">คำที่ถูกละเว้น</div>
          <div class="word-chip">
            <q-icon
              name="visibility_off"
              size="18px"
              color="teal-7"
              class="q-mr-sm"
              style="flex-shrink: 0"
            />
            {{ viewForm?.word }}
          </div>
          <template v-if="viewForm?.category">
            <div class="view-field-label q-mt-md">หมวดหมู่</div>
            <div class="view-category-row">
              <q-badge
                :label="viewForm.category"
                :color="getCategoryColor(viewForm.category)"
                rounded
                class="category-badge"
              />
            </div>
          </template>
          <template v-if="viewForm?.description">
            <div class="view-field-label q-mt-md">หมายเหตุ</div>
            <div class="view-desc">{{ viewForm.description }}</div>
          </template>
        </div>
        <div class="dialog-footer" :class="{ 'dialog-footer--mobile': $q.screen.xs }">
          <button type="button" class="dlg-btn dlg-btn--cancel" @click="viewDialog = false">
            ปิด
          </button>
        </div>
      </div>
    </q-dialog>

    <!-- ===== ADD DIALOG ===== -->
    <q-dialog v-model="addDialog" persistent :maximized="$q.screen.xs">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.xs }">
        <div class="dialog-header dialog-header--teal-add">
          <div class="dialog-header-icon dialog-header-icon--teal">
            <q-icon name="add_circle" color="white" size="18px" />
          </div>
          <span>เพิ่มคำที่ถูกละเว้น</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="addDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit="submitAdd">
          <div class="dialog-body">
            <q-input
              v-model="addForm.word"
              label="คำที่ต้องการละเว้น"
              outlined
              dense
              autofocus
              class="styled-input q-mb-md"
              :rules="[(val) => !!val?.trim() || 'กรุณากรอกข้อมูล']"
            >
              <template v-slot:prepend>
                <q-icon name="visibility_off" color="teal-6" />
              </template>
            </q-input>
            <q-select
              v-model="addForm.category"
              label="หมวดหมู่"
              outlined
              dense
              clearable
              :options="categoryOptions"
              class="styled-input q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="category" color="teal-6" />
              </template>
            </q-select>
            <q-input
              v-model="addForm.description"
              label="หมายเหตุ (ไม่บังคับ)"
              outlined
              dense
              autogrow
              class="styled-input"
            >
              <template v-slot:prepend>
                <q-icon name="notes" color="teal-6" />
              </template>
            </q-input>
          </div>
          <div class="dialog-footer">
            <button type="button" class="dlg-btn dlg-btn--cancel" @click="addDialog = false">
              ยกเลิก
            </button>
            <button type="submit" class="dlg-btn dlg-btn--confirm-teal" :disabled="isSubmitting">
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
            <q-icon name="edit" color="white" size="18px" />
          </div>
          <span>แก้ไขคำที่ถูกละเว้น</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="editDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit="submitEdit">
          <div class="dialog-body">
            <div class="view-field-label">คำที่ถูกละเว้น</div>
            <q-input
              v-model="editForm.word"
              outlined
              dense
              autofocus
              autogrow
              class="styled-input q-mb-md"
              :rules="[(val) => !!val?.trim() || 'กรุณากรอกข้อมูล']"
            />
          
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
            <q-icon name="warning_amber" color="white" size="18px" />
          </div>
          <span>ยืนยันการลบ</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="deleteDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <div class="delete-confirm-body">
            <p class="delete-text">คุณต้องการลบคำว่า</p>
            <div class="word-chip word-chip--delete">
              <q-icon
                name="visibility_off"
                size="16px"
                color="teal-7"
                class="q-mr-xs"
                style="flex-shrink: 0"
              />
              {{ itemToDelete?.word }}
            </div>
            <p class="delete-warn">
              <q-icon name="info_outline" size="14px" class="q-mr-xs" />
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </p>
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
interface IgnoreItem {
  igId: number | string;
  word: string;

}

interface TableRow {
  displayIndex: number;
  igId: number | string;
  word: string;
  category?: string;
  description?: string;
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

// ─── Category Options ─────────────────────────────────────────────────────────
const categoryOptions = ['ทั่วไป', 'ภาษาต่างประเทศ', 'ชื่อเฉพาะ', 'คำย่อ', 'อื่นๆ'];

const getCategoryColor = (category?: string): string => {
  const map: Record<string, string> = {
    ทั่วไป: 'teal-6',
    ภาษาต่างประเทศ: 'cyan-7',
    ชื่อเฉพาะ: 'blue-6',
    คำย่อ: 'purple-5',
    อื่นๆ: 'grey-6',
  };
  return map[category ?? ''] ?? 'teal-6';
};

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
  { name: 'no', label: 'ลำดับ', field: 'displayIndex', align: 'center', style: 'width: 64px' },
  {
    name: 'word',
    label: 'คำที่ถูกละเว้น',
    field: 'word',
    align: 'left',
    style: 'white-space: normal; word-break: break-word;',
  },
 
  { name: 'actions', label: 'จัดการ', field: 'actions', align: 'center', style: 'width: 130px' },
];

// ─── Dialog State ─────────────────────────────────────────────────────────────
const viewDialog = ref(false);
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const isSubmitting = ref(false);

const viewForm = ref<TableRow | null>(null);
const addForm = ref({ word: '', category: '', description: '' });
const editForm = ref<{
  igId: number | string;
  word: string;
  category: string;
  description: string;
}>({ igId: '', word: '', category: '', description: '' });
const itemToDelete = ref<TableRow | null>(null);

// ─── Notify State ─────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
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
const fetchIgnore = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await api.get('/backoffice/ignore', {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        search: search.value.trim() || undefined,
      },
    });

    const res = response.data;
    const list: IgnoreItem[] = res.ignore?.data ?? [];
    const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;

    rows.value = list.map((item, index) => ({
      displayIndex: startIndex + index + 1,
      igId: item.igId,
      word: item.word || '-',
     
      actions: { create: false, update: true, delete: true },
    }));

    pagination.value.rowsNumber = res.ignore?.total ?? 0;
  } catch {
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

// ─── View Action ──────────────────────────────────────────────────────────────
const onView = (row: TableRow) => {
  viewForm.value = row;
  viewDialog.value = true;
};

// ─── Add Action ───────────────────────────────────────────────────────────────
const onAdd = () => {
  addForm.value = { word: '', category: '', description: '' };
  addDialog.value = true;
};

const submitAdd = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.post('/backoffice/ignore', {
      word: addForm.value.word.trim(),
      category: addForm.value.category || undefined,
      description: addForm.value.description.trim() || undefined,
    });
    addDialog.value = false;
    openNotify(true, response.data.message || 'เพิ่มคำสำเร็จ');
    void fetchIgnore();
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
  } finally {
    isSubmitting.value = false;
  }
};

// ─── Edit Action ──────────────────────────────────────────────────────────────
const onEdit = (row: TableRow) => {
  editForm.value = {
    igId: row.igId,
    word: row.word,
    category: row.category ?? '',
    description: row.description ?? '',
  };
  editDialog.value = true;
};

const submitEdit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.patch(`/backoffice/ignore/${editForm.value.igId}`, {
      word: editForm.value.word.trim(),
      category: editForm.value.category || undefined,
      description: editForm.value.description.trim() || undefined,
    });
    editDialog.value = false;
    openNotify(true, response.data.message || 'แก้ไขคำสำเร็จ');
    void fetchIgnore();
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message ?? 'เกิดข้อผิดพลาด');
  } finally {
    isSubmitting.value = false;
  }
};

// ─── Delete Action ────────────────────────────────────────────────────────────
const onDelete = (row: TableRow) => {
  itemToDelete.value = row;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!itemToDelete.value || isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.delete(`/backoffice/ignore/${itemToDelete.value.igId}`);
    deleteDialog.value = false;
    openNotify(true, response.data.message || 'ลบคำสำเร็จ');
    void fetchIgnore();
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
  pagination.value.page = search.value !== reqProps.filter ? 1 : reqProps.pagination.page;
  pagination.value.rowsPerPage = reqProps.pagination.rowsPerPage;
  pagination.value.sortBy = reqProps.pagination.sortBy;
  pagination.value.descending = reqProps.pagination.descending;
  search.value = reqProps.filter as string;
  void fetchIgnore();
};

const onSearch = () => {
  pagination.value.page = 1;
  void fetchIgnore();
};

// ─── Particle Constants ───────────────────────────────────────────────────────
const PARTICLE_COLORS = [
  '#0d9488',
  '#06b6d4',
  '#0891b2',
  '#22c55e',
  '#fbbf24',
  '#6366f1',
  '#34d399',
  '#f472b6',
  '#38bdf8',
  '#4ade80',
  '#a78bfa',
  '#facc15',
];

const PARTICLE_EMOJIS = [
  '✨', '🌿', '🍃', '💫', '⭐', '🌟', '🎋', '🌊', '❄️',
  '🎵', '💎', '🎀', '🌸', '🍀', '🦋', '🌺', '🎇', '🏵️',
];

// ─── Particle Spawn ───────────────────────────────────────────────────────────
const spawnParticles = (x: number, y: number) => {
  const count = 12 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const id = ++particleId;
    const size = 6 + Math.random() * 7;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!;
    const dur = 0.7 + Math.random() * 0.5;
    const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]!;
    const shapes: ShapeType[] = ['circle', 'circle', 'square', 'star', 'emoji'];
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
      '--color': isEmoji ? 'transparent' : color,
      '--size': isEmoji ? '18px' : `${size}px`,
      '--shape': shape,
      '--emoji-content': isEmoji ? `"${emoji}"` : '""',
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
};

const handleGlobalClick = (e: MouseEvent) => spawnParticles(e.clientX, e.clientY);

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  void fetchIgnore();
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
      void fetchIgnore();
    }
  },
);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$teal: #0f766e;
$teal-mid: #0d9488;
$teal-light: #14b8a6;
$teal-soft: #f0fdfa;
$teal-border: rgba(13, 148, 136, 0.12);
$cyan: #0e7490;
$cyan-soft: #ecfeff;
$amber: #d97706;
$amber-soft: #fef3c7;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$surface: #ffffff;
$surface-2: #f0fdfa;
$text-main: #0f2b28;
$text-muted: #9ca3af;
$radius: 16px;

// ─── Page ─────────────────────────────────────────────────────────────────────
.ignore-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(150deg, #f0fdfa 0%, #ecfeff 40%, #f0fdf4 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #042f2e 0%, $teal 40%, $teal-mid 100%);
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
  background: #5eead4;
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
  background: #22d3ee;
  top: 10px;
  left: 40%;
  animation: drift 5s ease-in-out infinite 1.5s;
}

@keyframes drift {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-14px) scale(1.05); }
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.75rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 3px;
  line-height: 1.15;
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

.hero-add-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px);
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px !important;
  font-family: 'Noto Sans Thai', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  transition: background 0.2s, transform 0.15s !important;
  &:hover {
    background: rgba(255, 255, 255, 0.25) !important;
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

@media (max-width: 600px) {
  .content-wrap {
    padding: 1.75rem 0.75rem 2rem;
    gap: 0.85rem;
  }
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
  box-shadow: 0 2px 12px rgba(13, 148, 136, 0.08);
  border: 1px solid $teal-border;
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
    box-shadow: 0 2px 12px rgba(13, 148, 136, 0.08);
  }
  @media (max-width: 600px) { max-width: 100%; }
}

// ─── Table Card ───────────────────────────────────────────────────────────────
.table-card {
  background: $surface;
  border-radius: $radius;
  overflow: hidden;
  box-shadow: 0 4px 28px rgba(13, 148, 136, 0.09);
  border: 1px solid $teal-border;
}

.styled-table {
  :deep(thead tr th) {
    font-family: 'Prompt', sans-serif;
    font-size: clamp(0.75rem, 2vw, 0.82rem);
    font-weight: 600;
    color: $text-main;
    background: $surface-2;
    letter-spacing: 0.03em;
    border-bottom: 2px solid rgba(13, 148, 136, 0.14);
    white-space: nowrap;
  }
  :deep(tbody tr) {
    transition: background 0.15s;
    &:hover { background: rgba(13, 148, 136, 0.03) !important; }
  }
  :deep(tbody tr td) {
    font-size: clamp(0.78rem, 2vw, 0.875rem);
    color: $text-main;
    border-bottom: 1px solid rgba(13, 148, 136, 0.06);
    vertical-align: middle;
  }
  :deep(tbody tr td:first-child) {
    color: $text-muted;
    font-size: 0.75rem;
    text-align: center;
  }
  :deep(.q-table__bottom) {
    border-top: 1px solid rgba(13, 148, 136, 0.08);
    background: $surface-2;
    font-size: 0.82rem;
  }
}

.word-badge {
  display: inline-flex;
  align-items: center;
  background: $teal-soft;
  color: $teal;
  border-radius: 8px;
  padding: 4px 10px;
  font-weight: 600;
  font-size: 0.85rem;
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 600px) { max-width: 120px; }
}

.category-badge {
  font-family: 'Noto Sans Thai', sans-serif !important;
  font-size: 0.78rem !important;
  padding: 3px 10px !important;
}

.actions-wrap {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.action-btn {
  transition: transform 0.15s !important;
  &:hover { transform: scale(1.15); }
  &--view {
    color: $teal-mid !important;
    :deep(.q-icon) { color: $teal-mid !important; }
  }
  &--edit {
    color: $amber !important;
    :deep(.q-icon) { color: $amber !important; }
  }
  &--delete {
    color: $red !important;
    :deep(.q-icon) { color: $red !important; }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
}
.empty-icon { font-size: 3rem; margin-bottom: 12px; }
.empty-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: $text-main;
}
.empty-sub { font-size: 0.82rem; color: $text-muted; margin-top: 4px; }

// ─── Dialogs ──────────────────────────────────────────────────────────────────
.custom-dialog {
  background: $surface;
  border-radius: 20px;
  overflow: hidden;
  width: 440px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(13, 148, 136, 0.16);
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

.delete-dialog { max-width: 380px; }

.dialog-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 1.25rem;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: $text-main;
  border-bottom: 1px solid rgba(13, 148, 136, 0.07);
  &--teal { background: linear-gradient(135deg, $teal-soft, #ccfbf1); }
  &--teal-add { background: linear-gradient(135deg, #ccfbf1, #f0fdfa); }
  &--amber { background: linear-gradient(135deg, $amber-soft, #fffbeb); }
  &--danger { background: linear-gradient(135deg, $red-soft, #fff1f2); }
}

.dialog-header-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, $teal-light, $teal);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &--teal { background: linear-gradient(135deg, $teal-light, $teal); }
  &--amber { background: linear-gradient(135deg, #f59e0b, $amber); }
  &--danger { background: linear-gradient(135deg, #ef4444, $red); }
}

.dialog-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: rgba(13, 148, 136, 0.07);
  color: $text-muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover { background: rgba(13, 148, 136, 0.14); }
}

.dialog-body { padding: 1.25rem; }
.styled-input :deep(.q-field__control) { border-radius: 12px !important; }

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 1.25rem 1.25rem;
}

.dialog-footer--mobile {
  display: grid !important;
  grid-template-columns: 1fr 1fr;
  .dlg-btn { justify-content: center; width: 100%; }
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
    background: rgba(13, 148, 136, 0.2);
  }
}

.word-chip {
  display: flex;
  align-items: flex-start;
  background: $teal-soft;
  color: $teal;
  border: 1px solid rgba(13, 148, 136, 0.2);
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  box-sizing: border-box;
  word-break: break-all;
  white-space: normal;
  line-height: 1.5;
  &--delete {
    border-radius: 10px;
    font-size: 0.95rem;
    padding: 10px 16px;
    margin-bottom: 10px;
  }
}

.view-field-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 8px;
}

.view-category-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-desc {
  background: $surface-2;
  border: 1px solid $teal-border;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.875rem;
  color: $text-main;
  line-height: 1.6;
}

.delete-confirm-body { text-align: center; padding: 0.5rem 0; }
.delete-text { font-size: 0.9rem; color: $text-muted; margin: 0 0 10px; }
.delete-warn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  color: $text-muted;
  margin: 0;
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
  transition: transform 0.1s, box-shadow 0.15s, opacity 0.15s;
  &:active { transform: scale(0.96); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
  &--cancel {
    background: rgba(13, 148, 136, 0.07);
    color: $text-muted;
    &:hover { background: rgba(13, 148, 136, 0.13); }
  }
  &--confirm-teal {
    background: linear-gradient(135deg, $teal-light, $teal);
    color: white;
    box-shadow: 0 3px 12px rgba(13, 148, 136, 0.3);
    &:hover { box-shadow: 0 5px 18px rgba(13, 148, 136, 0.4); }
  }
  &--amber {
    background: linear-gradient(135deg, #f59e0b, $amber);
    color: white;
    box-shadow: 0 3px 12px rgba(217, 119, 6, 0.3);
    &:hover { box-shadow: 0 5px 18px rgba(217, 119, 6, 0.4); }
  }
  &--danger {
    background: linear-gradient(135deg, #ef4444, $red);
    color: white;
    box-shadow: 0 3px 12px rgba(220, 38, 38, 0.3);
    &:hover { box-shadow: 0 5px 18px rgba(220, 38, 38, 0.4); }
  }
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
  &--success { background: linear-gradient(135deg, $green-dark, $green); }
  &--error { background: linear-gradient(135deg, #7f1d1d, $red); }
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
.notify-sub { font-size: 0.75rem; color: rgba(255, 255, 255, 0.72); margin-top: 2px; }
.notify-body { padding: 1.5rem 1.5rem 0.75rem; text-align: center; }

.notify-emoji {
  font-size: 2.8rem;
  margin-bottom: 0.75rem;
  display: block;
  animation: notifyPop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes notifyPop {
  0% { transform: scale(0.5); opacity: 0; }
  80% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

.notify-msg {
  font-size: 0.92rem;
  font-weight: 600;
  color: #374151;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0 0 1rem;
  line-height: 1.6;
  &--success { background: $green-soft; }
  &--error { background: $red-soft; }
}

.notify-progress {
  height: 4px;
  width: 100%;
  animation: progressShrink linear forwards;
  &--success { background: linear-gradient(90deg, $green-dark, $green); }
  &--error { background: linear-gradient(90deg, #7f1d1d, $red); }
}

@keyframes progressShrink {
  from { width: 100%; }
  to { width: 0%; }
}

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 600px) {
  .page-hero { padding: 1.5rem 1rem 3rem; }
  .content-wrap { padding: 0 0.75rem 2rem; gap: 0.85rem; }
  .hero-inner { gap: 10px; }
  .hero-icon-wrap { width: 44px; height: 44px; }
  .hero-actions { width: 100%; }
  .hero-add-btn { flex: 1; justify-content: center; }
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

  &[style*='--shape: square'] { border-radius: 3px; }
  &[style*='--shape: star'] {
    border-radius: 0;
    clip-path: polygon(
      50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
      50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
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