<template>
  <q-page class="sender-page">
    <!-- ===== HERO ===== -->
    <div class="hero-header">
      <div class="hero-orb orb-1" />
      <div class="hero-orb orb-2" />
      <div class="hero-orb orb-3" />
      <div class="hero-content">
        <div class="hero-emoji">🎴</div>
        <h1 class="hero-title">ส่งคำอวยพร</h1>
        <p class="hero-sub">เลือกการ์ด เขียนชื่อ และส่งความสุขให้กัน</p>
      </div>
    </div>

    <!-- ===== FORM ===== -->
    <q-form class="form-body" @submit="postSender" @reset="resetForm">
      <div class="body-container">
        <!-- STEP 1: CARD PICKER -->
        <div class="section-card animate-in" style="animation-delay: 0.05s">
          <div class="section-label">
            <span class="step-badge">1</span>
            เลือกการ์ดอวยพร
          </div>

          <transition name="fade-slide">
            <div v-if="selectedImage" class="selected-preview">
              <q-img
                :src="selectedImage"
                :ratio="16 / 9"
                fit="contain"
                class="selected-preview-img"
              >
                <div class="selected-preview-badge">
                  <q-icon name="check_circle" size="16px" />
                  การ์ดที่เลือก
                </div>
              </q-img>
            </div>
          </transition>

          <div class="grid-wrapper">
            <div class="grid-row">
              <button
                class="nav-btn"
                :disabled="pagination.page === 1"
                @click="myTable?.prevPage()"
                type="button"
              >
                <q-icon name="chevron_left" size="22px" />
              </button>

              <div class="grid-area">
                <q-table
                  ref="myTable"
                  grid
                  flat
                  :rows="rows"
                  :columns="columns"
                  row-key="url"
                  v-model:pagination="pagination"
                  hide-header
                  hide-bottom
                >
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-4">
                      <div
                        class="img-card"
                        :class="selectedCardId === props.row.cId ? 'img-card--active' : ''"
                        @click="
                          selectedCardId = props.row.cId;
                          selectedImage = props.row.url;
                        "
                      >
                        <q-img :src="props.row.url" :ratio="1" fit="contain" class="img-card-img" />
                        <div v-if="selectedCardId === props.row.cId" class="img-card-check">
                          <q-icon name="check_circle" size="24px" color="white" />
                        </div>
                      </div>
                    </div>
                  </template>
                </q-table>
              </div>

              <button
                class="nav-btn"
                :disabled="pagination.page >= totalPages"
                @click="myTable?.nextPage()"
                type="button"
              >
                <q-icon name="chevron_right" size="22px" />
              </button>
            </div>

            <div v-if="totalPages > 1" class="page-dots">
              <span
                v-for="p in totalPages"
                :key="p"
                class="page-dot"
                :class="p === pagination.page ? 'page-dot--active' : ''"
                @click="pagination.page = p"
              />
            </div>
          </div>
        </div>

        <!-- STEP 2: FORM FIELDS -->
        <div class="section-card animate-in" style="animation-delay: 0.13s">
          <div class="section-label">
            <span class="step-badge step-badge--amber">2</span>
            ข้อมูลผู้ส่ง
          </div>

          <div class="fields-stack">
            <div class="field-group">
              <label class="field-label-text">คำอวยพร</label>
              <!-- <q-select
                outlined v-model="selectedWisher"
                :options="options"
                @filter="filterFn"
                emit-value map-options lazy-rules
                label="เลือกคำอวยพร..."
                class="custom-field"
                :rules="[(val) => (val !== null && val !== '') || 'กรุณาเลือกคำอวยพร']"
              >
                <template v-slot:prepend>
                  <q-icon name="auto_awesome" color="amber-7" />
                </template>
              </q-select> -->
              <q-select
                outlined
                v-model="selectedWisher"
                :options="options"
                @filter="filterFn"
                emit-value
                map-options
                lazy-rules
                label="เลือกคำอวยพร..."
                class="custom-field wish-select"
                popup-content-class="wish-select-popup"
                :rules="[(val) => (val !== null && val !== '') || 'กรุณาเลือกคำอวยพร']"
              >
                <template v-slot:prepend>
                  <q-icon name="auto_awesome" color="amber-7" />
                </template>

                <!-- แสดงค่าที่เลือกพร้อม emoji -->
                <template v-slot:selected-item="scope">
                  <div class="wish-selected-item">
                    <span class="wish-selected-dot">✨</span>
                    <span class="wish-selected-text">{{ scope.opt.label }}</span>
                  </div>
                </template>

                <!-- แต่ละ option ใน dropdown -->
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" class="wish-option-item">
                    <q-item-section avatar>
                      <div class="wish-option-icon">💬</div>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="wish-option-label">{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="selectedWisher === scope.opt.value">
                      <q-icon name="check_circle" color="indigo-5" size="18px" />
                    </q-item-section>
                  </q-item>
                </template>

                <!-- no option -->
                <template v-slot:no-option>
                  <div class="wish-no-option">
                    <span>🔍</span>
                    <span>ไม่พบคำอวยพร</span>
                  </div>
                </template>
              </q-select>
            </div>

            <div class="field-group">
              <label class="field-label-text">ชื่อ-นามสกุล</label>
              <q-input
                outlined
                v-model="name"
                label="กรอกชื่อ-นามสกุล"
                class="custom-field"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'กรุณากรอกชื่อ-นามสกุล']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="indigo-5" />
                </template>
              </q-input>
            </div>

            <div class="field-group">
              <label class="field-label-text">ตำแหน่ง</label>
              <q-input
                outlined
                v-model="position"
                label="กรอกตำแหน่ง"
                class="custom-field"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'กรุณากรอกตำแหน่ง']"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="indigo-5" />
                </template>
              </q-input>
            </div>

            <div class="field-group">
              <label class="field-label-text">กอง / สำนัก / ศูนย์</label>
              <q-input
                outlined
                v-model="department"
                label="กรอกหน่วยงาน หรือ บุคคลภายนอก"
                class="custom-field"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'กรุณากรอกหน่วยงาน']"
              >
                <template v-slot:prepend>
                  <q-icon name="corporate_fare" color="indigo-5" />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="actions-row animate-in" style="animation-delay: 0.2s">
          <button type="reset" class="reset-btn">
            <q-icon name="refresh" size="18px" />
            ล้างข้อมูล
          </button>
          <button
            type="submit"
            class="submit-btn"
            :class="{ 'submit-btn--loading': submitting }"
            :disabled="submitting"
          >
            <span v-if="!submitting" class="btn-inner">
              <q-icon name="send" size="18px" />
              ส่งคำอวยพร
            </span>
            <span v-else class="btn-inner">
              <q-circular-progress indeterminate size="18px" color="white" />
              กำลังส่ง...
            </span>
          </button>
        </div>
      </div>
    </q-form>
    <!-- ===== UNPOLITE DIALOG ===== -->
    <q-dialog v-model="showUnpoliteDialog" persistent>
      <div class="unpolite-dialog">
        <!-- Header -->
        <div class="unpolite-header">
          <div class="unpolite-header-icon">
            <q-icon name="warning_amber" size="1.6rem" color="white" />
          </div>
          <div class="unpolite-header-text">
            <div class="unpolite-title">ไม่สามารถส่งคำอวยพรได้</div>
            <div class="unpolite-sub">พบคำที่ไม่เหมาะสมในข้อมูล</div>
          </div>
        </div>

        <!-- Body -->
        <div class="unpolite-body">
          <div class="unpolite-icon-wrap">
            <span class="unpolite-emoji">🚫</span>
          </div>
          <p class="unpolite-msg">{{ unpoliteMessage }}</p>
          <p class="unpolite-hint">
            กรุณาตรวจสอบข้อมูลที่กรอก และแก้ไขคำที่ไม่เหมาะสมก่อนส่งอีกครั้ง
          </p>
        </div>

        <!-- Footer -->
        <div class="unpolite-footer">
          <button class="unpolite-btn" @click="showUnpoliteDialog = false">
            <q-icon name="edit" size="16px" class="q-mr-xs" />
            แก้ไขข้อมูล
          </button>
        </div>
      </div>
    </q-dialog>
    <!-- ===== SUCCESS OVERLAY ===== -->
    <transition name="success-fade">
      <div v-if="showSuccess" class="success-overlay" @click.self="closeSuccess">
        <!-- Confetti particles -->
        <div class="confetti-wrap">
          <span v-for="n in 18" :key="n" class="confetti-dot" :style="confettiStyle(n)" />
        </div>

        <!-- Card -->
        <div class="success-card">
          <!-- Animated check + Fireworks -->
          <div class="success-icon-ring" @click="triggerFirework">
            <!-- Sparkle burst particles -->
            <span
              v-for="s in 12"
              :key="s"
              class="sparkle"
              :class="{ 'sparkle--burst': fireworkActive }"
              :style="sparkleStyle(s)"
            />
            <div class="success-icon-inner">
              <q-icon name="celebration" size="2.4rem" color="white" />
            </div>
          </div>
          <div class="icon-hint" v-if="!fireworkActive">กดเพื่อฉลอง 🎊</div>
          <div class="icon-hint icon-hint--boom" v-else>🎆 ยินดีด้วย! 🎆</div>

          <!-- Heading -->
          <div class="success-title">อวยพรสำเร็จแล้ว! 🎉</div>
          <div class="success-msg">ขอให้ท่านประสบความสำเร็จ<br />ในหน้าที่การทำงาน</div>

          <!-- Card preview -->
          <div v-if="successImage" class="success-card-preview">
            <q-img :src="successImage" :ratio="4 / 3" fit="contain" class="success-preview-img" />
            <div class="success-wish-chip" v-if="successWishText">
              <q-icon name="format_quote" size="13px" class="q-mr-xs" />
              {{ successWishText }}
            </div>
          </div>

          <!-- Sender info -->
          <div class="success-sender-info" v-if="successName">
            <q-icon name="person" size="15px" class="q-mr-xs" color="indigo-4" />
            <span>{{ successName }}</span>
            <span v-if="successDept" class="success-dept"> · {{ successDept }}</span>
          </div>

          <!-- Close button -->
          <button class="success-close-btn" @click="closeSuccess">
            <q-icon name="check" size="18px" class="q-mr-xs" />
            ขอบคุณ
          </button>

          <!-- Send again -->
          <button class="success-again-btn" @click="closeSuccess">ส่งอีกครั้ง</button>
        </div>
      </div>
    </transition>

    <!-- ===== CLICK PARTICLES ===== -->
    <teleport to="body">
      <div class="click-particles-root">
        <span v-for="p in activeParticles" :key="p.id" class="click-particle" :style="p.style" />
      </div>
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import type { QTable } from 'quasar';
import type { AxiosError } from 'axios';

