import { RedisService } from '@service/Redis';

export async function shutdown() {
  await new Promise(resolve => {
    RedisService.client.quit(() => {
      resolve();
    });
  });
  // redis.quit() creates a thread to close the connection.
  // We wait until all threads have been run once to ensure the connection closes.
  await new Promise(resolve => setImmediate(resolve));
}

export function makeString(length: number): string {
  const result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }
  return result.join('');
}
