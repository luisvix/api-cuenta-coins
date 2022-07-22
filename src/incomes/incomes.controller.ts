import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenGuard } from '../auth/guards/GoogleIdTokenGuard';
import { UserId } from '../common/decorators/user.decorator';

@ApiTags('Incomes')
@UseGuards(GoogleIdTokenGuard)
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() incomeDto: CreateIncomeDto, @UserId() userId) {
    const income = {
      ...incomeDto,
      createdBy: userId,
    };

    return this.incomesService.create({ income });
  }

  @Get()
  async findAll(@UserId() userId) {
    const incomes = await this.incomesService.findAll({ providerId: userId });
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