const props = defineProps({ id: { type: String, required: true } });

const $q = useQuasar();
const myTable = ref<InstanceType<typeof QTable> | null>(null);

const wisherData = ref<{ label: string; value: number }[]>([]);
const selectedWisher = ref(null);
const name = ref(null);
const position = ref(null);
const department = ref(null);
const submitting = ref(false);

interface CardRow {
  cId: number;
  url: string;
}
const selectedCardId = ref<number | null>(null);
const selectedImage = ref<string | null>(null);
const rows = ref<CardRow[]>([]);
const columns = [{ name: 'image', label: 'รูปภาพ', field: 'url' }];
const ROWS_PER_PAGE = 3;
const pagination = ref({ page: 1, rowsPerPage: ROWS_PER_PAGE });
const totalPages = computed(() => Math.max(1, Math.ceil(rows.value.length / ROWS_PER_PAGE)));

// ===== Success state =====
const showSuccess = ref(false);
const successImage = ref<string | null>(null);
const successName = ref<string | null>(null);
const successDept = ref<string | null>(null);
const successWishText = ref<string | null>(null);

// ===== Unpolite Dialog =====
const showUnpoliteDialog = ref(false);
const unpoliteMessage = ref('');

type Wisher = { wId: number; wishWord: string };
type FestivalCard = { cId: number; imageCard: string };
type FestivalResponse = { fId: number; wisher: Wisher[]; card: FestivalCard[] };

