import { InstrumentTypes } from '../instrument.model';
import { IsNotEmpty } from 'class-validator';

export class CreateInstrumentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  type: InstrumentTypes;
}
