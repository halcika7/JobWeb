import limit from 'express-rate-limit';

// windowMs: 60 * 60 * 1000, // 1 hour window ---> for login
// windowMs: 60 * 60 * 1000 * 24, // 1 day window ---> for registration

export const limiter = (windowMs: number, max: number) => {
  let endTime: Date;

  return limit({
    windowMs, // 1 hour window
    max, // start blocking after 5 requests
    handler: (req, res) => {
      const message = `You have reached limit for this action. Remaining attempts will reset on ${endTime
        .toISOString()
        .slice(0, -4)}.`;
      res.status(429).json({ message, endTime });
    },
    onLimitReached: (req, res, options) => {
      endTime = req.rateLimit.resetTime;
    },
  });
};
