import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

const params = (Item) => ({
  Bucket: 'greendatabase',
  Key: `${Item.id}.json`,
  Body: JSON.stringify(Item),
});

export default async (product) => {
  try {
    if (!product) return null;

    const param = params(product);

    await s3.upload(param).promise();
  } catch (e) {
    throw new Error(e);
  }
};
