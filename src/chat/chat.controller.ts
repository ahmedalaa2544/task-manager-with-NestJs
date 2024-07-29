import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get()
  chat(): string {
    const chat = 'ahmed';
    return chat;
  }
}
