import { BcryptService } from '@service/Bcrypt';

import { createConnection } from 'typeorm';
import { shutdown } from '../utils';

const value = 'djniasjdiisadasda';
const salt = '$2a$10$sHgM4eqnJ/GRCMPNoq3D6e';
const hash_org = '$2a$10$sHgM4eqnJ/GRCMPNoq3D6e.u8p/TnFeyZ88T0U1hLlzAtzhHG5VSO';
let connection: any = null;

describe('Testing Bcrypt service', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
    await shutdown();
  });
  test('should create salt', async () => {
    const salt_ = await BcryptService.generateSalt();
    expect(salt_).toBeTruthy();
  });

  test('should create hash', async () => {
    const hash = await BcryptService.hash(value, salt);
    expect(hash).toBe(hash_org);
  });

  test('should match  value with hash', async () => {
    const compared = await BcryptService.compareValues(value, hash_org);
    expect(compared).toBeTruthy();
  });
});
