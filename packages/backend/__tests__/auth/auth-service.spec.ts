import { AuthService } from '@service/Auth';
import { createConnection } from 'typeorm';

import { shutdown, makeString } from '../utils';
import { LoginData, AccountType } from '@ctypes';

const service = new AuthService();

const data = {} as LoginData;

let connection: any = null;

describe('Testing auth service', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
    await shutdown();
  });
  test('should throw error with status 400', async () => {
    try {
      await service.login(data);
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  test('should throw error invalid account type', async () => {
    try {
      const type = 'ja' as AccountType;
      await service.register({ userData: {}, accountType: type });
    } catch (error) {
      expect(error.status).toBe(406);
    }
  });

  test('should make new account', async () => {
    try {
      const user = await service.register({
        userData: {
          city: 'Zenica',
          country: 'Bosnia and Herzegovina',
          password: '@!Vv1234567890',
          password2: '@!Vv1234567890',
          phone: '+38761111111',
          email: `${makeString(5)}@gmail.com`,
          username: `${makeString(10)}`,
        },
        accountType: 'user',
      });
      expect(user.status).toBe(200);
    } catch (error) {
      expect(error.status).toBe(406);
    }
  });
});
