<template>
  <q-page class="sender-page">
    <!-- ===== HERO ===== -->
    <div class="hero-header">
      <div class="hero-orb orb-1" />
      <div class="hero-orb orb-2" />
      <div class="hero-orb orb-3" />
      <div class="hero-content">
        <div class="hero-emoji">🎴</div>
        <h1 class="hero-title">ส่งคำอวยพร</h1>
        <p class="hero-sub">เลือกบัตรอวยพร เขียนชื่อ และส่งความสุขให้กัน</p>
      </div>
    </div>

    <!-- ===== FORM ===== -->
    <q-form class="form-body" @submit="postSender" @reset="resetForm">
      <div class="body-container">
        <!-- STEP 1: CARD PICKER -->
        <div class="section-card animate-in" style="animation-delay: 0.05s">
          <div class="section-label">
            <span class="step-badge">1</span>
            เลือกการ์ดอวยพร
          </div>

          <transition name="fade-slide">
            <div v-if="selectedImage" class="selected-preview">
              <q-img
                :src="selectedImage"
                :ratio="16 / 9"
                fit="contain"
                class="selected-preview-img"
              >
                <div class="selected-preview-badge">
                  <q-icon name="check_circle" size="16px" />
                  การ์ดที่เลือก
                </div>
              </q-img>
            </div>
          </transition>

          <div class="grid-wrapper">
            <div class="grid-row">
              <button
                class="nav-btn"
                :disabled="pagination.page === 1"
                @click="myTable?.prevPage()"
                type="button"
              >
                <q-icon name="chevron_left" size="22px" />
              </button>

              <div class="grid-area">
                <q-table
                  ref="myTable"
                  grid
                  flat
                  :rows="rows"
                  :columns="columns"
                  row-key="url"
                  v-model:pagination="pagination"
                  hide-header
                  hide-bottom
                >
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-4">
                      <div
                        class="img-card"
                        :class="selectedCardId === props.row.cId ? 'img-card--active' : ''"
                        @click="selectCard(props.row)"
                      >
                        <q-img :src="props.row.url" :ratio="1" fit="contain" class="img-card-img" />
                        <div v-if="selectedCardId === props.row.cId" class="img-card-check">
                          <q-icon name="check_circle" size="24px" color="white" />
                        </div>
                      </div>
                    </div>
                  </template>
                </q-table>
              </div>

              <button
                class="nav-btn"
                :disabled="pagination.page >= totalPages"
                @click="myTable?.nextPage()"
                type="button"
              >
                <q-icon name="chevron_right" size="22px" />
              </button>
            </div>

            <div v-if="totalPages > 1" class="page-dots">
              <span
                v-for="p in totalPages"
                :key="p"
                class="page-dot"
                :class="p === pagination.page ? 'page-dot--active' : ''"
                @click="pagination.page = p"
              />
            </div>
          </div>
        </div>

        <!-- STEP 2: FORM FIELDS -->
        <div class="section-card animate-in" style="animation-delay: 0.13s">
          <div class="section-label">
            <span class="step-badge step-badge--amber">2</span>
            ข้อมูลผู้ส่ง
          </div>

          <div class="fields-stack">
            <div class="field-group">
              <label class="field-label-text">คำอวยพร</label>
              <q-select
                outlined
                v-model="selectedWisher"
                :options="filteredOptions"
                @filter="filterFn"
                emit-value
                map-options
                lazy-rules
                label="เลือกคำอวยพร..."
                class="custom-field wish-select"
                popup-content-class="wish-select-popup"
                :rules="[(val) => (val !== null && val !== '') || 'กรุณาเลือกคำอวยพร']"
              >
                <template v-slot:prepend>
                  <q-icon name="auto_awesome" color="amber-7" />
                </template>
                <template v-slot:selected-item="scope">
                  <div class="wish-selected-item">
                    <span class="wish-selected-dot">✨</span>
                    <span class="wish-selected-text">{{ scope.opt.label }}</span>
                  </div>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" class="wish-option-item">
                    <q-item-section avatar>
                      <div class="wish-option-icon">💬</div>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="wish-option-label">{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="selectedWisher === scope.opt.value">
                      <q-icon name="check_circle" color="indigo-5" size="18px" />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <div class="wish-no-option">
                    <span>🔍</span>
                    <span>ไม่พบคำอวยพร</span>
                  </div>
                </template>
              </q-select>
            </div>

            <div class="field-group">
              <label class="field-label-text">ชื่อ-นามสกุล</label>
              <q-input
                outlined
                v-model="name"
                label="กรอกชื่อ-นามสกุล"
                class="custom-field"
                lazy-rules
                :rules="[(val) => val.trim().length > 0 || 'กรุณากรอกชื่อ-นามสกุล']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="indigo-5" />
                </template>
              </q-input>
            </div>

            <div class="field-group">
              <label class="field-label-text">ตำแหน่ง</label>
              <q-input
                outlined
                v-model="position"
                label="กรอกตำแหน่ง"
                class="custom-field"
                lazy-rules
                :rules="[(val) => val.trim().length > 0 || 'กรุณากรอกตำแหน่ง']"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="indigo-5" />
                </template>
              </q-input>
            </div>

            <div class="field-group">
              <label class="field-label-text">กอง / สำนัก / ศูนย์</label>
              <q-input
                outlined
                v-model="department"
                label="กรอกหน่วยงาน หรือ บุคคลภายนอก"
                class="custom-field"
                lazy-rules
                :rules="[(val) => val.trim().length > 0 || 'กรุณากรอกหน่วยงาน']"
              >
                <template v-slot:prepend>
                  <q-icon name="corporate_fare" color="indigo-5" />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="actions-row animate-in" style="animation-delay: 0.2s">
          <button type="reset" class="reset-btn">
            <q-icon name="refresh" size="18px" />
            ล้างข้อมูล
          </button>
          <button
            type="submit"
            class="submit-btn"
            :class="{ 'submit-btn--loading': submitting }"
            :disabled="submitting || !isWithinFestivalPeriod"
          >
            <span v-if="!submitting && isWithinFestivalPeriod" class="btn-inner">
              <q-icon name="send" size="18px" />
              ส่งคำอวยพร
            </span>
            <span v-else-if="!isWithinFestivalPeriod" class="btn-inner">
              <q-icon name="event_busy" size="18px" />
              ไม่อยู่ในช่วงเทศกาล
            </span>
            <span v-else class="btn-inner">
              <q-circular-progress indeterminate size="18px" color="white" />
              กำลังส่ง...
            </span>
          </button>
        </div>
      </div>
    </q-form>

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

    <!-- ===== ERROR DIALOG ===== -->
    <q-dialog v-model="showErrorDialog">
      <div class="unpolite-dialog">
        <div class="unpolite-header">
          <div class="unpolite-header-icon">
            <q-icon name="warning_amber" size="1.6rem" color="white" />
          </div>
          <div class="unpolite-header-text">
            <div class="unpolite-title">ไม่สามารถส่งคำอวยพรได้</div>
            <div class="unpolite-sub">พบคำที่ไม่เหมาะสมในข้อมูล</div>
          </div>
        </div>
        <div class="unpolite-body">
          <div class="unpolite-icon-wrap">
            <span class="unpolite-emoji">🚫</span>
          </div>
          <p class="unpolite-msg">{{ errorMessage }}</p>
          <p class="unpolite-hint">
            กรุณาตรวจสอบข้อมูลที่กรอก และแก้ไขคำที่ไม่เหมาะสมก่อนส่งอีกครั้ง
          </p>
        </div>
      </div>
    </q-dialog>

    <!-- ===== SUCCESS OVERLAY ===== -->
    <transition name="success-fade">
      <div v-if="showSuccess" class="success-overlay" @click.self="closeSuccess">
        <div class="confetti-wrap">
          <span v-for="n in 18" :key="n" class="confetti-dot" :style="confettiStyle(n)" />
        </div>
        <div class="success-card">
          <div class="success-icon-ring" @click="triggerFirework">
            <span
              v-for="s in 12"
              :key="s"
              class="sparkle"
              :class="{ 'sparkle--burst': fireworkActive }"
              :style="sparkleStyle(s)"
            />
            <div class="success-icon-inner">
              <q-icon name="celebration" size="2.4rem" color="white" />
            </div>
          </div>
          <div class="icon-hint" v-if="!fireworkActive">กดเพื่อฉลอง 🎊</div>
          <div class="icon-hint icon-hint--boom" v-else>🎆 ยินดีด้วย! 🎆</div>

          <div class="success-title">อวยพรสำเร็จแล้ว! 🎉</div>
          <div class="success-msg">ขอให้ท่านประสบความสำเร็จ<br />ในหน้าที่การทำงาน</div>

          <!-- <div v-if="successImage" class="success-card-preview">
            <q-img :src="successImage" :ratio="4 / 3" fit="contain" class="success-preview-img" />
            <div class="success-wish-chip" v-if="successWishText">
              <q-icon name="format_quote" size="13px" class="q-mr-xs" />
              {{ successWishText }}
            </div>
          </div> -->
          <div v-if="successImage" class="success-card-preview">
            <q-img :src="successImage" :ratio="4 / 3" fit="contain" class="success-preview-img" />
          </div>
          <div class="success-wish-chip" v-if="successWishText">
            <q-icon name="format_quote" size="13px" class="q-mr-xs" />
            {{ successWishText }}
          </div>

          <div class="success-sender-info" v-if="successName">
            <q-icon name="person" size="15px" class="q-mr-xs" color="indigo-4" />
            <span>{{ successName }}</span>
            <span v-if="successDept" class="success-dept"> · {{ successDept }}</span>
          </div>

          <button class="success-close-btn" @click="closeSuccess">
            <q-icon name="check" size="18px" class="q-mr-xs" />
            ขอบคุณ
          </button>
        </div>
      </div>
    </transition>

    <!-- ===== CLICK PARTICLES ===== -->
    <teleport to="body">
      <div class="click-particles-root">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { QTable } from 'quasar';
import { api } from 'src/boot/axios';
import type { AxiosError } from 'axios';
import { useFestivalStore } from 'src/stores/festival';

// ─── Constants ────────────────────────────────────────────────────────────────
const TIMING = {
  LOADING_HIDE_DELAY: 1000,
  ERROR_AUTO_CLOSE: 2000,
  FIREWORK_DELAY: 350,
  FIREWORK_DURATION: 900,
} as const;

const ROWS_PER_PAGE = 3;

// ─── Types ────────────────────────────────────────────────────────────────────
interface CardRow {
  cId: number;
  url: string;
}

interface WisherOption {
  label: string;
  value: number;
}

interface Wisher {
  wId: number;
  wishWord: string;
}

interface FestivalCard {
  cId: number;
  imageCard: string;
}

interface FestivalResponse {
  fId: number;
  startDate: string;
  endDate: string;
  wisher: Wisher[];
  card: FestivalCard[];
}

interface Particle {
  id: number;
  style: Record<string, string>;
}

type ShapeType = 'circle' | 'square' | 'star' | 'emoji';

// ─── Props & Store ─────────────────────────────────────────────────────────────
const props = defineProps({ id: { type: String, required: true } });
const festivalStore = useFestivalStore();

// ─── Refs ─────────────────────────────────────────────────────────────────────
const myTable = ref<InstanceType<typeof QTable> | null>(null);

// Form state — typed correctly to avoid null/string mismatch
const name = ref<string>('');
const position = ref<string>('');
const department = ref<string>('');
const selectedWisher = ref<number | null>(null);
const submitting = ref(false);

// Card state
const selectedCardId = ref<number | null>(null);
const selectedImage = ref<string | null>(null);
const rows = ref<CardRow[]>([]);
const columns = [{ name: 'image', label: 'รูปภาพ', field: 'url' }];
const pagination = ref({ page: 1, rowsPerPage: ROWS_PER_PAGE });

// Wisher options
const wisherData = ref<WisherOption[]>([]);
const filteredOptions = ref<WisherOption[]>([]);

// Festival period
const festivalStartDate = ref<string | null>(null);
const festivalEndDate = ref<string | null>(null);

// Success state
const showSuccess = ref(false);
const successImage = ref<string | null>(null);
const successName = ref<string | null>(null);
const successDept = ref<string | null>(null);
const successWishText = ref<string | null>(null);

// Error state
const showErrorDialog = ref(false);
const errorMessage = ref('');

// Loading state
const showLoading = ref(false);
const loadingStep = ref(0);
const loadingPercent = ref(0);

// Firework
const fireworkActive = ref(false);

// Blob URL tracking for cleanup
const blobUrls: string[] = [];

// Click particles
const activeParticles = ref<Particle[]>([]);
let particleId = 0;
let pctAnimTimer: ReturnType<typeof setInterval> | null = null;

// ─── Computed ─────────────────────────────────────────────────────────────────
const totalPages = computed(() => Math.max(1, Math.ceil(rows.value.length / ROWS_PER_PAGE)));

const isWithinFestivalPeriod = computed(() => {
  if (!festivalStartDate.value && !festivalEndDate.value) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (festivalStartDate.value) {
    const start = new Date(festivalStartDate.value);
    start.setHours(0, 0, 0, 0);
    if (today < start) return false;
  }

  if (festivalEndDate.value) {
    const end = new Date(festivalEndDate.value);
    end.setHours(23, 59, 59, 999);
    if (today > end) return false;
  }

  return true;
});

// ─── Loading Steps ────────────────────────────────────────────────────────────
const loadingSteps = [
  { label: 'โหลดข้อมูลเทศกาล', pct: 20 },
  { label: 'ดึงรายการคำอวยพร', pct: 45 },
  { label: 'โหลดรูปการ์ดทั้งหมด', pct: 80 },
  { label: 'เตรียมแบบฟอร์ม', pct: 100 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const animatePct = (target: number) => {
  if (pctAnimTimer) clearInterval(pctAnimTimer);
  const start = loadingPercent.value;
  const t0 = Date.now();
  pctAnimTimer = setInterval(() => {
    const p = Math.min(1, (Date.now() - t0) / 800);
    loadingPercent.value = Math.round(start + (target - start) * p);
    if (p >= 1) {
      clearInterval(pctAnimTimer!);
      pctAnimTimer = null;
    }
  }, 16);
};

const startLoading = () => {
  showLoading.value = true;
  loadingStep.value = 0;
  loadingPercent.value = 0;
  animatePct(5);
};

const stopLoading = () => {
  loadingStep.value = loadingSteps.length;
  animatePct(100);
  setTimeout(() => {
    showLoading.value = false;
  }, TIMING.LOADING_HIDE_DELAY);
};

/** Fetch a blob URL and track it for cleanup on unmount. */
const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    const url = URL.createObjectURL(response.data as Blob);
    blobUrls.push(url);
    return url;
  } catch {
    return '';
  }
};

const selectCard = (row: CardRow) => {
  selectedCardId.value = row.cId;
  selectedImage.value = row.url;
};

const filterFn = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    if (!val) {
      filteredOptions.value = wisherData.value;
      return;
    }
    const needle = val.toLowerCase();
    filteredOptions.value = wisherData.value.filter((v) => v.label.toLowerCase().includes(needle));
  });
};

