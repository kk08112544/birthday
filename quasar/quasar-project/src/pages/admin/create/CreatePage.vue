<template>
  <q-page class="festival-page">
    <!-- ===== HERO HEADER ===== -->
    <div class="hero-header">
      <div class="hero-orb hero-orb-1" />
      <div class="hero-orb hero-orb-2" />
      <div class="hero-orb hero-orb-3" />
      <div class="hero-content">
        <div class="hero-icon">🎊</div>
        <h1 class="hero-title">เพิ่มเทศกาลใหม่</h1>
        <p class="hero-sub">สร้างเทศกาลสุดพิเศษให้ผู้คนได้อวยพรกัน</p>
      </div>
    </div>

    <!-- ===== FORM (div แทน q-form เพื่อป้องกัน submit bubble) ===== -->
    <div class="form-body">
      <div class="form-container">
        <!-- ===== CARD: COVER IMAGE & NAME ===== -->
        <div class="fest-card animate-in" style="animation-delay: 0.05s">
          <div class="card-label">
            <span class="label-dot" />
            ข้อมูลเทศกาล
          </div>

          <div class="cover-upload-zone" @click="fileInput?.pickFiles()">
            <q-img
              v-if="imageFile"
              :src="getFilePreview(imageFile)"
              class="cover-img"
              :ratio="16 / 9"
            >
              <div class="cover-overlay">
                <q-icon name="photo_camera" size="28px" color="white" />
                <span>เปลี่ยนรูป</span>
              </div>
            </q-img>
            <div v-else class="cover-placeholder">
              <div class="cover-placeholder-icon">🖼️</div>
              <div class="cover-placeholder-text">คลิกเพื่ออัปโหลดรูปหน้าปก</div>
              <div class="cover-placeholder-sub">PNG, JPG ขนาดไม่เกิน 5MB</div>
            </div>
          </div>

          <q-file v-model="imageFile" ref="fileInput" accept="image/*" class="hidden" />

          <div class="q-mt-md">
            <q-input
              v-model="festivalName"
              label="ชื่อเทศกาล"
              placeholder="เช่น วันสงกรานต์ 2568"
              outlined
              dense
              autofocus
              lazy-rules
              :rules="[
                (val) => (typeof val === 'string' && val.trim().length > 0) || 'กรุณากรอกข้อมูล',
              ]"
              class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="festival" color="deep-orange-5" />
              </template>
            </q-input>
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
              unelevated
              color="deep-orange-5"
              icon="add"
              label="เพิ่มคำอวยพร"
              class="add-btn"
              @click="onAddWish"
            />
          </div>

          <transition-group name="wish-list" tag="div" class="wish-list-wrapper">
            <div v-for="(wish, i) in wishWordList" :key="wish + i" class="wish-item">
              <div class="wish-number">{{ i + 1 }}</div>
              <div class="wish-text">{{ wish }}</div>
              <div class="wish-actions">
                <button class="wish-btn wish-btn--edit" type="button" @click="editWish(i)">
                  <q-icon name="edit" size="16px" />
                </button>
                <button class="wish-btn wish-btn--delete" type="button" @click="deleteWish(i)">
                  <q-icon name="delete_outline" size="16px" />
                </button>
              </div>
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
              <span class="card-header-count">{{ cardFileList.length }}</span>
              <span class="card-header-unit">รูป</span>
            </div>
            <q-btn
              unelevated
              color="teal-6"
              icon="add_photo_alternate"
              label="เพิ่มการ์ด"
              class="add-btn"
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

    <!-- ===== DIALOG: ADD WISH ===== -->
    <q-dialog v-model="AddWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="custom-dialog-header">
          <span>✨ เพิ่มคำอวยพร</span>
          <button class="dialog-close" type="button" @click="AddWishDialog = false">
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
              @click="AddWishDialog = false"
            >
              ยกเลิก
            </button>
            <button type="submit" class="dialog-btn dialog-btn--confirm">บันทึก</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: EDIT WISH ===== -->
    <q-dialog v-model="EditWishDialog" :maximized="$q.screen.lt.sm">
      <div class="custom-dialog" :class="{ 'custom-dialog--mobile': $q.screen.lt.sm }">
        <div class="custom-dialog-header">
          <span>✏️ แก้ไขคำอวยพร</span>
          <button class="dialog-close" type="button" @click="EditWishDialog = false">
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
              @click="EditWishDialog = false"
            >
              ยกเลิก
            </button>
            <button type="submit" class="dialog-btn dialog-btn--confirm">อัปเดต</button>
          </div>
        </q-form>
      </div>
    </q-dialog>

    <!-- ===== DIALOG: DELETE ===== -->
    <q-dialog v-model="deleteDialog" persistent>
      <div class="custom-dialog">
        <div class="custom-dialog-header custom-dialog-header--danger">
          <span>🗑️ ยืนยันการลบ</span>
          <button class="dialog-close" type="button" @click="deleteDialog = false">
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
          <button type="button" class="dialog-btn dialog-btn--cancel" @click="deleteDialog = false">
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
            accept="image/*"
            class="custom-input"
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
      <div class="success-dialog">
        <div class="success-dialog-header">
          <div class="success-dialog-header-icon">
            <q-icon name="check_circle" size="1.6rem" color="white" />
          </div>
          <div>
            <div class="success-dialog-title">บันทึกสำเร็จ!</div>
            <div class="success-dialog-sub">กำลังนำท่านไปหน้ารายการ...</div>
          </div>
        </div>
        <div class="success-dialog-body">
          <div class="success-dialog-emoji">🎊</div>
          <p class="success-dialog-msg">{{ successMessage }}</p>
        </div>
        <div :key="successMessage" class="success-dialog-progress" />
      </div>
    </q-dialog>

    <!-- ===== CLICK PARTICLES ===== -->
    <teleport to="body">
      <div class="click-particles-root">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import type { QFile } from 'quasar';

