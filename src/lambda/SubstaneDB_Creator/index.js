import getAllSubstanceFromDescription from './helpers/getAllSubstanceFromDescription.js';
import createItem from './helpers/createItem.js';
import getAllItemsFromDB from './helpers/getAllItemsFromDB.js';

export const handler = async () => {
  try {
    console.time('Time');

    const items = await getAllItemsFromDB();

    items.forEach(({ description }) => {
      const arr = getAllSubstanceFromDescription(description);

      arr.forEach(async (item) => {
        const putItem = await createItem(item);

        console.log('putItem: ', putItem);
      });
    });

    console.timeEnd('Time');
  } catch (error) {
    console.log(error);
  }
};
