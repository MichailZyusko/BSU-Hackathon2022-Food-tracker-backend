import axios from 'axios';

import getProductById from '../helpers/getProductByID.js';
import createItem from '../helpers/createNewItemInDynamoDB.js';

export const parserHandler = async (event) => {
    try {
        console.time('Time');
        for (let i = 0; i <= 100; i += 100) {
            const url =`https://green-dostavka.by/api/v1/products?storeId=2&skip=${i}`;

            const response = await axios.get(url);

            if (response.status !== 200) {
                continue;
            }

           response.data.items.map( async ({id: productID}) => i{
                const product = await getProductById(productID);

                createItem(product);
            });

        }
        console.timeEnd('Time');
    }
    catch (error) {
        console.log(error);
    }
};