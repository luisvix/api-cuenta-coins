import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { createExpenseParams, findAllExpensesParams } from './interfaces/expensesService.interface';
import { Expense, ExpenseDocument } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private ExpenseModel: Model<ExpenseDocument>) {}

  create({ expense }: createExpenseParams) {
    return this.ExpenseModel.create(expense);
  }

  findAll({ providerId }: findAllExpensesParams) {
    return this.ExpenseModel.find({ createdBy: providerId }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
