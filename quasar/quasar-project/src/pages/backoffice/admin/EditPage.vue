<template>
  <q-page class="edit-admin-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="manage_accounts" size="1.8rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">แก้ไขผู้ดูแลระบบ</h1>
            <p class="hero-sub">
              {{ pageLoading ? 'กำลังโหลด...' : `แก้ไขข้อมูลของ "${originalFirstName}"` }}
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

      <!-- TAB STRIP ในส่วน hero -->
      <div class="hero-tabs-wrap">
        <div class="hero-tabs">
          <button
            class="hero-tab"
            :class="{ 'hero-tab--active': activeTab === 'info' }"
            @click="activeTab = 'info'"
          >
            <q-icon name="badge" size="16px" />
            ข้อมูลทั่วไป
          </button>
          <button
            class="hero-tab"
            :class="{ 'hero-tab--active': activeTab === 'password' }"
            @click="activeTab = 'password'"
          >
            <q-icon name="lock_reset" size="16px" />
            เปลี่ยนรหัสผ่าน
          </button>
        </div>
      </div>
    </div>

    <!-- ===== LOADING SKELETON ===== -->
    <div v-if="pageLoading" class="content-wrap">
      <div class="form-container">
        <div class="admin-card animate-in">
          <div class="skeleton-label" />
          <div class="skeleton-input" />
          <div class="skeleton-input q-mt-md" />
          <div class="skeleton-input q-mt-md" />
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div v-else class="content-wrap">
      <!-- ══════════════════════════════════════════════
           TAB: ข้อมูลทั่วไป
      ══════════════════════════════════════════════ -->
      <transition name="tab-fade" mode="out-in">
        <div v-if="activeTab === 'info'" key="info" class="form-container">
          <!-- CARD: ข้อมูลหน่วยงาน -->
          <div class="admin-card animate-in" style="animation-delay: 0.05s">
            <div class="card-label">
              <span class="label-dot" />
              ข้อมูลหน่วยงาน
            </div>

            <!-- AGENCY ABBR -->
            <div ref="firstNameRef" class="field-group">
              <label class="form-label">
                ชื่อย่อหน่วยงาน <span class="form-required">*</span>
                <span class="form-hint">( 2–5 ตัวอักษร )</span>
              </label>
              <div class="abbr-input-wrap">
                <div class="firstname-input-row">
                  <div v-if="form.firstNamePrefix" class="firstname-prefix">
                    {{ form.firstNamePrefix }}
                  </div>
                  <q-input
                    v-model="form.firstNameSuffix"
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
                </div>
                <transition name="badge-pop">
                  <div v-if="form.firstNameSuffix" class="abbr-badge">
                    <div class="abbr-badge-avatar">{{ getInitial(form.firstNameSuffix) }}</div>
                    <div class="abbr-badge-label">ตัวอย่าง</div>
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

            <!-- EMAIL -->
            <div ref="emailRef" class="q-mt-md field-group">
              <label class="form-label">
                อีเมล <span class="form-required">*</span>
                <span class="form-hint">( ระบบจะเติม @ldd.go.th อัตโนมัติ )</span>
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
                  <q-icon name="error_outline" size="14px" />{{ emailErrorMsg }}
                </div>
              </transition>
              <transition name="err-fade">
                <div v-if="form.emailPrefix && !emailError" class="email-preview">
                  <q-icon name="check_circle" size="14px" color="teal-6" />
                  อีเมลที่จะใช้: <strong>{{ form.emailPrefix.trim() }}@ldd.go.th</strong>
                </div>
              </transition>
            </div>

            <!-- PHONE -->
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
                  <q-icon name="error_outline" size="14px" />{{ phoneErrorMsg }}
                </div>
              </transition>
            </div>
          </div>

          <!-- CARD: สรุปข้อมูล -->
          <transition name="summary-fade">
            <div
              v-if="hasSummary"
              class="admin-card animate-in summary-card"
              style="animation-delay: 0.12s"
            >
              <div class="card-label">
                <span class="label-dot label-dot--amber" />
                สรุปข้อมูลก่อนบันทึก
              </div>

              <transition name="err-fade">
                <div v-if="hasChanges" class="changes-banner">
                  <q-icon name="edit_note" size="16px" />
                  มีการเปลี่ยนแปลง {{ changesCount }} รายการ
                </div>
              </transition>

              <div class="summary-grid">
                <div
                  class="summary-item"
                  :class="{ 'summary-item--changed': isFieldChanged('firstNameSuffix') }"
                >
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #3730a3, #4f46e5)"
                  >
                    <q-icon name="business" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">
                      ชื่อย่อหน่วยงาน
                      <span v-if="isFieldChanged('firstNameSuffix')" class="changed-tag"
                        >เปลี่ยน</span
                      >
                    </div>
                    <div class="summary-item-value">{{ form.firstNameSuffix || '—' }}</div>
                    <div v-if="isFieldChanged('firstNameSuffix')" class="summary-item-old">
                      เดิม: {{ originalForm.firstNameSuffix || '—' }}
                    </div>
                  </div>
                </div>

                <div
                  class="summary-item"
                  :class="{ 'summary-item--changed': isFieldChanged('emailPrefix') }"
                >
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #0f766e, #0d9488)"
                  >
                    <q-icon name="email" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">
                      อีเมล
                      <span v-if="isFieldChanged('emailPrefix')" class="changed-tag">เปลี่ยน</span>
                    </div>
                    <div class="summary-item-value">
                      {{ form.emailPrefix ? form.emailPrefix.trim() + '@ldd.go.th' : '—' }}
                    </div>
                    <div v-if="isFieldChanged('emailPrefix')" class="summary-item-old">
                      เดิม:
                      {{ originalForm.emailPrefix ? originalForm.emailPrefix + '@ldd.go.th' : '—' }}
                    </div>
                  </div>
                </div>

                <div
                  class="summary-item"
                  :class="{ 'summary-item--changed': isFieldChanged('phoneNumber') }"
                >
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #92400e, #d97706)"
                  >
                    <q-icon name="phone" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">
                      เบอร์โทรภายใน
                      <span v-if="isFieldChanged('phoneNumber')" class="changed-tag">เปลี่ยน</span>
                    </div>
                    <div class="summary-item-value">{{ form.phoneNumber || '—' }}</div>
                    <div v-if="isFieldChanged('phoneNumber')" class="summary-item-old">
                      เดิม: {{ originalForm.phoneNumber || '—' }}
                    </div>
                  </div>
                </div>

                <div class="summary-item">
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #5b21b6, #8b5cf6)"
                  >
                    <q-icon name="shield" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">บทบาท</div>
                    <div class="summary-item-value">
                      {{ getRoleLabel(readonlyInfo.role) || '—' }}
                    </div>
                  </div>
                </div>

                <div class="summary-item">
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #1e40af, #3b82f6)"
                  >
                    <q-icon name="alternate_email" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">ชื่อผู้ใช้</div>
                    <div class="summary-item-value">{{ readonlyInfo.userName || '—' }}</div>
                  </div>
                </div>

                <div class="summary-item">
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #065f46, #16a34a)"
                  >
                    <q-icon name="verified_user" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">สถานะ</div>
                    <div class="summary-item-value">
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
                </div>

                <div class="summary-item">
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #4c1d95, #7c3aed)"
                  >
                    <q-icon name="calendar_today" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">วันที่สร้าง</div>
                    <div class="summary-item-value">{{ formatDate(readonlyInfo.createdAt) }}</div>
                  </div>
                </div>

                <div class="summary-item">
                  <div
                    class="summary-item-icon"
                    style="background: linear-gradient(135deg, #0c4a6e, #0284c7)"
                  >
                    <q-icon name="update" color="white" size="16px" />
                  </div>
                  <div class="summary-item-body">
                    <div class="summary-item-label">แก้ไขล่าสุด</div>
                    <div class="summary-item-value">{{ formatDate(readonlyInfo.updatedAt) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- SUBMIT INFO -->
          <div class="animate-in" style="animation-delay: 0.2s">
            <button
              type="button"
              class="submit-btn"
              :class="{ 'submit-btn--loading': loading }"
              :disabled="loading"
              @click="submitEdit"
            >
              <span v-if="!loading" class="submit-btn-inner">
                <q-icon name="check_circle" size="20px" />บันทึกข้อมูล
              </span>
              <span v-else class="submit-btn-inner">
                <q-circular-progress indeterminate size="20px" color="white" />กำลังบันทึก...
              </span>
            </button>
          </div>
        </div>
        <!-- /tab info -->
      </transition>

      <!-- ══════════════════════════════════════════════
           TAB: เปลี่ยนรหัสผ่าน
      ══════════════════════════════════════════════ -->
      <transition name="tab-fade" mode="out-in">
        <div v-if="activeTab === 'password'" key="password" class="form-container">
          <!-- CARD: ตั้งรหัสผ่านใหม่ -->
          <div class="admin-card animate-in" style="animation-delay: 0.05s">
            <!-- Security Badge -->
            <div class="security-banner">
              <div class="security-banner-icon">
                <q-icon name="security" size="22px" color="white" />
              </div>
              <div>
                <div class="security-banner-title">โซนความปลอดภัย</div>
                <div class="security-banner-sub">รหัสผ่านถูกเข้ารหัสก่อนบันทึกทุกครั้ง</div>
              </div>
              <div class="security-shield-deco">
                <q-icon name="shield" size="56px" />
              </div>
            </div>

            <div class="card-label q-mt-md">
              <span class="label-dot" />
              ตั้งรหัสผ่านใหม่
            </div>

            <!-- PASSWORD -->
            <div ref="passwordRef" class="field-group">
              <label class="form-label">
                รหัสผ่านใหม่ <span class="form-required">*</span>
                <span class="form-hint">( อย่างน้อย 8 ตัวอักษร )</span>
              </label>
              <q-input
                v-model="pw.password"
                outlined
                dense
                placeholder="กรอกรหัสผ่านใหม่"
                :type="showPassword ? 'text' : 'password'"
                :error="passwordError"
                error-message=" "
                hide-bottom-space
                class="form-input"
                bg-color="white"
                @update:model-value="onPasswordChange"
              >
                <template v-slot:prepend>
                  <q-icon name="lock_outline" color="indigo-5" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    color="grey-5"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <!-- Strength -->
              <transition name="err-fade">
                <div v-if="pw.password" class="strength-wrap">
                  <div class="strength-bar">
                    <div
                      class="strength-fill"
                      :class="`strength-fill--${passwordStrength.level}`"
                      :style="{ width: passwordStrength.percent + '%' }"
                    />
                  </div>
                  <span class="strength-label" :class="`strength-label--${passwordStrength.level}`">
                    {{ passwordStrength.label }}
                  </span>
                </div>
              </transition>

              <!-- Checklist -->
              <transition name="err-fade">
                <div v-if="pw.password" class="pw-checklist">
                  <div
                    v-for="rule in passwordRules"
                    :key="rule.key"
                    class="pw-check-item"
                    :class="{ 'pw-check-item--pass': rule.pass }"
                  >
                    <q-icon
                      :name="rule.pass ? 'check_circle' : 'radio_button_unchecked'"
                      size="14px"
                    />
                    {{ rule.label }}
                  </div>
                </div>
              </transition>

              <transition name="err-fade">
                <div v-if="passwordError" class="error-msg">
                  <q-icon name="error_outline" size="14px" />{{ passwordErrorMsg }}
                </div>
              </transition>
            </div>

            <!-- CONFIRM PASSWORD -->
            <div ref="cpasswordRef" class="q-mt-md field-group">
              <label class="form-label">
                ยืนยันรหัสผ่านใหม่ <span class="form-required">*</span>
              </label>
              <q-input
                v-model="pw.cpassword"
                outlined
                dense
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                :type="showCPassword ? 'text' : 'password'"
                :error="cpasswordError"
                error-message=" "
                hide-bottom-space
                class="form-input"
                bg-color="white"
                @update:model-value="onCPasswordChange"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="indigo-5" />
                </template>
                <template v-slot:append>
                  <div class="append-row">
                    <transition name="match-pop">
                      <q-icon
                        v-if="pw.cpassword && !cpasswordError && pw.cpassword === pw.password"
                        name="check_circle"
                        color="teal-6"
                        size="18px"
                      />
                    </transition>
                    <q-icon
                      :name="showCPassword ? 'visibility_off' : 'visibility'"
                      color="grey-5"
                      class="cursor-pointer"
                      @click="showCPassword = !showCPassword"
                    />
                  </div>
                </template>
              </q-input>
              <transition name="err-fade">
                <div v-if="cpasswordError" class="error-msg">
                  <q-icon name="error_outline" size="14px" />{{ cpasswordErrorMsg }}
                </div>
              </transition>
              <transition name="err-fade">
                <div
                  v-if="pw.cpassword && !cpasswordError && pw.cpassword === pw.password"
                  class="match-preview"
                >
                  <q-icon name="check_circle" size="14px" color="teal-6" />
                  รหัสผ่านตรงกัน
                </div>
              </transition>
            </div>
          </div>

          <!-- CARD: พร้อมบันทึก -->
          <transition name="summary-fade">
            <div
              v-if="isPwReady"
              class="admin-card animate-in summary-card"
              style="animation-delay: 0.1s"
            >
              <div class="card-label">
                <span class="label-dot label-dot--amber" />
                พร้อมบันทึก
              </div>
              <div class="ready-row">
                <div class="ready-icon">
                  <q-icon name="shield" size="1.4rem" color="white" />
                </div>
                <div class="ready-body">
                  <div class="ready-title">รหัสผ่านพร้อมอัปเดต</div>
                  <div class="ready-sub">
                    ความแข็งแกร่ง:
                    <span
                      :class="`strength-label--${passwordStrength.level}`"
                      style="font-weight: 700"
                    >
                      {{ passwordStrength.label }}
                    </span>
                  </div>
                </div>
                <div class="ready-dots">
                  <span v-for="i in 8" :key="i" class="ready-dot" />
                </div>
              </div>
            </div>
          </transition>

          <!-- SUBMIT PASSWORD -->
          <div class="animate-in" style="animation-delay: 0.2s">
            <button
              type="button"
              class="submit-btn submit-btn--teal"
              :class="{ 'submit-btn--loading': pwLoading }"
              :disabled="pwLoading"
              @click="submitPassword"
            >
              <span v-if="!pwLoading" class="submit-btn-inner">
                <q-icon name="lock_reset" size="20px" />บันทึกรหัสผ่านใหม่
              </span>
              <span v-else class="submit-btn-inner">
                <q-circular-progress indeterminate size="20px" color="white" />กำลังบันทึก...
              </span>
            </button>
          </div>
        </div>
        <!-- /tab password -->
      </transition>
    </div>
    <!-- /content-wrap -->

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
import { useRouter, useRoute } from 'vue-router';
import type { AxiosError } from 'axios';

const NOTIFY_DURATION = 2500;

interface Particle {
  id: number;
  style: Record<string, string>;
}

interface FormState {
  firstNamePrefix: string;
  firstNameSuffix: string;
  emailPrefix: string;
  phoneNumber: string;
}

interface PwState {
  password: string;
  cpassword: string;
}

type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const adminId = computed(() => route.params.id as string);

// ── Tab ────────────────────────────────────────────────────────────────────────
const activeTab = ref<'info' | 'password'>('info');

// ── Page loading ───────────────────────────────────────────────────────────────
const pageLoading = ref(true);
const originalFirstName = ref('');

const readonlyInfo = ref({
  userName: '',
  deletedAt: null as string | null,
  createdAt: '',
  role: '',
  updatedAt: '',
});

// ── Info form ─────────────────────────────────────────────────────────────────
const form = ref<FormState>({
  firstNamePrefix: '',
  firstNameSuffix: '',
  emailPrefix: '',
  phoneNumber: '',
});
const originalForm = ref<FormState>({
  firstNamePrefix: '',
  firstNameSuffix: '',
  emailPrefix: '',
  phoneNumber: '',
});
const loading = ref(false);

const firstNameError = ref(false);
const firstNameErrorMsg = ref('');
const emailError = ref(false);
const emailErrorMsg = ref('');
const phoneError = ref(false);
const phoneErrorMsg = ref('');

const firstNameRef = ref<HTMLElement | null>(null);
const emailRef = ref<HTMLElement | null>(null);
const phoneRef = ref<HTMLElement | null>(null);

// ── Password form ─────────────────────────────────────────────────────────────
const pw = ref<PwState>({ password: '', cpassword: '' });
const pwLoading = ref(false);
const showPassword = ref(false);
const showCPassword = ref(false);

const passwordError = ref(false);
const passwordErrorMsg = ref('');
const cpasswordError = ref(false);
const cpasswordErrorMsg = ref('');

const passwordRef = ref<HTMLElement | null>(null);
const cpasswordRef = ref<HTMLElement | null>(null);

// ── Notify ────────────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
const notifyKey = ref(0);
let notifyTimer: ReturnType<typeof setTimeout> | null = null;

// ── Particles ─────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ── Info Computed ─────────────────────────────────────────────────────────────
const hasSummary = computed(
  () => form.value.firstNameSuffix || form.value.emailPrefix || form.value.phoneNumber,
);
const isFieldChanged = (field: keyof FormState) => form.value[field] !== originalForm.value[field];
const hasChanges = computed(() =>
  (Object.keys(form.value) as (keyof FormState)[]).some((f) => isFieldChanged(f)),
);
const changesCount = computed(
  () => (Object.keys(form.value) as (keyof FormState)[]).filter((f) => isFieldChanged(f)).length,
);

// ── Password Computed ─────────────────────────────────────────────────────────
const passwordRules = computed(() => {
  const p = pw.value.password;
  return [
    { key: 'length', label: 'อย่างน้อย 8 ตัวอักษร', pass: p.length >= 8 },
    { key: 'upper', label: 'ตัวพิมพ์ใหญ่ (A-Z)', pass: /[A-Z]/.test(p) },
    { key: 'lower', label: 'ตัวพิมพ์เล็ก (a-z)', pass: /[a-z]/.test(p) },
    { key: 'number', label: 'ตัวเลข (0-9)', pass: /\d/.test(p) },
    { key: 'special', label: 'อักขระพิเศษ (!@#$...)', pass: /[^A-Za-z0-9]/.test(p) },
  ];
});

const passwordStrength = computed(() => {
  const n = passwordRules.value.filter((r) => r.pass).length;
  if (n <= 1) return { level: 'weak', label: 'อ่อนมาก', percent: 20 };
  if (n === 2) return { level: 'fair', label: 'พอใช้', percent: 40 };
  if (n === 3) return { level: 'good', label: 'ดี', percent: 65 };
  if (n === 4) return { level: 'strong', label: 'แข็งแกร่ง', percent: 82 };
  return { level: 'great', label: 'ยอดเยี่ยม', percent: 100 };
});

const isPwReady = computed(
  () =>
    pw.value.password &&
    pw.value.cpassword &&
    pw.value.password === pw.value.cpassword &&
    !passwordError.value &&
    !cpasswordError.value,
);

// ── Helpers ───────────────────────────────────────────────────────────────────
const getInitial = (name: string) => {
  if (!name) return '?';
  const parts = name.split('-');
  const t = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  return (t?.trim().charAt(0) ?? '?').toUpperCase();
};
const getRoleLabel = (role: string) =>
  ({ superAdmin: 'Super Admin', admin: 'Admin' })[role] ?? role;
const formatDate = (date: string | null) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
const openNotify = (success: boolean, message: string, redirect = false) => {
  if (notifyTimer) clearTimeout(notifyTimer);
  notifySuccess.value = success;
  notifyMessage.value = message;
  notifyKey.value++;
  showNotifyDialog.value = true;
  notifyTimer = setTimeout(() => {
    showNotifyDialog.value = false;
    if (redirect) void router.push('/backoffice/admin');
  }, NOTIFY_DURATION);
};

// ── Fetch ─────────────────────────────────────────────────────────────────────
const fetchAdmin = async () => {
  pageLoading.value = true;
  try {
    const res = await api.get(`/backoffice/admin/${adminId.value}`);
    const data = res.data.admin ?? res.data;

    const fullEmail = data.email ?? '';
    const emailPrefix = fullEmail.replace('@ldd.go.th', '');
    const fullName = data.firstName ?? '';
    const dashIndex = fullName.indexOf('-');
    const firstNamePrefix = dashIndex !== -1 ? fullName.slice(0, dashIndex + 1) : '';
    const firstNameSuffix = dashIndex !== -1 ? fullName.slice(dashIndex + 1).trim() : fullName;

    const loaded: FormState = {
      firstNamePrefix,
      firstNameSuffix,
      emailPrefix,
      phoneNumber: data.phoneNumber ?? '',
    };
    form.value = { ...loaded };
    originalForm.value = { ...loaded };
    originalFirstName.value = fullName;

    readonlyInfo.value = {
      userName: data.userName ?? '',
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

// ── Info handlers ─────────────────────────────────────────────────────────────
const onFirstNameChange = (val: string | number | null) => {
  if (typeof val !== 'string') return;
  form.value.firstNameSuffix = Array.from(val).slice(0, 5).join('');
  const len = Array.from(form.value.firstNameSuffix.trim()).length;
  if (!form.value.firstNameSuffix.trim()) {
    firstNameError.value = false;
    firstNameErrorMsg.value = '';
  } else if (len < 2) {
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
    emailErrorMsg.value = 'รูปแบบอีเมลไม่ถูกต้อง';
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

// ── Password handlers ─────────────────────────────────────────────────────────
const onPasswordChange = (val: string | number | null) => {
  if (typeof val !== 'string') return;
  if (!val) {
    passwordError.value = false;
    passwordErrorMsg.value = '';
    return;
  }
  if (val.length < 8) {
    passwordError.value = true;
    passwordErrorMsg.value = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
  } else {
    passwordError.value = false;
    passwordErrorMsg.value = '';
  }
  if (pw.value.cpassword) onCPasswordChange(pw.value.cpassword);
};
const onCPasswordChange = (val: string | number | null) => {
  if (typeof val !== 'string') return;
  if (!val) {
    cpasswordError.value = false;
    cpasswordErrorMsg.value = '';
    return;
  }
  if (val !== pw.value.password) {
    cpasswordError.value = true;
    cpasswordErrorMsg.value = 'รหัสผ่านไม่ตรงกัน';
  } else {
    cpasswordError.value = false;
    cpasswordErrorMsg.value = '';
  }
};

// ── Validate Info ─────────────────────────────────────────────────────────────
const validateInfo = async () => {
  firstNameError.value = false;
  emailError.value = false;
  phoneError.value = false;
  let hasError = false;
  const nameLen = Array.from(form.value.firstNameSuffix.trim()).length;
  if (!form.value.firstNameSuffix.trim()) {
    firstNameError.value = true;
    firstNameErrorMsg.value = 'กรุณากรอกชื่อย่อหน่วยงาน';
    hasError = true;
  } else if (nameLen < 2) {
    firstNameError.value = true;
    firstNameErrorMsg.value = 'ชื่อย่อต้องมีอย่างน้อย 2 ตัวอักษร';
    hasError = true;
  }
  if (!form.value.emailPrefix.trim()) {
    emailError.value = true;
    emailErrorMsg.value = 'กรุณากรอกอีเมล';
    hasError = true;
  } else if (!/^[^\s@]+$/.test(form.value.emailPrefix.trim())) {
    emailError.value = true;
    emailErrorMsg.value = 'รูปแบบอีเมลไม่ถูกต้อง';
    hasError = true;
  }
  if (form.value.phoneNumber && !/^\d{4}$/.test(form.value.phoneNumber)) {
    phoneError.value = true;
    phoneErrorMsg.value = 'เบอร์โทรต้องเป็นตัวเลข 4 หลัก';
    hasError = true;
  }
  if (hasError) {
    await nextTick();
    [
      { valid: !firstNameError.value, el: firstNameRef.value },
      { valid: !emailError.value, el: emailRef.value },
      { valid: !phoneError.value, el: phoneRef.value },
    ]
      .find((t) => !t.valid)
      ?.el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return !hasError;
};

// ── Validate Password ─────────────────────────────────────────────────────────
const validatePw = async () => {
  passwordError.value = false;
  cpasswordError.value = false;
  let hasError = false;
  if (!pw.value.password.trim()) {
    passwordError.value = true;
    passwordErrorMsg.value = 'กรุณากรอกรหัสผ่านใหม่';
    hasError = true;
  } else if (pw.value.password.length < 8) {
    passwordError.value = true;
    passwordErrorMsg.value = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
    hasError = true;
  }
  if (!pw.value.cpassword.trim()) {
    cpasswordError.value = true;
    cpasswordErrorMsg.value = 'กรุณายืนยันรหัสผ่าน';
    hasError = true;
  } else if (pw.value.cpassword !== pw.value.password) {
    cpasswordError.value = true;
    cpasswordErrorMsg.value = 'รหัสผ่านไม่ตรงกัน';
    hasError = true;
  }
  if (hasError) {
    await nextTick();
    [
      { valid: !passwordError.value, el: passwordRef.value },
      { valid: !cpasswordError.value, el: cpasswordRef.value },
    ]
      .find((t) => !t.valid)
      ?.el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return !hasError;
};

// ── Submit Info ───────────────────────────────────────────────────────────────
const submitEdit = async () => {
  if (!(await validateInfo())) return;
  loading.value = true;
  try {
    const payload: Record<string, string> = {
      firstName: form.value.firstNameSuffix.trim(),
      email: `${form.value.emailPrefix.trim()}@ldd.go.th`,
    };
    if (form.value.phoneNumber) payload.phoneNumber = form.value.phoneNumber;
    const res = await api.patch(`/backoffice/admin/${adminId.value}`, payload);
    openNotify(true, res.data.message, true);
  } catch (err: unknown) {
    const e = err as AxiosError<{ message: string }>;
    openNotify(false, e.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
  } finally {
    loading.value = false;
  }
};

// ── Submit Password ───────────────────────────────────────────────────────────
const submitPassword = async () => {
  if (!(await validatePw())) return;
  pwLoading.value = true;
  try {
    const res = await api.patch(`/backoffice/admin/password/${adminId.value}`, {
      password: pw.value.password,
      cpassword: pw.value.cpassword,
    });
    openNotify(true, res.data.message, true);
  } catch (err: unknown) {
    const e = err as AxiosError<{ message: string }>;
    openNotify(false, e.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
  } finally {
    pwLoading.value = false;
  }
};

// ── Particles ─────────────────────────────────────────────────────────────────
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

// ─── Tokens ───────────────────────────────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────────────────────────
.edit-admin-page {
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

// ─── Hero Tabs ────────────────────────────────────────────────────────────────
.hero-tabs-wrap {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 1.5rem auto 0;
  padding: 0;
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
  &--amber {
    background: $amber;
  }
}

.field-group {
  scroll-margin-top: 80px;
}

// ─── Labels ───────────────────────────────────────────────────────────────────
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

// ─── Error ────────────────────────────────────────────────────────────────────
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

// ─── Abbr ────────────────────────────────────────────────────────────────────
.abbr-input-wrap {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}
.firstname-input-row {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 160px;
  border: 1px solid rgba(79, 70, 229, 0.25);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  .form-input {
    flex: 1;
    :deep(.q-field__control) {
      border-radius: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }
    :deep(.q-field__control:before),
    :deep(.q-field__control:after) {
      display: none !important;
    }
  }
}
.firstname-prefix {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 40px;
  background: rgba(79, 70, 229, 0.06);
  border-right: 1px solid rgba(79, 70, 229, 0.2);
  font-size: 0.88rem;
  font-weight: 600;
  color: #6b7280;
  white-space: nowrap;
  flex-shrink: 0;
  user-select: none;
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

// ─── Email / Phone ────────────────────────────────────────────────────────────
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
.phone-counter {
  font-size: 0.72rem;
  font-weight: 700;
  color: $text-muted;
  transition: color 0.2s;
  &--full {
    color: $teal;
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────
.summary-card {
  background: linear-gradient(135deg, #f8f7ff, #f0f9ff);
  border-color: rgba(79, 70, 229, 0.15);
}
.changes-banner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 100px;
  background: rgba(79, 70, 229, 0.08);
  border: 1px solid rgba(79, 70, 229, 0.2);
  color: $indigo-mid;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: $surface;
  border-radius: 14px;
  border: 1px solid rgba(79, 70, 229, 0.07);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(79, 70, 229, 0.1);
  }
  &--changed {
    border-color: rgba(79, 70, 229, 0.35);
    background: rgba(79, 70, 229, 0.03);
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
  margin-top: 2px;
}
.summary-item-body {
  min-width: 0;
  flex: 1;
}
.summary-item-label {
  display: flex;
  align-items: center;
  gap: 6px;
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
.summary-item-old {
  font-size: 0.72rem;
  color: $text-muted;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: line-through;
  opacity: 0.7;
}
.changed-tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: $indigo-mid;
  background: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 20px;
  padding: 1px 7px;
}
.status-pill {
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
  .status-pill--active & {
    background: #16a34a;
    animation: pulse 2s infinite;
  }
  .status-pill--inactive & {
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

// ─── Security Banner ──────────────────────────────────────────────────────────
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
  font-size: 0;
  .q-icon {
    font-size: 80px !important;
  }
}

// ─── Password Strength ────────────────────────────────────────────────────────
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

// ─── Ready Row ────────────────────────────────────────────────────────────────
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
  :disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
  &--teal {
    background: linear-gradient(135deg, #065f46 0%, $teal 55%, #0d9488 100%);
    box-shadow: 0 6px 24px rgba(13, 148, 136, 0.35);
    &:hover:not(.submit-btn--loading):not(:disabled) {
      box-shadow: 0 10px 32px rgba(13, 148, 136, 0.42);
    }
  }
}
.submit-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

// ─── Tab Transition ───────────────────────────────────────────────────────────
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
  .hero-left {
    gap: 10px;
  }
  .hero-icon-wrap {
    width: 46px;
    height: 46px;
  }
  .abbr-input-wrap {
    flex-direction: column;
  }
  .abbr-badge {
    flex-direction: row;
    align-items: center;
  }
  .ready-dots {
    display: none;
  }
  .hero-tabs {
    width: 100%;
    justify-content: stretch;
  }
  .hero-tab {
    flex: 1;
    justify-content: center;
    padding: 10px 12px;
    font-size: 0.8rem;
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
