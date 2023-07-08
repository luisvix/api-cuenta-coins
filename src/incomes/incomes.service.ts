import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateTime } from 'luxon';
import { Balance, BalanceDocument } from '../balances/schemas/balance.schema';
import { UpdateIncomeDto } from './dto/update-income.dto';
import {
  createIncomeParams,
  createManyIncomesParams,
  findAllIncomesParams,
} from './interfaces/incomesService.interface';
import { Income, IncomeDocument } from './schemas/income.schema';
import { FrequencyOfMovements } from '../common/constants';

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
    console.log('year', year);

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

  async createMany({ income, frequency, numberOfMovements }: createManyIncomesParams) {
    const { createdBy: userId, operationDate = new Date(), amount } = income;
    const date = DateTime.fromJSDate(new Date(operationDate));
    const auxAmount = amount / numberOfMovements;
    let newDate;
    const incomes = [];
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

      incomes.push({
        ...income,
        description: `${income.description} ${index + 1} de ${numberOfMovements}`,
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
          update: { $inc: { incomes: auxAmount, balance: auxAmount } },
          upsert: true,
        },
      });
    });

    const [createdIncomes] = await Promise.all([
      this.IncomeModel.insertMany(incomes),
      this.BalanceModel.bulkWrite(operations),
    ]);

    return createdIncomes[0];
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
