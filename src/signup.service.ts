import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(username: string, password: string, email: string): Promise<string> {
    const user = await this.usersRepository.createQueryBuilder("user").where("LOWER(user.username) = :username", { username: username.toLowerCase() }).getOne();
    if (!user)
    {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          console.log('Invalid password format!');
          console.log('Invalid password format! Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one digit, and one special character.');
          return 'Invalid password format! Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one digit, and one special character.';
        }
        else {
          if(username.toLowerCase() != "pontus")
          {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const uuid = uuidv4();
            await this.usersRepository.insert({ uuid: uuid, username, password: hashedPassword, email });
            console.log('Signup successful!');
            return 'Signup successful!';
          }
          else
          {
            return 'You have been banned';
          }
        }
    }
    else
    {
        console.log('Username already exists!');
        return 'Username already exists!';
    }
  }
}