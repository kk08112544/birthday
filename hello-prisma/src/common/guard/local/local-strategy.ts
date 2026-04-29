import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login-auth.dto';
import { Body } from '@nestjs/common';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    if (!user) {
      throw new UnauthorizedException({
        message: ['Something is wrong I can feel it'],
      });
    }
    return user;
  }
}
