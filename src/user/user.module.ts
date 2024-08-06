import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDbModule } from '../DB/user/user-db/user-db.module'; // Import UserDbModule
import { MessageDbModule } from '../DB/message/message-db/message-db.module'; // Import UserDbModule
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserDbModule, MessageDbModule],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
