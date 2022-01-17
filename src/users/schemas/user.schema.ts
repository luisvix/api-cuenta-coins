import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) providerId: string;

  @Prop({ required: true }) name: string;

  @Prop({ required: true }) email: string;

  @Prop() picture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
