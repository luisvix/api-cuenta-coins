import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

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
