import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }
}