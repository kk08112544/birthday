<template>
  <q-page class="q-pa-none bg-grey-1">
    <div class="q-pa-md">
      <q-table
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
              <!-- ปุ่ม View -->
              <q-btn
                v-if="props.row.actions.view"
                flat
                round
                dense
                color="primary"
                icon="visibility"
                @click="onView(props.row)"
              />

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
    view: boolean;
    update: boolean;
    delete: boolean;
  };
}

// ================= STATE =================
const rows = ref<TableRow[]>([]); // ระบุ Type แทน any

const loading = ref(false);
const search = ref(''); // เปลี่ยนจาก null เป็น ''

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
    align: 'center',
  },
  {
    name: 'word',
    label: 'คำไม่สุภาพ',
    field: 'word',
    align: 'left',
  },
  // เพิ่มคอลัมน์ Action ตรงนี้
  {
    name: 'actions',
    label: 'จัดการ',
    field: 'actions',
    align: 'center',
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

const showDialog = ref(false);
const selectedUnpolite = ref<TableRow | null>(null);
const fetchUnpoliteById = async (id: number | string): Promise<void> => {
  loading.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.get(`/admin/unpolite/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = response.data.unpolite;

    // เก็บลง State
    selectedUnpolite.value = {
      upId: data.upId,
      word: data.word,
      actions: {
        create: false,
        view: true,
        update: true,
        delete: true,
      },
    };

    showDialog.value = true; // เปิดหน้าต่างโชว์ข้อมูล
  } catch (error) {
    console.error('Error fetching by ID:', error);
  } finally {
    loading.value = false;
  }
};

const deleteUnpoliteById = async (id: number | string): Promise<void> => {
  loading.value = true;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await api.delete(`/admin/unpolite/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = response.data.unpolite;

    // เก็บลง State
    selectedUnpolite.value = {
      upId: data.upId,
      word: data.word,
      actions: {
        create: false,
        view: true,
        update: true,
        delete: true,
      },
    };

    showDialog.value = false; // เปิดหน้าต่างโชว์ข้อมูล
  } catch (err: unknown) {
    // $q.notify({ color: 'red-5', textColor: 'white', icon: 'warning', message: 'Login failed' });
    // console.error(error);
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
        message: 'เกิดข้อผิดพลาดในการลบคำไม่พึงประสงค์',
        icon: 'error',
      });
    }
    console.error('Post Sender Error:', error);
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

const onView = (row: TableRow) => {
  console.log('View ID:', row.upId);
  void fetchUnpoliteById(row.upId);
  // ใส่ Code สำหรับเปิด Modal หรือไปหน้าอื่นที่นี่
};

const onEdit = (row: TableRow) => {
  console.log('Edit ID:', row.upId);
};

const onDelete = (row: TableRow) => {
  console.log('Delete ID:', row.upId);
  void deleteUnpoliteById(row.upId);
  // ใส่ Code สำหรับยืนยันการลบที่นี่
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
