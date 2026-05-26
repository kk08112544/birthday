<template>
  <q-page class="list-sender-page">
    <!-- ===== BG DECORATION ===== -->
    <div class="bg-deco" aria-hidden="true">
      <div class="bg-deco-blob bg-deco-blob-1" />
      <div class="bg-deco-blob bg-deco-blob-2" />
      <div class="bg-deco-blob bg-deco-blob-3" />
    </div>

    <!-- ===== FILTER HERO ===== -->
    <div class="filter-hero">
      <div class="filter-hero-blob filter-hero-blob-1" />
      <div class="filter-hero-blob filter-hero-blob-2" />

      <div class="filter-hero-inner">
        <!-- Title row -->
        <div class="filter-hero-title-row">
          <div class="filter-hero-icon">
            <q-icon name="people" size="1.6rem" color="white" />
          </div>
          <div class="filter-hero-text">
            <h1 class="filter-hero-title">รายการผู้ร่วมส่งคำอวยพร</h1>
            <p class="filter-hero-sub">
              <span class="filter-count-chip">
                <q-icon name="how_to_reg" size="13px" />
                {{ pagination.rowsNumber.toLocaleString() }} คน
              </span>
              <span v-if="hasActiveFilter" class="filter-active-chip">
                <q-icon name="filter_alt" size="13px" />
                กำลังกรอง
              </span>
            </p>
          </div>
        </div>

        <!-- Filter panel -->
        <div class="filter-panel">
          <div class="filter-panel-label">
            <q-icon name="manage_search" size="16px" />
            ค้นหาและกรอง
          </div>

          <div class="filter-grid">
            <!-- เดือน -->
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
              @keydown.enter="onSearch"
            >
              <template v-slot:prepend>
                <q-icon name="calendar_month" color="teal-6" size="16px" />
              </template>
              <template v-slot:selected-item="scope">
                <span class="filter-selected-text">{{ scope.opt.label }}</span>
              </template>
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
                <div class="select-no-option">
                  <q-icon name="search_off" size="1.4rem" color="grey-4" />
                  <span>ไม่พบข้อมูล</span>
                </div>
              </template>
            </q-select>

            <!-- ปี -->
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
              @keydown.enter="onSearch"
            >
              <template v-slot:prepend>
                <q-icon name="event" color="teal-6" size="16px" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" class="year-option">
                  <q-item-section avatar>
                    <div class="year-option-badge">
                      <q-icon name="calendar_today" size="12px" color="teal-6" />
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
                <div class="select-no-option">
                  <q-icon name="search_off" size="1.4rem" color="grey-4" />
                  <span>ไม่พบข้อมูลปี</span>
                </div>
              </template>
            </q-select>

            <!-- ชื่อ -->
            <q-input
              dense
              outlined
              v-model="fullname"
              placeholder="ชื่อ-นามสกุล"
              bg-color="white"
              clearable
              class="filter-field"
              @keydown.enter="onSearch"
            >
              <template v-slot:prepend>
                <q-icon name="person_search" color="indigo-5" size="16px" />
              </template>
            </q-input>

            <!-- ตำแหน่ง -->
            <q-input
              dense
              outlined
              v-model="position"
              placeholder="ตำแหน่ง"
              bg-color="white"
              clearable
              class="filter-field"
              @keydown.enter="onSearch"
            >
              <template v-slot:prepend>
                <q-icon name="badge" color="indigo-5" size="16px" />
              </template>
            </q-input>

            <!-- กอง/สำนัก -->
            <q-input
              dense
              outlined
              v-model="department"
              placeholder="กอง / สำนัก / ศูนย์"
              bg-color="white"
              clearable
              class="filter-field filter-field--dept"
              @keydown.enter="onSearch"
            >
              <template v-slot:prepend>
                <q-icon name="domain" color="indigo-5" size="16px" />
              </template>
            </q-input>
          </div>

          <!-- Action buttons -->
          <div class="filter-actions">
            <button class="btn-clear" :disabled="!hasActiveFilter" @click="clearFilter">
              <q-icon name="clear_all" size="17px" />
              <span>ล้างตัวกรอง</span>
              <span v-if="hasActiveFilter" class="btn-clear-badge">
                {{ activeFilterCount }}
              </span>
            </button>

            <button
              class="btn-search"
              :class="{ 'btn-search--loading': loading }"
              :disabled="loading"
              @click="onSearch"
            >
              <span v-if="!loading" class="btn-search-inner">
                <q-icon name="search" size="19px" />
                <span>ค้นหา</span>
              </span>
              <span v-else class="btn-search-inner">
                <q-circular-progress indeterminate size="18px" color="white" />
                <span>กำลังค้นหา...</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-area">
      <!-- Result bar -->
      <div v-if="!loading && rows.length > 0" class="result-bar">
        <div class="result-bar-left">
          <span class="result-num">{{ pagination.rowsNumber.toLocaleString() }}</span>
          <span class="result-unit">รายการที่พบ</span>
          <span v-if="hasActiveFilter" class="result-filter-note"> · จากการกรอง</span>
        </div>
        <div class="result-bar-right">
          <span class="result-page-info">
            หน้า {{ pagination.page }} /
            {{ Math.ceil(pagination.rowsNumber / pagination.rowsPerPage) || 1 }}
          </span>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="card-grid">
        <div v-for="n in 10" :key="n" class="sender-card sender-card--skeleton">
          <div class="skeleton-img" />
          <div class="card-body">
            <div class="skeleton-line skeleton-line--w75" />
            <div class="skeleton-line skeleton-line--w55 q-mt-xs" />
            <div class="skeleton-line skeleton-line--w40 q-mt-xs" />
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
          @click="openDetail(row.sId)"
        >
          <!-- <div v-if="row.wishWord" class="card-wish-badge">
              <q-icon name="format_quote" size="11px" />
              {{ row.wishWord.slice(0, 20) }}{{ row.wishWord.length > 20 ? '…' : '' }}
            </div> -->
          <!-- <div class="card-img-wrap">
            <q-img v-if="row.url" :src="row.url" :ratio="1" class="card-img" fit="cover">
              <div class="card-img-overlay" />
            </q-img>
            <div v-else class="card-img-placeholder">
              <div class="card-avatar-fallback">
                <q-icon name="person" size="2.2rem" color="indigo-2" />
              </div>
            </div>
           
            <div v-if="row.wishWord" class="card-wish-badge">
  <q-icon name="format_quote" size="11px" class="card-wish-quote-icon" />
  {{ row.wishWord }}