const fileInput = ref<InstanceType<typeof QFile> | null>(null);
const $q = useQuasar();
const router = useRouter();

const festivalName = ref('');
const imageFile = ref<File | null>(null);
const loading = ref(false);

const AddWishDialog = ref(false);
const EditWishDialog = ref(false);
const editingIndex = ref<number | null>(null);
const showCardDialog = ref(false);
const deleteDialog = ref(false);
const deleteIndex = ref<number | null>(null);
const itemToDelete = ref<string | null>(null);

const tempWish = ref('');
const wishWordList = ref<string[]>([]);

const tempCardFile = ref<File | null>(null);
const cardFileList = ref<File[]>([]);

// ===== Success Dialog =====
const showSuccessDialog = ref(false);
const successMessage = ref('');

const openSuccessDialog = (message: string) => {
  successMessage.value = message;
  showSuccessDialog.value = true;
  setTimeout(() => {
    showSuccessDialog.value = false;
    void router.push('/admin/festival');
  }, 2000);
};

/* ===== WISH ===== */
const onAddWish = () => {
  tempWish.value = '';
  AddWishDialog.value = true;
};

const addWishToList = () => {
  if (!tempWish.value.trim()) return;
  wishWordList.value.push(tempWish.value.trim());
  tempWish.value = '';
  AddWishDialog.value = false;
};

const editWish = (index: number) => {
  const wish = wishWordList.value[index];
  if (!wish) return;
  tempWish.value = wish;
  editingIndex.value = index;
  EditWishDialog.value = true;
};

const updateWish = () => {
  if (editingIndex.value === null) return;
  if (!tempWish.value.trim()) return;
  wishWordList.value[editingIndex.value] = tempWish.value.trim();
  tempWish.value = '';
  editingIndex.value = null;
  EditWishDialog.value = false;
};

const deleteWish = (i: number) => {
  const item = wishWordList.value[i];
  if (!item) return;
  deleteIndex.value = i;
  itemToDelete.value = item;
  deleteDialog.value = true;
};

const confirmDelete = () => {
  if (deleteIndex.value === null) return;
  wishWordList.value.splice(deleteIndex.value, 1);
  deleteIndex.value = null;
  itemToDelete.value = null;
  deleteDialog.value = false;
};

/* ===== CARD ===== */
const onAddCard = () => {
  showCardDialog.value = true;
};

const addCardToList = () => {
  if (!tempCardFile.value) return;
  cardFileList.value.push(tempCardFile.value);
  tempCardFile.value = null;
  showCardDialog.value = false;
};