// ─── Data Fetching ────────────────────────────────────────────────────────────
const fetchBirthCard = async (targetId: string) => {
  startLoading();
  try {
    // Step 0 → 20%
    const response = await api.get<{ festival: FestivalResponse }>(`/festival/${Number(targetId)}`);
    const fest = response.data?.festival;

    if (fest?.startDate) festivalStartDate.value = fest.startDate;
    if (fest?.endDate) festivalEndDate.value = fest.endDate;

    if (!fest?.fId) return;

    // Step 1 → 45%
    loadingStep.value = 1;
    animatePct(loadingSteps[1]!.pct);
    wisherData.value = (fest.wisher ?? []).map((i) => ({
      label: i.wishWord,
      value: i.wId,
    }));
    filteredOptions.value = wisherData.value;

    // Step 2 → 80% (progressive)
    loadingStep.value = 2;
    const validCards = fest.card ?? [];
    const total = validCards.filter((c) => c.imageCard).length;
    let loaded = 0;

    const cardRows = await Promise.all(
      validCards.map(async (c): Promise<CardRow | null> => {
        if (!c.imageCard) return null;
        const url = await getImageUrl(c.imageCard);
        loaded++;
        animatePct(Math.round(45 + (loaded / Math.max(total, 1)) * 35));
        return { cId: c.cId, url };
      }),
    );

    // Step 3 → done
    loadingStep.value = 3;
    rows.value = cardRows.filter((c): c is CardRow => c !== null);

    const first = rows.value[0];
    if (first) {
      selectedCardId.value = first.cId;
      selectedImage.value = first.url;
    }
  } catch {
    errorMessage.value = 'ไม่สามารถโหลดข้อมูลเทศกาลได้ กรุณาตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง';
    showErrorDialog.value = true;
  } finally {
    stopLoading();
  }
};

