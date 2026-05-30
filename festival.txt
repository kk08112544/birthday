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
        <div class="hero-actions">
          <q-btn
            unelevated
            icon="arrow_back"
            label="กลับรายการ"
            to="/backoffice/festival"
            class="hero-back-btn"
          />
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="content-wrap">
      <div class="form-container">
        <!-- CARD: ข้อมูลเทศกาล -->
        <div class="fest-card animate-in" style="animation-delay: 0.05s">
          <div class="card-label"><span class="label-dot" />ข้อมูลเทศกาล</div>

          <!-- Cover -->
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
                <div class="cover-overlay">
                  <q-icon name="photo_camera" size="28px" color="white" /><span>เปลี่ยนรูป</span>
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
                  <q-icon name="open_in_new" size="13px" />แปลงขนาดรูปภาพที่นี่
                </a>
              </div>
            </div>
            <transition name="err-fade">
              <div v-if="imageError" class="error-msg">
                <q-icon name="error_outline" size="14px" />กรุณาอัปโหลดรูปหน้าปก PNG/JPG ขนาด 2188 ×
                417 px ไม่เกิน 2 MB
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

          <!-- Festival name -->
          <div ref="nameRef" class="q-mt-md field-group">
            <q-input
              outlined
              v-model="festivalName"
              label="ชื่อเทศกาล"
              placeholder="เช่น สงกรานต์-กกจ-2568"
              hint="รูปแบบ: เทศกาล-ตัวย่อหน่วยงาน (2-5)-ปี(4หลัก)"
              dense
              autofocus
              :error="nameError"
              :error-message="
                nameError
                  ? 'รูปแบบต้องเป็น เทศกาล-ตัวย่อหน่วยงาน (2-5)-ปี(4หลัก) เช่น สงกรานต์-IT-2568'
                  : ''
              "
              class="custom-input"
              @update:model-value="onFestivalNameChange"
            >
              <template v-slot:prepend><q-icon name="festival" color="deep-orange-5" /></template>
            </q-input>
          </div>

          <!-- Logo -->
          <div ref="logoRef" class="q-mt-md field-group">
            <div class="logo-row">
              <div
                class="logo-upload-zone"
                :class="{ 'upload-zone--error': logoError }"
                @click="!useDeptLogo && logoInput?.pickFiles()"
              >
                <img
                  v-if="logoFile || useDeptLogo"
                  :src="useDeptLogo ? '/logo-ldd.png' : getFilePreview(logoFile!)"
                  class="logo-preview-img"
                  alt="logo preview"
                />
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
              <div class="dept-logo-option" @click="toggleDeptLogo">
                <img src="/logo-ldd.png" class="dept-logo-img" alt="logo กรม" />
                <div class="dept-logo-check" :class="{ 'dept-logo-check--active': useDeptLogo }">
                  <q-icon v-if="useDeptLogo" name="check" size="14px" color="white" />
                </div>
              </div>
            </div>
          </div>
          <q-file
            v-model="logoFile"
            ref="logoInput"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            class="hidden"
            @update:model-value="onLogoSelected"
          />

          <!-- Web name -->
          <div ref="webNameRef" class="q-mt-md field-group">
            <q-input
              v-model="webName"
              label="ชื่อเว็บไซต์ (URL slug)"
              placeholder="เช่น สงกรานต์-กกจ-2568"
              hint="รูปแบบ: เทศกาล-ตัวย่อหน่วยงาน (2-5)-ปี(4หลัก)"
              outlined
              dense
              :error="webNameError"
              :error-message="
                webNameError
                  ? 'รูปแบบต้องเป็น เทศกาล-ตัวย่อหน่วยงาน (2-5)-ปี(4หลัก) เช่น สงกรานต์-IT-2568'
                  : ''
              "
              class="custom-input"
              @update:model-value="onWebNameChange"
            >
              <template v-slot:prepend><q-icon name="language" color="deep-orange-5" /></template>
            </q-input>
          </div>
        </div>

        <!-- CARD: ช่วงเวลา -->
        <div ref="dateRef" class="fest-card animate-in field-group" style="animation-delay: 0.1s">
          <div class="card-label"><span class="label-dot label-dot--teal" />ช่วงเวลาของเทศกาล</div>
          <div class="date-summary-row">
            <div
              class="date-chip"
              :class="{
                'date-chip--active': startDate,
                'date-chip--error': dateError && !startDate,
              }"
            >
              <div class="date-chip-icon"><q-icon name="play_circle" size="14px" /></div>
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
            <div class="date-range-arrow"><q-icon name="arrow_forward" size="16px" /></div>
            <div
              class="date-chip date-chip--end"
              :class="{ 'date-chip--active': endDate, 'date-chip--error': dateError && !endDate }"
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
          <transition name="duration-fade">
            <div v-if="startDate && endDate && durationDays >= 0" class="duration-badge">
              <q-icon name="schedule" size="14px" />ระยะเวลา {{ durationDays + 1 }} วัน
              <span v-if="durationDays === 0">· วันเดียว</span>
            </div>
          </transition>
          <transition name="err-fade">
            <div v-if="dateError" class="error-msg q-mt-xs">
              <q-icon name="error_outline" size="14px" />{{ dateErrorMsg }}
            </div>
          </transition>
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

        <!-- CARD: คำอวยพร -->
        <div class="fest-card animate-in" style="animation-delay: 0.15s">
          <div class="card-label"><span class="label-dot label-dot--amber" />คำอวยพร</div>
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

        <!-- CARD: บัตรอวยพร -->
        <div class="fest-card animate-in" style="animation-delay: 0.2s">
          <div class="card-label"><span class="label-dot label-dot--teal" />บัตรอวยพร</div>
          <div class="card-header-row">
            <div class="stat-chip">
              <q-icon name="photo_library" size="17px" color="teal-6" />
              <span class="stat-num">{{ totalCardCount }}</span>
              <span class="stat-label">รูป</span>
            </div>
            <q-btn
              unelevated
              color="teal-6"
              icon="add_photo_alternate"
              label="เพิ่มบัตรอวยพร"
              class="action-btn"
              @click="onAddCard"
            />
          </div>
          <div v-if="totalCardCount > 0" class="card-grid">
            <!-- บัตรที่เลือกจาก API (เป็น URL) -->
            <div v-for="(item, i) in selectedApiCards" :key="'api-' + item.cId" class="card-thumb">
              <q-img
                :src="getCardImageUrl(item.imageCard)"
                ratio="1"
                fit="contain"
                class="card-thumb-img"
              />
              <div class="card-thumb-badge card-thumb-badge--api">
                <q-icon name="cloud_done" size="11px" />คลัง
              </div>
              <button class="card-thumb-remove" type="button" @click="removeApiCard(i)">
                <q-icon name="close" size="14px" />
              </button>
            </div>
            <!-- บัตรที่อัปโหลดใหม่ (เป็น File) -->
            <div v-for="(file, i) in cardFileList" :key="'file-' + i" class="card-thumb">
              <q-img :src="getFilePreview(file)" ratio="1" fit="contain" class="card-thumb-img" />
              <div class="card-thumb-badge card-thumb-badge--new">
                <q-icon name="upload" size="11px" />ใหม่
              </div>
              <button class="card-thumb-remove" type="button" @click="removeCard(i)">
                <q-icon name="close" size="14px" />
              </button>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="empty-icon">🃏</div>
            <div class="empty-title">ยังไม่มีบัตรอวยพร</div>
            <div class="empty-sub">เลือกจากคลังบัตรหรืออัปโหลดรูปสวยๆ (691 × 691 px)</div>
          </div>
        </div>

        <!-- Submit -->
        <div class="animate-in" style="animation-delay: 0.25s">
          <button
            type="button"
            class="submit-btn"
            :class="{ 'submit-btn--loading': loading }"
            :disabled="loading"
            @click="submitAdd"
          >
            <span v-if="!loading" class="submit-btn-inner"
              ><q-icon name="check_circle" size="20px" />บันทึกเทศกาล</span
            >
            <span v-else class="submit-btn-inner"
              ><q-circular-progress indeterminate size="20px" color="white" />กำลังบันทึก...</span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- ===== DIALOG: เลือกคำอวยพร ===== -->
    <q-dialog
      v-model="wishSelectorOpen"
      transition-show="slide-up"
      transition-hide="slide-down"
      :maximized="$q.screen.lt.md"
      full-height
      :content-style="$q.screen.gt.sm ? 'width:min(1200px,96vw);max-width:96vw' : ''"
    >
      <div class="wish-dlg">
        <!-- Header -->
        <div class="wish-dlg-header">
          <div class="wish-dlg-header-left">
            <div class="wish-dlg-header-icon">
              <q-icon name="format_quote" color="white" size="20px" />
            </div>
            <div class="wish-dlg-header-text">
              <div class="wish-dlg-title">เลือกคำอวยพร</div>
              <div class="wish-dlg-sub">เลือกได้หลายรายการ · พิมพ์คำอวยพรเองได้</div>
            </div>
          </div>
          <div class="wish-dlg-header-right">
            <div class="wish-dlg-tabs">
              <button
                class="wish-tab-btn"
                :class="{ 'wish-tab-btn--active': wishDlgTab === 'browse' }"
                type="button"
                @click="wishDlgTab = 'browse'"
              >
                <q-icon name="search" size="15px" />
                <span class="wish-tab-label">เลือกจากรายการ</span>
                <span v-if="tempSelectedWishes.size > 0" class="wish-tab-badge">{{
                  tempSelectedWishes.size
                }}</span>
              </button>
              <button
                class="wish-tab-btn"
                :class="{ 'wish-tab-btn--active': wishDlgTab === 'custom' }"
                type="button"
                @click="wishDlgTab = 'custom'"
              >
                <q-icon name="edit_note" size="15px" />
                <span class="wish-tab-label">เพิ่มเอง</span>
              </button>
            </div>
            <button class="wish-dlg-close" type="button" @click="closeWishSelector">
              <q-icon name="close" size="20px" />
            </button>
          </div>
        </div>

        <!-- TAB: Browse -->
        <template v-if="wishDlgTab === 'browse'">
          <div class="wish-dlg-filters">
            <div class="wish-filter-grid">
              <q-input
                v-model="wishFilterWord"
                dense
                outlined
                placeholder="ค้นหาคำอวยพร..."
                clearable
                autofocus
                class="custom-input wish-filter-input"
                @update:model-value="onFilterChange"
              >
                <template v-slot:prepend
                  ><q-icon name="format_quote" size="16px" color="deep-orange-5"
                /></template>
              </q-input>
              <q-input
                v-model="wishFilterFestival"
                dense
                outlined
                placeholder="ค้นหาเทศกาล..."
                clearable
                class="custom-input wish-filter-input"
                @update:model-value="onFilterChange"
              >
                <template v-slot:prepend
                  ><q-icon name="celebration" size="16px" color="deep-orange-5"
                /></template>
              </q-input>
              <q-select
                v-model="wishFilterMonth"
                :options="monthOptions"
                dense
                outlined
                clearable
                emit-value
                map-options
                option-value="value"
                option-label="label"
                label="เดือน"
                class="custom-input wish-filter-input"
                @update:model-value="onFilterChange"
              >
                <template v-slot:no-option>
                  <q-item
                    ><q-item-section class="text-grey-6">ไม่มีข้อมูลเดือน</q-item-section></q-item
                  >
                </template>
              </q-select>
              <q-select
                v-model="wishFilterYear"
                :options="yearFilterOptions"
                dense
                outlined
                clearable
                use-input
                input-debounce="200"
                hide-selected
                fill-input
                emit-value
                map-options
                option-value="value"
                option-label="label"
                label="ปี (พ.ศ.)"
                placeholder="พิมพ์ค้นหาปี..."
                class="custom-input wish-filter-input"
                @filter="onYearFilter"
                @update:model-value="onFilterChange"
              >
                <template v-slot:no-option>
                  <q-item
                    ><q-item-section class="text-grey-6">ไม่พบปีที่ค้นหา</q-item-section></q-item
                  >
                </template>
              </q-select>
            </div>
            <div class="wish-filter-actions">
              <button
                v-if="hasActiveFilters"
                class="wish-filter-clear"
                type="button"
                @click="clearFilters"
              >
                <q-icon name="filter_alt_off" size="15px" />ล้างตัวกรอง
              </button>
            </div>
          </div>

          <div class="wish-dlg-scroll">
            <!-- Loading skeleton -->
            <template v-if="wishApiLoading && wishApiItems.length === 0">
              <table class="wish-table">
                <thead>
                  <tr>
                    <th class="wish-table-th wish-table-th--num">#</th>
                    <th class="wish-table-th">คำอวยพร</th>
                    <th class="wish-table-th">เทศกาล</th>
                    <th class="wish-table-th wish-table-th--action"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="n in 8" :key="'sk-' + n" class="wish-table-row">
                    <td class="wish-table-td wish-table-td--num">
                      <div class="wsp-skeleton-line" style="width: 20px; height: 12px" />
                    </td>
                    <td class="wish-table-td">
                      <div
                        class="wsp-skeleton-line"
                        :style="{ width: 40 + (n % 4) * 15 + '%', height: '12px' }"
                      />
                    </td>
                    <td class="wish-table-td">
                      <div class="wsp-skeleton-line" style="width: 80px; height: 12px" />
                    </td>
                    <td class="wish-table-td"></td>
                  </tr>
                </tbody>
              </table>
            </template>

            <!-- Error -->
            <div v-else-if="wishApiError && wishApiItems.length === 0" class="wsp-api-empty">
              <q-icon name="wifi_off" size="32px" color="grey-4" />
              <div class="wsp-api-empty-text">โหลดข้อมูลไม่สำเร็จ</div>
              <button class="wsp-retry-btn" type="button" @click="loadWishPage(wishApiPage)">
                <q-icon name="refresh" size="14px" />ลองใหม่
              </button>
            </div>

            <!-- Empty -->
            <div v-else-if="!wishApiLoading && wishApiItems.length === 0" class="wsp-api-empty">
              <q-icon name="search_off" size="32px" color="grey-4" />
              <div class="wsp-api-empty-text">ไม่พบคำอวยพรที่ตรงกับเงื่อนไข</div>
            </div>

            <!-- Table -->
            <template v-else>
              <table class="wish-table">
                <thead>
                  <tr>
                    <th class="wish-table-th wish-table-th--num">#</th>
                    <th class="wish-table-th">คำอวยพร</th>
                    <th class="wish-table-th wish-table-th--fest">เทศกาล</th>
                    <th class="wish-table-th wish-table-th--action"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(items, festName) in groupedWishApiItems" :key="festName">
                    <tr
                      v-for="item in items"
                      :key="item.wId"
                      class="wish-table-row"
                      :class="{
                        'wish-table-row--selected': tempSelectedWishes.has(item.wishWord),
                        'wish-table-row--added': wishWordList.includes(item.wishWord),
                      }"
                      @click="toggleTempWish(item.wishWord)"
                    >
                      <td class="wish-table-td wish-table-td--num">
                        <div
                          v-if="tempSelectedWishes.has(item.wishWord)"
                          class="wish-table-check wish-table-check--on"
                        >
                          <q-icon name="check" size="12px" color="white" />
                        </div>
                        <div
                          v-else-if="wishWordList.includes(item.wishWord)"
                          class="wish-table-check wish-table-check--added"
                        >
                          <q-icon name="check" size="12px" color="grey-5" />
                        </div>
                        <span v-else class="wish-table-num-text">{{
                          rowNumberMap.get(item.wId)
                        }}</span>
                      </td>
                      <td class="wish-table-td wish-table-td--word">
                        {{ item.wishWord }}
                      </td>
                      <td class="wish-table-td wish-table-td--fest">
                        <span class="wish-fest-badge">{{
                          item.festival?.festivalName ?? 'อื่นๆ'
                        }}</span>
                      </td>
                      <td class="wish-table-td wish-table-td--action">
                        <q-icon
                          v-if="wishWordList.includes(item.wishWord)"
                          name="check_circle"
                          size="16px"
                          color="grey-4"
                        />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div v-if="wishApiLoading" class="wsp-load-more">
                <q-circular-progress indeterminate size="22px" color="deep-orange-5" />
              </div>
            </template>
          </div>

          <!-- ✅ Compact pagination — แบบเดียวกับ q-table ใน unpolite page -->
          <div v-if="wishApiTotal > 0" class="compact-pg compact-pg--wish">
            <div class="compact-pg-left">
              <span class="compact-pg-label">รายการต่อหน้า:</span>
              <q-select
                v-model="wishApiLimit"
                :options="limitOptions"
                dense
                borderless
                :disable="wishApiLoading"
                class="compact-pg-select"
                @update:model-value="onLimitChange"
              />
            </div>
            <div class="compact-pg-info">{{ wishRangeText }}</div>
            <div class="compact-pg-nav">
              <button
                type="button"
                class="compact-pg-btn"
                :disabled="wishApiPage <= 1 || wishApiLoading"
                aria-label="ก่อนหน้า"
                @click="loadWishPage(wishApiPage - 1)"
              >
                <q-icon name="chevron_left" size="20px" />
              </button>
              <button
                type="button"
                class="compact-pg-btn"
                :disabled="wishApiPage >= wishApiTotalPages || wishApiLoading"
                aria-label="ถัดไป"
                @click="loadWishPage(wishApiPage + 1)"
              >
                <q-icon name="chevron_right" size="20px" />
              </button>
            </div>
          </div>

          <div class="wish-dlg-footer">
            <div class="wish-footer-summary">
              <template v-if="tempSelectedWishes.size > 0">
                <q-icon name="check_circle" size="16px" color="deep-orange-5" />
                <span>เลือกแล้ว {{ tempSelectedWishes.size }} รายการ</span>
              </template>
              <span v-else class="wish-footer-empty-label">ยังไม่ได้เลือก</span>
            </div>
            <div class="wish-footer-actions">
              <button type="button" class="dlg-btn dlg-btn--cancel" @click="closeWishSelector">
                ยกเลิก
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--secondary"
                @click="wishDlgTab = 'custom'"
              >
                <q-icon name="edit_note" size="16px" /><span>เพิ่มเอง</span>
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--confirm"
                :disabled="tempSelectedWishes.size === 0"
                @click="confirmWishSelection"
              >
                <q-icon name="add_circle" size="17px" /><span>เพิ่มในรายการ</span>
                <span v-if="tempSelectedWishes.size > 0" class="wsp-badge">{{
                  tempSelectedWishes.size
                }}</span>
              </button>
            </div>
          </div>
        </template>

        <!-- TAB: Custom -->
        <template v-if="wishDlgTab === 'custom'">
          <div class="wish-dlg-custom-body">
            <div class="wish-custom-left">
              <div class="wish-custom-section-title">
                <q-icon name="edit_note" size="18px" color="deep-orange-5" />พิมพ์คำอวยพรของคุณ
              </div>
              <p class="wish-custom-hint">
                พิมพ์คำอวยพรที่ต้องการ แล้วกด "เพิ่มทันที" หรือกด Ctrl+Enter
              </p>
              <q-input
                v-model="customWishText"
                type="textarea"
                outlined
                dense
                placeholder="เช่น สุขสันต์วันเกิด ขอให้มีความสุขมากๆ นะคะ..."
                class="custom-input"
                autogrow
                @keydown.ctrl.enter="addCustomWish"
              />
              <q-btn
                unelevated
                color="deep-orange-5"
                icon="add"
                label="เพิ่มทันที"
                class="action-btn q-mt-sm full-width"
                :disable="!customWishText.trim()"
                @click="addCustomWish"
              />
              <div class="wish-custom-shortcut">Ctrl + Enter เพื่อเพิ่มเร็ว</div>
            </div>
            <div class="wish-custom-right">
              <div class="wish-custom-section-title">
                <q-icon name="checklist" size="18px" color="deep-orange-5" />รายการที่เลือกทั้งหมด
                <span v-if="tempSelectedWishes.size > 0" class="wish-sel-badge">{{
                  tempSelectedWishes.size
                }}</span>
              </div>
              <div v-if="tempSelectedWishes.size > 0" class="wish-sel-list">
                <div v-for="w in Array.from(tempSelectedWishes)" :key="w" class="wish-sel-item">
                  <span class="wish-sel-text">{{ w }}</span>
                  <div class="wish-sel-actions">
                    <button
                      class="wish-sel-btn wish-sel-btn--edit"
                      type="button"
                      @click="editSelectedWish(w)"
                    >
                      <q-icon name="edit" size="15px" />
                    </button>
                    <button
                      class="wish-sel-btn wish-sel-btn--delete"
                      type="button"
                      @click="toggleTempWish(w)"
                    >
                      <q-icon name="delete_outline" size="15px" />
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="wish-sel-empty">
                <q-icon name="touch_app" size="26px" color="grey-4" />
                <div>ยังไม่มีรายการที่เลือก</div>
                <button class="wsp-retry-btn" type="button" @click="wishDlgTab = 'browse'">
                  <q-icon name="search" size="13px" />ไปเลือกจากรายการ
                </button>
              </div>
            </div>
          </div>
          <div class="wish-dlg-footer">
            <div class="wish-footer-summary">
              <template v-if="tempSelectedWishes.size > 0">
                <q-icon name="check_circle" size="16px" color="deep-orange-5" />
                <span>เลือกแล้ว {{ tempSelectedWishes.size }} รายการ</span>
              </template>
              <span v-else class="wish-footer-empty-label">ยังไม่ได้เลือก</span>
            </div>
            <div class="wish-footer-actions">
              <button type="button" class="dlg-btn dlg-btn--cancel" @click="closeWishSelector">
                ยกเลิก
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--secondary"
                @click="wishDlgTab = 'browse'"
              >
                <q-icon name="search" size="16px" /><span>กลับเลือก</span>
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--confirm"
                :disabled="tempSelectedWishes.size === 0"
                @click="confirmWishSelection"
              >
                <q-icon name="add_circle" size="17px" /><span>เพิ่มในรายการ</span>
                <span v-if="tempSelectedWishes.size > 0" class="wsp-badge">{{
                  tempSelectedWishes.size
                }}</span>
              </button>
            </div>
          </div>
        </template>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: เลือกบัตรอวยพร ===== -->
    <q-dialog
      v-model="cardSelectorOpen"
      transition-show="slide-up"
      transition-hide="slide-down"
      :maximized="$q.screen.lt.md"
      full-height
      :content-style="$q.screen.gt.sm ? 'width:min(1200px,96vw);max-width:96vw' : ''"
    >
      <div class="wish-dlg card-dlg">
        <!-- Header -->
        <div class="wish-dlg-header card-dlg-header">
          <div class="wish-dlg-header-left">
            <div class="wish-dlg-header-icon">
              <q-icon name="photo_library" color="white" size="20px" />
            </div>
            <div class="wish-dlg-header-text">
              <div class="wish-dlg-title">เลือกบัตรอวยพร</div>
              <div class="wish-dlg-sub">เลือกได้หลายรูป · อัปโหลดรูปใหม่ได้</div>
            </div>
          </div>
          <div class="wish-dlg-header-right">
            <div class="wish-dlg-tabs">
              <button
                class="wish-tab-btn"
                :class="{ 'wish-tab-btn--active': cardDlgTab === 'browse' }"
                type="button"
                @click="cardDlgTab = 'browse'"
              >
                <q-icon name="search" size="15px" />
                <span class="wish-tab-label">เลือกจากคลัง</span>
                <span v-if="tempSelectedCards.size > 0" class="wish-tab-badge">{{
                  tempSelectedCards.size
                }}</span>
              </button>
              <button
                class="wish-tab-btn"
                :class="{ 'wish-tab-btn--active': cardDlgTab === 'upload' }"
                type="button"
                @click="cardDlgTab = 'upload'"
              >
                <q-icon name="upload" size="15px" />
                <span class="wish-tab-label">อัปโหลดใหม่</span>
                <span v-if="tempUploadCards.length > 0" class="wish-tab-badge">{{
                  tempUploadCards.length
                }}</span>
              </button>
            </div>
            <button class="wish-dlg-close" type="button" @click="closeCardSelector">
              <q-icon name="close" size="20px" />
            </button>
          </div>
        </div>

        <!-- TAB: Browse from API -->
        <template v-if="cardDlgTab === 'browse'">
          <div class="wish-dlg-filters">
            <div class="wish-filter-grid card-filter-grid">
              <q-input
                v-model="cardFilterFestival"
                dense
                outlined
                placeholder="ค้นหาเทศกาล..."
                clearable
                autofocus
                class="custom-input wish-filter-input"
                @update:model-value="onCardFilterChange"
              >
                <template v-slot:prepend
                  ><q-icon name="celebration" size="16px" color="teal-6"
                /></template>
              </q-input>
              <q-select
                v-model="cardFilterMonth"
                :options="cardMonthOptions"
                dense
                outlined
                clearable
                emit-value
                map-options
                option-value="value"
                option-label="label"
                label="เดือน"
                class="custom-input wish-filter-input"
                @update:model-value="onCardFilterChange"
              >
                <template v-slot:no-option>
                  <q-item
                    ><q-item-section class="text-grey-6">ไม่มีข้อมูลเดือน</q-item-section></q-item
                  >
                </template>
              </q-select>
              <q-select
                v-model="cardFilterYear"
                :options="cardYearFilterOptions"
                dense
                outlined
                clearable
                use-input
                input-debounce="200"
                hide-selected
                fill-input
                emit-value
                map-options
                option-value="value"
                option-label="label"
                label="ปี (พ.ศ.)"
                placeholder="พิมพ์ค้นหาปี..."
                class="custom-input wish-filter-input"
                @filter="onCardYearFilter"
                @update:model-value="onCardFilterChange"
              >
                <template v-slot:no-option>
                  <q-item
                    ><q-item-section class="text-grey-6">ไม่พบปีที่ค้นหา</q-item-section></q-item
                  >
                </template>
              </q-select>
            </div>
            <div class="wish-filter-actions">
              <button
                v-if="hasActiveCardFilters"
                class="wish-filter-clear card-filter-clear"
                type="button"
                @click="clearCardFilters"
              >
                <q-icon name="filter_alt_off" size="15px" />ล้างตัวกรอง
              </button>
            </div>
          </div>

          <div class="wish-dlg-scroll card-dlg-scroll">
            <!-- Loading skeleton -->
            <template v-if="cardApiLoading && cardApiItems.length === 0">
              <div class="card-api-grid">
                <div
                  v-for="n in 12"
                  :key="'csk-' + n"
                  class="card-api-thumb card-api-thumb--skeleton"
                >
                  <div class="card-api-thumb-skeleton-img" />
                </div>
              </div>
            </template>

            <!-- Error -->
            <div v-else-if="cardApiError && cardApiItems.length === 0" class="wsp-api-empty">
              <q-icon name="wifi_off" size="32px" color="grey-4" />
              <div class="wsp-api-empty-text">โหลดข้อมูลไม่สำเร็จ</div>
              <button class="wsp-retry-btn" type="button" @click="loadCardPage(cardApiPage)">
                <q-icon name="refresh" size="14px" />ลองใหม่
              </button>
            </div>

            <!-- Empty -->
            <div v-else-if="!cardApiLoading && cardApiItems.length === 0" class="wsp-api-empty">
              <q-icon name="search_off" size="32px" color="grey-4" />
              <div class="wsp-api-empty-text">ไม่พบบัตรอวยพรที่ตรงกับเงื่อนไข</div>
            </div>

            <!-- Grid -->
            <template v-else>
              <div class="card-api-grid">
                <div
                  v-for="item in cardApiItems"
                  :key="item.cId"
                  class="card-api-thumb"
                  :class="{
                    'card-api-thumb--selected': tempSelectedCards.has(item.cId),
                    'card-api-thumb--added': isCardAdded(item.cId),
                  }"
                  @click="toggleTempCard(item)"
                >
                  <q-img
                    :src="getCardImageUrl(item.imageCard)"
                    ratio="1"
                    fit="contain"
                    class="card-api-thumb-img"
                  />
                  <div class="card-api-thumb-overlay">
                    <div
                      v-if="tempSelectedCards.has(item.cId)"
                      class="card-api-check card-api-check--on"
                    >
                      <q-icon name="check" size="16px" color="white" />
                    </div>
                    <div
                      v-else-if="isCardAdded(item.cId)"
                      class="card-api-check card-api-check--added"
                    >
                      <q-icon name="check" size="14px" color="grey-5" />
                    </div>
                  </div>
                  <div class="card-api-thumb-meta">
                    <span class="card-api-fest-badge">{{
                      item.festival?.festivalName ?? 'อื่นๆ'
                    }}</span>
                  </div>
                </div>
              </div>
              <div v-if="cardApiLoading" class="wsp-load-more">
                <q-circular-progress indeterminate size="22px" color="teal-6" />
              </div>
            </template>
          </div>

          <!-- ✅ Compact pagination — แบบเดียวกับ q-table ใน unpolite page -->
          <div v-if="cardApiTotal > 0" class="compact-pg compact-pg--card">
            <div class="compact-pg-left">
              <span class="compact-pg-label">รายการต่อหน้า:</span>
              <q-select
                v-model="cardApiLimit"
                :options="cardLimitOptions"
                dense
                borderless
                :disable="cardApiLoading"
                class="compact-pg-select"
                @update:model-value="onCardLimitChange"
              />
            </div>
            <div class="compact-pg-info">{{ cardRangeText }}</div>
            <div class="compact-pg-nav">
              <button
                type="button"
                class="compact-pg-btn"
                :disabled="cardApiPage <= 1 || cardApiLoading"
                aria-label="ก่อนหน้า"
                @click="loadCardPage(cardApiPage - 1)"
              >
                <q-icon name="chevron_left" size="20px" />
              </button>
              <button
                type="button"
                class="compact-pg-btn"
                :disabled="cardApiPage >= cardApiTotalPages || cardApiLoading"
                aria-label="ถัดไป"
                @click="loadCardPage(cardApiPage + 1)"
              >
                <q-icon name="chevron_right" size="20px" />
              </button>
            </div>
          </div>

          <div class="wish-dlg-footer">
            <div class="wish-footer-summary">
              <template v-if="tempSelectedCards.size > 0 || tempUploadCards.length > 0">
                <q-icon name="check_circle" size="16px" color="teal-6" />
                <span>เลือกแล้ว {{ tempSelectedCards.size + tempUploadCards.length }} รูป</span>
              </template>
              <span v-else class="wish-footer-empty-label">ยังไม่ได้เลือก</span>
            </div>
            <div class="wish-footer-actions">
              <button type="button" class="dlg-btn dlg-btn--cancel" @click="closeCardSelector">
                ยกเลิก
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--secondary card-secondary-btn"
                @click="cardDlgTab = 'upload'"
              >
                <q-icon name="upload" size="16px" /><span>อัปโหลดใหม่</span>
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--confirm card-confirm-btn"
                :disabled="tempSelectedCards.size === 0 && tempUploadCards.length === 0"
                @click="confirmCardSelection"
              >
                <q-icon name="add_circle" size="17px" /><span>เพิ่มในรายการ</span>
                <span
                  v-if="tempSelectedCards.size + tempUploadCards.length > 0"
                  class="wsp-badge"
                  >{{ tempSelectedCards.size + tempUploadCards.length }}</span
                >
              </button>
            </div>
          </div>
        </template>

        <!-- TAB: Upload -->
        <template v-if="cardDlgTab === 'upload'">
          <div class="wish-dlg-custom-body">
            <div class="wish-custom-left">
              <div class="wish-custom-section-title">
                <q-icon name="upload" size="18px" color="teal-6" />อัปโหลดบัตรของคุณ
              </div>
              <p class="wish-custom-hint">
                เลือกรูปบัตรอวยพร · ขนาด 691 × 691 px · ไม่เกิน 2 MB · PNG หรือ JPG
              </p>

              <div class="card-upload-zone" @click="cardUploadInput?.pickFiles()">
                <q-icon name="cloud_upload" size="36px" color="teal-6" />
                <div class="card-upload-zone-text">คลิกเพื่อเลือกรูป</div>
                <div class="card-upload-zone-sub">หรือเลือกหลายไฟล์พร้อมกัน</div>
              </div>
              <q-file
                v-model="tempUploadInputFile"
                ref="cardUploadInput"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                multiple
                class="hidden"
                @update:model-value="onCardFilesPicked"
              />
              <transition name="err-fade">
                <div v-if="cardUploadErrorMsg" class="error-msg q-mt-sm">
                  <q-icon name="error_outline" size="14px" />{{ cardUploadErrorMsg }}
                </div>
              </transition>

              <a
                href="https://www.iloveimg.com/resize-image"
                target="_blank"
                rel="noopener noreferrer"
                class="cover-resize-link q-mt-sm"
                @click.stop
              >
                <q-icon name="open_in_new" size="13px" />แปลงขนาดรูปภาพที่นี่
              </a>
            </div>
            <div class="wish-custom-right">
              <div class="wish-custom-section-title">
                <q-icon name="photo_library" size="18px" color="teal-6" />รูปที่เลือกทั้งหมด
                <span
                  v-if="tempSelectedCards.size + tempUploadCards.length > 0"
                  class="wish-sel-badge card-sel-badge"
                  >{{ tempSelectedCards.size + tempUploadCards.length }}</span
                >
              </div>

              <div v-if="tempSelectedCards.size + tempUploadCards.length > 0" class="card-sel-grid">
                <!-- จาก API -->
                <div
                  v-for="item in Array.from(tempSelectedCardsList)"
                  :key="'sel-api-' + item.cId"
                  class="card-sel-thumb"
                >
                  <q-img
                    :src="getCardImageUrl(item.imageCard)"
                    ratio="1"
                    fit="contain"
                    class="card-sel-thumb-img"
                  />
                  <div class="card-sel-thumb-badge card-sel-thumb-badge--api">
                    <q-icon name="cloud_done" size="10px" />คลัง
                  </div>
                  <button class="card-sel-thumb-remove" type="button" @click="toggleTempCard(item)">
                    <q-icon name="close" size="13px" />
                  </button>
                </div>
                <!-- อัปโหลดใหม่ -->
                <div v-for="(f, i) in tempUploadCards" :key="'sel-up-' + i" class="card-sel-thumb">
                  <q-img
                    :src="getFilePreview(f)"
                    ratio="1"
                    fit="contain"
                    class="card-sel-thumb-img"
                  />
                  <div class="card-sel-thumb-badge card-sel-thumb-badge--new">
                    <q-icon name="upload" size="10px" />ใหม่
                  </div>
                  <button
                    class="card-sel-thumb-remove"
                    type="button"
                    @click="removeTempUploadCard(i)"
                  >
                    <q-icon name="close" size="13px" />
                  </button>
                </div>
              </div>
              <div v-else class="wish-sel-empty">
                <q-icon name="touch_app" size="26px" color="grey-4" />
                <div>ยังไม่มีรูปที่เลือก</div>
                <button
                  class="wsp-retry-btn card-retry-btn"
                  type="button"
                  @click="cardDlgTab = 'browse'"
                >
                  <q-icon name="search" size="13px" />ไปเลือกจากคลัง
                </button>
              </div>
            </div>
          </div>
          <div class="wish-dlg-footer">
            <div class="wish-footer-summary">
              <template v-if="tempSelectedCards.size + tempUploadCards.length > 0">
                <q-icon name="check_circle" size="16px" color="teal-6" />
                <span>เลือกแล้ว {{ tempSelectedCards.size + tempUploadCards.length }} รูป</span>
              </template>
              <span v-else class="wish-footer-empty-label">ยังไม่ได้เลือก</span>
            </div>
            <div class="wish-footer-actions">
              <button type="button" class="dlg-btn dlg-btn--cancel" @click="closeCardSelector">
                ยกเลิก
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--secondary card-secondary-btn"
                @click="cardDlgTab = 'browse'"
              >
                <q-icon name="search" size="16px" /><span>กลับเลือก</span>
              </button>
              <button
                type="button"
                class="dlg-btn dlg-btn--confirm card-confirm-btn"
                :disabled="tempSelectedCards.size === 0 && tempUploadCards.length === 0"
                @click="confirmCardSelection"
              >
                <q-icon name="add_circle" size="17px" /><span>เพิ่มในรายการ</span>
                <span
                  v-if="tempSelectedCards.size + tempUploadCards.length > 0"
                  class="wsp-badge"
                  >{{ tempSelectedCards.size + tempUploadCards.length }}</span
                >
              </button>
            </div>
          </div>
        </template>
      </div>
    </q-dialog>

    <!-- DIALOG: แก้ไขคำอวยพร -->
    <q-dialog v-model="editWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="dialog-header">
          <div class="dialog-header-icon dialog-header-icon--amber">
            <q-icon name="edit" color="white" size="18px" />
          </div>
          <span>แก้ไขคำอวยพร</span><q-space />
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

    <!-- DIALOG: แก้ไขคำอวยพรที่เลือก (custom tab) -->
    <q-dialog v-model="editSelectedDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="dialog-header">
          <div class="dialog-header-icon dialog-header-icon--amber">
            <q-icon name="edit" color="white" size="18px" />
          </div>
          <span>แก้ไขคำอวยพร</span><q-space />
          <button class="dialog-close-btn" type="button" @click="editSelectedDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <q-form @submit.prevent.stop="confirmEditSelectedWish">
          <div class="dialog-body">
            <q-input
              v-model="editSelectedText"
              type="textarea"
              label="คำอวยพร"
              outlined
              autofocus
              class="custom-input"
              :rules="[(val) => !!val.trim() || 'กรุณากรอกคำอวยพร']"
            />
          </div>
          <div class="dialog-footer">
            <button
              type="button"
              class="dlg-btn dlg-btn--cancel"
              @click="editSelectedDialog = false"
            >
              ยกเลิก
            </button>
            <button type="submit" class="dlg-btn dlg-btn--confirm">อัปเดต</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- DIALOG: ยืนยันลบ -->
    <q-dialog v-model="deleteWishDialog" persistent>
      <div class="custom-dialog">
        <div class="dialog-header dialog-header--danger">
          <div class="dialog-header-icon">
            <q-icon name="warning_amber" color="white" size="18px" />
          </div>
          <span>ยืนยันการลบ</span><q-space />
          <button class="dialog-close-btn" @click="deleteWishDialog = false">
            <q-icon name="close" size="18px" />
          </button>
        </div>
        <div class="dialog-body">
          <p class="delete-warn-text">
            คุณต้องการลบคำอวยพร
            <strong class="delete-target">"{{ itemToDelete }}"</strong> ใช่หรือไม่?
          </p>
          <p class="delete-warn-sub">
            <q-icon
              name="info_outline"
              size="15px"
              class="q-mr-xs"
            />การดำเนินการนี้ไม่สามารถย้อนกลับได้
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

    <!-- NOTIFY DIALOG -->
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
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import type { QFile } from 'quasar';
import type { AxiosError } from 'axios';

