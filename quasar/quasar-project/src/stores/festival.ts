import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useFestivalStore = defineStore('festival', {
  state: () => ({
    // ค่าเริ่มต้นให้เอาจาก package.json มาก่อนก็ได้เพื่อไม่ให้หน้าว่าง
    festivalName: 'Quasar LDD' 
  }),
  actions: {
    async fetchFestivalName(id: number) {
      try {
        const res = await api.get(`/festival/${id}`);
        // เมื่อได้ค่าจาก API มาแล้ว ให้ทับค่าเดิมทันที
        this.festivalName = res.data.festival.festivalName;
        
        // แถม: เปลี่ยนชื่อที่ปรากฏบน Tab Browser ด้วย
        document.title = this.festivalName;
      } catch (err) {
        console.error('โหลดชื่อไม่สำเร็จ');
      }
    }
  }
});