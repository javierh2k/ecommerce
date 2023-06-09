import supertest from 'supertest';
import getItemsMock from '../../test/mock/getItems'
import app from '../../app';
const request = supertest(app);

describe('Validate Finger Print', () => {
    it('should return my finger print', async () => {
        const resp = await request.get('/api/items');
        expect(resp.body.author).toEqual(getItemsMock.response.author);
    });
});


// describe('GET /api/items', () => {
//     it('should return an empty array', async () => {
//         const resp = await request.get('/api/items');
//         expect(resp.body).toEqual(getItemsMock.response);
//     });
// });

// describe('GET /api/items', () => {
//     it('Should show 4 items', async () => {
//         const resp = await request.get('/api/items?q=relevant');
//         expect(resp.body.items.length).toEqual(4);
//     });
// });


