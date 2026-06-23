<template>
  <q-layout view="lhh LpR lf">
    <!-- ===== HEADER ===== -->
    <q-header class="festival-header">
      <q-toolbar class="festival-toolbar">
        <div class="header-emblem">
          <q-icon name="celebration" size="20px" color="white" />
        </div>

        <q-toolbar-title class="festival-title">
          <span class="festival-title-text">{{ festivalName || 'เทศกาลอวยพร' }}</span>
        </q-toolbar-title>
        <a
          href="/คู่มือระบบบริหารจัดการส่งคำอวยพรเนื่องในโอกาสต่างๆของกรมฯ-ผู้อวยพร.pdf"
          download="คู่มือการใช้งาน.pdf"
          target="_blank"
          class="footer-link"
        >
          <q-icon name="download" size="14px" class="q-mr-xs" />คู่มือการใช้งาน
        </a>
        <div class="header-dots gt-xs">
          <span class="dot dot-1" />
          <span class="dot dot-2" />
          <span class="dot dot-3" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- ===== BANNER ===== -->
    <div class="banner-section">
      <div class="banner-wrap">
        <br /><br /><br />
        <!-- :ratio="18 / 9" -->
        <q-img :src="image" class="banner-img" fit="cover" :ratio="2188 / 417">
          <template v-slot:loading>
            <div class="banner-loading">
              <div class="banner-loading-inner">
                <q-spinner-dots color="white" size="2rem" />
                <span>กำลังโหลด...</span>
              </div>
            </div>
          </template>
          <template v-slot:error>
            <div class="banner-error">
              <q-icon name="image_not_supported" size="3rem" color="white" class="q-mb-sm" />
              <span>ไม่สามารถโหลดรูปภาพได้</span>
            </div>
          </template>
          <div class="banner-overlay" />
        </q-img>
        <div class="banner-shimmer-bar" />
      </div>
    </div>

    <!-- ===== NAV BAR ===== -->
    <div class="nav-bar-wrap">
      <div class="nav-bar">
        <router-link
          :to="`/${currentId}`"
          class="nav-item"
          :class="{ 'nav-item--active': isHomeActive }"
        >
          <div class="nav-item-icon"><q-icon name="favorite" size="18px" /></div>
          <span>ร่วมส่งคำอวยพร</span>
          <div class="nav-item-indicator" />
        </router-link>

        <div class="nav-divider" />

        <router-link
          :to="`/${currentId}/list`"
          class="nav-item"
          :class="{ 'nav-item--active': isListActive }"
        >
          <div class="nav-item-icon"><q-icon name="people" size="18px" /></div>
          <span>รายชื่อผู้ร่วมอวยพร</span>
          <div class="nav-item-indicator" />
        </router-link>
      </div>
    </div>

    <!-- ===== PAGE CONTENT ===== -->
    <q-page-container class="page-bg">
      <router-view :id="currentId" />
    </q-page-container>

    <!-- ===== ALERT DIALOG ===== -->
    <q-dialog v-model="alertDialog.show" persistent>
      <q-card class="alert-card">
        <div class="alert-icon-wrap" :class="`alert-icon-wrap--${alertDialog.type}`">
          <div class="alert-icon-ring">
            <q-icon :name="alertDialog.icon" size="34px" color="white" />
          </div>
        </div>
        <q-card-section class="alert-body">
          <div class="alert-title">{{ alertDialog.title }}</div>
          <div class="alert-message">{{ alertDialog.message }}</div>
        </q-card-section>
        <q-card-actions align="center" class="alert-actions">
          <q-btn
            unelevated
            :label="alertDialog.btnLabel || 'ตกลง'"
            class="alert-btn"
            :class="`alert-btn--${alertDialog.type}`"
            @click="alertDialog.show = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ===== FOOTER ===== -->
    <q-footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-col footer-col--brand">
            <div class="footer-brand">
              <div class="footer-brand-icon">
                <q-icon name="celebration" size="20px" color="white" />
              </div>
              <span class="footer-brand-name">Festival Greeting LDD</span>
            </div>
            <p class="footer-desc">
              ร่วมเฉลิมฉลองเนื่องในโอกาสต่างๆ ด้วยคำอวยพร ความสุข และพลังใจดีๆ ให้แก่ผู้บริหาร
              บุคลากร และเครือข่าย ของกรมพัฒนาที่ดิน
            </p>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">เมนูทางลัด</div>
            <div class="footer-links">
              <router-link :to="`/${currentId}`" class="footer-link">
                <q-icon name="favorite_border" size="14px" class="q-mr-xs" />ร่วมส่งคำอวยพร
              </router-link>
              <router-link :to="`/${currentId}/list`" class="footer-link">
                <q-icon name="people_outline" size="14px" class="q-mr-xs" />รายชื่อผู้ร่วมอวยพร
              </router-link>
            </div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">ติดต่อสอบถาม</div>
            <div class="footer-contacts">
              <a
                href="https://webapp.ldd.go.th/ICTWeb/index.php"
                target="_blank"
                class="footer-contact-item footer-link"
              >
                <q-icon name="apartment" size="15px" class="footer-contact-icon" />
                <span>ศูนย์เทคโนโลยีสารสนเทศฯ กรมพัฒนาที่ดิน</span>
              </a>
              <div class="footer-contact-item">
                <q-icon name="account_circle" size="15px" class="footer-contact-icon" />
                <span>กลุ่มฐานข้อมูลสารสนเทศ</span>
              </div>
              <div class="footer-contact-item">
                <q-icon name="call" size="15px" class="footer-contact-icon" />
                <span>02-562-5100 ต่อ 1328</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-divider" />

        <div class="footer-bottom">
          <span>กรมพัฒนาที่ดิน ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900</span>
          <span class="footer-bottom-sep gt-xs">·</span>
          <span>โทร. 1760 ต่อ 1275</span>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AlertConfig {
  icon: string;
  title: string;
}