const options = ref<{ label: string; value: number }[]>([]);

const filterFn = (val: string, update: (cb: () => void) => void) => {
  update(() => {
    if (val === '') {
      options.value = wisherData.value;
      return;
    }
    const needle = val.toLowerCase();
    options.value = wisherData.value.filter((v) => v.label.toLowerCase().includes(needle));
  });
};

const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch {
    return '';
  }
};

const fetchBirthCard = async (targetId: string) => {
  $q.loading.show();
  try {
    const response = await api.get<{ festival: FestivalResponse }>(`/festival/${Number(targetId)}`);
    const fest = response.data?.festival;
    if (fest?.fId) {
      wisherData.value = (fest.wisher || []).map((i) => ({ label: i.wishWord, value: i.wId }));
      options.value = wisherData.value;
      const validCards = await Promise.all(
        (fest.card || []).map(async (c) => {
          if (!c.imageCard) return null;
          const url = await getImageUrl(c.imageCard);
          return { cId: c.cId, url };
        }),
      );
      rows.value = validCards.filter((c): c is CardRow => c !== null);
      const first = rows.value?.[0];
      if (first) {
        selectedCardId.value = first.cId;
        selectedImage.value = first.url;
      }
    }
  } catch {
    $q.notify({ color: 'negative', message: 'ไม่สามารถโหลดข้อมูลได้' });
  } finally {
    $q.loading.hide();
  }
};

