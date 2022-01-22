import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

export default async (Key) => {
  try {
    const data = await s3.getObject({
      Bucket: 'greendatabase',
      Key,
    }).promise();

    const product = JSON.parse(data.Body.toString('utf-8'));

    return product;
  } catch (e) {
    console.error(e);
  }
};
