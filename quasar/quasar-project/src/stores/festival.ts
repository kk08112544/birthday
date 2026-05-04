import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useFestivalStore = defineStore('festival', {
  state: () => ({
    // ค่าเริ่มต้นให้เอาจาก package.json มาก่อนก็ได้เพื่อไม่ให้หน้าว่าง
    webName: 'Quasar LDD',
    //  logo: 'https://quasar.dev/logo-v2/svg/logo.svg'
  }),
  actions: {
    async fetchFestivalName(id: number) {
      try {
        const res = await api.get(`/festival/${id}`);
        // เมื่อได้ค่าจาก API มาแล้ว ให้ทับค่าเดิมทันที
        this.webName = res.data.festival.webName;
        // this.logo = res.data.festival.logo;

        // แถม: เปลี่ยนชื่อที่ปรากฏบน Tab Browser ด้วย
        document.title = this.webName;
      } catch {
        console.error('โหลดชื่อไม่สำเร็จ');
      }
    },
  },
});
