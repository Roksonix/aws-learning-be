import { mapStocks } from "src/utils/mapStocks";
import { create, getAll, getById } from "./common";

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
};

export const createProduct = async ({ id, title, description, price, count }) => {
    const productItem = {
        id,
        title,
        description,
        price
    };
    const stocksItem = {
        id,
        count
    };

    const productResponse = await create(productItem, process.env.PRODUCTS_TABLE_NAME);
    if (!productResponse.success) return Promise.resolve(productResponse);

    const stocksResponse = await create(stocksItem, process.env.STOCKS_TABLE_NAME);
    if (!stocksResponse.success) return Promise.resolve(stocksResponse);

    return Promise.resolve({
        success: true,
        id
    });
};