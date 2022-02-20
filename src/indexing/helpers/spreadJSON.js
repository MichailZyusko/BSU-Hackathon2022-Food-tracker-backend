import { readFile, writeFile } from './appendToFile.js';

export default async () => {
  const data = await readFile('./substane-db/meals.json');

  const formattedData = data.map((item) => ({
    grams: +(Number.parseFloat(item?.benefit_g) / 1e2).toFixed(3),
    kcal: +(Number.parseFloat(item?.benefit_kkal) / 1e2).toFixed(3),
    category: item?.category,
    name: item?.name,
  }));

  await Promise.all(formattedData.map(async (item) => {
    await writeFile(`./db/${item.name}.json`, item);
  }));
};
