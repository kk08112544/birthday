import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { AuthRepositories } from './auth.repositories';
import { ExceptionsService } from 'src/common/exception/exception.service';
import { comparePassword } from 'src/common/utils/bcrypt.util';
import { generateTokens, verifyRefreshToken } from 'src/common/utils/jwt.util';
import { RenewTokenDto } from './dto/renew-auth.dto';
import { STATUS } from 'src/common/status';
import { MESSAGE } from 'src/common/message';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepositories: AuthRepositories,
    private readonly exceptionsService: ExceptionsService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.authRepositories.findByUserName(loginDto);

    if (!user) {
      this.exceptionsService.throwInvalidUserName();
    }
    const isMatches = await comparePassword(loginDto.password, user.password);
    if (!isMatches) {
      this.exceptionsService.throwInvalidPassword();
    }
    const tokens = generateTokens({
      sub: user.uId,
      userName: user.userName,
      firstName: user.firstName,
      password: user.password,
    });

    return {
      user: {
        user: {
          uId: user.uId,
          userName: user.userName,
          firstName: user.firstName,
          ...tokens,
        },
      },
      action: STATUS.SUCCESS,
      message: MESSAGE.AUTH.LOGIN_SUCCESS,
    };
  }
  async renew(renewTokenDto: RenewTokenDto) {
    try {
      const payload = verifyRefreshToken(renewTokenDto.refreshToken);
      const user = await this.authRepositories.findById(payload.sub);

      if (!user) {
        this.exceptionsService.throwInvalidRenewToken();
      }

      // สร้าง object ใหม่จาก payload
      const tokenPayload = { ...payload };

      // ลบตัวที่ไม่อยากให้ติดไปใน Token ใหม่ (ไม่ต้องประกาศตัวแปร iat, exp มารับ)
      delete tokenPayload.iat;
      delete tokenPayload.exp;

      const tokens = generateTokens(tokenPayload);

      return {
        token: tokens,
        action: STATUS.SUCCESS,
        message: MESSAGE.AUTH.RENEW_TOKEN_SUCCESS,
      };
    } catch {
      this.exceptionsService.throwInvalidRenewToken();
    }
  }
  // async logout(logoutDto:LogoutDto){
  //   response.clearCookie('accessToken');
  // response.clearCookie('refreshToken');
  // }
}