interface AlertDialog {
  show: boolean;
  type: AlertType;
  icon: string;
  title: string;
  message: string;
  btnLabel: string;
}

interface FestivalData {
  festivalName: string;
  image?: string;
  logo?: string;
  webName?: string;
}

type AlertType = 'error' | 'success' | 'warning' | 'info';

// ─── Router / Quasar ─────────────────────────────────────────────────────────
const route = useRoute();
const $q = useQuasar();

// ─── Festival State ───────────────────────────────────────────────────────────
const image = ref<string>('');
const festivalName = ref<string>('');

/** ดึง ID จาก URL params → localStorage fallback */
const currentId = computed<string>(
  () => (route.params.id as string) || localStorage.getItem('festivalId') || '1',
);

// ─── Nav Active State ─────────────────────────────────────────────────────────
const isListActive = computed(() => route.path.startsWith(`/${currentId.value}/list`));
const isHomeActive = computed(() => route.path === `/${currentId.value}`);

// ─── Alert Dialog ─────────────────────────────────────────────────────────────
const alertDialog = reactive<AlertDialog>({
  show: false,
  type: 'error',
  icon: 'report_problem',
  title: '',
  message: '',
  btnLabel: 'ตกลง',
});

const ALERT_CONFIG: Record<AlertType, AlertConfig> = {
  error: { icon: 'error_outline', title: 'เกิดข้อผิดพลาด' },
  success: { icon: 'check_circle_outline', title: 'สำเร็จ' },
  warning: { icon: 'warning_amber', title: 'คำเตือน' },
  info: { icon: 'info_outline', title: 'แจ้งเตือน' },
};

const showAlert = (
  message: string,
  type: AlertType = 'error',
  title?: string,
  btnLabel = 'ตกลง',
): void => {
  alertDialog.type = type;
  alertDialog.icon = ALERT_CONFIG[type].icon;
  alertDialog.title = title ?? ALERT_CONFIG[type].title;
  alertDialog.message = message;
  alertDialog.btnLabel = btnLabel;
  alertDialog.show = true;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Fetches a file from the upload endpoint and returns a blob URL. */
const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const res = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(res.data as Blob);
  } catch {
    return '';
  }
};

/** Injects or updates the page favicon. */
const setFavicon = (href: string): void => {
  let el = document.querySelector<HTMLLinkElement>('#dynamic-favicon');
  if (!el) {
    el = document.createElement('link');
    el.id = 'dynamic-favicon';
    el.rel = 'icon';
    document.head.appendChild(el);
  }
  el.href = href;
};

