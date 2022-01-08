import axios from 'axios';

const getProductByIdURL = 'https://green-dostavka.by/api/v1/products/';

export default async (productID) => {
  try {
    const response = await axios.get(`${getProductByIdURL}${productID}?storeId=2`);

    if (response.status !== 200) return null;

    const { description, barcodes, title } = response.data;

    if (barcodes[0].code.length !== 13) return null;

    return !(description || barcodes)
      ? null
      : JSON.parse(JSON.stringify({
        title,
        description,
        id: barcodes[0].code,
      }));
  } catch (e) {
    throw new Error(e);
  }
};
