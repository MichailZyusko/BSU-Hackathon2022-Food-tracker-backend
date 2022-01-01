const axios = require('axios');
const AWS = require('aws-sdk');

const awsConfig = {
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "AKIA4FAQIRYILQUIV5XS",
  "secretAccessKey": "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"
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();
const getProductByIdURL = 'https://green-dostavka.by/api/v1/products/';

const params = (Item) => ({
  "TableName" : "greenProductsDB_0",
  "Item" : {
    "title": Item.title,
    "id": Number.parseInt(Item.id),
    "description": Item.description,
  },
});

const createItem = async (product) => {
  try {
    const param = params(product);

    console.log(param);

    await docClient.put(param).promise();
  } catch (err) {
    return err;
  }
};

const getProductById = async (productID) => {
  try {
    const response = await axios.get(`${getProductByIdURL}${productID}?storeId=2`);

    if (response.status === 200) {
      const { description, barcodes, title } = response.data;

      return !(description || barcodes)
          ? null
          : JSON.parse(JSON.stringify({
            "title": title,
            "id": barcodes[0].code,
            "description": description,
          }));
    }
  } catch (e) {
    console.error(e);
  }
};

exports.parserHandler = async (event) => {
  try {
    console.time('Time');
    for (let i = 0; i <= 100; i += 100) {
      const url =`https://green-dostavka.by/api/v1/products?storeId=2&skip=${i}`;

      const response = await axios.get(url);

      if (response.status !== 200) {
        continue;
      }

      response.data.items.map( async ({id: productID}) => {
        const product = await getProductById(productID);

        await createItem(product);
      });

    }
    console.timeEnd('Time');
  }
  catch (error) {
    console.log(error);
  }
};