// const postSender = async () => {
//   submitting.value = true;
//   try {
//     const response = await api.post('/sender', {
//       fullname:   name.value,
//       position:   position.value,
//       department: department.value,
//       wishId:     selectedWisher.value,
//       cardId:     selectedCardId.value,
//       festivalId: Number(props.id),
//     });

//     if (response.status === 201) {
//       // เก็บข้อมูลสำหรับ success dialog
//       successImage.value    = selectedImage.value;
//       successName.value     = name.value;
//       successDept.value     = department.value;
//       const wishObj = wisherData.value.find(w => w.value === selectedWisher.value);
//       successWishText.value = wishObj?.label ?? null;

//       showSuccess.value = true;
//     }
//   } catch (err: unknown) {
//     const error = err as AxiosError<{ message: string }>;
//     $q.notify({
//       color: 'negative',
//       message: error.response?.data?.message || 'เกิดข้อผิดพลาด',
//       position: 'top',
//     });
//   } finally {
//     submitting.value = false;
//   }
// };
const postSender = async () => {
  submitting.value = true;
  try {
    const response = await api.post('/sender', {
      fullname: name.value,
      position: position.value,
      department: department.value,
      wishId: selectedWisher.value,
      cardId: selectedCardId.value,
      festivalId: Number(props.id),
    });

    if (response.status === 201) {
      successImage.value = selectedImage.value;
      successName.value = name.value;
      successDept.value = department.value;
      const wishObj = wisherData.value.find((w) => w.value === selectedWisher.value);
      successWishText.value = wishObj?.label ?? null;
      showSuccess.value = true;
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const msg = error.response?.data?.message || 'เกิดข้อผิดพลาด';

    // ถ้า backend ส่ง message เกี่ยวกับคำไม่สุภาพ → เปิด dialog
    if (error.response?.status === 400 && msg) {
      unpoliteMessage.value = msg;
      showUnpoliteDialog.value = true;
    } else {
      $q.notify({ color: 'negative', message: msg, position: 'top' });
    }
  } finally {
    submitting.value = false;
  }
};

const resetForm = () => {
  name.value = null;
  position.value = null;
  department.value = null;
  selectedWisher.value = null;
  pagination.value.page = 1;
  const first = rows.value?.[0];
  if (first) {
    selectedCardId.value = first.cId;
    selectedImage.value = first.url;
  }
};

const closeSuccess = () => {
  showSuccess.value = false;
  resetForm();
};

// ===== Firework =====
const fireworkActive = ref(false);

const triggerFirework = () => {
  fireworkActive.value = false;
  // force re-trigger
  setTimeout(() => {
    fireworkActive.value = true;
  }, 10);
  setTimeout(() => {
    fireworkActive.value = false;
  }, 900);
};

// Auto-trigger once when dialog opens
watch(showSuccess, (val) => {
  if (val) setTimeout(triggerFirework, 350);
});

const sparkleStyle = (n: number) => {
  const colors = [
    '#fbbf24',
    '#e11d48',
    '#6366f1',
    '#22c55e',
    '#fb7185',
    '#f59e0b',
    '#a78bfa',
    '#34d399',
    '#f472b6',
  ];
  const angle = (n - 1) * 30; // 12 particles × 30° = 360°
  const color = colors[n % colors.length];
  const size = 6 + (n % 4) * 2;
  return {
    '--angle': `${angle}deg`,
    '--color': color,
    '--size': `${size}px`,
    '--dist': `${52 + (n % 3) * 14}px`,
  };
};

// Random confetti styles
const confettiStyle = (n: number) => {
  const colors = ['#e11d48', '#fbbf24', '#6366f1', '#22c55e', '#fb7185', '#f59e0b', '#818cf8'];
  const color = colors[n % colors.length];
  const left = (n * 37 + 11) % 100;
  const delay = ((n * 0.17) % 1.2).toFixed(2);
  const dur = (1.2 + ((n * 0.13) % 1)).toFixed(2);
  const size = 6 + (n % 5);
  return {
    left: `${left}%`,
    top: `${(n * 23) % 60}%`,
    width: `${size}px`,
    height: `${size}px`,
    background: color,
    animationDelay: `${delay}s`,
    animationDuration: `${dur}s`,
    borderRadius: n % 3 === 0 ? '50%' : '2px',
  };
};

// ===== Click Particles =====
interface Particle {
  id: number;
  style: Record<string, string>;
}

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

// shape types: circle, square, star, triangle
type ShapeType = 'circle' | 'square' | 'star' | 'triangle' | 'emoji';

const spawnParticles = (x: number, y: number) => {
  const count = 36 + Math.floor(Math.random() * 12); // 36–48 particles
  const W = window.innerWidth;
  const H = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const id = ++particleId;
    const size = 7 + Math.random() * 11;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)] ?? '#fbbf24';
    const dur = 1.2 + Math.random() * 1.2;
    const emoji = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)] ?? '🎉';

    const shapes: ShapeType[] = ['circle', 'square', 'star', 'triangle', 'emoji'];
    const weights = [0.25, 0.2, 0.2, 0.15, 0.2];
    const rand = Math.random();
    let cumulative = 0;
    let shape: ShapeType = 'circle';
    for (let s = 0; s < shapes.length; s++) {
      cumulative += weights[s] ?? 0;
      if (rand < cumulative) {
        shape = shapes[s] ?? 'circle';
        break;
      }
    }

    const isEmoji = shape === 'emoji';

    // สุ่ม target position ที่ใดก็ได้บนหน้าจอ
    // แบ่ง zone 4 มุม + 4 ขอบ ให้กระจายทั่ว
    const zone = i % 8;
    let targetX: number, targetY: number;

    switch (zone) {
      case 0: // ซ้ายบน
        targetX = Math.random() * W * 0.35;
        targetY = Math.random() * H * 0.35;
        break;
      case 1: // กลางบน
        targetX = W * 0.25 + Math.random() * W * 0.5;
        targetY = Math.random() * H * 0.25;
        break;
      case 2: // ขวาบน
        targetX = W * 0.65 + Math.random() * W * 0.35;
        targetY = Math.random() * H * 0.35;
        break;
      case 3: // ขวากลาง
        targetX = W * 0.65 + Math.random() * W * 0.35;
        targetY = H * 0.25 + Math.random() * H * 0.5;
        break;
      case 4: // ขวาล่าง
        targetX = W * 0.65 + Math.random() * W * 0.35;
        targetY = H * 0.65 + Math.random() * H * 0.35;
        break;
      case 5: // กลางล่าง
        targetX = W * 0.25 + Math.random() * W * 0.5;
        targetY = H * 0.75 + Math.random() * H * 0.25;
        break;
      case 6: // ซ้ายล่าง
        targetX = Math.random() * W * 0.35;
        targetY = H * 0.65 + Math.random() * H * 0.35;
        break;
      case 7: // ซ้ายกลาง
        targetX = Math.random() * W * 0.25;
        targetY = H * 0.25 + Math.random() * H * 0.5;
        break;
      default:
        targetX = Math.random() * W;
        targetY = Math.random() * H;
    }

    // dx/dy คือระยะจากจุดคลิกไปยัง target
    const dx = targetX - x;
    const dy = targetY - y;

    const style: Record<string, string> = {
      '--x': `${x}px`,
      '--y': `${y}px`,
      '--dx': `${dx}px`,
      '--dy': `${dy}px`,
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
  const target = e.target as HTMLElement;
  // ข้ามปุ่มล้างข้อมูลและ element ลูกของมัน
  if (target.closest('.reset-btn')) return;
  spawnParticles(e.clientX, e.clientY);
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});

