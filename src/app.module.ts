import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    ChatModule,
    MongooseModule.forRoot(
      'mongodb+srv://elearninggradproject:8EdoYEX5LU05hE6U@cluster0.w2w9ary.mongodb.net/chat',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
