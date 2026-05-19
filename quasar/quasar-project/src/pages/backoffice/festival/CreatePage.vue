<template>
  <q-page class="create-festival-page">
    <!-- ===== HERO ===== -->
    <div class="page-hero">
      <div class="hero-blob hero-blob-1" />
      <div class="hero-blob hero-blob-2" />
      <div class="hero-blob hero-blob-3" />
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-icon-wrap">
            <q-icon name="add_circle" size="1.8rem" color="white" />
          </div>
          <div>
            <h1 class="hero-title">เพิ่มเทศกาลใหม่</h1>
            <p class="hero-sub">สร้างเทศกาลสุดพิเศษให้ผู้คนได้อวยพรกัน</p>
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
          <div ref="coverRef" class="field-group">
            <div
              class="cover-upload-zone"
              :class="{ 'upload-zone--error': imageError }"
              @click="fileInput?.pickFiles()"
            >
              <q-img
                v-if="imageFile"
                :src="getFilePreview(imageFile)"
                class="cover-img"
                :ratio="2188 / 417"
              >
                <!-- :ratio="16 / 9" -->
                <div class="cover-overlay">
                  <q-icon name="photo_camera" size="28px" color="white" />
                  <span>เปลี่ยนรูป</span>
                </div>
              </q-img>
              <div v-else class="cover-placeholder">
                <div class="cover-placeholder-icon">🖼️</div>
                <div class="cover-placeholder-text">คลิกเพื่ออัปโหลดรูปหน้าปก</div>
                <div class="cover-placeholder-sub">PNG, JPG ขนาดไม่เกิน 2MB — 2188 × 417 px</div>
                <a
                  href="https://www.iloveimg.com/resize-image"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cover-resize-link"
                  @click.stop
                >
                  <q-icon name="open_in_new" size="13px" />
                  แปลงขนาดรูปภาพที่นี่
                </a>
              </div>
            </div>
            <transition name="err-fade">
              <div v-if="imageError" class="error-msg">
                <q-icon name="error_outline" size="14px" />
                กรุณาอัปโหลดรูปหน้าปก PNG/JPG ขนาด 2188 × 417 px ไม่เกิน 2 MB
              </div>
            </transition>
          </div>

          <q-file
            v-model="imageFile"
            ref="fileInput"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            class="hidden"
            @update:model-value="onImageSelected"
          />

          <!-- FESTIVAL NAME -->
          <div ref="nameRef" class="q-mt-md field-group">
            <q-input
              outlined
              v-model="festivalName"
              label="ชื่อเทศกาล"
              placeholder="เช่น สงกรานต์-กกจ-2568"
              hint="รูปแบบ: เทศกาล-ตัวย่อหน่วยงาน (2-3)-ปี"
              dense
              autofocus
              :error="nameError"
              :error-message="
                nameError ? 'รูปแบบต้องเป็น เทศกาล-หน่วยงาน-ปี เช่น สงกรานต์-IT-2568' : ''
              "
              class="custom-input"
              @update:model-value="onFestivalNameChange"
            >
              <template v-slot:prepend>
                <q-icon name="festival" color="deep-orange-5" />
              </template>
            </q-input>
          </div>

          <!-- LOGO UPLOAD -->
          <div ref="logoRef" class="q-mt-md field-group">
            <div class="logo-row">
              <div
                class="logo-upload-zone"
                :class="{ 'upload-zone--error': logoError }"
                @click="logoInput?.pickFiles()"
              >
                <q-img
                  v-if="logoFile"
                  :src="getFilePreview(logoFile)"
                  class="logo-preview"
                  :ratio="1"
                  fit="contain"
                >
                  <div class="cover-overlay">
                    <q-icon name="photo_camera" size="20px" color="white" />
                    <span>เปลี่ยน</span>
                  </div>
                </q-img>
                <div v-else class="logo-placeholder">
                  <div class="logo-placeholder-icon">🏷️</div>
                  <div class="cover-placeholder-text">อัปโหลด Logo</div>
                  <div class="cover-placeholder-sub">100 × 100 px</div>
                </div>
              </div>
              <div class="logo-hint">
                <div class="logo-hint-title">Logo เทศกาล</div>
                <div class="logo-hint-sub">
                  PNG, JPG · แนะนำสี่เหลี่ยมจัตุรัส<br />ขนาด 100 × 100 px · ไม่เกิน 2 MB
                </div>
              </div>
            </div>
            <transition name="err-fade">
              <div v-if="logoError" class="error-msg">
                <q-icon name="error_outline" size="14px" />
                กรุณาอัปโหลด Logo PNG/JPG ขนาด 100 × 100 px ไม่เกิน 2 MB
              </div>
            </transition>
          </div>

          <q-file
            v-model="logoFile"
            ref="logoInput"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            class="hidden"
            @update:model-value="onLogoSelected"
          />

          <!-- WEB NAME -->
          <div ref="webNameRef" class="q-mt-md field-group">
            <q-input
              v-model="webName"
              label="ชื่อเว็บไซต์ (URL slug)"
              placeholder="เช่น songkran-2568"
              outlined
              dense
              :error="webNameError"
              :error-message="webNameError ? 'ชื่อเว็บไซต์จำเป็นต้องกรอก' : ''"
              class="custom-input"
              @update:model-value="webNameError = false"
            >
              <template v-slot:prepend>
                <q-icon name="language" color="deep-orange-5" />
              </template>
            </q-input>
          </div>
        </div>

        <!-- ===== CARD: ช่วงเวลา ===== -->
        <div ref="dateRef" class="fest-card animate-in field-group" style="animation-delay: 0.1s">
          <div class="card-label">
            <span class="label-dot label-dot--teal" />
            ช่วงเวลาของเทศกาล
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
              <button
                v-if="startDate"
                class="date-chip-clear"
                type="button"
                @click="startDate = ''"
              >
                <q-icon name="close" size="12px" />
              </button>
            </div>

            <div class="date-range-arrow">
              <q-icon name="arrow_forward" size="16px" />
            </div>

            <div
              class="date-chip date-chip--end"
              :class="{
                'date-chip--active': endDate,
                'date-chip--error': dateError && !endDate,
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
              <button v-if="endDate" class="date-chip-clear" type="button" @click="endDate = ''">
                <q-icon name="close" size="12px" />
              </button>
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

          <!-- Date error -->
          <transition name="err-fade">
            <div v-if="dateError" class="error-msg q-mt-xs">
              <q-icon name="error_outline" size="14px" />
              {{ dateErrorMsg }}
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
              <div class="cal-wrapper cal-wrapper--start">
                <q-date
                  v-model="startDate"
                  :options="startDateOptions"
                  color="deep-orange-5"
                  text-color="white"
                  flat
                  minimal
                  class="fest-calendar"
                  @update:model-value="onStartDateChange"
                />
              </div>
            </div>

            <div class="calendar-block">
              <div class="calendar-block-label calendar-block-label--end">
                <div class="cal-label-dot cal-label-dot--end" />
                <span>วันสิ้นสุด</span>
                <span v-if="endDate" class="cal-label-date">{{ formatDateThai(endDate) }}</span>
              </div>
              <div class="cal-wrapper cal-wrapper--end">
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
            <q-btn
              unelevated
              color="deep-orange-5"
              icon="add"
              label="เพิ่มคำอวยพร"
              class="action-btn"
              @click="onAddWish"
            />
          </div>

          <transition-group name="wish-list" tag="div" class="wish-list-wrapper">
            <div v-for="(wish, i) in wishWordList" :key="wish + i" class="wish-item">
              <div class="wish-number">{{ i + 1 }}</div>
              <div class="wish-text">{{ wish }}</div>
              <div class="wish-actions">
                <button class="wish-btn wish-btn--edit" type="button" @click="editWish(i)">
                  <q-icon name="edit" size="15px" />
                </button>
                <button class="wish-btn wish-btn--delete" type="button" @click="deleteWish(i)">
                  <q-icon name="delete_outline" size="15px" />
                </button>
              </div>
            </div>
          </transition-group>

          <div v-if="wishWordList.length === 0" class="empty-state">
            <div class="empty-icon">💬</div>
            <div class="empty-title">ยังไม่มีคำอวยพร</div>
            <div class="empty-sub">เพิ่มคำอวยพรเพื่อให้ผู้ใช้เลือกส่งให้กัน</div>
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
              <span class="stat-num">{{ cardFileList.length }}</span>
              <span class="stat-label">รูป</span>
            </div>
            <q-btn
              unelevated
              color="teal-6"
              icon="add_photo_alternate"
              label="เพิ่มการ์ด"
              class="action-btn"
              @click="onAddCard"
            />
          </div>

          <div v-if="cardFileList.length > 0" class="card-grid">
            <div v-for="(file, i) in cardFileList" :key="i" class="card-thumb">
              <q-img :src="getFilePreview(file)" ratio="1" fit="contain" class="card-thumb-img" />
              <button class="card-thumb-remove" type="button" @click="removeCard(i)">
                <q-icon name="close" size="14px" />
              </button>
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">🃏</div>
            <div class="empty-title">ยังไม่มีการ์ด</div>
            <div class="empty-sub">อัปโหลดรูปสวยๆ เพื่อใช้เป็นการ์ดอวยพร (691 × 691 px)</div>
          </div>
        </div>

        <!-- ===== SUBMIT ===== -->
        <div class="animate-in" style="animation-delay: 0.25s">
          <button
            type="button"
            class="submit-btn"
            :class="{ 'submit-btn--loading': loading }"
            :disabled="loading"
            @click="submitAdd"
          >
            <span v-if="!loading" class="submit-btn-inner">
              <q-icon name="check_circle" size="20px" />
              บันทึกเทศกาล
            </span>
            <span v-else class="submit-btn-inner">
              <q-circular-progress indeterminate size="20px" color="white" />
              กำลังบันทึก...
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== DIALOG: เพิ่มคำอวยพร ===== -->
    <q-dialog v-model="addWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="dialog-header">
          <div class="dialog-header-icon dialog-header-icon--orange">
            <q-icon name="format_quote" color="white" size="18px" />
          </div>
          <span>เพิ่มคำอวยพร</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="addWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit.prevent.stop="addWishToList">
          <div class="dialog-body">
            <q-input
              v-model="tempWish"
              type="textarea"
              label="คำอวยพร"
              outlined
              autofocus
              placeholder="เช่น สุขสันต์วันสงกรานต์ ขอให้มีความสุขมากๆ"
              class="custom-input"
              :rules="[(val) => !!val.trim() || 'กรุณากรอกคำอวยพร']"
            />
          </div>
          <div class="dialog-footer">
            <button type="button" class="dlg-btn dlg-btn--cancel" @click="addWishDialog = false">
              ยกเลิก
            </button>
            <button type="submit" class="dlg-btn dlg-btn--confirm">บันทึก</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: แก้ไขคำอวยพร ===== -->
    <q-dialog v-model="editWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="dialog-header">
          <div class="dialog-header-icon dialog-header-icon--amber">
            <q-icon name="edit" color="white" size="18px" />
          </div>
          <span>แก้ไขคำอวยพร</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="editWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit.prevent.stop="updateWish">
          <div class="dialog-body">
            <q-input
              v-model="tempWish"
              type="textarea"
              label="คำอวยพร"
              outlined
              autofocus
              class="custom-input"
              :rules="[(val) => !!val.trim() || 'กรุณากรอกคำอวยพร']"
            />
          </div>
          <div class="dialog-footer">
            <button type="button" class="dlg-btn dlg-btn--cancel" @click="editWishDialog = false">
              ยกเลิก
            </button>
            <button type="submit" class="dlg-btn dlg-btn--confirm">อัปเดต</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: ยืนยันลบคำอวยพร ===== -->
    <q-dialog v-model="deleteWishDialog" persistent>
      <div class="custom-dialog">
        <div class="dialog-header dialog-header--danger">
          <div class="dialog-header-icon">
            <q-icon name="warning_amber" color="white" size="18px" />
          </div>
          <span>ยืนยันการลบ</span>
          <q-space />
          <button class="dialog-close-btn" @click="deleteWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <p class="delete-warn-text">
            คุณต้องการลบคำอวยพร
            <strong class="delete-target">"{{ itemToDelete }}"</strong>
            ใช่หรือไม่?
          </p>
          <p class="delete-warn-sub">
            <q-icon name="info_outline" size="15px" class="q-mr-xs" />
            การดำเนินการนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>
        <div class="dialog-footer">
          <button type="button" class="dlg-btn dlg-btn--cancel" @click="deleteWishDialog = false">
            ยกเลิก
          </button>
          <button type="button" class="dlg-btn dlg-btn--danger" @click="confirmDeleteWish">
            ยืนยันการลบ
          </button>
        </div>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: เพิ่มการ์ด ===== -->
    <q-dialog v-model="showCardDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="dialog-header">
          <div class="dialog-header-icon dialog-header-icon--teal">
            <q-icon name="add_photo_alternate" color="white" size="18px" />
          </div>
          <span>เพิ่มรูปการ์ด</span>
          <q-space />
          <button class="dialog-close-btn" type="button" @click="showCardDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <q-file
            v-model="tempCardFile"
            label="เลือกรูปภาพ (691 × 691 px)"
            outlined
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            class="custom-input"
            :error="!!cardErrorMsg"
            :error-message="cardErrorMsg"
            @update:model-value="addCardToList"
          >
            <template v-slot:prepend>
              <q-icon name="add_photo_alternate" color="teal-6" />
            </template>
          </q-file>
        </div>
      </div>
    </q-dialog>

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

    <!-- ===== CLICK PARTICLES ===== -->
    <teleport to="body">
      <div class="click-particles-root" aria-hidden="true">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import type { QFile } from 'quasar';
