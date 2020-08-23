import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '../config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import TaskModule from './tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TaskModule, AuthModule],
})
export default class AppModule {}