const NOTIFY_DURATION = 2000;
const FESTIVAL_NAME_PATTERN = /^[^-]+\s*-\s*[^-\s]{2,5}\s*-\s*\d{4}$/;

interface ResponseWishDto {
  wId: number;
  wishWord: string;
  festivalId: number;
  festival: { fId: number; festivalName: string; createdAt: string };
}

interface ResponseCardDto {
  cId: number;
  imageCard: string;
  festivalId: number;
  festival: { fId: number; festivalName: string; createdAt: string };
}

type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';
interface Particle {
  id: number;
  style: Record<string, string>;
}

const $q = useQuasar();
const router = useRouter();

// ─── Form ─────────────────────────────────────────────────────────────────────
const festivalName = ref('');
const imageFile = ref<File | null>(null);
const logoFile = ref<File | null>(null);
const webName = ref('');
const loading = ref(false);
const fileInput = ref<InstanceType<typeof QFile> | null>(null);
const logoInput = ref<InstanceType<typeof QFile> | null>(null);
const useDeptLogo = ref(false);
const toggleDeptLogo = () => {
  useDeptLogo.value = !useDeptLogo.value;
  if (useDeptLogo.value) {
    logoFile.value = null;
    logoError.value = false;
  }
};

// ─── Date ─────────────────────────────────────────────────────────────────────
const startDate = ref('');
const endDate = ref('');
const dateError = ref(false);
const dateErrorMsg = ref('');
const todayStr = (() => {
  const d = new Date();
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
})();
const durationDays = computed(() => {
  if (!startDate.value || !endDate.value) return -1;
  const s = new Date(startDate.value.replace(/\//g, '-'));
  const e = new Date(endDate.value.replace(/\//g, '-'));
  return Math.round((e.getTime() - s.getTime()) / 86400000);
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
const startDateOptions = (d: string) => {
  if (d < todayStr) return false;
  return !endDate.value || d <= endDate.value;
};
const endDateOptions = (d: string) => {
  if (d < todayStr) return false;
  return !startDate.value || d >= startDate.value;
};
const onStartDateChange = (val: string) => {
  dateError.value = false;
  if (endDate.value && val > endDate.value) endDate.value = '';
};
const onEndDateChange = () => {
  dateError.value = false;
};

// ─── Errors & Refs ────────────────────────────────────────────────────────────
const imageError = ref(false);
const nameError = ref(false);
const logoError = ref(false);
const webNameError = ref(false);
const coverRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const webNameRef = ref<HTMLElement | null>(null);
const dateRef = ref<HTMLElement | null>(null);

// ─── Wish Selector ────────────────────────────────────────────────────────────
const wishSelectorOpen = ref(false);
const wishDlgTab = ref<'browse' | 'custom'>('browse');
const tempSelectedWishes = ref<Set<string>>(new Set());
const customWishText = ref('');
const editWishDialog = ref(false);
const deleteWishDialog = ref(false);
const editingIndex = ref<number | null>(null);
const deleteIndex = ref<number | null>(null);
const itemToDelete = ref<string | null>(null);
const tempWish = ref('');
const wishWordList = ref<string[]>([]);

// ─── Wish Filters ─────────────────────────────────────────────────────────────
const wishFilterWord = ref('');
const wishFilterFestival = ref('');
const wishFilterMonth = ref<number | null>(null);
const wishFilterYear = ref<number | null>(null);

const THAI_MONTHS = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
];

// ─── เดือน/ปี ที่สกัดจาก festival.createdAt ของข้อมูลจริง (wish) ──────────────
const availableMonths = ref<Set<number>>(new Set());
const availableYears = ref<Set<number>>(new Set());

const monthOptions = computed(() => {
  const months = Array.from(availableMonths.value).sort((a, b) => a - b);
  return months.map((m) => ({ label: THAI_MONTHS[m - 1] ?? `${m}`, value: m }));
});

const yearOptions = computed(() => {
  const years = Array.from(availableYears.value).sort((a, b) => b - a);
  return years.map((y) => ({ label: `${y + 543}`, value: y }));
});

const collectMonthYear = (items: ResponseWishDto[]) => {
  const months = new Set(availableMonths.value);
  const years = new Set(availableYears.value);
  for (const it of items) {
    const created = it.festival?.createdAt;
    if (!created) continue;
    const d = new Date(created);
    if (Number.isNaN(d.getTime())) continue;
    months.add(d.getMonth() + 1);
    years.add(d.getFullYear());
  }
  availableMonths.value = months;
  availableYears.value = years;
};

const extractWishItems = (container: Record<string, unknown>): ResponseWishDto[] => {
  const candidates: unknown[] = [container.data, container.items, container.results, container];
  const found = candidates.find((c): c is ResponseWishDto[] => Array.isArray(c));
  return found ?? [];
};

const loadMonthYearOptions = async () => {
  try {
    const res = await api.get('/backoffice/festival/wish', { params: { page: 1, limit: 9999 } });
    const root: Record<string, unknown> = res.data ?? {};
    const container: Record<string, unknown> =
      (root.festival as Record<string, unknown>) ?? (root.data as Record<string, unknown>) ?? root;
    collectMonthYear(extractWishItems(container));
  } catch {
    /* เงียบไว้ */
  }
};

const yearFilterOptions = ref<{ label: string; value: number }[]>([]);
watch(
  yearOptions,
  (opts) => {
    yearFilterOptions.value = opts;
  },
  { immediate: true },
);

const onYearFilter = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    const needle = val.trim();
    if (!needle) {
      yearFilterOptions.value = yearOptions.value;
      return;
    }
    yearFilterOptions.value = yearOptions.value.filter(
      (o) => o.label.includes(needle) || String(o.value).includes(needle),
    );
  });
};

const hasActiveFilters = computed(
  () =>
    !!wishFilterWord.value.trim() ||
    !!wishFilterFestival.value.trim() ||
    wishFilterMonth.value !== null ||
    wishFilterYear.value !== null,
);

// ─── Wish API ─────────────────────────────────────────────────────────────────
const wishApiItems = ref<ResponseWishDto[]>([]);
const wishApiLoading = ref(false);
const wishApiError = ref(false);
const wishApiPage = ref(1);
const wishApiTotalPages = ref(1);
const wishApiTotal = ref(0);
const wishApiLimit = ref(10);
const limitOptions = [10, 20, 50];
let wishFilterTimer: ReturnType<typeof setTimeout> | null = null;

const groupedWishApiItems = computed<Record<string, ResponseWishDto[]>>(() => {
  const groups: Record<string, ResponseWishDto[]> = {};
  for (const item of wishApiItems.value) {
    const key = item.festival?.festivalName ?? 'อื่นๆ';
    (groups[key] ??= []).push(item);
  }
  return groups;
});

const rowNumberMap = computed<Map<number, number>>(() => {
  const map = new Map<number, number>();
  const offset = (wishApiPage.value - 1) * wishApiLimit.value;
  let i = 0;
  for (const items of Object.values(groupedWishApiItems.value)) {
    for (const item of items) {
      map.set(item.wId, offset + i + 1);
      i++;
    }
  }
  return map;
});

// ─── Wish range text (เหมือน q-table: "1-10 จาก 15") ─────────────────────────
const wishRangeText = computed(() => {
  if (wishApiTotal.value === 0) return '0-0 จาก 0';
  const start = (wishApiPage.value - 1) * wishApiLimit.value + 1;
  const end = Math.min(start + wishApiItems.value.length - 1, wishApiTotal.value);
  return `${start}-${end} จาก ${wishApiTotal.value}`;
});

// ─── Helper: read meta/pagination from various shapes ─────────────────────────
const pickFrom = (obj: unknown, keys: string[]): number | null => {
  if (!obj || typeof obj !== 'object') return null;
  const o = obj as Record<string, unknown>;
  for (const k of keys) {
    const v = o[k];
    if (v != null && v !== '' && !Number.isNaN(Number(v))) return Number(v);
  }
  return null;
};

const loadWishPage = async (page: number) => {
  if (wishApiLoading.value) return;
  wishApiLoading.value = true;
  wishApiError.value = false;
  try {
    const params: Record<string, unknown> = {
      page: Number(page),
      limit: Number(wishApiLimit.value),
    };
    if (wishFilterWord.value.trim()) params['wishWord'] = wishFilterWord.value.trim();
    if (wishFilterFestival.value.trim()) params['festivalName'] = wishFilterFestival.value.trim();
    if (wishFilterMonth.value !== null) params['month'] = Number(wishFilterMonth.value);
    if (wishFilterYear.value !== null) params['year'] = Number(wishFilterYear.value);
    const res = await api.get('/backoffice/festival/wish', { params });

    const root: Record<string, unknown> = res.data ?? {};
    const container: Record<string, unknown> =
      (root.festival as Record<string, unknown>) ?? (root.data as Record<string, unknown>) ?? root;

    wishApiItems.value = extractWishItems(container);

    const meta: Record<string, unknown> =
      (container.meta as Record<string, unknown>) ??
      (container.pagination as Record<string, unknown>) ??
      container;

    const pick = (keys: string[]): number | null =>
      pickFrom(meta, keys) ?? pickFrom(container, keys) ?? pickFrom(root, keys);

    const limitNum = Number(wishApiLimit.value) || 1;

    const totalVal = pick([
      'total',
      'totalItems',
      'totalCount',
      'count',
      'itemCount',
      'totalRecords',
      'totalData',
      'totalRow',
      'totalRows',
      'recordsTotal',
    ]);
    const totalPagesVal = pick([
      'totalPages',
      'pageCount',
      'totalPage',
      'lastPage',
      'pages',
      'pageTotal',
    ]);
    const pageVal = pick(['page', 'currentPage', 'pageNumber', 'current']);

    const rawItems = wishApiItems.value;
    const serverIgnoredPaging = rawItems.length > limitNum;

    if (serverIgnoredPaging) {
      const total = totalVal ?? rawItems.length;
      const pages = Math.max(1, Math.ceil(total / limitNum));
      const curPage = Math.min(Math.max(1, Number(page)), pages);
      const startIdx = (curPage - 1) * limitNum;
      wishApiItems.value = rawItems.slice(startIdx, startIdx + limitNum);
      wishApiPage.value = curPage;
      wishApiTotal.value = total;
      wishApiTotalPages.value = pages;
    } else {
      wishApiPage.value = pageVal ?? Number(page);
      wishApiTotal.value =
        totalVal ?? (totalPagesVal != null ? totalPagesVal * limitNum : rawItems.length);
      wishApiTotalPages.value =
        totalPagesVal ?? Math.max(1, Math.ceil(wishApiTotal.value / limitNum));
    }

    await nextTick();
    document.querySelector('.wish-dlg-scroll')?.scrollTo({ top: 0 });
  } catch {
    wishApiError.value = true;
  } finally {
    wishApiLoading.value = false;
  }
};

const onFilterChange = () => {
  if (wishFilterTimer) clearTimeout(wishFilterTimer);
  wishFilterTimer = setTimeout(() => void loadWishPage(1), 400);
};
const onLimitChange = () => void loadWishPage(1);
const clearFilters = () => {
  wishFilterWord.value = '';
  wishFilterFestival.value = '';
  wishFilterMonth.value = null;
  wishFilterYear.value = null;
  void loadWishPage(1);
};

const onAddWish = () => {
  tempSelectedWishes.value = new Set();
  wishDlgTab.value = 'browse';
  wishFilterWord.value = '';
  wishFilterFestival.value = '';
  wishFilterMonth.value = null;
  wishFilterYear.value = null;
  customWishText.value = '';
  wishSelectorOpen.value = true;
  void loadMonthYearOptions();
  void loadWishPage(1);
};
const closeWishSelector = () => {
  wishSelectorOpen.value = false;
};

const toggleTempWish = (wish: string) => {
  if (wishWordList.value.includes(wish)) return;
  const set = new Set(tempSelectedWishes.value);
  if (set.has(wish)) set.delete(wish);
  else set.add(wish);
  tempSelectedWishes.value = set;
};
const confirmWishSelection = () => {
  tempSelectedWishes.value.forEach((w) => {
    if (!wishWordList.value.includes(w)) wishWordList.value.push(w);
  });
  closeWishSelector();
};
const addCustomWish = () => {
  const text = customWishText.value.trim();
  if (!text) return;
  if (!wishWordList.value.includes(text)) {
    const set = new Set(tempSelectedWishes.value);
    set.add(text);
    tempSelectedWishes.value = set;
  }
  customWishText.value = '';
};

const editSelectedDialog = ref(false);
const editSelectedOriginal = ref('');
const editSelectedText = ref('');

const editSelectedWish = (wish: string) => {
  editSelectedOriginal.value = wish;
  editSelectedText.value = wish;
  editSelectedDialog.value = true;
};
const confirmEditSelectedWish = () => {
  const newText = editSelectedText.value.trim();
  if (!newText) return;
  const set = new Set(tempSelectedWishes.value);
  set.delete(editSelectedOriginal.value);
  if (!wishWordList.value.includes(newText)) {
    set.add(newText);
  }
  tempSelectedWishes.value = set;
  editSelectedDialog.value = false;
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

// ═══════════════════════════════════════════════════════════════════════════════
//  CARD SELECTOR
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Card lists (final) ───────────────────────────────────────────────────────
const cardFileList = ref<File[]>([]);
const selectedApiCards = ref<ResponseCardDto[]>([]);

const totalCardCount = computed(() => cardFileList.value.length + selectedApiCards.value.length);
const isCardAdded = (cId: number) => selectedApiCards.value.some((c) => c.cId === cId);

// ─── Card Selector dialog state ───────────────────────────────────────────────
const cardSelectorOpen = ref(false);
const cardDlgTab = ref<'browse' | 'upload'>('browse');
const cardUploadInput = ref<InstanceType<typeof QFile> | null>(null);

const tempSelectedCards = ref<Set<number>>(new Set());
const tempSelectedCardsMap = ref<Map<number, ResponseCardDto>>(new Map());
const tempSelectedCardsList = computed(() => Array.from(tempSelectedCardsMap.value.values()));

const tempUploadCards = ref<File[]>([]);
const tempUploadInputFile = ref<File | File[] | null>(null);
const cardUploadErrorMsg = ref('');

// ─── Card filters ─────────────────────────────────────────────────────────────
const cardFilterFestival = ref('');
const cardFilterMonth = ref<number | null>(null);
const cardFilterYear = ref<number | null>(null);

const hasActiveCardFilters = computed(
  () =>
    !!cardFilterFestival.value.trim() ||
    cardFilterMonth.value !== null ||
    cardFilterYear.value !== null,
);

const availableCardMonths = ref<Set<number>>(new Set());
const availableCardYears = ref<Set<number>>(new Set());

const cardMonthOptions = computed(() => {
  const months = Array.from(availableCardMonths.value).sort((a, b) => a - b);
  return months.map((m) => ({ label: THAI_MONTHS[m - 1] ?? `${m}`, value: m }));
});
const cardYearOptions = computed(() => {
  const years = Array.from(availableCardYears.value).sort((a, b) => b - a);
  return years.map((y) => ({ label: `${y + 543}`, value: y }));
});
const cardYearFilterOptions = ref<{ label: string; value: number }[]>([]);
watch(
  cardYearOptions,
  (opts) => {
    cardYearFilterOptions.value = opts;
  },
  { immediate: true },
);

const onCardYearFilter = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    const needle = val.trim();
    if (!needle) {
      cardYearFilterOptions.value = cardYearOptions.value;
      return;
    }
    cardYearFilterOptions.value = cardYearOptions.value.filter(
      (o) => o.label.includes(needle) || String(o.value).includes(needle),
    );
  });
};

