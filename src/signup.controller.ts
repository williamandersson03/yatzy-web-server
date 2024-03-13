import { Controller, Post, Body } from '@nestjs/common';
import { SignUpService } from './signup.service';

@Controller('api')
export class SignUpController {
  constructor(private signupService: SignUpService) {}

  @Post('signup')
  signup(@Body() body: any) {
    const { username, password, email } = body;
    return this.signupService.signup(username, password, email);
  }
}