const postSender = async () => {
  submitting.value = true;
  try {
    const response = await api.post('/sender', {
      fullname: name.value.trim(),
      position: position.value.trim(),
      department: department.value.trim(),
      wishId: selectedWisher.value,
      cardId: selectedCardId.value,
      festivalId: Number(props.id),
    });

    if (response.status === 201) {
      successImage.value = selectedImage.value;
      successName.value = name.value.trim();
      successDept.value = department.value.trim();
      const wishObj = wisherData.value.find((w) => w.value === selectedWisher.value);
      successWishText.value = wishObj?.label ?? null;
      showSuccess.value = true;
      resetForm();
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    errorMessage.value = error.response?.data?.message ?? 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์';
    showErrorDialog.value = true;
  } finally {
    submitting.value = false;
  }
};

const resetForm = () => {
  name.value = '';
  position.value = '';
  department.value = '';
  selectedWisher.value = null;
  pagination.value.page = 1;
  const first = rows.value[0];
  if (first) {
    selectedCardId.value = first.cId;
    selectedImage.value = first.url;
  }
};

const closeSuccess = () => {
  showSuccess.value = false;
  resetForm();
};

// ─── Firework ─────────────────────────────────────────────────────────────────
const triggerFirework = () => {
  fireworkActive.value = false;
  setTimeout(() => {
    fireworkActive.value = true;
  }, 10);
  setTimeout(() => {
    fireworkActive.value = false;
  }, TIMING.FIREWORK_DURATION);
};

// ─── Particle Styles ──────────────────────────────────────────────────────────
const sparkleStyle = (n: number): Record<string, string> => {
  const colors = [
    '#fbbf24',
    '#e11d48',
    '#6366f1',
    '#22c55e',
    '#fb7185',
    '#f59e0b',
    '#a78bfa',
    '#34d399',
    '#f472b6',
  ];
  const angle = (n - 1) * 30;
  const color = colors[n % colors.length]!;
  const size = 6 + (n % 4) * 2;
  return {
    '--angle': `${angle}deg`,
    '--color': color,
    '--size': `${size}px`,
    '--dist': `${52 + (n % 3) * 14}px`,
  };
};

const confettiStyle = (n: number): Record<string, string> => {
  const colors = ['#e11d48', '#fbbf24', '#6366f1', '#22c55e', '#fb7185', '#f59e0b', '#818cf8'];
  const color = colors[n % colors.length]!;
  const left = (n * 37 + 11) % 100;
  const delay = ((n * 0.17) % 1.2).toFixed(2);
  const dur = (1.2 + ((n * 0.13) % 1)).toFixed(2);
  const size = 6 + (n % 5);
  return {
    left: `${left}%`,
    top: `${(n * 23) % 60}%`,
    width: `${size}px`,
    height: `${size}px`,
    background: color,
    animationDelay: `${delay}s`,
    animationDuration: `${dur}s`,
    borderRadius: n % 3 === 0 ? '50%' : '2px',
  };
};

// ─── Click Particles ──────────────────────────────────────────────────────────
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
  const target = e.target as HTMLElement;
  if (target.closest('.reset-btn')) return;
  spawnParticles(e.clientX, e.clientY);
};