import type { AxiosError } from 'axios';

// ─── Constants ────────────────────────────────────────────────────────────────
const NOTIFY_DURATION = 2000;

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
const festivalName = ref('');
const imageFile = ref<File | null>(null);
const logoFile = ref<File | null>(null);
const webName = ref('');
const loading = ref(false);

// ─── File Input Refs ──────────────────────────────────────────────────────────
const fileInput = ref<InstanceType<typeof QFile> | null>(null);
const logoInput = ref<InstanceType<typeof QFile> | null>(null);

// ─── Date State ───────────────────────────────────────────────────────────────
const startDate = ref('');
const endDate = ref('');
const dateError = ref(false);
const dateErrorMsg = ref('');

const todayStr = (() => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
})();

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

const startDateOptions = (dateStr: string): boolean => {
  if (dateStr < todayStr) return false;
  if (!endDate.value) return true;
  return dateStr <= endDate.value;
};

const endDateOptions = (dateStr: string): boolean => {
  if (dateStr < todayStr) return false;
  if (!startDate.value) return true;
  return dateStr >= startDate.value;
};

const onStartDateChange = (val: string) => {
  dateError.value = false;
  if (endDate.value && val > endDate.value) endDate.value = '';
};

const onEndDateChange = () => {
  dateError.value = false;
};

