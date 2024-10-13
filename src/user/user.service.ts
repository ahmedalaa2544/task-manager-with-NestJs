import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ExecutionContext,
  UnprocessableEntityException,
  Req,
} from '@nestjs/common';

import { User } from '../DB/user/user-db/user.schema';
import { UserDbService } from '../DB/user/user-db/user-db.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly _userDbService: UserDbService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(body: any): Promise<User> {
    const isExist = await this._userDbService.findOne({ email: body?.email });

    if (isExist) {
      throw new UnprocessableEntityException('User already exists');
    }
    const hashPassword = await bcrypt.hash(body?.password, 10);

    const user = await this._userDbService.create({
      ...body,
      password: hashPassword,
    });

    return { ...body, password: undefined };
  }

  async login(body: any): Promise<{ access_token: string }> {
    const user = await this._userDbService.findOne({ email: body?.email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isMatch = bcrypt.compare(body?.password, user?.password);

    if (!isMatch) throw new BadRequestException('Invalid credentials!');

    const payload = { name: user.name, id: user['_id'] };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { access_token };
  }
}
