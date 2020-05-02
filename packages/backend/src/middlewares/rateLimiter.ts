import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { RedisService } from '@service/Redis';

export class Limiter {
  private static limiter(
    windowMs: number,
    max: number,
    customMessage = 'You have reached limit for this action'
  ) {
    let endTime: Date;

    return RateLimit({
      store: new RedisStore({ client: RedisService.client }),
      windowMs,
      max,
      handler: (_, res) => {
        const formatedTime = `${endTime.getDate()}/${
          endTime.getMonth() + 1
        }/${endTime.getFullYear()} at ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`;
        const message = `${customMessage}. Remaining attempts will reset on ${formatedTime}.`;
        res.status(429).json({ message, endTime });
      },
      onLimitReached: (req, _, __) => {
        endTime = req.rateLimit.resetTime || new Date();
      },
    });
  }

  public static loginLimit = (time = 60 * 5 * 1000, max = 5) =>
    Limiter.limiter(time, max, 'You have reached limit for login');

  public static registerLimit = (time = 60 * 10 * 1000, max = 10) =>
    Limiter.limiter(time, max, 'You have reached limit for registration');
}
