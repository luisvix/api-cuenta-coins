import { PaymentMethods } from './../constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Income {
  @Prop({ required: true }) description: string;

  @Prop({ required: true, type: Number, default: 0 }) amount: number;

  @Prop({ required: true, enum: Object.values(PaymentMethods) }) paymentMethod: PaymentMethods;

  @Prop() category?: string;

  @Prop({ type: Date, default: new Date() }) operationDate?: Date = new Date();
}

export const IncomeSchema = SchemaFactory.createForClass(Income);

export type IncomeDocument = Income & Document;