const extractCardItems = (container: Record<string, unknown>): ResponseCardDto[] => {
  const candidates: unknown[] = [container.data, container.items, container.results, container];
  const found = candidates.find((c): c is ResponseCardDto[] => Array.isArray(c));
  return found ?? [];
};

const collectCardMonthYear = (items: ResponseCardDto[]) => {
  const months = new Set(availableCardMonths.value);
  const years = new Set(availableCardYears.value);
  for (const it of items) {
    const created = it.festival?.createdAt;
    if (!created) continue;
    const d = new Date(created);
    if (Number.isNaN(d.getTime())) continue;
    months.add(d.getMonth() + 1);
    years.add(d.getFullYear());
  }
  availableCardMonths.value = months;
  availableCardYears.value = years;
};

const loadCardMonthYearOptions = async () => {
  try {
    const res = await api.get('/backoffice/festival/card', { params: { page: 1, limit: 9999 } });
    const root: Record<string, unknown> = res.data ?? {};
    const container: Record<string, unknown> =
      (root.festival as Record<string, unknown>) ?? (root.data as Record<string, unknown>) ?? root;
    collectCardMonthYear(extractCardItems(container));
  } catch {
    /* เงียบไว้ */
  }
};

// ─── Card API state ───────────────────────────────────────────────────────────
const cardApiItems = ref<ResponseCardDto[]>([]);
const cardApiLoading = ref(false);
const cardApiError = ref(false);
const cardApiPage = ref(1);
const cardApiTotalPages = ref(1);
const cardApiTotal = ref(0);
const cardApiLimit = ref(20);
const cardLimitOptions = [12, 20, 40];
let cardFilterTimer: ReturnType<typeof setTimeout> | null = null;

