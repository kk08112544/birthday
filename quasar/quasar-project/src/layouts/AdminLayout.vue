<template>
  <q-layout view="lhh LpR lf">
    <!-- ===== HEADER ===== -->
    <q-header class="admin-header">
      <q-toolbar class="admin-toolbar">
        <div class="header-logo">
          <q-icon name="celebration" size="22px" color="white" />
        </div>

        <q-toolbar-title class="admin-title">
          ระบบบริหารจัดการอวยพรเนื่องในโอกาสต่างๆ ของกรมฯ
        </q-toolbar-title>

        <q-space />

        <div class="admin-badge gt-xs">
          <q-icon name="admin_panel_settings" size="16px" />
          <span>แอดมิน</span>
        </div>

        <q-btn
          flat
          round
          dense
          icon="logout"
          color="white"
          size="md"
          class="logout-btn"
          @click="handleLogout"
        >
          <q-tooltip>ออกจากระบบ</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <br />
    <br />
    <br />
    <!-- ===== BANNER ===== -->
    <div class="banner-section">
      <div class="banner-wrap">
        <q-img
          :src="image"
          class="banner-img"
          fit="contain"
          :ratio="$q.screen.xs ? 4 / 3 : $q.screen.sm ? 16 / 9 : 21 / 9"
        >
          <template v-slot:loading>
            <div class="banner-loading">
              <q-spinner-orbit color="white" size="2.5rem" />
            </div>
          </template>
          <template v-slot:error>
            <div class="banner-error">
              <q-icon name="broken_image" size="3rem" color="white" class="q-mb-sm" />
              <span>ไม่สามารถโหลดรูปภาพได้</span>
            </div>
          </template>

          <div class="banner-overlay">
            <div class="banner-text" v-if="festivalName">
              <div class="banner-festival-label">เทศกาลปัจจุบัน</div>
              <div class="banner-festival-name">{{ festivalName }}</div>
            </div>
          </div>
        </q-img>

        <div class="banner-shimmer-bar" />
      </div>
    </div>

    <!-- ===== NAV BAR ===== -->
    <div class="nav-bar-wrap">
      <div class="nav-bar">
        <router-link
          to="/admin/festival"
          class="nav-item"
          :class="{
            'nav-item--active':
              route.path.startsWith('/admin/festival') ||
              route.path.startsWith('/admin/edit') ||
              route.path.startsWith('/admin/create'),
          }"
        >
          <div class="nav-item-icon"><q-icon name="celebration" size="20px" /></div>
          <span>เทศกาล</span>
          <div class="nav-item-indicator" />
        </router-link>

        <div class="nav-divider" />

        <router-link
          to="/admin/unpolite"
          class="nav-item"
          :class="{ 'nav-item--active': route.path === '/admin/unpolite' }"
        >
          <div class="nav-item-icon"><q-icon name="block" size="20px" /></div>
          <span>รายการคำต้องห้าม</span>
          <div class="nav-item-indicator" />
        </router-link>
      </div>
    </div>

    <!-- ===== PAGE CONTENT ===== -->
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>

    <!-- ===== FOOTER ===== -->
    <q-footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand -->
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

          <!-- Quick Links -->
          <div class="footer-col">
            <div class="footer-col-title">เมนูทางลัด</div>
            <div class="footer-links">
              <router-link :to="`/${currentId}`" class="footer-link">
                <q-icon name="favorite_border" size="14px" class="q-mr-xs" />
                ร่วมส่งคำอวยพร
              </router-link>
              <router-link :to="`/${currentId}/list`" class="footer-link">
                <q-icon name="people_outline" size="14px" class="q-mr-xs" />
                รายชื่อผู้ร่วมอวยพร
              </router-link>
              <router-link to="/login" class="footer-link">
                <q-icon name="manage_accounts" size="14px" class="q-mr-xs" />
                แอดมิน
              </router-link>
            </div>
          </div>

          <!-- Contact -->
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
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter, useRoute } from 'vue-router';

const image = ref('');
const festivalId = ref();
const festivalName = ref('');

const route = useRoute();
const $q = useQuasar();
const router = useRouter();

const currentId = computed(
  () => (route.params.id as string) || localStorage.getItem('festivalId') || '1',
);

// ============================================================
// Token refresh
// ============================================================
// let refreshTimer: ReturnType<typeof setTimeout> | null = null;

