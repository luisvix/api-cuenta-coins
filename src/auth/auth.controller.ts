import { GoogleIdTokenGuard } from './guards/GoogleIdTokenGuard';
import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(GoogleIdTokenGuard)
  loginAndRegister(@Req() req) {
    return this.authService.loginAndRegister({ user: req.user });
  }
}
