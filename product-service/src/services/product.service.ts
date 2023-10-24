import { mapStocks } from "src/utils/mapStocks";
import { getAll } from "./common";

export const getAllProducts = async () => {
    const products = await getAll(process.env.PRODUCTS_TABLE_NAME);
    const stocks = await getAll(process.env.STOCKS_TABLE_NAME);
    const mappedStocks = mapStocks(stocks.data);

    return products.data.map((product) => ({
        ...product,
        count: mappedStocks[product.id],
    }));
};