watch(
  () => props.id,
  (newId) => {
    if (newId) void fetchBirthCard(newId);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&display=swap');

$indigo-deep: #1a1460;
$indigo-mid: #2d2d8a;
$indigo-soft: #eeeeff;
$gold: #f5a623;
$teal: #0d9488;
$white: #ffffff;
$surface: #f5f4ff;
$muted: #8b87b0;

// ============================================================
// PAGE
// ============================================================
.sender-page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: linear-gradient(155deg, #f0edff 0%, #fff9ee 55%, #e8f8f6 100%);
  min-height: 100vh;
  padding-bottom: 3rem;
}

// ============================================================
// HERO
// ============================================================
.hero-header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, $indigo-deep 0%, $indigo-mid 55%, #3b1f80 100%);
  padding: clamp(2rem, 5vw, 3.5rem) 1.5rem clamp(3rem, 7vw, 5rem);
  text-align: center;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.14;
}
.orb-1 {
  width: 300px;
  height: 300px;
  background: $gold;
  top: -90px;
  right: -70px;
  animation: floatY 7s ease-in-out infinite;
}
.orb-2 {
  width: 200px;
  height: 200px;
  background: $teal;
  bottom: -50px;
  left: -50px;
  animation: floatY 9s ease-in-out infinite reverse;
}
.orb-3 {
  width: 130px;
  height: 130px;
  background: #ffd166;
  top: 10px;
  left: 28%;
  animation: floatY 5.5s ease-in-out infinite 1.2s;
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18px);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-emoji {
  font-size: clamp(2.8rem, 8vw, 4rem);
  line-height: 1;
  margin-bottom: 0.6rem;
  animation: popIn 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes popIn {
  0% {
    transform: scale(0.4);
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

.hero-title {
  font-family: 'Prompt', sans-serif;
  font-size: clamp(1.7rem, 5vw, 2.5rem);
  font-weight: 700;
  color: $white;
  margin: 0 0 0.35rem;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: clamp(0.82rem, 2.5vw, 1rem);
  color: rgba(255, 255, 255, 0.68);
  margin: 0;
}

// ============================================================
// FORM
// ============================================================
.form-body {
  margin-top: -2rem;
}

.body-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-card {
  background: $white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow:
    0 4px 28px rgba(26, 20, 96, 0.08),
    0 1px 4px rgba(26, 20, 96, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.85);

  @media (max-width: 480px) {
    padding: 1.1rem;
  }
}

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: $muted;
  text-transform: uppercase;
  margin-bottom: 1.1rem;
}

.step-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  color: $white;
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &--amber {
    background: linear-gradient(135deg, $gold, #e8820a);
  }
}

.selected-preview {
  margin-bottom: 1rem;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(26, 20, 96, 0.12);
}

.selected-preview-img {
  border-radius: 14px;
}

.selected-preview-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(26, 20, 96, 0.75);
  backdrop-filter: blur(4px);
  color: $white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

// ===== WISH SELECT =====
.wish-select {
  :deep(.q-field__control) {
    border-radius: 14px !important;
    background: linear-gradient(135deg, #f8f7ff, #fff) !important;
    border: 1.5px solid rgba(99, 102, 241, 0.2) !important;
    transition:
      border-color 0.2s,
      box-shadow 0.2s !important;
  }

  :deep(.q-field--focused .q-field__control) {
    border-color: rgba(99, 102, 241, 0.5) !important;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
  }

  :deep(.q-field__label) {
    color: #8b87b0 !important;
    font-size: 0.88rem !important;
  }
}

.wish-selected-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
}

.wish-selected-dot {
  font-size: 1rem;
  flex-shrink: 0;
}

.wish-selected-text {
  font-size: 0.92rem;
  font-weight: 600;
  color: #1a1460;
  line-height: 1.4;
  white-space: normal;
  word-break: break-word;
}

// Popup dropdown
:global(.wish-select-popup) {
  border-radius: 14px !important;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15) !important;
  border: 1px solid rgba(99, 102, 241, 0.1) !important;
  overflow: hidden;
}

.wish-option-item {
  padding: 10px 14px !important;
  transition: background 0.15s !important;
  border-bottom: 1px solid rgba(99, 102, 241, 0.05) !important;

  &:last-child {
    border-bottom: none !important;
  }

  &:hover {
    background: rgba(99, 102, 241, 0.05) !important;
  }

  // active item
  :deep(&.q-item--active) {
    background: rgba(99, 102, 241, 0.08) !important;
  }
}

.wish-option-icon {
  font-size: 1.1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wish-option-label {
  font-size: 0.88rem !important;
  font-weight: 500 !important;
  color: #1a1460 !important;
  white-space: normal !important;
  line-height: 1.5 !important;
}

.wish-no-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 1.5rem;
  color: #9ca3af;
  font-size: 0.85rem;

  span:first-child {
    font-size: 2rem;
  }
}
.grid-wrapper {
  width: 100%;
}

.grid-row {
  display: flex;
  align-items: center;
  gap: 6px;

  @media (min-width: 480px) {
    gap: 10px;
  }
}

.grid-area {
  flex: 1;
  min-width: 0;
}

.nav-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(45, 45, 138, 0.2);
  background: $white;
  color: $indigo-mid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.18s,
    border-color 0.18s,
    transform 0.12s,
    box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(45, 45, 138, 0.08);

  &:hover:not(:disabled) {
    background: $indigo-soft;
    border-color: $indigo-mid;
    transform: scale(1.08);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (min-width: 480px) {
    width: 44px;
    height: 44px;
  }
}

.img-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2.5px solid transparent;
  transition:
    border-color 0.22s,
    transform 0.2s,
    box-shadow 0.2s;
  background: $surface;

  &:hover {
    border-color: rgba(45, 45, 138, 0.35);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(45, 45, 138, 0.15);
  }
  &--active {
    border-color: $indigo-mid;
    box-shadow: 0 6px 24px rgba(45, 45, 138, 0.28);
    transform: translateY(-2px);
  }
}

.img-card-img {
  display: block;
}

.img-card-check {
  position: absolute;
  inset: 0;
  background: rgba(45, 45, 138, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 0.75rem;
}

.page-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(45, 45, 138, 0.2);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;

  &--active {
    background: $indigo-mid;
    transform: scale(1.35);
  }
}

.fields-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label-text {
  font-size: 0.78rem;
  font-weight: 600;
  color: $muted;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding-left: 2px;
}

.custom-field :deep(.q-field__control) {
  border-radius: 12px !important;
  background: $surface !important;
}

.actions-row {
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.submit-btn,
.reset-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.9rem 1.4rem;
  border-radius: 14px;
  border: none;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.18s,
    box-shadow 0.18s,
    opacity 0.18s;

  &:active {
    transform: scale(0.97);
  }
}

.submit-btn {
  flex: 1;
  background: linear-gradient(135deg, $indigo-deep, $indigo-mid 55%, #5a3ea0);
  color: $white;
  box-shadow: 0 6px 24px rgba(45, 45, 138, 0.32);

  &:hover:not(:disabled) {
    box-shadow: 0 10px 32px rgba(45, 45, 138, 0.42);
    transform: translateY(-2px);
  }
  &--loading,
  &:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
}

.btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.reset-btn {
  background: rgba(45, 45, 138, 0.07);
  color: $muted;
  flex: 0 0 auto;
  padding: 0.9rem 1.2rem;

  &:hover {
    background: rgba(45, 45, 138, 0.13);
    color: $indigo-mid;
  }

  @media (max-width: 480px) {
    flex: 1;
  }
}

// ============================================================
// SUCCESS OVERLAY
// ============================================================
.success-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 8, 40, 0.72);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

// Confetti
.confetti-wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.confetti-dot {
  position: absolute;
  animation: confettiFall linear infinite;
  opacity: 0.85;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(540deg);
    opacity: 0;
  }
}

