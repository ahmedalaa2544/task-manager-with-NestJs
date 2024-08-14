import { Injectable } from '@nestjs/common';
import { AzureService } from 'src/azure/azure.service';
import temp from 'temp';

@Injectable()
export class CommonUploadService {
  constructor(private readonly azureService: AzureService) {}

  async upload(
    inputFilePath: string,
    blobName,
    type: 'video' | 'file',
    fileExtension,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // Initialize the temp module for temporary directory management
      temp.track();

      // Create a temporary directory
      temp.mkdir('upload', async (err, tempDirPath) => {});
      // Generate a Shared Access Signature (SAS) URL for secure blob access
      const { accountSasTokenUrl, fileUrl } =
        await this.azureService.generateSASUrl(blobName, 'racwd', 100);
    });
  }
}
// // Common logic here
// // You can have conditions based on type to handle specific logic
// if (type === 'video') {
//   // Specific logic for video
// } else if (type === 'file') {
//   // Specific logic for file
// }

// // Code that is common for both video and file
// // ...
