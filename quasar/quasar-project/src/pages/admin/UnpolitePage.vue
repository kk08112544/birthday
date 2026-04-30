<template>
  <q-page class="q-pa-none bg-grey-1">
    <!-- <div class="row justify-center q-mb-md text-h5 text-weight-bold">รายการคำไม่พึงประสงค์</div> -->
    <div
      class="col-12 col-sm-6 text-h5 text-weight-bold text-center text-sm-left q-mb-sm-none q-mb-md"
    >
      รายการคำไม่พึงประสงค์
    </div>
    <div class="q-pa-md">
      <div class="row justify-end q-mb-md">
        <q-btn color="primary" icon="add" label="เพิ่มคำใหม่" @click="onAdd" />
      </div>
      <q-table
      style="max-width: 1000px; margin: 0 auto;"
      dense
        flat
        bordered
        ref="tableRef"
        title="รายการคำไม่พึงประสงค์"
        :rows="rows"
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
            </div>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="addDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section class="row items-center">
            <div class="text-h6">เพิ่มคำไม่พึงประสงค์</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-form @submit="submitAdd">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="addForm.word"
                label="คำไม่สุภาพ"
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
            <div class="text-h6">แก้ไขคำไม่พึงประสงค์</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-form @submit="submitEdit">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="editForm.word"
                label="คำไม่สุภาพ"
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
            คุณต้องการลบคำว่า <b class="text-negative">"{{ itemToDelete?.word }}"</b> ใช่หรือไม่?
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
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import type { QTableProps } from 'quasar'; // นำเข้า Type จาก Quasar
import type { QTableColumn } from 'quasar';
import type { AxiosError } from 'axios';

const $q = useQuasar();
// const router = useRouter();
interface UnpoliteItem {
  upId: number | string;
  word: string;
}

interface TableRow {
  upId: number | string;
  word: string;
  actions: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

// ================= STATE =================
const rows = ref<TableRow[]>([]); // ระบุ Type แทน any

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
    name: 'word',
    label: 'คำไม่สุภาพ',
    field: 'word',
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

const fetchUnpolite = async (): Promise<void> => {
  loading.value = true;
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await api.get('/admin/unpolite', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage, // ค่านี้คือ 5 ตามในรูป
        search: search.value,
      },
    });

    const res = response.data;
    const list: UnpoliteItem[] = res.unpolite?.data ?? [];

    // --- ส่วนที่แก้ไข: คำนวณลำดับให้ต่อเนื่อง ---
    // สูตร: (หน้าปัจจุบัน - 1) * จำนวนต่อหน้า
    // const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;

    rows.value = list.map((item: UnpoliteItem, index: number) => {
      const startIndex = (pagination.value.page - 1) * pagination.value.rowsPerPage;
      return {
        displayIndex: startIndex + index + 1,
        upId: item.upId,
        word: item.word || '-',
        // --- เพิ่มส่วนนี้เข้าไป ---
        actions: {
          create: false,
          view: true,
          update: true,
          delete: true,
        },
      };
    });
    // ---------------------------------------

    pagination.value.rowsNumber = res.unpolite?.total ?? 0;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

// const showDialog = ref(false);
// const selectedUnpolite = ref<TableRow | null>(null);

// ================= DIALOG STATE =================
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

const addForm = ref({
  word: '',
});

// Form สำหรับ Edit
const editForm = ref({
  upId: '' as string | number,
  word: '',
});

// เก็บข้อมูลที่จะลบชั่วคราว
const itemToDelete = ref<TableRow | null>(null);

const onAdd = () => {
  // สำคัญ: ต้องมี .value ก่อนเข้าถึง property ข้างใน
  addForm.value.word = '';
  addDialog.value = true;
};

const submitAdd = async () => {
  isSubmitting.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.post(
      `/admin/unpolite`,
      { word: addForm.value.word },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    $q.notify({ color: 'positive', message: response.data.message, icon: 'check' });
    addDialog.value = false;
    void fetchUnpolite(); // โหลดข้อมูลใหม่
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
const onEdit = (row: TableRow) => {
  editForm.value = {
    upId: row.upId,
    word: row.word,
  };
  editDialog.value = true;
};

const submitEdit = async () => {
  isSubmitting.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.patch(
      `/admin/unpolite/${editForm.value.upId}`,
      { word: editForm.value.word },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    $q.notify({ color: 'positive', message: response.data.message, icon: 'check' });
    editDialog.value = false;
    void fetchUnpolite(); // โหลดข้อมูลใหม่
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
const onDelete = (row: TableRow) => {
  itemToDelete.value = row;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return;

  isSubmitting.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.delete(`/admin/unpolite/${itemToDelete.value.upId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    $q.notify({ color: 'positive', message: response.data.message, icon: 'delete' });
    // $q.notify({ color: 'positive', message: 'ลบข้อมูลสำเร็จ', icon: 'delete' });
    deleteDialog.value = false;
    void fetchUnpolite();
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

  void fetchUnpolite();
};

const onSearch = () => {
  pagination.value.page = 1;
  void fetchUnpolite(); // ✅ ใช้ void
};

// ================= INIT =================
onMounted(() => {
  void fetchUnpolite(); // ✅ ใช้ void
});
</script>
