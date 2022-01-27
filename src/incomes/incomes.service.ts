import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { createIncomeParams, findAllIncomesParams } from './interfaces/incomesService.interface';
import { Income, IncomeDocument } from './schemas/income.schema';

@Injectable()
export class IncomesService {
  constructor(@InjectModel(Income.name) private IncomeModel: Model<IncomeDocument>) {}

  create({ income }: createIncomeParams) {
    return this.IncomeModel.create(income);
  }

  findAll({ providerId }: findAllIncomesParams) {
    return this.IncomeModel.find({ createdBy: providerId }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} income`;
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return `This action updates a #${id} income`;
  }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}