</div>
          </div> -->
          <div class="card-img-wrap">
            <q-img v-if="row.url" :src="row.url" :ratio="1" class="card-img" fit="cover">
              <div class="card-img-overlay" />
            </q-img>
            <div v-else class="card-img-placeholder">
              <div class="card-avatar-fallback">
                <q-icon name="person" size="2.2rem" color="indigo-2" />
              </div>
            </div>
            <!-- ลบ card-wish-badge ออกจากตรงนี้ -->
          </div>

          <div class="card-body">
            <div class="card-name">{{ row.fullname }}</div>
            <div class="card-position">{{ row.position }}</div>
            <div class="card-dept">
              <q-icon name="domain" size="11px" />
              {{ row.department }}
            </div>
            <!-- ย้ายมาไว้ที่นี่ -->
            <div v-if="row.wishWord" class="card-wish-text">
              <q-icon name="format_quote" size="11px" class="q-mr-xs" />
              {{ row.wishWord }}
            </div>
          </div>
          <!-- <div class="card-body">
            <div class="card-name">{{ row.fullname }}</div>
            <div class="card-position">{{ row.position }}</div>
            <div class="card-dept">
              <q-icon name="domain" size="11px" />
              {{ row.department }}
            </div>
          </div> -->
          <div class="card-cta">
            <q-icon name="visibility" size="13px" />
            ดูคำอวยพร
          </div>
        </div>
      </transition-group>

      <!-- Empty state -->
      <div v-else class="empty-state">
        <div class="empty-emoji">{{ hasActiveFilter ? '🔍' : '👥' }}</div>
        <div class="empty-title">
          {{ hasActiveFilter ? 'ไม่พบข้อมูลที่ตรงกัน' : 'ยังไม่มีข้อมูล' }}
        </div>
        <div class="empty-sub">
          {{ hasActiveFilter ? 'ลองปรับเงื่อนไขการค้นหาใหม่' : 'ยังไม่มีผู้ร่วมส่งคำอวยพร' }}
        </div>
        <button v-if="hasActiveFilter" class="empty-clear-btn" @click="clearFilter">
          <q-icon name="clear_all" size="16px" />
          ล้างตัวกรอง
        </button>
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
            :options="[10, 15, 20, 25, 50, 100]"
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
            <q-icon name="domain" size="13px" class="q-mr-xs" />
            {{ selectedSender?.department }}
          </div>
          <div class="detail-wish-card">
            <div class="detail-wish-label">
              <q-icon name="favorite" size="13px" color="pink-4" class="q-mr-xs" />
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

    <!-- ===== LOADING DIALOG ===== -->
    <q-dialog v-model="showLoading" persistent no-backdrop-dismiss>
      <div class="loading-dialog">
        <div class="ld-orb-wrap">
          <div class="ld-orb-bg" />
          <div class="ld-orb-ring1" />
          <div class="ld-orb-ring2" />
          <div class="ld-orb-inner">🎴</div>
        </div>
        <div class="ld-title">กำลังโหลดข้อมูล</div>
        <div class="ld-pct-row">
          <span class="ld-pct-num">{{ loadingPercent }}</span>
          <span class="ld-pct-sym">%</span>
        </div>
        <div class="ld-sub">{{ loadingSteps[loadingStep]?.label ?? 'กำลังเริ่มต้น...' }}</div>
        <div class="ld-steps">
          <div
            v-for="(s, i) in loadingSteps"
            :key="i"
            class="ld-step-row"
            :class="{
              'ld-step-row--done': i < loadingStep,
              'ld-step-row--active': i === loadingStep,
              'ld-step-row--pending': i > loadingStep,
            }"
          >
            <div
              class="ld-step-ic"
              :class="{
                'ld-step-ic--done': i < loadingStep,
                'ld-step-ic--active': i === loadingStep,
                'ld-step-ic--pending': i > loadingStep,
              }"
            >
              <span v-if="i < loadingStep">✓</span>
              <span v-else-if="i === loadingStep" class="ld-step-spinner" />
              <span v-else>·</span>
            </div>
            <div class="ld-step-label">{{ s.label }}</div>
            <div
              class="ld-step-pct"
              :class="{
                'ld-step-pct--done': i < loadingStep,
                'ld-step-pct--active': i === loadingStep,
              }"
            >
              {{ i < loadingStep ? '✓' : i === loadingStep ? s.pct + '%' : '' }}
            </div>
          </div>
        </div>
        <div class="ld-bar-track">
          <div class="ld-bar-fill" :style="{ width: loadingPercent + '%' }" />
        </div>
        <div class="ld-dots">
          <span class="ld-dot" />
          <span class="ld-dot" />
          <span class="ld-dot" />
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

