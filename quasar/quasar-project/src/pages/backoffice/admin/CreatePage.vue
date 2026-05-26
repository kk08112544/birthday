<template>
  <q-page class="create-admin-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="person_add" size="1.8rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">สร้างผู้ดูแลระบบ</h1>
            <p class="hero-sub">เพิ่มผู้ดูแลระบบพร้อมกำหนดสิทธิ์การเข้าถึง</p>
          </div>
        </div>
        <div class="hero-actions">
          <q-btn
            unelevated
            icon="arrow_back"
            label="กลับรายการ"
            to="/backoffice/admin"
            class="hero-back-btn"
            :class="$q.screen.xs ? 'full-width q-mt-sm' : ''"
          />
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <div class="form-container">
        <!-- ===== CARD: ข้อมูลหน่วยงาน ===== -->
        <div class="admin-card animate-in" style="animation-delay: 0.05s">
          <div class="card-label">
            <span class="label-dot" />
            ข้อมูลหน่วยงาน
          </div>

          <!-- AGENCY ABBR (firstName) -->
          <div ref="firstNameRef" class="field-group">
            <label class="form-label">
              ชื่อย่อหน่วยงาน <span class="form-required">*</span>
              <span class="form-hint">( 2–5 ตัวอักษร )</span>
            </label>
            <div class="abbr-input-wrap">
              <q-input
                v-model="form.firstName"
                outlined
                dense
                placeholder="เช่น IT, กสก, สบก"
                maxlength="5"
                :error="firstNameError"
                error-message=" "
                hide-bottom-space
                class="form-input"
                bg-color="white"
                @update:model-value="onFirstNameChange"
              >
                <template v-slot:prepend>
                  <q-icon name="business" color="indigo-5" />
                </template>
              </q-input>
              <!-- Live preview badge -->
              <transition name="badge-pop">
                <div v-if="form.firstName" class="abbr-badge">
                  <div class="abbr-badge-avatar">
                    {{ form.firstName.trim().charAt(0).toUpperCase() }}
                  </div>
                  <div class="abbr-badge-label">ตัวอย่างอักษรย่อ</div>
                </div>
              </transition>
            </div>
            <transition name="err-fade">
              <div v-if="firstNameError" class="error-msg">
                <q-icon name="error_outline" size="14px" />
                {{ firstNameErrorMsg }}
              </div>
            </transition>
          </div>

          <!-- EMAIL PREFIX -->
          <div ref="emailRef" class="q-mt-md field-group">
            <label class="form-label">
              อีเมล <span class="form-required">*</span>
              <span class="form-hint">( ระบบจะเติม @ldd.go.th ให้อัตโนมัติ )</span>
            </label>
            <q-input
              v-model="form.emailPrefix"
              outlined
              dense
              placeholder="เช่น it.admin"
              :error="emailError"
              error-message=" "
              hide-bottom-space
              class="form-input"
              bg-color="white"
              @update:model-value="onEmailPrefixChange"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="indigo-5" />
              </template>
              <template v-slot:append>
                <div class="email-domain-tag">@ldd.go.th</div>
              </template>
            </q-input>
            <transition name="err-fade">
              <div v-if="emailError" class="error-msg">
                <q-icon name="error_outline" size="14px" />
                {{ emailErrorMsg }}
              </div>
            </transition>
            <!-- Email preview -->
            <transition name="err-fade">
              <div v-if="form.emailPrefix && !emailError" class="email-preview">
                <q-icon name="check_circle" size="14px" color="teal-6" />
                อีเมลที่จะใช้: <strong>{{ form.emailPrefix.trim() }}@ldd.go.th</strong>
              </div>
            </transition>
          </div>

          <!-- PHONE (4 digits) -->
          <div ref="phoneRef" class="q-mt-md field-group">
            <label class="form-label">
              เบอร์โทรศัพท์ภายใน
              <span class="form-hint">( 4 หลัก )</span>
            </label>
            <q-input
              v-model="form.phoneNumber"
              outlined
              dense
              placeholder="เช่น 1234"
              maxlength="4"
              :error="phoneError"
              error-message=" "
              hide-bottom-space
              class="form-input"
              bg-color="white"
              @update:model-value="onPhoneChange"
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="indigo-5" />
              </template>
              <template v-slot:append>
                <div
                  class="phone-counter"
                  :class="{ 'phone-counter--full': form.phoneNumber.length === 4 }"
                >
                  {{ form.phoneNumber.length }}/4
                </div>
              </template>
            </q-input>
            <transition name="err-fade">
              <div v-if="phoneError" class="error-msg">
                <q-icon name="error_outline" size="14px" />
                {{ phoneErrorMsg }}
              </div>
            </transition>
          </div>
        </div>

        <!-- ===== CARD: วันเกิด ===== -->
        <div ref="dobRef" class="admin-card animate-in field-group" style="animation-delay: 0.1s">
          <div class="card-label">
            <span class="label-dot label-dot--teal" />
            วันเกิด <span class="form-hint q-ml-xs">( ไม่บังคับ )</span>
          </div>

          <!-- Date summary chip -->
          <div class="date-summary-row">
            <div
              class="date-chip"
              :class="{
                'date-chip--active': form.dateOfBirth,
              }"
            >
              <div class="date-chip-icon">
                <q-icon name="cake" size="14px" />
              </div>
              <div class="date-chip-body">
                <div class="date-chip-label">วันเกิด</div>
                <div class="date-chip-value">
                  {{ form.dateOfBirth ? formatDateThai(form.dateOfBirth) : 'ยังไม่ได้เลือก' }}
                </div>
              </div>
              <button
                v-if="form.dateOfBirth"
                class="date-chip-clear"
                type="button"
                @click="form.dateOfBirth = ''"
              >
                <q-icon name="close" size="12px" />
              </button>
            </div>

            <!-- Manual input -->
            <q-input
              v-model="form.dateOfBirth"
              outlined
              dense
              placeholder="YYYY/MM/DD"
              class="form-input dob-input"
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="edit_calendar" color="teal-6" size="18px" />
              </template>
              <template v-slot:append>
                <q-icon name="event" color="teal-6" size="18px" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="form.dateOfBirth"
                      mask="YYYY/MM/DD"
                      color="teal-6"
                      text-color="white"
                      flat
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="ตกลง" color="teal-6" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Calendar -->
          <div class="cal-wrapper q-mt-md">
            <q-date
              v-model="form.dateOfBirth"
              mask="YYYY/MM/DD"
              color="teal-6"
              text-color="white"
              flat
              minimal
              class="admin-calendar"
            />
          </div>
        </div>

        <!-- ===== CARD: สรุปข้อมูล ===== -->
        <transition name="summary-fade">
          <div
            v-if="hasSummary"
            class="admin-card animate-in summary-card"
            style="animation-delay: 0.15s"
          >
            <div class="card-label">
              <span class="label-dot label-dot--amber" />
              สรุปข้อมูลก่อนบันทึก
            </div>
            <div class="summary-grid">
              <div class="summary-item">
                <div
                  class="summary-item-icon"
                  style="background: linear-gradient(135deg, #3730a3, #4f46e5)"
                >
                  <q-icon name="business" color="white" size="16px" />
                </div>
                <div class="summary-item-body">
                  <div class="summary-item-label">ชื่อย่อหน่วยงาน</div>
                  <div class="summary-item-value">{{ form.firstName || '—' }}</div>
                </div>
              </div>
              <div class="summary-item">
                <div
                  class="summary-item-icon"
                  style="background: linear-gradient(135deg, #0f766e, #0d9488)"
                >
                  <q-icon name="email" color="white" size="16px" />
                </div>
                <div class="summary-item-body">
                  <div class="summary-item-label">อีเมล</div>
                  <div class="summary-item-value">
                    {{ form.emailPrefix ? form.emailPrefix.trim() + '@ldd.go.th' : '—' }}
                  </div>
                </div>
              </div>
              <div class="summary-item">
                <div
                  class="summary-item-icon"
                  style="background: linear-gradient(135deg, #92400e, #d97706)"
                >
                  <q-icon name="phone" color="white" size="16px" />
                </div>
                <div class="summary-item-body">
                  <div class="summary-item-label">เบอร์โทรภายใน</div>
                  <div class="summary-item-value">{{ form.phoneNumber || '—' }}</div>
                </div>
              </div>
              <div class="summary-item">
                <div
                  class="summary-item-icon"
                  style="background: linear-gradient(135deg, #065f46, #16a34a)"
                >
                  <q-icon name="cake" color="white" size="16px" />
                </div>
                <div class="summary-item-body">
                  <div class="summary-item-label">วันเกิด</div>
                  <div class="summary-item-value">
                    {{ form.dateOfBirth ? formatDateThai(form.dateOfBirth) : '—' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- ===== SUBMIT ===== -->
        <div class="animate-in" style="animation-delay: 0.2s">
          <button
            type="button"
            class="submit-btn"
            :class="{ 'submit-btn--loading': loading }"
            :disabled="loading"
            @click="submitCreate"
          >
            <span v-if="!loading" class="submit-btn-inner">
              <q-icon name="check_circle" size="20px" />
              บันทึกผู้ใช้แลระบบ
            </span>
            <span v-else class="submit-btn-inner">
              <q-circular-progress indeterminate size="20px" color="white" />
              กำลังบันทึก...
            </span>
          </button>
        </div>
      </div>
    </div>

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
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import type { AxiosError } from 'axios';

// ─── Constants ────────────────────────────────────────────────────────────────
const NOTIFY_DURATION = 2500;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  style: Record<string, string>;
}
type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

// ─── Quasar / Router ──────────────────────────────────────────────────────────
const $q = useQuasar();
const router = useRouter();

// ─── Form State ───────────────────────────────────────────────────────────────
const form = ref({
  firstName: '',
  emailPrefix: '',
  phoneNumber: '',
  dateOfBirth: '',
});

const loading = ref(false);

// ─── Error States (แบบเดียวกับ festival) ──────────────────────────────────────
const firstNameError = ref(false);
const firstNameErrorMsg = ref('');
const emailError = ref(false);
const emailErrorMsg = ref('');
const phoneError = ref(false);
const phoneErrorMsg = ref('');

// ─── Scroll Target Refs ───────────────────────────────────────────────────────
const firstNameRef = ref<HTMLElement | null>(null);
const emailRef = ref<HTMLElement | null>(null);
const phoneRef = ref<HTMLElement | null>(null);
const dobRef = ref<HTMLElement | null>(null);

// ─── Notify State ─────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
const notifyKey = ref(0);
let notifyTimer: ReturnType<typeof setTimeout> | null = null;

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Computed ─────────────────────────────────────────────────────────────────
const hasSummary = computed(
  () =>
    form.value.firstName ||
    form.value.emailPrefix ||
    form.value.phoneNumber ||
    form.value.dateOfBirth,
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDateThai = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(/\//g, '-'));
  if (isNaN(d.getTime())) return dateStr;
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

const openNotify = (success: boolean, message: string) => {
  if (notifyTimer) clearTimeout(notifyTimer);
  notifySuccess.value = success;
  notifyMessage.value = message;
  notifyKey.value++;
  showNotifyDialog.value = true;
  notifyTimer = setTimeout(() => {
    showNotifyDialog.value = false;
    if (success) void router.push('/backoffice/admin');
  }, NOTIFY_DURATION);
};

// ─── Field Handlers ───────────────────────────────────────────────────────────
const onFirstNameChange = (val: string | number | null) => {
  if (typeof val !== 'string') return;
  form.value.firstName = Array.from(val).slice(0, 5).join('');
  const nameLen = Array.from(form.value.firstName.trim()).length;
  if (!form.value.firstName.trim()) {
    firstNameError.value = false;
    firstNameErrorMsg.value = '';
  } else if (nameLen < 2) {
    firstNameError.value = true;
    firstNameErrorMsg.value = 'ชื่อย่อต้องมีอย่างน้อย 2 ตัวอักษร';
  } else {
    firstNameError.value = false;
    firstNameErrorMsg.value = '';
  }
};

const onEmailPrefixChange = (val: string | number | null) => {
  if (typeof val !== 'string') return;
  form.value.emailPrefix = val.replace(/@.*/g, '');
  if (!form.value.emailPrefix.trim()) {
    emailError.value = false;
    emailErrorMsg.value = '';
  } else if (!/^[^\s@]+$/.test(form.value.emailPrefix.trim())) {
    emailError.value = true;
    emailErrorMsg.value = 'รูปแบบอีเมลไม่ถูกต้อง (ห้ามมีช่องว่างหรืออักขระพิเศษ)';
  } else {
    emailError.value = false;
    emailErrorMsg.value = '';
  }
};

const onPhoneChange = (val: string | number | null) => {
  if (typeof val !== 'string') return;
  form.value.phoneNumber = val.replace(/\D/g, '').slice(0, 4);
  if (!form.value.phoneNumber) {
    phoneError.value = false;
    phoneErrorMsg.value = '';
  } else if (!/^\d{4}$/.test(form.value.phoneNumber)) {
    phoneError.value = true;
    phoneErrorMsg.value = 'เบอร์โทรต้องเป็นตัวเลข 4 หลัก';
  } else {
    phoneError.value = false;
    phoneErrorMsg.value = '';
  }
};

// ─── Validation (แบบเดียวกับ festival) ───────────────────────────────────────
const validateAndScroll = async (): Promise<boolean> => {
  // Reset ทุก error ก่อน
  firstNameError.value = false;
  firstNameErrorMsg.value = '';
  emailError.value = false;
  emailErrorMsg.value = '';
  phoneError.value = false;
  phoneErrorMsg.value = '';

  let hasError = false;

  // Validate firstName
  const nameLen = Array.from(form.value.firstName.trim()).length;
  if (!form.value.firstName.trim()) {
    firstNameError.value = true;
    firstNameErrorMsg.value = 'กรุณากรอกชื่อย่อหน่วยงาน';
    hasError = true;
  } else if (nameLen < 2) {
    firstNameError.value = true;
    firstNameErrorMsg.value = 'ชื่อย่อต้องมีอย่างน้อย 2 ตัวอักษร';
    hasError = true;
  }

  // Validate email prefix
  if (!form.value.emailPrefix.trim()) {
    emailError.value = true;
    emailErrorMsg.value = 'กรุณากรอกอีเมล';
    hasError = true;
  } else if (!/^[^\s@]+$/.test(form.value.emailPrefix.trim())) {
    emailError.value = true;
    emailErrorMsg.value = 'รูปแบบอีเมลไม่ถูกต้อง (ห้ามมีช่องว่างหรืออักขระพิเศษ)';
    hasError = true;
  }

  // Validate phone (optional)
  if (form.value.phoneNumber && !/^\d{4}$/.test(form.value.phoneNumber)) {
    phoneError.value = true;
    phoneErrorMsg.value = 'เบอร์โทรต้องเป็นตัวเลข 4 หลัก';
    hasError = true;
  }

  if (hasError) {
    await nextTick();
    const targets = [
      { valid: !firstNameError.value, el: firstNameRef.value },
      { valid: !emailError.value, el: emailRef.value },
      { valid: !phoneError.value, el: phoneRef.value },
    ];
    targets.find((t) => !t.valid)?.el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return !hasError;
};

// ─── Submit ───────────────────────────────────────────────────────────────────
const submitCreate = async () => {
  const isValid = await validateAndScroll();
  if (!isValid) return;

  loading.value = true;
  try {
    // เติม @ldd.go.th อัตโนมัติตอน submit
    const fullEmail = `${form.value.emailPrefix.trim()}@ldd.go.th`;

    const payload: Record<string, string> = {
      firstName: form.value.firstName.trim(),
      email: fullEmail,
    };
    if (form.value.phoneNumber) payload.phoneNumber = form.value.phoneNumber;
    if (form.value.dateOfBirth) payload.password = form.value.dateOfBirth;

    const response = await api.post('/backoffice/admin', payload);
    openNotify(true, response.data.message);
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
  } finally {
    loading.value = false;
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

onMounted(() => document.addEventListener('click', handleGlobalClick));
onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (notifyTimer) clearTimeout(notifyTimer);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
$indigo: #3730a3;
$indigo-mid: #4f46e5;
$indigo-soft: #eef2ff;
$teal: #0d9488;
$teal-soft: #ccfbf1;
$amber: #d97706;
$amber-soft: #fef3c7;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$surface: #ffffff;
$surface-2: #f8f7ff;
$text-main: #1e1b4b;
$text-muted: #9ca3af;
$radius: 18px;
$error-red: #dc2626;

// ─── Page ─────────────────────────────────────────────────────────────────────
.create-admin-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(155deg, #eef2ff 0%, #f0f9ff 50%, #f0fdf4 100%);
  min-height: 100vh;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
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
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
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

// ─── Form Labels ──────────────────────────────────────────────────────────────
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

// ซ่อน built-in error message ของ Quasar (เราใช้ custom .error-msg แทน)
.form-input :deep(.q-field__messages) {
  display: none !important;
}

// บังคับกรอบแดงเมื่อ error state
.form-input :deep(.q-field--error .q-field__control:before) {
  border-color: $error-red !important;
}
.form-input :deep(.q-field--error .q-field__control:after) {
  border-color: $error-red !important;
}

// ─── Error (แบบเดียวกับ festival) ─────────────────────────────────────────────
.error-msg {
  display: flex;
  align-items: center;
  gap: 5px;
  color: $error-red;
  font-size: 0.78rem;
  font-weight: 500;
  margin-top: 6px;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-4px);
  }
  80% {
    transform: translateX(4px);
  }
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

// ─── Abbr input row ───────────────────────────────────────────────────────────
.abbr-input-wrap {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;

  .form-input {
    flex: 1;
    min-width: 160px;
  }
}

.abbr-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.abbr-badge-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e1b4b, $indigo-mid);
  color: #fff;
  font-family: 'Prompt', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.3);
  letter-spacing: 0.05em;
}

.abbr-badge-label {
  font-size: 0.65rem;
  color: $text-muted;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.badge-pop-leave-active {
  transition: all 0.2s ease;
}
.badge-pop-enter-from,
.badge-pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

// ─── Email domain tag ─────────────────────────────────────────────────────────
.email-domain-tag {
  font-size: 0.7rem;
  font-weight: 700;
  color: $teal;
  background: rgba(13, 148, 136, 0.1);
  border: 1px solid rgba(13, 148, 136, 0.2);
  border-radius: 20px;
  padding: 2px 10px;
  white-space: nowrap;
}

// ─── Email preview ────────────────────────────────────────────────────────────
.email-preview {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  font-size: 0.78rem;
  color: $text-muted;

  strong {
    color: $teal;
    font-weight: 700;
  }
}

// ─── Phone counter ────────────────────────────────────────────────────────────
.phone-counter {
  font-size: 0.72rem;
  font-weight: 700;
  color: $text-muted;
  transition: color 0.2s;

  &--full {
    color: $teal;
  }
}

// ─── Date section ─────────────────────────────────────────────────────────────
.date-summary-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.date-chip {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0.65rem 1rem;
  border-radius: 14px;
  background: rgba(79, 70, 229, 0.03);
  border: 1.5px dashed rgba(79, 70, 229, 0.2);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  min-width: 140px;

  &--active {
    background: rgba(13, 148, 136, 0.05);
    border-style: solid;
    border-color: $teal;
    box-shadow: 0 4px 16px rgba(13, 148, 136, 0.12);
    .date-chip-value {
      color: $text-main;
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
  background: linear-gradient(135deg, #065f46, $teal);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(13, 148, 136, 0.28);
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

.date-chip-clear {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  flex-shrink: 0;
  background: rgba(13, 148, 136, 0.1);
  color: $text-muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    transform 0.15s;
  &:hover {
    background: rgba(220, 38, 38, 0.15);
    color: $red;
    transform: scale(1.1);
  }
}

.dob-input {
  flex: 1;
  min-width: 160px;
}

.cal-wrapper {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(13, 148, 136, 0.1);
  border: 2px solid rgba(13, 148, 136, 0.15);
  transition: box-shadow 0.25s;
  &:hover {
    box-shadow: 0 8px 32px rgba(13, 148, 136, 0.18);
  }
}

.admin-calendar {
  width: 100% !important;
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

// ─── Summary Card ─────────────────────────────────────────────────────────────
.summary-card {
  background: linear-gradient(135deg, #f8f7ff, #f0f9ff);
  border-color: rgba(79, 70, 229, 0.15);
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: $surface;
  border-radius: 14px;
  border: 1px solid rgba(79, 70, 229, 0.07);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(79, 70, 229, 0.1);
  }
}

.summary-item-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.summary-item-body {
  min-width: 0;
}

.summary-item-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: $text-muted;
  margin-bottom: 2px;
}

.summary-item-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: $text-main;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

// ─── Submit ───────────────────────────────────────────────────────────────────
.submit-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #1e1b4b 0%, $indigo 55%, $indigo-mid 100%);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(79, 70, 229, 0.35);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    opacity 0.2s;

  &:hover:not(.submit-btn--loading):not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(79, 70, 229, 0.42);
  }
  &:active:not(.submit-btn--loading) {
    transform: translateY(0);
  }
  &.submit-btn--loading,
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
  }
  .admin-card {
    padding: 1.1rem;
  }
  .hero-left {
    gap: 10px;
  }
  .hero-icon-wrap {
    width: 46px;
    height: 46px;
  }
  .date-summary-row {
    flex-direction: column;
  }
  .date-chip {
    width: 100%;
  }
  .dob-input {
    width: 100%;
  }
  .abbr-input-wrap {
    flex-direction: column;
  }
  .abbr-badge {
    flex-direction: row;
    align-items: center;
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
