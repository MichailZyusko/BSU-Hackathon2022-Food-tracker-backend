/* eslint-disable no-return-await */

import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

const params = (Item) => ({
  Bucket: 'substanedatabase',
  Key: `${Item.name}.json`,
  Body: JSON.stringify(Item),
});

const uploadToS3 = async (product) => {
  try {
    if (!product) return null;

    const param = params(product);

    return await s3.upload(param).promise();
  } catch (e) {
    throw new Error(e);
  }
};

export default async (itemsForUploading) => {
  try {
    itemsForUploading.forEach(async (item) => await uploadToS3(item));
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
