import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginAuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.createQueryBuilder("user").where("LOWER(user.username) = :username", { username: username.toLowerCase() }).getOne();

    if (!user) {
      console.log('User not found');
      return 'User not found';
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const usertokensecret  = await bcrypt.hash(user.password, 5);
      const token = sign({ uuid: user.uuid, secret: usertokensecret }, process.env.JWT_SECRET, { expiresIn: '2h' });
      console.log('Login successful!');
      return { message: 'Login successful!', token: token };
    }
    else {
      console.log('Invalid password!');
      return 'Invalid password!';
    }
  }
}
