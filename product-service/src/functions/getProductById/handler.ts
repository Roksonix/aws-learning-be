import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { productList } from '../__mockData__';

export const getProductById = async (event) => {
    const { productId } = event.pathParameters;
    return formatJSONResponse(productList.find(({ id }) => id === productId));
};

export const main = middyfy(getProductById);
