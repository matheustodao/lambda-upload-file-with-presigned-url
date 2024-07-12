import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { response } from './utils/response.js';
import crypto from 'node:crypto';

export async function handler(event) {
  const { filename } = JSON.parse(event.body);

  if (!filename) {
    return response({
      error: 'File is required'
    }, 400)
  }

  const s3Client = new S3Client({ region: 'us-east-2' });

  const command = new  PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: `uploads/images/${crypto.randomUUID()}-${filename}`, // Path to save in bucket
  })

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 })

  return response({ url })
}