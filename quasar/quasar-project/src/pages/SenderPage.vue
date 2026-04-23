<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <!-- <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md"> -->
      <q-form class="q-gutter-md">
        <div v-if="image.length > 0" class="shadow-2 rounded-borders overflow-hidden">
          <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="white"
            navigation
            padding
            arrows
            height="250px"
            class="bg-grey-9 text-white"
          >
            <q-carousel-slide
              v-for="(imgUrl, index) in image"
              :key="index"
              :name="index"
              :img-src="imgUrl"
            />
          </q-carousel>
        </div>

        <q-skeleton v-else height="250px" square />
        <q-select
          filled
          v-model="selectedWisher"
          use-input
          input-debounce="0"
          label="เลือกคำอวยพร"
          :options="options"
          @filter="filterFn"
          style="width: 100%; padding-bottom: 32px"
          emit-value
          map-options
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> ไม่พบข้อมูล </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          filled
          type="text"
          v-model="name"
          label="ชื่อ-นามสกุล"
          hint="ชื่อ-นามสกุล"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'ชื่อ-นามสกุล ต้องระบุ']"
        />
        <q-input
          filled
          type="text"
          v-model="position"
          label="ตำแหน่ง"
          hint="ตำแหน่ง"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'ตำแหน่ง ต้องระบุ']"
        />

        <q-input
          filled
          type="text"
          v-model="department"
          label="กอง/สำนัก/ศูนย์"
          hint="กอง/สำนัก/ศูนย์ บุคคลภายนอกโปรดระบุว่าเป็นบุคคลภายนอก"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'กอง/สำนัก/ศูนย์ ต้องระบุ บุคคลภายนอกโปรดระบุว่าเป็นบุคคลภายนอก',
          ]"
        />

        <div>
          <q-btn label="บันทึกผู้ส่ง" type="submit" color="primary" />
          <q-btn label="ล้างข้อมูลผู้ส่ง" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

// --- State ---

const wisherData = ref<{ label: string; value: number }[]>([]);
const selectedWisher = ref(null); // ค่าที่เลือก
const name = ref(null);
const position = ref(null);
const department = ref(null);
const image = ref<string[]>([]);
const slide = ref(0); // เก็บตำแหน่งสไลด์ปัจจุบัน
const $q = useQuasar();

// ตัวอย่างการใช้ Screen Plugin ของ Quasar (หากต้องการสลับ Logic บางอย่าง)
if ($q.screen.lt.md) {
  // console.log('โหมดมือถือ/แท็บเล็ต');
}
interface FestivalCard {
  imageCard: string;
  // เพิ่ม field อื่นๆ ถ้ามี เช่น cId: number;
}
// --- Functions ---
type Wisher = {
  wId: number;
  wishWord: string;
};
type FilterUpdateFn = (callback: () => void) => void;

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
const options = ref<{ label: string; value: number }[]>([]); // ตัวแปรสำหรับแสดงใน List (ตอน filter)
const filterFn = (val: string, update: FilterUpdateFn) => {
  if (val === '') {
    update(() => {
      options.value = wisherData.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = wisherData.value.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
  });
};
// ฟังก์ชันดึงข้อมูลเทศกาล
const fetchBirthCard = async () => {
  // คววรแสดง Loading State ทั่วไปของ Quasar ขณะโหลด

  try {
    const response = await api.get('/festival/all');

    if (response.data?.festival && response.data.festival.length > 0) {
      const wisherList = response.data.festival[0]?.wisher as Wisher[];

      wisherData.value = wisherList.map((item) => ({
        label: item.wishWord,
        value: item.wId,
      }));

      // image.value = response.data.festival[0]?.card[0]?.imageCard;

      // if (image.value) {
      //   image.value = await getImageUrl(image.value);
      // } else {
      //   image.value = '';
      // }
      // const card = response.data.festival[0]?.card || [];
      // const card = response.data.festival[0]?.card || [];

      // เป็น (ระบุ Type ตรงนี้):
      const cardList: FestivalCard[] = response.data.festival[0]?.card || [];
      // image.value = await Promise.all(
      //   card.map(async (c: any) => {
      //     if (!c.imageCard) return '';
      //     return await getImageUrl(c.imageCard);
      //   })
      // );
      // แก้ไขให้เป็นแบบนี้:
      image.value = await Promise.all(
        cardList.map(async (c: FestivalCard) => {
          // เปลี่ยนจาก any เป็น FestivalCard
          if (!c.imageCard) return '';
          return await getImageUrl(c.imageCard);
        }),
      );
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

// --- Lifecycle ---
onMounted(() => {
  void fetchBirthCard();
});
</script>
