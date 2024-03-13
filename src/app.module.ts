import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  providers: [AuthService],
})
export class AppModule {}