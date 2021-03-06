import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from '../balances/schemas/balance.schema';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { createExpenseParams, findAllExpensesParams } from './interfaces/expensesService.interface';
import { Expense, ExpenseDocument } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<ExpenseDocument>,
    @InjectModel(Balance.name) private BalanceModel: Model<BalanceDocument>,
  ) {}

  async create({ expense }: createExpenseParams) {
    const { createdBy: userId, operationDate = new Date(), amount } = expense;
    const date = new Date(operationDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const [createdExpense] = await Promise.all([
      this.ExpenseModel.create(expense),
      this.BalanceModel.updateOne(
        { userId, year, month },
        { $inc: { expenses: amount, balance: -amount } },
        { upsert: true },
      ),
    ]);

    return createdExpense;
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
