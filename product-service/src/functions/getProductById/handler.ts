import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { getProductById as get } from 'src/services/product.service';

export const getProductById = async (event) => {
    const { productId } = event.pathParameters;
    const result = await get(productId);

    return formatJSONResponse({
        ...result,
        isMock: false
    });
};

export const main = middyfy(getProductById);
