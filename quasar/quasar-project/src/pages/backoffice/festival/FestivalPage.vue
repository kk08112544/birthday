<template>
  <q-page class="festival-list-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <!-- <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="celebration" size="1.8rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">รายการเทศกาล</h1>
            <p class="hero-sub">จัดการเทศกาลสำหรับส่งคำอวยพร</p>
          </div>
        </div>
      <q-btn
          unelevated
          icon="history"
          label="บันทึกกิจกรรม"
          to="/backoffice/festival/create"
          class="hero-add-btn"
          :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
        />
        <q-btn
          unelevated
          icon="add_circle"
          label="เพิ่มเทศกาล"
          to="/backoffice/festival/create"
          class="hero-add-btn"
          :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
        />
      </div> -->
      <div class="hero-inner">
  <div class="hero-left">
    <div class="hero-icon-wrap">
      <q-icon name="celebration" size="1.8rem" color="white" />
    </div>
    <div>
      <h1 class="hero-title">รายการเทศกาล</h1>
      <p class="hero-sub">จัดการเทศกาลสำหรับส่งคำอวยพร</p>
    </div>
  </div>

  <!-- ✅ ห่อปุ่มทั้งสองในก้อนเดียว -->
  <div class="hero-actions">
    <q-btn
      unelevated
      icon="history"
      label="บันทึกกิจกรรม"
      to="/backoffice/festival/log"
      class="hero-add-btn"
      :class="$q.screen.xs ? 'full-width' : ''"
    />
    <q-btn
      unelevated
      icon="add_circle"
      label="เพิ่มเทศกาล"
      to="/backoffice/festival/create"
      class="hero-add-btn"
      :class="$q.screen.xs ? 'full-width' : ''"
    />
  </div>
</div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <!-- STATS + SEARCH ROW -->
      <div class="top-bar">
        <div class="stats-row">
          <div class="stat-chip">
            <q-icon name="auto_awesome" size="17px" color="deep-orange-5" />
            <span class="stat-num">{{ pagination.rowsNumber }}</span>
            <span class="stat-label">เทศกาล</span>
          </div>
          <div class="stat-chip">
            <q-icon name="layers" size="17px" color="teal-6" />
            <span class="stat-num">{{ pagination.page }}</span>
            <span class="stat-label">
              / {{ Math.ceil(pagination.rowsNumber / pagination.rowsPerPage) || 1 }} หน้า
            </span>
          </div>
        </div>

        <q-input
          v-model="search"
          placeholder="ค้นหาเทศกาล..."
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

      <!-- LOADING SKELETON -->
      <div v-if="loading" class="card-grid">
        <div v-for="n in 6" :key="n" class="festival-card festival-card--skeleton">
          <q-skeleton height="160px" square />
          <div class="card-info">
            <q-skeleton type="text" width="70%" />
            <q-skeleton type="text" width="40%" class="q-mt-xs" />
          </div>
        </div>
      </div>

      <!-- CARD GRID -->
      <transition-group v-else-if="rows.length" name="card-list" tag="div" class="card-grid">
        <div v-for="row in rows" :key="row.fId" class="festival-card">
          <!-- Cover image -->
          <div class="card-cover">
            <!-- <q-img
              v-if="row.image"
              :src="row.image"
              :ratio="16 / 9"
              fit="contain"
              class="card-cover-img"
            > -->
            <!-- <q-img
  v-if="row.image"
  :src="row.image"
  :ratio="2188 / 417"
  fit="cover"
  class="card-cover-img"
