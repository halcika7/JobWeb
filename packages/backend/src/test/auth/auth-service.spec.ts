import { AuthService } from '@service/Auth';
import { createConnection } from 'typeorm';

import { shutdown } from '../utils';
import { LoginData, AccountType } from '@ctypes';

const service = new AuthService();

const data = {} as LoginData;

let connection: any = null;

beforeAll(async () => {
  connection = await createConnection();
});

afterAll(async () => {
  await connection.close();
  await shutdown();
});

describe('Testing auth service', () => {
  it('should throw error with status 400', async () => {
    try {
      await service.login(data);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('should throw error invalid account type', async () => {
    try {
      const type = 'ja' as AccountType;
      await service.register({ userData: {}, accountType: type });
    } catch (error) {
      expect(error.status).toBe(406);
    }
  });
});
