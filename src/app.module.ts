import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDbModule } from './db/user/user-db/user-db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageDbService } from './db/message/message-db/message-db.service';
import { MessageDbModule } from './db/message/message-db/message-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ChatModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECTION_URL'),
      }),
      inject: [ConfigService],
    }),
    UserDbModule,
    MessageDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