// ─── Types ────────────────────────────────────────────────────────────────────
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

interface FestivalPeriod {
  startDate: string;
  endDate: string;
}

interface SelectOption<T> {
  label: string;
  value: T;
}

interface Particle {
  id: number;
  style: Record<string, string>;
}

type ShapeType = 'circle' | 'square' | 'star' | 'emoji';

// ─── Constants ────────────────────────────────────────────────────────────────
const THAI_MONTHS = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
] as const;

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps<{ id: string }>();
const $q = useQuasar();

// ─── Festival Period State ─────────────────────────────────────────────────────
const festivalPeriod = ref<FestivalPeriod | null>(null);

// ─── Computed: month & year options จาก festival period ───────────────────────
/**
 * สร้าง list เดือนที่ไม่ซ้ำกัน iterate จาก startDate → endDate ทีละเดือน
 * รองรับ period ที่ข้ามปี เช่น ธ.ค. 2568 → ม.ค. 2569
 */
const monthOptions = computed((): SelectOption<number>[] => {
  if (!festivalPeriod.value) return [];

  const start = new Date(festivalPeriod.value.startDate);
  const end = new Date(festivalPeriod.value.endDate);

  // normalize to first day of month เพื่อ compare ได้ถูกต้อง
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);

  const seen = new Set<number>();
  const options: SelectOption<number>[] = [];

  while (cursor <= endMonth) {
    const month = cursor.getMonth() + 1; // 1-12
    if (!seen.has(month)) {
      seen.add(month);
      options.push({ label: THAI_MONTHS[month - 1]!, value: month });
    }
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return options;
});

/**
 * สร้าง list ปี ค.ศ. จาก startYear → endYear
 * แสดงเป็น พ.ศ. ใน label (+543)
 */
const yearOptions = computed((): SelectOption<number>[] => {
  if (!festivalPeriod.value) return [];

  const startYear = new Date(festivalPeriod.value.startDate).getFullYear();
  const endYear = new Date(festivalPeriod.value.endDate).getFullYear();

  const options: SelectOption<number>[] = [];
  for (let y = startYear; y <= endYear; y++) {
    options.push({ label: `${y + 543}`, value: y });
  }
  return options;
});

// filterYearOptions — ref สำหรับ use-input filtering ของ q-select
const filterYearOptions = ref<SelectOption<number>[]>([]);

// sync กับ yearOptions computed เมื่อ festivalPeriod โหลดสำเร็จ
watch(
  yearOptions,
  (val) => {
    filterYearOptions.value = val;
  },
  { immediate: true },
);

// ─── Filter State ─────────────────────────────────────────────────────────────
const selectedMonth = ref<number | null>(null);
const selectedYear = ref<number | null>(null);
const fullname = ref<string>('');
const position = ref<string>('');
const department = ref<string>('');