// Card
.success-card {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 28px;
  padding: 2rem 1.75rem 1.75rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 80px rgba(26, 20, 96, 0.28);
  animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;

  @media (max-width: 480px) {
    border-radius: 22px;
    padding: 1.5rem 1.25rem 1.25rem;
  }
}

@keyframes successPop {
  from {
    opacity: 0;
    transform: scale(0.86) translateY(24px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

// Icon ring
.success-icon-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.4rem;
  position: relative;
  cursor: pointer;
  animation: ringPulse 1.5s ease-in-out infinite;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.95);
  }
}

// ===== SPARKLE PARTICLES =====
.sparkle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: var(--color);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;

  &--burst {
    animation: sparkleBurst 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc((var(--angle) / 360) * 0.15s);
  }
}

@keyframes sparkleBurst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--dist)))
      scale(0.3);
  }
}

.icon-hint {
  font-size: 0.72rem;
  color: #9ca3af;
  margin-bottom: 0.75rem;
  transition: all 0.3s;
  min-height: 18px;

  &--boom {
    color: #6366f1;
    font-weight: 600;
    animation: hintPop 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
}

@keyframes hintPop {
  0% {
    transform: scale(0.8);
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

@keyframes ringPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.25);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
  }
}

.success-icon-inner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(45, 45, 138, 0.35);
}

