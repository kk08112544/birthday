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
        <div class="row full-width justify-center items-center q-gutter-x-md q-gutter-y-sm">
          <div class="col-12 col-sm">
            <q-select
              v-model="selectedMonth"
              :options="monthOptions"
              label="เลือกเดือน"
              outlined
              dense
              emit-value
              map-options
              bg-color="white"
              @update:model-value="onSearch"
            />
          </div>
          <div class="col-12 col-sm">
            <q-select
              v-model="selectedYear"
              :options="filterYearOptions"
              label="เลือกปี พ.ศ."
              outlined
              dense
              use-input
              fill-input
              hide-selected
              input-debounce="0"
              emit-value
              map-options
              bg-color="white"
              @filter="filterYearFn"
              @update:model-value="onSearch"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">ไม่พบข้อมูลปี</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-12 col-sm">
            <q-input
              dense
              outlined
              debounce="200"
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

          <div class="col-12 col-sm">
            <q-input
              dense
              outlined
              debounce="200"
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

          <div class="col-12 col-sm">
            <q-input
              dense
              outlined
              debounce="200"
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

          <!-- <div class="col-12 col-sm">
          
            <q-select
              v-model="selectedYear"
              :options="filterYearOptions"
              label="เลือกปี พ.ศ."
              outlined
              dense
              use-input
              fill-input
              hide-selected
              input-debounce="0"
              emit-value
              map-options
              bg-color="white"
              @filter="filterYearFn"
              @update:model-value="onSearch"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">ไม่พบข้อมูลปี</q-item-section>
                </q-item>
              </template>
            </q-select>
          </div> -->
        </div>
      </template>
      <template v-slot:item="props">
        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2 q-pa-xs">
          <q-card class="wish-card-mini shadow-1" @click="fetchSenderById(props.row.sId)" v-ripple>
            <q-img :src="props.row.url" class="img-card-mini" :ratio="1" />
            <q-card-section class="q-pa-sm">
              <div class="text-bold text-subtitle2 ellipsis">
                {{ props.row.fullname }}
              </div>
              <div class="text-caption text-grey-8 ellipsis">
                {{ props.row.position }}
              </div>
              <div class="text-caption text-grey-6 ellipsis" style="font-size: 0.75rem">
                {{ props.row.department }}
              </div>

              <div class="text-caption text-primary ellipsis q-mt-xs" style="font-size: 0.7rem">
                {{ props.row.wishWord }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
      <!-- 💤 Empty -->
      <template v-slot:no-data>
        <div class="full-width text-center q-pa-md text-grey">ไม่มีข้อมูล</div>
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
<!-- 
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
const selectedMonth = ref(new Date().getMonth() + 1); // getMonth() เริ่มที่ 0 เลยต้อง +1

// รายการเดือนสำหรับ q-select
const monthOptions = [
  { label: 'มกราคม', value: 1 },
  { label: 'กุมภาพันธ์', value: 2 },
  { label: 'มีนาคม', value: 3 },
  { label: 'เมษายน', value: 4 },
  { label: 'พฤษภาคม', value: 5 },
  { label: 'มิถุนายน', value: 6 },
  { label: 'กรกฎาคม', value: 7 },
  { label: 'สิงหาคม', value: 8 },
  { label: 'กันยายน', value: 9 },
  { label: 'ตุลาคม', value: 10 },
  { label: 'พฤศจิกายน', value: 11 },
  { label: 'ธันวาคม', value: 12 },
];
// // --- เพิ่ม 2 บรรทัดนี้ ---
// const selectedYear = ref(new Date().getFullYear()); // เก็บปีปัจจุบันเป็นค่าเริ่มต้น
// const yearOptions = ref<{ label: string; value: number }[]>([]);

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
// ตัวแปรเก็บปีที่เลือก (ค่าเริ่มต้นเป็นปีปัจจุบัน)
// --- เพิ่ม 2 บรรทัดนี้ ---
// const selectedYear = ref(new Date().getFullYear()); // เก็บปีปัจจุบันเป็นค่าเริ่มต้น
// const yearOptions = ref<{ label: string; value: number }[]>([]);
// const generateThaiYearOptions = () => {
//   const years = [];
//   const currentYearCE = new Date().getFullYear(); // 2026 (พ.ศ. 2569)
//   const targetYearCE = 2026; // ปีสุดท้ายที่อยากให้โชว์ (พ.ศ. 2569)

//   for (let year = currentYearCE; year >= targetYearCE; year--) {
//     years.push({
//       label: `${year + 543}`,
//       value: year,
//     });
//   }
//   yearOptions.value = years;
// };

const selectedYear = ref(new Date().getFullYear());
const yearOptions = ref<{ label: string; value: number }[]>([]);
// ✅ เพิ่มตัวแปรสำหรับเก็บค่าที่กรองแล้ว
const filterYearOptions = ref<{ label: string; value: number }[]>([]);

const generateThaiYearOptions = () => {
  const years = [];
  const currentYearCE = new Date().getFullYear(); // 2026

  // ✅ แก้บั๊ก: ปรับ targetYearCE ให้ย้อนหลังไปสัก 10 ปี (เช่น 2016)
  // เพื่อให้มีรายการปีให้เลือกและพิมพ์ค้นหาได้
  const targetYearCE = 2026;

  for (let year = currentYearCE; year >= targetYearCE; year--) {
    years.push({
      label: `${year + 543}`,
      value: year,
    });
  }
  yearOptions.value = years;
  // ✅ ตั้งค่าเริ่มต้นให้ filterOptions เท่ากับค่าทั้งหมด
  filterYearOptions.value = years;
};

// ✅ เพิ่มฟังก์ชันสำหรับกรองข้อมูล (Filter)
const filterYearFn = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      filterYearOptions.value = yearOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterYearOptions.value = yearOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
};
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
        month: selectedMonth.value,
        year: selectedYear.value,
      },
    });

    const res = response.data;
   
    // กำหนด Type ให้ list
    const list: SenderItem[] = res.sender?.data ?? [];
    console.log(list)

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
  generateThaiYearOptions();
});
</script> -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { api } from 'src/boot/axios';
import type { QTableProps } from 'quasar';

