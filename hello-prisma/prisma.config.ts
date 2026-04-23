// import { defineConfig } from 'prisma/config';

// export default defineConfig({});

import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// โหลดค่าจากไฟล์ .env เข้ามาในระบบ
dotenv.config();

export default defineConfig({
  datasource: {
    // ต้องมั่นใจว่าใน .env ของคุณมีตัวแปรชื่อ DATABASE_URL
    url: process.env.DATABASE_URL,
  },
});