// ─── Error States ─────────────────────────────────────────────────────────────
const imageError = ref(false);
const nameError = ref(false);
const logoError = ref(false);
const webNameError = ref(false);

// ─── Scroll Target Refs ───────────────────────────────────────────────────────
const coverRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const webNameRef = ref<HTMLElement | null>(null);
const dateRef = ref<HTMLElement | null>(null);

// ─── Wish State ───────────────────────────────────────────────────────────────
const addWishDialog = ref(false);
const editWishDialog = ref(false);
const deleteWishDialog = ref(false);
const editingIndex = ref<number | null>(null);
const deleteIndex = ref<number | null>(null);
const itemToDelete = ref<string | null>(null);
const tempWish = ref('');
const wishWordList = ref<string[]>([]);

// ─── Card State ───────────────────────────────────────────────────────────────
const showCardDialog = ref(false);
const tempCardFile = ref<File | null>(null);
const cardFileList = ref<File[]>([]);
const cardErrorMsg = ref('');

// ─── Notify State ─────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
const notifyKey = ref(0);
let notifyTimer: ReturnType<typeof setTimeout> | null = null;

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getFilePreview = (file: File) => URL.createObjectURL(file);

const openNotify = (success: boolean, message: string) => {
  if (notifyTimer) clearTimeout(notifyTimer);
  notifySuccess.value = success;
  notifyMessage.value = message;
  notifyKey.value++;
  showNotifyDialog.value = true;
  notifyTimer = setTimeout(() => {
    showNotifyDialog.value = false;
    if (success) void router.push('/backoffice/festival');
  }, NOTIFY_DURATION);
};

