<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title> {{ festivalName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-img :src="image" class="banner-image shadow-2 rounded-borders" fit="cover">
      <template v-slot:loading>
        <q-spinner-gears color="primary" size="3rem" />
      </template>
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          ไม่สามารถโหลดรูปภาพได้
        </div>
      </template>
    </q-img>
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
            active-class="wish-active"
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
            active-class="wish-active"
          >
            รายชื่อผู้ร่วมอวยพร
          </q-item>
        </q-toolbar-title>
      </div>
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- ✅ ใส่ footer ตรงนี้ -->
    <q-footer elevated>
      <q-toolbar class="primary">
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const image = ref('');
const festivalId = ref();
const birthData = ref(null); // เปลี่ยนชื่อให้สื่อความหมาย และค่าเริ่มต้นเป็น null
const festivalName = ref('');

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
.banner-image {
  /* 1. Responsive Width: ในจอเล็กจะเต็มจอ, ในจอใหญ่จะหดกลับมา */
  width: 100%; /* ในมือถือ/แท็บเล็ต รูปจะกว้าง 90% ของหน้าจอ (เพื่อไม่ให้ชนขอบเกินไป) */
  max-width: 1650px; /* **สำคัญ** จำกัดความกว้างสูงสุดไว้ที่ 1590px ตามความต้องการเดิมของคุณ */

  /* 2. Responsive Height: ปรับความสูงตามความกว้างหน้าจอ */
  height: 60vh; /* ในจอเล็ก ความสูงเป็น 40% ของความสูงหน้าจอ (Viewport Height) */
  min-height: 250px; /* ไม่ให้เตี้ยเกินไปในมือถือแนวตั้ง */
  max-height: 400px; /* **สำคัญ** จำกัดความสูงสูงสุดไว้ที่ 400px ในจอคอมพิวเตอร์ใหญ่ */

  margin: 0 auto; /* จัดกึ่งกลาง (Fallback เผื่อ row flex-center ไม่ทำงาน) */
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

.footer-bg {
  background: linear-gradient(135deg, #0a7dbb, #0d5f8f);
}

.footer-link {
  color: white;
  text-decoration: none;
  margin: 4px 0;
  opacity: 0.9;
  transition: 0.2s;
}

.footer-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.wish-link {
  color: black;
}

.wish-link.wish-active {
  color: #1976d2; /* น้ำเงิน Quasar */
  font-weight: bold;
}
</style>
