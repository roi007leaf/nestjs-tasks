import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Instrument, InstrumentTypes } from './instrument.model';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { InstrumentTypeValidationPipe } from './pipes/instrument-type-validation.pipe';
import { FilterInstrumentsDto } from './dto/filter-instruments.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {
  }

  @Get('/getAllInstruments')
  getAllInstruments(@Query(ValidationPipe) filterDto: FilterInstrumentsDto) {
    if (Object.keys(filterDto).length) {
      return this.portfolioService.getAllInstrumentsWithFilter(filterDto);
    } else {
      return this.portfolioService.getAllInstruments();
    }
  }

  @Get('/getAllInstrumentsBy/uId/:uId')
  getAllInstrumentsByUid(@Param('uId') uId: string) {
    return this.portfolioService.getAllInstrumentsByUid(uId);
  }

  @Post('/addNewInstrument')
  @UsePipes(ValidationPipe)
  addNewInstrument(@Body() createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    return this.portfolioService.addNewInstrument(createInstrumentDto);
  }

  @Get('instrument/:id')
  getInstrumentById(@Param('id') id: string): Instrument {
    return this.portfolioService.getInstrumentById(id);
  }

  @Delete('/removeInstrument/:id')
  removeInstrument(@Param('id') id: string) {
    return this.portfolioService.removeInstrument(id);
  }

  @Patch('/instrument/:id/type')
  @UsePipes(InstrumentTypeValidationPipe)
  updateInstrumentType(@Param('id') id: string, @Body('type') type: InstrumentTypes) {
    return this.portfolioService.updateInstrumentTypeById(id, type);
  }
}