// ─── Card range text ──────────────────────────────────────────────────────────
const cardRangeText = computed(() => {
  if (cardApiTotal.value === 0) return '0-0 จาก 0';
  const start = (cardApiPage.value - 1) * cardApiLimit.value + 1;
  const end = Math.min(start + cardApiItems.value.length - 1, cardApiTotal.value);
  return `${start}-${end} จาก ${cardApiTotal.value}`;
});

// ─── Helper: get card image URL ───────────────────────────────────────────────
const getCardImageUrl = (imageCard: string): string => {
  if (!imageCard) return '';
  if (/^https?:\/\//i.test(imageCard)) return imageCard;
  const base = (api.defaults.baseURL ?? '').replace(/\/+$/, '');
  return `${base}/upload/${imageCard}`;
};

// ─── Load card page ───────────────────────────────────────────────────────────
const loadCardPage = async (page: number) => {
  if (cardApiLoading.value) return;
  cardApiLoading.value = true;
  cardApiError.value = false;
  try {
    const params: Record<string, unknown> = {
      page: Number(page),
      limit: Number(cardApiLimit.value),
    };
    if (cardFilterFestival.value.trim()) params['festivalName'] = cardFilterFestival.value.trim();
    if (cardFilterMonth.value !== null) params['month'] = Number(cardFilterMonth.value);
    if (cardFilterYear.value !== null) params['year'] = Number(cardFilterYear.value);
    const res = await api.get('/backoffice/festival/card', { params });

    const root: Record<string, unknown> = res.data ?? {};
    const container: Record<string, unknown> =
      (root.festival as Record<string, unknown>) ?? (root.data as Record<string, unknown>) ?? root;

    cardApiItems.value = extractCardItems(container);

    const meta: Record<string, unknown> =
      (container.meta as Record<string, unknown>) ??
      (container.pagination as Record<string, unknown>) ??
      container;

    const pick = (keys: string[]): number | null =>
      pickFrom(meta, keys) ?? pickFrom(container, keys) ?? pickFrom(root, keys);

    const limitNum = Number(cardApiLimit.value) || 1;

    const totalVal = pick([
      'total',
      'totalItems',
      'totalCount',
      'count',
      'itemCount',
      'totalRecords',
      'totalData',
      'totalRow',
      'totalRows',
      'recordsTotal',
    ]);
    const totalPagesVal = pick([
      'totalPages',
      'pageCount',
      'totalPage',
      'lastPage',
      'pages',
      'pageTotal',
    ]);
    const pageVal = pick(['page', 'currentPage', 'pageNumber', 'current']);

    const rawItems = cardApiItems.value;
    const serverIgnoredPaging = rawItems.length > limitNum;

    if (serverIgnoredPaging) {
      const total = totalVal ?? rawItems.length;
      const pages = Math.max(1, Math.ceil(total / limitNum));
      const curPage = Math.min(Math.max(1, Number(page)), pages);
      const startIdx = (curPage - 1) * limitNum;
      cardApiItems.value = rawItems.slice(startIdx, startIdx + limitNum);
      cardApiPage.value = curPage;
      cardApiTotal.value = total;
      cardApiTotalPages.value = pages;
    } else {
      cardApiPage.value = pageVal ?? Number(page);
      cardApiTotal.value =
        totalVal ?? (totalPagesVal != null ? totalPagesVal * limitNum : rawItems.length);
      cardApiTotalPages.value =
        totalPagesVal ?? Math.max(1, Math.ceil(cardApiTotal.value / limitNum));
    }

    await nextTick();
    document.querySelector('.card-dlg-scroll')?.scrollTo({ top: 0 });
  } catch {
    cardApiError.value = true;
  } finally {
    cardApiLoading.value = false;
  }
};

const onCardFilterChange = () => {
  if (cardFilterTimer) clearTimeout(cardFilterTimer);
  cardFilterTimer = setTimeout(() => void loadCardPage(1), 400);
};
const onCardLimitChange = () => void loadCardPage(1);
const clearCardFilters = () => {
  cardFilterFestival.value = '';
  cardFilterMonth.value = null;
  cardFilterYear.value = null;
  void loadCardPage(1);
};

// ─── Open / Close ─────────────────────────────────────────────────────────────
const onAddCard = () => {
  tempSelectedCards.value = new Set();
  tempSelectedCardsMap.value = new Map();
  tempUploadCards.value = [];
  cardUploadErrorMsg.value = '';
  cardDlgTab.value = 'browse';
  cardFilterFestival.value = '';
  cardFilterMonth.value = null;
  cardFilterYear.value = null;
  cardSelectorOpen.value = true;
  void loadCardMonthYearOptions();
  void loadCardPage(1);
};
const closeCardSelector = () => {
  cardSelectorOpen.value = false;
};

// ─── Toggle / Confirm ─────────────────────────────────────────────────────────
const toggleTempCard = (item: ResponseCardDto) => {
  if (isCardAdded(item.cId)) return;
  const set = new Set(tempSelectedCards.value);
  const map = new Map(tempSelectedCardsMap.value);
  if (set.has(item.cId)) {
    set.delete(item.cId);
    map.delete(item.cId);
  } else {
    set.add(item.cId);
    map.set(item.cId, item);
  }
  tempSelectedCards.value = set;
  tempSelectedCardsMap.value = map;
};

const confirmCardSelection = () => {
  tempSelectedCardsMap.value.forEach((item) => {
    if (!isCardAdded(item.cId)) {
      selectedApiCards.value.push(item);
    }
  });
  for (const f of tempUploadCards.value) {
    cardFileList.value.push(f);
  }
  closeCardSelector();
};

const removeApiCard = (i: number) => {
  selectedApiCards.value.splice(i, 1);
};
const removeCard = (i: number) => {
  cardFileList.value.splice(i, 1);
};
const removeTempUploadCard = (i: number) => {
  tempUploadCards.value.splice(i, 1);
};

// ─── Validate uploaded file ───────────────────────────────────────────────────
const validateCardFile = (file: File): Promise<{ ok: true } | { ok: false; reason: string }> => {
  return new Promise((resolve) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      resolve({ ok: false, reason: `${file.name}: รองรับเฉพาะ JPG และ PNG` });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      resolve({ ok: false, reason: `${file.name}: ขนาดไฟล์ต้องไม่เกิน 2 MB` });
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.width !== 691 || img.height !== 691) {
        resolve({
          ok: false,
          reason: `${file.name}: ขนาดต้องเป็น 691 × 691 px (พบ ${img.width} × ${img.height})`,
        });
      } else {
        resolve({ ok: true });
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ ok: false, reason: `${file.name}: อ่านรูปไม่ได้` });
    };
    img.src = url;
  });
};