// ─── Data Fetching ────────────────────────────────────────────────────────────
/** โหลด banner image + festivalName */
const fetchFestival = async (id: string): Promise<void> => {
  $q.loading.show();
  try {
    const res = await api.get(`/festival/${Number(id)}`);
    const data: FestivalData = res.data.festival;

    festivalName.value = data.festivalName;
    image.value = data.image ? await getImageUrl(data.image) : '';
    localStorage.setItem('festivalId', id);
  } catch {
    showAlert('ไม่สามารถโหลดข้อมูลเทศกาลได้', 'error');
  } finally {
    $q.loading.hide();
  }
};

/** โหลด document.title + favicon */
const fetchMeta = async (id: string): Promise<void> => {
  try {
    const res = await api.get(`/festival/${id}`);
    const data: FestivalData = res.data?.festival;

    document.title = data?.webName ?? 'ระบบบริหารจัดการอวยพรเนื่องในโอกาสต่างๆ ของกรมฯ';

    if (data?.logo) {
      const url = await getImageUrl(data.logo);
      if (url) setFavicon(url);
    }
  } catch (err) {
    console.error('โหลด meta ไม่สำเร็จ:', err);
  }
};

// ─── Watchers ─────────────────────────────────────────────────────────────────
watch(currentId, (id) => void fetchMeta(id), { immediate: true });