const hasActiveFilter = computed(
  () =>
    !!selectedMonth.value ||
    !!selectedYear.value ||
    !!fullname.value?.trim() ||
    !!position.value?.trim() ||
    !!department.value?.trim(),
);

const activeFilterCount = computed(
  () =>
    [
      selectedMonth.value,
      selectedYear.value,
      fullname.value,
      position.value,
      department.value,
    ].filter((v) => !!v && (typeof v !== 'string' || v.trim().length > 0)).length,
);

const filterYearFn = (val: string, update: (fn: () => void) => void): void => {
  update(() => {
    filterYearOptions.value = val.trim()
      ? yearOptions.value.filter((opt) => opt.label.includes(val.trim()))
      : yearOptions.value;
  });
};

const clearFilter = (): void => {
  selectedMonth.value = null;
  selectedYear.value = null;
  fullname.value = '';
  position.value = '';
  department.value = '';
  onSearch();
};

// ─── Table State ──────────────────────────────────────────────────────────────
const rows = ref<TableRow[]>([]);
const loading = ref(false);
const pagination = ref({ page: 1, rowsPerPage: 10, rowsNumber: 0 });

// ─── Dialog State ─────────────────────────────────────────────────────────────
const showDialog = ref(false);
const selectedSender = ref<TableRow | null>(null);

// ─── Loading Dialog ───────────────────────────────────────────────────────────
const showLoading = ref(false);
const loadingStep = ref(0);
const loadingPercent = ref(0);
const loadingSteps = [
  { label: 'โหลดข้อมูลผู้ส่งอวยพร', pct: 80 },
  { label: 'แสดงรายการผู้ส่งอวยพร', pct: 100 },
] as const;

let pctTimer: ReturnType<typeof setInterval> | null = null;

// ─── Blob URL tracking for cleanup ────────────────────────────────────────────
const blobUrls: string[] = [];

// ─── Abort controller for cancelling in-flight requests ───────────────────────
let fetchAbortController: AbortController | null = null;

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const animatePct = (target: number): void => {
  if (pctTimer) clearInterval(pctTimer);
  const start = loadingPercent.value;
  const t0 = Date.now();
  pctTimer = setInterval(() => {
    const p = Math.min(1, (Date.now() - t0) / 800);
    loadingPercent.value = Math.round(start + (target - start) * p);
    if (p >= 1) {
      clearInterval(pctTimer!);
      pctTimer = null;
    }
  }, 16);
};

const startLoading = (): void => {
  showLoading.value = true;
  loadingStep.value = 0;
  loadingPercent.value = 0;
  animatePct(5);
};

const stopLoading = (): void => {
  loadingStep.value = loadingSteps.length;
  animatePct(100);
  setTimeout(() => {
    showLoading.value = false;
  }, 1000);
};

/** Fetch a blob URL and track it for cleanup on unmount. */
const getImageUrl = async (path: string): Promise<string> => {
  try {
    const res = await api.get(`/upload/${path}`, { responseType: 'blob' });
    const url = URL.createObjectURL(res.data as Blob);
    blobUrls.push(url);
    return url;
  } catch {
    return '';
  }
};

// ─── Data Fetching ────────────────────────────────────────────────────────────
/** โหลด startDate / endDate เพื่อสร้าง month & year options */
const fetchFestivalPeriod = async (id: string): Promise<void> => {
  try {
    const res = await api.get<{ festival: FestivalPeriod }>(`/festival/${Number(id)}`);
    const { startDate, endDate } = res.data.festival;
    festivalPeriod.value = { startDate, endDate };
  } catch (err) {
    console.error('fetchFestivalPeriod error:', err);
  }
};

const fetchSender = async (id: string): Promise<void> => {
  // Cancel any pending request before starting a new one
  fetchAbortController?.abort();
  fetchAbortController = new AbortController();

  startLoading();
  loading.value = true;

  try {
    loadingStep.value = 0;
    animatePct(loadingSteps[0].pct);

    const res = await api.get(`/sender/paginate/${Number(id)}`, {
      signal: fetchAbortController.signal,
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        fullname: fullname.value.trim() || undefined,
        position: position.value.trim() || undefined,
        department: department.value.trim() || undefined,
        month: selectedMonth.value || undefined,
        year: selectedYear.value || undefined,
      },
    });

    const list: SenderItem[] = res.data.sender?.data ?? [];
    pagination.value.rowsNumber = res.data.sender?.total ?? 0;

    loadingStep.value = 1;
    animatePct(loadingSteps[1].pct);

    rows.value = await Promise.all(
      list.map(
        async (item): Promise<TableRow> => ({
          sId: item.sId,
          fullname: item.fullname || '-',
          position: item.position || '-',
          department: item.department || '-',
          url: item.card?.imageCard ? await getImageUrl(item.card.imageCard) : '',
          wishWord: item.wish?.wishWord || '',
        }),
      ),
    );
  } catch (err) {
    // Ignore abort errors — they're intentional (new search started)
    if (err instanceof Error && err.name === 'AbortError') return;
    console.error('fetchSender error:', err);
    rows.value = [];
  } finally {
    loading.value = false;
    stopLoading();
  }
};