const onCardFilesPicked = async (val: File | File[] | null) => {
  cardUploadErrorMsg.value = '';
  if (!val) return;
  const files: File[] = Array.isArray(val) ? val : [val];
  const errors: string[] = [];
  for (const f of files) {
    const result = await validateCardFile(f);
    if (result.ok) {
      tempUploadCards.value.push(f);
    } else {
      errors.push(result.reason);
    }
  }
  if (errors.length > 0) {
    cardUploadErrorMsg.value = errors.join(' · ');
  }
  tempUploadInputFile.value = null;
};

// ═══════════════════════════════════════════════════════════════════════════════

// ─── Notify ───────────────────────────────────────────────────────────────────
const showNotifyDialog = ref(false);
const notifySuccess = ref(true);
const notifyMessage = ref('');
const notifyKey = ref(0);
let notifyTimer: ReturnType<typeof setTimeout> | null = null;
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
// const onFestivalNameChange = (val: string | number | null) => {
//   nameError.value = false;
//   if (typeof val !== 'string') return;
//   if (val && !/^[^-].*-[^-]{2,5}-\d{4}$/.test(val.trim())) nameError.value = true;
// };

// const onWebNameChange = (val: string | number | null) => {
//   webNameError.value = false;
//   if (typeof val !== 'string') return;
//   if (val && !/^[^-].*-[^-]{2,5}-\d{4}$/.test(val.trim())) webNameError.value = true;
// };

