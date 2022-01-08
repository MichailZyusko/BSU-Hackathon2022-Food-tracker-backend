import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const db = new AWS.DynamoDB.DocumentClient();

const params = (Item) => ({
  TableName: 'substance',
  Item: {
    name: Item.name,
    quality: +Item.quality,
  },
});

export default async (product) => {
  try {
    if (!product) return null;

    const param = params(JSON.parse(JSON.stringify(product)));

    console.log(param);

    const putItem = await db.put(param).promise();

    return putItem;
  } catch (e) {
    throw new Error(e);
  }
};
