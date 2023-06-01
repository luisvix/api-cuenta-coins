import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenGuard } from '../auth/guards/GoogleIdTokenGuard';
import { UserId } from '../common/decorators/user.decorator';
import { QueryPaginationDto } from '../common/dtos/query-pagination.dto';
import { BalancesService } from './balances.service';
import { IncomesService } from '../incomes/incomes.service';
import { ExpensesService } from '../expenses/expenses.service';

@ApiTags('Balances')
@UseGuards(GoogleIdTokenGuard)
@Controller('balances')
export class BalancesController {
  constructor(
    private readonly balancesService: BalancesService,
    private readonly incomesService: IncomesService,
    private readonly expensesService: ExpensesService,
  ) {}

  @Get()
  async listBalances(@Query() { limit, offset }: QueryPaginationDto, @UserId() userId) {
    const balances = await this.balancesService.listBalances({ userId, limit, offset });
    return { balances };
  }

  @Get('year/:year/month/:month')
  async balanceDetail(
    @Param('year') year: number,
    @Param('month') month: number,
    @UserId() userId,
  ) {
    const [incomes, expenses] = await Promise.all([
      this.incomesService.findAll({ userId, filter: { year, month } }),
      this.expensesService.findAll({ userId, filter: { year, month } }),
    ]);
    return { incomes, expenses };
  }
}
