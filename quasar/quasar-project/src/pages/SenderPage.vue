<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 2000px">
      <q-form class="q-gutter-md" @submit="postSender" @reset="resetForm">
        <div v-if="selectedImage" class="row justify-center q-mb-lg">
          <q-card flat bordered class="col-xs-12 col-sm-6 col-md-4">
            <q-item>
              <q-item-section>
                <div class="text-subtitle1 text-center text-primary text-weight-bold">
                  รูปภาพที่เลือก
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-img :src="selectedImage" :ratio="1" class="rounded-borders" />
          </q-card>
        </div>
        <div class="row justify-center">
          <div style="width: 100%; max-width: 900px">
            <div class="row items-center justify-center q-gutter-sm">
              <div class="col-auto">
                <q-btn
                  flat
                  round
                  dense
                  icon="chevron_left"
                  size="2em"
                  color="primary"
                  :disable="pagination.page === 1"
                  @click="$refs.myTable.prevPage()"
                />
              </div>

              <div class="col">
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
                    <div class="q-pa-xs col-xs-6 col-sm-4 col-md-3">
                      <!-- <q-card
                        flat
                        bordered
                        class="cursor-pointer transition-generic"
                        :class="selectedImage === props.row.url ? 'bg-blue-1 shadow-4' : ''"
                        @click="selectedImage = props.row.url"
                        style="border-radius: 8px"
                      > -->
                      <q-card
                        flat
                        bordered
                        class="cursor-pointer transition-generic"
                        :class="selectedCardId === props.row.cId ? 'bg-blue-1 shadow-4' : ''"
                        @click="
                          selectedCardId = props.row.cId;
                          selectedImage = props.row.url;
                        "
                        style="border-radius: 8px"
                      >
                        <q-img :src="props.row.url" :ratio="1" class="rounded-borders" />
                        <q-inner-loading
                          :showing="selectedImage === props.row.url"
                          style="border-radius: 8px"
                        >
                          <q-icon name="check_circle" color="primary" size="40px" />
                        </q-inner-loading>
                      </q-card>
                    </div>
                  </template>
                </q-table>
              </div>

              <div class="col-auto">
                <q-btn
                  flat
                  round
                  dense
                  icon="chevron_right"
                  size="2em"
                  color="primary"
                  :disable="pagination.page >= Math.ceil(rows.length / pagination.rowsPerPage)"
                  @click="$refs.myTable.nextPage()"
                />
              </div>
            </div>
          </div>
        </div>

        <q-select
          filled
          v-model="selectedWisher"
          label="เลือกคำอวยพร"
          :options="options"
          @filter="filterFn"
          style="width: 100%; padding-bottom: 32px"
          emit-value
          map-options
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || 'กรุณาเลือกคำอวยพร']"
        >
          <!-- <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> ไม่พบข้อมูล </q-item-section>
            </q-item>
          </template> -->
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

const $q = useQuasar();
const selectedCardId = ref<number | null>(null); // เพิ่มตัวแปรสำหรับเก็บ ID โดยเฉพาะ
const selectedImage = ref<string | null>(null);

const columns = [{ name: 'image', label: 'รูปภาพ', field: 'url' }];
const rows = ref<{ url: string }[]>([]);
const festivalId = Number(localStorage.getItem('festivalId'));
// ตัวอย่างการใช้ Screen Plugin ของ Quasar (หากต้องการสลับ Logic บางอย่าง)
if ($q.screen.lt.md) {
  // console.log('โหมดมือถือ/แท็บเล็ต');
}

const pagination = ref({
  page: 1,
  rowsPerPage: 3, // ปรับจำนวนรูปที่ต้องการแสดงต่อหนึ่งหน้าให้เหมาะสม
});

