import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { User } from '../DB/user/user-db/user.schema';
import { UserDbService } from '../DB/user/user-db/user-db.service';

@Injectable()
export class UserService {
  constructor(private readonly _userDbService: UserDbService) {}

  async signUp(body: any): Promise<User> {
    const user = await this._userDbService.create({
      ...body,
    });
    return user;
  }
}
