import { User } from '@model/User';
import { BcryptService } from '@service/Bcrypt';
import { createConnection } from 'typeorm';
import { shutdown } from '../utils';

let connection: any = null;

beforeAll(async () => {
  connection = await createConnection();
});

afterAll(async () => {
  await connection.close();
  await shutdown();
});

describe('Testuser creation', () => {
  it('should make a new user', async () => {
    const password = '!Q1234567890';
    const user = new User();
    user.username = 'ufhiduffsassddf';
    user.email = 'aosjdiaadasdjdsoas';
    user.password = password;
    user.city = 'Zenica';
    user.country = 'Bosnia and Herzegovina';
    user.phone = '+38761111111';
    user.role = 1;

    try {
      const savedUser = await user.save();
      const compared = await BcryptService.compareValues(
        password,
        user.password
      );
      expect(savedUser.id).toBeGreaterThan(1);
      expect(compared).toBe(true);
    } catch (error) {
      expect(error.message).toBe(
        'duplicate key value violates unique constraint "UQ_fe0bb3f6520ee0469504521e710"'
      );
    }
  });
});
