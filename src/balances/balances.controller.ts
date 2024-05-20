import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/decorators/user.decorator';
import { QueryPaginationDto } from '../common/dtos/query-pagination.dto';
import { BalancesService } from './balances.service';
import { IncomesService } from '../incomes/incomes.service';
import { ExpensesService } from '../expenses/expenses.service';

@ApiTags('Balances')
@Controller('balances')
export class BalancesController {
  constructor(
    private readonly balancesService: BalancesService,
    private readonly incomesService: IncomesService,
    private readonly expensesService: ExpensesService,
  ) {}

  @Get()
  async listBalances(@Query() { limit = 10, offset = 0 }: QueryPaginationDto, @UserId() userId) {
    const balances = await this.balancesService.listBalances({ userId, limit, offset });
    return { balances };
  }

  @Get('year/:year/month/:month')
  async balanceDetail(
    @Param('year') year: number,
    @Param('month') month: number,
    @UserId() userId,
  ) {
    const [incomes, expenses, balances] = await Promise.all([
      this.incomesService.findAll({ userId, filter: { year, month } }),
      this.expensesService.findAll({ userId, filter: { year, month } }),
      await this.balancesService.getBalance({ userId, year, month }),
    ]);

    incomes.forEach((income) => (income.type = 'income'));
    expenses.forEach((expense) => (expense.type = 'expense'));

    const movements = [...incomes, ...expenses].sort((a, b) => {
      return new Date(a.operationDate).getTime() - new Date(b.operationDate).getTime();
    });

    return { balance: balances[0], movements };
  }
}
