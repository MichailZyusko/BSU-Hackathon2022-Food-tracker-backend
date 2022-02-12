import cherio from 'cherio';
import compare from 'string-similarity';

export default async (substane, listHtml) => {
  const $ = await cherio.load(listHtml);
  const arr = Array.from($('.mzr-tree-node'));
  const names = arr.map(({ children: [el] }) => el?.data);
  const { ratings } = compare.findBestMatch(substane, names);
  let bestMatch = { rating: 0 };
  ratings.forEach(({ rating, target }, index) => {
    if (rating > bestMatch.rating) {
      bestMatch = { rating, target, index };
    }
  });
  console.log('Best match: ', bestMatch);

  return bestMatch;
};
