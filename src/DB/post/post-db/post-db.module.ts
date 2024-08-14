import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './post.schema';
import { PostDbService } from './post-db.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
  ],
  providers: [PostDbService],
  exports: [PostDbService],
})
export class PostDbModule {}
