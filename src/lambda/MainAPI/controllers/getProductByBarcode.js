import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  endpoint: process.env.endpoint,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const db = new AWS.DynamoDB.DocumentClient();
// const db = new AWS.DynamoDB.DocumentClient({ params: { TableName: 'greenProductsDB_0' } });

const param = (barcode) => ({
  TableName: 'greenProductsDB_0',
  Key: { id: { N: barcode.toString() } },
});

export default async (req, res, next) => {
  try {
    const { barcode } = req.params;

    console.log('getProductByBarcode', barcode);

    const product = await db.get(param(barcode)).promise();

    console.log('getProductByBarcode', product);

    if (!product) {
      res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};
