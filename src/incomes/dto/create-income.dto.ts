import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaymentMethods } from '../constants';
import { Income } from '../schemas/income.schema';

export class CreateIncomeDto implements Income {
  @ApiProperty({ description: 'Details of the movement' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'amount of the transaction', type: Number })
  @Type(() => Number)
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Method used by the operation', enum: PaymentMethods })
  @IsEnum(PaymentMethods)
  @IsNotEmpty()
  paymentMethod: PaymentMethods;

  @ApiProperty({ description: 'Used to classify operations' })
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @ApiProperty({ description: "Operation's date", type: Date, default: 'Current date' })
  @IsDate()
  operationDate?: Date = new Date();
}