const onFestivalNameChange = (val: string | number | null) => {
  nameError.value = false;
  if (typeof val !== 'string') return;
  if (val && !FESTIVAL_NAME_PATTERN.test(val.trim())) nameError.value = true;
};

const onWebNameChange = (val: string | number | null) => {
  webNameError.value = false;
  if (typeof val !== 'string') return;
  if (val && !FESTIVAL_NAME_PATTERN.test(val.trim())) webNameError.value = true;
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
    FESTIVAL_NAME_PATTERN.test(festivalName.value.trim());
  const isLogoValid = !!logoFile.value || useDeptLogo.value;
  // const isWebNameValid = typeof webName.value === 'string' && webName.value.trim().length > 0;
   const isWebNameValid =
    typeof webName.value === 'string' && FESTIVAL_NAME_PATTERN.test(webName.value.trim());
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
  if (!(await validateAndScroll())) return;
  loading.value = true;
  try {
    const uploadFile = async (file: File): Promise<string> => {
      const fd = new FormData();
      fd.append('singleFile', file);
      return (await api.post('/upload', fd)).data.image as string;
    };
    const getDeptLogoFile = async (): Promise<File> => {
      const blob = await (await fetch('/logo-ldd.png')).blob();
      return new File([blob], 'logo-ldd.png', { type: 'image/png' });
    };
    const logoToUpload = useDeptLogo.value ? await getDeptLogoFile() : logoFile.value;
    const [festivalImageName, festivalLogoName] = await Promise.all([
      imageFile.value ? uploadFile(imageFile.value) : Promise.resolve(''),
      logoToUpload ? uploadFile(logoToUpload) : Promise.resolve(''),
    ]);
    const newCardImageNames = await Promise.all(cardFileList.value.map(uploadFile));
    const apiCardImageNames = selectedApiCards.value.map((c) => c.imageCard);
    const allCardImageNames = [...apiCardImageNames, ...newCardImageNames];

    const payload = {
      festivalName: festivalName.value,
      image: festivalImageName,
      logo: festivalLogoName,
      webName: webName.value,
      startDate: startDate.value ? startDate.value.replace(/\//g, '-') : undefined,
      endDate: endDate.value ? endDate.value.replace(/\//g, '-') : undefined,
      wisher: wishWordList.value.map((word) => ({ wishWord: word })),
      card: allCardImageNames.map((imgName) => ({ imageCard: imgName })),
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

// ─── Particles ────────────────────────────────────────────────────────────────
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
const handleGlobalClick = (e: MouseEvent) => {
  spawnParticles(e.clientX, e.clientY);
};
onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});
onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
  if (notifyTimer) clearTimeout(notifyTimer);
  if (wishFilterTimer) clearTimeout(wishFilterTimer);
  if (cardFilterTimer) clearTimeout(cardFilterTimer);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@500;600;700&display=swap');

$orange: #ea580c;
$orange-mid: #f97316;
$orange-soft: #fff7ed;
$gold: #f59e0b;
$teal: #0d9488;
$teal-soft: #f0fdfa;
$red: #dc2626;
$red-soft: #fee2e2;
$green: #16a34a;
$green-dark: #14532d;
$green-soft: #f0fdf4;
$surface: #ffffff;
$surface-2: #fff9f5;
$surface-teal: #f0fdfa;
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
.page-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #7c2d12 0%, $orange 55%, $gold 100%);
  padding: 1rem 1.5rem 2.5rem;
  @media (max-width: 599px) {
    padding: 1rem 1rem 2.5rem;
  }
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
  gap: 14px;
  max-width: 1100px;
  margin: 0 auto;
  @media (max-width: 599px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
}
.hero-left {
  display: flex;
  align-items: center;
  gap: 14px;
  @media (max-width: 599px) {
    gap: 10px;
  }
}
.hero-icon-wrap {
  width: 54px;
  height: 54px;
  border-radius: 15px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 599px) {
    width: 46px;
    height: 46px;
  }
}
.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.15rem, 4vw, 1.85rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 3px;
  line-height: 1.15;
}
.hero-sub {
  font-size: clamp(0.72rem, 2.5vw, 0.88rem);
  color: rgba(255, 255, 255, 0.68);
  margin: 0;
}
.hero-actions {
  display: flex;
  align-items: center;
  @media (max-width: 599px) {
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
  @media (max-width: 599px) {
    width: 100%;
    justify-content: center;
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
  @media (max-width: 599px) {
    padding: 1rem 0.75rem 3.5rem;
  }
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
.fest-card {
  background: $surface;
  border-radius: $radius;
  padding: 1.5rem;
  box-shadow:
    0 3px 20px rgba(234, 88, 12, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(249, 115, 22, 0.1);
  @media (max-width: 599px) {
    padding: 1.1rem;
    border-radius: 14px;
  }
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

// ─── Cover ────────────────────────────────────────────────────────────────────
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
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 120px;
  justify-content: center;
  @media (max-width: 599px) {
    padding: 1.25rem 0.75rem;
    min-height: 90px;
    gap: 4px;
  }
}
.cover-placeholder-icon {
  font-size: 2.5rem;
  @media (max-width: 599px) {
    font-size: 1.8rem;
  }
}
.cover-placeholder-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: $text-main;
  @media (max-width: 599px) {
    font-size: 0.82rem;
  }
}
.cover-placeholder-sub {
  font-size: 0.78rem;
  color: $text-muted;
  text-align: center;
  @media (max-width: 599px) {
    font-size: 0.7rem;
  }
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

// ─── Logo ─────────────────────────────────────────────────────────────────────
.logo-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 599px) {
    gap: 0.75rem;
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-areas: 'upload dept hint';
    align-items: start;
  }

  @media (max-width: 399px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'upload dept'
      'hint   hint';
  }
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
  height: 130px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: $orange;
    transform: translateY(-2px);
  }

  @media (max-width: 599px) {
    grid-area: upload;
    width: 90px;
    height: 90px;
  }

  @media (max-width: 399px) {
    width: 100%;
    height: 90px;
  }
}

.logo-preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 8px;
  box-sizing: border-box;
}

.logo-placeholder {
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;

  @media (max-width: 599px) {
    padding: 0.5rem;
  }
}

.logo-placeholder-icon {
  font-size: 1.8rem;
  @media (max-width: 599px) {
    font-size: 1.4rem;
  }
}

.logo-hint {
  flex: 1;
  min-width: 0;

  @media (max-width: 599px) {
    grid-area: hint;
  }
}

.logo-hint-title {
  font-family: 'Prompt', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: $text-main;
  margin-bottom: 4px;

  @media (max-width: 599px) {
    font-size: 0.84rem;
  }
}

.logo-hint-sub {
  font-size: 0.76rem;
  color: $text-muted;
  line-height: 1.6;

  @media (max-width: 599px) {
    font-size: 0.72rem;
  }
}

.dept-logo-option {
  position: relative;
  width: 130px;
  height: 130px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(234, 88, 12, 0.2);

  @media (max-width: 599px) {
    grid-area: dept;
    width: 90px;
    height: 90px;
  }

  @media (max-width: 399px) {
    width: 100%;
    height: 90px;
  }
}

.dept-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 6px;
  box-sizing: border-box;
}

