import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const params = (Item) => ({
  TableName: 'greenProductsDB_0',
  Item: {
    title: Item.title,
    id: +Item.id,
    description: Item.description,
  },
});

export default async (product) => {
  try {
    const param = params(product);

    console.log(param);

    await docClient.put(param).promise();
  } catch (e) {
    throw new Error(e);
  }
};
