import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { RedisService } from '@service/Redis';

export class Limiter {
  private static returnNumberWithTwoDigits(num: number) {
    if (num < 10) {
      return `0${num}`;
    }

    return num.toString();
  }

  private static formatTime(endTime: Date) {
    return {
      day: this.returnNumberWithTwoDigits(endTime.getDate()),
      month: this.returnNumberWithTwoDigits(endTime.getMonth() + 1),
      year: endTime.getFullYear(),
      hours: this.returnNumberWithTwoDigits(endTime.getHours()),
      min: this.returnNumberWithTwoDigits(endTime.getMinutes()),
      sec: this.returnNumberWithTwoDigits(endTime.getSeconds()),
    };
  }

  static limiter(
    time: number,
    max: number,
    customMessage = 'You have reached limit for this action',
    prefix: string
  ) {
    let endTime: Date;

    return RateLimit({
      store: new RedisStore({
        client: RedisService.client,
        expiry: time,
        prefix,
      }),
      windowMs: time * 1000,
      max,
      handler: (_, res) => {
        const { day, month, year, hours, min, sec } = this.formatTime(endTime);
        const formatedTime = `${day}/${month}/${year} at ${hours}:${min}:${sec}`;
        const message = `${customMessage}. Remaining attempts will reset on ${formatedTime}.`;
        res.status(429).json({ message, endTime });
      },
      onLimitReached: (req, _, __) => {
        endTime = req.rateLimit.resetTime || new Date();
      },
    });
  }

  public static loginLimit = (time = 3600, max = 5) =>
    Limiter.limiter(time, max, 'You have reached limit for login', 'login');

  public static registerLimit = (time = 600, max = 10) =>
    Limiter.limiter(
      time,
      max,
      'You have reached limit for registration',
      'register'
    );

  public static reactivateLimit = (time = 600, max = 5) =>
    Limiter.limiter(
      time,
      max,
      'You have reached limit for resend activation email',
      'reactivateLimit'
    );
}