// ─── File Validation ──────────────────────────────────────────────────────────
const onImageSelected = (file: File | null) => {
  imageError.value = false;
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    imageError.value = true;
    imageFile.value = null;
    return;
  }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    if (img.width !== 2188 || img.height !== 417) {
      imageError.value = true;
      imageFile.value = null;
    }
  };
  img.src = url;
};

const onLogoSelected = (file: File | null) => {
  logoError.value = false;
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    logoError.value = true;
    logoFile.value = null;
    return;
  }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    if (img.width !== 100 || img.height !== 100) {
      logoError.value = true;
      logoFile.value = null;
    }
  };
  img.src = url;
};

const onFestivalNameChange = (val: string | number | null) => {
  nameError.value = false;
  if (typeof val !== 'string') return;
  // const pattern = /^[^-].*[^-]-[^-]+-\d{4}$/;
  const pattern = /^[^-].*-[^-]{2,3}-\d{4}$/;
  if (val && !pattern.test(val.trim())) nameError.value = true;
};

// ─── Wish Actions ─────────────────────────────────────────────────────────────
const onAddWish = () => {
  tempWish.value = '';
  addWishDialog.value = true;
};

const addWishToList = () => {
  if (!tempWish.value.trim()) return;
  wishWordList.value.push(tempWish.value.trim());
  tempWish.value = '';
  addWishDialog.value = false;
};