.dept-logo-check {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid $orange;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &--active {
    background: $orange;
    border-color: $orange;
  }
}

// ─── Inputs ───────────────────────────────────────────────────────────────────
.custom-input :deep(.q-field__control) {
  border-radius: 12px !important;
}

// ─── Errors ───────────────────────────────────────────────────────────────────
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

// ─── Date ─────────────────────────────────────────────────────────────────────
.date-summary-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
  @media (max-width: 479px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
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
  @media (max-width: 479px) {
    min-width: unset;
    padding: 0.6rem 0.85rem;
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
  @media (max-width: 479px) {
    display: none;
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
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
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

// ─── Stat Chip / Header ───────────────────────────────────────────────────────
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
.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 10px;
  flex-wrap: wrap;
}
.action-btn {
  border-radius: 12px !important;
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
  overflow-wrap: break-word;
  min-width: 0;
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

// ─── Card Grid (main page) ───────────────────────────────────────────────────
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
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
  z-index: 2;
  &:hover {
    background: $red;
  }
}
.card-thumb-badge {
  position: absolute;
  bottom: 6px;
  left: 6px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 0.66rem;
  font-weight: 600;
  color: #fff;
  backdrop-filter: blur(4px);
  z-index: 2;
  &--api {
    background: rgba(13, 148, 136, 0.85);
  }
  &--new {
    background: rgba(234, 88, 12, 0.85);
  }
}

// ─── Empty ────────────────────────────────────────────────────────────────────
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  @media (max-width: 599px) {
    padding: 1.5rem 0.75rem;
  }
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

// ══════════════════════════════════════════════════════════════════
//  WISH SELECTOR DIALOG
// ══════════════════════════════════════════════════════════════════
.wish-dlg {
  background: white;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(124, 45, 18, 0.18);
  height: 90vh;
  max-height: 90vh;

  @media (max-width: 767px) {
    height: 100dvh;
    max-height: 100dvh;
    border-radius: 0;
  }
}

// ── Header ────────────────────────────────────────────────────────
.wish-dlg-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #7c2d12, $orange 60%, $gold);
  flex-shrink: 0;
  @media (max-width: 599px) {
    padding: 12px 14px;
    flex-wrap: wrap;
  }
}
.card-dlg-header {
  background: linear-gradient(135deg, #064e3b, $teal 60%, #14b8a6);
}
.wish-dlg-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.wish-dlg-header-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wish-dlg-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}
.wish-dlg-sub {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.8);
}
.wish-dlg-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  @media (max-width: 599px) {
    width: 100%;
    justify-content: space-between;
  }
}
.wish-dlg-tabs {
  display: flex;
  gap: 5px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  padding: 3px;
}
.wish-tab-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.82rem;
  font-weight: 500;
  transition:
    background 0.15s,
    color 0.15s;
  white-space: nowrap;
  &--active {
    background: #fff;
    color: $orange;
    font-weight: 700;
  }
  @media (max-width: 479px) {
    padding: 5px 8px;
    font-size: 0.76rem;
  }
}
.card-dlg .wish-tab-btn--active {
  color: $teal;
}
.wish-tab-label {
  @media (max-width: 399px) {
    display: none;
  }
}
.wish-tab-badge {
  background: $red;
  color: #fff;
  border-radius: 999px;
  padding: 1px 6px;
  font-size: 0.68rem;
  font-weight: 700;
  .wish-tab-btn--active & {
    background: $orange;
  }
}
.card-dlg .wish-tab-btn--active .wish-tab-badge {
  background: $teal;
}
.wish-dlg-close {
  background: rgba(255, 255, 255, 0.18);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

// ── Filters ───────────────────────────────────────────────────────
.wish-dlg-filters {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(249, 115, 22, 0.08);
  flex-shrink: 0;
  @media (max-width: 599px) {
    padding: 10px 14px;
  }
}
.wish-filter-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 479px) {
    grid-template-columns: 1fr;
  }
}
.card-filter-grid {
  grid-template-columns: 1.4fr 1fr 1fr;
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 479px) {
    grid-template-columns: 1fr;
  }
}
.wish-filter-input :deep(.q-field__control) {
  border-radius: 10px !important;
}
.wish-filter-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.wish-filter-clear {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid rgba(234, 88, 12, 0.2);
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.76rem;
  color: $orange;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: rgba(234, 88, 12, 0.07);
  }
}
.card-filter-clear {
  border-color: rgba(13, 148, 136, 0.25);
  color: $teal;
  &:hover {
    background: rgba(13, 148, 136, 0.07);
  }
}

// ══════════════════════════════════════════════════════════════════
// ✅ NEW — Compact Pagination (เหมือน q-table footer ใน unpolite)
// ══════════════════════════════════════════════════════════════════
.compact-pg {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  padding: 6px 20px;
  border-top: 1px solid rgba(249, 115, 22, 0.08);
  flex-shrink: 0;
  background: $surface-2;
  font-size: 0.82rem;
  color: $text-main;
  flex-wrap: wrap;
  row-gap: 6px;

  @media (max-width: 599px) {
    padding: 6px 14px;
    gap: 12px;
    justify-content: space-between;
  }
}

.compact-pg--card {
  background: $surface-teal;
  border-top-color: rgba(13, 148, 136, 0.1);
}

.compact-pg-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.compact-pg-label {
  color: $text-muted;
  white-space: nowrap;
}

.compact-pg-select {
  min-width: 56px;

  :deep(.q-field__control) {
    min-height: 28px !important;
    padding: 0 4px !important;
  }
  :deep(.q-field__native) {
    min-height: 28px !important;
    padding: 0 !important;
    font-size: 0.82rem !important;
    font-weight: 600;
    color: $text-main;
  }
  :deep(.q-field__append) {
    min-height: 28px !important;
    height: 28px !important;
    padding-left: 0 !important;
  }
  :deep(.q-field__marginal) {
    height: 28px !important;
  }
}

.compact-pg-info {
  color: $text-muted;
  white-space: nowrap;
}

.compact-pg-nav {
  display: flex;
  gap: 2px;
}

.compact-pg-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: $text-main;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    opacity 0.15s;

  &:hover:not(:disabled) {
    background: rgba(234, 88, 12, 0.08);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .compact-pg--card & {
    &:hover:not(:disabled) {
      background: rgba(13, 148, 136, 0.08);
    }
  }
}

// ── Scroll / Table (wish) ─────────────────────────────────────────
.wish-dlg-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  padding: 0;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.wish-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 0.86rem;

  @media (max-width: 599px) {
    font-size: 0.82rem;
  }
}

.wish-table-th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: $surface-2;
  padding: 9px 14px;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  color: $text-muted;
  border-bottom: 1.5px solid rgba(234, 88, 12, 0.12);
  white-space: nowrap;

  &--num {
    width: 46px;
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;
  }
  &--word {
    min-width: 280px;
  }
  &--fest {
    width: 220px;
    min-width: 180px;
  }
  &--action {
    width: 36px;
    text-align: center;
    padding-left: 4px;
    padding-right: 8px;
  }

  @media (max-width: 599px) {
    padding: 8px 10px;
  }
}

.wish-table-row {
  cursor: pointer;
  transition: background 0.12s;
  border-bottom: 0.5px solid rgba(234, 88, 12, 0.07);

  &:last-child {
    border-bottom: none;
  }

  &:hover:not(.wish-table-row--added) {
    background: rgba(234, 88, 12, 0.04);
  }
  &--selected {
    background: rgba(234, 88, 12, 0.07) !important;
    .wish-table-td--word {
      color: $orange;
      font-weight: 600;
    }
  }
  &--added {
    cursor: default;
    opacity: 0.5;
    &:hover {
      background: transparent;
    }
  }
}

