import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model, FilterQuery } from 'mongoose';
@Injectable()
export class MessageDbService {
  constructor(
    @InjectModel(Message.name) private readonly _messageModel: Model<Message>,
  ) {}
  async find(object: FilterQuery<Message>): Promise<Message[]> {
    return this._messageModel.find(object);
  }
  async findById(id: any): Promise<Message> {
    return this._messageModel.findById(id);
  }
  async create(object: any): Promise<Message> {
    return this._messageModel.create(object);
  }
}
