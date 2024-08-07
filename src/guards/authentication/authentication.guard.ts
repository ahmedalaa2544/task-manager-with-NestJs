import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDbService } from '../../DB/user/user-db/user-db.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userDbService: UserDbService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new UnauthorizedException();

    const access_token = authHeader.split(' ')[1];
    try {
      const payload = this._jwtService.verify(access_token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request.id = payload.id;
      const user = await this._userDbService.findById(payload.id);

      if (!user) throw new NotFoundException('User not found!');
      // pass user in the request
      request.user = user;

      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
