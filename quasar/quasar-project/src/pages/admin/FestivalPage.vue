<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- ส่วนบน: Banner Festival -->
    <div class="row q-col-gutter-md justify-center q-mb-xl">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card class="my-card shadow-2 overflow-hidden">
          <!-- ปรับ height เป็น auto และใช้ aspect-ratio เพื่อให้รูปไม่เบี้ยวบนมือถือ -->
          <q-img :src="image" class="responsive-banner">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                ไม่มีรูปภาพประกอบ
              </div>
            </template>

            <div class="absolute-bottom text-h6 text-white text-center shadow-text">
              {{ festivalName || 'กำลังโหลดข้อมูล...' }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <!-- ส่วนล่าง: ตารางจัดการคำ -->
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="row items-center q-mb-md">
          <div
            class="col-12 col-sm-6 text-h5 text-weight-bold text-center text-sm-left q-mb-sm-none q-mb-md"
          >
            รายการคำอวยพร
          </div>
        </div>
        <!-- <div class="col-12 col-sm-6 text-right">
            <q-btn 
              color="primary" 
              icon="add" 
              label="เพิ่มคำใหม่" 
              class="full-width-xs"
            />
          </div> -->
        <div class="row justify-end q-mb-md">
          <q-btn color="primary" icon="add" label="เพิ่มคำใหม่" @click="onAdd" />
        </div>
        <!-- <q-table
          flat
          bordered
          ref="tableRef"
          :rows="wishes"
          :columns="columns"
          row-key="id"
          v-model:pagination="pagination"
          :loading="loading"
          :filter="search"
          binary-state-sort
          @request="onRequest"
        
          :grid="$q.screen.lt.sm"
          class="my-sticky-header-table shadow-1"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="search"
              placeholder="ค้นหา..."
              @update:model-value="onSearch"
              class="bg-grey-2 q-px-sm rounded-borders full-width-xs"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="q-gutter-xs">
                <q-btn flat round dense color="orange" icon="edit" />
                <q-btn flat round dense color="negative" icon="delete" />
              </div>
            </q-td>
          </template>

        
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12">
              <q-card flat bordered class="q-pa-sm">
                <q-card-section class="row items-center">
                  <div class="col">
                    <div class="text-caption text-grey">ลำดับ {{ props.row.displayIndex }}</div>
                    <div class="text-subtitle1 text-weight-bold">{{ props.row.wishWord }}</div>
                  </div>
                  <div class="col-auto">
                    <q-btn flat round dense color="orange" icon="edit" class="q-mr-sm" />
                    <q-btn flat round dense color="negative" icon="delete" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table> -->
        <q-table
          flat
          bordered
          ref="tableRef"
          title="รายการคำอวยพร"
          :rows="wishes"
          :columns="columns"
          row-key="id"
          v-model:pagination="pagination"
          :loading="loading"
          :filter="search"
          binary-state-sort
          @request="onRequest"
        >
          <template v-slot:top-right>
            <!-- เปลี่ยน v-model จาก filter เป็น search -->
            <q-input
              borderless
              dense
              debounce="300"
              v-model="search"
              placeholder="Search"
              @update:model-value="onSearch"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <!-- ปุ่ม Update -->
                <q-btn
                  v-if="props.row.actions.update"
                  flat
                  round
                  dense
                  color="orange"
                  icon="edit"
                  @click="onEdit(props.row)"
                />
                <!-- @click="onEdit(props.row)" -->
                <!-- ปุ่ม Delete -->
                <q-btn
                  v-if="props.row.actions.delete"
                  flat
                  round
                  dense
                  color="negative"
                  icon="delete"
                  @click="onDelete(props.row)"
                />
                <!-- @click="onDelete(props.row)" -->
              </div>
            </q-td>
          </template>
        </q-table>
        <q-dialog v-model="addDialog" persistent>
          <q-card style="min-width: 350px">
            <q-card-section class="row items-center">
              <div class="text-h6">เพิ่มคำอวยพร</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-form @submit="submitAdd">
              <q-card-section class="q-pt-none">
                <q-input
                  v-model="addForm.wishWord"
                  label="คำอวยพร"
                  outlined
                  dense
                  autofocus
                  :rules="[(val) => !!val || 'กรุณากรอกข้อมูล']"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="ยกเลิก" v-close-popup />
                <q-btn color="primary" label="บันทึก" type="submit" :loading="isSubmitting" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="editDialog" persistent>
          <q-card style="min-width: 350px">
            <q-card-section class="row items-center">
              <div class="text-h6">แก้ไขคำอวยพร</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-form @submit="submitEdit">
              <q-card-section class="q-pt-none">
                <q-input
                  v-model="editForm.wishWord"
                  label="คำอวยพร"
                  outlined
                  dense
                  autofocus
                  :rules="[(val) => !!val || 'กรุณากรอกข้อมูล']"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="ยกเลิก" v-close-popup />
                <q-btn color="primary" label="บันทึก" type="submit" :loading="isSubmitting" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="deleteDialog" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="delete" color="negative" text-color="white" />
              <span class="q-ml-sm text-h6">ยืนยันการลบข้อมูล</span>
            </q-card-section>

            <q-card-section class="q-pt-none">
              คุณต้องการลบคำว่า
              <b class="text-negative">"{{ itemToDelete?.wishWord }}"</b> ใช่หรือไม่?
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="ยกเลิก" color="primary" v-close-popup />
              <q-btn
                label="ยืนยันการลบ"
                color="negative"
                @click="confirmDelete"
                :loading="isSubmitting"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

import type { AxiosError } from 'axios';
import type { QTableProps } from 'quasar'; // นำเข้า Type จาก Quasar
import type { QTableColumn } from 'quasar';

const $q = useQuasar();

// --- Interfaces ---

interface WishItem {
  wId: number | string;
  wishWord: string;
}
interface TableFestivalRow {
  fId: number | string;
  festivalName: string;
  image: string;
}

// interface TableCardRow {
//   cId: number | string;
//   imageCard: string;
//   displayUrl?: string;
// }

interface TableWishRow {
  wId: number | string;
  wishWord: string;
  actions: {
    create: boolean;
    view: boolean;
    update: boolean;
    delete: boolean;
  };
}
// const cards = ref<TableCardRow[]>([]);
const wishes = ref<TableWishRow[]>([]);
const festivals = ref<TableFestivalRow[]>([]); // สำหรับเก็บรายการทั้งหมดถ้าต้องการ

// --- State ---
const fId = ref<number | string>(''); // ต้องประกาศไว้เพื่อรับค่า data.fId
const festivalName = ref(''); // ต้องประกาศไว้เพื่อรับค่า data.festivalName
const image = ref('');
const loading = ref(false);
const search = ref(''); // เปลี่ยนจาก null เป็น ''
const isSubmitting = ref(false);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0, // หรือใส่เป็น 0 ไว้ก่อน
  sortBy: '', // เพิ่มเพื่อให้ Type ตรงกัน
  descending: false,
});

