<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="lhh LpR lดf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title> {{ festivalName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- <q-img :src="image" class="banner-image shadow-2 rounded-borders" fit="cover">
      <template v-slot:loading>
        <q-spinner-gears color="primary" size="3rem" />
      </template>
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          ไม่สามารถโหลดรูปภาพได้
        </div>
      </template>
    </q-img> -->
    <div class="row flex-center q-pt-md">
      <!-- <q-img 
      :src="image" 
      class="banner-image shadow-2" 
      fit="cover"
      native-context-menu
    > -->
      <q-img
        :src="image"
        :class="[$q.screen.gt.sm ? 'banner-desktop' : 'banner-mobile', 'shadow-2 rounded-borders']"
        fit="cover"
      >
        <template v-slot:loading>
          <q-spinner-gears color="primary" size="3rem" />
        </template>
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            ไม่สามารถโหลดรูปภาพได้
          </div>
        </template>
      </q-img>
    </div>
    <q-toolbar class="wish-toolbar text-black q-mt-md shadow-1">
      <div class="row flex-center full-width q-gutter-x-md q-gutter-y-xs">
        <q-toolbar-title class="wish-title text-weight-bold">
          <!-- ร่วมส่งคำอวยพร -->
          <!-- <q-item clickable to="/" class="flex flex-center text-center">
            ร่วมส่งคำอวยพร
          </q-item> -->
          <q-item
            clickable
            to="/"
            class="flex flex-center text-center wish-link"
            :class="{ 'wish-active': route.path === '/' }"
          >
            ร่วมส่งคำอวยพร
          </q-item>
        </q-toolbar-title>

        <q-separator vertical dark class="gt-sm" />

        <q-toolbar-title class="wish-title text-weight-bold">
          <q-item
            clickable
            to="/list"
            class="flex flex-center text-center wish-link"
            :class="{ 'wish-active': route.path === '/list' }"
          >
            <!-- active-class="wish-active" -->
            รายชื่อผู้ร่วมอวยพร
          </q-item>
        </q-toolbar-title>
      </div>
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- ✅ ใส่ footer ตรงนี้ -->
    <!-- <q-footer elevated>
      <q-toolbar class="primary">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    <q-footer class="footer-bg text-white q-pt-xl q-pb-md">
      <div class="container q-px-md" style="max-width: 1200px; margin: 0 auto">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-5">
            <div class="flex items-center q-mb-md">
              <q-icon name="festival" size="sm" class="q-mr-sm" />
              <div class="text-h6 text-weight-bold">Festival Greeting LDD</div>
            </div>
            <p class="text-body2 opacity-80" style="line-height: 1.6">
              ร่วมเฉลิมฉลองเนื่องในโอกาสต่างๆ ด้วยคำอวยพร ความสุข และพลังใจดีๆ ให้แก่ผู้บริหาร
              บุคลากร และเครือข่าย ของกรมพัฒนาที่ดิน
            </p>
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="text-subtitle1 text-weight-bold q-mb-md">เมนูทางลัด</div>
            <div class="column q-gutter-y-sm">
              <router-link to="/" class="footer-link">ร่วมส่งคำอวยพร</router-link>
              <router-link to="/list" class="footer-link">รายชื่อผู้ร่วมอวยพร</router-link>
              <router-link to="/login" class="footer-link">แอดมิน</router-link>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <div class="text-subtitle1 text-weight-bold q-mb-md">ติดต่อสอบถาม</div>
            <div class="column q-gutter-y-sm">
              <div class="flex items-start no-wrap">
                <q-icon name="apartment" size="xs" class="q-mr-sm q-mt-xs" />
                <a
                  href="https://webapp.ldd.go.th/ICTWeb/index.php"
                  target="_blank"
                  class="text-body2 footer-link flex items-start no-wrap"
                >
                  <span class="text-body2">ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กรมพัฒนาที่ดิน</span>
                </a>
              </div>
              <div class="flex items-center no-wrap">
                <q-icon name="account_circle" size="xs" class="q-mr-sm" />
                <span class="text-body2">กลุ่มฐานข้อมูลสารสนเทศ</span>
              </div>
              <div class="flex items-center no-wrap">
                <q-icon name="call" size="xs" class="q-mr-sm" />
                <span class="text-body2">02-562-5100 ต่อ 1328</span>
              </div>
            </div>
          </div>
        </div>

        <q-separator dark class="q-my-lg opacity-20" />

        <div class="text-center opacity-70 text-body2">
          กรมพัฒนาที่ดิน ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900 โทร. 1760 ต่อ 1275
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';
const image = ref('');
const festivalId = ref();
const birthData = ref(null); // เปลี่ยนชื่อให้สื่อความหมาย และค่าเริ่มต้นเป็น null
const festivalName = ref('');

