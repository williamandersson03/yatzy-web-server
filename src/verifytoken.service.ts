import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

const verifyPromise = promisify(verify);

@Injectable()
export class VerifyTokenService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async verifytoken(token: string): Promise<any> {
        try {
            const decoded = await verifyPromise(token, process.env.JWT_SECRET);
            if(decoded.uuid != null)
            {
                const user = await this.usersRepository.createQueryBuilder("user").where("user.uuid = :uuid", { uuid: decoded.uuid }).getOne();
                if(user != null)
                {
                    const verifytokensecret = await bcrypt.compare(user.password, decoded.secret);
                    if(verifytokensecret)
                    {
                        return 'VALID';
                    }
                    else
                    {
                        return 'INVALID';
                    }
                }
                else
                {
                    return 'INVALID';
                }
            }
            else
            {
                return 'INVALID';
            }
        } catch (err) {
            return 'INVALID';
        }
    }
}