>
              <div class="card-cover-overlay" />
            </q-img> -->
            <!-- แทนที่ q-img เดิม -->
            <div
              v-if="row.image"
              class="card-cover-img"
              :style="{ backgroundImage: `url(${row.image})` }"
            >
              <div class="card-cover-overlay" />
            </div>
            <div v-else class="card-cover-placeholder">
              <q-icon name="celebration" size="2.5rem" color="deep-orange-3" />
            </div>

            <!-- Index badge -->
            <div class="card-index-badge">{{ row.displayIndex }}</div>
          </div>

          <!-- Card info -->
          <div class="card-info">
            <router-link :to="`/${row.fId}`" class="card-name">
              {{ row.festivalName }}
            </router-link>
            <div class="card-meta">
              <q-icon name="link" size="13px" class="q-mr-xs" />
              ดูหน้าเทศกาล
            </div>
            <div class="card-creator">
              <q-icon name="person_outline" size="12px" class="creator-icon" />
              <span class="creator-label">สร้างโดย:</span>
              <span class="creator-name">{{ row.createdByUser?.firstName || '-' }}</span>
            </div>
            <div
              class="card-status"
              :class="row.isActive ? 'card-status--active' : 'card-status--inactive'"
            >
              <span class="status-dot" />
              {{ row.isActive ? 'อยู่ระหว่างการใช้งาน' : 'ไม่อยู่ระหว่างช่วงบริการ' }}
            </div>
          </div>

          <!-- Card actions -->
          <div class="card-actions">
            <router-link
              v-if="
                row.actions.update &&
                row.isEditStartEndDate &&
                row.createdBy === Number(LocalStorage.getItem('userId'))
              "
              :to="`/backoffice/festival/edit/${row.fId}`"
              class="card-action-btn card-action-btn--edit"
            >
              <q-icon name="edit" size="15px" />
            </router-link>
            <router-link
              v-if="row.actions.view"
              :to="`/backoffice/festival/view/${row.fId}`"
              class="card-action-btn card-action-btn--view"
            >
              <q-icon name="visibility" size="15px" />
            </router-link>
            <button
              v-if="
                row.actions.delete &&
                row.isDelete &&
                row.createdBy === Number(LocalStorage.getItem('userId'))
              "
              class="card-action-btn card-action-btn--delete"
              @click="onDelete(row)"
            >
              <q-icon name="delete_outline" size="15px" />
            </button>
          </div>
        </div>
      </transition-group>

      <!-- EMPTY STATE -->
      <div v-else class="empty-state">
        <div class="empty-icon">🎊</div>
        <div class="empty-title">ยังไม่มีเทศกาล</div>
        <div class="empty-sub">เริ่มสร้างเทศกาลแรกของคุณได้เลย!</div>
        <q-btn
          unelevated
          color="deep-orange-5"
          icon="add_circle"
          label="เพิ่มเทศกาลแรก"
          to="/backoffice/festival/create"
          rounded
          class="q-mt-lg"
        />
      </div>

      <!-- PAGINATION -->
      <div v-if="rows.length" class="pagination-wrap">
        <q-pagination
          v-model="pagination.page"
          :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage) || 1"
          :max-pages="$q.screen.xs ? 4 : 7"
          direction-links
          boundary-links
          color="deep-orange-5"
          active-design="unelevated"
          active-color="deep-orange-5"
          @update:model-value="onPageChange"
        />
        <div class="rows-per-page">
          <span class="rpp-label">แสดง</span>
          <q-select
            v-model="pagination.rowsPerPage"
            :options="[10, 20, 50]"
            dense
            outlined
            class="rpp-select"
            @update:model-value="onRppChange"
          />
          <span class="rpp-label">รายการ</span>
        </div>
      </div>
    </div>

    <!-- ===== DELETE DIALOG ===== -->
    <q-dialog v-model="deleteDialog" persistent>
      <div class="custom-dialog">
        <div class="dialog-header dialog-header--danger">
          <div class="dialog-header-icon">
            <q-icon name="warning_amber" color="white" size="20px" />
          </div>
          <span>ยืนยันการลบ</span>
          <q-space />
          <button class="dialog-close-btn" @click="deleteDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>

        <div class="dialog-body">
          <div v-if="itemToDelete" class="delete-preview">
            <div class="delete-preview-img">
              <q-img
                v-if="itemToDelete.image"
                :src="itemToDelete.image"
                :ratio="16 / 9"
                class="delete-img"
              />
              <div v-else class="delete-img-placeholder">
                <q-icon name="celebration" size="2rem" color="deep-orange-3" />
              </div>
            </div>
            <div class="delete-festival-name">{{ itemToDelete.festivalName }}</div>
          </div>
          <p class="delete-warn-text">
            <q-icon name="info_outline" size="15px" class="q-mr-xs" />
            การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </p>
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
import { ref, onMounted, onUnmounted } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import type { AxiosError } from 'axios';

