import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginAuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      console.log('User not found');
      return 'User not found';
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log('Login successful!');
      return 'Login successful!';
    } else {
      console.log('Invalid password!');
      return 'Invalid password!';
    }
  }
}
