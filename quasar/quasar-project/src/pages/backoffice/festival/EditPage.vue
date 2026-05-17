<template>
  <q-page class="edit-festival-page">
    <!-- ===== HERO HEADER ===== -->
    <div class="hero-header">
      <div class="hero-orb hero-orb-1" />
      <div class="hero-orb hero-orb-2" />
      <div class="hero-orb hero-orb-3" />
      <div class="hero-content">
        <div class="hero-icon">🎊</div>
        <h1 class="hero-title">แก้ไขเทศกาลใหม่</h1>
        <p class="hero-sub">แก้ไขเทศกาลสุดพิเศษให้ผู้คนได้อวยพรกัน</p>
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

          <!-- COVER IMAGE -->
          <div ref="coverRef" class="field-group">
            <div
              class="cover-upload-zone"
              :class="{
                'upload-zone--error': imageError,
                'upload-zone--disabled': !canEdit,
              }"
              @click="canEdit && fileInput?.pickFiles()"
            >
              <q-img
                v-if="imageFile || existingImageUrl"
                :src="imageFile ? getFilePreview(imageFile) : existingImageUrl"
                class="cover-img"
                fit="contain"
                :ratio="16 / 9"
              >
                <div v-if="canEdit" class="cover-overlay">
                  <q-icon name="photo_camera" size="28px" color="white" />
                  <span>เปลี่ยนรูป</span>
                </div>
              </q-img>
              <div v-else class="cover-placeholder">
                <div class="cover-placeholder-icon">🖼️</div>
                <div class="cover-placeholder-text">คลิกเพื่ออัปโหลดรูปหน้าปก</div>
                <div class="cover-placeholder-sub">
                  PNG, JPG ขนาดไม่เกิน 2MB ขนาด 1199 x 581 pixel
                </div>
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
                กรุณาอัปโหลดรูปหน้าปกตามคุณสมบัติที่กำหนด
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
              :disable="!canEdit"
              label="ชื่อเทศกาล"
              placeholder="เช่น สงกรานต์-IT-2568"
              hint="รูปแบบ: เทศกาล-หน่วยงาน-ปี"
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
            <div
              class="logo-upload-zone"
              :class="{
                'upload-zone--error': logoError,
                'upload-zone--disabled': !canEdit,
              }"
              @click="canEdit && logoInput?.pickFiles()"
            >
              <q-img
                v-if="logoFile"
                :src="getFilePreview(logoFile)"
                class="logo-preview"
                :ratio="1"
                fit="contain"
              >
                <div v-if="canEdit" class="cover-overlay">
                  <q-icon name="photo_camera" size="20px" color="white" />
                  <span>เปลี่ยน Logo</span>
                </div>
              </q-img>
              <div v-else class="logo-placeholder">
                <div class="logo-placeholder-icon">🏷️</div>
                <div class="cover-placeholder-text">คลิกเพื่ออัปโหลด Logo</div>
                <div class="cover-placeholder-sub">PNG, JPG — แนะนำสี่เหลี่ยมจัตุรัส</div>
              </div>
              <transition name="err-fade">
                <div v-if="logoError" class="error-msg">
                  <q-icon name="error_outline" size="14px" />
                  กรุณาอัปโหลด Logo
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
          </div>

          <!-- WEB NAME -->
          <div ref="webNameRef" class="q-mt-md field-group">
            <q-input
              v-model="webName"
              :disable="!canEdit"
              label="ชื่อเว็บไซต์ (URL slug)"
              placeholder="เช่น songkran-2568"
              outlined
              dense
              lazy-rules
              :rules="[
                (val) =>
                  (typeof val === 'string' && val.trim().length > 0) ||
                  'ชื่อเว็บไซต์จำเป็นต้องกรอก',
              ]"
              class="custom-input"
            >
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
                <button
                  v-if="startDate"
                  class="date-chip-clear"
                  type="button"
                  :disabled="!canEdit"
                  @click="startDate = ''"
                >
                  <q-icon name="close" size="12px" />
                </button>
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
                <button
                  v-if="endDate"
                  class="date-chip-clear"
                  type="button"
                  :disabled="!canEditEndDate"
                  @click="endDate = ''"
                >
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

            <!-- Calendars -->
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
                <div class="cal-wrapper cal-wrapper--start" :class="{ 'cal-readonly': !canEdit }">
                  <q-date
                    v-model="startDate"
                    :options="startDateOptions"
                    color="indigo-6"
                    text-color="white"
                    flat
                    minimal
                    class="fest-calendar"
                    @update:model-value="onStartDateChange"
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
                <div
                  class="cal-wrapper cal-wrapper--end"
                  :class="{ 'cal-readonly': !canEditEndDate }"
                >
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
            <q-btn
              :disable="!canEdit"
              unelevated
              color="deep-orange-5"
              icon="add"
              label="เพิ่มคำอวยพร"
              class="add-btn"
              @click="onAddWish"
            />
          </div>

          <transition-group name="wish-list" tag="div" class="wish-list-wrapper">
            <div
              v-for="(wish, i) in wishWordList"
              :key="(wish.wId ?? 'new') + '-' + i"
              class="wish-item"
            >
              <div class="wish-number">{{ i + 1 }}</div>
              <div class="wish-text">{{ wish.wishWord }}</div>
              <button
                class="wish-btn wish-btn--edit"
                :disabled="!canEdit"
                type="button"
                @click="editWish(i)"
              >
                <q-icon name="edit" size="16px" />
              </button>
              <button
                class="wish-btn wish-btn--delete"
                :disabled="!canEdit"
                type="button"
                @click="deleteWish(i)"
              >
                <q-icon name="delete_outline" size="16px" />
              </button>
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
            <q-btn
              :disable="!canEdit"
              unelevated
              color="teal-6"
              icon="add_photo_alternate"
              label="เพิ่มการ์ด"
              class="add-btn"
              @click="onAddCard"
            />
          </div>

          <div v-if="existingCards.length > 0 || cardFileList.length > 0" class="card-grid">
            <div
              v-for="(card, i) in existingCards"
              :key="'existing-' + card.cId"
              class="card-thumb"
            >
              <q-img :src="card.previewUrl" ratio="1" fit="contain" class="card-thumb-img" />
              <button
                v-if="canEdit"
                class="card-thumb-remove"
                type="button"
                @click="removeExistingCard(i)"
              >
                <q-icon name="close" size="14px" />
              </button>
            </div>
            <div v-for="(file, i) in cardFileList" :key="'new-' + i" class="card-thumb">
              <q-img :src="getFilePreview(file)" ratio="1" fit="contain" class="card-thumb-img" />
              <button v-if="canEdit" class="card-thumb-remove" type="button" @click="removeCard(i)">
                <q-icon name="close" size="14px" />
              </button>
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
            :disabled="loading || !canEditEndDate"
            @click="submitEdit"
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

    <!-- ===== DIALOG: ADD WISH ===== -->
    <q-dialog v-model="addWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="custom-dialog-header">
          <span>✨ เพิ่มคำอวยพร</span>
          <button class="dialog-close" type="button" @click="addWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit.prevent.stop="addWishToList">
          <div class="custom-dialog-body">
            <q-input
              v-model="tempWish"
              label="คำอวยพร"
              outlined
              autofocus
              placeholder="เช่น สุขสันต์วันสงกรานต์ ขอให้มีความสุขมากๆ"
              class="custom-input"
              :rules="[(val) => !!val.trim() || 'กรุณากรอกคำอวยพร']"
            />
          </div>
          <div class="custom-dialog-footer">
            <button
              type="button"
              class="dialog-btn dialog-btn--cancel"
              @click="addWishDialog = false"
            >
              ยกเลิก
            </button>
            <button type="submit" class="dialog-btn dialog-btn--confirm">บันทึก</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: EDIT WISH ===== -->
    <q-dialog v-model="editWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="custom-dialog-header">
          <span>✏️ แก้ไขคำอวยพร</span>
          <button class="dialog-close" type="button" @click="editWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit.prevent.stop="updateWish">
          <div class="custom-dialog-body">
            <q-input
              v-model="tempWish"
              label="คำอวยพร"
              outlined
              autofocus
              class="custom-input"
              :rules="[(val) => !!val.trim() || 'กรุณากรอกคำอวยพร']"
            />
          </div>
          <div class="custom-dialog-footer">
            <button
              type="button"
              class="dialog-btn dialog-btn--cancel"
              @click="editWishDialog = false"
            >
              ยกเลิก
            </button>
            <button type="submit" class="dialog-btn dialog-btn--confirm">อัปเดต</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: DELETE WISH ===== -->
    <q-dialog v-model="deleteWishDialog" persistent>
      <div class="custom-dialog">
        <div class="custom-dialog-header custom-dialog-header--danger">
          <span>🗑️ ยืนยันการลบ</span>
          <button class="dialog-close" type="button" @click="deleteWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="custom-dialog-body">
          <p class="delete-confirm-text">
            คุณต้องการลบคำอวยพร<br />
            <strong class="delete-target">"{{ itemToDelete }}"</strong><br />
            ใช่หรือไม่?
          </p>
        </div>
        <div class="custom-dialog-footer">
          <button
            type="button"
            class="dialog-btn dialog-btn--cancel"
            @click="deleteWishDialog = false"
          >
            ยกเลิก
          </button>
          <button type="button" class="dialog-btn dialog-btn--danger" @click="confirmDelete">
            ยืนยันการลบ
          </button>
        </div>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: ADD CARD ===== -->
    <q-dialog v-model="showCardDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="custom-dialog-header">
          <span>🃏 เพิ่มรูปการ์ด</span>
          <button class="dialog-close" type="button" @click="showCardDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="custom-dialog-body">
          <q-file
            v-model="tempCardFile"
            label="เลือกรูปภาพ"
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

    <!-- ===== SUCCESS DIALOG ===== -->
    <q-dialog v-model="showSuccessDialog">
      <div class="result-dialog">
        <div class="result-dialog-header result-dialog-header--success">
          <div class="result-dialog-icon">
            <q-icon name="check_circle" size="1.6rem" color="white" />
          </div>
          <div>
            <div class="result-dialog-title">บันทึกสำเร็จ!</div>
            <div class="result-dialog-sub">กำลังนำท่านไปหน้ารายการ...</div>
          </div>
        </div>
        <div class="result-dialog-body">
          <div class="result-dialog-emoji">🎊</div>
          <p class="result-dialog-msg result-dialog-msg--success">{{ successMessage }}</p>
        </div>
        <div
          :key="'s-' + successMessage"
          class="result-dialog-progress result-dialog-progress--success"
        />
      </div>
    </q-dialog>

    <!-- ===== ERROR DIALOG ===== -->
    <q-dialog v-model="showErrorDialog">
      <div class="result-dialog">
        <div class="result-dialog-header result-dialog-header--error">
          <div class="result-dialog-icon">
            <q-icon name="error_outline" size="1.6rem" color="white" />
          </div>
          <div>
            <div class="result-dialog-title">เกิดข้อผิดพลาด</div>
            <div class="result-dialog-sub">กรุณาลองใหม่อีกครั้ง</div>
          </div>
        </div>
        <div class="result-dialog-body">
          <div class="result-dialog-emoji">⚠️</div>
          <p class="result-dialog-msg result-dialog-msg--error">{{ errorMessage }}</p>
        </div>
        <div
          :key="'e-' + errorMessage"
          class="result-dialog-progress result-dialog-progress--error"
        />
      </div>
    </q-dialog>

    <!-- ===== VALIDATION DIALOG ===== -->
    <q-dialog v-model="showValidationDialog">
      <div class="result-dialog">
        <div class="result-dialog-header result-dialog-header--warning">
          <div class="result-dialog-icon">
            <q-icon name="warning_amber" size="1.6rem" color="white" />
          </div>
          <div>
            <div class="result-dialog-title">ข้อมูลไม่ครบถ้วน</div>
            <div class="result-dialog-sub">กรุณาตรวจสอบข้อมูลอีกครั้ง</div>
          </div>
        </div>
        <div class="result-dialog-body">
          <div class="result-dialog-emoji">📋</div>
          <p class="result-dialog-msg result-dialog-msg--warning">{{ validationMessage }}</p>
        </div>
        <div class="result-dialog-footer">
          <button
            type="button"
            class="dialog-btn dialog-btn--confirm"
            @click="showValidationDialog = false"
          >
            รับทราบ
          </button>
        </div>
      </div>
    </q-dialog>

    <!-- ===== FETCH ERROR DIALOG ===== -->
    <q-dialog v-model="showFetchErrorDialog">
      <div class="result-dialog">
        <div class="result-dialog-header result-dialog-header--error">
          <div class="result-dialog-icon">
            <q-icon name="cloud_off" size="1.6rem" color="white" />
          </div>
          <div>
            <div class="result-dialog-title">โหลดข้อมูลไม่สำเร็จ</div>
            <div class="result-dialog-sub">กรุณาลองใหม่อีกครั้ง</div>
          </div>
        </div>
        <div class="result-dialog-body">
          <div class="result-dialog-emoji">🌐</div>
          <p class="result-dialog-msg result-dialog-msg--error">
            ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้
          </p>
        </div>
        <div class="result-dialog-footer">
          <button
            type="button"
            class="dialog-btn dialog-btn--confirm"
            @click="showFetchErrorDialog = false"
          >
            รับทราบ
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
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter, useRoute } from 'vue-router';
import type { QFile } from 'quasar';

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
  isEdit: boolean;
  isEditEndDate: boolean;
  wisher?: WisherApi[];
  card?: CardApi[];
  createdBy: number;
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