// ================= PROPS =================
const props = defineProps<{
  id: string;
}>();

// ================= TYPES =================
interface SenderItem {
  sId: number | string;
  fullname: string;
  position: string;
  department: string;
  card?: {
    imageCard: string;
  };
  wish?: {
    wishWord: string;
  };
}

interface TableRow {
  sId: number | string;
  fullname: string;
  position: string;
  department: string;
  url: string;
  wishWord: string;
}

// ================= COLUMNS =================
const columns = [
  { name: 'fullname', label: 'ชื่อ', field: 'fullname' },
  { name: 'position', label: 'ตำแหน่ง', field: 'position' },
  { name: 'department', label: 'แผนก', field: 'department' },
  { name: 'wishWord', label: 'คำอวยพร', field: 'wishWord' },
];

// ================= FILTER =================
const selectedMonth = ref<number | null>(null);
const selectedYear = ref<number | null>(null);

const monthOptions = [
  { label: 'มกราคม', value: 1 },
  { label: 'กุมภาพันธ์', value: 2 },
  { label: 'มีนาคม', value: 3 },
  { label: 'เมษายน', value: 4 },
  { label: 'พฤษภาคม', value: 5 },
  { label: 'มิถุนายน', value: 6 },
  { label: 'กรกฎาคม', value: 7 },
  { label: 'สิงหาคม', value: 8 },
  { label: 'กันยายน', value: 9 },
  { label: 'ตุลาคม', value: 10 },
  { label: 'พฤศจิกายน', value: 11 },
  { label: 'ธันวาคม', value: 12 },
];

// ================= STATE =================
const rows = ref<TableRow[]>([]);
const loading = ref(false);

const fullname = ref<string | null>(null);
const position = ref<string | null>(null);
const department = ref<string | null>(null);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: '',
  descending: false,
});

// ================= YEAR =================
const yearOptions = ref<{ label: string; value: number }[]>([]);
const filterYearOptions = ref<{ label: string; value: number }[]>([]);