const openDetail = async (id: number | string): Promise<void> => {
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
    console.error('openDetail error:', err);
  }
};

// ─── Pagination Events ────────────────────────────────────────────────────────
const onSearch = (): void => {
  pagination.value.page = 1;
  void fetchSender(props.id);
};

const onPageChange = (): void => {
  void fetchSender(props.id);
};

const onRppChange = (): void => {
  pagination.value.page = 1;
  void fetchSender(props.id);
};

// ─── Click Particles ──────────────────────────────────────────────────────────

const PARTICLE_COLORS: readonly string[] = [
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

const PARTICLE_EMOJIS: readonly string[] = [
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

const spawnParticles = (x: number, y: number): void => {
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

const handleGlobalClick = (e: MouseEvent): void => {
  spawnParticles(e.clientX, e.clientY);
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  void fetchFestivalPeriod(props.id); // โหลด period ก่อน แล้ว computed options จะ reactive เอง
  void fetchSender(props.id);
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (pctTimer) clearInterval(pctTimer);
  fetchAbortController?.abort();
  blobUrls.forEach((url) => URL.revokeObjectURL(url));
});

watch(
  () => props.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      void fetchFestivalPeriod(newId);
      pagination.value.page = 1;
      void fetchSender(newId);
    }
  },
);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700;800&family=Prompt:wght@500;600;700;800&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$indigo: #4338ca;
$indigo-mid: #6366f1;
$indigo-soft: #eef2ff;
$indigo-deep: #1e1b4b;
$indigo-dark: #2d2d8a;
$teal: #0d9488;
$teal-light: #ccfbf1;
$surface: #ffffff;
$text-main: #1e1b4b;
$text-muted: #6b7280;
$r-card: 16px;

// ─── Page ─────────────────────────────────────────────────────────────────────
.list-sender-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(150deg, #eef2ff 0%, #f5f3ff 40%, #f0fdfa 100%);
  min-height: 100vh;
  position: relative;
}

// ─── BG Decoration ────────────────────────────────────────────────────────────
.bg-deco {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.bg-deco-blob {
  position: absolute;
  border-radius: 50%;
  animation: blobDrift var(--dur, 10s) ease-in-out infinite var(--delay, 0s);
}

.bg-deco-blob-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, transparent 70%);
  top: -100px;
  right: -100px;
  --dur: 9s;
}

.bg-deco-blob-2 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.06) 0%, transparent 70%);
  bottom: -80px;
  left: -80px;
  --dur: 11s;
  --delay: 1s;
}

.bg-deco-blob-3 {
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, transparent 70%);
  top: 45%;
  left: 35%;
  --dur: 8s;
  --delay: 2s;
}

@keyframes blobDrift {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-18px) scale(1.04);
  }
}

// ─── Filter Hero ──────────────────────────────────────────────────────────────
.filter-hero {
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: linear-gradient(135deg, #312e81 0%, $indigo 40%, #6d28d9 80%, #0d7a6e 130%);
  padding: 2.25rem 1.5rem 4rem;
}

.filter-hero-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: drift 8s ease-in-out infinite;
}

.filter-hero-blob-1 {
  width: 320px;
  height: 320px;
  background: rgba(165, 180, 252, 0.12);
  top: -100px;
  right: -80px;
}

.filter-hero-blob-2 {
  width: 180px;
  height: 180px;
  background: rgba(13, 148, 136, 0.12);
  bottom: -60px;
  left: -40px;
  animation-duration: 10s;
  animation-direction: reverse;
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
  gap: 1.5rem;
}

.filter-hero-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.filter-hero-icon {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.filter-hero-text {
  flex: 1;
}

.filter-hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.1rem, 4vw, 1.7rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 5px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.filter-hero-sub {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-count-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

.filter-active-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(245, 166, 35, 0.25);
  border: 1px solid rgba(245, 166, 35, 0.4);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.78rem;
  color: #fde68a;
  font-weight: 600;
  animation: activeChipPulse 2s ease infinite;
}

@keyframes activeChipPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────
.filter-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.25rem 1.25rem 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.filter-panel-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 1rem;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;

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
    transition:
      box-shadow 0.2s,
      border-color 0.2s !important;
  }
  :deep(.q-field__control:hover) {
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12) !important;
  }
}

