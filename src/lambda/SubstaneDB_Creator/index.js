import getAllSubstanceFromDescription from './helpers/getAllSubstanceFromDescription.js';
import getAllItemsFromDB from './helpers/getAllItemsFromDB.js';
import getProductByID from './helpers/getProductByID.js';
import uploadItemsToS3 from './helpers/uploadItemsToS3.js';

export const handler = async () => {
  try {
    const items = await getAllItemsFromDB();

    items.forEach(async (item) => {
      const { description } = await getProductByID(item);

      const substances = getAllSubstanceFromDescription(description);

      await uploadItemsToS3(substances);
    });
  } catch (error) {
    console.log(error);
  }
};