.wish-table-td {
  padding: 11px 14px;
  color: $text-main;
  vertical-align: middle;

  &--num {
    width: 46px;
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;
  }
  &--word {
    min-width: 280px;
    line-height: 1.55;
    word-break: break-word;
  }
  &--fest {
    width: 220px;
    min-width: 180px;
  }
  &--action {
    width: 36px;
    text-align: center;
    padding-left: 4px;
    padding-right: 8px;
  }

  @media (max-width: 599px) {
    padding: 10px 10px;
  }
}

.wish-table-num-text {
  font-size: 0.76rem;
  color: $text-muted;
  display: block;
}

.wish-table-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-shrink: 0;

  &--on {
    background: $orange;
    box-shadow: 0 2px 6px rgba(234, 88, 12, 0.3);
  }
  &--added {
    background: #e5e7eb;
  }
}

.wish-fest-badge {
  display: inline-block;
  font-size: 0.72rem;
  background: rgba(234, 88, 12, 0.07);
  color: $orange;
  border-radius: 6px;
  padding: 2px 8px;
  white-space: nowrap;
  line-height: 1.4;
}

.wsp-skeleton-line {
  height: 12px;
  background: linear-gradient(
    90deg,
    rgba(234, 88, 12, 0.08) 25%,
    rgba(234, 88, 12, 0.04) 50%,
    rgba(234, 88, 12, 0.08) 75%
  );
  background-size: 200% 100%;
  border-radius: 6px;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.wsp-api-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 16px;
  color: $text-muted;
  font-size: 0.84rem;
}
.wsp-api-empty-text {
  color: #6b7280;
}
.wsp-retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid rgba(234, 88, 12, 0.2);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 0.78rem;
  cursor: pointer;
  color: $orange;
  transition: background 0.15s;
  &:hover {
    background: rgba(234, 88, 12, 0.07);
  }
}
.card-retry-btn {
  border-color: rgba(13, 148, 136, 0.22) !important;
  color: $teal !important;
  &:hover {
    background: $surface-teal !important;
  }
}
.wsp-load-more {
  display: flex;
  justify-content: center;
  padding: 12px;
}

// ── Card API Grid (inside dialog) ─────────────────────────────────
.card-dlg-scroll {
  padding: 12px;
  @media (max-width: 599px) {
    padding: 10px;
  }
}
.card-api-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
}
.card-api-thumb {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: $surface-teal;
  border: 2px solid transparent;
  transition:
    transform 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
  box-shadow: 0 1px 4px rgba(13, 148, 136, 0.08);

  &:hover:not(.card-api-thumb--added) {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(13, 148, 136, 0.16);
  }

  &--selected {
    border-color: $teal;
    box-shadow: 0 4px 16px rgba(13, 148, 136, 0.28);
  }
  &--added {
    cursor: default;
    opacity: 0.45;
    .card-api-thumb-img {
      filter: grayscale(60%);
    }
  }
  &--skeleton {
    pointer-events: none;
    cursor: default;
  }
}
.card-api-thumb-img {
  display: block;
  border-radius: 0;
}
.card-api-thumb-skeleton-img {
  width: 100%;
  padding-top: 100%;
  background: linear-gradient(
    90deg,
    rgba(13, 148, 136, 0.08) 25%,
    rgba(13, 148, 136, 0.04) 50%,
    rgba(13, 148, 136, 0.08) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.card-api-thumb-overlay {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 2;
}
.card-api-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &--on {
    background: $teal;
    box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
  }
  &--added {
    background: #e5e7eb;
  }
}
.card-api-thumb-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px 8px;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.55));
  display: flex;
  justify-content: flex-start;
  pointer-events: none;
}
.card-api-fest-badge {
  display: inline-block;
  max-width: 100%;
  font-size: 0.66rem;
  background: rgba(255, 255, 255, 0.95);
  color: $teal;
  border-radius: 5px;
  padding: 2px 6px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

// ── Footer ────────────────────────────────────────────────────────
.wish-dlg-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 20px;
  border-top: 1px solid rgba(249, 115, 22, 0.08);
  flex-shrink: 0;
  flex-wrap: wrap;
  row-gap: 8px;
  @media (max-width: 599px) {
    padding: 10px 14px;
  }
  @media (max-width: 479px) {
    flex-direction: column;
    align-items: stretch;
  }
}
.wish-footer-summary {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.84rem;
  color: $text-main;
}
.wish-footer-empty-label {
  font-size: 0.82rem;
  color: $text-muted;
}
.wish-footer-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 479px) {
    width: 100%;
    > * {
      flex: 1;
      justify-content: center;
    }
  }
}

// ── Card dialog secondary/confirm buttons (teal) ─────────────────
.card-secondary-btn {
  background: $surface-teal !important;
  color: $teal !important;
  border: 1.5px solid rgba(13, 148, 136, 0.22) !important;
  &:hover {
    background: rgba(13, 148, 136, 0.1) !important;
  }
}
.card-confirm-btn {
  background: linear-gradient(135deg, #064e3b, $teal) !important;
  color: #fff !important;
  box-shadow: 0 3px 12px rgba(13, 148, 136, 0.3) !important;
  &:hover:not(:disabled) {
    box-shadow: 0 5px 18px rgba(13, 148, 136, 0.4) !important;
  }
}

// ── Custom Tab (wish & card upload) ───────────────────────────────
.wish-dlg-custom-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px 14px;
  }
}
.wish-custom-section-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.9rem;
  font-weight: 700;
  color: $text-main;
  margin-bottom: 10px;
}
.wish-custom-hint {
  font-size: 0.78rem;
  color: $text-muted;
  margin: 0 0 10px;
  line-height: 1.5;
}
.wish-custom-shortcut {
  font-size: 0.72rem;
  color: $text-muted;
  margin-top: 6px;
}
.wish-sel-badge {
  margin-left: 4px;
  background: $orange;
  color: #fff;
  border-radius: 999px;
  padding: 1px 7px;
  font-size: 0.68rem;
  font-weight: 700;
}
.card-sel-badge {
  background: $teal !important;
}

// ── Card upload zone ──────────────────────────────────────────────
.card-upload-zone {
  border: 2px dashed rgba(13, 148, 136, 0.3);
  background: $surface-teal;
  border-radius: 12px;
  padding: 22px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.15s;

  &:hover {
    border-color: $teal;
    background: rgba(13, 148, 136, 0.06);
    transform: translateY(-1px);
  }
}
.card-upload-zone-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: $text-main;
  margin-top: 4px;
}
.card-upload-zone-sub {
  font-size: 0.74rem;
  color: $text-muted;
}

.wish-sel-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 260px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 767px) {
    max-height: 300px;
  }
  @media (max-width: 599px) {
    max-height: 220px;
  }
}
.wish-sel-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: $surface-2;
  border: 1px solid rgba(249, 115, 22, 0.1);
  border-radius: 9px;
  padding: 8px 10px;

  @media (max-width: 599px) {
    padding: 9px 10px;
    gap: 6px;
  }
}
.wish-sel-text {
  flex: 1;
  font-size: 0.84rem;
  color: $text-main;
  line-height: 1.45;
  overflow-wrap: break-word;
  word-break: break-word;
  min-width: 0;
  @media (max-width: 599px) {
    font-size: 0.82rem;
  }
}

.wish-sel-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  align-self: center;

  @media (max-width: 599px) {
    gap: 6px;
  }
}
.wish-sel-btn {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.15s,
    transform 0.1s;
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: scale(0.92);
  }

  @media (max-width: 599px) {
    width: 32px;
    height: 32px;
    border-radius: 8px;
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

// ── Card sel grid (right panel of upload tab) ─────────────────────
.card-sel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-height: 340px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 2px;

  @media (max-width: 599px) {
    max-height: 280px;
    grid-template-columns: repeat(3, 1fr);
  }
}
.card-sel-thumb {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: $surface-teal;
  box-shadow: 0 1px 4px rgba(13, 148, 136, 0.1);
}
.card-sel-thumb-img {
  display: block;
}
.card-sel-thumb-badge {
  position: absolute;
  bottom: 4px;
  left: 4px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 600;
  color: #fff;
  z-index: 2;
  &--api {
    background: rgba(13, 148, 136, 0.9);
  }
  &--new {
    background: rgba(234, 88, 12, 0.9);
  }
}
.card-sel-thumb-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(124, 45, 18, 0.78);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  z-index: 2;
  &:hover {
    background: $red;
  }
}

.wish-sel-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 12px;
  color: $text-muted;
  font-size: 0.82rem;
  text-align: center;
}
.wsp-badge {
  background: rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  padding: 0 6px;
  font-size: 0.7rem;
  font-weight: 700;
}

// ── Shared Dialog Buttons ─────────────────────────────────────────
.dlg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.15s,
    opacity 0.15s;
  white-space: nowrap;
  &:active {
    transform: scale(0.96);
  }
  &:disabled {
    opacity: 0.55;
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
    color: #fff;
    box-shadow: 0 3px 12px rgba(234, 88, 12, 0.3);
    &:hover:not(:disabled) {
      box-shadow: 0 5px 18px rgba(234, 88, 12, 0.4);
    }
  }
  &--secondary {
    background: $orange-soft;
    color: $orange;
    border: 1.5px solid rgba(234, 88, 12, 0.22);
    &:hover {
      background: rgba(234, 88, 12, 0.1);
    }
  }
  &--danger {
    background: linear-gradient(135deg, #ef4444, $red);
    color: #fff;
    box-shadow: 0 3px 12px rgba(220, 38, 38, 0.3);
  }
}

// ─── Simple Dialogs ───────────────────────────────────────────────────────────
.custom-dialog {
  background: $surface;
  border-radius: 20px;
  overflow: hidden;
  width: min(600px, 96vw);
  min-width: 0;
  max-height: 85vh;
  box-shadow: 0 20px 60px rgba(234, 88, 12, 0.18);
  display: flex;
  flex-direction: column;

  &--mobile {
    border-radius: 22px 22px 0 0;
    width: 100vw;
    max-width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 92dvh;
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
  flex-shrink: 0;

  &--danger {
    background: linear-gradient(135deg, #fee2e2, #fff1f2);
  }

  .custom-dialog--mobile &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: rgba(234, 88, 12, 0.2);
  }

  @media (max-width: 599px) {
    position: relative;
    padding: 1.25rem 1rem 1rem;
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
  flex-shrink: 0;
  &:hover {
    background: rgba(234, 88, 12, 0.14);
  }
}

.dialog-body {
  padding: 1.25rem;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 599px) {
    padding: 1rem;
  }
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
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (max-width: 599px) {
    padding: 0 1rem 1.25rem;
    padding-bottom: max(1.25rem, env(safe-area-inset-bottom));
  }
  @media (max-width: 399px) {
    > * {
      flex: 1;
      justify-content: center;
    }
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

<style lang="scss">
/* global — wish/card dialogs teleport outside component, scoped won't reach it */
.wish-dlg {
  width: min(1200px, 96vw) !important;
  max-width: 96vw !important;

  @media (max-width: 1023px) {
    width: min(900px, 96vw) !important;
  }

  @media (max-width: 767px) {
    width: 100vw !important;
    max-width: 100vw !important;
  }
}
</style>
