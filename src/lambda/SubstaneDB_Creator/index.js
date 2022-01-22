import getAllSubstanceFromDescription from './helpers/getAllSubstanceFromDescription.js';
import createItem from './helpers/createItem.js';
import getAllItemsFromDB from './helpers/getAllItemsFromDB.js';
import getProductByID from './helpers/getProductByID.js';

export const handler = async () => {
  try {
    console.time('Time');

    const items = await getAllItemsFromDB();

    items.forEach(async (item) => {
      const { description } = await getProductByID(item);

      console.log(description);

      const arr = getAllSubstanceFromDescription(description);

      arr.forEach(async (item) => {
        await createItem(item);
      });
    });

    console.timeEnd('Time');
  } catch (error) {
    console.log(error);
  }
};
