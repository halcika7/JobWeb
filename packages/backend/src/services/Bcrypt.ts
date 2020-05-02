/* eslint-disable no-useless-constructor */
import bcrypt from 'bcryptjs';

export class BcryptService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async generateSalt(rounds = 10): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  static async hash(value: string, salt: string): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  static async compareValues(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
