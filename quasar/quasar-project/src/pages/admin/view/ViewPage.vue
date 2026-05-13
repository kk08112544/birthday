<template>
  <q-page class="view-festival-page">
    <!-- ===== HERO HEADER ===== -->
    <div class="hero-header">
      <div class="hero-orb hero-orb-1" />
      <div class="hero-orb hero-orb-2" />
      <div class="hero-orb hero-orb-3" />
      <div class="hero-content">
        <div class="hero-icon">🎊</div>
        <h1 class="hero-title">รายละเอียดเทศกาล</h1>
        <p class="hero-sub">รายละเอียดเทศกาลสุดพิเศษที่ผู้คนได้อวยพรกัน</p>
      </div>
    </div>

    <!-- ===== FORM ===== -->
    <div class="form-body">
      <div class="form-container">
        <!-- ===== CARD: COVER IMAGE & NAME ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.05s">
          <div class="card-label">
            <span class="label-dot" />
            ข้อมูลเทศกาล
          </div>
          <div ref="coverRef" class="field-group">
            <div class="cover-upload-zone">
              <q-img
                v-if="imageFile || existingImageUrl"
                :src="imageFile ? getFilePreview(imageFile) : existingImageUrl"
                class="cover-img"
                fit="contain"
                :ratio="16 / 9"
              />
            </div>
          </div>

          <div ref="nameRef" class="q-mt-md field-group">
            <q-input outlined v-model="festivalName" dense autofocus class="custom-input" readonly>
              <template v-slot:prepend>
                <q-icon name="festival" color="deep-orange-5" />
              </template>
            </q-input>
          </div>

          <!-- LOGO UPLOAD -->
          <div ref="logoRef" class="q-mt-md field-group">
            <div class="logo-upload-zone">
              <q-img
                v-if="logoFile"
                :src="getFilePreview(logoFile)"
                class="logo-preview"
                :ratio="1"
                fit="contain"
              />
            </div>
          </div>

          <div ref="webNameRef" class="q-mt-md field-group">
            <q-input v-model="webName" outlined dense class="custom-input" readonly>
              <template v-slot:prepend>
                <q-icon name="language" color="deep-orange-5" />
              </template>
            </q-input>
          </div>

          <!-- ===== DATE RANGE SECTION ===== -->
          <div ref="dateRef" class="q-mt-lg field-group">
            <div class="date-section-header">
              <div class="date-section-icon">
                <q-icon name="date_range" size="18px" color="white" />
              </div>
              <div>
                <div class="date-section-title">ช่วงเวลาของเทศกาล</div>
                <div class="date-section-sub">กำหนดวันเริ่มต้นและวันสิ้นสุด</div>
              </div>
            </div>

            <!-- Date summary chips -->
            <div class="date-summary-row">
              <div
                class="date-chip"
                :class="{
                  'date-chip--active': startDate,
                  'date-chip--error': dateError && !startDate,
                }"
              >
                <div class="date-chip-icon">
                  <q-icon name="play_circle" size="14px" />
                </div>
                <div class="date-chip-body">
                  <div class="date-chip-label">วันเริ่มต้น</div>
                  <div class="date-chip-value">
                    {{ startDate ? formatDateThai(startDate) : 'ยังไม่ได้เลือก' }}
                  </div>
                </div>
              </div>

              <div class="date-range-arrow">
                <q-icon name="arrow_forward" size="16px" />
              </div>

              <div
                class="date-chip"
                :class="{
                  'date-chip--active': endDate,
                  'date-chip--error': dateError && !endDate,
                  'date-chip--end': true,
                }"
              >
                <div class="date-chip-icon date-chip-icon--end">
                  <q-icon name="stop_circle" size="14px" />
                </div>
                <div class="date-chip-body">
                  <div class="date-chip-label">วันสิ้นสุด</div>
                  <div class="date-chip-value">
                    {{ endDate ? formatDateThai(endDate) : 'ยังไม่ได้เลือก' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Duration badge -->
            <transition name="duration-fade">
              <div v-if="startDate && endDate && durationDays >= 0" class="duration-badge">
                <q-icon name="schedule" size="14px" />
                ระยะเวลา {{ durationDays + 1 }} วัน
                <span v-if="durationDays === 0">· วันเดียว</span>
              </div>
            </transition>

            <!-- Error -->
            <transition name="err-fade">
              <div v-if="dateError" class="error-msg q-mt-xs">
                <q-icon name="error_outline" size="14px" />
                {{ dateErrorMsg }}
              </div>
            </transition>

            <!-- Calendar grid -->
            <div class="calendars-wrap">
              <!-- START DATE -->
              <div class="calendar-block">
                <div class="calendar-block-label calendar-block-label--start">
                  <div class="cal-label-dot cal-label-dot--start" />
                  <span>วันเริ่มต้น</span>
                  <span v-if="startDate" class="cal-label-date">{{
                    formatDateThai(startDate)
                  }}</span>
                </div>

                <div class="cal-wrapper cal-wrapper--start cal-readonly">
                  <q-date
                    v-model="startDate"
                    :options="startDateOptions"
                    color="indigo-6"
                    text-color="white"
                    flat
                    minimal
                    class="fest-calendar"
                  />
                </div>
              </div>

              <!-- END DATE -->
              <div class="calendar-block">
                <div class="calendar-block-label calendar-block-label--end">
                  <div class="cal-label-dot cal-label-dot--end" />
                  <span>วันสิ้นสุด</span>
                  <span v-if="endDate" class="cal-label-date">{{ formatDateThai(endDate) }}</span>
                </div>
                <!-- <div class="cal-wrapper cal-wrapper--end">
                  <q-date
                    v-model="endDate"
                    :options="endDateOptions"
                    color="teal-6"
                    text-color="white"
                    flat
                    minimal
                    disable
                    class="fest-calendar"
                    @update:model-value="onEndDateChange"
                  />
                </div> -->
                <!-- <div class="cal-wrapper cal-wrapper--end" >
  <q-date
    v-model="endDate"
    :options="endDateOptions"
    color="teal-6"
    text-color="white"
    flat
    minimal
    class="fest-calendar"
    @update:model-value="onEndDateChange"
  />
</div> -->
                <div class="cal-wrapper cal-wrapper--end cal-readonly">
                  <q-date
                    v-model="endDate"
                    :options="endDateOptions"
                    color="teal-6"
                    text-color="white"
                    flat
                    minimal
                    class="fest-calendar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== CARD: WISHES ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.12s">
          <div class="card-label">
            <span class="label-dot label-dot--amber" />
            คำอวยพร
          </div>

          <div class="card-header-row">
            <div class="card-header-info">
              <span class="card-header-count">{{ wishWordList.length }}</span>
              <span class="card-header-unit">รายการ</span>
            </div>
          </div>

          <transition-group name="wish-list" tag="div" class="wish-list-wrapper">
            <div
              v-for="(wish, i) in wishWordList"
              :key="(wish.wId ?? 'new') + '-' + i"
              class="wish-item"
            >
              <div class="wish-number">{{ i + 1 }}</div>
              <div class="wish-text">{{ wish.wishWord }}</div>
              <div class="wish-actions">
                <button class="wish-btn wish-btn--view" type="button" @click="viewWish(i)">
                  <q-icon name="visibility" size="16px" />
                </button>
              </div>
            </div>
          </transition-group>

          <div v-if="wishWordList.length === 0" class="empty-state">
            <div class="empty-state-icon">💬</div>
            <div class="empty-state-text">ยังไม่มีคำอวยพร</div>
            <div class="empty-state-sub">เพิ่มคำอวยพรเพื่อให้ผู้ใช้เลือกส่งให้กัน</div>
          </div>
        </div>

        <!-- ===== CARD: GREETING CARDS ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.19s">
          <div class="card-label">
            <span class="label-dot label-dot--teal" />
            การ์ดอวยพร
          </div>

          <div class="card-header-row">
            <div class="card-header-info">
              <span class="card-header-count">{{
                existingCards.length + cardFileList.length
              }}</span>
              <span class="card-header-unit">รูป</span>
            </div>
          </div>

          <div v-if="existingCards.length > 0 || cardFileList.length > 0" class="card-grid">
            <div v-for="card in existingCards" :key="'existing-' + card.cId" class="card-thumb">
              <q-img :src="card.previewUrl" ratio="1" fit="contain" class="card-thumb-img" />
            </div>
            <div v-for="(file, i) in cardFileList" :key="'new-' + i" class="card-thumb">
              <q-img :src="getFilePreview(file)" ratio="1" fit="contain" class="card-thumb-img" />
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-state-icon">🃏</div>
            <div class="empty-state-text">ยังไม่มีการ์ด</div>
            <div class="empty-state-sub">อัปโหลดรูปสวยๆ เพื่อใช้เป็นการ์ดอวยพร</div>
          </div>
        </div>

        <!-- ===== SUBMIT ===== -->
        <div class="animate-in" style="animation-delay: 0.25s">
          <button
            type="button"
            class="submit-btn"
            :class="{ loading }"
            :disabled="loading"
            @click="router.push('/admin/festival')"
          >
            <span v-if="!loading" class="submit-btn-inner">
              <q-icon name="chevron_left" size="20px" />
              กลับไปหน้าเทศกาล
            </span>
            <span v-else class="submit-btn-inner">
              <q-circular-progress indeterminate size="20px" color="white" />
              กำลังบันทึก...
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== DIALOG: VIEW WISH ===== -->
    <q-dialog v-model="ViewWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="custom-dialog-header">
          <span>💬 คำอวยพร</span>
          <button class="dialog-close" type="button" @click="ViewWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="custom-dialog-body">
          <div class="view-wish-number">รายการที่ {{ viewingIndex + 1 }}</div>
          <div class="view-wish-text">{{ viewingWishText }}</div>
        </div>
        <div class="custom-dialog-footer">
          <button
            type="button"
            class="dialog-btn dialog-btn--confirm"
            @click="ViewWishDialog = false"
          >
            ปิด
          </button>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter, useRoute } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

/* ===== TYPES ===== */
interface WishItem {
  wId?: number;
  wishWord: string;
}

interface ExistingCard {
  cId: number;
  imageName: string;
  previewUrl: string;
}

interface WisherApi {
  wId: number;
  wishWord: string;
}

interface CardApi {
  cId: number;
  imageCard: string;
}

interface FestivalData {
  festivalName: string;
  image: string;
  logo: string;
  webName: string;
  startDate?: string;
  endDate?: string;
  wisher?: WisherApi[];
  card?: CardApi[];
}

/* ===== STATE ===== */
const festivalId = ref<string | null>(null);
const festivalName = ref('');
const imageFile = ref<File | null>(null);
const logoFile = ref<File | null>(null);
const webName = ref('');
const existingImageUrl = ref<string>('');
const existingImageName = ref<string>('');
const loading = ref(false);

/* ===== DATE STATE ===== */
const startDate = ref('');
const endDate = ref('');
const dateError = ref(false);
const dateErrorMsg = ref('');

const durationDays = computed(() => {
  if (!startDate.value || !endDate.value) return -1;
  const s = new Date(startDate.value.replace(/\//g, '-'));
  const e = new Date(endDate.value.replace(/\//g, '-'));
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
});

const formatDateThai = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(/\//g, '-'));
  const months = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

const todayStr = (() => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
})();

const startDateOptions = (dateStr: string): boolean => {
  if (dateStr === startDate.value) return true; // ← เช็คก่อน
  if (dateStr < todayStr) return false;
  if (!endDate.value) return true;
  return dateStr <= endDate.value;
};

const endDateOptions = (dateStr: string): boolean => {
  if (dateStr === endDate.value) return true; // ← เช็คก่อน
  if (dateStr < todayStr) return false;
  if (!startDate.value) return true;
  return dateStr >= startDate.value;
};

/* ===== DIALOG STATE ===== */
const showFetchErrorDialog = ref(false);

/* ===== WISH LIST ===== */
const wishWordList = ref<WishItem[]>([]);

/* ===== VIEW WISH DIALOG ===== */
const ViewWishDialog = ref(false);
const viewingIndex = ref<number>(0);
const viewingWishText = ref<string>('');

const viewWish = (index: number) => {
  const wish = wishWordList.value[index];
  if (!wish) return;
  viewingIndex.value = index;
  viewingWishText.value = wish.wishWord;
  ViewWishDialog.value = true;
};

/* ===== CARDS ===== */
const cardFileList = ref<File[]>([]);
const existingCards = ref<ExistingCard[]>([]);

/* ===== API: ดึง image เป็น blob url ===== */
const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

/* ===== API: ดึงข้อมูล festival ===== */
const fetchFestivalId = async (id: string) => {
  $q.loading.show();
  festivalId.value = id;
  try {
    const response = await api.get(`/festival/${Number(id)}`);
    const data: FestivalData = response.data.festival;

    festivalName.value = data.festivalName;
    webName.value = data.webName;
    // if (data.startDate) startDate.value = data.startDate.replace(/-/g, '/');
    // if (data.endDate) endDate.value = data.endDate.replace(/-/g, '/');
    if (data.startDate) startDate.value = data.startDate.substring(0, 10).replace(/-/g, '/');
    if (data.endDate) endDate.value = data.endDate.substring(0, 10).replace(/-/g, '/');
    console.log(
      'startDate:',
      startDate.value,
      '| todayStr:',
      todayStr,
      '| เท่ากัน?',
      startDate.value === todayStr,
      '| น้อยกว่า today?',
      startDate.value < todayStr,
    );
    if (data.image) {
      existingImageName.value = data.image;
      existingImageUrl.value = await getImageUrl(data.image);
    }

    if (data.logo) {
      const logoUrl = await getImageUrl(data.logo);
      logoFile.value = await fetch(logoUrl)
        .then((res) => res.blob())
        .then((blob) => new File([blob], data.logo, { type: blob.type }));
    }

    wishWordList.value =
      data.wisher?.map(
        (w: WisherApi): WishItem => ({
          wId: w.wId,
          wishWord: w.wishWord,
        }),
      ) ?? [];

    if (data.card && data.card.length > 0) {
      const cardPromises = data.card.map(async (c: CardApi) => {
        const previewUrl = await getImageUrl(c.imageCard);
        return { cId: c.cId, imageName: c.imageCard, previewUrl };
      });
      existingCards.value = await Promise.all(cardPromises);
    }

    localStorage.setItem('festivalId', id);
  } catch (error) {
    console.error(error);
    showFetchErrorDialog.value = true;
  } finally {
    $q.loading.hide();
  }
};

/* ===== UTIL ===== */
const objectUrlCache = new WeakMap<File, string>();
const getFilePreview = (file: File): string => {
  if (objectUrlCache.has(file)) return objectUrlCache.get(file)!;
  const url = URL.createObjectURL(file);
  objectUrlCache.set(file, url);
  return url;
};

/* ===== CLICK PARTICLES ===== */
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

onMounted(async () => {
  const id = (route.params.id as string) || (route.query.id as string);
  if (id) await fetchFestivalId(id);
  window.addEventListener('click', handleGlobalClick);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap');

/* ===== TOKENS ===== */
$indigo-deep: #1a1460;
$indigo-mid: #2d2d8a;
$indigo-glow: #5a3ea0;
$gold: #f5a623;
$gold-light: #ffd166;
$coral: #ff6b6b;
$teal: #0d9488;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$amber: #d97706;
$amber-dark: #92400e;
$amber-soft: #fffbeb;
$surface: #ffffff;
$surface-2: #f7f5ff;
$text-main: #1a1460;
$text-muted: #8b87b0;
$radius-card: 20px;
$radius-btn: 12px;
$error-red: #e53935;

/* ===== PAGE ===== */
.view-festival-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(160deg, #f0edff 0%, #fff8ee 50%, #e8f9f6 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
}

/* ===== HERO ===== */
.hero-header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, $indigo-deep 0%, $indigo-mid 50%, #4a2080 100%);
  padding: 3rem 1.5rem 4.5rem;
  text-align: center;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}
.hero-orb-1 {
  width: 280px;
  height: 280px;
  background: $gold;
  top: -80px;
  right: -60px;
  animation: float 6s ease-in-out infinite;
}
.hero-orb-2 {
  width: 180px;
  height: 180px;
  background: $teal;
  bottom: -40px;
  left: -40px;
  animation: float 8s ease-in-out infinite reverse;
}
.hero-orb-3 {
  width: 120px;
  height: 120px;
  background: $gold-light;
  top: 20px;
  left: 30%;
  animation: float 5s ease-in-out infinite 1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-16px);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-icon {
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: 0.75rem;
  animation: pop 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes pop {
  0% {
    transform: scale(0.5);
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

.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.4rem;
  letter-spacing: -0.02em;
}
.hero-sub {
  font-size: clamp(0.85rem, 3vw, 1rem);
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* ===== FORM BODY ===== */
.form-body {
  margin-top: -2rem;
}
.form-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ===== CARDS ===== */
.fest-card {
  background: $surface;
  border-radius: $radius-card;
  padding: 1.5rem;
  box-shadow:
    0 4px 24px rgba(26, 20, 96, 0.08),
    0 1px 4px rgba(26, 20, 96, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.card-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: $text-muted;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}
.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $indigo-mid;
  flex-shrink: 0;
  &--amber {
    background: $gold;
  }
  &--teal {
    background: $teal;
  }
}

.field-group {
  scroll-margin-top: 80px;
}

/* ===== LOGO UPLOAD ===== */
.logo-upload-zone {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px dashed rgba(45, 45, 138, 0.25);
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
  background: $surface-2;
  max-width: 140px;
  &:hover {
    border-color: $indigo-mid;
    transform: translateY(-2px);
  }
}

.logo-preview {
  border-radius: 10px;
}

.logo-placeholder {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

.logo-placeholder-icon {
  font-size: 2rem;
}

.upload-zone--error {
  border-color: $error-red !important;
  border-style: solid !important;
  background: #fff5f5 !important;
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 5px;
  color: $error-red;
  font-size: 0.78rem;
  font-weight: 500;
  margin-top: 6px;
  padding: 0 2px;
}

/* ===== COVER UPLOAD ===== */
.cover-upload-zone {
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 2px dashed rgba(45, 45, 138, 0.25);
  transition:
    border-color 0.2s,
    transform 0.2s;
  background: $surface-2;
  &:hover {
    border-color: $indigo-mid;
    transform: translateY(-2px);
  }
}
.cover-img {
  border-radius: 12px;
}
.cover-placeholder {
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.cover-placeholder-icon {
  font-size: 2.5rem;
}
.cover-placeholder-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: $text-main;
}
.cover-placeholder-sub {
  font-size: 0.78rem;
  color: $text-muted;
}

/* ===== INPUT ===== */
.custom-input :deep(.q-field__control) {
  border-radius: 12px !important;
}

/* ===== DATE SECTION ===== */
.date-section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.1rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: linear-gradient(135deg, $indigo-deep, $indigo-mid 55%, $indigo-glow);
  box-shadow: 0 6px 24px rgba(45, 45, 138, 0.28);
}
.date-section-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.date-section-title {
  font-family: 'Prompt', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.date-section-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 2px;
}

.date-summary-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
}
.date-chip {
  flex: 1;
  min-width: 130px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  background: rgba(26, 20, 96, 0.04);
  border: 1.5px dashed rgba(45, 45, 138, 0.2);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  &--active {
    background: rgba(45, 45, 138, 0.06);
    border-style: solid;
    border-color: $indigo-mid;
    box-shadow: 0 4px 16px rgba(45, 45, 138, 0.12);
    .date-chip-value {
      color: $indigo-deep;
      font-weight: 700;
    }
  }
  &--error {
    border-color: $error-red !important;
    background: #fff5f5 !important;
  }
}
.date-chip-icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  flex-shrink: 0;
  background: linear-gradient(135deg, $indigo-mid, $indigo-glow);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(45, 45, 138, 0.28);
  &--end {
    background: linear-gradient(135deg, #065f46, $teal);
  }
}
.date-chip-body {
  flex: 1;
  min-width: 0;
}
.date-chip-label {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 1px;
}
.date-chip-value {
  font-size: 0.82rem;
  color: $text-muted;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.date-range-arrow {
  color: $text-muted;
  flex-shrink: 0;
  @media (max-width: 480px) {
    transform: rotate(90deg);
    align-self: center;
  }
}

.duration-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 100px;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(13, 148, 136, 0.06));
  border: 1px solid rgba(13, 148, 136, 0.2);
  color: $teal;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.duration-fade-enter-active,
.duration-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.duration-fade-enter-from,
.duration-fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.calendars-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.85rem;
  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
}

.calendar-block {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.calendar-block-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  &--start {
    color: $indigo-mid;
    background: rgba(45, 45, 138, 0.07);
  }
  &--end {
    color: $teal;
    background: rgba(13, 148, 136, 0.08);
  }
}
.cal-label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  &--start {
    background: $indigo-mid;
  }
  &--end {
    background: $teal;
  }
}
.cal-label-date {
  margin-left: auto;
  font-weight: 600;
  font-size: 0.72rem;
  .calendar-block-label--start & {
    color: $indigo-mid;
  }
  .calendar-block-label--end & {
    color: $teal;
  }
}

.cal-wrapper {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(26, 20, 96, 0.1);
  transition: box-shadow 0.25s;
  &:hover {
    box-shadow: 0 8px 32px rgba(26, 20, 96, 0.16);
  }
  &--start {
    border: 2px solid rgba(45, 45, 138, 0.18);
  }
  &--end {
    border: 2px solid rgba(13, 148, 136, 0.18);
  }
}

.cal-readonly {
  pointer-events: none;
  opacity: 0.75;
}

.fest-calendar {
  width: 100% !important;
  border-radius: 16px !important;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif !important;

  :deep(.q-date__header) {
    border-radius: 16px 16px 0 0 !important;
    padding: 0.85rem 1rem !important;
  }
  :deep(.q-date__header-title-label) {
    font-family: 'Prompt', sans-serif !important;
    font-weight: 700 !important;
    font-size: 1rem !important;
  }
  :deep(.q-date__navigation) {
    padding: 0.3rem 0.5rem !important;
  }
  :deep(.q-date__calendar-weekdays > div) {
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    color: $text-muted !important;
    opacity: 1 !important;
  }
  :deep(.q-date__calendar-item--out) {
    opacity: 0.3 !important;
  }
  :deep(.q-btn.q-date__today .q-btn__content) {
    font-weight: 800 !important;
    text-decoration: underline !important;
    text-underline-offset: 3px !important;
  }
  :deep(.q-date__calendar-item--selected .q-btn) {
    font-weight: 700 !important;
  }
}

/* ===== CARD HEADER ROW ===== */
.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.card-header-info {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.card-header-count {
  font-family: 'Prompt', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: $indigo-mid;
  line-height: 1;
}
.card-header-unit {
  font-size: 0.85rem;
  color: $text-muted;
}
.add-btn {
  border-radius: $radius-btn !important;
  font-weight: 600 !important;
  font-family: 'Noto Sans Thai', sans-serif !important;
  letter-spacing: 0 !important;
}

/* ===== WISH LIST ===== */
.wish-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.wish-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: $surface-2;
  border-radius: 12px;
  border: 1px solid rgba(45, 45, 138, 0.08);
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(45, 45, 138, 0.1);
    transform: translateX(2px);
  }
}
.wish-number {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wish-text {
  flex: 1;
  font-size: 0.92rem;
  color: $text-main;
  font-weight: 500;
  line-height: 1.5;
}
.wish-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.wish-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    transform 0.1s;
  &:active {
    transform: scale(0.92);
  }
  &--view {
    background: rgba(45, 45, 138, 0.08);
    color: $indigo-mid;
    &:hover {
      background: rgba(45, 45, 138, 0.18);
    }
  }
  &--edit {
    background: rgba(245, 166, 35, 0.1);
    color: #c47a00;
    &:hover {
      background: rgba(245, 166, 35, 0.2);
    }
  }
  &--delete {
    background: rgba(255, 107, 107, 0.1);
    color: $coral;
    &:hover {
      background: rgba(255, 107, 107, 0.2);
    }
  }
}

.wish-list-enter-active,
.wish-list-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
.wish-list-enter-from {
  opacity: 0;
  transform: translateX(-16px);
}
.wish-list-leave-to {
  opacity: 0;
  transform: translateX(16px) scale(0.95);
}

/* ===== VIEW WISH DIALOG CONTENT ===== */
.view-wish-number {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 10px;
}

.view-wish-text {
  font-size: 1rem;
  font-weight: 600;
  color: $text-main;
  background: $surface-2;
  border-radius: 12px;
  padding: 14px 16px;
  line-height: 1.7;
  border: 1px solid rgba(45, 45, 138, 0.08);
}

/* ===== CARD GRID ===== */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
.card-thumb {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
}
.card-thumb-img {
  display: block;
  border-radius: 12px;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 1.5rem 1rem;
}
.empty-state-icon {
  font-size: 2rem;
  margin-bottom: 6px;
}
.empty-state-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: $text-main;
  margin-bottom: 4px;
}
.empty-state-sub {
  font-size: 0.78rem;
  color: $text-muted;
}

/* ===== SUBMIT BUTTON ===== */
.submit-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(220, 38, 38, 0.35);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    opacity 0.2s;
  letter-spacing: 0.01em;
  &:hover:not(.loading):not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(220, 38, 38, 0.45);
  }
  &:active:not(.loading) {
    transform: translateY(0);
  }
  &.loading,
  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
}
.submit-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* ===== DIALOGS ===== */
.custom-dialog {
  background: $surface;
  border-radius: 20px;
  overflow: hidden;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(26, 20, 96, 0.2);
  &--mobile {
    border-radius: 20px 20px 0 0;
    max-width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.custom-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem 0.9rem;
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: $text-main;
  border-bottom: 1px solid rgba(45, 45, 138, 0.07);
  background: $surface-2;
  &--danger {
    background: #fff1f1;
  }
}
.dialog-close {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: rgba(45, 45, 138, 0.07);
  color: $text-muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover {
    background: rgba(45, 45, 138, 0.14);
  }
}
.custom-dialog-body {
  padding: 1.25rem;
}
.custom-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0.75rem 1.25rem 1.25rem;
}

.dialog-btn {
  padding: 9px 22px;
  border-radius: 10px;
  border: none;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.1s,
    background 0.15s;
  &:active {
    transform: scale(0.96);
  }
  &--cancel {
    background: rgba(45, 45, 138, 0.07);
    color: $text-muted;
    &:hover {
      background: rgba(45, 45, 138, 0.12);
    }
  }
  &--confirm {
    background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
    color: white;
    box-shadow: 0 3px 12px rgba(45, 45, 138, 0.3);
    &:hover {
      box-shadow: 0 5px 16px rgba(45, 45, 138, 0.4);
    }
  }
  &--danger {
    background: linear-gradient(135deg, #e53935, #c62828);
    color: white;
    box-shadow: 0 3px 12px rgba(229, 57, 53, 0.3);
  }
}

/* ===== ANIMATIONS ===== */
.animate-in {
  animation: slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 599px) {
  .fest-card {
    padding: 1.1rem;
  }
  .hero-header {
    padding: 2.25rem 1rem 3.5rem;
  }
  .form-container {
    padding: 0 0.75rem 1rem;
    gap: 1rem;
  }
  .card-header-count {
    font-size: 1.6rem;
  }
  .wish-text {
    max-width: 160px;
  }
}

/* ===== CLICK PARTICLES ===== */
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
