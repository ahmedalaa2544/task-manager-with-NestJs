import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';
import { UserDbService } from './user-db.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserDbService],
  exports: [UserDbService],
}) // Export UserDbService for use in other modules})
export class UserDbModule {}
