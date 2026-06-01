<template>
  <q-page class="view-admin-page">
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
            <h1 class="hero-title">รายละเอียดผู้ใช้ระบบ</h1>
            <p class="hero-sub">
              {{ pageLoading ? 'กำลังโหลด...' : `รายละเอียดของ "${originalFirstName}"` }}
            </p>
          </div>
        </div>
        <q-btn
          unelevated
          icon="arrow_back"
          label="กลับรายการ"
          to="/backoffice/admin"
          class="hero-back-btn"
          :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
        />
      </div>

      <!-- TAB STRIP -->
      <div class="hero-tabs-wrap">
        <div class="hero-tabs">
          <button class="hero-tab hero-tab--active">
            <q-icon name="badge" size="16px" />ข้อมูลทั่วไป
          </button>
        </div>
      </div>
    </div>

    <!-- ===== SKELETON ===== -->
    <div v-if="pageLoading" class="content-wrap">
      <div class="form-container">
        <div class="skeleton-profile-card">
          <div class="skeleton-avatar" />
          <div class="skeleton-name" />
          <div class="skeleton-badge" />
        </div>
        <div class="admin-card animate-in">
          <div class="skeleton-label" />
          <div class="info-grid-skeleton">
            <div v-for="i in 6" :key="i" class="skeleton-info-item" />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div v-else class="content-wrap">
      <!-- ── TAB: ข้อมูลทั่วไป ── -->
      <transition name="tab-fade" mode="out-in">
        <div v-if="true" key="info" class="form-container">
          <!-- PROFILE CARD -->
          <div class="profile-card animate-in" style="animation-delay: 0.04s">
            <div class="profile-card-bg" />
            <div class="profile-card-body">
              <div class="profile-avatar-wrap">
                <div class="profile-avatar">{{ getInitial(originalFirstName) }}</div>
                <div class="profile-avatar-ring" />
              </div>
              <div class="profile-info">
                <div class="profile-name">{{ originalFirstName }}</div>
                <div class="profile-username">@{{ readonlyInfo.userName }}</div>
                <div class="profile-badges">
                  <span
                    class="role-pill"
                    :class="
                      readonlyInfo.role === 'superAdmin' ? 'role-pill--super' : 'role-pill--admin'
                    "
                  >
                    <q-icon
                      :name="readonlyInfo.role === 'superAdmin' ? 'shield' : 'admin_panel_settings'"
                      size="13px"
                    />
                    {{ getRoleLabel(readonlyInfo.role) }}
                  </span>
                  <span
                    class="status-pill"
                    :class="
                      readonlyInfo.deletedAt ? 'status-pill--inactive' : 'status-pill--active'
                    "
                  >
                    <span class="status-dot" />
                    {{ readonlyInfo.deletedAt ? 'ถูกลบแล้ว' : 'ใช้งานอยู่' }}
                  </span>
                </div>
              </div>
              <!-- Quick stats -->
              <div class="profile-stats">
                <div class="stat-item">
                  <div class="stat-value">{{ readonlyInfo.userName || '—' }}</div>
                  <div class="stat-label">ชื่อผู้ใช้</div>
                </div>
                <div class="stat-divider" />
                <div class="stat-item">
                  <div class="stat-value">
                    {{ readonlyInfo.role === 'superAdmin' ? 'สูงสุด' : 'ทั่วไป' }}
                  </div>
                  <div class="stat-label">สิทธิ์</div>
                </div>
                <div class="stat-divider" />
                <div class="stat-item">
                  <div class="stat-value">{{ readonlyInfo.deletedAt ? 'ไม่ใช้งาน' : 'ปกติ' }}</div>
                  <div class="stat-label">สถานะ</div>
                </div>
              </div>
            </div>
          </div>

          <!-- INFO CARD -->
          <div class="admin-card animate-in" style="animation-delay: 0.1s">
            <div class="card-label"><span class="label-dot" />ข้อมูลการติดต่อ</div>
            <div class="info-grid">
              <!-- ชื่อย่อ -->
              <div class="info-item">
                <div
                  class="info-item-icon"
                  style="background: linear-gradient(135deg, #3730a3, #4f46e5)"
                >
                  <q-icon name="business" color="white" size="18px" />
                </div>
                <div class="info-item-body">
                  <div class="info-item-label">ชื่อย่อหน่วยงาน</div>
                  <div class="info-item-value">{{ originalFirstName || '—' }}</div>
                </div>
              </div>
              <!-- อีเมล -->
              <div class="info-item">
                <div
                  class="info-item-icon"
                  style="background: linear-gradient(135deg, #0f766e, #0d9488)"
                >
                  <q-icon name="email" color="white" size="18px" />
                </div>
                <div class="info-item-body">
                  <div class="info-item-label">อีเมล</div>
                  <div class="info-item-value info-item-value--mono">
                    {{ readonlyInfo.email || '—' }}
                  </div>
                </div>
              </div>
              <!-- เบอร์โทร -->
              <div class="info-item">
                <div
                  class="info-item-icon"
                  style="background: linear-gradient(135deg, #92400e, #d97706)"
                >
                  <q-icon name="phone" color="white" size="18px" />
                </div>
                <div class="info-item-body">
                  <div class="info-item-label">เบอร์โทรภายใน</div>
                  <div class="info-item-value">{{ readonlyInfo.phoneNumber || '—' }}</div>
                </div>
              </div>
              <!-- ชื่อผู้ใช้ -->
              <div class="info-item">
                <div
                  class="info-item-icon"
                  style="background: linear-gradient(135deg, #1e40af, #3b82f6)"
                >
                  <q-icon name="alternate_email" color="white" size="18px" />
                </div>
                <div class="info-item-body">
                  <div class="info-item-label">ชื่อผู้ใช้</div>
                  <div class="info-item-value info-item-value--mono">
                    {{ readonlyInfo.userName || '—' }}
                  </div>
                </div>
              </div>
              <!-- บทบาท -->
              <div class="info-item">
                <div
                  class="info-item-icon"
                  style="background: linear-gradient(135deg, #5b21b6, #8b5cf6)"
                >
                  <q-icon name="shield" color="white" size="18px" />
                </div>
                <div class="info-item-body">
                  <div class="info-item-label">บทบาท</div>
                  <div class="info-item-value">{{ getRoleLabel(readonlyInfo.role) || '—' }}</div>
                </div>
              </div>
              <!-- สถานะ -->
              <div class="info-item">
                <div
                  class="info-item-icon"
                  style="background: linear-gradient(135deg, #065f46, #16a34a)"
                >
                  <q-icon name="verified_user" color="white" size="18px" />
                </div>
                <div class="info-item-body">
                  <div class="info-item-label">สถานะ</div>
                  <div class="info-item-value">
                    <span
                      class="status-pill-sm"
                      :class="
                        readonlyInfo.deletedAt
                          ? 'status-pill-sm--inactive'
                          : 'status-pill-sm--active'
                      "
                    >
                      <span class="status-dot" />
                      {{ readonlyInfo.deletedAt ? 'ถูกลบแล้ว' : 'ใช้งานอยู่' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TIMELINE CARD -->
          <div class="admin-card animate-in" style="animation-delay: 0.16s">
            <div class="card-label"><span class="label-dot label-dot--teal" />ประวัติเวลา</div>
            <div class="timeline-grid">
              <div class="timeline-item">
                <div class="timeline-icon timeline-icon--create">
                  <q-icon name="add_circle" size="16px" color="white" />
                </div>
                <div class="timeline-body">
                  <div class="timeline-label">วันที่สร้าง</div>
                  <div class="timeline-value">{{ formatDate(readonlyInfo.createdAt) }}</div>
                </div>
              </div>
              <div class="timeline-connector" />
              <div class="timeline-item">
                <div class="timeline-icon timeline-icon--update">
                  <q-icon name="update" size="16px" color="white" />
                </div>
                <div class="timeline-body">
                  <div class="timeline-label">แก้ไขล่าสุด</div>
                  <div class="timeline-value">{{ formatDate(readonlyInfo.updatedAt) }}</div>
                </div>
              </div>
              <template v-if="readonlyInfo.deletedAt">
                <div class="timeline-connector" />
                <div class="timeline-item">
                  <div class="timeline-icon timeline-icon--delete">
                    <q-icon name="delete" size="16px" color="white" />
                  </div>
                  <div class="timeline-body">
                    <div class="timeline-label">วันที่ลบ</div>
                    <div class="timeline-value timeline-value--danger">
                      {{ formatDate(readonlyInfo.deletedAt) }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- /tab info -->
      </transition>

      <!-- ===== ACTION BUTTONS ===== -->
      <div class="action-bar animate-in" style="animation-delay: 0.22s; margin-top: 1.5rem">
        <q-btn
          unelevated
          icon="arrow_back"
          label="กลับไปหน้าผู้ใช้ระบบ"
          to="/backoffice/admin"
          class="action-btn action-btn--back"
        />
      </div>
    </div>

    <!-- NOTIFY -->
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
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';
import type { AxiosError } from 'axios';

const NOTIFY_DURATION = 2500;

interface Particle {
  id: number;
  style: Record<string, string>;
}
type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

const $q = useQuasar();

const route = useRoute();
const adminId = computed(() => route.params.id as string);

const pageLoading = ref(true);
const originalFirstName = ref('');

const readonlyInfo = ref({
  userName: '',
  email: '',
  phoneNumber: '',
  deletedAt: null as string | null,
  createdAt: '',
  role: '',
  updatedAt: '',
});

// ─── Notify ───────────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
const notifyKey = ref(0);
let notifyTimer: ReturnType<typeof setTimeout> | null = null;

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getInitial = (name: string): string => {
  if (!name) return '?';
  const parts = name.split('-');
  const t = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  return (t?.trim().charAt(0) ?? '?').toUpperCase();
};

const getRoleLabel = (role: string): string =>
  ({ superAdmin: 'Super Admin', admin: 'Admin' })[role] ?? role;

const formatDate = (date: string | null): string => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

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

// ─── Fetch ────────────────────────────────────────────────────────────────────
const fetchAdmin = async () => {
  pageLoading.value = true;
  try {
    const res = await api.get(`/backoffice/admin/${adminId.value}`);
    const data = res.data.admin ?? res.data;
    originalFirstName.value = data.firstName ?? '';
    readonlyInfo.value = {
      userName: data.userName ?? '',
      email: data.email ?? '',
      phoneNumber: data.phoneNumber ?? '',
      deletedAt: data.deletedAt ?? null,
      createdAt: data.createdAt ?? '',
      role: data.role ?? '',
      updatedAt: data.updatedAt ?? '',
    };
  } catch (err: unknown) {
    const e = err as AxiosError<{ message: string }>;
    openNotify(false, e.response?.data?.message ?? 'โหลดข้อมูลไม่สำเร็จ');
  } finally {
    pageLoading.value = false;
  }
};

// ─── Particles ────────────────────────────────────────────────────────────────
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
onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
  void fetchAdmin();
});
onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (notifyTimer) clearTimeout(notifyTimer);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

$indigo: #3730a3;
$indigo-mid: #4f46e5;
$teal: #0d9488;
$amber: #d97706;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$surface: #ffffff;
$text-main: #1e1b4b;
$text-muted: #9ca3af;
$radius: 18px;
$error-red: #dc2626;

.view-admin-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(155deg, #eef2ff 0%, #f0f9ff 50%, #f0fdf4 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// .page-hero {
//   position: relative;
//   overflow: hidden;
//   background: linear-gradient(135deg, #1e1b4b 0%, $indigo 45%, $indigo-mid 100%);
//   padding: 2.25rem 1.5rem 0;
// }
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1b4b 0%, $indigo 45%, $indigo-mid 100%);
  padding: 1rem 1.5rem 2.5rem; // เปลี่ยนจาก 2.25rem 1.5rem 4rem
}
.hero-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.13;
}
.hero-blob-1 {
  width: 340px;
  height: 340px;
  background: #a5b4fc;
  top: -100px;
  right: -80px;
  animation: drift 7s ease-in-out infinite;
}
.hero-blob-2 {
  width: 210px;
  height: 210px;
  background: #67e8f9;
  bottom: -70px;
  left: -50px;
  animation: drift 9s ease-in-out infinite reverse;
}
.hero-blob-3 {
  width: 130px;
  height: 130px;
  background: #fbbf24;
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

.hero-tabs-wrap {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 1.5rem auto 0;
}
.hero-tabs {
  display: inline-flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px 16px 0 0;
  padding: 6px 6px 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: none;
}
.hero-tab {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  border-radius: 12px 12px 0 0;
  border: none;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  background: transparent;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  &:hover:not(.hero-tab--active) {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.08);
  }
  &--active {
    background: #fff;
    color: $indigo;
    box-shadow: 0 -4px 16px rgba(79, 70, 229, 0.2);
  }
}

