import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterYearMonthDto } from '../common/dtos/filter-year-month.dto';
import { UserId } from '../common/decorators/user.decorator';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() expenseDto: CreateExpenseDto, @UserId() userId) {
    const { frequency, numberOfMovements, ...expense } = expenseDto;

    if (frequency && numberOfMovements > 1) {
      return this.expensesService.createMany({
        expense: { ...expense, createdBy: userId },
        frequency,
        numberOfMovements,
      });
    }

    return this.expensesService.create({ expense: { ...expense, createdBy: userId } });
  }

  @Get()
  async findAll(@UserId() userId, @Query() { filterMonth, filterYear }: FilterYearMonthDto) {
    const expenses = await this.expensesService.findAll({
      userId,
      filter: { month: filterMonth, year: filterYear },
    });

    return { expenses };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