const route = useRoute();
const $q = useQuasar();
$q.loading.show();
// ตัวอย่างการใช้ Screen Plugin ของ Quasar (หากต้องการสลับ Logic บางอย่าง)
if ($q.screen.lt.md) {
  console.log('โหมดมือถือ/แท็บเล็ต');
}

const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/file/${imagePath}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    // คืนค่า Placeholder Image ในกรณีผิดพลาด หรือ คืนค่าว่าง
    return '';
  }
};
const fetchFestival = async () => {
  try {
    const response = await api.get('/festival/all');

    // ตรวจสอบข้อมูลก่อนใช้งาน
    if (response.data?.festival && response.data.festival.length > 0) {
      const data = response.data.festival[0];
      festivalName.value = data.festivalName;
      birthData.value = data;
      image.value = response.data.festival[0]?.image;
      festivalId.value = response.data.festival[0]?.fId;
      localStorage.setItem('festivalId', String(festivalId.value));
      if (image.value) {
        image.value = await getImageUrl(data.image);
      } else {
        // หากไม่มีชื่อรูปใน DB ให้ใช้รูป default
        image.value = '';
      }
    }
  } catch (error) {
    console.error('Error fetching birth card data:', error);
    $q.notify({
      color: 'negative',
      message: 'ไม่สามารถโหลดข้อมูลได้',
      icon: 'report_problem',
    });
  } finally {
    // ปิด Loading เสมอไม่ว่าจะสำเร็จหรือล้มเหลว
    $q.loading.hide();
  }
};
onMounted(() => {
  void fetchFestival();
});
</script>
<style lang="scss" scoped>
/* --- CSS สำหรับรูปภาพ Banner --- */
// .banner-image {
//   /* 1. Responsive Width: ในจอเล็กจะเต็มจอ, ในจอใหญ่จะหดกลับมา */
//   width: 100%; /* ในมือถือ/แท็บเล็ต รูปจะกว้าง 90% ของหน้าจอ (เพื่อไม่ให้ชนขอบเกินไป) */
//   max-width: 1650px; /* **สำคัญ** จำกัดความกว้างสูงสุดไว้ที่ 1590px ตามความต้องการเดิมของคุณ */

//   /* 2. Responsive Height: ปรับความสูงตามความกว้างหน้าจอ */
//   height: 60vh; /* ในจอเล็ก ความสูงเป็น 40% ของความสูงหน้าจอ (Viewport Height) */
//   min-height: 250px; /* ไม่ให้เตี้ยเกินไปในมือถือแนวตั้ง */
//   max-height: 400px; /* **สำคัญ** จำกัดความสูงสูงสุดไว้ที่ 400px ในจอคอมพิวเตอร์ใหญ่ */

//   margin: 0 auto; /* จัดกึ่งกลาง (Fallback เผื่อ row flex-center ไม่ทำงาน) */
// }
/* --- CSS สำหรับรูปภาพ Banner แบบ Responsive --- */
// .banner-image {
//   width: 100%;
//   max-width: 1650px; /* จำกัดความกว้างสูงสุด */
//   margin: 0 auto;
//   display: block;

//   /* ใช้ Aspect Ratio เพื่อให้รูปคงสัดส่วนเดิมในทุกหน้าจอ */
//   /* เช่น ถ้ารูปต้นฉบับคือ 16:9 ให้ใช้ aspect-ratio: 16 / 9 */
//   aspect-ratio: 16 / 6;

