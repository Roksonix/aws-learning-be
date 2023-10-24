import { expect, describe, it } from 'vitest';
import { getAvailable } from './handler';
import { productList } from '../__mockData__';

describe('Lambda: getAvailable', () => {
    it('Should return a list of products', async () => {
        const result = await getAvailable();

        expect(result).toEqual({
            headers: expect.anything(),
            body: JSON.stringify({
                products: productList
            }),
            statusCode: 200
        })
    });
});
