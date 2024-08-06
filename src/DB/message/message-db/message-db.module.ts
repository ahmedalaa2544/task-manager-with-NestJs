import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, messageSchema } from './message.schema';
import { MessageDbService } from './message-db.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: messageSchema }]),
  ],
  providers: [MessageDbService],
  exports: [MessageDbService],
})
export class MessageDbModule {}
