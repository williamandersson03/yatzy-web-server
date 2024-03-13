import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(username: string, password: string, email: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user)
    {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log('Invalid password format!');
            console.log('Invalid password format! Password must contain at least 8 characters, including at least one letter and one digit.');
            return 'Invalid password format! Password must contain at least 8 characters, including at least one letter and one digit.';
        }
        else
        {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await this.usersRepository.insert({ username, password: hashedPassword, email });
            console.log('Signup successful!');
            return 'Signup successful!';
        }
    }
    else
    {
        console.log('Username already exists!');
        return 'Username already exists!';
    }
  }
}

