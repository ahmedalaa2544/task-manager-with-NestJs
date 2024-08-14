import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthenticationGuard } from '../guards/authentication/authentication.guard';
import { JoiValidationPipe } from '../pipes/joi-validatioin/joi-validation.pipe';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async createPost(@Body() body: any) {
    console.log(body);
    return this.postService.creatPost(body);
  }
}
