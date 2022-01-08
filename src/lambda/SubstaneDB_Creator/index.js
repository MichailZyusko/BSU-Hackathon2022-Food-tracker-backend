import getAllSubstanceFromDescription from './helpers/getAllSubstanceFromDescription.js';
import createItem from './helpers/createItem.js';
import getAllItemsFromDB from './helpers/getAllItemsFromDB.js';

export const handler = async () => {
  try {
    console.time('Time');

    const items = await getAllItemsFromDB();

    console.log(items);

    items.forEach(({ description }) => {
      console.log('description', description);
      const arr = getAllSubstanceFromDescription(description);

      console.log('arr', arr);

      arr.forEach(async (item) => {
        console.log('item: ', item);

        const putItem = await createItem(item);

        console.log('putItem: ', putItem);
      });
    });

    console.timeEnd('Time');
  } catch (error) {
    console.log(error);
  }
};
