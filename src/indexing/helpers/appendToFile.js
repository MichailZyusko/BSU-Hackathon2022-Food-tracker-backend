import { promises as fs } from 'fs';

const isExistFile = async (filePath) => {
  try {
    await fs.stat(filePath);

    return true;
  } catch (err) {
    return false;
  }
};
export const readFile = async (filePath) => {
  const fileContent = await fs.readFile(filePath, 'utf8');

  return JSON.parse(fileContent);
};
export const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};
const appendFile = async (filePath, product) => {
  const fileContent = await readFile(filePath);

  if (fileContent.some((item) => item.name === product.name)) {
    throw new Error('Product already exist');
  }

  fileContent.push(product);

  return fileContent;
};

export const appendToFile = async ({ name, productName }) => {
  try {
    const dbFilePath = `./db/${productName}.json`;
    const nGramFilePath = `./n-grams/${name}.json`;

    const isExists = await isExistFile(nGramFilePath);
    const product = await readFile(dbFilePath);

    const data = isExists
      ? await appendFile(nGramFilePath, product)
      : [product];

    await writeFile(nGramFilePath, data);
  } catch (error) {
    console.error(error);
  }
};
