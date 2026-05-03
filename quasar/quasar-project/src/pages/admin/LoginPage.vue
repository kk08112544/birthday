<template>
  <q-page class="login-page">
    <div class="bg-blob bg-blob-1" />
    <div class="bg-blob bg-blob-2" />
    <div class="bg-blob bg-blob-3" />

    <div class="login-center">
      <div class="login-card">
        <!-- Brand -->
        <div class="brand-section">
          <div class="brand-icon-wrap">
            <q-icon name="celebration" size="2rem" color="white" />
          </div>
          <div class="brand-title">Festival Greeting LDD</div>
          <div class="brand-sub">ระบบบริหารจัดการอวยพร กรมพัฒนาที่ดิน</div>
        </div>

        <!-- Divider -->
        <div class="card-divider">
          <span class="card-divider-text">เข้าสู่ระบบแอดมิน</span>
        </div>

        <!-- Form -->
        <q-form @submit.prevent="onSubmit" class="login-form">
          <div class="field-wrap">
            <label class="field-label">ชื่อผู้ใช้</label>
            <q-input
              v-model="userName"
              type="text"
              outlined
              dense
              placeholder="กรอกชื่อผู้ใช้"
              class="styled-input"
              :rules="[(val) => !!val || 'กรุณากรอกชื่อผู้ใช้']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="person_outline" color="red-8" size="20px" />
              </template>
            </q-input>
          </div>

          <div class="field-wrap">
            <label class="field-label">รหัสผ่าน</label>
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              outlined
              dense
              placeholder="กรอกรหัสผ่าน"
              class="styled-input"
              :rules="[(val) => !!val || 'กรุณากรอกรหัสผ่าน']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="red-8" size="20px" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  color="grey-5"
                  size="20px"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <button
            type="submit"
            class="login-btn"
            :class="{ 'login-btn--loading': loading }"
            :disabled="loading"
          >
            <span v-if="!loading" class="login-btn-inner">
              <q-icon name="login" size="18px" />
              เข้าสู่ระบบ
            </span>
            <span v-else class="login-btn-inner">
              <q-circular-progress indeterminate size="18px" color="white" />
              กำลังเข้าสู่ระบบ...
            </span>
          </button>
        </q-form>

        <div class="card-note">
          <q-icon name="info_outline" size="13px" class="q-mr-xs" />
          สำหรับผู้ดูแลระบบเท่านั้น
        </div>
      </div>
    </div>
    <!-- ===== AUTH RESULT DIALOG ===== -->
    <q-dialog v-model="authDialog">
      <div class="auth-dialog">
        <div
          class="auth-dialog-header"
          :class="authDialogSuccess ? 'auth-dialog-header--success' : 'auth-dialog-header--error'"
        >
          <div class="auth-dialog-header-icon">
            <q-icon
              :name="authDialogSuccess ? 'check_circle' : 'error_outline'"
              size="1.6rem"
              color="white"
            />
          </div>
          <div>
            <div class="auth-dialog-title">
              {{ authDialogSuccess ? 'เข้าสู่ระบบสำเร็จ' : 'เข้าสู่ระบบไม่สำเร็จ' }}
            </div>
            <div class="auth-dialog-sub">
              {{ authDialogSuccess ? 'กำลังนำท่านเข้าสู่ระบบ...' : 'กรุณาตรวจสอบข้อมูลอีกครั้ง' }}
            </div>
          </div>
        </div>

        <div class="auth-dialog-body">
          <div class="auth-dialog-emoji">
            {{ authDialogSuccess ? '🎉' : '🔐' }}
          </div>
          <p class="auth-dialog-msg">{{ authDialogMessage }}</p>
        </div>

        <!-- key บังคับ re-mount ทุกครั้งที่เปิด dialog ใหม่ -->
        <div
          :key="authDialogMessage"
          class="auth-dialog-progress"
          :class="
            authDialogSuccess ? 'auth-dialog-progress--success' : 'auth-dialog-progress--error'
          "
          :style="{ animationDuration: authDialogSuccess ? '1.8s' : '2.5s' }"
        />
      </div>
    </q-dialog>
    <teleport to="body">
      <div class="click-particles-root">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
// import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import type { AxiosError } from 'axios';

// const $q     = useQuasar();
const router = useRouter();

const userName = ref('');
const password = ref('');
const isPwd = ref(true);
const loading = ref(false);

// ===== Auth Dialog =====
const authDialog = ref(false);
const authDialogSuccess = ref(false);
const authDialogMessage = ref('');

