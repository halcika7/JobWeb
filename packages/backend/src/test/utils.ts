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
