import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { S3Client } from "@aws-sdk/client-s3";
import { SNSClient } from "@aws-sdk/client-sns";
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION || 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

export const cognitoClient = new CognitoIdentityProviderClient({ region, credentials });
export const s3Client = new S3Client({ region, credentials });
export const snsClient = new SNSClient({ region, credentials });

export const AWS_CONFIG = {
  COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
  S3_BUCKET: process.env.AWS_S3_BUCKET,
  SNS_PLATFORM_ARN: process.env.AWS_SNS_PLATFORM_ARN,
};
