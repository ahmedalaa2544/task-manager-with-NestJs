import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDbModule } from './db/user/user-db/user-db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AzureModule } from './azure/azure.module';
import { KeysModule } from './keys/keys.module';
import { ProjectDbModule } from './db/project/project-db/project-db.module';
import { TastDbService } from './db/task/tast-db/tast-db.service';
import { TastDbModule } from './db/task/tast-db/tast-db.module';
import { TassDbModule } from './db/task/tass-db/tass-db.module';
import { TaskDbService } from './db/task/task-db/task-db.service';
import { TaskDbModule } from './db/task/task-db/task-db.module';
//
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
    KeysModule,
    ProjectDbModule,
    TastDbModule,
    TassDbModule,
    TaskDbModule,
  ],
  controllers: [AppController],
  providers: [AppService, TastDbService, TaskDbService],
})
export class AppModule {}
