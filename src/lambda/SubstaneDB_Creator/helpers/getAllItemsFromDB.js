import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

const allFilesName = [];

const getItemsFromS3 = async (token) => {
  try {
    const params = { Bucket: 'greendatabase' };

    if (token) params.ContinuationToken = token;

    const listOfObjects = await s3.listObjectsV2(params).promise();
    const fileNames = listOfObjects.Contents.map(({ Key }) => Key);

    allFilesName.push(...fileNames);

    if (listOfObjects.IsTruncated) {
      await getItemsFromS3(listOfObjects.NextContinuationToken);
    } else {
      return allFilesName;
    }
  } catch (error) {
    console.error(error);
  }
};

export default async () => {
  await getItemsFromS3();

  return allFilesName;
};
