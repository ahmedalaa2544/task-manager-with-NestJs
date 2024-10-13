import { Injectable } from '@nestjs/common';

@Injectable()
export class KeysService {
  usersIndex() {
    return 'idx:users';
  }
  usersKey(itemId: string) {
    return `items#${itemId}`;
  }
}
