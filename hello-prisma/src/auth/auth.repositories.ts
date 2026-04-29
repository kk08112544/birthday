import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseAuthDto } from './dto/response-auth.dto';
@Injectable()
export class AuthRepositories {
  constructor(private prisma: PrismaService) {}
  async findByUserName(loginDto: LoginDto): Promise<ResponseAuthDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        userName: loginDto.userName,
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        password: true,
      },
    });
    return user;
  }

  async findById(id: number): Promise<ResponseAuthDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        uId: Number(id),
      },
      select: {
        uId: true,
        firstName: true,
        userName: true,
        password: true,
      },
    });
    return user;
  }
}
