import { trigram } from 'n-gram';
import compare from 'string-similarity';
import { readFile } from './appendToFile.js';

const precision = 0.1;

const getBestProductByNGram = async (product, nGram) => {
  try {
    const arr = await readFile(`./n-grams/${nGram}.json`);

    const names = arr.map(({ name }) => name);
    const { bestMatch, bestMatchIndex } = compare.findBestMatch(product, names);

    // console.log(nGram);
    // console.table(names);

    return {
      ...arr[bestMatchIndex],
      rating: bestMatch.rating,
    };
  } catch (e) {
    // console.error(e);
  }
};

export default async (productName) => {
  try {
    const nGrams = trigram(productName);

    const products = (await Promise.all(nGrams.map(async (nGram) => await getBestProductByNGram(productName, nGram))))
      .filter((item) => !!item && item?.rating > precision);

    // console.table(products);

    let bestMatch = { rating: 0 };
    products.forEach(({ rating }, index) => {
      if (rating > bestMatch.rating) {
        bestMatch = { rating, index };
      }
    });

    return products[bestMatch.index];
  } catch (e) {
    console.error(e);
  }
};
