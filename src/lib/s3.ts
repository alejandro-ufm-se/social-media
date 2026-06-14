import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.AWS_REGION ?? 'us-east-1';
const BUCKET = process.env.S3_BUCKET ?? 'social-media-ufm';

const client = new S3Client({ region: REGION });

export const getBucketName = (): string => BUCKET;

export const getPutObjectSignedUrl = async (
    key: string,
    contentType?: string,
    expiresInSeconds: number = 120,
): Promise<string> => {
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ...(contentType !== undefined && { ContentType: contentType }),
    });
    return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
};

export const getGetObjectSignedUrl = async (
    key: string,
    expiresInSeconds: number = 300,
): Promise<string> => {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
};
