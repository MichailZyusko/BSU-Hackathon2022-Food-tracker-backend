import axios from 'axios';
import getProductById from './helpers/getProductById.js';
import createItem from './helpers/createItem.js';

const MAX_PRODUCTS = process.env.MAX_PRODUCTS || 100;

export const handler = async () => {
  try {
    console.time('Time');
    for (let i = 0; i <= MAX_PRODUCTS; i += 100) {
      const url = `https://green-dostavka.by/api/v1/products?storeId=2&skip=${i}`;

      const response = await axios.get(url);

      if (response.status !== 200) {
        continue;
      }

      response.data.items
        .filter(({ energyCost }) => energyCost)
        .map(async ({ id: productID }) => {
          const product = await getProductById(productID);

          await createItem(product);
        });
    }
    console.timeEnd('Time');
  } catch (error) {
    console.log(error);
  }
};
