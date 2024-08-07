import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class UserDbService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}
  async findById(id: any): Promise<User> {
    return this._userModel.findById(id);
  }
  async findOne(parameters: FilterQuery<User>): Promise<User> {
    return this._userModel.findOne(parameters);
  }
  async create(object: any): Promise<User> {
    return this._userModel.create(object);
  }
}