.filter-field--dept {
  @media (min-width: 901px) {
    grid-column: span 2;
  }
}

.month-select :deep(.q-field__control) {
  border-radius: 12px !important;
  background: linear-gradient(135deg, #f0fdfa, #fff) !important;
  border: 1.5px solid rgba(13, 148, 136, 0.22) !important;
}

:global(.month-select-popup) {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(13, 148, 136, 0.15) !important;
  border: 1px solid rgba(13, 148, 136, 0.12) !important;
  overflow: auto !important;
  max-height: 280px !important;
  padding: 4px !important;
}

.month-option {
  border-radius: 10px !important;
  margin: 2px 4px !important;
}

.month-option-num {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, $teal-light, #f0fdfa);
  color: $teal;
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
  color: $text-main !important;
}

.year-select :deep(.q-field__control) {
  border-radius: 12px !important;
  background: linear-gradient(135deg, #f0fdfa, #fff) !important;
  border: 1.5px solid rgba(13, 148, 136, 0.22) !important;
}

:global(.year-select-popup) {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(13, 148, 136, 0.15) !important;
  border: 1px solid rgba(13, 148, 136, 0.12) !important;
  overflow: auto !important;
  max-height: 280px !important;
  padding: 4px !important;
}

.year-option {
  border-radius: 10px !important;
  margin: 2px 4px !important;
}

.year-option-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, $teal-light, #f0fdfa);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.year-option-label {
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  color: $text-main !important;
}
.year-option-caption {
  font-size: 0.72rem !important;
  color: #9ca3af !important;
}

.select-no-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 1.5rem;
  color: #9ca3af;
  font-size: 0.85rem;
}

.filter-selected-text {
  font-size: 0.88rem;
  font-weight: 600;
  color: $text-main;
}

// ─── Action Buttons ───────────────────────────────────────────────────────────
.filter-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: stretch;
  }
}

.btn-clear {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.82);
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s,
    opacity 0.2s;

  @media (max-width: 480px) {
    flex: 1;
    justify-content: center;
  }

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.btn-clear-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(245, 166, 35, 0.4);
  color: #fde68a;
  font-size: 0.7rem;
  font-weight: 800;
}

.btn-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #fff 0%, #f0fdf4 100%);
  color: $indigo-deep;
  font-family: 'Prompt', 'Noto Sans Thai', sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    opacity 0.2s;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    flex: 2;
    justify-content: center;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(99, 102, 241, 0.06) 100%);
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover:not(.btn-search--loading):not(:disabled) {
    transform: translateY(-3px);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.22),
      0 4px 12px rgba(0, 0, 0, 0.12);
    &::before {
      opacity: 1;
    }
  }

  &:active:not(.btn-search--loading) {
    transform: translateY(-1px);
  }
  &.btn-search--loading,
  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
    transform: none;
  }
}

.btn-search-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

// ─── Content Area ─────────────────────────────────────────────────────────────
.content-area {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.result-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  padding: 0.75rem 1.25rem;
  box-shadow: 0 2px 12px rgba(67, 56, 202, 0.07);
}

