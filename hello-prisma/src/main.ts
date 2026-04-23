// src/main.ts
// import * as dotenv from 'dotenv';
// dotenv.config(); // <--- บรรทัดนี้ต้องอยู่บนสุด ห้ามย้าย!

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // ถ้าใช้ cookies / auth
  });

  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error(err);
});
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
