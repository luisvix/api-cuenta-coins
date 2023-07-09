import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class QueryPaginationDto {
  @ApiPropertyOptional({ type: Number, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({ type: Number, default: 10 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number = 10;
}