interface FestivalCard {
  cId: number;
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
    // สมมติว่า api คือ axios instance ที่ตั้งค่าไว้แล้ว
    const response = await api(`/file/${imagePath}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    // คืนค่า Placeholder Image ในกรณีผิดพลาด หรือ คืนค่าว่าง
    return ''; // คืนค่า placeholder เมื่อโหลดรูปไม่ได้
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
  $q.loading.show({
    message: 'กำลังโหลดข้อมูล...',
  });

  try {
    const response = await api.get('/festival/all');

    if (response.data?.festival && response.data.festival.length > 0) {
      const currentFestival = response.data.festival[0];
      const wisherList = currentFestival?.wisher as Wisher[];

      wisherData.value = wisherList.map((item) => ({
        label: item.wishWord,
        value: item.wId,
      }));

      const cardList: FestivalCard[] = currentFestival?.card || [];

      // const imageUrls = await Promise.all(
      //   cardList.map(async (c: FestivalCard) => {
      //     if (!c.imageCard) return '';
      //     return await getImageUrl(c.imageCard);
      //   }),
      // );

      // // นำมาสร้างเป็น Rows สำหรับ Table
      // rows.value = imageUrls.filter((url) => url !== '').map((url) => ({ url })); // สร้าง Object { url: 'blob:...' }

      // // เลือกรูปแรกเป็นค่าเริ่มต้นถ้ามีข้อมูล
      // if (rows.value.length > 0) {
      //   selectedImage.value = rows.value[0].url;
      // }
      // ปรับปรุงการสร้าง rows ให้มี cId ติดไปด้วย
      const validCards = await Promise.all(
        cardList.map(async (c: FestivalCard) => {
          if (!c.imageCard) return null;
          const url = await getImageUrl(c.imageCard);
          return { cId: c.cId, url: url }; // คืนค่าเป็น object ที่มีทั้ง ID และ URL
        }),
      );

      // กรองตัวที่เป็น null ออก
      rows.value = validCards.filter((card) => card !== null) as CardRow[];

      // ตั้งค่าเริ่มต้น (ถ้ามีข้อมูล)
      if (rows.value.length > 0) {
        selectedCardId.value = rows.value[0].cId;
        selectedImage.value = rows.value[0].url;
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

// ฟังก์ชันสำหรับล้างค่าใน Form
const resetForm = () => {
  name.value = null;
  position.value = null;
  department.value = null;
  selectedWisher.value = null;

  // รีเซ็ตการเลือกการ์ด (ถ้าต้องการให้กลับไปเลือกใบแรก)
  if (rows.value.length > 0) {
    selectedCardId.value = rows.value[0].cId;
    selectedImage.value = rows.value[0].url;
  } else {
    selectedCardId.value = null;
    selectedImage.value = null;
  }

  // หากมีการใช้ Quasar Form Validation แนะนำให้เรียก resetValidation ด้วย (ถ้าจำเป็น)
};
const postSender = async () => {
  const senderData = {
    fullname: name.value,
    position: position.value,
    department: department.value,
    wishId: selectedWisher.value,
    cardId: selectedCardId.value,
    festivalId: festivalId,
  };
  console.log('Sender Data :', senderData);
  try {
    const response = await api.post('/sender', senderData);
    if (response.status === 201) {
      $q.notify({
        color: 'positive',
        message: response.data.message,
        icon: 'check_circle',
      });
      resetForm();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    // if (response.status === 400) {
    //   $q.notify({
    //     color: 'negative',
    //     message: response.data[0].message,
    //     icon: 'error',
    //   });
    // }
  } catch (err: unknown) {
    // เปลี่ยนจาก any เป็น unknown
    const error = err as AxiosError<{ message: string }>; // Casting ประเภทข้อมูล
    const errorResponse = error.response;

    if (errorResponse && errorResponse.status === 400) {
      $q.notify({
        color: 'negative',
        message: errorResponse.data?.message || 'พบคำไม่สุภาพหรือข้อมูลไม่ถูกต้อง',
        icon: 'error',
      });
    } else {
      $q.notify({
        color: 'negative',
        message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
        icon: 'error',
      });
    }
    console.error('Post Sender Error:', error);
  }
};
// const postSender = async () => {
//   const senderData = {
//     fullname: name.value,
//     position: position.value,
//     department: department.value,
//     wId: selectedWisher.value,
//     image: selectedImage.value, // สมมติว่า backend รองรับการรับ URL ของ
//   };
//   try {
//     const response = await api.post('/sender', senderData);
//     if (response.status === 201) {
//       $q.notify({
//         color: 'positive',
//         message: response.data.message,
//         icon: 'check_circle',
//       });
//     }
//   } catch (error) {}
// };
// --- Lifecycle ---
onMounted(() => {
  void fetchBirthCard();
});
</script>

<style scoped>
.transition-generic {
  transition: all 0.3s ease-in-out;
}
</style>