// ─── Constants ────────────────────────────────────────────────────────────────
const NOTIFY_DURATION = 2000;

// ─── Types ────────────────────────────────────────────────────────────────────
interface FestivalItem {
  fId: number | string;
  festivalName: string;
  image: string;
  startDate?: string;
  endDate?: string;
  isEditStartEndDate: boolean;
  isDelete: boolean;
  createdBy: number;
  createdByUser: {
    uId: number;
    firstName: string;
  };
}

interface TableRow {
  displayIndex: number;
  fId: number | string;
  festivalName: string;
  image: string;
  isActive: boolean;
  isEditStartEndDate: boolean;
  isDelete: boolean;
  createdBy: number;
  createdByUser: {
    uId: number;
    firstName: string;
  };
  actions: { create: boolean; view: boolean; update: boolean; delete: boolean };
}

interface Particle {
  id: number;
  style: Record<string, string>;
}

type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

// ─── Quasar ───────────────────────────────────────────────────────────────────
const $q = useQuasar();

// ─── Table State ──────────────────────────────────────────────────────────────
const rows = ref<TableRow[]>([]);
const loading = ref(false);
const search = ref('');
const isSubmitting = ref(false);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

// ─── Dialog State ─────────────────────────────────────────────────────────────
const deleteDialog = ref(false);
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

const getImageUrl = async (imagePath: string): Promise<string> => {
  if (!imagePath) return '';
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch {
    return '';
  }
};

// ─── Data Fetching ────────────────────────────────────────────────────────────

// const fetchMinFestival = async(): Promise<void> => {
//   loading.value = true;
//   try{
//      const response = await api.get('/backoffice/festival/min');
//      const res = response.data;

//   }catch(error){
//     openNotify(false, 'ไม่พบข้อมูล');
//   }
// }
const fetchFestival = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await api.get('/backoffice/festival', {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        search: search.value.trim() || undefined,
      },
    });

    const res = response.data;
    const list: FestivalItem[] = res.festival?.data ?? [];
    const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;

    rows.value = await Promise.all(
      list.map(async (item, index) => {
        const now = new Date();
        const start = item.startDate ? new Date(item.startDate) : null;
        const end = item.endDate ? new Date(item.endDate) : null;

        if (end) end.setHours(23, 59, 59, 999);

        const isActive = !!start && !!end && now >= start && now <= end;

        return {
          displayIndex: startIndex + index + 1,
          fId: item.fId,
          festivalName: item.festivalName || '-',
          image: item.image ? await getImageUrl(item.image) : '',
          isActive,
          isEditStartEndDate: item.isEditStartEndDate,
          isDelete: item.isDelete,
          createdBy: item.createdBy,
          createdByUser: item.createdByUser, // ✅ เพิ่มบรรทัดนี้
          actions: { create: false, view: true, update: true, delete: true },
        };
      }),
    );

    pagination.value.rowsNumber = res.festival?.total ?? 0;
  } catch {
    openNotify(false, 'ไม่สามารถโหลดข้อมูลได้');
  } finally {
    loading.value = false;
  }
};

// ─── Delete ───────────────────────────────────────────────────────────────────
const onDelete = (row: TableRow) => {
  itemToDelete.value = row;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!itemToDelete.value || isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const response = await api.delete(`/backoffice/festival/${itemToDelete.value.fId}`);
    deleteDialog.value = false;
    openNotify(true, response.data.message || 'ลบเทศกาลสำเร็จ');
    void fetchFestival();
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message || 'เกิดข้อผิดพลาด');
  } finally {
    isSubmitting.value = false;
    itemToDelete.value = null;
  }
};

