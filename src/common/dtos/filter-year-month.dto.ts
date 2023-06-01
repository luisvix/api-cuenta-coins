import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryPaginationDto } from './query-pagination.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class FilterYearMonthDto extends QueryPaginationDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  filterMonth?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2500)
  filterYear?: number;
}
