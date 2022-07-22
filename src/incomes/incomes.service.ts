import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Balance, BalanceDocument } from '../balances/schemas/balance.schema';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { createIncomeParams, findAllIncomesParams } from './interfaces/incomesService.interface';
import { Income, IncomeDocument } from './schemas/income.schema';

@Injectable()
export class IncomesService {
  constructor(
    @InjectModel(Income.name) private IncomeModel: Model<IncomeDocument>,
    @InjectModel(Balance.name) private BalanceModel: Model<BalanceDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create({ income }: createIncomeParams) {
    const session = await this.connection.startSession();
    let createdIncome;

    session.withTransaction(async () => {
      const { createdBy: userId, operationDate, amount } = income;
      const year = operationDate.getFullYear();
      const month = operationDate.getMonth() + 1;
      [createdIncome] = await Promise.all([
        this.IncomeModel.create([income], { session }),
        this.BalanceModel.updateOne(
          { userId, year, month },
          { $inc: { expenses: amount, balance: amount } },
          { session },
        ),
      ]);
    });

    session.endSession();

    return createdIncome;
  }

  findAll({ providerId }: findAllIncomesParams) {
    return this.IncomeModel.find({ createdBy: providerId }).exec();
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
