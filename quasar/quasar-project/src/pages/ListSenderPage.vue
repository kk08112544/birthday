<template>
  <q-page class="q-pa-none bg-grey-1">
    <q-table
      grid
      flat
      bordered
      :rows="rows"
      :columns="columns"
      title="รายการผู้ร่วมส่งคำอวยพร"
      row-key="sId"
      v-model:pagination="pagination"
      :loading="loading"
      @request="onRequest"
      hide-header
    >
      <!-- 🔍 Search -->
      <template v-slot:top>
        <div class="row full-width justify-center items-center q-gutter-md">
          <div class="col-12 col-sm-6 col-md-4">
            <q-input
              dense
              outlined
              rounded
              debounce="500"
              v-model="fullname"
              placeholder="ค้นหาชื่อ-นามสกุล"
              @update:model-value="onSearch"
              bg-color="white"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <q-input
              dense
              outlined
              rounded
              debounce="500"
              v-model="position"
              placeholder="ค้นหาตำแหน่ง"
              @update:model-value="onSearch"
              bg-color="white"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <q-input
              dense
              outlined
              rounded
              debounce="500"
              v-model="department"
              placeholder="ค้นหากอง/สำนัก/ศูนย์"
              @update:model-value="onSearch"
              bg-color="white"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>

      <!-- 🎴 Card Layout -->
      <template v-slot:item="props">
        <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm">
          <q-card class="shadow-2 rounded-borders" @click="fetchSenderById(props.row.sId)" v-ripple>
            <q-img :src="props.row.url" style="height: 500px" />

            <q-card-section>
              <div class="text-bold text-h6">
                {{ props.row.fullname }}
              </div>
              <div class="text-grey-7">
                {{ props.row.position }}
              </div>
              <div class="text-grey-6 text-caption">
                {{ props.row.department }}
              </div>
              <div class="text-grey-6 text-caption">
                {{ props.row.wishWord }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <!-- 💤 Empty -->
      <template v-slot:no-data>
        <div class="full-width text-center q-pa-md text-grey">No data found</div>
      </template>
    </q-table>
    <q-dialog v-model="showDialog">
      <q-card style="width: 500px; max-width: 90vw">
        <q-img :src="selectedSender?.url" />

        <q-card-section>
          <div class="text-h6">{{ selectedSender?.fullname }}</div>
          <div class="text-subtitle2 text-grey-8">{{ selectedSender?.position }}</div>
          <div class="text-caption text-grey">{{ selectedSender?.department }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="bg-blue-1">
          <div class="text-weight-medium text-blue-9">คำอวยพร:</div>
          <div class="text-body1 italic">{{ selectedSender?.wishWord }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="ปิด" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import type { QTableProps } from 'quasar'; // นำเข้า Type จาก Quasar

// 1. กำหนด Interface ให้ชัดเจน
interface SenderItem {
  sId: number | string;
  fullname: string;
  position: string;
  department: string;
  card?: {
    imageCard: string;
  };
  wish?: {
    // 👈 เพิ่มส่วนนี้
    wishWord: string;
  };
}

interface TableRow {
  sId: number | string;
  fullname: string;
  position: string;
  department: string;
  url: string;
  wishWord: string; // 👈 เพิ่มส่วนนี้
}

// ================= STATE =================
const rows = ref<TableRow[]>([]); // ระบุ Type แทน any
const filter = ref('');
const loading = ref(false);
const fullname = ref(null);
const position = ref(null);
const department = ref(null);
// const pagination = ref({
//   page: 1,
//   rowsPerPage: 10,
//   rowsNumber: 0,
// });
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0, // หรือใส่เป็น 0 ไว้ก่อน
  sortBy: '', // เพิ่มเพื่อให้ Type ตรงกัน
  descending: false,
});

// ================= COLUMNS =================
const columns = [
  { name: 'fullname', label: 'ชื่อ', field: 'fullname' },
  { name: 'position', label: 'ตำแหน่ง', field: 'position' },
  { name: 'department', label: 'แผนก', field: 'department' },
  { name: 'wishWord', label: 'คำอวยพร', field: 'wishWord' },
];

const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api.get(`/file/${imagePath}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data as Blob);
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

const fetchSender = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await api.get('/sender', {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        search: filter.value,
        fullname: fullname.value,
        position: position.value,
        department: department.value,
      },
    });

    const res = response.data;
    // กำหนด Type ให้ list
    const list: SenderItem[] = res.sender?.data ?? [];

    const formattedRows: TableRow[] = await Promise.all(
      list.map(async (item: SenderItem) => {
        let finalUrl = '';

        if (item.card?.imageCard) {
          const blobUrl = await getImageUrl(item.card.imageCard);
          if (blobUrl) finalUrl = blobUrl;
        }

        return {
          sId: item.sId,
          fullname: item.fullname || '-',
          position: item.position || '-',
          department: item.department || '-',
          url: finalUrl,
          wishWord: item.wish?.wishWord || '',
        };
      }),
    );

    rows.value = formattedRows;
    pagination.value.rowsNumber = res.sender?.total ?? 0;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    rows.value = [];
  } finally {
    loading.value = false;
  }
};
const showDialog = ref(false);
const selectedSender = ref<TableRow | null>(null);
// แก้ไขฟังก์ชัน fetchSenderById
const fetchSenderById = async (id: number | string): Promise<void> => {
  loading.value = true;
  try {
    const response = await api.get(`/sender/${id}`);
    const data = response.data.sender;

    // แปลงรูปภาพเหมือนที่ทำใน List
    let finalUrl = '';
    if (data.card?.imageCard) {
      finalUrl = await getImageUrl(data.card.imageCard);
    }

    // เก็บลง State
    selectedSender.value = {
      sId: data.sId,
      fullname: data.fullname,
      position: data.position,
      department: data.department,
      url: finalUrl,
      wishWord: data.wish?.wishWord || '',
    };

    showDialog.value = true; // เปิดหน้าต่างโชว์ข้อมูล
  } catch (error) {
    console.error('Error fetching by ID:', error);
  } finally {
    loading.value = false;
  }
};
// ================= EVENTS =================
// แก้ไข: ใส่ void หน้าฟังก์ชัน async ที่ไม่ได้ถูก await เพื่อบอก ESLint ว่าเราตั้งใจปล่อยมัน run ไป
// const onRequest = (props: { pagination: typeof pagination.value }) => {
//   pagination.value = props.pagination;
//   void fetchSender(); // ✅ ใช้ void แก้ error no-floating-promises
// };
const onRequest: QTableProps['onRequest'] = (props) => {
  // อัปเดต pagination state ด้วยค่าที่ส่งมาจาก table
  pagination.value.page = props.pagination.page;
  pagination.value.rowsPerPage = props.pagination.rowsPerPage;
  pagination.value.sortBy = props.pagination.sortBy;
  pagination.value.descending = props.pagination.descending;

  // เรียกข้อมูลใหม่
  void fetchSender();
};

const onSearch = () => {
  pagination.value.page = 1;
  void fetchSender(); // ✅ ใช้ void
};

// ================= INIT =================
onMounted(() => {
  void fetchSender(); // ✅ ใช้ void
});
</script>
