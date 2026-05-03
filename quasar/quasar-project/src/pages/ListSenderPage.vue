<template>
  <q-page class="sender-page">
    <!-- ===== HERO FILTER HEADER ===== -->
    <div class="filter-hero">
      <div class="filter-hero-blob filter-hero-blob-1" />
      <div class="filter-hero-blob filter-hero-blob-2" />

      <div class="filter-hero-inner">
        <!-- Title row -->
        <div class="filter-hero-title-row">
          <div class="filter-hero-icon">
            <q-icon name="people" size="1.6rem" color="white" />
          </div>
          <div>
            <h1 class="filter-hero-title">รายการผู้ร่วมส่งคำอวยพร</h1>
            <p class="filter-hero-sub">
              <span class="filter-count-chip">
                <q-icon name="how_to_reg" size="14px" class="q-mr-xs" />
                {{ pagination.rowsNumber }} คน
              </span>
            </p>
          </div>
        </div>

        <!-- Filter grid -->
        <div class="filter-grid">
          <!-- <q-select
            v-model="selectedMonth"
            :options="monthOptions"
            label="เดือน"
            outlined dense emit-value map-options
            bg-color="white" clearable
            class="filter-field"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="calendar_month" color="teal-6" size="18px" />
            </template>
          </q-select> -->
          <q-select
            v-model="selectedMonth"
            :options="monthOptions"
            label="เดือน"
            outlined
            dense
            emit-value
            map-options
            bg-color="white"
            clearable
            class="filter-field month-select"
            popup-content-class="month-select-popup"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="calendar_month" color="teal-6" size="18px" />
            </template>

            <!-- ค่าที่เลือก -->
            <template v-slot:selected-item="scope">
              <div class="month-selected">
                <span class="month-selected-text">{{ scope.opt.label }}</span>
              </div>
            </template>

            <!-- แต่ละ option -->
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" class="month-option">
                <q-item-section avatar>
                  <div class="month-option-num">{{ scope.opt.value }}</div>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="month-option-label">{{ scope.opt.label }}</q-item-label>
                </q-item-section>
                <q-item-section side v-if="selectedMonth === scope.opt.value">
                  <q-icon name="check_circle" color="teal-6" size="16px" />
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:no-option>
              <div class="month-no-option">
                <q-icon name="search_off" size="1.5rem" color="grey-4" />
                <span>ไม่พบข้อมูล</span>
              </div>
            </template>
          </q-select>
          <!-- <q-select
            v-model="selectedYear"
            :options="filterYearOptions"
            label="ปี พ.ศ."
            outlined dense use-input fill-input hide-selected
            input-debounce="0" emit-value map-options
            bg-color="white" clearable
            class="filter-field"
            @filter="filterYearFn"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="event" color="teal-6" size="18px" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">ไม่พบข้อมูลปี</q-item-section>
              </q-item>
            </template>
          </q-select> -->
          <q-select
            v-model="selectedYear"
            :options="filterYearOptions"
            label="ปี พ.ศ."
            outlined
            dense
            use-input
            fill-input
            hide-selected
            input-debounce="0"
            emit-value
            map-options
            bg-color="white"
            clearable
            class="filter-field year-select"
            popup-content-class="year-select-popup"
            @filter="filterYearFn"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="event" color="teal-6" size="18px" />
            </template>

            <!-- แต่ละ option -->
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" class="year-option">
                <q-item-section avatar>
                  <div class="year-option-badge">
                    <q-icon name="calendar_today" size="13px" color="teal-6" />
                  </div>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="year-option-label">{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption class="year-option-caption">
                    ค.ศ. {{ scope.opt.value }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side v-if="selectedYear === scope.opt.value">
                  <q-icon name="check_circle" color="teal-6" size="16px" />
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:no-option>
              <div class="year-no-option">
                <q-icon name="search_off" size="1.5rem" color="grey-4" />
                <span>ไม่พบข้อมูลปี</span>
              </div>
            </template>
          </q-select>
          <q-input
            dense
            outlined
            debounce="300"
            v-model="fullname"
            placeholder="ชื่อ-นามสกุล"
            bg-color="white"
            clearable
            class="filter-field"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="person_search" color="indigo-5" size="18px" />
            </template>
          </q-input>

          <q-input
            dense
            outlined
            debounce="300"
            v-model="position"
            placeholder="ตำแหน่ง"
            bg-color="white"
            clearable
            class="filter-field"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="badge" color="indigo-5" size="18px" />
            </template>
          </q-input>

          <q-input
            dense
            outlined
            debounce="250"
            v-model="department"
            placeholder="กอง/สำนัก/ศูนย์"
            bg-color="white"
            clearable
            class="filter-field filter-field--wide"
            @update:model-value="onSearch"
          >
            <template v-slot:prepend>
              <q-icon name="domain" color="indigo-5" size="18px" />
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-area">
      <!-- Loading skeleton -->
      <div v-if="loading" class="card-grid">
        <div v-for="n in 12" :key="n" class="sender-card sender-card--skeleton">
          <q-skeleton square style="height: 180px" />
          <div class="card-body">
            <q-skeleton type="text" width="75%" />
            <q-skeleton type="text" width="55%" class="q-mt-xs" />
            <q-skeleton type="text" width="40%" class="q-mt-xs" />
          </div>
        </div>
      </div>

      <!-- Card grid -->
      <transition-group v-else-if="rows.length" name="card-pop" tag="div" class="card-grid">
        <div
          v-for="(row, idx) in rows"
          :key="row.sId"
          class="sender-card"
          :style="{ animationDelay: `${Math.min(idx, 11) * 0.04}s` }"
          @click="fetchSenderById(row.sId)"
        >
          <div class="card-img-wrap">
            <q-img v-if="row.url" :src="row.url" :ratio="1" class="card-img">
              <div class="card-img-overlay" />
            </q-img>
            <div v-else class="card-img-placeholder">
              <q-icon name="person" size="2.5rem" color="indigo-2" />
            </div>
            <div v-if="row.wishWord" class="card-wish-preview">
              <q-icon name="format_quote" size="12px" class="q-mr-xs" />
              {{ row.wishWord.slice(0, 22) }}{{ row.wishWord.length > 22 ? '…' : '' }}
            </div>
          </div>
          <div class="card-body">
            <div class="card-name">{{ row.fullname }}</div>
            <div class="card-position">{{ row.position }}</div>
            <div class="card-dept">
              <q-icon name="domain" size="12px" class="q-mr-xs" />
              {{ row.department }}
            </div>
          </div>
          <div class="card-cta">
            <q-icon name="visibility" size="14px" class="q-mr-xs" />
            ดูคำอวยพร
          </div>
        </div>
      </transition-group>

      <!-- Empty state -->
      <div v-else class="empty-state">
        <div class="empty-emoji">🔍</div>
        <div class="empty-title">ไม่พบข้อมูล</div>
        <div class="empty-sub">ลองปรับตัวกรองแล้วค้นหาใหม่อีกครั้ง</div>
      </div>

      <!-- Pagination -->
      <div v-if="rows.length" class="pagination-row">
        <q-pagination
          v-model="pagination.page"
          :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage) || 1"
          :max-pages="$q.screen.xs ? 4 : 8"
          direction-links
          boundary-links
          color="indigo-6"
          active-design="unelevated"
          active-color="indigo-6"
          @update:model-value="onPageChange"
        />
        <div class="rpp-wrap">
          <span class="rpp-label">แสดง</span>
          <q-select
            v-model="pagination.rowsPerPage"
            :options="[12, 24, 48]"
            dense
            outlined
            class="rpp-select"
            @update:model-value="onRppChange"
          />
          <span class="rpp-label">รายการ</span>
        </div>
      </div>
    </div>

    <!-- ===== DETAIL DIALOG ===== -->
    <q-dialog v-model="showDialog" :maximized="$q.screen.xs">
      <div class="detail-dialog" :class="{ 'detail-dialog--mobile': $q.screen.xs }">
        <div class="detail-img-wrap">
          <q-img
            v-if="selectedSender?.url"
            :src="selectedSender.url"
            :ratio="$q.screen.xs ? 16 / 9 : 4 / 3"
            fit="contain"
            class="detail-img"
          >
            <div class="detail-img-gradient" />
          </q-img>
          <div v-else class="detail-img-placeholder">
            <q-icon name="person" size="4rem" color="white" />
          </div>
          <button class="detail-close-btn" @click="showDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="detail-body">
          <div class="detail-name">{{ selectedSender?.fullname }}</div>
          <div class="detail-position">{{ selectedSender?.position }}</div>
          <div class="detail-dept">
            <q-icon name="domain" size="14px" class="q-mr-xs" />
            {{ selectedSender?.department }}
          </div>
          <div class="detail-wish-card">
            <div class="detail-wish-label">
              <q-icon name="favorite" size="14px" color="pink-4" class="q-mr-xs" />
              คำอวยพร
            </div>
            <blockquote class="detail-wish-text">{{ selectedSender?.wishWord }}</blockquote>
          </div>
        </div>
        <div class="detail-footer">
          <button class="detail-close-text-btn" @click="showDialog = false">
            <q-icon name="close" size="16px" class="q-mr-xs" />
            ปิด
          </button>
        </div>
      </div>
    </q-dialog>

    <!-- ===== CLICK PARTICLES ===== -->
    <teleport to="body">
      <div class="click-particles-root">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const props = defineProps<{ id: string }>();
const $q = useQuasar();

// ================= TYPES =================
interface SenderItem {
  sId: number | string;
  fullname: string;
  position: string;
  department: string;
  card?: { imageCard: string };
  wish?: { wishWord: string };
}

interface TableRow {
  sId: number | string;
  fullname: string;
  position: string;
  department: string;
  url: string;
  wishWord: string;
}

// ================= FILTER STATE =================
const selectedMonth = ref<number | null>(null);
const selectedYear = ref<number | null>(null);
const fullname = ref<string | null>(null);
const position = ref<string | null>(null);
const department = ref<string | null>(null);

const monthOptions = [
  { label: 'มกราคม', value: 1 },
  { label: 'กุมภาพันธ์', value: 2 },
  { label: 'มีนาคม', value: 3 },
  { label: 'เมษายน', value: 4 },
  { label: 'พฤษภาคม', value: 5 },
  { label: 'มิถุนายน', value: 6 },
  { label: 'กรกฎาคม', value: 7 },
  { label: 'สิงหาคม', value: 8 },
  { label: 'กันยายน', value: 9 },
  { label: 'ตุลาคม', value: 10 },
  { label: 'พฤศจิกายน', value: 11 },
  { label: 'ธันวาคม', value: 12 },
];

const yearOptions = ref<{ label: string; value: number }[]>([]);
const filterYearOptions = ref<{ label: string; value: number }[]>([]);

const generateThaiYearOptions = () => {
  const currentYearCE = new Date().getFullYear();
  const years = [];
  for (let year = currentYearCE; year >= 2016; year--) {
    years.push({ label: `${year + 543}`, value: year });
  }
  yearOptions.value = years;
  filterYearOptions.value = years;
  selectedYear.value = currentYearCE;
};

const filterYearFn = (val: string, update: (fn: () => void) => void) => {
  update(() => {
    if (val === '') {
      filterYearOptions.value = yearOptions.value;
      return;
    }
    const needle = val.toLowerCase();
    filterYearOptions.value = yearOptions.value.filter((v) =>
      v.label.toLowerCase().includes(needle),
    );
  });
};

// ================= TABLE STATE =================
const rows = ref<TableRow[]>([]);
const loading = ref(false);
const pagination = ref({ page: 1, rowsPerPage: 10, rowsNumber: 0, sortBy: '', descending: false });

// ================= IMAGE =================
const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api.get(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data as Blob);
  } catch {
    return '';
  }
};

