// import {
//   Controller,
//   Get,
//   Post,
//   UseInterceptors,
//   Res,
//   Param,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import type { Response } from 'express';
// import * as path from 'path';

// import { Req } from '@nestjs/common';
// import type { Request } from 'express';
// // interface FileParams {
// //   img_url: string;
// // }

// @Controller('file')
// export class FileController {
//   // constructor(private readonly fileService: FileService) {}
//   @Post()
//   @UseInterceptors(
//     FileInterceptor('singleFile', {
//       storage: diskStorage({
//         destination: './upload',
//         filename: (req, file, cb) => {
//           const extArray = file.mimetype.split('/');
//           const extension = extArray[extArray.length - 1];
//           const newFilename = 'Fileupload-' + Date.now() + '.' + extension;
//           req['uploadedFileName'] = newFilename; // เก็บชื่อไฟล์ที่อัปโหลดไว้ใน request object
//           cb(null, newFilename);
//         },
//       }),
//     }),
//   )
//   async uploadFile(@Req() req: Request) {
//     const uploadedFileName = req['uploadedFileName'];
//     console.log(uploadedFileName);
//     return { image: uploadedFileName }; // return ชื่อไฟล์ที่ถูกอัปโหลดในรูปแบบ JSON
//   }
//   @Get(':img_url')
//   getFile(@Res() res: Response, @Param('img_url') img_url: string) {
//     const filePath = path.join(process.cwd(), 'upload', img_url);
//     return res.sendFile(filePath);
//   }
// }
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Res,
  Param,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response, Request } from 'express';
import * as path from 'path';

interface RequestWithFile extends Request {
  uploadedFileName?: string;
}

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('singleFile', {
      storage: diskStorage({
        destination: './upload',
        filename: (
          req: RequestWithFile,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const extArray = file.mimetype.split('/');
          const extension = extArray[extArray.length - 1];
          const newFilename = `Fileupload-${Date.now()}.${extension}`;

          req.uploadedFileName = newFilename; // ✅ ไม่ unsafe แล้ว

          cb(null, newFilename);
        },
      }),
    }),
  )
  uploadFile(@Req() req: RequestWithFile) {
    const uploadedFileName = req.uploadedFileName;

    return { image: uploadedFileName ?? null };
  }

  @Get(':img_url')
  getFile(@Res() res: Response, @Param('img_url') img_url: string) {
    const filePath = path.join(process.cwd(), 'upload', img_url);
    return res.sendFile(filePath);
  }
}
