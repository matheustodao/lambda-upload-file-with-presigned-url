import multipart from 'lambda-multipart-parser';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { response } from './utils/response.js';
import crypto from 'node:crypto';

export async function handler(event) {
  const { files: [file] } = await multipart.parse(event);

  if (!file || file.fieldname !== 'file') {
    return response({
      error: 'File is required'
    }, 400)
  }

  const s3Client = new S3Client({ region: 'us-east-2' });

  const command = new  PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: `uploads/images/${crypto.randomUUID()}-${file.filename}`, // Path to save in bucket
    body: file.content,
  })

  await s3Client.send(command)

  return response(null, 204)
}