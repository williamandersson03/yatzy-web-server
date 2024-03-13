import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthService } from './loginauth.service';

@Controller('api')
export class LoginController {
  constructor(private authService: LoginAuthService) {}

  @Post('login')
  login(@Body() body: any) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }
}