const openAuthDialog = (success: boolean, message: string) => {
  authDialogSuccess.value = success;
  authDialogMessage.value = message;
  authDialog.value = true;

  setTimeout(
    () => {
      authDialog.value = false;
      if (success) void router.push('/admin/festival');
    },
    success ? 1800 : 2500,
  );
};
const onSubmit = async () => {
  loading.value = true;
  try {
    const response = await api.post('/auth/login', {
      userName: userName.value,
      password: password.value,
    });

    const { accessToken, refreshToken, uId, firstName, userName: uName } = response.data.user.user;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', uId);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('username', uName);

    if (response.status === 201) {
      openAuthDialog(true, response.data.message || 'เข้าสู่ระบบสำเร็จ');
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const errorResponse = error.response;
    // const msg = errorResponse?.status === 404
    //   ? (errorResponse.data?.message);
    let msg = '';

    if (errorResponse?.status === 404) {
      msg = errorResponse?.data?.message;
    }

    openAuthDialog(false, msg);
  } finally {
    loading.value = false;
  }
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

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Sarabun:wght@400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ============================================================
// TOKENS — Rose/Gold palette
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

// ============================================================
// PAGE — bg โทน rose อ่อน
// ============================================================
.login-page {
  font-family: 'Noto Sans Thai', 'Sarabun', sans-serif;
  background: linear-gradient(150deg, #fff1f2 0%, #fdf4ff 50%, #fff7ed 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

// ============================================================
// BLOBS — rose / gold / amber
// ============================================================
.bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
}

.bg-blob-1 {
  width: 420px;
  height: 420px;
  background: rgba(251, 113, 133, 0.18); // $rose-light
  top: -110px;
  left: -110px;
  animation: drift 9s ease-in-out infinite;
}

.bg-blob-2 {
  width: 300px;
  height: 300px;
  background: rgba(251, 191, 36, 0.14); // $gold-light
  bottom: -80px;
  right: -60px;
  animation: drift 11s ease-in-out infinite reverse;
}

.bg-blob-3 {
  width: 200px;
  height: 200px;
  background: rgba(190, 18, 60, 0.1); // $rose
  top: 38%;
  left: 62%;
  animation: drift 7s ease-in-out infinite 2s;
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.06);
  }
}

// ============================================================
// CENTER
// ============================================================
.login-center {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  padding: 1rem;
  animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ============================================================
// CARD — shadow โทน rose
// ============================================================
.login-card {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem 2rem 1.5rem;
  box-shadow:
    0 8px 40px rgba(190, 18, 60, 0.14),
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(190, 18, 60, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.7);

  @media (max-width: 480px) {
    border-radius: 20px;
    padding: 1.5rem 1.25rem 1.25rem;
  }
}

// ============================================================
// BRAND — icon gradient rose
// ============================================================
.brand-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 1.5rem;
}

.brand-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, #7f1d1d 0%, $rose-mid 50%, #db2777 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 6px 24px rgba(190, 18, 60, 0.38),
    0 0 0 4px rgba(251, 113, 133, 0.14);
  margin-bottom: 4px;
  animation: icon-pop 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both 0.1s;
}

@keyframes icon-pop {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  80% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.brand-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: $text-main;
  letter-spacing: -0.01em;
}

.brand-sub {
  font-size: 0.78rem;
  color: $text-muted;
  text-align: center;
  line-height: 1.4;
}

// ============================================================
// DIVIDER — rose tint
// ============================================================
.card-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.25rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(190, 18, 60, 0.12);
  }
}

.card-divider-text {
  font-size: 0.72rem;
  font-weight: 600;
  color: $text-muted;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

// ============================================================
// FORM
// ============================================================
.login-form {
  display: flex;
  flex-direction: column;
}

.field-wrap {
  margin-bottom: 1rem;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: $text-main;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}

.styled-input {
  :deep(.q-field__control) {
    border-radius: 12px !important;
    background: rgba(255, 241, 242, 0.7); // rose-50 อ่อนๆ
    transition: box-shadow 0.2s;
  }

  :deep(.q-field--focused .q-field__control) {
    box-shadow: 0 0 0 3px rgba(190, 18, 60, 0.14) !important;
  }
}

// ============================================================
// BUTTON — gradient rose เหมือน festival-header
// ============================================================
.login-btn {
  width: 100%;
  padding: 13px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #7f1d1d 0%, $rose-mid 50%, #db2777 100%);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(190, 18, 60, 0.38);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    opacity 0.2s;
  margin-top: 0.5rem;
  letter-spacing: 0.01em;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(190, 18, 60, 0.48);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &--loading,
  &:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
}

.login-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

// ============================================================
// NOTE
// ============================================================
.card-note {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
  font-size: 0.72rem;
  color: $text-muted;
}

// ============================================================
// AUTH DIALOG
// ============================================================
.auth-dialog {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 340px;
  max-width: 92vw;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
}

.auth-dialog-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;

  &--success {
    background: linear-gradient(135deg, #14532d, #16a34a);
  }
  &--error {
    background: linear-gradient(135deg, #7f1d1d, #dc2626);
  }
}

.auth-dialog-header-icon {
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

.auth-dialog-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.auth-dialog-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}

.auth-dialog-body {
  padding: 1.5rem 1.5rem 0.75rem;
  text-align: center;
}

.auth-dialog-emoji {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  display: block;
  animation: authPop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes authPop {
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

.auth-dialog-msg {
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0;
  line-height: 1.6;

  // สีตาม state — ใช้ parent selector trick ผ่าน Vue class binding ไม่ได้ใน scoped
  // จึงใช้ color default แล้วให้ header บอก context
  color: #374151;
  background: #f3f4f6;
}

.auth-dialog-footer {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  justify-content: center;
}

.auth-dialog-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 28px;
  border-radius: 12px;
  border: none;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.18s,
    box-shadow 0.18s;
  color: white;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.97);
  }

  &--success {
    background: linear-gradient(135deg, #14532d, #16a34a);
    box-shadow: 0 4px 16px rgba(22, 163, 74, 0.35);
    &:hover {
      box-shadow: 0 6px 22px rgba(22, 163, 74, 0.45);
    }
  }

  &--error {
    background: linear-gradient(135deg, #7f1d1d, #dc2626);
    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.35);
    &:hover {
      box-shadow: 0 6px 22px rgba(220, 38, 38, 0.45);
    }
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
