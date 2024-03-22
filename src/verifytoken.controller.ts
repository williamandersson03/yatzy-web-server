import { Controller, Get, Headers } from '@nestjs/common';
import { VerifyTokenService } from './verifytoken.service';

@Controller('api')
export class VerifyTokenController {
  constructor(private verifyService: VerifyTokenService) {}

  @Get('verifytoken')
  verifytoken(@Headers('authorization') token: string) {
    return this.verifyService.verifytoken(token);
  }
}