.success-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: $indigo-deep;
  margin-bottom: 0.5rem;
}

.success-msg {
  font-size: 0.95rem;
  color: #5a5a8a;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

// Card preview
.success-card-preview {
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1.5px solid rgba(45, 45, 138, 0.1);
  position: relative;
}

.success-preview-img {
  display: block;
}

.success-wish-chip {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 20, 96, 0.75);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 0.72rem;
  font-style: italic;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Sender info
.success-sender-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  color: #7b7ba8;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 4px;
}

.success-dept {
  opacity: 0.75;
}

// Buttons
.success-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, $indigo-mid, #6b5ce7);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(45, 45, 138, 0.3);
  transition:
    transform 0.18s,
    box-shadow 0.18s;
  margin-bottom: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(45, 45, 138, 0.4);
  }
}

.success-again-btn {
  background: none;
  border: none;
  color: #9ca3af;
  font-family: 'Noto Sans Thai', sans-serif;
  font-size: 0.82rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.15s;

  &:hover {
    color: $indigo-mid;
  }
}

// ============================================================
// TRANSITIONS
// ============================================================
.success-fade-enter-active,
.success-fade-leave-active {
  transition: opacity 0.3s ease;
}
.success-fade-enter-from,
.success-fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.32s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.97);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}

.animate-in {
  animation: slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ============================================================
// UNPOLITE DIALOG
// ============================================================
.unpolite-dialog {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  width: 360px;
  max-width: 92vw;
  box-shadow: 0 24px 64px rgba(220, 38, 38, 0.18);
}

.unpolite-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #7f1d1d, #dc2626);
}