// ================= FETCH LIST =================
const fetchSender = async (id: string): Promise<void> => {
  loading.value = true;
  try {
    const response = await api.get(`/sender/paginate/${Number(id)}`, {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        fullname: fullname.value || undefined,
        position: position.value || undefined,
        department: department.value || undefined,
        month: selectedMonth.value || undefined,
        year: selectedYear.value || undefined,
      },
    });
    const res = response.data;
    const list: SenderItem[] = res.sender?.data ?? [];
    rows.value = await Promise.all(
      list.map(async (item) => ({
        sId: item.sId,
        fullname: item.fullname || '-',
        position: item.position || '-',
        department: item.department || '-',
        url: item.card?.imageCard ? await getImageUrl(item.card.imageCard) : '',
        wishWord: item.wish?.wishWord || '',
      })),
    );
    pagination.value.rowsNumber = res.sender?.total ?? 0;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

// ================= FETCH DETAIL =================
const showDialog = ref(false);
const selectedSender = ref<TableRow | null>(null);

const fetchSenderById = async (id: number | string) => {
  try {
    const res = await api.get(`/sender/${id}`);
    const data = res.data.sender;
    selectedSender.value = {
      sId: data.sId,
      fullname: data.fullname,
      position: data.position,
      department: data.department,
      url: data.card?.imageCard ? await getImageUrl(data.card.imageCard) : '',
      wishWord: data.wish?.wishWord || '',
    };
    showDialog.value = true;
  } catch (err) {
    console.error(err);
  }
};

// ================= EVENTS =================
const onSearch = () => {
  pagination.value.page = 1;
  void fetchSender(props.id);
};
const onPageChange = () => {
  void fetchSender(props.id);
};
const onRppChange = () => {
  pagination.value.page = 1;
  void fetchSender(props.id);
};

// ============================================================
// CLICK PARTICLES
// ============================================================
interface Particle {
  id: number;
  style: Record<string, string>;
}
type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

const activeParticles = ref<Particle[]>([]);
let particleId = 0;

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

function pickShape(): ShapeType {
  const r = Math.random();
  let c = 0;
  for (let i = 0; i < SHAPES.length; i++) {
    c += WEIGHTS[i] ?? 0;
    if (r < c) return SHAPES[i] ?? 'circle';
  }
  return 'circle';
}

const spawnParticles = (x: number, y: number) => {
  const count = 36 + Math.floor(Math.random() * 12);
  const W = window.innerWidth;
  const H = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const id = ++particleId;
    const size = 7 + Math.random() * 11;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)] ?? '#fbbf24';
    const dur = 1.2 + Math.random() * 1.2;
    const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)] ?? '🎉';
    const shape = pickShape();
    const isEmoji = shape === 'emoji';

    // 8 zone ให้กระจายทั่วจอ
    const zone = i % 8;
    let targetX: number, targetY: number;
    switch (zone) {
      case 0:
        targetX = Math.random() * W * 0.35;
        targetY = Math.random() * H * 0.35;
        break;
      case 1:
        targetX = W * 0.25 + Math.random() * W * 0.5;
        targetY = Math.random() * H * 0.25;
        break;
      case 2:
        targetX = W * 0.65 + Math.random() * W * 0.35;
        targetY = Math.random() * H * 0.35;
        break;
      case 3:
        targetX = W * 0.65 + Math.random() * W * 0.35;
        targetY = H * 0.25 + Math.random() * H * 0.5;
        break;
      case 4:
        targetX = W * 0.65 + Math.random() * W * 0.35;
        targetY = H * 0.65 + Math.random() * H * 0.35;
        break;
      case 5:
        targetX = W * 0.25 + Math.random() * W * 0.5;
        targetY = H * 0.75 + Math.random() * H * 0.25;
        break;
      case 6:
        targetX = Math.random() * W * 0.35;
        targetY = H * 0.65 + Math.random() * H * 0.35;
        break;
      case 7:
        targetX = Math.random() * W * 0.25;
        targetY = H * 0.25 + Math.random() * H * 0.5;
        break;
      default:
        targetX = Math.random() * W;
        targetY = Math.random() * H;
    }

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