const editWish = (i: number) => {
  const w = wishWordList.value[i];
  if (!w) return;
  tempWish.value = w;
  editingIndex.value = i;
  editWishDialog.value = true;
};

const updateWish = () => {
  if (editingIndex.value === null || !tempWish.value.trim()) return;
  wishWordList.value[editingIndex.value] = tempWish.value.trim();
  tempWish.value = '';
  editingIndex.value = null;
  editWishDialog.value = false;
};

const deleteWish = (i: number) => {
  const item = wishWordList.value[i];
  if (!item) return;
  deleteIndex.value = i;
  itemToDelete.value = item;
  deleteWishDialog.value = true;
};

const confirmDeleteWish = () => {
  if (deleteIndex.value === null) return;
  wishWordList.value.splice(deleteIndex.value, 1);
  deleteIndex.value = null;
  itemToDelete.value = null;
  deleteWishDialog.value = false;
};

// ─── Card Actions ─────────────────────────────────────────────────────────────
const onAddCard = () => {
  showCardDialog.value = true;
};

const addCardToList = () => {
  const file = tempCardFile.value;
  if (!file) return;
  cardErrorMsg.value = '';
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    cardErrorMsg.value = 'รองรับเฉพาะ JPG และ PNG';
    tempCardFile.value = null;
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    cardErrorMsg.value = 'ขนาดไฟล์ต้องไม่เกิน 2 MB';
    tempCardFile.value = null;
    return;
  }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    if (img.width !== 691 || img.height !== 691) {
      cardErrorMsg.value = `ขนาดรูปต้องเป็น 691 × 691 px (พบ ${img.width} × ${img.height})`;
      tempCardFile.value = null;
      return;
    }
    cardFileList.value.push(file);
    tempCardFile.value = null;
    showCardDialog.value = false;
  };
  img.src = url;
};

const removeCard = (i: number) => {
  cardFileList.value.splice(i, 1);
};