// ─── Template Refs ────────────────────────────────────────────────────────────
const fileInput = ref<InstanceType<typeof QFile> | null>(null);
const logoInput = ref<InstanceType<typeof QFile> | null>(null);
const coverRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const webNameRef = ref<HTMLElement | null>(null);
const dateRef = ref<HTMLElement | null>(null);

// ─── Festival State ───────────────────────────────────────────────────────────
const festivalId = ref<string | null>(null);
const festivalName = ref('');
const imageFile = ref<File | null>(null);
const logoFile = ref<File | null>(null);
const webName = ref('');
const existingImageUrl = ref('');
const existingImageName = ref('');
const loading = ref(false);
const createdBy = ref<number>(0);

// ─── Date State ───────────────────────────────────────────────────────────────
const startDate = ref('');
const endDate = ref('');
// false เพื่อป้องกัน field แก้ได้ก่อน fetch เสร็จ — จะถูก update หลัง fetch
const isEdit = ref(false);
const isEditEndDate = ref(false);
const dateError = ref(false);
const dateErrorMsg = ref('');

// ─── Error States ─────────────────────────────────────────────────────────────
const imageError = ref(false);
const nameError = ref(false);
const logoError = ref(false);
const webNameError = ref(false);

// ─── Wish State ───────────────────────────────────────────────────────────────
const wishWordList = ref<WishItem[]>([]);
const tempWish = ref('');
const addWishDialog = ref(false);
const editWishDialog = ref(false);
const deleteWishDialog = ref(false);
const editingIndex = ref<number | null>(null);
const deleteIndex = ref<number | null>(null);
const itemToDelete = ref<string | null>(null);

