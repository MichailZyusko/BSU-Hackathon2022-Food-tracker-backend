import axios from 'axios';

const greenProductDB =[];
const getProductByIdURL = 'https://green-dostavka.by/api/v1/products/';

const getProductById = async (productID) => {
  try {
    const response = await axios.get(`${getProductByIdURL}${productID}?storeId=2`);

    if (response.status === 200) {
      const { description, barcodes, title } = response.data;

      return !(description || barcodes)
          ? null
          : {
            title,
            barcode: barcodes[0]?.code,
            description,
          };
    }
  } catch (e) {
    console.error(e);
  }
};

console.time('Time');
for (let i = 0; i <= 500; i += 100) {
  const url =`https://green-dostavka.by/api/v1/products?storeId=2&skip=${i}`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    continue;
  }

  const productIDs = response.data.items.map((item) => item.id);

  productIDs.map(async (productID) => {
    const product = await getProductById(productID);

    greenProductDB.push(product);
  });
}
console.timeEnd('Time');

console.log(greenProductDB);
