import { BlobServiceClient } from '@azure/storage-blob';
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

function getAzureBlobStorageContainerClient() {
  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

  const containerName = 'client-upload';

  console.log('\nCreating container...');
  console.log('\t', containerName);

  // Get a reference to a container
  return blobServiceClient.getContainerClient(containerName);
}

async function uploadFile(fileData) {
  const containerClient = getAzureBlobStorageContainerClient();

  const blobName = `quickstart${crypto.randomUUID()}.txt`;

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log('\nUploading to Azure storage as blob:\n\t', blobName);

  // Upload data to the blob
  const data = 'Hello, World!';
  return await blockBlobClient.upload(fileData, fileData.length);
}

export default async function upload(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = 'Hello, World!';
    const uploadBlobResponse = await uploadFile(data);

    console.log('Blob was uploaded successfully. requestId: ', uploadBlobResponse.requestId);

    res.status(200).json(uploadBlobResponse);
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