// ─── Table Events ─────────────────────────────────────────────────────────────
const onSearch = () => {
  pagination.value.page = 1;
  void fetchFestival();
};

const onPageChange = () => {
  void fetchFestival();
};

const onRppChange = () => {
  pagination.value.page = 1;
  void fetchFestival();
};

// ─── Particle Constants ───────────────────────────────────────────────────────
// const PARTICLE_COLORS = [
//   '#e11d48', '#fbbf24', '#6366f1', '#22c55e',
//   '#fb7185', '#f59e0b', '#a78bfa', '#34d399',
//   '#f472b6', '#38bdf8', '#4ade80', '#facc15',
//   '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
// ];
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

// const SHAPES: ShapeType[] = ['circle', 'square', 'star', 'triangle', 'emoji'];
// const WEIGHTS = [0.25, 0.2, 0.2, 0.15, 0.2];

// const pickShape = (): ShapeType => {
//   const r = Math.random();
//   let cumulative = 0;
//   for (let i = 0; i < SHAPES.length; i++) {
//     cumulative += WEIGHTS[i] ?? 0;
//     if (r < cumulative) return SHAPES[i] ?? 'circle';
//   }
//   return 'circle';
// };

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

const handleGlobalClick = (e: MouseEvent) => {
  spawnParticles(e.clientX, e.clientY);
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  void fetchFestival();
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (notifyTimer) clearTimeout(notifyTimer);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$orange: #ea580c;
$orange-mid: #f97316;
$orange-soft: #fff7ed;
$gold: #f59e0b;
$teal: #0d9488;
$teal-soft: #ccfbf1;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$surface: #ffffff;
$surface-2: #fff9f5;
$text-main: #431407;
$text-muted: #9ca3af;
$radius: 18px;

// ─── Page ─────────────────────────────────────────────────────────────────────
.festival-list-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(155deg, #fff7ed 0%, #fdf4ff 45%, #f0fdfa 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// .page-hero {
//   position: relative;
//   overflow: hidden;
//   background: linear-gradient(135deg, #7c2d12 0%, $orange 55%, $gold 100%);
//   padding: 2.25rem 1.5rem 4rem;
// }
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #7c2d12 0%, $orange 55%, $gold 100%);
  padding: 1rem 1.5rem 2.5rem; // เปลี่ยนจาก 2.25rem 1.5rem 4rem
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.14;
}

.hero-blob-1 {
  width: 350px;
  height: 350px;
  background: $gold;
  top: -100px;
  right: -80px;
  animation: drift 7s ease-in-out infinite;
}

.hero-blob-2 {
  width: 200px;
  height: 200px;
  background: $teal;
  bottom: -70px;
  left: -50px;
  animation: drift 9s ease-in-out infinite reverse;
}

.hero-blob-3 {
  width: 130px;
  height: 130px;
  background: #fff;
  top: 15px;
  left: 38%;
  animation: drift 5s ease-in-out infinite 1s;
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-16px) scale(1.06);
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

.hero-add-btn {
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
// .content-wrap {
//   max-width: 1100px;
//   // margin: -2rem auto 0;
//     margin: -1.25rem auto 0;  // เปลี่ยนจาก -2rem
//   padding: 0 1rem 4rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.25rem;
//    z-index: 2;
// }

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
  padding: 8px 15px;
  box-shadow: 0 2px 12px rgba(234, 88, 12, 0.08);
  border: 1px solid rgba(249, 115, 22, 0.12);
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
    box-shadow: 0 2px 12px rgba(234, 88, 12, 0.08);
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
}

// ─── Card Grid ────────────────────────────────────────────────────────────────
// .card-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
//   gap: 1.1rem;

//   @media (max-width: 480px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 0.75rem;
//   }
// }
.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;   // ← ทำให้อยู่กลาง
  gap: 1.1rem;

  > .festival-card {
    width: 230px;
    flex: 0 0 230px;         // ← กำหนดขนาดคงที่
  }

  @media (max-width: 480px) {
    > .festival-card {
      width: calc(50% - 0.375rem);
      flex: 0 0 calc(50% - 0.375rem);
    }
    gap: 0.75rem;
  }
}