// ================= INIT =================
onMounted(() => {
  generateThaiYearOptions();
  void fetchSender(props.id);
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      pagination.value.page = 1;
      void fetchSender(newId);
    }
  },
);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ============================================================
// TOKENS
// ============================================================
$indigo: #4338ca;
$indigo-mid: #6366f1;
$indigo-soft: #eef2ff;
$teal: #0d9488;
$surface: #ffffff;
$text-main: #1e1b4b;
$text-muted: #6b7280;
$radius-card: 16px;

// ============================================================
// PAGE
// ============================================================
.sender-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(150deg, #eef2ff 0%, #f5f3ff 40%, #f0fdfa 100%);
  min-height: 100vh;
}

// ============================================================
// FILTER HERO
// ============================================================
.filter-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #312e81 0%, $indigo 45%, $indigo-mid 100%);
  padding: 2rem 1.5rem 3.5rem;
}

.filter-hero-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}
.filter-hero-blob-1 {
  width: 320px;
  height: 320px;
  background: #a5b4fc;
  top: -100px;
  right: -80px;
  animation: drift 8s ease-in-out infinite;
}
.filter-hero-blob-2 {
  width: 180px;
  height: 180px;
  background: $teal;
  bottom: -60px;
  left: -40px;
  animation: drift 10s ease-in-out infinite reverse;
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

.filter-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filter-hero-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.filter-hero-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.filter-hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.1rem, 4vw, 1.65rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
  line-height: 1.2;
}

