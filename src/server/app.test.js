import supertest from 'supertest';

import app from './app';

const request = supertest(app);

describe('GET /api/health', () => {
  it('the status code should be 200.', async () => {
    request.get('/api/health').expect(200);
   
  });
});