watch(
  () => route.params.id,
  (newId) => {
    const storedId = localStorage.getItem('festivalId');
    if (newId && newId !== storedId) localStorage.setItem('festivalId', newId as string);
    void fetchFestival((newId as string) || storedId || '1');
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Sarabun:wght@400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$rose: #be123c;
$rose-mid: #e11d48;
$rose-light: #fb7185;
$gold: #ca8a04;
$gold-light: #fbbf24;
$amber: #f59e0b;
$surface: #ffffff;
$text-main: #4a0010;
$text-muted: #9ca3af;
$nav-h: 52px;

// ─── HEADER ───────────────────────────────────────────────────────────────────
.festival-header {
  background: linear-gradient(135deg, #7f1d1d 0%, $rose-mid 50%, #db2777 100%) !important;
  box-shadow: 0 2px 24px rgba(190, 18, 60, 0.35) !important;
}

.festival-toolbar {
  min-height: 58px;
  height: auto;
  padding: 8px 16px;
  gap: 12px;
}

.header-emblem {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.festival-title {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  font-size: clamp(12px, 3vw, 17px);
  font-weight: 600;
  color: white;
  white-space: normal;
  word-break: break-word;
  line-height: 1.45;
  letter-spacing: 0.01em;
}

.festival-title-text {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  font-size: clamp(13px, 3.5vw, 20px);
  font-weight: 700;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  letter-spacing: 0.01em;
}

.header-dots {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.dot {
  border-radius: 50%;
  display: block;
  opacity: 0.6;
  animation: dot-pulse 1.5s ease-in-out infinite;
}

.dot-1 {
  width: 6px;
  height: 6px;
  background: $gold-light;
  animation-delay: 0s;
}
.dot-2 {
  width: 8px;
  height: 8px;
  background: white;
  animation-delay: 0.2s;
}
.dot-3 {
  width: 6px;
  height: 6px;
  background: $rose-light;
  animation-delay: 0.4s;
}

@keyframes dot-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}

// ─── BANNER ───────────────────────────────────────────────────────────────────
.banner-section {
  padding: 4px 0 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 18px 12px 0;
  }
}

.banner-wrap {
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    border-radius: 16px;
    overflow: hidden;
  }
  @media (max-width: 480px) {
    border-radius: 0;
  }
}

.banner-img {
  width: 100%;
  display: block;
}

:deep(.q-img__image) {
  object-position: center center;
}

.banner-loading,
.banner-error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $rose-mid, #db2777);
  color: white;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.9rem;
}

.banner-loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

// .banner-overlay {
//   position: absolute;
//   inset: 0;
//   background: linear-gradient(
//     to bottom,
//     rgba(127, 29, 29, 0.05) 0%,
//     transparent 35%,
//     rgba(127, 29, 29, 0.55) 100%
//   );
//   pointer-events: none;
// }

.banner-overlay {
  display: none;
}
.banner-shimmer-bar {
  height: 4px;
  background: linear-gradient(90deg, $rose-mid, $gold-light, $rose-light, $rose-mid);
  background-size: 200% 100%;
  animation: shimmer 2.5s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

// ─── NAV BAR ──────────────────────────────────────────────────────────────────
// ใช้ class เดียวกับ AdminLayout (.nav-bar-wrap / .nav-bar / .nav-item / .nav-item-indicator / .nav-divider)
.nav-bar-wrap {
  background: $surface;
  border-bottom: 1px solid rgba(190, 18, 60, 0.1);
  box-shadow: 0 2px 12px rgba(190, 18, 60, 0.07);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-bar {
  display: flex;
  align-items: stretch;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 480px) {
    padding: 0;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 28px;
  height: $nav-h;
  flex: 1;
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  font-size: clamp(0.85rem, 3vw, 1rem);
  font-weight: 600;
  color: $text-muted;
  text-decoration: none;
  position: relative;
  transition:
    color 0.2s,
    background 0.2s;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 0 10px;
    font-size: 0.82rem;
    gap: 5px;
  }

  .nav-item-icon {
    display: flex;
    align-items: center;
    opacity: 0.55;
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  .nav-item-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(90deg, $rose-mid, $rose-light);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    color: $rose-mid;
    background: rgba(190, 18, 60, 0.04);

    .nav-item-icon {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  &--active {
    color: $rose-mid;
    background: rgba(190, 18, 60, 0.05);

    .nav-item-icon {
      opacity: 1;
    }
    .nav-item-indicator {
      transform: translateX(-50%) scaleX(1);
    }
  }
}

.nav-divider {
  width: 1px;
  background: rgba(190, 18, 60, 0.1);
  margin: 8px 0;
  flex-shrink: 0;
}

// ─── PAGE BG ──────────────────────────────────────────────────────────────────
.page-bg {
  background: linear-gradient(155deg, #fff1f2 0%, #fdf4ff 50%, #fff7ed 100%);
  min-height: 60vh;
}

// ─── ALERT DIALOG ─────────────────────────────────────────────────────────────
.alert-card {
  width: 340px;
  max-width: 92vw;
  border-radius: 20px !important;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18) !important;
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

.alert-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 0 20px;

  &--error {
    background: linear-gradient(135deg, #7f1d1d, $rose-mid);
  }
  &--success {
    background: linear-gradient(135deg, #14532d, #16a34a);
  }
  &--warning {
    background: linear-gradient(135deg, #78350f, $amber);
  }
  &--info {
    background: linear-gradient(135deg, #1e3a5f, #2563eb);
  }
}

.alert-icon-ring {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.alert-body {
  padding: 20px 24px 8px !important;
  text-align: center;
}
.alert-title {
  font-family: 'Prompt', 'Noto Sans Thai', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 8px;
}
.alert-message {
  font-size: 0.92rem;
  color: #64748b;
  line-height: 1.65;
}
.alert-actions {
  padding: 12px 24px 22px !important;
}

.alert-btn {
  min-width: 110px;
  border-radius: 10px !important;
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 8px 28px !important;
  letter-spacing: 0.01em;

  &--error {
    background: linear-gradient(135deg, $rose-mid, #db2777) !important;
    color: #fff !important;
  }
  &--success {
    background: linear-gradient(135deg, #16a34a, #15803d) !important;
    color: #fff !important;
  }
  &--warning {
    background: linear-gradient(135deg, $amber, #d97706) !important;
    color: #fff !important;
  }
  &--info {
    background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
    color: #fff !important;
  }
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
// ใช้ class/token เดียวกับ AdminLayout ทั้งหมด
.site-footer {
  background: linear-gradient(135deg, #7f1d1d 0%, #9f1239 50%, #881337 100%) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem 1.5rem;

  @media (max-width: 600px) {
    padding: 2rem 1rem 1.25rem;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
}

.footer-col-title {
  font-family: 'Prompt', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.9rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
}

.footer-brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.footer-brand-name {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}
.footer-desc {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
  margin: 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 480px) {
    align-items: center;
  }
}

.footer-link {
  display: inline-flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.86rem;
  text-decoration: none;
  transition:
    color 0.2s,
    padding-left 0.2s;

  &:hover {
    color: $gold-light;
    padding-left: 4px;
  }
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 480px) {
    align-items: center;
  }
}

.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.84rem;
  line-height: 1.5;

  @media (max-width: 480px) {
    justify-content: center;
    align-items: center;
  }
}

.footer-contact-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: $gold-light;
  opacity: 0.85;
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 2rem 0 1.25rem;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  line-height: 1.6;
}

.footer-bottom-sep {
  opacity: 0.4;
}

@media (max-width: 480px) {
  .footer-bottom {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
