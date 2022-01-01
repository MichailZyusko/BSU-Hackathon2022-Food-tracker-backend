const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const params = (Item) => ({
    TableName : 'greenProductsDB',
    Item,
});

export default async (product) => {
    try {
        await docClient.put(params).promise();
    } catch (err) {
        return err;
    }
};