import bcrypt from 'bcryptjs';

export class BcryptService {
  private static instance: BcryptService;

  constructor() {
    if (!BcryptService.instance) {
      BcryptService.instance = this;
    }

    return BcryptService.instance;
  }

  async generateSalt(salt = 10): Promise<string> {
    return bcrypt.genSalt(salt);
  }

  async hash(value: string, salt: string): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  async compareValues(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}

const BcryptServiceInstance = new BcryptService();

export default BcryptServiceInstance;