// ─── Card State ───────────────────────────────────────────────────────────────
const cardFileList = ref<File[]>([]);
const existingCards = ref<ExistingCard[]>([]);
const tempCardFile = ref<File | null>(null);
const showCardDialog = ref(false);
const cardErrorMsg = ref('');

// ─── Dialog State ─────────────────────────────────────────────────────────────
const showSuccessDialog = ref(false);
const successMessage = ref('');
const showErrorDialog = ref(false);
const errorMessage = ref('');
const showValidationDialog = ref(false);
const validationMessage = ref('');
const showFetchErrorDialog = ref(false);

// ─── Particles ────────────────────────────────────────────────────────────────
const activeParticles = ref<Particle[]>([]);
let particleId = 0;

// ─── Computed ─────────────────────────────────────────────────────────────────
const isOwner = computed(() => createdBy.value === Number(LocalStorage.getItem('userId')));

// canEdit: แก้ไขได้ถ้า isEdit (จาก API) หรือเป็นเจ้าของ
const canEdit = computed(() => isEdit.value && isOwner.value);

// canEditEndDate: แก้ไข endDate ได้ถ้า isEditEndDate หรือเป็นเจ้าของ
const canEditEndDate = computed(() => isEditEndDate.value && isOwner.value);

const durationDays = computed(() => {
  if (!startDate.value || !endDate.value) return -1;
  const s = new Date(startDate.value.replace(/\//g, '-'));
  const e = new Date(endDate.value.replace(/\//g, '-'));
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
});

// ─── Date Helpers ─────────────────────────────────────────────────────────────
const todayStr = (() => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${day}`;
})();

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
  if (dateStr === startDate.value) return true;
  if (dateStr < todayStr) return false;
  if (!endDate.value) return true;
  return dateStr <= endDate.value;
};

const endDateOptions = (dateStr: string): boolean => {
  if (dateStr === endDate.value) return true;
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

// ─── Dialog Helpers ───────────────────────────────────────────────────────────
const openSuccessDialog = (msg: string) => {
  successMessage.value = msg;
  showSuccessDialog.value = true;
};

const openErrorDialog = (msg: string) => {
  errorMessage.value = msg;
  showErrorDialog.value = true;
  setTimeout(() => {
    showErrorDialog.value = false;
  }, 2500);
};

// ─── Image Helpers ────────────────────────────────────────────────────────────
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

// ─── Image Validation ─────────────────────────────────────────────────────────
const onImageSelected = (file: File | null) => {
  imageError.value = false;
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    imageError.value = true;
    imageFile.value = null;
    existingImageUrl.value = '';
    return;
  }

  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    if (img.width !== 1199 || img.height !== 581) {
      imageError.value = true;
      imageFile.value = null;
      existingImageUrl.value = '';
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

// ─── Festival Name Validation ─────────────────────────────────────────────────
const onFestivalNameChange = (val: string | number | null) => {
  nameError.value = false;
  if (typeof val !== 'string') return;
  const pattern = /^[^-].*[^-]-[^-]+-\d{4}$/;
  if (val && !pattern.test(val)) nameError.value = true;
};

// ─── API: Fetch Festival ──────────────────────────────────────────────────────
const fetchFestivalId = async (id: string): Promise<void> => {
  $q.loading.show();
  festivalId.value = id;
  try {
    const response = await api.get(`/backoffice/festival/${Number(id)}`);
    const data: FestivalData = response.data.festival;

    festivalName.value = data.festivalName;
    webName.value = data.webName;
    isEdit.value = data.isEdit;
    isEditEndDate.value = data.isEditEndDate;
    createdBy.value = Number(data.createdBy);

    if (data.startDate) startDate.value = data.startDate.substring(0, 10).replace(/-/g, '/');
    if (data.endDate) endDate.value = data.endDate.substring(0, 10).replace(/-/g, '/');

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
      data.wisher?.map((w: WisherApi): WishItem => ({ wId: w.wId, wishWord: w.wishWord })) ?? [];

    if (data.card && data.card.length > 0) {
      const cardPromises = data.card.map(async (c: CardApi) => {
        const previewUrl = await getImageUrl(c.imageCard);
        return { cId: c.cId, imageName: c.imageCard, previewUrl };
      });
      existingCards.value = await Promise.all(cardPromises);
    }

    LocalStorage.set('festivalId', id);
  } catch (error) {
    console.error(error);
    showFetchErrorDialog.value = true;
  } finally {
    $q.loading.hide();
  }
};

// ─── Wish Actions ─────────────────────────────────────────────────────────────
const onAddWish = () => {
  tempWish.value = '';
  addWishDialog.value = true;
};

const addWishToList = () => {
  if (!tempWish.value.trim()) return;
  wishWordList.value.push({ wishWord: tempWish.value.trim() });
  tempWish.value = '';
  addWishDialog.value = false;
};

const editWish = (index: number) => {
  const wish = wishWordList.value[index];
  if (!wish) return;
  tempWish.value = wish.wishWord;
  editingIndex.value = index;
  editWishDialog.value = true;
};

const updateWish = () => {
  if (editingIndex.value === null || !tempWish.value.trim()) return;
  const existing = wishWordList.value[editingIndex.value];
  wishWordList.value[editingIndex.value] = {
    ...(existing?.wId !== undefined ? { wId: existing.wId } : {}),
    wishWord: tempWish.value.trim(),
  };
  tempWish.value = '';
  editingIndex.value = null;
  editWishDialog.value = false;
};

const deleteWish = (i: number) => {
  const item = wishWordList.value[i];
  if (!item) return;
  deleteIndex.value = i;
  itemToDelete.value = item.wishWord;
  deleteWishDialog.value = true;
};

const confirmDelete = () => {
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

  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
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
      cardErrorMsg.value = `ขนาดรูปต้องเป็น 691×691 px (พบ ${img.width}×${img.height})`;
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
const removeExistingCard = (i: number) => {
  existingCards.value.splice(i, 1);
};

// ─── Validation ───────────────────────────────────────────────────────────────
const validateAndScroll = async (): Promise<boolean> => {
  imageError.value = false;
  nameError.value = false;
  logoError.value = false;
  webNameError.value = false;
  dateError.value = false;
  dateErrorMsg.value = '';

  // ถ้าแก้ไขได้เฉพาะ endDate (ไม่ใช่ owner และ isEdit = false)
  if (!canEdit.value) {
    if (canEditEndDate.value && startDate.value && !endDate.value) {
      dateError.value = true;
      dateErrorMsg.value = 'กรุณาเลือกวันสิ้นสุดด้วย';
      await nextTick();
      dateRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  const isImageValid = !!imageFile.value || !!existingImageUrl.value;
  const isNameValid =
    typeof festivalName.value === 'string' && /^[^-]+-[^-]+-\d{4}$/.test(festivalName.value);
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
    const targets: Array<{ valid: boolean; el: HTMLElement | null }> = [
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
const submitEdit = async () => {
  const isValid = await validateAndScroll();
  if (!isValid) return;

  loading.value = true;
  try {
    let festivalImageName = existingImageName.value;
    if (imageFile.value) {
      const fd = new FormData();
      fd.append('singleFile', imageFile.value);
      const res = await api.post('/upload', fd);
      festivalImageName = res.data.image as string;
    }

    let festivalLogoName = '';
    if (logoFile.value) {
      const fd = new FormData();
      fd.append('singleFile', logoFile.value);
      const res = await api.post('/upload', fd);
      festivalLogoName = res.data.image as string;
    }

    let newCardImageNames: string[] = [];
    if (cardFileList.value.length > 0) {
      newCardImageNames = await Promise.all(
        cardFileList.value.map(async (file) => {
          const formData = new FormData();
          formData.append('singleFile', file);
          const res = await api.post('/upload', formData);
          return res.data.image as string;
        }),
      );
    }

    const allCards = [
      ...existingCards.value.map((c) => ({ cId: c.cId, imageCard: c.imageName })),
      ...newCardImageNames.map((imgName) => ({ imageCard: imgName })),
    ];

    const payload = {
      festivalName: festivalName.value,
      image: festivalImageName,
      logo: festivalLogoName,
      webName: webName.value,
      startDate: startDate.value ? startDate.value.replace(/\//g, '-') : undefined,
      endDate: endDate.value ? endDate.value.replace(/\//g, '-') : undefined,
      wisher: wishWordList.value.map((w) => ({
        ...(w.wId !== undefined ? { wId: w.wId } : {}),
        wishWord: w.wishWord,
      })),
      card: allCards,
    };

    let response;
    if (festivalId.value) {
      response = await api.patch(`/backoffice/festival/${festivalId.value}`, payload);
    } else {
      response = await api.post('/backoffice/festival', payload);
    }

    openSuccessDialog(response.data.message || 'บันทึกเทศกาลสำเร็จแล้ว');
    setTimeout(() => {
      showSuccessDialog.value = false;
      void router.push('/backoffice/festival');
    }, 2000);
  } catch {
    openErrorDialog('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
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

// const SHAPES: ShapeType[] = ['circle', 'square', 'star', 'triangle', 'emoji'];
// const WEIGHTS = [0.25, 0.2, 0.2, 0.15, 0.2];

// const pickShape = (): ShapeType => {
//   const r = Math.random();
//   let cumulative = 0;
//   for (let i = 0; i < SHAPES.length; i++) {
//     cumulative += WEIGHTS[i] ?? 0;
//     if (r < cumulative) return SHAPES[i] ?? 'circle';
//   }
//   return 'circle';
// };

// ─── Particle Spawn ───────────────────────────────────────────────────────────
// const spawnParticles = (x: number, y: number) => {
//   const count = 36 + Math.floor(Math.random() * 12);
//   const W = window.innerWidth;
//   const H = window.innerHeight;

//   for (let i = 0; i < count; i++) {
//     const id = ++particleId;
//     const size = 7 + Math.random() * 11;
//     const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)] ?? '#fbbf24';
//     const dur = 1.2 + Math.random() * 1.2;
//     const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)] ?? '🎉';
//     const shape = pickShape();
//     const isEmoji = shape === 'emoji';

//     const zone = i % 8;
//     let targetX: number;
//     let targetY: number;

//     switch (zone) {
//       case 0: targetX = Math.random() * W * 0.35; targetY = Math.random() * H * 0.35; break;
//       case 1: targetX = W * 0.25 + Math.random() * W * 0.5; targetY = Math.random() * H * 0.25; break;
//       case 2: targetX = W * 0.65 + Math.random() * W * 0.35; targetY = Math.random() * H * 0.35; break;
//       case 3: targetX = W * 0.65 + Math.random() * W * 0.35; targetY = H * 0.25 + Math.random() * H * 0.5; break;
//       case 4: targetX = W * 0.65 + Math.random() * W * 0.35; targetY = H * 0.65 + Math.random() * H * 0.35; break;
//       case 5: targetX = W * 0.25 + Math.random() * W * 0.5; targetY = H * 0.75 + Math.random() * H * 0.25; break;
//       case 6: targetX = Math.random() * W * 0.35; targetY = H * 0.65 + Math.random() * H * 0.35; break;
//       case 7: targetX = Math.random() * W * 0.25; targetY = H * 0.25 + Math.random() * H * 0.5; break;
//       default: targetX = Math.random() * W; targetY = Math.random() * H;
//     }

//     const style: Record<string, string> = {
//       '--x': `${x}px`, '--y': `${y}px`,
//       '--dx': `${targetX - x}px`, '--dy': `${targetY - y}px`,
//       '--dur': `${dur}s`,
//       '--color': isEmoji ? 'transparent' : color,
//       '--size': isEmoji ? '22px' : `${size}px`,
//       '--shape': shape,
//       '--emoji-content': isEmoji ? `"${emoji}"` : '""',
//       '--rot': `${Math.random() * 720 - 360}deg`,
//     };

//     activeParticles.value.push({ id, style });
//     setTimeout(() => {
//       activeParticles.value = activeParticles.value.filter((p) => p.id !== id);
//     }, dur * 1000 + 200);
//   }
// };

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
onMounted(async () => {
  const id = (route.params.id as string) || (route.query.id as string);
  if (id) await fetchFestivalId(id);
  window.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClick);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap');

// ─── Design Tokens ────────────────────────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────────────────────────
.edit-festival-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(160deg, #f0edff 0%, #fff8ee 50%, #e8f9f6 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
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
    transform: translateY(0);
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

// ─── Form ─────────────────────────────────────────────────────────────────────
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

// ─── Cards ────────────────────────────────────────────────────────────────────
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

// ─── Upload Zones ─────────────────────────────────────────────────────────────
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

.upload-zone--error {
  border-color: $error-red !important;
  border-style: solid !important;
  background: #fff5f5 !important;
  animation: shake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
.upload-zone--disabled {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}

.cover-img {
  border-radius: 12px;
}
.logo-preview {
  border-radius: 10px;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 20, 96, 0.5);
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

.cover-placeholder,
.logo-placeholder {
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.logo-placeholder {
  padding: 1.5rem 1rem;
}
.cover-placeholder-icon {
  font-size: 2.5rem;
}
.logo-placeholder-icon {
  font-size: 2rem;
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
  background: rgba(45, 45, 138, 0.07);
  border: 1px solid rgba(45, 45, 138, 0.15);
  color: $indigo-mid;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.15s;
  &:hover {
    background: rgba(45, 45, 138, 0.14);
    border-color: rgba(45, 45, 138, 0.3);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
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

// ─── Input ────────────────────────────────────────────────────────────────────
.custom-input :deep(.q-field__control) {
  border-radius: 12px !important;
}

// ─── Date Section ─────────────────────────────────────────────────────────────
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

// ─── Date Chips ───────────────────────────────────────────────────────────────
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

.date-chip-clear {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  flex-shrink: 0;
  background: rgba(45, 45, 138, 0.1);
  color: $text-muted;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    transform 0.15s;
  &:hover {
    background: rgba(229, 57, 53, 0.15);
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

// ─── Duration Badge ───────────────────────────────────────────────────────────
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

// ─── Calendars ────────────────────────────────────────────────────────────────
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

// ─── Card Header Row ──────────────────────────────────────────────────────────
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

// ─── Card Grid ────────────────────────────────────────────────────────────────
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
.card-thumb-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(26, 20, 96, 0.75);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover {
    background: $coral;
  }
}

// ─── Empty State ──────────────────────────────────────────────────────────────
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

// ─── Submit Button ────────────────────────────────────────────────────────────
.submit-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, $indigo-deep 0%, $indigo-mid 50%, #5a3ea0 100%);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(45, 45, 138, 0.35);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    opacity 0.2s;
  letter-spacing: 0.01em;
  &:hover:not(.loading):not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(45, 45, 138, 0.4);
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

// ─── Dialogs ──────────────────────────────────────────────────────────────────
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

.delete-confirm-text {
  text-align: center;
  font-size: 0.92rem;
  color: $text-main;
  line-height: 1.8;
  margin: 0;
}
.delete-target {
  color: $coral;
  font-weight: 700;
}

// ─── Result Dialogs ───────────────────────────────────────────────────────────
.result-dialog {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 340px;
  max-width: 92vw;
  box-shadow: 0 24px 64px rgba(26, 20, 96, 0.18);
}

.result-dialog-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  &--success {
    background: linear-gradient(135deg, $green-dark, $green);
  }
  &--error {
    background: linear-gradient(135deg, #7f1d1d, #dc2626);
  }
  &--warning {
    background: linear-gradient(135deg, $amber-dark, $amber);
  }
}
.result-dialog-icon {
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
.result-dialog-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.result-dialog-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}
.result-dialog-body {
  padding: 1.5rem 1.5rem 0.75rem;
  text-align: center;
}

.result-dialog-emoji {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  display: block;
  animation: resultPop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes resultPop {
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

.result-dialog-msg {
  font-size: 0.92rem;
  font-weight: 600;
  color: #374151;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0;
  line-height: 1.6;
  &--success {
    background: $green-soft;
  }
  &--error {
    background: #fef2f2;
  }
  &--warning {
    background: $amber-soft;
  }
}
.result-dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1.5rem 1.25rem;
}

.result-dialog-progress {
  height: 4px;
  width: 100%;
  transform-origin: left;
  animation: progressShrink 2s linear forwards;
  &--success {
    background: linear-gradient(90deg, $green-dark, $green);
  }
  &--error {
    background: linear-gradient(90deg, #7f1d1d, #dc2626);
    animation-duration: 2.5s;
  }
}

@keyframes progressShrink {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

// ─── Animations ───────────────────────────────────────────────────────────────
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

.err-fade-enter-active,
.err-fade-leave-active {
  transition: all 0.25s ease;
}
.err-fade-enter-from,
.err-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

// ─── Responsive ───────────────────────────────────────────────────────────────
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