.result-bar-left {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.result-num {
  font-family: 'Prompt', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: $indigo;
}
.result-unit {
  font-size: 0.82rem;
  color: $text-muted;
}
.result-filter-note {
  font-size: 0.78rem;
  color: $teal;
  font-weight: 600;
}
.result-page-info {
  font-size: 0.78rem;
  color: $text-muted;
}

// ─── Card Grid ────────────────────────────────────────────────────────────────
.card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

// ─── Sender Card ──────────────────────────────────────────────────────────────
.sender-card {
  background: $surface;
  border-radius: $r-card;
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

// .card-img-wrap { position: relative; background: $indigo-soft; }
.card-img-wrap {
  position: relative;
  background: $indigo-soft;
  // เพิ่ม
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

.card-avatar-fallback {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

// .card-wish-badge {
//   position: absolute;
//   bottom: 0; left: 0; right: 0;
//   background: linear-gradient(to top, rgba(49,46,129,0.82), transparent);
//   color: rgba(255, 255, 255, 0.9);
//   font-size: 0.67rem;
//   font-style: italic;
//   padding: 18px 10px 7px;
//   display: flex;
//   align-items: flex-end;
//   gap: 3px;
//   line-height: 1.4;
// }

// .card-wish-badge {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: linear-gradient(to top, rgba(49, 46, 129, 0.92), rgba(49, 46, 129, 0.6) 60%, transparent);
//   color: rgba(255, 255, 255, 0.95);
//   font-size: 0.67rem;
//   font-style: italic;
//   padding: 28px 10px 8px;   // ← เพิ่ม padding-top ให้ gradient fade สวย
//   display: flex;
//   align-items: flex-start;  // ← เปลี่ยนจาก flex-end
//   gap: 4px;
//   line-height: 1.5;
//   white-space: normal;      // ← อนุญาตให้ขึ้นบรรทัดใหม่
//   word-break: break-word;   // ← ตัดคำที่ยาวเกิน
// }

// เพิ่มใหม่
.card-wish-text {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin-top: 6px;
  font-size: 0.68rem;
  font-style: italic;
  color: $indigo-mid;
  line-height: 1.55;
  word-break: break-word;
  white-space: normal;
  background: $indigo-soft;
  border-radius: 8px;
  padding: 5px 8px;
  border-left: 2px solid $indigo-mid;
}
.card-wish-quote-icon {
  flex-shrink: 0; // ← ไม่ให้ icon ย่อ
  margin-top: 1px;
}

.card-body {
  padding: 10px 12px 6px;
  flex: 1;
}

.card-name {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(0.78rem, 2vw, 0.88rem);
  font-weight: 700;
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
  gap: 3px;
  font-size: 0.67rem;
  color: color.adjust($text-muted, $lightness: 10%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: $indigo;
  background: $indigo-soft;
  border-top: 1px solid rgba(99, 102, 241, 0.1);
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.22s,
    transform 0.22s;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
.sender-card--skeleton .card-body {
  padding: 12px;
}

.skeleton-img {
  height: 160px;
  background: linear-gradient(90deg, #eef2ff 25%, #e0e7ff 50%, #eef2ff 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease infinite;

  @media (max-width: 480px) {
    height: 130px;
  }
}

.skeleton-line {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #eef2ff 25%, #e0e7ff 50%, #eef2ff 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease infinite;
}

.skeleton-line--w75 {
  width: 75%;
}
.skeleton-line--w55 {
  width: 55%;
}
.skeleton-line--w40 {
  width: 40%;
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

// ─── Empty State ──────────────────────────────────────────────────────────────
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
  text-align: center;
}

.empty-emoji {
  font-size: 3.5rem;
  margin-bottom: 12px;
  animation: emptyBounce 2s ease infinite;
}

@keyframes emptyBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.empty-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 4px;
}
.empty-sub {
  font-size: 0.83rem;
  color: $text-muted;
  margin-bottom: 1.25rem;
}

.empty-clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 24px;
  border-radius: 12px;
  border: none;
  background: $indigo-soft;
  color: $indigo;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;

  &:hover {
    background: #e0e7ff;
    transform: translateY(-2px);
  }
}

// ─── Pagination ───────────────────────────────────────────────────────────────
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

// ─── Detail Dialog ────────────────────────────────────────────────────────────
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
  background: linear-gradient(135deg, $indigo-deep, $indigo-dark);
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
  transition:
    background 0.15s,
    transform 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: rotate(90deg);
  }
}

.detail-body {
  padding: 1.25rem 1.5rem 0.75rem;
}

.detail-name {
  font-family: 'Prompt', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
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
  gap: 4px;
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
  font-weight: 700;
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

// ─── Loading Dialog ───────────────────────────────────────────────────────────
.loading-dialog {
  background: #fff;
  border-radius: 24px;
  padding: 2rem 1.75rem 1.75rem;
  width: min(340px, 92vw);
  text-align: center;
  box-shadow: 0 24px 64px rgba(26, 20, 96, 0.22);
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  outline: none;
}

.ld-orb-wrap {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ld-orb-bg {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1460, #6b5ce7, #a78bfa);
  animation: ldOrbPulse 2s ease-in-out infinite;
}

.ld-orb-ring1 {
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  border: 2.5px solid transparent;
  border-top-color: #a78bfa;
  border-right-color: #6b5ce7;
  animation: ldSpin 1.1s linear infinite;
}

.ld-orb-ring2 {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  border-bottom-color: rgba(167, 139, 250, 0.28);
  animation: ldSpin 2.2s linear infinite reverse;
}

.ld-orb-inner {
  position: relative;
  z-index: 2;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

@keyframes ldSpin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes ldOrbPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(107, 92, 231, 0.3);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(107, 92, 231, 0);
  }
}

.ld-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: $indigo-deep;
  margin-bottom: 0.1rem;
}
.ld-pct-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 3px;
  margin-bottom: 0.2rem;
}
.ld-pct-num {
  font-family: 'Prompt', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: $indigo-dark;
  line-height: 1;
  min-width: 3ch;
  text-align: right;
}
.ld-pct-sym {
  font-size: 1.1rem;
  font-weight: 700;
  color: #6b5ce7;
}
.ld-sub {
  font-size: 0.76rem;
  color: #8b87b0;
  min-height: 1rem;
  margin-bottom: 1rem;
}

.ld-steps {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(45, 45, 138, 0.07);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 1rem;
  text-align: left;
}

.ld-step-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 13px;
  border-bottom: 1px solid rgba(45, 45, 138, 0.06);
  transition: background 0.35s;

  &:last-child {
    border-bottom: none;
  }
  &--done {
    background: rgba(34, 197, 94, 0.05);
  }
  &--active {
    background: rgba(99, 102, 241, 0.07);
  }
  &--pending {
    background: transparent;
  }
}

.ld-step-ic {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;

  &--done {
    background: #dcfce7;
    color: #16a34a;
  }
  &--active {
    background: $indigo-soft;
    animation: ldIcPulse 1s ease-in-out infinite;
  }
  &--pending {
    background: #f3f4f6;
    color: #d1d5db;
  }
}

@keyframes ldIcPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(99, 102, 241, 0);
  }
}

