<template>
  <q-page class="q-pa-none bg-grey-1"> <div class="row flex-center q-pt-md"> 
    <q-img
       :src="image"
        class="banner-image shadow-2 rounded-borders" 
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
          ร่วมส่งคำอวยพร
        </q-toolbar-title>
        
        <q-separator vertical dark class="gt-sm" />

        <q-toolbar-title class="wish-title text-weight-regular text-subtitle1">
          ผู้ร่วมส่งคำอวยพร
        </q-toolbar-title>
      </div>
    </q-toolbar>

    <div class="q-pa-md text-center text-grey-7">
      (พื้นที่สำหรับแสดงฟอร์มส่งคำอวยพร หรือ รายชื่อผู้ร่วมอวยพร)
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

// --- State ---
const image = ref('');
const birthData = ref(null); // เปลี่ยนชื่อให้สื่อความหมาย และค่าเริ่มต้นเป็น null

const $q = useQuasar();

// ตัวอย่างการใช้ Screen Plugin ของ Quasar (หากต้องการสลับ Logic บางอย่าง)
if ($q.screen.lt.md) {
  // console.log('โหมดมือถือ/แท็บเล็ต');
}

// --- Functions ---

// ฟังก์ชันดึง Blob URL จาก Backend
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

// ฟังก์ชันดึงข้อมูลเทศกาล
const fetchBirthCard = async () => {
  // คววรแสดง Loading State ทั่วไปของ Quasar ขณะโหลด
  
  try {
    const response = await api.get('/festival/all');
    
    // ตรวจสอบข้อมูลก่อนใช้งาน
    if (response.data?.festival && response.data.festival.length > 0) {
      const data = response.data.festival[0];
      birthData.value = data;
      image.value = response.data.festival[0]?.image;
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
      icon: 'report_problem'
    });
  } finally {
    // ปิด Loading เสมอไม่ว่าจะสำเร็จหรือล้มเหลว
    $q.loading.hide();
  }
};

// --- Lifecycle ---
onMounted(() => {
  void fetchBirthCard();
});
</script>

<style lang="scss" scoped>
/* --- CSS สำหรับรูปภาพ Banner --- */
.banner-image {
  /* 1. Responsive Width: ในจอเล็กจะเต็มจอ, ในจอใหญ่จะหดกลับมา */
  width: 100%;          /* ในมือถือ/แท็บเล็ต รูปจะกว้าง 90% ของหน้าจอ (เพื่อไม่ให้ชนขอบเกินไป) */
  max-width: 1590px;   /* **สำคัญ** จำกัดความกว้างสูงสุดไว้ที่ 1590px ตามความต้องการเดิมของคุณ */
  
  /* 2. Responsive Height: ปรับความสูงตามความกว้างหน้าจอ */
  height: 40vh;        /* ในจอเล็ก ความสูงเป็น 40% ของความสูงหน้าจอ (Viewport Height) */
  min-height: 250px;   /* ไม่ให้เตี้ยเกินไปในมือถือแนวตั้ง */
  max-height: 400px;   /* **สำคัญ** จำกัดความสูงสูงสุดไว้ที่ 400px ในจอคอมพิวเตอร์ใหญ่ */

  margin: 0 auto;       /* จัดกึ่งกลาง (Fallback เผื่อ row flex-center ไม่ทำงาน) */
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
  background-color: rgba(0,0,0,0.12);
}
</style>