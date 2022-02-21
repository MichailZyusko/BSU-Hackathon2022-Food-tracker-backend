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

const description = `мука пшеничная, говядина, вода питьевая, свинина вареная, масло сливочное, лук репчатый, яичный порошок, филе птицы,
 соль поваренная пищевая йодированная (содержит антислеживающий агент Е536), пшеничная клетчатка, 
 комплексная пищевая добавка (молоко сухое обезжиреное, мальтодекстрин),
  масло подсолнечное, сахар,
   перец черный молотый, перец душистый молотый, кориандр молотый`;

(async (description) => {
  console.time('Time');

  const products = description.split(', ');
  console.log('Input: ', products);

  const data = (await Promise.all(products.map(async (product) => await searchProduct(product))))
    .filter((item) => !!item);

  const result = `${(data
    .reduce((acc, item, index) => (1 / index + 1) * ((item.grams + item.kcal) / 2)) * 12)
    .toFixed(2)} %`;

  console.log('Output: ', data);
  console.log('Result: ', result);
  console.timeEnd('Time');
})(description);
