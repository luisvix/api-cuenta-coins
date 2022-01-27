import { User, UserDocument } from './schemas/user.schema';
import { CreateUserParams, FindOneUserParams } from './interfaces/usersService.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  create({ user }: CreateUserParams) {
    const createdUser = new this.UserModel(user);
    return createdUser.save();
  }

  async updateOrCreate({ user }: CreateUserParams) {
    await this.UserModel.updateOne({ providerId: user.providerId }, user, {
      upsert: true,
    }).exec();
  }

  async findOne({ providerId, id }: FindOneUserParams) {
    const filter: any = { providerId };
    if (id) filter._id = new ObjectId(id);
    const user = await this.UserModel.findOne(filter).exec();
    if (!user) {
      throw new NotFoundException('User introduced was not found');
    }
    return user;
  }
}
