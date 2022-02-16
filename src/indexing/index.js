import { trigram } from 'n-gram';
import getAllFilesFromStore from './helpers/getFilesFromStore.js';
import { appendToFile } from './helpers/appendToFile.js';
import searchProduct from './helpers/searchProduct.js';

// (async ()=>{
//     console.time('Time');
//     const db = await getAllFilesFromStore();
//
//     db.forEach(async (word) => {
//         const nGrams = trigram(word);
//
//         await Promise.all(nGrams.map(async (nGram) => await appendToFile({ name: nGram, productName: word })));
//     });
//     console.timeEnd('Time');
// })()

const description = 'селдиарея, оахар, негуста';

(async (description)=>{
    console.time('Time');

    const products = description.split(', ');
    console.log('Input: ', products);

    const data = await Promise.all(products.map(async (product) => await searchProduct(product)));

    console.log('Output: ', data);
    console.timeEnd('Time');
})(description)

