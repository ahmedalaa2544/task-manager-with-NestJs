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
import { UserService } from './user.service';
import { AuthenticationGuard } from '../guards/authentication/authentication.guard';
import { SignupDTO, loginDTO } from './user.dtos';
import { JoiValidationPipe } from '../pipes/joi-validatioin/joi-validation.pipe';
import { signupSchema, loginSchema } from './user.joi';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signUp')
  @UsePipes(new JoiValidationPipe(signupSchema))
  signup(@Body() body: SignupDTO) {
    return this.userService.signUp(body);
  }
  @Post('login')
  login(@Body() body: any) {
    return this.userService.login(body);
  }

  @Post('sendMessage/:toId')
  @UseGuards(AuthenticationGuard)
  sendMessage(
    @Param('toId') toId: string,
    @Req() req: Request,
    @Body() body: any,
  ) {
    return this.userService.sendMessage(
      req as Request & { id: string },
      toId,
      body,
    );
  }

  @Get('getChatHistoryForUser/:userId')
  @UseGuards(AuthenticationGuard)
  getChatHistoryForUser(@Param('userId') userId: string, @Req() req: Request) {
    return this.userService.getMessages(
      req as Request & { id: string },
      userId,
    );
  }
}
