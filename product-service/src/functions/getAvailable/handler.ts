import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { productList } from '@functions/__mockData__';

const getAvailable = async () => {
  return formatJSONResponse({
    products: productList
  });
};

export const main = middyfy(getAvailable);
