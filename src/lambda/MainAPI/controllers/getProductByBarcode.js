import AWS from 'aws-sdk';

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3();

export default async (req, res, next) => {
  try {
    const { barcode } = req.params;

    console.log('getProductByBarcode', barcode);

    const { Body } = await s3.getObject({
      Bucket: 'greendatabase',
      Key: `${barcode}.json`,
    }).promise();

    console.log('getProductByBarcode', Body);

    if (!Body) {
      res.status(404).json({
        message: 'Product not found in database',
      });
    }

    res.status(200).json(JSON.parse(Body.toString('utf-8')));
  } catch (error) {
    next(error);
  }
};
