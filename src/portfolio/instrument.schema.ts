import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class InstrumentEntity extends Document{
  @Prop()
  instrumentId: string;

  @Prop()
  uId:string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  type: string;

}

export const InstrumentSchema = SchemaFactory.createForClass(InstrumentEntity);
