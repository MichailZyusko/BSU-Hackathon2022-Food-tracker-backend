const getProductByIdURL = 'https://green-dostavka.by/api/v1/products/';

export default async (productID) => {
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