import { Injectable, BadRequestException } from '@nestjs/common';
import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  SASProtocol,
  StorageSharedKeyCredential,
  BlockBlobClient,
} from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { object } from 'joi';
type SASUrlResult =
  | {
      accountSasTokenUrl: string;
      fileUrl: string;
    }
  | string;

@Injectable()
export class AzureService {
  constructor(private readonly configService: ConfigService) {}
  private readonly accountName: string =
    this.configService.get<string>('ACCOUNT_NAME');
  private readonly accountKey: string =
    this.configService.get<string>('ACCOUNT_KEY');
  private readonly mainContainer: string =
    this.configService.get<string>('MAIN_CONTAINER');
  /**
   * Creates a new container in Azure Blob Storage or retrieves an existing one.
   */
  async createContainer(
    containerName: string,
    blobServiceClient: BlobServiceClient,
  ): Promise<ContainerClient> {
    // Obtain a ContainerClient for the specified container name.
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Attempt to create the container if it does not already exist.
    // This is an asynchronous operation, so we use the 'await' keyword.
    await containerClient.createIfNotExists();

    // Return the ContainerClient instance for the created or existing container.
    return containerClient;
  }

  /**
   * Creates and returns a BlobServiceClient instance for interacting with Azure Blob Storage.
   */
  async getBlobServiceClient(): Promise<BlobServiceClient> {
    // Create a StorageSharedKeyCredential using the provided service name and key.
    const sharedKeyCredential = new StorageSharedKeyCredential(
      this.accountName,
      this.accountKey,
    );

    // Create a BlobServiceClient instance using the Storage account URL and shared key credential.
    const blobServiceClient = new BlobServiceClient(
      `https://${this.accountName}.blob.core.windows.net`,
      sharedKeyCredential,
    );

    // Return the configured BlobServiceClient for further use.
    return blobServiceClient;
  }

  /**
   * Generates a Shared Access Signature (SAS) URL for a specified blob in Azure Blob Storage.
   */
  async generateSASUrl(blobName: string, permissions = 'r', timerange = 1) {
    // Specify the container name for temporary uploads
    const containerName = this.mainContainer;

    const serviceName = this.accountName;
    const serviceKey = this.accountKey;

    // Check if required parameters are provided
    if (!serviceName || !serviceKey || !blobName || !containerName) {
      throw new BadRequestException('Generate SAS function missing parameters');
    }

    // Create BlobServiceClient using provided credentials
    const blobServiceClient = await this.getBlobServiceClient();

    // Create or retrieve the container using the BlobServiceClient
    const containerClient = await this.createContainer(
      containerName,
      blobServiceClient,
    );

    // Get the BlockBlobClient for the specified file in the container
    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

    // Best practice: create time limits
    const duration = timerange * 60 * 1000;
    const NOW = new Date();

    NOW.setMinutes(NOW.getMinutes() - 5);
    // Generate SAS URL for the blob with specified permissions and time limits
    const accountSasTokenUrl = await blockBlobClient.generateSasUrl({
      // startsOn: NOW,
      expiresOn: new Date(new Date().valueOf() + duration),
      permissions: BlobSASPermissions.parse(permissions),
      protocol: SASProtocol.Https,
    });
    // Return an object containing the SAS token URL and the URL of the blob
    return {
      accountSasTokenUrl: accountSasTokenUrl,
      fileUrl: blockBlobClient.url,
    };
  }
  async createBlockBlobClient(sasTokenUrl: string) {
    const blockBlobClient = new BlockBlobClient(sasTokenUrl);
    return blockBlobClient;
  }
}
