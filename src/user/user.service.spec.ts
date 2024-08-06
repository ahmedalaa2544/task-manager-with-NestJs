import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDbService } from '../DB/user/user-db/user-db.service';
import { User } from '../DB/user/user-db/user.schema';

describe('UserService', () => {
  let service: UserService;
  let fakeUserDbService: Partial<UserDbService>;

  beforeEach(async () => {
    fakeUserDbService = {
      create: (object: any) => {
        return Promise.resolve({} as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserDbService,
          useValue: fakeUserDbService,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
