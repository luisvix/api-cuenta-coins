import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { PaymentMethods } from '../../common/constants';

export class CreateExpenseDto {
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

  @ApiPropertyOptional({ description: 'Used to classify operations' })
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @ApiPropertyOptional({ description: "Operation's date", default: 'Current date' })
  @IsOptional()
  operationDate?: Date = new Date();
}
