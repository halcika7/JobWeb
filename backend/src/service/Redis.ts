import redis, { RedisClient } from 'redis';

export class RedisService {
  private static REDIS_PORT =
    process.env.NODE_ENV === 'production' ? +process.env.REDIS_PORT : 6379;

  private static _client = redis.createClient(RedisService.REDIS_PORT);

  static getAsync(key: string): Promise<string> {
    return new Promise((resolve, reject) =>
      this._client.get(key, (err, val) => resolve(val))
    );
  }

  static getManyAsync(values: string[]): Promise<string[]> {
    const promisses = values.map(value => this.getAsync(value));
    return Promise.all(promisses);
  }

  static setex(key: string, duration: number, value: string): boolean {
    return this._client.setex(key, duration, value);
  }

  static get client(): RedisClient {
    return this._client;
  }
}
