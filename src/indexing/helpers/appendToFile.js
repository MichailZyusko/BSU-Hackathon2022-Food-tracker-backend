import { promises as fs } from 'fs';
import * as path from "path";

const isExistFile = async (filePath) => {
    try {
        await fs.stat(filePath);

        return true;
    } catch (err) {
        return false;
    }
};
export const readFile = async (filePath) => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');

        return JSON.parse(fileContent);
    } catch (err) {
        throw err;
    }
};
const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch (err) {
        throw err;
    }
};
const appendFile = async (filePath, product) => {
    try {
        const fileContent = await readFile(filePath);

        if (fileContent.some((item) => item.name === product.name)) {
            throw new Error('Product already exist');
        }

        fileContent.push(product);

       return fileContent;
    } catch (err) {
        throw err;
    }
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
        // console.error(error);
    }
}