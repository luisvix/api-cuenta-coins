import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class QueryPaginationDto {
  @ApiPropertyOptional({ type: Number, default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  offset? = 0;

  @ApiPropertyOptional({ type: Number, default: 10 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit? = 10;
}