// const startRefreshTimer = () => {
//   if (refreshTimer) clearTimeout(refreshTimer);
//   const TWO_MIN = 2 * 60 * 1000;
//   refreshTimer = setTimeout(() => { void refreshAccessToken(); }, TWO_MIN);
// };

// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) return;
//     const response = await api.post('/auth/renew', { refreshToken });
//     if (response.data.token) {
//       const { accessToken, refreshToken: newRefresh } = response.data.token;
//       localStorage.setItem('accessToken', accessToken);
//       localStorage.setItem('refreshToken', newRefresh);
//       api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//       startRefreshTimer();
//     }
//   } catch {
//     handleLogout();
//   }
// };

// ============================================================
// Image helper
// ============================================================
const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch {
    return '';
  }
};

// ============================================================
// Fetch festival
// ============================================================
const fetchFestival = async () => {
  $q.loading.show();
  try {
    const response = await api.get('/festival/all');
    if (response.data?.festival?.length > 0) {
      const data = response.data.festival[0];
      festivalName.value = data.festivalName;
      festivalId.value = data.fId;
      localStorage.setItem('festivalId', String(data.fId));
      image.value = data.image ? await getImageUrl(data.image) : '';
    }
  } catch {
    $q.notify({ color: 'negative', message: 'ไม่สามารถโหลดข้อมูลได้', icon: 'report_problem' });
  } finally {
    $q.loading.hide();
  }
};

// ============================================================
// Logout
// ============================================================
const handleLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  localStorage.setItem('firstName', '');
  router.push('/login').catch(console.error);
};

// ============================================================
// Init
// ============================================================
onMounted(() => {
  void fetchFestival();
  // if (localStorage.getItem('accessToken')) startRefreshTimer();
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Sarabun:wght@400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ============================================================
// TOKENS — Rose / Gold
// ============================================================
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

// ============================================================
// HEADER
// ============================================================
.admin-header {
  background: linear-gradient(135deg, #7f1d1d 0%, $rose-mid 50%, #db2777 100%) !important;
  box-shadow: 0 2px 20px rgba(190, 18, 60, 0.38) !important;
}

.admin-toolbar {
  min-height: 60px;
  height: auto;
  padding: 8px 16px;
  gap: 12px;
}

.header-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-title {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  font-size: clamp(12px, 3vw, 17px);
  font-weight: 600;
  color: white;
  white-space: normal;
  word-break: break-word;
  line-height: 1.45;
  letter-spacing: 0.01em;
}

.admin-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 20px;
  padding: 5px 13px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.78rem;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 10px !important;
  transition:
    background 0.2s,
    transform 0.15s !important;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: scale(1.05);
  }
}

// ============================================================
// BANNER
// ============================================================
.banner-section {
  background: linear-gradient(180deg, #fff1f2 0%, #fce7f3 100%);
  padding: 28px 40px 0;

  @media (max-width: 768px) {
    padding: 16px 16px 0;
  }
  @media (max-width: 480px) {
    padding: 8px 0 0;
  }
}

.banner-wrap {
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 8px 40px rgba(190, 18, 60, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(190, 18, 60, 0.08);

  @media (max-width: 768px) {
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(190, 18, 60, 0.12);
  }
  @media (max-width: 480px) {
    border-radius: 0;
    box-shadow: none;
  }
}

.banner-img {
  width: 100%;
  height: 380px;
  display: block;

  @media (max-width: 768px) {
    height: 240px;
  }
  @media (max-width: 480px) {
    height: 170px;
  }
}

:deep(.q-img__image) {
  object-position: center center;
}

.banner-loading,
.banner-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7f1d1d, $rose-mid);
  color: white;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.9rem;
  gap: 10px;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(127, 29, 29, 0.65) 100%);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem 2rem;

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
}

.banner-text {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both 0.15s;
}

.banner-festival-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.banner-festival-name {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1rem, 4vw, 1.8rem);
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// shimmer bar ใต้ banner — rose/gold
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

// ============================================================
// NAV BAR
// ============================================================
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

// ============================================================
// PAGE CONTAINER
// ============================================================
.page-container {
  background: linear-gradient(150deg, #fff1f2 0%, #fdf4ff 50%, #fff7ed 100%);
  min-height: calc(100vh - 60px - 52px - 200px);
}

// ============================================================
// FOOTER
// ============================================================
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
