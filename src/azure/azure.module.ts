import { Module } from '@nestjs/common';
import { AzureService } from './azure.service';
import { UploadModule } from 'src/upload/upload.module';
@Module({
  imports: [UploadModule],
  providers: [AzureService],
  exports: [AzureService],
})
export class AzureModule {}