const removeCard = (i: number) => {
  cardFileList.value.splice(i, 1);
};

/* ===== UTIL ===== */
const getFilePreview = (file: File) => URL.createObjectURL(file);

/* ===== API ===== */
const submitAdd = async () => {
  // const accessToken  = localStorage.getItem('accessToken');
  const isNameValid =
    typeof festivalName.value === 'string' && festivalName.value.trim().length > 0;
  const isImageValid = !!imageFile.value;

  if (!isNameValid || !isImageValid) return;

  loading.value = true;
  try {
    let festivalImageName = '';
    if (imageFile.value) {
      const fd = new FormData();
      fd.append('singleFile', imageFile.value);
      const res = await api.post('/upload', fd);
      festivalImageName = res.data.image;
    }

    let cardImageNames: string[] = [];
    if (cardFileList.value.length > 0) {
      const uploadPromises = cardFileList.value.map(async (file) => {
        const formData = new FormData();
        formData.append('singleFile', file);
        const res = await api.post('/upload', formData);
        return res.data.image as string;
      });
      cardImageNames = await Promise.all(uploadPromises);
    }

    const payload = {
      festivalName: festivalName.value,
      image: festivalImageName,
      wisher: wishWordList.value.map((word) => ({ wishWord: word })),
      card: cardImageNames.map((imgName) => ({ imageCard: imgName })),
    };

    const response = await api.post('/admin/festival', payload);

    openSuccessDialog(response.data.message || 'บันทึกเทศกาลสำเร็จ');
  } catch {
    $q.notify({
      color: 'negative',
      message: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
      icon: 'warning',
      position: 'top',
    });
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap');

/* ===== TOKENS ===== */
$indigo-deep: #1a1460;
$indigo-mid: #2d2d8a;
$gold: #f5a623;
$gold-light: #ffd166;
$coral: #ff6b6b;
$teal: #0d9488;
$surface: #ffffff;
$surface-2: #f7f5ff;
$text-main: #1a1460;
$text-muted: #8b87b0;
$radius-card: 20px;
$radius-btn: 12px;

/* ===== PAGE ===== */
.festival-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(160deg, #f0edff 0%, #fff8ee 50%, #e8f9f6 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
}

/* ===== HERO ===== */
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
    transform: translateY(0px);
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

/* ===== FORM BODY ===== */
.form-body {
  margin-top: -2rem;
}

.form-container {
  max-width: 620px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ===== CARDS ===== */
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

/* ===== COVER UPLOAD ===== */
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

.cover-img {
  border-radius: 12px;
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

  .cover-upload-zone:hover & {
    opacity: 1;
  }
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
.cover-placeholder-sub {
  font-size: 0.78rem;
  color: $text-muted;
}

/* ===== INPUT ===== */
.custom-input :deep(.q-field__control) {
  border-radius: 12px !important;
}

/* ===== CARD HEADER ROW ===== */
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

/* ===== WISH LIST ===== */
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

/* ===== WISH LIST TRANSITION ===== */
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

/* ===== CARD GRID ===== */
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

/* ===== EMPTY STATE ===== */
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

/* ===== SUBMIT BUTTON ===== */
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

/* ===== DIALOG ===== */
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

/* ===== SUCCESS DIALOG ===== */
.success-dialog {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 340px;
  max-width: 92vw;
  box-shadow: 0 24px 64px rgba(26, 20, 96, 0.18);
}

.success-dialog-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #14532d, #16a34a);
}

.success-dialog-header-icon {
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

.success-dialog-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.success-dialog-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}

.success-dialog-body {
  padding: 1.5rem 1.5rem 0.75rem;
  text-align: center;
}

.success-dialog-emoji {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  display: block;
  animation: successPop 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes successPop {
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

.success-dialog-msg {
  font-size: 0.92rem;
  font-weight: 600;
  color: #374151;
  background: #f0fdf4;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0;
  line-height: 1.6;
}

.success-dialog-progress {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #14532d, #16a34a);
  animation: progressShrink 2s linear forwards;
  transform-origin: left;
}

@keyframes progressShrink {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* ===== ANIMATIONS ===== */
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

/* ===== RESPONSIVE ===== */
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

/* ===== CLICK PARTICLES ===== */
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
