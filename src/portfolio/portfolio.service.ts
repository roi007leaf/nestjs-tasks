import { Injectable, NotFoundException } from '@nestjs/common';
import { Instrument, InstrumentTypes } from './instrument.model';
import {v4 as uuid} from 'uuid';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { FilterInstrumentsDto } from './dto/filter-instruments.dto';
import { InstrumentEntity } from './instrument.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PortfolioService {
  private instruments: Instrument[] = [];

  constructor(@InjectModel(InstrumentEntity.name) private instrumentModel: Model<InstrumentEntity>) {
  }

  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentModel.find({}, {});
  }

  async getAllInstrumentsWithFilter(filterDto: FilterInstrumentsDto):  Promise<Instrument[]> {
    let instruments = await this.getAllInstruments();
    const { type, search } = filterDto;

    if (type) {
      instruments = instruments.filter(instrument => {
        return instrument.type === type;
      });
    }

    if (search) {
      instruments = instruments.filter(instrument => {
        return instrument.name.includes(search);
      });
    }
    return instruments;
  }

  async getAllInstrumentsByUid(uId:string): Promise<Instrument>{
    return this.instrumentModel.findOne({uId:uId}, {});
  }

  async addNewInstrument(createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    const { name, symbol, type } = createInstrumentDto;
    const instrument: Instrument = {
      name,
      symbol,
      type,
      instrumentId: uuid(),
      uId: '1234',
    };
    return await this.instrumentModel.create(instrument);
  }

  getInstrumentById(id: string): Instrument {
    const foundInstrument = this.instruments.find(instrument => instrument.instrumentId === id);
    if (!foundInstrument) {
      new NotFoundException(`Instrument With ID ${id} isn't found`);
    }
    return foundInstrument;
  }

  removeInstrument(id: string): void {
    const foundInstrument = this.getInstrumentById(id);
    this.instruments = this.instruments.filter(instrument => {
      return instrument.instrumentId !== foundInstrument.instrumentId;
    });
  }


  updateInstrumentTypeById(id: string, type: InstrumentTypes): Instrument {
    const instrument = this.getInstrumentById(id);
    instrument.type = type;
    return instrument;
  }
}
