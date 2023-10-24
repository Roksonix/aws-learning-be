import { mapStocks } from "src/utils/mapStocks";
import { getAll, getById } from "./common";

export const getAllProducts = async () => {
    const products = await getAll(process.env.PRODUCTS_TABLE_NAME);
    const stocks = await getAll(process.env.STOCKS_TABLE_NAME);
    const mappedStocks = mapStocks(stocks.data);

    return products.data.map((product) => ({
        ...product,
        count: mappedStocks[product.id],
    }));
};

export const getProductById = async (id: string) => {
    const product = await getById(id, process.env.PRODUCTS_TABLE_NAME);
    const stocks = await getById(id, process.env.STOCKS_TABLE_NAME);

    return {
        ...product.data,
        count: stocks.data.count
    };
}
