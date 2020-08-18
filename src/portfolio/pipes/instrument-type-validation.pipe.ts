import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { InstrumentTypes } from '../instrument.model';

export class InstrumentTypeValidationPipe implements PipeTransform {
  readonly ACCEPTED_TYPES = [
    InstrumentTypes.COMMODITY,
    InstrumentTypes.CURRENCY,
    InstrumentTypes.EQUITIES,
    InstrumentTypes.ETF,
    InstrumentTypes.INDICE
  ]
  transform(value: any) {
    value = value.toLowerCase()
    if(!this.isTypeValid(value)){
      throw new BadRequestException(`${value} is an invalid type`)
    }
    return value;
  }
  private isTypeValid(type:any) {
    return this.ACCEPTED_TYPES.includes(type);
  }
}
