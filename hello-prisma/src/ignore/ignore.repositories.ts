import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateSenderDto } from 'src/sender/dto/create-sender.dto';

// type BadWordResult = {
//   word: string;
// };
type IgnoreWordResult = {
  word: string;
};

@Injectable()
export class IgnoreRepositories {
  constructor(private readonly prisma: PrismaService) {}

  // async findWord(data: CreateSenderDto): Promise<string | null> {
  //   const combinedText = `${data.fullname} ${data.position} ${data.department}`;

  //   const badWords: any[] = await this.prisma.$queryRaw<BadWordResult[]>`
  //   SELECT TOP 1 word
  //   FROM Unpolite
  //   WHERE CAST(${combinedText} AS NVARCHAR(MAX)) LIKE '%' + CAST(word AS NVARCHAR(MAX)) + '%'
  //   AND deletedAt IS NULL
  // `;

  //   return badWords.length > 0 ? badWords[0].word : null;
  // }

  //   type BadWordResult = {
  //   word: string;
  // };

  async findWord(data: CreateSenderDto): Promise<string | null> {
    const combinedText = `${data.fullname} ${data.position} ${data.department}`;

    const ignoreWords = await this.prisma.$queryRaw<IgnoreWordResult[]>`
    SELECT TOP 1 word 
    FROM Ignore 
    WHERE CAST(${combinedText} AS NVARCHAR(MAX)) LIKE '%' + CAST(word AS NVARCHAR(MAX)) + '%'
    AND deletedAt IS NULL
  `;

    return ignoreWords[0]?.word ?? null;
  }
}