.filter-hero-sub {
  margin: 0;
}

.filter-count-chip {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

// ===== MONTH SELECT =====
.month-select {
  :deep(.q-field__control) {
    border-radius: 14px !important;
    border: 1.5px solid rgba(13, 148, 136, 0.2) !important;
    background: linear-gradient(135deg, #f0fdfa, #fff) !important;
    transition:
      border-color 0.2s,
      box-shadow 0.2s !important;
    min-height: 44px !important;
  }

  :deep(.q-field--focused .q-field__control) {
    border-color: rgba(13, 148, 136, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1) !important;
  }

  :deep(.q-field__label) {
    color: #6b7280 !important;
    font-size: 0.85rem !important;
  }

  :deep(.q-field__native) {
    font-weight: 600 !important;
    color: #1e1b4b !important;
  }
}

.month-selected {
  display: flex;
  align-items: center;
}

.month-selected-text {
  font-size: 0.88rem;
  font-weight: 600;
  color: #1e1b4b;
}

// Popup
:global(.month-select-popup) {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(13, 148, 136, 0.15) !important;
  border: 1px solid rgba(13, 148, 136, 0.12) !important;
  overflow: hidden;
  padding: 4px !important;
}

.month-option {
  border-radius: 10px !important;
  margin: 2px 4px !important;
  transition: background 0.15s !important;

  &:hover {
    background: rgba(13, 148, 136, 0.06) !important;
  }

  :deep(&.q-item--active) {
    background: rgba(13, 148, 136, 0.1) !important;
  }
}

.month-option-num {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #ccfbf1, #f0fdfa);
  color: #0d9488;
  font-family: 'Prompt', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.month-option-label {
  font-size: 0.88rem !important;
  font-weight: 500 !important;
  color: #1e1b4b !important;
}

.month-no-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 1.5rem;
  color: #9ca3af;
  font-size: 0.85rem;
}

// ===== YEAR SELECT =====
.year-select {
  :deep(.q-field__control) {
    border-radius: 14px !important;
    border: 1.5px solid rgba(13, 148, 136, 0.2) !important;
    background: linear-gradient(135deg, #f0fdfa, #fff) !important;
    transition:
      border-color 0.2s,
      box-shadow 0.2s !important;
    min-height: 44px !important;
  }

  :deep(.q-field--focused .q-field__control) {
    border-color: rgba(13, 148, 136, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1) !important;
  }

  :deep(.q-field__label) {
    color: #6b7280 !important;
    font-size: 0.85rem !important;
  }

  :deep(.q-field__input) {
    font-family: 'Prompt', sans-serif !important;
    font-weight: 600 !important;
    color: #1e1b4b !important;
    font-size: 0.88rem !important;
  }
}

// Popup
:global(.year-select-popup) {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(13, 148, 136, 0.15) !important;
  border: 1px solid rgba(13, 148, 136, 0.12) !important;
  overflow: hidden;
  padding: 4px !important;
}

.year-option {
  border-radius: 10px !important;
  margin: 2px 4px !important;
  transition: background 0.15s !important;

  &:hover {
    background: rgba(13, 148, 136, 0.06) !important;
  }

  :deep(&.q-item--active) {
    background: rgba(13, 148, 136, 0.1) !important;
  }
}

.year-option-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #ccfbf1, #f0fdfa);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(13, 148, 136, 0.15);
  flex-shrink: 0;
}

.year-option-label {
  font-family: 'Prompt', sans-serif !important;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  color: #1e1b4b !important;
  line-height: 1.2 !important;
}

.year-option-caption {
  font-size: 0.72rem !important;
  color: #9ca3af !important;
  margin-top: 1px !important;
}

.year-no-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 1.5rem;
  color: #9ca3af;
  font-size: 0.85rem;
}
// ============================================================
// FILTER GRID
// ============================================================
.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.filter-field {
  :deep(.q-field__control) {
    border-radius: 12px !important;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
  }
  :deep(.q-field__label) {
    font-family: 'Noto Sans Thai', sans-serif;
  }
}

.filter-field--wide {
  @media (min-width: 901px) {
    grid-column: span 2;
  }
}

// ============================================================
// CONTENT
// ============================================================
.content-area {
  max-width: 1200px;
  margin: -1.75rem auto 0;
  padding: 0 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

// ============================================================
// CARD GRID
// ============================================================
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

// ============================================================
// SENDER CARD
// ============================================================
.sender-card {
  background: $surface;
  border-radius: $radius-card;
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 3px 16px rgba(67, 56, 202, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition:
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.22s;
  display: flex;
  flex-direction: column;
  animation: cardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 14px 40px rgba(67, 56, 202, 0.16);

    .card-cta {
      opacity: 1;
      transform: translateY(0);
    }
    .card-img-overlay {
      opacity: 1;
    }
  }

  &--skeleton {
    pointer-events: none;
  }
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-img-wrap {
  position: relative;
  background: $indigo-soft;
}

.card-img {
  display: block;
}

.card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(49, 46, 129, 0.5) 100%);
  opacity: 0;
  transition: opacity 0.22s;
}

.card-img-placeholder {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $indigo-soft, #e0e7ff);

  @media (max-width: 480px) {
    height: 130px;
  }
}

.card-wish-preview {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(49, 46, 129, 0.82), transparent);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.68rem;
  font-style: italic;
  padding: 18px 10px 8px;
  display: flex;
  align-items: flex-end;
  line-height: 1.4;
}

