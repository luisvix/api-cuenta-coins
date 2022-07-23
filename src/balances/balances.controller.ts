import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenGuard } from '../auth/guards/GoogleIdTokenGuard';
import { UserId } from '../common/decorators/user.decorator';
import { QueryPaginationDto } from '../common/dtos/QueryPagination.dto';
import { BalancesService } from './balances.service';

@ApiTags('Balances')
@UseGuards(GoogleIdTokenGuard)
@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  async listBalances(@Query() { limit, offset }: QueryPaginationDto, @UserId() userId) {
    const balances = await this.balancesService.listBalances({ userId, limit, offset });
    return { balances };
  }
}
