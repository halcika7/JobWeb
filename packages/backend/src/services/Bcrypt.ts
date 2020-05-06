import bcrypt from 'bcryptjs';

export abstract class BcryptService {
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
