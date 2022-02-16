import getHarmfulnessBuSubstanceName from './helpers/getHarmfulnessBySubstanceName.js';

const description = 'сельдерей';

(async (description) => {
  console.time('Time');
  const arr = description.split(', ');

  for (const item of arr) {
    const harmfulness = await getHarmfulnessBuSubstanceName(item);
    console.log(`${item} - ${JSON.stringify(harmfulness, null, 2)}`);
  }
  console.timeEnd('Time');
})(description);
