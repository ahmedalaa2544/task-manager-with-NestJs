import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDbModule } from '../DB/user/user-db/user-db.module'; // Import UserDbModule
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserDbModule],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
