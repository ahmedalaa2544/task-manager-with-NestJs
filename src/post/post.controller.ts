import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  UploadedFile,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { AuthenticationGuard } from '../guards/authentication/authentication.guard';
import { JoiValidationPipe } from '../pipes/joi-validatioin/joi-validation.pipe';
import { CommonUploadService } from '../upload/common-upload.service';
import { diskStorage } from 'multer';
import { createClient } from 'redis';
@Controller('post')
export class PostController {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: ReturnType<typeof createClient>,
    private readonly postService: PostService,
    private readonly commonUploadService: CommonUploadService,
  ) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({}),
    }),
  )
  async createPost(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(file);
    // // const testFilePath =
    // //   'C:\\Users\\ahmed\\Desktop\\nest chat app\\chat\\src\\post\\post.controller.ts';
    // const testBlobName = '\\test\\1.pdf';
    // const url = await this.commonUploadService.upload(file.path, testBlobName);
    // console.log(url);
    const value = await this.redisClient.get('ahmed');
    console.log(value);
    return this.postService.creatPost(body);
  }
}