// ─── Watchers ─────────────────────────────────────────────────────────────────
watch(showErrorDialog, (val) => {
  if (val) {
    setTimeout(() => {
      showErrorDialog.value = false;
    }, TIMING.ERROR_AUTO_CLOSE);
  }
});

watch(showSuccess, (val) => {
  if (val) {
    setTimeout(triggerFirework, TIMING.FIREWORK_DELAY);
  }
});

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  document.addEventListener('click', handleGlobalClick);
  if (props.id) {
    await festivalStore.fetchFestivalName(Number(props.id));
    await fetchBirthCard(props.id);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (pctAnimTimer) clearInterval(pctAnimTimer);
  // Revoke all blob URLs to prevent memory leaks
  blobUrls.forEach((url) => URL.revokeObjectURL(url));
});

// Watch for prop changes (navigation between festivals)
watch(
  () => props.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      void fetchBirthCard(newId);
    }
  },
);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$indigo-deep: #1a1460;
$indigo-mid: #2d2d8a;
$indigo-soft: #eeeeff;
$gold: #f5a623;
$teal: #0d9488;
$white: #ffffff;
$surface: #f5f4ff;
$muted: #8b87b0;

// ─── Page ─────────────────────────────────────────────────────────────────────
.sender-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(155deg, #f0edff 0%, #fff9ee 55%, #e8f8f6 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
.hero-header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, $indigo-deep 0%, $indigo-mid 55%, #3b1f80 100%);
  padding: clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(3rem, 7vw, 5rem);
  text-align: center;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.14;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: $gold;
  top: -90px;
  right: -70px;
  animation: floatY 7s ease-in-out infinite;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: $teal;
  bottom: -50px;
  left: -50px;
  animation: floatY 9s ease-in-out infinite reverse;
}

