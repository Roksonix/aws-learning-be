import { expect, describe, it } from 'vitest';
import { getProductById } from './handler';
import { productList } from '../__mockData__';

describe('Lambda: getProducts', () => {
    it('Should return a list of products', async () => {
        const result = await getProductById({
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
            }
        });

        expect(result).toEqual({
            headers: expect.anything(),
            body: JSON.stringify(productList[0]),
            statusCode: 200
        })
    });
});
