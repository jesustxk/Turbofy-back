const request = require('supertest');
const { expect } = require('expect');

const app = require('./app');

describe('Spoty controller', () => {

  it('search OK', async () => {
    const response = await request(app).get('/songs/spoty/read?searchParams=artist:Michael').send();

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response._body).toHaveLength(10);
  });
});

describe('Songs controller', () => {

  it('search OK', async () => {
    const response = await request(app).get('/songs/search').send();

    const response2 = await request(app).get('/songs/readAll').send();

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);

    expect(response2).toBeTruthy();
    expect(response2.status).toBe(200);

    expect(response._body).toEqual(response._body);
  });

  it('create and delete OK', async () => {
    const response = await request(app).post('/songs/create').send({ "name": "test" });

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);

    const response2 = await request(app).delete('/songs/delete?songId=' + response._body._id).send();

    expect(response2).toBeTruthy();
    expect(response2.status).toBe(200);

    const response3 = await request(app).get('/songs/read?songId=' + response._body._id).send();
    console.log(response3)
    expect(response3).toBeTruthy();
    expect(response3.status).toBe(404);
  });
});