.orb-3 {
  width: 130px;
  height: 130px;
  background: #ffd166;
  top: 10px;
  left: 28%;
  animation: floatY 5.5s ease-in-out infinite 1.2s;
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18px);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-emoji {
  font-size: clamp(2.8rem, 8vw, 4rem);
  line-height: 1;
  margin-bottom: 0.6rem;
  animation: popIn 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes popIn {
  0% {
    transform: scale(0.4);
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

.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.7rem, 5vw, 2.5rem);
  font-weight: 700;
  color: $white;
  margin: 0 0 0.35rem;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: clamp(0.82rem, 2.5vw, 1rem);
  color: rgba(255, 255, 255, 0.68);
  margin: 0;
}

// ─── Form ─────────────────────────────────────────────────────────────────────
.form-body {
  margin-top: -2rem;
}

.body-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-card {
  background: $white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow:
    0 4px 28px rgba(26, 20, 96, 0.08),
    0 1px 4px rgba(26, 20, 96, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.85);

  @media (max-width: 480px) {
    padding: 1.1rem;
  }
}

.animate-in {
  animation: slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: $muted;
  text-transform: uppercase;
  margin-bottom: 1.1rem;
}

.step-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  color: $white;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &--amber {
    background: linear-gradient(135deg, $gold, #e8820a);
  }
}

// ─── Card Picker ──────────────────────────────────────────────────────────────
.selected-preview {
  margin-bottom: 1rem;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(26, 20, 96, 0.12);
}

.selected-preview-img {
  border-radius: 14px;
}

.selected-preview-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(26, 20, 96, 0.75);
  backdrop-filter: blur(4px);
  color: $white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.grid-wrapper {
  width: 100%;
}

.grid-row {
  display: flex;
  align-items: center;
  gap: 6px;

  @media (min-width: 480px) {
    gap: 10px;
  }
}

.grid-area {
  flex: 1;
  min-width: 0;
}

.nav-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(45, 45, 138, 0.2);
  background: $white;
  color: $indigo-mid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.18s,
    border-color 0.18s,
    transform 0.12s,
    box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(45, 45, 138, 0.08);

  &:hover:not(:disabled) {
    background: $indigo-soft;
    border-color: $indigo-mid;
    transform: scale(1.08);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (min-width: 480px) {
    width: 44px;
    height: 44px;
  }
}

.img-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2.5px solid transparent;
  transition:
    border-color 0.22s,
    transform 0.2s,
    box-shadow 0.2s;
  background: $surface;

  &:hover {
    border-color: rgba(45, 45, 138, 0.35);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(45, 45, 138, 0.15);
  }

  &--active {
    border-color: $indigo-mid;
    box-shadow: 0 6px 24px rgba(45, 45, 138, 0.28);
    transform: translateY(-2px);
  }
}