// ─── Validation ───────────────────────────────────────────────────────────────
const validateAndScroll = async (): Promise<boolean> => {
  imageError.value = false;
  nameError.value = false;
  logoError.value = false;
  webNameError.value = false;
  dateError.value = false;
  dateErrorMsg.value = '';

  const isImageValid = !!imageFile.value;
  const isNameValid =
    typeof festivalName.value === 'string' &&
    /^[^-].*-[^-]{2,3}-\d{4}$/.test(festivalName.value.trim());
  const isLogoValid = !!logoFile.value;
  const isWebNameValid = typeof webName.value === 'string' && webName.value.trim().length > 0;

  let isDateValid = true;
  if (startDate.value && !endDate.value) {
    isDateValid = false;
    dateErrorMsg.value = 'กรุณาเลือกวันสิ้นสุดด้วย';
    dateError.value = true;
  } else if (!startDate.value && endDate.value) {
    isDateValid = false;
    dateErrorMsg.value = 'กรุณาเลือกวันเริ่มต้นด้วย';
    dateError.value = true;
  } else if (startDate.value && endDate.value && startDate.value > endDate.value) {
    isDateValid = false;
    dateErrorMsg.value = 'วันเริ่มต้นต้องไม่เกินวันสิ้นสุด';
    dateError.value = true;
  }

  if (!isImageValid) imageError.value = true;
  if (!isNameValid) nameError.value = true;
  if (!isLogoValid) logoError.value = true;
  if (!isWebNameValid) webNameError.value = true;

  const hasError = !isImageValid || !isNameValid || !isLogoValid || !isWebNameValid || !isDateValid;

  if (hasError) {
    await nextTick();
    const targets = [
      { valid: isImageValid, el: coverRef.value },
      { valid: isNameValid, el: nameRef.value },
      { valid: isLogoValid, el: logoRef.value },
      { valid: isWebNameValid, el: webNameRef.value },
      { valid: isDateValid, el: dateRef.value },
    ];
    targets.find((t) => !t.valid)?.el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return !hasError;
};

// ─── Submit ───────────────────────────────────────────────────────────────────
const submitAdd = async () => {
  const isValid = await validateAndScroll();
  if (!isValid) return;

  loading.value = true;
  try {
    const uploadFile = async (file: File): Promise<string> => {
      const fd = new FormData();
      fd.append('singleFile', file);
      return (await api.post('/upload', fd)).data.image as string;
    };

    const [festivalImageName, festivalLogoName] = await Promise.all([
      imageFile.value ? uploadFile(imageFile.value) : Promise.resolve(''),
      logoFile.value ? uploadFile(logoFile.value) : Promise.resolve(''),
    ]);

    const cardImageNames = await Promise.all(cardFileList.value.map(uploadFile));

    const payload = {
      festivalName: festivalName.value,
      image: festivalImageName,
      logo: festivalLogoName,
      webName: webName.value,
      startDate: startDate.value ? startDate.value.replace(/\//g, '-') : undefined,
      endDate: endDate.value ? endDate.value.replace(/\//g, '-') : undefined,
      wisher: wishWordList.value.map((word) => ({ wishWord: word })),
      card: cardImageNames.map((imgName) => ({ imageCard: imgName })),
    };

    const response = await api.post('/backoffice/festival', payload);
    openNotify(true, response.data.message || 'บันทึกเทศกาลสำเร็จ');
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    openNotify(false, error.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
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

const handleGlobalClick = (e: MouseEvent) => {
  spawnParticles(e.clientX, e.clientY);
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (notifyTimer) clearTimeout(notifyTimer);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

// ─── Design Tokens (เหมือน festival-list-page) ───────────────────────────────
$orange: #ea580c;
$orange-mid: #f97316;
$orange-soft: #fff7ed;
$gold: #f59e0b;
$teal: #0d9488;
$teal-soft: #ccfbf1;
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
$error-red: #dc2626;

// ─── Page ─────────────────────────────────────────────────────────────────────
.create-festival-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(155deg, #fff7ed 0%, #fdf4ff 45%, #f0fdfa 100%);
  min-height: 100vh;
}

// ─── Hero (เหมือน festival-list-page) ────────────────────────────────────────
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #7c2d12 0%, $orange 55%, $gold 100%);
  padding: 2.25rem 1.5rem 4rem;
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
.content-wrap {
  max-width: 780px;
  margin: -2rem auto 0;
  padding: 0 1rem 4rem;
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

// ─── Stat Chip (เหมือน list page) ─────────────────────────────────────────────
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

.action-btn {
  border-radius: 12px !important;
  font-weight: 600 !important;
  font-family: 'Noto Sans Thai', sans-serif !important;
  letter-spacing: 0 !important;
}

// ─── Error ────────────────────────────────────────────────────────────────────
.upload-zone--error {
  border-color: $error-red !important;
  border-style: solid !important;
  background: #fff5f5 !important;
  animation: shake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97);
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

// ─── Cover Upload ─────────────────────────────────────────────────────────────
// .cover-upload-zone {
//   border-radius: 14px;
//   overflow: hidden;
//   cursor: pointer;
//   border: 2px dashed rgba(234, 88, 12, 0.25);
//   transition:
//     border-color 0.2s,
//     background 0.2s,
//     transform 0.2s;
//   background: $surface-2;

//   &:hover {
//     border-color: $orange;
//     transform: translateY(-2px);
//   }
// }
// .cover-upload-zone {
//   border-radius: 14px;
//   overflow: hidden;
//   cursor: pointer;
//   border: 2px dashed rgba(234, 88, 12, 0.25);
//   transition: border-color 0.2s, background 0.2s, transform 0.2s;
//   background: $surface-2;
//   aspect-ratio: 2188 / 417; // ← เพิ่ม เพื่อให้กรอบมีสัดส่วนถูกต้องตั้งแต่ก่อนอัปโหลด

//   &:hover {
//     border-color: $orange;
//     transform: translateY(-2px);
//   }
// }

.cover-upload-zone {
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 2px dashed rgba(234, 88, 12, 0.25);
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
  background: $surface-2;
  // ลบ aspect-ratio ออก — ให้ความสูงถูกกำหนดโดย content แทน

  &:hover {
    border-color: $orange;
    transform: translateY(-2px);
  }
}

.cover-img {
  display: block;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(124, 45, 18, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;

  .cover-upload-zone:hover &,
  .logo-upload-zone:hover & {
    opacity: 1;
  }
}

.cover-placeholder {
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 160px; // ← เพิ่ม เพื่อให้มีพื้นที่แสดงข้อความเสมอ
  justify-content: center;
}
// .cover-placeholder {
//   padding: 2.5rem 1rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 6px;
// }

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

.cover-resize-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  padding: 5px 14px;
  border-radius: 20px;
  background: rgba(234, 88, 12, 0.07);
  border: 1px solid rgba(234, 88, 12, 0.15);
  color: $orange;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s,
    transform 0.15s;

  &:hover {
    background: rgba(234, 88, 12, 0.14);
    transform: translateY(-1px);
  }
}

// ─── Logo Upload ──────────────────────────────────────────────────────────────
.logo-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-upload-zone {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px dashed rgba(234, 88, 12, 0.25);
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
  background: $surface-2;
  width: 130px;
  flex-shrink: 0;

  &:hover {
    border-color: $orange;
    transform: translateY(-2px);
  }
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

// ─── Custom Input ─────────────────────────────────────────────────────────────
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

.date-chip-clear {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  flex-shrink: 0;
  background: rgba(234, 88, 12, 0.1);
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
    color: $error-red;
    transform: scale(1.1);
  }
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
  transition: box-shadow 0.25s;

  &:hover {
    box-shadow: 0 8px 32px rgba(234, 88, 12, 0.16);
  }
  &--start {
    border: 2px solid rgba(234, 88, 12, 0.18);
  }
  &--end {
    border: 2px solid rgba(13, 148, 136, 0.18);
  }
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

  &--edit {
    background: rgba(245, 158, 11, 0.1);
    color: $gold;
    &:hover {
      background: rgba(245, 158, 11, 0.2);
    }
  }
  &--delete {
    background: rgba(220, 38, 38, 0.08);
    color: $red;
    &:hover {
      background: rgba(220, 38, 38, 0.15);
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

.card-thumb-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(124, 45, 18, 0.75);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: $red;
  }
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

// ─── Submit ───────────────────────────────────────────────────────────────────
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
    box-shadow 0.2s,
    opacity 0.2s;

  &:hover:not(.submit-btn--loading):not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(234, 88, 12, 0.4);
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

// ─── Dialogs ─────────────────────────────────────────────────────────────────
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

  &--danger {
    background: linear-gradient(135deg, #fee2e2, #fff1f2);
  }
}

.dialog-header-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #7c2d12, $orange);

  &--orange {
    background: linear-gradient(135deg, #7c2d12, $orange);
  }
  &--amber {
    background: linear-gradient(135deg, #92400e, $gold);
  }
  &--teal {
    background: linear-gradient(135deg, #065f46, $teal);
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

.delete-warn-text {
  font-size: 0.9rem;
  color: $text-main;
  line-height: 1.7;
  margin: 0 0 8px;
}

.delete-target {
  color: $orange;
  font-weight: 700;
}

.delete-warn-sub {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: $text-muted;
  margin: 0;
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
    box-shadow 0.15s,
    opacity 0.15s;

  &:active {
    transform: scale(0.96);
  }
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &--cancel {
    background: rgba(234, 88, 12, 0.07);
    color: $text-muted;
    &:hover {
      background: rgba(234, 88, 12, 0.13);
    }
  }
  &--confirm {
    background: linear-gradient(135deg, #7c2d12, $orange);
    color: white;
    box-shadow: 0 3px 12px rgba(234, 88, 12, 0.3);
    &:hover {
      box-shadow: 0 5px 18px rgba(234, 88, 12, 0.4);
    }
  }
  &--danger {
    background: linear-gradient(135deg, #ef4444, $red);
    color: white;
    box-shadow: 0 3px 12px rgba(220, 38, 38, 0.3);
  }
}

// ─── Notify Dialog (เหมือน list page) ─────────────────────────────────────────
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
  .logo-upload-zone {
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
