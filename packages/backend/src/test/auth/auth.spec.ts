/* eslint-disable import/no-extraneous-dependencies */
import { AuthController } from '@controller/Auth';
import { JWTService } from '@service/JWT';
import { createConnection } from 'typeorm';
import { shutdown } from '../utils';
import { mockResponse } from '../__mocks__/express';

let contr: any = null;
let connection: any = null;
const res = mockResponse();

beforeAll(async () => {
  connection = await createConnection();
  contr = new AuthController();
});

afterAll(async () => {
  await connection.close();
  await shutdown();
});

describe('Testing Auth controller', () => {
  it('Failed Login', async () => {
    try {
      await contr.login(
        {
          username: 'ajsojfdaisof',
          password: 'dsfoijdsjofjsd',
        },
        {
          limit: 5,
          current: 1,
          remaining: 4,
          resetTime: new Date(),
        },
        res
      );
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response.message).toBe(
        'Invalid email / username or password.'
      );
    }
  });

  // it('Success Login', async () => {
  //   await contr.login(
  //     {
  //       username: '**********',
  //       password: '**********',
  //     },
  //     {
  //       limit: 5,
  //       current: 1,
  //       remaining: 4,
  //       resetTime: new Date(),
  //     },
  //     res
  //   );

  //   expect(res.status).toHaveBeenCalledWith(200);
  // });

  it('Success LogOut', async () => {
    await contr.logout(res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Failed refresh', async () => {
    try {
      await contr.refreshToken('', res);
    } catch (error) {
      expect(error.status).toBe(401);
      expect(error.response.message).toBe('Invalid token...');
    }
  });

  it('Success refresh', async () => {
    const token = JWTService.signToken({ id: 1, role: 1 }, true);

    await contr.refreshToken(token, res);

    expect(res.status).toBeCalledWith(200);
  });

  it('should fail register', async () => {
    try {
      await contr.register({ userData: {}, accountType: 'user' }, res);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response.errors).toEqual({
        username: 'Username cannot exceed 15 characters',
        email: 'Please provide valid email',
        password:
          'Password needs to contain both lower and upper case characters, number and a special character',
        country: 'Please select valid country',
        city: 'Please select valid city',
        phone: 'Please provide valid phone number',
      });
    }
  });

  it('should fail phone number register', async () => {
    try {
      await contr.register(
        {
          userData: {
            username: 'halcika1678',
            email: 'halcika_788@hotmail.com',
            password: '@Qasuhdihuasd9',
            password2: '@Qasuhdihuasd9',
            phone: '61757388',
            country: 'Bosnia and Herzegovina',
            city: 'Sarajevo',
          },
          accountType: 'user',
        },
        res
      );
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response.errors).toEqual({
        phone: 'Please provide valid phone number',
      });
    }
  });

  it('should fail unique username', async () => {
    try {
      await contr.register(
        {
          userData: {
            username: 'halcika',
            email: 'halcika_788@hotmail.com',
            password: '@Qasuhdihuasd9',
            password2: '@Qasuhdihuasd9',
            phone: '+38761444444',
            country: 'Bosnia and Herzegovina',
            city: 'Sarajevo',
          },
          accountType: 'user',
        },
        res
      );
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response.errors).toEqual({
        username: 'Username is aready taken',
      });
    }
  });

  // it('should fail unique email', async () => {
  //   try {
  //     await contr.register(
  //       {
  //         userData: {
  //           username: 'halcikaoijioo',
  //           email: '********',
  //           password: '@Qasuhdihuasd9',
  //           password2: '@Qasuhdihuasd9',
  //           phone: '+38761444444',
  //           country: 'Bosnia and Herzegovina',
  //           city: 'Sarajevo',
  //         },
  //         accountType: 'user',
  //       },
  //       res
  //     );
  //   } catch (error) {
  //     expect(error.status).toBe(400);
  //     expect(error.response.errors).toEqual({
  //       email: 'Email already in use',
  //     });
  //   }
  // });

  it('should fail not equal passwords', async () => {
    try {
      await contr.register(
        {
          userData: {
            username: 'halcika1278',
            email: 'halcika_728@hotmail.com',
            password: '@Qasuhdihuasd9',
            password2: '@Qasuhdihasdasd9',
            phone: '+38761999999',
            country: 'Bosnia and Herzegovina',
            city: 'Sarajevo',
          },
          accountType: 'user',
        },
        res
      );
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response.errors).toEqual({
        password: 'Both passwords need to be the same',
      });
    }
  });
});