.img-card-img {
  display: block;
}

.img-card-check {
  position: absolute;
  inset: 0;
  background: rgba(45, 45, 138, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 0.75rem;
}

.page-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(45, 45, 138, 0.2);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;

  &--active {
    background: $indigo-mid;
    transform: scale(1.35);
  }
}

// ─── Form Fields ──────────────────────────────────────────────────────────────
.fields-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label-text {
  font-size: 0.78rem;
  font-weight: 600;
  color: $muted;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding-left: 2px;
}

.custom-field :deep(.q-field__control) {
  border-radius: 12px !important;
  background: $surface !important;
}

// ─── Wish Select ──────────────────────────────────────────────────────────────
.wish-select {
  :deep(.q-field__control) {
    border-radius: 14px !important;
    background: linear-gradient(135deg, #f8f7ff, #fff) !important;
    border: 1.5px solid rgba(99, 102, 241, 0.2) !important;
    transition:
      border-color 0.2s,
      box-shadow 0.2s !important;
  }

  :deep(.q-field--focused .q-field__control) {
    border-color: rgba(99, 102, 241, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
  }

  :deep(.q-field__label) {
    color: #8b87b0 !important;
    font-size: 0.88rem !important;
  }
}

.wish-selected-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
}

.wish-selected-dot {
  font-size: 1rem;
  flex-shrink: 0;
}

.wish-selected-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: #1a1460;
  line-height: 1.4;
  white-space: normal;
  word-break: break-word;
}