// ─── Content ─────────────────────────────────────────────────────────────────
// .content-wrap {
//   max-width: 760px;
//   margin: 0 auto;
//   padding: 0 1rem 4rem;
//   &::before {
//     content: '';
//     display: block;
//     height: 1.5rem;
//     background: #fff;
//     border-radius: 0 16px 0 0;
//     margin-bottom: -1rem;
//   }
// }

.content-wrap {
  max-width: 1100px;
  // margin: -1.25rem auto 0;
  margin: 1.5rem auto 0; // ปรับให้เลื่อนลง (เพิ่มเลขยิ่งลงมามาก)
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

// ─── Skeleton ─────────────────────────────────────────────────────────────────
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
%skeleton-base {
  border-radius: 10px;
  background: linear-gradient(90deg, #e8e8f0 25%, #f4f4fb 50%, #e8e8f0 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
}
.skeleton-label {
  @extend %skeleton-base;
  height: 12px;
  width: 120px;
  margin-bottom: 1.25rem;
}
.skeleton-input {
  @extend %skeleton-base;
  height: 40px;
  width: 100%;
}

.skeleton-profile-card {
  background: $surface;
  border-radius: $radius;
  padding: 2rem;
  box-shadow: 0 3px 20px rgba(79, 70, 229, 0.08);
  border: 1px solid rgba(79, 70, 229, 0.09);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.skeleton-avatar {
  @extend %skeleton-base;
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.skeleton-name {
  @extend %skeleton-base;
  width: 160px;
  height: 20px;
}
.skeleton-badge {
  @extend %skeleton-base;
  width: 100px;
  height: 14px;
}
.info-grid-skeleton {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 1rem;
}
.skeleton-info-item {
  @extend %skeleton-base;
  height: 64px;
  border-radius: 12px;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
.admin-card {
  background: $surface;
  border-radius: $radius;
  padding: 1.5rem;
  box-shadow:
    0 3px 20px rgba(79, 70, 229, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(79, 70, 229, 0.09);
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
  &--teal {
    background: $teal;
  }
  &--amber {
    background: $amber;
  }
}
.field-group {
  scroll-margin-top: 80px;
}
.form-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 6px;
}
.form-required {
  color: $red;
  margin-left: 2px;
}
.form-hint {
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  color: $text-muted;
  opacity: 0.75;
  margin-left: 4px;
}
.form-input :deep(.q-field__control) {
  border-radius: 12px !important;
}
.form-input :deep(.q-field__messages) {
  display: none !important;
}
.form-input :deep(.q-field--error .q-field__control:before) {
  border-color: $error-red !important;
}
.form-input :deep(.q-field--error .q-field__control:after) {
  border-color: $error-red !important;
}
.error-msg {
  display: flex;
  align-items: center;
  gap: 5px;
  color: $error-red;
  font-size: 0.78rem;
  font-weight: 500;
  margin-top: 6px;
}
.err-fade-enter-active,
.err-fade-leave-active {
  transition: all 0.25s ease;
}
.err-fade-enter-from,
.err-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

// ─── Profile Card ─────────────────────────────────────────────────────────────
.profile-card {
  position: relative;
  background: $surface;
  border-radius: $radius;
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(79, 70, 229, 0.14),
    0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(79, 70, 229, 0.1);
}

.profile-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 110px;
  background: linear-gradient(135deg, #1e1b4b 0%, $indigo 50%, $indigo-mid 100%);
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='10'/%3E%3C/g%3E%3C/svg%3E");
  }
}

.profile-card-body {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
}

.profile-avatar-wrap {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto 1rem;
  margin-top: 0.5rem;
}
.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e1b4b, $indigo-mid);
  color: #fff;
  font-family: 'Prompt', sans-serif;
  font-weight: 800;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.4);
  border: 4px solid #fff;
}
.profile-avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px dashed rgba(79, 70, 229, 0.3);
  animation: spin 12s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.profile-info {
  text-align: center;
  margin-bottom: 1.25rem;
}
.profile-name {
  font-family: 'Prompt', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 4px;
}
.profile-username {
  font-size: 0.82rem;
  color: $text-muted;
  font-weight: 500;
  margin-bottom: 10px;
}
.profile-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.role-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  &--super {
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
    color: #5b21b6;
    border: 1px solid rgba(139, 92, 246, 0.25);
  }
  &--admin {
    background: #eef2ff;
    color: $indigo;
    border: 1px solid rgba(79, 70, 229, 0.2);
  }
}
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  &--active {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid rgba(22, 163, 74, 0.2);
  }
  &--inactive {
    background: #fee2e2;
    color: #dc2626;
    border: 1px solid rgba(220, 38, 38, 0.2);
  }
}
.status-pill-sm {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.78rem;
  font-weight: 600;
  &--active {
    background: #f0fdf4;
    color: #16a34a;
  }
  &--inactive {
    background: #fee2e2;
    color: #dc2626;
  }
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  .status-pill--active &,
  .status-pill-sm--active & {
    background: #16a34a;
    animation: pulse 2s infinite;
  }
  .status-pill--inactive &,
  .status-pill-sm--inactive & {
    background: #dc2626;
  }
}
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(22, 163, 74, 0);
  }
}

