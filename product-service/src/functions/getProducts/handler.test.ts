import { expect, describe, it } from 'vitest';
import { getProducts } from './handler';
import { productList } from '../__mockData__';

describe('Lambda: getProducts', () => {
    it('Should return a list of products', async () => {
        const result = await getProducts();

        expect(result).toEqual({
            headers: expect.anything(),
            body: JSON.stringify({
                products: productList
            }),
            statusCode: 200
        })
    });
});
