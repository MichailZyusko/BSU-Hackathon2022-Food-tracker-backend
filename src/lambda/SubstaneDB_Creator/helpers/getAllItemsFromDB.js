import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const db = new AWS.DynamoDB.DocumentClient();

export default async () => {
  const { Items: items } = await db.scan({
    TableName: 'greenProductsDB_0',
    ProjectionExpression: 'description',
  }).promise();

  return items;
};