:global(.wish-select-popup) {
  border-radius: 14px !important;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15) !important;
  border: 1px solid rgba(99, 102, 241, 0.1) !important;
  overflow: hidden;
}

.wish-option-item {
  padding: 10px 14px !important;
  transition: background 0.15s !important;
  border-bottom: 1px solid rgba(99, 102, 241, 0.05) !important;

  &:last-child {
    border-bottom: none !important;
  }

  &:hover {
    background: rgba(99, 102, 241, 0.05) !important;
  }
}

.wish-option-icon {
  font-size: 1.1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wish-option-label {
  font-size: 0.88rem !important;
  font-weight: 500 !important;
  color: #1a1460 !important;
  white-space: normal !important;
  line-height: 1.5 !important;
}

.wish-no-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 1.5rem;
  color: #9ca3af;
  font-size: 0.85rem;

  span:first-child {
    font-size: 2rem;
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────
.actions-row {
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.submit-btn,
.reset-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.9rem 1.4rem;
  border-radius: 14px;
  border: none;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.18s,
    box-shadow 0.18s,
    opacity 0.18s;

  &:active {
    transform: scale(0.97);
  }
}

.reset-btn {
  padding: 0.9rem 1.2rem;
  background: rgba(26, 20, 96, 0.07);
  color: $indigo-mid;
  border: 1.5px solid rgba(45, 45, 138, 0.15);

  &:hover {
    background: rgba(26, 20, 96, 0.12);
  }
}

.submit-btn {
  flex: 1;
  background: linear-gradient(135deg, $indigo-deep, $indigo-mid 55%, #5a3ea0);
  color: $white;
  box-shadow: 0 6px 24px rgba(45, 45, 138, 0.32);

  &:hover:not(:disabled) {
    box-shadow: 0 10px 32px rgba(45, 45, 138, 0.42);
    transform: translateY(-2px);
  }

  &--loading,
  &:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
}

.btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
  color: $indigo-mid;
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
  background: linear-gradient(90deg, $indigo-mid, #a78bfa);
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
  background: $indigo-mid;
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

// ─── Error Dialog ─────────────────────────────────────────────────────────────
.unpolite-dialog {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 360px;
  max-width: 92vw;
  box-shadow: 0 24px 64px rgba(220, 38, 38, 0.18);
}

.unpolite-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #7f1d1d, #dc2626);
}

.unpolite-header-icon {
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

.unpolite-header-text {
  flex: 1;
}

.unpolite-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.unpolite-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}

.unpolite-body {
  padding: 1.5rem 1.5rem 1.25rem;
  text-align: center;
}

.unpolite-icon-wrap {
  margin-bottom: 0.75rem;
}

.unpolite-emoji {
  font-size: 3rem;
  display: inline-block;
  animation: unpoliteShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes unpoliteShake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-12deg) scale(1.1);
  }
  40% {
    transform: rotate(10deg) scale(1.1);
  }
  60% {
    transform: rotate(-8deg);
  }
  80% {
    transform: rotate(6deg);
  }
}

.unpolite-msg {
  font-size: 0.92rem;
  font-weight: 600;
  color: #dc2626;
  background: #fee2e2;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0 0 10px;
  line-height: 1.6;
}

.unpolite-hint {
  font-size: 0.78rem;
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

// ─── Success Overlay ──────────────────────────────────────────────────────────
.success-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 8, 40, 0.72);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.confetti-wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.confetti-dot {
  position: absolute;
  animation: confettiFall linear infinite;
  opacity: 0.85;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(540deg);
    opacity: 0;
  }
}

