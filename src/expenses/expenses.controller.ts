import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenGuard } from '../auth/guards/GoogleIdTokenGuard';

@ApiTags('Expenses')
@UseGuards(GoogleIdTokenGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() expenseDto: CreateExpenseDto, @Req() req) {
    const expense = {
      ...expenseDto,
      createdBy: req.user.providerId,
    };

    return this.expensesService.create({ expense });
  }

  @Get()
  async findAll(@Req() req) {
    const expenses = await this.expensesService.findAll({ providerId: req.user.providerId });
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
