import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserDbService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}
  async findById(id: any): Promise<User> {
    return this._userModel.findById(id);
  }
  async create(object: any): Promise<User> {
    return this._userModel.create(object);
  }
}