// ─── Festival Card ────────────────────────────────────────────────────────────
.festival-card {
  background: $surface;
  border-radius: $radius;
  overflow: hidden;
  box-shadow:
    0 3px 20px rgba(234, 88, 12, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(249, 115, 22, 0.1);
  transition:
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.22s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 12px 36px rgba(234, 88, 12, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.06);
  }

  &--skeleton {
    pointer-events: none;
  }
}

// ─── Card Cover ───────────────────────────────────────────────────────────────
// .card-cover {
//   position: relative;
//   background: linear-gradient(135deg, #fff7ed, #fef3c7);
// }

// .card-cover-img {
//   display: block;
// }

.card-cover {
  position: relative;
  background: linear-gradient(135deg, #fff7ed, #fef3c7);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

// .card-cover-img {
//   display: block;
//   width: 100%;
// }

// .card-cover-img {
//   display: block;
//   width: 100%;
//   height: 120px;

//   :deep(.q-img__image) {
//     object-fit: contain;
//     object-position: center 60%; // ← เลื่อนลงจากกึ่งกลาง
//     background: linear-gradient(135deg, #fff7ed, #fef3c7);
//   }

//   :deep(.q-img__container) {
//     height: 120px;
//   }
// }

.card-cover-img {
  width: 100%;
  height: 120px;
  background-size: contain; // ← เห็นภาพเต็ม ไม่ตัด
  background-position: center center; // ← กึ่งกลางทั้งแนวตั้งและแนวนอน
  background-repeat: no-repeat;
  background-color: #fff7ed; // ← พื้นหลังส่วนว่าง
  position: relative;
}

.card-cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(124, 45, 18, 0.35) 100%);
  pointer-events: none;
}

// .card-cover-placeholder {
//   height: 140px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #fff7ed, #fef3c7);

//   @media (max-width: 480px) {
//     height: 110px;
//   }
// }
.card-cover-placeholder {
  // เปลี่ยนจาก height: 140px เป็น aspect-ratio
  aspect-ratio: 2188 / 417;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff7ed, #fef3c7);

  @media (max-width: 480px) {
    aspect-ratio: 2188 / 417;
    height: auto;
  }
}

.card-index-badge {
  position: absolute;
  top: 9px;
  left: 9px;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(4px);
  color: $orange;
  font-family: 'Prompt', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(249, 115, 22, 0.2);
}

// ─── Card Info ────────────────────────────────────────────────────────────────
.card-info {
  padding: 12px 14px 8px;
  flex: 1;
}

.card-name {
  display: block;
  font-family: 'Prompt', sans-serif;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  font-weight: 600;
  color: $text-main;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  transition: color 0.15s;

  &:hover {
    color: $orange;
  }
}

.card-meta {
  display: flex;
  align-items: center;
  font-size: 0.72rem;
  color: $text-muted;
}

// ─── Card Creator ─────────────────────────────────────────────────────────────
.card-creator {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 7px;
  padding: 4px 10px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  border: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2.4s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    margin-top: 5px;
    padding: 3px 8px;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.creator-icon {
  color: $orange;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.creator-label {
  font-size: 0.68rem;
  font-weight: 500;
  color: #92400e;
  white-space: nowrap;
  font-family: 'Noto Sans Thai', sans-serif;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 0.62rem;
  }
}

.creator-name {
  font-size: 0.7rem;
  font-weight: 700;
  color: $orange;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  font-family: 'Prompt', sans-serif;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 0.65rem;
    max-width: 75px;
  }
}

