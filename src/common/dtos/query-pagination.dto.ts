import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsPositive, Min } from 'class-validator';

export class QueryPaginationDto {
  @ApiPropertyOptional({ type: Number, default: 0 })
  @IsOptional()
  @IsNumberString()
  offset? = '0';

  @ApiPropertyOptional({ type: Number, default: 10 })
  @IsOptional()
  @IsNumberString()
  limit? = '10';
}
