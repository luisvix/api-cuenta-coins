import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, ValidateIf } from 'class-validator';
import { PaymentMethods, FrequencyOfMovements } from '../../common/constants';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Details of the movement' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'amount of the transaction' })
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Method used by the operation', enum: PaymentMethods })
  @IsEnum(PaymentMethods)
  paymentMethod: PaymentMethods;

  @ApiPropertyOptional({ description: 'Used to classify operations' })
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @ApiPropertyOptional({ description: "Operation's date", default: 'Current date' })
  @IsOptional()
  operationDate?: Date = new Date();

  @ApiPropertyOptional({ description: 'How often the payment is made', enum: FrequencyOfMovements })
  @IsOptional()
  @IsEnum(FrequencyOfMovements)
  frequency?: FrequencyOfMovements;

  @ApiPropertyOptional({ description: 'Number of months to defer the payment' })
  @IsPositive()
  @ValidateIf(({ frequency }) => !!frequency)
  numberOfMovements: number;
}
