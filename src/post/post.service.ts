import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ExecutionContext,
  UnprocessableEntityException,
  Req,
} from '@nestjs/common';
import { Post } from '../DB/post/post-db/post.schema';
import { PostDbService } from 'src/db/post/post-db/post-db.service';
import { any } from 'joi';
@Injectable()
export class PostService {
  constructor(private readonly _postDbService: PostDbService) {}
  async creatPost(body: any): Promise<Post> {
    const post = await this._postDbService.create(body);
    return post;
  }
}
