import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { productList } from '../__mockData__';

export const getProducts = async () => {
  return formatJSONResponse({
    products: productList
  });
};

export const main = middyfy(getProducts);
