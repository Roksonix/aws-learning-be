import { middyfy } from '../../libs/lambda';
// import { formatJSONResponse } from '../../libs/api-gateway';
// import { productList } from '../__mockData__';

export const createProduct = async () => {
  // return formatJSONResponse({
  //   products: productList
  // });
};

export const main = middyfy(createProduct);