.card-body {
  padding: 10px 12px 6px;
  flex: 1;
}

.card-name {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(0.78rem, 2vw, 0.88rem);
  font-weight: 600;
  color: $text-main;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.card-position {
  font-size: 0.72rem;
  color: $text-muted;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.card-dept {
  display: flex;
  align-items: center;
  font-size: 0.68rem;
  color: color.adjust($text-muted, $lightness: 10%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: $indigo;
  background: $indigo-soft;
  border-top: 1px solid rgba(99, 102, 241, 0.1);
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.22s,
    transform 0.22s;
}

// ============================================================
// CARD TRANSITION
// ============================================================
.card-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-pop-leave-active {
  transition: all 0.2s ease;
}
.card-pop-enter-from {
  opacity: 0;
  transform: scale(0.94) translateY(12px);
}
.card-pop-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

// ============================================================
// EMPTY STATE
// ============================================================
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
}
.empty-emoji {
  font-size: 3.5rem;
  margin-bottom: 12px;
}
.empty-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: $text-main;
}
.empty-sub {
  font-size: 0.83rem;
  color: $text-muted;
  margin-top: 4px;
}

// ============================================================
// PAGINATION
// ============================================================
.pagination-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 0.5rem;
}
.rpp-wrap {
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

// ============================================================
// DETAIL DIALOG
// ============================================================
.detail-dialog {
  background: $surface;
  border-radius: 22px;
  overflow: hidden;
  width: 420px;
  max-width: 95vw;
  box-shadow: 0 24px 64px rgba(67, 56, 202, 0.2);
  display: flex;
  flex-direction: column;

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

.detail-img-wrap {
  position: relative;
  background: linear-gradient(135deg, $indigo, $indigo-mid);
}
.detail-img {
  display: block;
}
.detail-img-placeholder {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #312e81, $indigo);
}
.detail-img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(30, 27, 75, 0.5) 100%);
  pointer-events: none;
}
.detail-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
}
.detail-body {
  padding: 1.25rem 1.5rem 0.75rem;
}
.detail-name {
  font-family: 'Prompt', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 3px;
}
.detail-position {
  font-size: 0.88rem;
  color: $text-muted;
  margin-bottom: 4px;
}
.detail-dept {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: color.adjust($text-muted, $lightness: 8%);
  margin-bottom: 1rem;
}
.detail-wish-card {
  background: linear-gradient(135deg, $indigo-soft, #e0e7ff);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  border-left: 3px solid $indigo-mid;
}
.detail-wish-label {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: $indigo;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.detail-wish-text {
  font-size: 0.92rem;
  font-style: italic;
  color: $text-main;
  line-height: 1.75;
  margin: 0;
  border: none;
  padding: 0;
}
.detail-footer {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  justify-content: flex-end;
}
.detail-close-text-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 10px;
  border: none;
  background: rgba(67, 56, 202, 0.08);
  color: $text-muted;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(67, 56, 202, 0.14);
  }
}

// ============================================================
// RESPONSIVE
// ============================================================
@media (max-width: 600px) {
  .filter-hero {
    padding: 1.5rem 1rem 3rem;
  }
  .content-area {
    padding: 0 0.75rem 2.5rem;
  }
  .filter-hero-icon {
    width: 42px;
    height: 42px;
  }
  .pagination-row {
    flex-direction: column;
  }
}

// ============================================================
// CLICK PARTICLES
// ============================================================
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