// const generateThaiYearOptions = () => {
//   const years = [];
//   const currentYearCE = new Date().getFullYear();
//   const targetYearCE = currentYearCE - 10;

//   for (let year = currentYearCE; year >= targetYearCE; year--) {
//     years.push({
//       label: `${year + 543}`,
//       value: year,
//     });
//   }

//   yearOptions.value = years;
//   filterYearOptions.value = years;
// };
const generateThaiYearOptions = () => {
  const years = [];
  const currentYearCE = new Date().getFullYear();
  const targetYearCE = currentYearCE - 10;

  for (let year = currentYearCE; year >= targetYearCE; year--) {
    years.push({
      label: `${year + 543}`, // ปี พ.ศ.
      value: year, // เก็บค่า ค.ศ.
    });
  }

  yearOptions.value = years;
  filterYearOptions.value = years;

  // ✅ ตั้งค่า default เป็นปีปัจจุบัน
  selectedYear.value = currentYearCE;
};
const filterYearFn = (val: string, update: (fn: () => void) => void) => {
  if (val === '') {
    update(() => {
      filterYearOptions.value = yearOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterYearOptions.value = yearOptions.value.filter((v) =>
      v.label.toLowerCase().includes(needle),
    );
  });
};

// ================= IMAGE =================
const getImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const response = await api.get(`/upload/${imagePath}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data as Blob);
  } catch (error) {
    console.error('Image error:', error);
    return '';
  }
};

// ================= FETCH =================
const fetchSender = async (id: string): Promise<void> => {
  loading.value = true;

  try {
    const response = await api.get(`/sender/paginate/${Number(id)}`, {
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
        fullname: fullname.value || undefined,
        position: position.value || undefined,
        department: department.value || undefined,
        month: selectedMonth.value || undefined,
        year: selectedYear.value || undefined,
      },
    });

    const res = response.data;

    const list: SenderItem[] = res.sender?.data ?? [];

    rows.value = await Promise.all(
      list.map(async (item) => {
        let url = '';

        if (item.card?.imageCard) {
          url = await getImageUrl(item.card.imageCard);
        }

        return {
          sId: item.sId,
          fullname: item.fullname || '-',
          position: item.position || '-',
          department: item.department || '-',
          url,
          wishWord: item.wish?.wishWord || '',
        };
      }),
    );

    pagination.value.rowsNumber = res.sender?.total ?? 0;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    rows.value = [];
  } finally {
    loading.value = false;
  }
};

// ================= DETAIL =================
const showDialog = ref(false);
const selectedSender = ref<TableRow | null>(null);

const fetchSenderById = async (id: number | string) => {
  try {
    loading.value = true;

    const res = await api.get(`/sender/${id}`);
    const data = res.data.sender;

    let url = '';
    if (data.card?.imageCard) {
      url = await getImageUrl(data.card.imageCard);
    }

    selectedSender.value = {
      sId: data.sId,
      fullname: data.fullname,
      position: data.position,
      department: data.department,
      url,
      wishWord: data.wish?.wishWord || '',
    };

    showDialog.value = true;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// ================= EVENTS =================
const onRequest: QTableProps['onRequest'] = (propsTable) => {
  pagination.value = {
    ...pagination.value,
    ...propsTable.pagination,
  };

  void fetchSender(props.id);
};

const onSearch = () => {
  pagination.value.page = 1;
  void fetchSender(props.id);
};

// const clearFilter = () => {
//   fullname.value = null;
//   position.value = null;
//   department.value = null;
//   selectedMonth.value = null;
//   selectedYear.value = null;

//   pagination.value.page = 1;

//   void fetchSender(props.id);
// };

// ================= INIT =================
onMounted(() => {
  generateThaiYearOptions();
  void fetchSender(props.id);
});

// ================= WATCH (สำคัญมาก) =================
watch(
  () => props.id,
  (newId) => {
    if (newId) {
      pagination.value.page = 1;
      void fetchSender(newId);
    }
  },
);
</script>
