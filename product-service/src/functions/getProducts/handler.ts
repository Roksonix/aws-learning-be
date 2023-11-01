import { middyfy } from '../../libs/lambda';
import { formatJSONResponse } from '../../libs/api-gateway';
import { getAllProducts } from 'src/services/product.service';

export const getProducts = async () => {
  const result = await getAllProducts();

  return formatJSONResponse({
    products: result,
    isMock: false
  });
};

export const main = middyfy(getProducts);
