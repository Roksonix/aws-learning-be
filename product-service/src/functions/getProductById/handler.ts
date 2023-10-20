import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { productList } from '@functions/__mockData__';

const getProductById = async () => {
  return formatJSONResponse(productList[0]);
};

export const main = middyfy(getProductById);