.ld-step-spinner {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid #6366f1;
  border-top-color: transparent;
  animation: ldSpin 0.7s linear infinite;
}

.ld-step-label {
  flex: 1;
  font-size: 0.79rem;
  line-height: 1.35;

  .ld-step-row--done & {
    color: #374151;
  }
  .ld-step-row--active & {
    color: $indigo-deep;
    font-weight: 700;
  }
  .ld-step-row--pending & {
    color: #9ca3af;
  }
}

.ld-step-pct {
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 28px;
  text-align: right;

  &--done {
    color: #16a34a;
  }
  &--active {
    color: #6366f1;
  }
}

.ld-bar-track {
  height: 6px;
  border-radius: 3px;
  background: rgba(45, 45, 138, 0.08);
  overflow: hidden;
  margin-bottom: 0.85rem;
}

.ld-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, $indigo-dark, #a78bfa);
  transition: width 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.ld-dots {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.ld-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $indigo-dark;
  display: inline-block;
  animation: ldDotB 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
}

@keyframes ldDotB {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.35;
  }
  40% {
    transform: scale(1.1);
    opacity: 1;
  }
}

// ─── Card Transition ──────────────────────────────────────────────────────────
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

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 600px) {
  .filter-hero {
    padding: 1.5rem 1rem 3.5rem;
  }
  .content-area {
    padding: 0 0.75rem 2.5rem;
  }
  .filter-hero-icon {
    width: 42px;
    height: 42px;
  }
  .filter-panel {
    padding: 1rem;
  }
  .filter-actions {
    flex-direction: column;
  }
  .btn-clear,
  .btn-search {
    width: 100%;
    justify-content: center;
  }
  .pagination-row {
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
    transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(1);
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
* {
  cursor:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'%3E%3Cpath fill='%23e11d48' d='M21.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S20 13.83 20 13s.67-1.5 1.5-1.5zm-3.51-4.49c.59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12.58-.58 1.53-.58 2.12 0zM13 2.5c0-.83.67-1.5 1.5-1.5S16 1.67 16 2.5 15.33 4 14.5 4 13 3.33 13 2.5zM2 22l10-4L6 12 2 22zm13.5-3c.83 0 1.5.67 1.5 1.5S16.33 22 15.5 22 14 21.33 14 20.5s.67-1.5 1.5-1.5zm-7-8c.83 0 1.5.67 1.5 1.5S9.33 13 8.5 13 7 12.33 7 11.5 7.67 10 8.5 10zm8-2.5c0 .83-.67 1.5-1.5 1.5S13.5 8.33 13.5 7.5 14.17 6 15 6s1.5.67 1.5 1.5z'/%3E%3C/svg%3E")
      4 4,
    auto;

  /* pointer (เมื่อ hover ปุ่ม/link) */
  &:where(button, a, [role='button'], .cursor-pointer) {
    cursor:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'%3E%3Cpath fill='%236366f1' d='M21.5 11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S20 13.83 20 13s.67-1.5 1.5-1.5zm-3.51-4.49c.59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12.58-.58 1.53-.58 2.12 0zM13 2.5c0-.83.67-1.5 1.5-1.5S16 1.67 16 2.5 15.33 4 14.5 4 13 3.33 13 2.5zM2 22l10-4L6 12 2 22zm13.5-3c.83 0 1.5.67 1.5 1.5S16.33 22 15.5 22 14 21.33 14 20.5s.67-1.5 1.5-1.5zm-7-8c.83 0 1.5.67 1.5 1.5S9.33 13 8.5 13 7 12.33 7 11.5 7.67 10 8.5 10zm8-2.5c0 .83-.67 1.5-1.5 1.5S13.5 8.33 13.5 7.5 14.17 6 15 6s1.5.67 1.5 1.5z'/%3E%3C/svg%3E")
        4 4,
      pointer !important;
  }
}
</style>