const columns: QTableColumn[] = [
  {
    name: 'no',
    label: 'ลำดับ',
    field: 'displayIndex', // ใช้ค่าที่เราคำนวณ (startIndex + index + 1)
    align: 'left',
  },
  {
    name: 'wishWord',
    label: 'คำอวยพร',
    field: 'wishWord',
    align: 'center',
  },
  // เพิ่มคอลัมน์ Action ตรงนี้
  {
    name: 'actions',
    label: 'จัดการ',
    field: 'actions',
    align: 'right',
  },
];

// ฟังก์ชันแปลงชื่อไฟล์เป็น Blob URL
const getImageUrl = async (imagePath: string): Promise<string> => {
  if (!imagePath) return '';
  try {
    const response = await api(`/file/${imagePath}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

const fetchFestival = async () => {
  const accessToken = localStorage.getItem('accessToken');
  $q.loading.show({ message: 'กำลังโหลดข้อมูล...' });

  try {
    const response = await api.get('/admin/festival/all', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.data?.festival && response.data.festival.length > 0) {
      // 1. เลือกข้อมูลเทศกาลตัวแรกมาแสดงผลหลัก
      const data = response.data.festival[0];

      fId.value = data.fId;
      festivalName.value = data.festivalName;
      localStorage.setItem('festivalId', String(data.fId));

      // จัดการรูปภาพหลักของ Festival
      image.value = await getImageUrl(data.image);

      // 2. จัดการข้อมูล Cards (ใช้ Promise.all เพราะมี async ภายใน map)

      // (เพิ่มเติม) ถ้าต้องการเก็บรายชื่อ Festival ทั้งหมดลงใน state 'festivals'
      festivals.value = response.data.festival;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    $q.notify({
      color: 'negative',
      message: 'ไม่สามารถโหลดข้อมูลได้',
      icon: 'report_problem',
    });
  } finally {
    $q.loading.hide();
  }
};
const fetchWish = async (): Promise<void> => {
  loading.value = true;
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get('/admin/wisher', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        search: search.value,
      },
    });

    const res = response.data;
    // ดึง list จาก wisher.data
    const list: WishItem[] = res.wisher?.data ?? [];

    wishes.value = list.map((item: WishItem, index: number) => {
      const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;
      return {
        displayIndex: startIndex + index + 1,
        wId: item.wId,
        wishWord: item.wishWord || '-',
        actions: { create: false, view: true, update: true, delete: true },
      };
    });

    // แก้ไขตรงนี้: ให้เช็คว่า API ส่ง total มาที่ไหน
    // ตัวอย่าง: ถ้าส่งมาใน res.wisher.total
    pagination.value.rowsNumber = res.wisher?.total ?? 0;

    // หรือถ้าส่งมาที่ root ของ data
    // pagination.value.rowsNumber = res.total ?? 0;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    wishes.value = [];
    pagination.value.rowsNumber = 0; // ล้างค่าเมื่อ error
  } finally {
    loading.value = false;
  }
};
// const fetchWish = async (): Promise<void> => {
//   loading.value = true;
//   const accessToken = localStorage.getItem('accessToken');

//   try {
//     const response = await api.get('/admin/wisher', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//       params: {
//         page: pagination.value.page,
//         limit: pagination.value.rowsPerPage, // ค่านี้คือ 5 ตามในรูป
//         search: search.value,
//       },
//     });

//     const res = response.data;
//     const list: WishItem[] = res.wisher?.data ?? [];

//     // --- ส่วนที่แก้ไข: คำนวณลำดับให้ต่อเนื่อง ---
//     // สูตร: (หน้าปัจจุบัน - 1) * จำนวนต่อหน้า
//     // const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;

//     wishes.value = list.map((item: WishItem, index: number) => {
//       const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;
//       return {
//         displayIndex: startIndex + index + 1,
//         wId: item.wId,
//         wishWord: item.wishWord || '-',
//         // --- เพิ่มส่วนนี้เข้าไป ---
//         actions: {
//           create: false,
//           view: true,
//           update: true,
//           delete: true,
//         },
//       };
//     });
//     // ---------------------------------------

//     pagination.value.rowsNumber = res.wishes?.total ?? 0;
//   } catch (error) {
//     console.error('FETCH ERROR:', error);
//     wishes.value = [];
//   } finally {
//     loading.value = false;
//   }
// };

// ================= DIALOG STATE =================
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

const addForm = ref({
  wishWord: '',
});

// Form สำหรับ Edit
const editForm = ref({
  wId: '' as string | number,
  wishWord: '',
});

// เก็บข้อมูลที่จะลบชั่วคราว
const itemToDelete = ref<TableWishRow | null>(null);

const onAdd = () => {
  // สำคัญ: ต้องมี .value ก่อนเข้าถึง property ข้างใน
  addForm.value.wishWord = '';
  addDialog.value = true;
};

const submitAdd = async () => {
  isSubmitting.value = true;
  const accessToken = localStorage.getItem('accessToken');
  const festivalId = localStorage.getItem('festivalId');
  try {
    const response = await api.post(
      `/admin/wisher`,
      { wishWord: addForm.value.wishWord, festivalId: Number(festivalId) },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    $q.notify({ color: 'positive', message: response.data.message, icon: 'check' });
    addDialog.value = false;
    void fetchWish(); // โหลดข้อมูลใหม่
  } catch {
    $q.notify({
      color: 'negative',
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
      icon: 'error',
    });
  } finally {
    isSubmitting.value = false;
  }
};

// --- Edit Logic ---
const onEdit = (row: TableWishRow) => {
  editForm.value = {
    wId: row.wId,
    wishWord: row.wishWord,
  };
  editDialog.value = true;
};

const submitEdit = async () => {
  isSubmitting.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.patch(
      `/admin/wisher/${editForm.value.wId}`,
      { wishWord: editForm.value.wishWord },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    $q.notify({ color: 'positive', message: response.data.message, icon: 'check' });
    editDialog.value = false;
    void fetchWish(); // โหลดข้อมูลใหม่
  } catch (err: unknown) {
    // $q.notify({ color: 'negative', message: 'แก้ไขข้อมูลไม่สำเร็จ', icon: 'error' });
    const error = err as AxiosError<{ message: string }>; // Casting ประเภทข้อมูล
    const errorResponse = error.response;

    if (errorResponse && errorResponse.status === 404) {
      $q.notify({
        color: 'negative',
        message: errorResponse.data?.message,
        icon: 'error',
      });
    } else {
      $q.notify({
        color: 'negative',
        message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
        icon: 'error',
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};
// --- Delete Logic ---
const onDelete = (row: TableWishRow) => {
  itemToDelete.value = row;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return;

  isSubmitting.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.delete(`/admin/wisher/${itemToDelete.value.wId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    $q.notify({ color: 'positive', message: response.data.message, icon: 'delete' });
    // $q.notify({ color: 'positive', message: 'ลบข้อมูลสำเร็จ', icon: 'delete' });
    deleteDialog.value = false;
    void fetchWish();
  } catch (err: unknown) {
    // $q.notify({ color: 'negative', message: 'ลบข้อมูลไม่สำเร็จ', icon: 'error' });
    const error = err as AxiosError<{ message: string }>; // Casting ประเภทข้อมูล
    const errorResponse = error.response;

    if (errorResponse && errorResponse.status === 404) {
      $q.notify({
        color: 'negative',
        message: errorResponse.data?.message,
        icon: 'error',
      });
    } else {
      $q.notify({
        color: 'negative',
        message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
        icon: 'error',
      });
    }
  } finally {
    isSubmitting.value = false;
    itemToDelete.value = null;
  }
};
const onRequest: QTableProps['onRequest'] = (props) => {
  // ตรวจสอบว่าเป็นการเปลี่ยนหน้า หรือเป็นการค้นหาใหม่
  // ถ้า props.filter (ค่าที่พิมพ์) ไม่ตรงกับ search เดิม ให้กลับไปหน้า 1
  if (search.value !== props.filter) {
    pagination.value.page = 1;
  } else {
    pagination.value.page = props.pagination.page;
  }

  pagination.value.rowsPerPage = props.pagination.rowsPerPage;
  pagination.value.sortBy = props.pagination.sortBy;
  pagination.value.descending = props.pagination.descending;

  // อัปเดตค่า search หลัก
  search.value = props.filter;

  void fetchWish();
};

const onSearch = () => {
  pagination.value.page = 1;
  void fetchWish(); // ✅ ใช้ void
};

onMounted(() => {
  void fetchFestival();
  void fetchWish();
});
</script>
<style lang="scss" scoped>
.responsive-banner {
  height: 500px;

  // บนหน้าจอมือถือ ให้รูปเตี้ยลงเพื่อไม่ให้กินพื้นที่มากเกินไป
  @media (max-width: $breakpoint-xs-max) {
    height: 250px;
  }
}

.shadow-text {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

// ปรับให้ปุ่มและช่องค้นหาเต็มความกว้างเมื่ออยู่บนมือถือเล็กๆ
@media (max-width: $breakpoint-xs-max) {
  .full-width-xs {
    width: 100%;
  }
}

.my-sticky-header-table {
  /* ปรับแต่งความสูงตารางได้ตามต้องการ */
  background-color: white;
}
</style>
