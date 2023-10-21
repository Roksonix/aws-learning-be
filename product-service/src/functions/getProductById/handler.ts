import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { productList } from '../__mockData__';

export const getProductById = async () => {
  return formatJSONResponse(productList[0]);
};

export const main = middyfy(getProductById);
