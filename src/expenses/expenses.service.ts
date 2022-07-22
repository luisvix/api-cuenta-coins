import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Balance, BalanceDocument } from '../balances/schemas/balance.schema';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { createExpenseParams, findAllExpensesParams } from './interfaces/expensesService.interface';
import { Expense, ExpenseDocument } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<ExpenseDocument>,
    @InjectModel(Balance.name) private BalanceModel: Model<BalanceDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create({ expense }: createExpenseParams) {
    const session = await this.connection.startSession();
    let createdExpense;

    session.withTransaction(async () => {
      const { createdBy: userId, operationDate, amount } = expense;
      const year = operationDate.getFullYear();
      const month = operationDate.getMonth() + 1;
      [createdExpense] = await Promise.all([
        this.ExpenseModel.create([expense], { session }),
        this.BalanceModel.updateOne(
          { userId, year, month },
          { $inc: { expenses: amount, balance: -amount } },
          { session },
        ),
      ]);
    });

    session.endSession();

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
