import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getBalanceParams, listBalancesParams } from './interfaces/balance-services.interface';
import { Balance, BalanceDocument } from './schemas/balance.schema';

@Injectable()
export class BalancesService {
  constructor(@InjectModel(Balance.name) private BalanceModel: Model<BalanceDocument>) {}

  listBalances({ userId, limit = 10, offset = 0 }: listBalancesParams) {
    return this.BalanceModel.find({ userId })
      .sort({ year: -1, month: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  getBalance({ userId, month, year }: getBalanceParams) {
    return this.BalanceModel.find({ userId, month, year }).exec();
  }
}
