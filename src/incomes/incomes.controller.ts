import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/decorators/user.decorator';
import { FilterYearMonthDto } from '../common/dtos/filter-year-month.dto';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() incomeDto: CreateIncomeDto, @UserId() userId) {
    const { frequency, numberOfMovements, ...income } = incomeDto;

    if (frequency && numberOfMovements > 1) {
      return this.incomesService.createMany({
        income: { ...income, createdBy: userId },
        frequency,
        numberOfMovements,
      });
    }

    return this.incomesService.create({ income: { ...income, createdBy: userId } });
  }

  @Get()
  async findAll(@UserId() userId, @Query() { filterMonth, filterYear }: FilterYearMonthDto) {
    const incomes = await this.incomesService.findAll({
      userId,
      filter: { month: filterMonth, year: filterYear },
    });
    return { incomes };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomesService.remove(+id);
  }
}