.profile-stats {
  display: flex;
  align-items: center;
  background: rgba(79, 70, 229, 0.04);
  border: 1px solid rgba(79, 70, 229, 0.1);
  border-radius: 14px;
  padding: 12px 0;
}
.stat-item {
  flex: 1;
  text-align: center;
  padding: 0 8px;
}
.stat-value {
  font-family: 'Prompt', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stat-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $text-muted;
}
.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(79, 70, 229, 0.12);
  flex-shrink: 0;
}

// ─── Info Grid ────────────────────────────────────────────────────────────────
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
}
.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(79, 70, 229, 0.02);
  border: 1px solid rgba(79, 70, 229, 0.08);
  border-radius: 14px;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.1);
    background: $surface;
  }
}
.info-item-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}
.info-item-body {
  min-width: 0;
  flex: 1;
}
.info-item-label {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 4px;
}
.info-item-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: $text-main;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &--mono {
    font-family: monospace;
    font-size: 0.85rem;
  }
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
.timeline-grid {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
}
.timeline-item {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 180px;
  @media (max-width: 520px) {
    min-width: 0;
    width: 100%;
    padding: 8px 0;
  }
}
.timeline-connector {
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, rgba(79, 70, 229, 0.2), rgba(79, 70, 229, 0.4));
  flex-shrink: 0;
  @media (max-width: 520px) {
    display: none;
  }
}
.timeline-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  &--create {
    background: linear-gradient(135deg, #065f46, #16a34a);
  }
  &--update {
    background: linear-gradient(135deg, #0c4a6e, #0284c7);
  }
  &--delete {
    background: linear-gradient(135deg, #7f1d1d, #dc2626);
  }
}
.timeline-body {
  min-width: 0;
}
.timeline-label {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 3px;
}
.timeline-value {
  font-size: 0.82rem;
  font-weight: 600;
  color: $text-main;
  &--danger {
    color: #dc2626;
  }
}

// ─── Security Banner ─────────────────────────────────────────────────────────
.security-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #1e1b4b, $indigo-mid);
  border-radius: 14px;
  padding: 14px 18px;
  position: relative;
  overflow: hidden;
}
.security-banner-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.security-banner-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
}
.security-banner-sub {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 2px;
}
.security-shield-deco {
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.06);
  .q-icon {
    font-size: 80px !important;
  }
}

