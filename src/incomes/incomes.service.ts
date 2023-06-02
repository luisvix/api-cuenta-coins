import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from '../balances/schemas/balance.schema';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { createIncomeParams, findAllIncomesParams } from './interfaces/incomesService.interface';
import { Income, IncomeDocument } from './schemas/income.schema';

@Injectable()
export class IncomesService {
  constructor(
    @InjectModel(Income.name) private IncomeModel: Model<IncomeDocument>,
    @InjectModel(Balance.name) private BalanceModel: Model<BalanceDocument>,
  ) {}

  async create({ income }: createIncomeParams) {
    const { createdBy: userId, operationDate = new Date(), amount } = income;
    const date = new Date(operationDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const [createdIncome] = await Promise.all([
      this.IncomeModel.create(income),
      this.BalanceModel.updateOne(
        { userId, year, month },
        { $inc: { incomes: amount, balance: amount } },
        { upsert: true },
      ),
    ]);

    return createdIncome;
  }

  findAll({ userId, filter }: findAllIncomesParams) {
    return this.IncomeModel.aggregate([
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
    return `This action returns a #${id} income`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return `This action updates a #${id} income`;
  }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}
