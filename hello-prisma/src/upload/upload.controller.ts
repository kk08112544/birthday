
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
export class UploadController {
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