// ─── Password ─────────────────────────────────────────────────────────────────
.strength-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}
.strength-bar {
  flex: 1;
  height: 5px;
  border-radius: 100px;
  background: rgba(79, 70, 229, 0.1);
  overflow: hidden;
}
.strength-fill {
  height: 100%;
  border-radius: 100px;
  transition:
    width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    background 0.3s;
  &--weak {
    background: #ef4444;
  }
  &--fair {
    background: #f97316;
  }
  &--good {
    background: #eab308;
  }
  &--strong {
    background: #22c55e;
  }
  &--great {
    background: linear-gradient(90deg, #0d9488, #22c55e);
  }
}
.strength-label {
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  &--weak {
    color: #ef4444;
  }
  &--fair {
    color: #f97316;
  }
  &--good {
    color: #eab308;
  }
  &--strong {
    color: #22c55e;
  }
  &--great {
    color: $teal;
  }
}
.pw-checklist {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
  margin-top: 8px;
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}
.pw-check-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 500;
  color: $text-muted;
  transition: color 0.2s;
  .q-icon {
    color: rgba(0, 0, 0, 0.2);
    transition: color 0.2s;
  }
  &--pass {
    color: $teal;
    .q-icon {
      color: $teal;
    }
  }
}
.match-preview {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: $teal;
}
.match-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.match-pop-leave-active {
  transition: all 0.15s ease;
}
.match-pop-enter-from,
.match-pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.append-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

