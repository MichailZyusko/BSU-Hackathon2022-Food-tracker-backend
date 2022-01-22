import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

export default async (Key) => {
  const data = await s3.getObject({
    Bucket: 'greendatabase',
    Key,
  }).promise();
  console.log(data);

  const result = JSON.parse(data.Body.toString('utf-8'));

  console.log(result);

  return result;
};
