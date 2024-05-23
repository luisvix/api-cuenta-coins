import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentMethods } from '../../common/constants';

@Schema({ timestamps: true })
export class Income {
  @Prop({ required: true }) description: string;
  @Prop({ required: true, type: Number, default: 0 }) amount: number;

  @Prop({ required: true, type: String, enum: Object.values(PaymentMethods) })
  paymentMethod: PaymentMethods;

  @Prop({ required: true }) createdBy: string;
  @Prop() category?: string;
  @Prop({ type: Date, default: new Date() }) operationDate?: Date = new Date();

  @Prop() numberOfMovement?: number;

  @Prop() totalOfMovements?: number;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
export type IncomeDocument = Income & Document;
