import axios from 'axios';
import getProductById from '../helpers/greenParserLambda/getProductById.js';
import createItem from '../helpers/greenParserLambda/createItem.js';

export const parserHandler = async () => {
  try {
    console.time('Time');
    for (let i = 0; i <= 100; i += 100) {
      const url = `https://green-dostavka.by/api/v1/products?storeId=2&skip=${i}`;

      const response = await axios.get(url);

      if (response.status !== 200) {
        continue;
      }

      response.data.items.map(async ({ id: productID }) => {
        const product = await getProductById(productID);

        await createItem(product);
      });
    }
    console.timeEnd('Time');
  } catch (error) {
    console.log(error);
  }
};
