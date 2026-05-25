<template>
  <q-page class="view-festival-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="visibility" size="1.8rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">รายละเอียดเทศกาล</h1>
            <p class="hero-sub">รายละเอียดเทศกาลสุดพิเศษที่ผู้คนได้อวยพรกัน</p>
          </div>
        </div>
        <q-btn
          unelevated
          icon="arrow_back"
          label="กลับรายการ"
          to="/backoffice/festival"
          class="hero-back-btn"
          :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
        />
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <div class="form-container">
        <!-- ===== CARD: ข้อมูลเทศกาล ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.05s">
          <div class="card-label">
            <span class="label-dot" />
            ข้อมูลเทศกาล
          </div>

          <!-- COVER IMAGE -->
          <div class="field-group">
            <div class="cover-view-zone">
              <!-- <q-img
                v-if="existingImageUrl"
                :src="existingImageUrl"
                class="cover-img"
                fit="contain"
                :ratio="16 / 9"
              /> -->
              <div
                v-if="existingImageUrl"
                class="cover-img"
                :style="{ backgroundImage: `url(${existingImageUrl})` }"
              />
              <div v-else class="cover-placeholder">
                <div class="cover-placeholder-icon">🖼️</div>
                <div class="cover-placeholder-text">ไม่มีรูปหน้าปก</div>
              </div>
            </div>
          </div>

          <!-- FESTIVAL NAME -->
          <div class="q-mt-md field-group">
            <q-input
              outlined
              v-model="festivalName"
              label="ชื่อเทศกาล"
              dense
              readonly
              class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="festival" color="deep-orange-5" />
              </template>
            </q-input>
          </div>

          <!-- LOGO -->
          <div class="q-mt-md field-group">
            <div class="logo-row">
              <div class="logo-view-zone">
                <q-img
                  v-if="logoFile"
                  :src="getFilePreview(logoFile)"
                  class="logo-preview"
                  :ratio="1"
                  fit="contain"
                />
                <div v-else class="logo-placeholder">
                  <div class="logo-placeholder-icon">🏷️</div>
                  <div class="cover-placeholder-text">ไม่มี Logo</div>
                </div>
              </div>
              <div class="logo-hint">
                <div class="logo-hint-title">Logo เทศกาล</div>
                <div class="logo-hint-sub">รูป Logo ที่ใช้แสดงในหน้าเทศกาล</div>
              </div>
            </div>
          </div>

          <!-- WEB NAME -->
          <div class="q-mt-md field-group">
            <q-input
              v-model="webName"
              label="ชื่อเว็บไซต์ (URL slug)"
              outlined
              dense
              readonly
              class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="language" color="deep-orange-5" />
              </template>
            </q-input>
          </div>
        </div>

        <!-- ===== CARD: ช่วงเวลา ===== -->
        <div class="fest-card animate-in field-group" style="animation-delay: 0.1s">
          <div class="card-label">
            <span class="label-dot label-dot--teal" />
            ช่วงเวลาของเทศกาล
          </div>

          <!-- Date summary chips -->
          <div class="date-summary-row">
            <div class="date-chip" :class="{ 'date-chip--active': startDate }">
              <div class="date-chip-icon">
                <q-icon name="play_circle" size="14px" />
              </div>
              <div class="date-chip-body">
                <div class="date-chip-label">วันเริ่มต้น</div>
                <div class="date-chip-value">
                  {{ startDate ? formatDateThai(startDate) : 'ไม่ได้กำหนด' }}
                </div>
              </div>
            </div>

            <div class="date-range-arrow">
              <q-icon name="arrow_forward" size="16px" />
            </div>

            <div class="date-chip date-chip--end" :class="{ 'date-chip--active': endDate }">
              <div class="date-chip-icon date-chip-icon--end">
                <q-icon name="stop_circle" size="14px" />
              </div>
              <div class="date-chip-body">
                <div class="date-chip-label">วันสิ้นสุด</div>
                <div class="date-chip-value">
                  {{ endDate ? formatDateThai(endDate) : 'ไม่ได้กำหนด' }}
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

          <!-- Calendars grid -->
          <div class="calendars-wrap">
            <div class="calendar-block">
              <div class="calendar-block-label calendar-block-label--start">
                <div class="cal-label-dot cal-label-dot--start" />
                <span>วันเริ่มต้น</span>
                <span v-if="startDate" class="cal-label-date">{{ formatDateThai(startDate) }}</span>
              </div>
              <div class="cal-wrapper cal-wrapper--start cal-readonly">
                <q-date
                  v-model="startDate"
                  :options="startDateOptions"
                  color="deep-orange-5"
                  text-color="white"
                  flat
                  minimal
                  class="fest-calendar"
                />
              </div>
            </div>

            <div class="calendar-block">
              <div class="calendar-block-label calendar-block-label--end">
                <div class="cal-label-dot cal-label-dot--end" />
                <span>วันสิ้นสุด</span>
                <span v-if="endDate" class="cal-label-date">{{ formatDateThai(endDate) }}</span>
              </div>
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

        <!-- ===== CARD: คำอวยพร ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.15s">
          <div class="card-label">
            <span class="label-dot label-dot--amber" />
            คำอวยพร
          </div>
          <div class="card-header-row">
            <div class="stat-chip">
              <q-icon name="format_quote" size="17px" color="deep-orange-5" />
              <span class="stat-num">{{ wishWordList.length }}</span>
              <span class="stat-label">รายการ</span>
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
                  <q-icon name="visibility" size="15px" />
                </button>
              </div>
            </div>
          </transition-group>

          <div v-if="wishWordList.length === 0" class="empty-state">
            <div class="empty-icon">💬</div>
            <div class="empty-title">ยังไม่มีคำอวยพร</div>
            <div class="empty-sub">ยังไม่มีคำอวยพรในเทศกาลนี้</div>
          </div>
        </div>

        <!-- ===== CARD: การ์ดอวยพร ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.2s">
          <div class="card-label">
            <span class="label-dot label-dot--teal" />
            การ์ดอวยพร
          </div>
          <div class="card-header-row">
            <div class="stat-chip">
              <q-icon name="photo_library" size="17px" color="teal-6" />
              <span class="stat-num">{{ existingCards.length }}</span>
              <span class="stat-label">รูป</span>
            </div>
          </div>

          <div v-if="existingCards.length > 0" class="card-grid">
            <div v-for="card in existingCards" :key="'existing-' + card.cId" class="card-thumb">
              <q-img :src="card.previewUrl" ratio="1" fit="contain" class="card-thumb-img" />
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">🃏</div>
            <div class="empty-title">ยังไม่มีการ์ด</div>
            <div class="empty-sub">ยังไม่มีการ์ดอวยพรในเทศกาลนี้</div>
          </div>
        </div>

        <!-- ===== BACK BUTTON ===== -->
        <div class="animate-in" style="animation-delay: 0.25s">
          <button type="button" class="submit-btn" @click="router.push('/backoffice/festival')">
            <span class="submit-btn-inner">
              <q-icon name="arrow_back" size="20px" />
              กลับไปหน้าเทศกาล
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== DIALOG: ดูคำอวยพร ===== -->
    <q-dialog v-model="viewWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="dialog-header">
          <div class="dialog-header-icon dialog-header-icon--orange">
            <q-icon name="format_quote" color="white" size="18px" />
          </div>
          <span>คำอวยพร</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="viewWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <div class="view-wish-number">รายการที่ {{ viewingIndex + 1 }}</div>
          <div class="view-wish-text">{{ viewingWishText }}</div>
        </div>
        <div class="dialog-footer">
          <button type="button" class="dlg-btn dlg-btn--confirm" @click="viewWishDialog = false">
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
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter, useRoute } from 'vue-router';

