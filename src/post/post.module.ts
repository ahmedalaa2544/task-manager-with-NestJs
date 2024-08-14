import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostDbModule } from 'src/db/post/post-db/post-db.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [PostDbModule],
  controllers: [PostController],
  providers: [PostService, JwtService],
  exports: [PostService],
})
export class PostModule {}