// ─── Card Status Badge ────────────────────────────────────────────────────────
.card-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.01em;

  &--active {
    background: #dcfce7;
    color: #15803d;

    .status-dot {
      background: #16a34a;
      animation: pulse-green 1.8s ease-in-out infinite;
    }
  }

  &--inactive {
    background: #f6f3f3;
    color: #9ca3af;

    .status-dot {
      background: #860d17;
    }
  }
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

@keyframes pulse-green {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(22, 163, 74, 0);
  }
}

// ─── Card Actions ─────────────────────────────────────────────────────────────
.card-actions {
  display: flex;
  border-top: 1px solid rgba(249, 115, 22, 0.08);
}

.card-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 9px 6px;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition:
    background 0.15s,
    color 0.15s;

  &--edit {
    background: transparent;
    color: $gold;
    border-right: 1px solid rgba(249, 115, 22, 0.08);
    &:hover {
      background: #fffbeb;
      color: $orange;
    }
  }

  &--view {
    background: transparent;
    color: #6366f1;
    border-right: 1px solid rgba(249, 115, 22, 0.08);
    &:hover {
      background: #eef2ff;
    }
  }

  &--delete {
    background: transparent;
    color: $red;
    &:hover {
      background: $red-soft;
    }
  }
}

// ─── Card Transition ──────────────────────────────────────────────────────────
.card-list-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-list-leave-active {
  transition: all 0.25s ease;
}
.card-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}
.card-list-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

// ─── Pagination ───────────────────────────────────────────────────────────────
.pagination-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 0.5rem;
}

.rows-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rpp-label {
  font-size: 0.82rem;
  color: $text-muted;
}

.rpp-select {
  width: 70px;

  :deep(.q-field__control) {
    border-radius: 10px !important;
    min-height: 36px !important;
    font-size: 0.82rem;
  }
}

// ─── Empty State ──────────────────────────────────────────────────────────────
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 14px;
  animation: pop 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.empty-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: $text-main;
}

.empty-sub {
  font-size: 0.84rem;
  color: $text-muted;
  margin-top: 5px;
}

@keyframes pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  80% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────
.custom-dialog {
  background: $surface;
  border-radius: 20px;
  overflow: hidden;
  width: 400px;
  max-width: 95vw;
  box-shadow: 0 20px 60px rgba(234, 88, 12, 0.16);
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
  border-bottom: 1px solid rgba(249, 115, 22, 0.08);

  &--danger {
    background: linear-gradient(135deg, #fee2e2, #fff1f2);
  }
}

.dialog-header-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, #ef4444, $red);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dialog-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
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
  padding: 1.25rem;
}

.delete-preview {
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
  border: 1px solid rgba(249, 115, 22, 0.1);
}

.delete-preview-img {
  overflow: hidden;
}
.delete-img {
  display: block;
}

.delete-img-placeholder {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $surface-2;
}

.delete-festival-name {
  padding: 10px 14px;
  font-family: 'Prompt', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: $text-main;
  background: $surface-2;
  border-top: 1px solid rgba(249, 115, 22, 0.08);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-warn-text {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: $text-muted;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 1.25rem 1.25rem;
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
    background: rgba(234, 88, 12, 0.07);
    color: $text-muted;
    &:hover {
      background: rgba(234, 88, 12, 0.13);
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
    background: linear-gradient(135deg, $green-dark, $green);
  }
  &--error {
    background: linear-gradient(135deg, #7f1d1d, $red);
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
    background: $green-soft;
  }
  &--error {
    background: $red-soft;
  }
}

.notify-progress {
  height: 4px;
  width: 100%;
  animation: progressShrink linear forwards;

  &--success {
    background: linear-gradient(90deg, $green-dark, $green);
  }
  &--error {
    background: linear-gradient(90deg, #7f1d1d, $red);
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
  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .pagination-wrap {
    flex-direction: column;
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