//   /* ปรับความสูงสำหรับหน้าจอขนาดต่างๆ */
//   height: auto;
//   min-height: 200px; /* กันรูปแบนเกินไปในมือถือ */
//   max-height: 450px; /* กันรูปสูงเกินไปในจอ Desktop */

//   /* ตกแต่งเพิ่มเติม */
//   border-radius: 8px;
//   overflow: hidden;
// }

// .banner-image :deep(.q-img__image) {
//   object-position: 50% 50%; /* จัดกึ่งกลางรูป */
// }

// /* ปรับแต่งพิเศษสำหรับหน้าจอเล็ก (Mobile) */
// @media (max-width: $breakpoint-xs-max) {
//   .banner-image {
//     aspect-ratio: 4 / 3; /* ในมือถือให้รูปดู "สูงขึ้น" เล็กน้อยเพื่อให้เห็นรายละเอียด */
//     max-height: 300px;
//     border-radius: 0; /* มือถือมักจะให้รูปชิดขอบจอ */
//   }
// }

.banner-desktop,
.banner-mobile {
  width: 100%;
  max-width: 1650px;
  margin: 0 auto;
  display: block;
}

/* สำหรับหน้าจอใหญ่ (Desktop) */
.banner-desktop {
  height: 400px; /* หรือใช้ aspect-ratio: 16 / 5; */
}

/* สำหรับหน้าจอมือถือ (Mobile) */
.banner-mobile {
  height: 250px; /* ปรับให้เตี้ยลงเพื่อให้เหลือพื้นที่เนื้อหาด้านล่าง */
  border-radius: 0; /* มือถือมักนิยมรูปชิดขอบ */
}

/* เพิ่มเติม: จัดตำแหน่งรูปกรณีโดนตัด */
:deep(.q-img__image) {
  object-position: center center;
}
/* --- CSS สำหรับ Toolbar --- */
.wish-toolbar {
  background-color: #fff; /* หรือ color จาก palette เช่น $primary */
  border-top: 2px solid $primary; /* เพิ่มเส้นขอบบนให้ดูมีสไตล์ */
  padding: 10px 0;
}

.wish-title {
  /* ปรับขนาดตัวอักษรให้ Responsive ตามขนาดหน้าจอ */
  font-size: clamp(1.1rem, 4vw, 1.5rem); /* min, preferred, max */
  text-align: center;
  padding: 0 10px;

  /* ในจอมือถือเล็กๆ ข้อความอาจจะยาวเกิน ให้ขึ้นบรรทัดใหม่ */
  white-space: normal;
  line-height: 1.2;
}

// ปรับปรุง Divider ให้สวยงาม
.q-separator {
  background-color: rgba(0, 0, 0, 0.12);
}

// .footer-bg {
//   background: linear-gradient(135deg, #0a7dbb, #0d5f8f);
// }

// .footer-link {
//   color: white;
//   text-decoration: none;
//   margin: 4px 0;
//   opacity: 0.9;
//   transition: 0.2s;
// }

// .footer-link:hover {
//   opacity: 1;
//   text-decoration: underline;
// }
.footer-bg {
  /* ไล่สีจากซ้ายไปขวา (น้ำเงินเข้ม -> น้ำเงินสว่าง) */
  background: linear-gradient(135deg, #1976d2 0%, #1976d2 100%);

  /* หรือถ้าอยากใช้สีจาก Variable ของ Quasar ร่วมด้วย */
  // background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%);

  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white; /* บังคับตัวอักษรเป็นสีขาว */
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.85;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    padding-left: 5px; /* เพิ่มลูกเล่นนิดหน่อยเวลา Hover */
  }
}

.opacity-80 {
  opacity: 0.8;
}

.opacity-70 {
  opacity: 0.7;
}

.opacity-20 {
  opacity: 0.2;
}

/* ปรับระยะห่างในจอเล็ก */
@media (max-width: $breakpoint-xs-max) {
  .footer-bg {
    text-align: center;

    .flex {
      justify-content: center;
    }
  }
}

.wish-link {
  color: black;
}

.wish-link.wish-active {
  color: #1976d2; /* น้ำเงิน Quasar */
  font-weight: bold;
}
</style>
