import redis from 'redis';

export class RedisService {
  private static REDIS_PORT =
    process.env.NODE_ENV === 'production' ? +process.env.REDIS_PORT : 6379;

  private static client = redis.createClient(RedisService.REDIS_PORT);

  static getAsync(key: string): Promise<string> {
    return new Promise((resolve, reject) =>
      this.client.get(key, (err, val) => resolve(val))
    );
  }

  static getManyAsync(values: string[]): Promise<string[]> {
    const promisses = values.map(value => this.getAsync(value));
    return Promise.all(promisses);
  }

  static setex(key: string, duration: number, value: string) {
    return this.client.setex(key, duration, value);
  }
}