// ─── Types ────────────────────────────────────────────────────────────────────
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

interface Particle {
  id: number;
  style: Record<string, string>;
}

type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

// ─── Quasar / Router ──────────────────────────────────────────────────────────
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

// ─── Festival State ───────────────────────────────────────────────────────────
const festivalName = ref('');
const logoFile = ref<File | null>(null);
const webName = ref('');
const existingImageUrl = ref('');

// ─── Date State ───────────────────────────────────────────────────────────────
const startDate = ref('');
const endDate = ref('');

// const todayStr = (() => {
//   const d = new Date();
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${y}/${m}/${day}`;
// })();

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

// readonly — แสดงเฉพาะวันที่ถูกเลือก
const startDateOptions = (dateStr: string): boolean => dateStr === startDate.value;
const endDateOptions = (dateStr: string): boolean => dateStr === endDate.value;

// ─── Wish State ───────────────────────────────────────────────────────────────
const wishWordList = ref<WishItem[]>([]);
const viewWishDialog = ref(false);
const viewingIndex = ref(0);
const viewingWishText = ref('');

const viewWish = (i: number) => {
  const wish = wishWordList.value[i];
  if (!wish) return;
  viewingIndex.value = i;
  viewingWishText.value = wish.wishWord;
  viewWishDialog.value = true;
};

// ─── Card State ───────────────────────────────────────────────────────────────
const existingCards = ref<ExistingCard[]>([]);

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const objectUrlCache = new WeakMap<File, string>();

const getFilePreview = (file: File): string => {
  if (objectUrlCache.has(file)) return objectUrlCache.get(file)!;
  const url = URL.createObjectURL(file);
  objectUrlCache.set(file, url);
  return url;
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

// ─── Fetch Festival ───────────────────────────────────────────────────────────
const fetchFestival = async (id: string): Promise<void> => {
  $q.loading.show();
  try {
    const response = await api.get(`/backoffice/festival/${Number(id)}`);
    const data: FestivalData = response.data.festival;

    festivalName.value = data.festivalName;
    webName.value = data.webName;

    if (data.startDate) startDate.value = data.startDate.substring(0, 10).replace(/-/g, '/');
    if (data.endDate) endDate.value = data.endDate.substring(0, 10).replace(/-/g, '/');

    if (data.image) existingImageUrl.value = await getImageUrl(data.image);

    if (data.logo) {
      const logoUrl = await getImageUrl(data.logo);
      logoFile.value = await fetch(logoUrl)
        .then((res) => res.blob())
        .then((blob) => new File([blob], data.logo, { type: blob.type }));
    }

    wishWordList.value =
      data.wisher?.map((w): WishItem => ({ wId: w.wId, wishWord: w.wishWord })) ?? [];

    if (data.card?.length) {
      existingCards.value = await Promise.all(
        data.card.map(
          async (c): Promise<ExistingCard> => ({
            cId: c.cId,
            imageName: c.imageCard,
            previewUrl: await getImageUrl(c.imageCard),
          }),
        ),
      );
    }
  } catch {
    $q.notify({
      color: 'negative',
      message: 'ไม่สามารถโหลดข้อมูลได้',
      icon: 'warning',
      position: 'top',
    });
  } finally {
    $q.loading.hide();
  }
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
onMounted(async () => {
  const id = (route.params.id as string) || (route.query.id as string);
  if (id) await fetchFestival(id);
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens (เหมือน edit/create/list page) ────────────────────────────
$orange: #ea580c;
$orange-mid: #f97316;
$orange-soft: #fff7ed;
$gold: #f59e0b;
$teal: #0d9488;
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
.view-festival-page {
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
  max-width: 780px;
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
// .content-wrap {
//   max-width: 780px;
//   margin: -2rem auto 0;
//   padding: 0 1rem 4rem;
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

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

// ─── Festival Card ────────────────────────────────────────────────────────────
.fest-card {
  background: $surface;
  border-radius: $radius;
  padding: 1.5rem;
  box-shadow:
    0 3px 20px rgba(234, 88, 12, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(249, 115, 22, 0.1);
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
  background: $orange;
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

// ─── Stat Chip ────────────────────────────────────────────────────────────────
.stat-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  background: $surface-2;
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

// ─── Card Header Row ──────────────────────────────────────────────────────────
.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

// ─── Cover View (readonly) ────────────────────────────────────────────────────
.cover-view-zone {
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid rgba(234, 88, 12, 0.15);
  background: $surface-2;
}

// .cover-img {
//   display: block;
// }
.cover-img {
  width: 100%;
  aspect-ratio: 2188 / 417; // ← สัดส่วนถูกต้อง ไม่ตายตัว
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: $surface-2;
  position: relative;
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

// ─── Logo View (readonly) ─────────────────────────────────────────────────────
.logo-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-view-zone {
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(234, 88, 12, 0.15);
  background: $surface-2;
  width: 130px;
  flex-shrink: 0;
}

.logo-preview {
  border-radius: 10px;
}

.logo-placeholder {
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
}

.logo-placeholder-icon {
  font-size: 1.8rem;
}

.logo-hint-title {
  font-family: 'Prompt', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: $text-main;
  margin-bottom: 4px;
}

.logo-hint-sub {
  font-size: 0.76rem;
  color: $text-muted;
  line-height: 1.6;
}

// ─── Custom Input (readonly) ──────────────────────────────────────────────────
.custom-input :deep(.q-field__control) {
  border-radius: 12px !important;
}

// ─── Date Section ─────────────────────────────────────────────────────────────
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
  background: rgba(234, 88, 12, 0.03);
  border: 1.5px dashed rgba(234, 88, 12, 0.2);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  &--active {
    background: rgba(234, 88, 12, 0.05);
    border-style: solid;
    border-color: $orange;
    box-shadow: 0 4px 16px rgba(234, 88, 12, 0.12);
    .date-chip-value {
      color: $text-main;
      font-weight: 700;
    }
  }
}

.date-chip-icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #7c2d12, $orange);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(234, 88, 12, 0.28);

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
  background: rgba(13, 148, 136, 0.08);
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
    color: $orange;
    background: rgba(234, 88, 12, 0.07);
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
    background: $orange;
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
    color: $orange;
  }
  .calendar-block-label--end & {
    color: $teal;
  }
}

.cal-wrapper {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(234, 88, 12, 0.1);
  &--start {
    border: 2px solid rgba(234, 88, 12, 0.18);
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
  :deep(.q-date__calendar-weekdays > div) {
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    color: $text-muted !important;
    opacity: 1 !important;
  }
  :deep(.q-date__calendar-item--out) {
    opacity: 0.3 !important;
  }
}

// ─── Wish List ────────────────────────────────────────────────────────────────
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
  border: 1px solid rgba(249, 115, 22, 0.08);
  transition:
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(234, 88, 12, 0.1);
    transform: translateX(2px);
  }
}

.wish-number {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c2d12, $orange);
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
    background: rgba(234, 88, 12, 0.08);
    color: $orange;
    &:hover {
      background: rgba(234, 88, 12, 0.16);
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

// ─── Card Grid ────────────────────────────────────────────────────────────────
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(5, 1fr);
  }
}

.card-thumb {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.04);
  }
}

.card-thumb-img {
  display: block;
  border-radius: 12px;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  animation: pop 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
.empty-title {
  font-family: 'Prompt', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: $text-main;
}
.empty-sub {
  font-size: 0.78rem;
  color: $text-muted;
  margin-top: 4px;
  text-align: center;
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

// ─── Back Button ──────────────────────────────────────────────────────────────
.submit-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #7c2d12 0%, $orange 55%, $gold 100%);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(234, 88, 12, 0.35);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(234, 88, 12, 0.4);
  }
  &:active {
    transform: translateY(0);
  }
}

.submit-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

// ─── Animate In ───────────────────────────────────────────────────────────────
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

// ─── Dialog ───────────────────────────────────────────────────────────────────
.custom-dialog {
  background: $surface;
  border-radius: 20px;
  overflow: hidden;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(234, 88, 12, 0.16);

  &--mobile {
    border-radius: 20px 20px 0 0;
    max-width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
  border-bottom: 1px solid rgba(249, 115, 22, 0.08);
  background: $surface-2;
}

.dialog-header-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &--orange {
    background: linear-gradient(135deg, #7c2d12, $orange);
  }
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
    box-shadow 0.15s;

  &:active {
    transform: scale(0.96);
  }
  &--confirm {
    background: linear-gradient(135deg, #7c2d12, $orange);
    color: white;
    box-shadow: 0 3px 12px rgba(234, 88, 12, 0.3);
    &:hover {
      box-shadow: 0 5px 18px rgba(234, 88, 12, 0.4);
    }
  }
}

// ─── View Wish Content ────────────────────────────────────────────────────────
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
  border: 1px solid rgba(234, 88, 12, 0.08);
}

// ─── Responsive ───────────────────────────────────────────────────────────────
@media (max-width: 600px) {
  .page-hero {
    padding: 1.5rem 1rem 3.5rem;
  }
  .content-wrap {
    padding: 0 0.75rem 3rem;
  }
  .fest-card {
    padding: 1.1rem;
  }
  .hero-left {
    gap: 10px;
  }
  .hero-icon-wrap {
    width: 46px;
    height: 46px;
  }
  .logo-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .logo-view-zone {
    width: 110px;
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
