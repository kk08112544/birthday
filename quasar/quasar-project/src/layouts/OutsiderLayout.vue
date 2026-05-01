<template>
  <q-layout view="lhh LpR lดf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{ festivalName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="row flex-center q-pt-md">
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
          <q-item
            clickable
            :to="`/${currentId}`"
            class="flex flex-center text-center wish-link"
            :class="{ 'wish-active': isHomeActive }"
          >
            ร่วมส่งคำอวยพร
          </q-item>
        </q-toolbar-title>

        <q-separator vertical dark class="gt-sm" />

        <q-toolbar-title class="wish-title text-weight-bold">
          <q-item
            clickable
            :to="`/${currentId}/list`"
            class="flex flex-center text-center wish-link"
            :class="{ 'wish-active': isListActive }"
          >
            รายชื่อผู้ร่วมอวยพร
          </q-item>
        </q-toolbar-title>
      </div>
    </q-toolbar>

    <q-page-container>
      <!-- ส่ง currentId เป็น props ไปยังหน้าลูก (ถ้าหน้าลูกต้องการ) -->
      <router-view :id="currentId" />
    </q-page-container>

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
              <router-link :to="`/${currentId}`" class="footer-link">ร่วมส่งคำอวยพร</router-link>
              <router-link :to="`/${currentId}/list`" class="footer-link"
                >รายชื่อผู้ร่วมอวยพร</router-link
              >
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
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const $q = useQuasar();

const image = ref('');
const festivalName = ref('');

// 1. ดึง ID จาก URL และให้ Default เป็น 1
const currentId = computed(() => (route.params.id as string) || '1');

// 2. Logic การเช็ค Active เมนู
// const isListActive = computed(() => route.path.startsWith('/list'));
// const isListActive = computed(() => route.path.startsWith(`${currentId}/list`));
// const isHomeActive = computed(() => !isListActive.value && !route.path.startsWith('/login'));
const isListActive = computed(() => route.path.startsWith(`/${currentId.value}/list`));

const isHomeActive = computed(() => route.path === `/${currentId.value}`);

const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

// 3. ฟังก์ชันดึงข้อมูลโดยใช้ ID
const fetchFestival = async (id: string) => {
  $q.loading.show();
  try {
    // console.log("ID" ,id);
    // ดึงข้อมูล festival ตาม id ที่ระบุ
    const response = await api.get(`/festival/${Number(id)}`);

    if (response.data) {
      const data = response.data.festival;
      festivalName.value = data.festivalName;
      console.log('FestivalName ', festivalName.value);
      image.value = data.image ? await getImageUrl(data.image) : '';

      // เก็บค่า ID ไว้ใช้ในส่วนอื่นๆ ของแอป
      localStorage.setItem('festivalId', id);
    }
  } catch (error) {
    console.error('Error fetching festival data:', error);
    $q.notify({
      color: 'negative',
      message: 'ไม่สามารถโหลดข้อมูลเทศกาลได้',
      icon: 'report_problem',
    });
  } finally {
    $q.loading.hide();
  }
};

// 4. Watch การเปลี่ยนแปลงของ currentId (เผื่อผู้ใช้เปลี่ยนเลข ID ใน URL)
watch(
  currentId,
  (newId) => {
    if (newId) {
      void fetchFestival(newId);
    }
  },
  { immediate: true },
); // immediate: true จะรันครั้งแรกทันทีเมื่อ component ถูกสร้าง (แทน onMounted)
</script>

<style lang="scss" scoped>
/* CSS เหมือนเดิมของคุณ */
.banner-desktop,
.banner-mobile {
  width: 100%;
  max-width: 1650px;
  margin: 0 auto;
  display: block;
}
.banner-desktop {
  height: 400px;
}
.banner-mobile {
  height: 250px;
  border-radius: 0;
}
:deep(.q-img__image) {
  object-position: center center;
}

.wish-toolbar {
  background-color: #fff;
  border-top: 2px solid $primary;
  padding: 10px 0;
}

.wish-title {
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  text-align: center;
}

.footer-bg {
  background: linear-gradient(135deg, #1976d2 0%, #1976d2 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
    padding-left: 5px;
  }
}

.wish-link {
  color: black;
  text-decoration: none;
}
.wish-active {
  color: #1976d2 !important;
  font-weight: bold;
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
</style>
