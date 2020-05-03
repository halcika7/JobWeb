/* eslint-disable import/no-extraneous-dependencies */
import { CountryController } from '@controller/Country';
import { createConnection } from 'typeorm';

import { shutdown } from '../utils';
import { mockResponse } from '../__mocks__/express';

let contr: any = null;
let connection: any = null;
let res = mockResponse();

beforeAll(async () => {
  connection = await createConnection();
  contr = new CountryController();
});

afterAll(async () => {
  await connection.close();
  await shutdown();
});

describe('Testing Country Controller', () => {
  it('Get countries and cities', async () => {
    await contr.getCountries(res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Get countries and cities from redis', async () => {
    await contr.getCountries(res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Should throw an error', async () => {
    res = { ...res, json: null } as any;
    try {
      await contr.getCountries({});
    } catch (error) {
      expect(error.message).toBe('res.status is not a function');
    }
  });
});