// ─── Summary / Ready ──────────────────────────────────────────────────────────
.summary-card {
  background: linear-gradient(135deg, #f8f7ff, #f0f9ff);
  border-color: rgba(79, 70, 229, 0.15);
}
.summary-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.summary-fade-leave-active {
  transition: all 0.2s ease;
}
.summary-fade-enter-from,
.summary-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.ready-row {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.06), rgba(13, 148, 136, 0.06));
  border: 1px solid rgba(79, 70, 229, 0.12);
  border-radius: 14px;
  padding: 14px 16px;
  position: relative;
  overflow: hidden;
}
.ready-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 13px;
  background: linear-gradient(135deg, $indigo, $indigo-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.3);
}
.ready-body {
  flex: 1;
}
.ready-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: $text-main;
}
.ready-sub {
  font-size: 0.76rem;
  color: $text-muted;
  margin-top: 2px;
}
.ready-dots {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.ready-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $indigo-mid;
  opacity: 0.15;
  @for $i from 1 through 8 {
    &:nth-child(#{$i}) {
      animation: dotBlink 1.4s #{($i - 1) * 0.1}s infinite;
    }
  }
}
@keyframes dotBlink {
  0%,
  100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.25);
  }
}

// ─── Action Bar ───────────────────────────────────────────────────────────────
.action-bar {
  display: flex;
  gap: 12px;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0 0.25rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.action-btn {
  flex: 1;
  padding: 0.85rem 1.5rem !important;
  border-radius: 14px !important;
  font-family: 'Noto Sans Thai', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  transition:
    transform 0.2s,
    box-shadow 0.2s !important;

  &:hover {
    transform: translateY(-2px) !important;
  }
  &:active {
    transform: translateY(0) !important;
  }

  &--back {
    background: linear-gradient(135deg, #1e1b4b 0%, $indigo 55%, $indigo-mid 100%) !important;
    color: white !important;
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.35) !important;
    &:hover {
      box-shadow: 0 10px 28px rgba(79, 70, 229, 0.45) !important;
    }
  }

  &--festival {
    background: rgba(234, 88, 12, 0.07) !important;
    color: #ea580c !important;
    border: 1.5px solid rgba(234, 88, 12, 0.2) !important;
    &:hover {
      background: rgba(234, 88, 12, 0.13) !important;
      box-shadow: 0 4px 16px rgba(234, 88, 12, 0.1) !important;
    }
  }

  &--edit {
    background: linear-gradient(135deg, #1e1b4b 0%, $indigo 55%, $indigo-mid 100%) !important;
    color: white !important;
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.35) !important;
    &:hover {
      box-shadow: 0 10px 28px rgba(79, 70, 229, 0.45) !important;
    }
  }
}

// ─── Transitions ──────────────────────────────────────────────────────────────
.tab-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.tab-fade-leave-active {
  transition: all 0.15s ease;
}
.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
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

// ─── Notify ───────────────────────────────────────────────────────────────────
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
    padding: 1.5rem 1rem 0;
  }
  .content-wrap {
    padding: 0 0.75rem 3rem;
  }
  .admin-card {
    padding: 1.1rem;
  }
  .profile-card-body {
    padding: 1.1rem;
  }
  .hero-left {
    gap: 10px;
  }
  .hero-icon-wrap {
    width: 46px;
    height: 46px;
  }
  .hero-tabs {
    width: 100%;
  }
  .hero-tab {
    flex: 1;
    justify-content: center;
    padding: 10px 12px;
    font-size: 0.8rem;
  }
  .ready-dots {
    display: none;
  }
  .profile-stats {
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
  }
  .stat-divider {
    display: none;
  }
  .stat-item {
    min-width: calc(33% - 8px);
  }
}

// ─── Particles ────────────────────────────────────────────────────────────────
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
