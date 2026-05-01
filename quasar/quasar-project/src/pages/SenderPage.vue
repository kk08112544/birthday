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
                  @click="myTable?.prevPage()"
                />
              </div>
              <!-- @click="$refs.myTable.prevPage()" -->
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
                  @click="myTable?.nextPage()"
                />
                <!-- @click="$refs.myTable.nextPage()" -->
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center q-pa-md">
          <div class="col-12 col-sm-8 col-md-6" style="max-width: 600px">
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
            <br />
            <div>
              <q-btn label="บันทึกผู้ส่ง" type="submit" color="primary" />
              <q-btn label="ล้างข้อมูลผู้ส่ง" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'; // เพิ่ม watch
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import type { QTable } from 'quasar';
import type { AxiosError } from 'axios';

// --- 1. รับ ID จาก Props ---
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const $q = useQuasar();
const myTable = ref<InstanceType<typeof QTable> | null>(null);
const wisherData = ref<{ label: string; value: number }[]>([]);
const selectedWisher = ref(null);
const name = ref(null);
const position = ref(null);
const department = ref(null);

interface CardRow {
  cId: number;
  url: string;
}

const selectedCardId = ref<number | null>(null);
const selectedImage = ref<string | null>(null);
const rows = ref<CardRow[]>([]);
const columns = [{ name: 'image', label: 'รูปภาพ', field: 'url' }];

const pagination = ref({
  page: 1,
  rowsPerPage: 4,
});

// interface FestivalCard {
//   cId: number;
//   imageCard: string;
// }

// type Wisher = {
//   wId: number;
//   wishWord: string;
// };
type Wisher = {
  wId: number;
  wishWord: string;
};

type FestivalCard = {
  cId: number;
  imageCard: string;
};

type FestivalResponse = {
  fId: number;
  wisher: Wisher[];
  card: FestivalCard[];
};
// --- Functions ---

const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api(`/upload/${imagePath}`, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

const options = ref<{ label: string; value: number }[]>([]);
const filterFn = (val: string, update: (callback: () => void) => void) => {
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

const fetchBirthCard = async (targetId: string): Promise<void> => {
  $q.loading.show();
  try {
    const response = await api.get<{ festival: FestivalResponse }>(`/festival/${Number(targetId)}`);

    const currentFestival = response.data?.festival;

    if (currentFestival && currentFestival.fId) {
      // ✅ ใช้ type จริงแทน any
      const wisherList: Wisher[] = currentFestival.wisher || [];
      wisherData.value = wisherList.map((item) => ({
        label: item.wishWord,
        value: item.wId,
      }));

      const cardList: FestivalCard[] = currentFestival.card || [];

      const validCards = await Promise.all(
        cardList.map(async (c) => {
          if (!c.imageCard) return null;
          const url = await getImageUrl(c.imageCard);
          return { cId: c.cId, url };
        }),
      );

      // 👇 กัน null แบบ type-safe
      rows.value = validCards.filter((card): card is CardRow => card !== null);

      if (rows.value.length > 0) {
        const first = rows.value[0];
        selectedCardId.value = first.cId;
        selectedImage.value = first.url;
      }
    } else {
      console.warn('ไม่พบข้อมูลเทศกาลในระบบ');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    $q.notify({ color: 'negative', message: 'ไม่สามารถโหลดข้อมูลได้' });
  } finally {
    $q.loading.hide();
  }
};

const resetForm = () => {
  name.value = null;
  position.value = null;
  department.value = null;
  selectedWisher.value = null;

  if (rows.value.length > 0) {
    selectedCardId.value = rows.value[0]?.cId || null;
    selectedImage.value = rows.value[0]?.url || null;
  }
};

const postSender = async () => {
  const senderData = {
    fullname: name.value,
    position: position.value,
    department: department.value,
    wishId: selectedWisher.value,
    cardId: selectedCardId.value,
    festivalId: Number(props.id), // ใช้ ID จาก props แทน localStorage
  };

  try {
    const response = await api.post('/sender', senderData);
    if (response.status === 201) {
      $q.notify({ color: 'positive', message: response.data.message });
      resetForm();
      // ไม่แนะนำให้ใช้ reload() ถ้าเป็นไปได้ ให้ใช้การอัปเดต state แทน
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    $q.notify({
      color: 'negative',
      message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึก',
    });
  }
};

// // --- 2. Watch ID แทน onMounted ---
// watch(() => props.id, (newId) => {
//   if (newId) {
//     fetchBirthCard(newId);
//   }
// }, { immediate: true });
watch(
  () => props.id,
  (newId) => {
    if (newId) {
      void fetchBirthCard(newId);
    }
  },
  { immediate: true },
);
</script>
<style scoped>
.transition-generic {
  transition: all 0.3s ease-in-out;
}
</style>
