import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import AuthCredentialsDto from './dto/auth-credentials.dto';
import User from './user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.salt = await bcrypt.genSalt();
    user.username = username;
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}