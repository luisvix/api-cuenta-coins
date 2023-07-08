import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from '../balances/schemas/balance.schema';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {
  createExpenseParams,
  createManyExpensesParams,
  findAllExpensesParams,
} from './interfaces/expensesService.interface';
import { Expense, ExpenseDocument } from './schemas/expense.schema';
import { DateTime } from 'luxon';
import { FrequencyOfMovements } from '../common/constants';

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

  async createMany({ expense, frequency, numberOfMovements }: createManyExpensesParams) {
    const { createdBy: userId, operationDate = new Date(), amount } = expense;
    const date = DateTime.fromJSDate(new Date(operationDate));
    const auxAmount = amount / numberOfMovements;

    let newDate;
    const expenses = [];
    const operations = [];

    Array.from({ length: numberOfMovements }).forEach((_, index) => {
      if (frequency === FrequencyOfMovements.monthly) {
        newDate = date.plus({ months: index });
      } else if (frequency === FrequencyOfMovements.weekly) {
        newDate = date.plus({ weeks: index });
      } else if (frequency === FrequencyOfMovements.biweekly) {
        newDate = date.plus({ weeks: index * 2 });
      } else if (frequency === FrequencyOfMovements.yearly) {
        newDate = date.plus({ years: index });
      }

      expenses.push({
        ...expense,
        description: `${expense.description} ${index + 1} de ${numberOfMovements}`,
        operationDate: newDate.toISO(),
        amount: auxAmount,
      });

      operations.push({
        updateOne: {
          filter: {
            userId,
            year: newDate.year,
            month: newDate.month,
          },
          update: { $inc: { expenses: auxAmount, balance: -auxAmount } },
          upsert: true,
        },
      });
    });

    const [createdExpenses] = await Promise.all([
      this.ExpenseModel.insertMany(expenses),
      this.BalanceModel.bulkWrite(operations),
    ]);

    return createdExpenses[0];
  }

  findAll({ userId, filter }: findAllExpensesParams) {
    return this.ExpenseModel.aggregate([
      {
        $project: {
          _id: true,
          description: true,
          amount: true,
          paymentMethod: true,
          category: true,
          operationDate: true,
          createdBy: true,
          month: {
            $month: '$operationDate',
          },
          year: {
            $year: '$operationDate',
          },
        },
      },
      {
        $match: {
          createdBy: userId,
          month: filter.month,
          year: filter.year,
        },
      },
      {
        $sort: {
          operationDate: -1,
        },
      },
    ]).exec();
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
