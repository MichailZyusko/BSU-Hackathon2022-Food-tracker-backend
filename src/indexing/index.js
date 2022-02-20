// import { trigram } from 'n-gram';
// import getAllFilesFromStore from './helpers/getFilesFromStore.js';
// import { appendToFile } from './helpers/appendToFile.js';
// import spreadJSON from './helpers/spreadJSON.js';
import searchProduct from './helpers/searchProduct.js';

// (async () => {
//   console.time('Time');
//   const db = await getAllFilesFromStore();
//
//   let index = 0;
//
//   for (const word of db) {
//     const nGrams = trigram(word);
//
//     for (const nGram of nGrams) {
//       await appendToFile({ name: nGram, productName: word });
//     }
//
//     console.clear();
//     console.log(((++index / db.length) * 100).toFixed(2));
//   }
//
//   // await Promise.all(db.map(async (word) => {
//   //
//   // }));
//
//   console.timeEnd('Time');
// })();

const description = 'филе сельди*, масло подсолнечное (С) или рапсовое (D), соль, регуляторы кислотности винная, лимонная кислоты, усилитель вкуса и аромата глутамат натрия 1-замещенный, смесь пряностей, консерванты бензоат натрия, сорбат калия';

(async (description) => {
  console.time('Time');

  const products = description.split(', ');
  console.log('Input: ', products);

  const data = (await Promise.all(products.map(async (product) => await searchProduct(product))))
    .filter((item) => !!item);

  console.log('Output: ', data);
  console.timeEnd('Time');
})(description);
