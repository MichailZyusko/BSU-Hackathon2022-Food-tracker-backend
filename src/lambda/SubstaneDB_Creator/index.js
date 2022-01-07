import AWS from 'aws-sdk';
import { v4 as id } from 'uuid';

const awsConfig = {
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

const scanParams = {
  TableName: 'greenProductsDB_0',
};
//
// const putParams = (Item) => {
//   const formattedItem = JSON.parse(JSON.stringify(Item));
//
//   console.log('formattedItem: ', {
//     id: formattedItem.id,
//     name: formattedItem.name,
//     quality: +formattedItem.quality,
//   });
//
//   return {
//     TableName: 'substance_0',
//     Item: {
//       id: formattedItem.id,
//       name: formattedItem.name,
//       quality: +formattedItem.quality,
//     },
//   };
// };

AWS.config.update(awsConfig);

const db = new AWS.DynamoDB.DocumentClient();

export const handler = async () => {
  try {
    console.time('Time');

    const { Items: items } = await db.scan(scanParams).promise();

    items.forEach(({ description }) => {
      const arr = description
        .split(', ')
        .map((item) => ({
          id: Math.random(),
          name: item,
          quality: 0,
        }));

      arr.forEach(async (item) => {
        console.log('item: ', item);

        const putItem = await db.put({
          TableName: 'substance_0',
          Item: JSON.parse(JSON.stringify(item)),
        }).promise();

        console.log('putItem: ', putItem);
      });
    });

    console.timeEnd('Time');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Failed',
      }),
    };
  }
};
