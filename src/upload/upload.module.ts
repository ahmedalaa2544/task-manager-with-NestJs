import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { AzureModule } from '../azure/azure.module';
import { CommonUploadService } from './common-upload.service';
@Module({
  imports: [AzureModule],
  providers: [UploadService, CommonUploadService],
  exports: [UploadService],
})
export class UploadModule {}
