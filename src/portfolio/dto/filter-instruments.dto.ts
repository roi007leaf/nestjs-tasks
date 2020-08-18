import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { InstrumentTypes } from '../instrument.model';

export class FilterInstrumentsDto {

  @IsOptional()
  @IsIn([InstrumentTypes.ETF, InstrumentTypes.EQUITIES, InstrumentTypes.CURRENCY, InstrumentTypes.COMMODITY, InstrumentTypes.INDICE])
  type: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
