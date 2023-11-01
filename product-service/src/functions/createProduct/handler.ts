import { createProduct as create } from 'src/services/product.service';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (event) => {
  const { body } = event;

  if (!body) return formatJSONResponse(
    {
      data: null,
      message: "Please provide valid product data",
    },
    400
  );

  if (!body.title || !body.price) return formatJSONResponse(
    {
      data: null,
      message: "Please provide valid at least title and price for the product",
    },
    400
  );

  const productResponse = await create({
    ...body,
    id: uuidv4(),
  });

  return formatJSONResponse(
    productResponse,
    201
  );
};

export const main = middyfy(createProduct);
