import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class DeleteMeService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async deleteme(username: string, password: string): Promise<string> {
    const user = await this.usersRepository.createQueryBuilder("user").where("LOWER(user.username) = :username", { username: username.toLowerCase() }).getOne();

    if (!user) {
      console.log('User not found');
      return 'User not found';
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Delete the user with matching UUID
      await this.usersRepository.delete(user.uuid);

      console.log('Delete successful!');
      return 'Delete successful!';
    } else {
      console.log('Invalid password!');
      return 'Invalid password!';
    }
  }
}
