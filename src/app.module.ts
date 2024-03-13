import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginAuthService } from './loginauth.service';
import { LoginController } from './login.controller';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';

import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), // Lägg till denna rad
  ],
  controllers: [LoginController, SignUpController],
  providers: [LoginAuthService, SignUpService],
})
export class AppModule {}
