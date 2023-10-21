import { expect, describe, it } from 'vitest';
import { getProductById } from './handler';
import { productList } from '../__mockData__';

describe('Lambda: getProducts', () => {
    it('Should return a list of products', async () => {
        const result = await getProductById();

        expect(result).toEqual({
            headers: expect.anything(),
            body: JSON.stringify(productList[0]),
            statusCode: 200
        })
    });
});