.unpolite-header-icon {
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

.unpolite-title {
  font-family: 'Prompt', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.unpolite-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}

.unpolite-body {
  padding: 1.5rem 1.5rem 0.75rem;
  text-align: center;
}

.unpolite-icon-wrap {
  margin-bottom: 0.75rem;
}

.unpolite-emoji {
  font-size: 3rem;
  display: inline-block;
  animation: unpoliteShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes unpoliteShake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-12deg) scale(1.1);
  }
  40% {
    transform: rotate(10deg) scale(1.1);
  }
  60% {
    transform: rotate(-8deg);
  }
  80% {
    transform: rotate(6deg);
  }
}

.unpolite-msg {
  font-size: 0.92rem;
  font-weight: 600;
  color: #dc2626;
  background: #fee2e2;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0 0 10px;
  line-height: 1.6;
}

.unpolite-hint {
  font-size: 0.78rem;
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

.unpolite-footer {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  justify-content: center;
}

.unpolite-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 28px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #7f1d1d, #dc2626);
  color: white;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.35);
  transition:
    transform 0.18s,
    box-shadow 0.18s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(220, 38, 38, 0.45);
  }

  &:active {
    transform: scale(0.97);
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
  /* ลบ overflow: hidden ออก เพื่อให้ particles ออกนอกขอบได้ */
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
