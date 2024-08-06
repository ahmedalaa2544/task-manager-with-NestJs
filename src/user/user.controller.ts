import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationGuard } from '../guards/authentication/authentication.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signUp')
  signup(@Body() body: any) {
    return this.userService.signUp(body);
  }
}
