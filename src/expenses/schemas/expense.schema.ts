import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentMethods } from '../../common/constants';

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true }) description: string;

  @Prop({ required: true, type: Number, default: 0 }) amount: number;

  @Prop({ required: true, type: String, enum: Object.values(PaymentMethods) })
  paymentMethod: PaymentMethods;

  @Prop({ required: true }) createdBy: string;

  @Prop() category?: string;

  @Prop({ type: Date, default: new Date() }) operationDate?: Date = new Date();
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

export type ExpenseDocument = Expense & Document;
