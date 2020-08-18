import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { InstrumentEntity, InstrumentSchema } from './instrument.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InstrumentEntity.name, schema: InstrumentSchema }])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {
}