.success-card {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 28px;
  padding: 2rem 1.75rem 1.75rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 80px rgba(26, 20, 96, 0.28);
  animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 480px) {
    border-radius: 22px;
    padding: 1.5rem 1.25rem 1.25rem;
  }
}

@keyframes successPop {
  from {
    opacity: 0;
    transform: scale(0.86) translateY(24px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.success-icon-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.4rem;
  position: relative;
  cursor: pointer;
  animation: ringPulse 1.5s ease-in-out infinite;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.95);
  }
}

@keyframes ringPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.25);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
  }
}

.sparkle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: var(--color);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;

  &--burst {
    animation: sparkleBurst 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc((var(--angle) / 360) * 0.15s);
  }
}

@keyframes sparkleBurst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--dist)))
      scale(0.3);
  }
}

.icon-hint {
  font-size: 0.72rem;
  color: #9ca3af;
  margin-bottom: 0.75rem;
  min-height: 18px;

  &--boom {
    color: #6366f1;
    font-weight: 600;
    animation: hintPop 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
}

@keyframes hintPop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon-inner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(45, 45, 138, 0.35);
}

.success-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: $indigo-deep;
  margin-bottom: 0.5rem;
}

.success-msg {
  font-size: 0.95rem;
  color: #5a5a8a;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.success-card-preview {
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1.5px solid rgba(45, 45, 138, 0.1);
  position: relative;
}

.success-preview-img {
  display: block;
}

// .success-wish-chip {
//   position: absolute;
//   bottom: 8px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: rgba(26, 20, 96, 0.75);
//   backdrop-filter: blur(4px);
//   color: white;
//   font-size: 0.72rem;
//   font-style: italic;
//   font-weight: 500;
//   padding: 4px 12px;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   max-width: 90%;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }
.success-wish-chip {
  // ลบ position: absolute, bottom, left, transform ออกทั้งหมด
  background: rgba(26, 20, 96, 0.08);
  color: #3730a3;
  font-size: 0.82rem;
  font-style: italic;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  white-space: normal;
  text-align: left;
  line-height: 1.6;
  margin-bottom: 1rem;
  border: 1px solid rgba(26, 20, 96, 0.1);
}
// .success-wish-chip {
//   position: absolute;
//   bottom: 8px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: rgba(26, 20, 96, 0.75);
//   backdrop-filter: blur(4px);
//   color: white;
//   font-size: 0.72rem;
//   font-style: italic;
//   font-weight: 500;
//   padding: 4px 12px;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   white-space: normal;        // ← เปลี่ยนจาก nowrap
//   max-width: 90%;
//   overflow: visible;          // ← เปลี่ยนจาก hidden
//   text-overflow: unset;       // ← ลบ ellipsis
//   text-align: center;         // ← จัดกึ่งกลาง
//   line-height: 1.5;           // ← ให้อ่านง่ายเวลาขึ้นหลายบรรทัด
// }

.success-sender-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  color: #7b7ba8;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 4px;
}

.success-dept {
  opacity: 0.75;
}

.success-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(45, 45, 138, 0.3);
  transition:
    transform 0.18s,
    box-shadow 0.18s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(45, 45, 138, 0.4);
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
