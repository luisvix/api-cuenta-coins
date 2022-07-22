import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class QueryPaginationDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({ type: Number, default: 0 })
  offset? = 0;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({ type: Number, default: 10 })
  limit? = 10;
}
