import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.schema';
import { Model, FilterQuery } from 'mongoose';
@Injectable()
export class PostDbService {
  constructor(
    @InjectModel(Post.name) private readonly _postModel: Model<Post>,
  ) {}
  async create(object: any): Promise<Post> {
    return this._postModel.create(object);
  }
}
