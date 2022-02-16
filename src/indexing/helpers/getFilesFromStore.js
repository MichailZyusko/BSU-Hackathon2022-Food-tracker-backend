import fs from 'fs';

export default async () => {
    try  {
        const files = await fs.promises.readdir('./db');

        const filesName = files.map((file) => file.slice(0, -5));

        return filesName;
    } catch (e) {
        console.error(e);
    }
};