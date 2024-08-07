import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';
@Injectable()
export class MessageDbService {
  constructor(
    @InjectModel(Message.name) private readonly _messageModel: Model<Message>,
  ) {}
  async findById(id: any): Promise<Message> {
    return this._messageModel.findById(id);
  }
  async create(object: any): Promise<Message> {
    return this._messageModel.create(object);
  }
}
