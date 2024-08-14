import { Test, TestingModule } from '@nestjs/testing';
import { CommonUploadService } from './common-upload.service';

describe('CommonUploadService', () => {
  let service: CommonUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonUploadService],
    }).compile();

    service = module.get<CommonUploadService>(CommonUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
