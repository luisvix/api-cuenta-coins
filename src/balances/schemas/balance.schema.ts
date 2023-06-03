import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Balance {
  @Prop({ required: true, type: String }) userId: string;
  @Prop({ required: true, type: Number }) month: number;
  @Prop({ required: true, type: Number }) year: number;
  @Prop({ required: true, type: Number, default: 0 }) balance: number;
  @Prop({ required: true, type: Number, default: 0 }) incomes: number;
  @Prop({ required: true, type: Number, default: 0 }) expenses: number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
export type BalanceDocument = Balance & Document;
