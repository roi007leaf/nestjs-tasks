import { Module } from '@nestjs/common';
import PortfolioController from './tasks.controller';
import PortfolioService from './tasks.service';

@Module({
  imports: [],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export default class TasksModule {}
