import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JoiValidationPipe } from 'src/utils/joi.pipe';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';
import { login, refresh, register } from '../validations/auth.validation';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @Post('auth/refresh')
  async refresh(@Body(new JoiValidationPipe(refresh)) body) {
    return this.authService.refreshTokens(body.refresh_token);
  }

  @UseGuards(ThrottlerGuard, LocalAuthGuard)
  @Post('auth/login')
  async login(@Body(new JoiValidationPipe(login)) body) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(ThrottlerGuard)
  @Post('auth/register')
  async register(@Body(new JoiValidationPipe(register)) body) {
    return this.authService.register(body);
  }
}
