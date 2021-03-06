import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';
import {
  Strategy as TwitterStrategy,
  Profile as TwitterProfile,
} from 'passport-twitter';
import {
  Strategy as LinkedinStrategy,
  Profile as LinkedinProfile,
} from 'passport-linkedin-oauth2';
import { BaseService } from './Base';
import { Configuration } from '@env';
import { Response, Request } from 'express';
import { User } from '@model/User';
import { CookieService } from './Cookie';
import { JWTService } from './JWT';

type providerType = 'google' | 'facebook' | 'twitter' | 'linkedIn';
type idTypes = 'googleId' | 'facebookId' | 'twitterId' | 'linkedInId';

export class PassportService extends BaseService {
  private readonly cookie = CookieService;

  private readonly jwt = JWTService;

  constructor() {
    super(PassportService);
  }

  socialCallback(req: Request, res: Response, provider: providerType) {
    return passport.authenticate(
      provider,
      { session: false, failureRedirect: '/' },
      (err, user, _) => this.passportCallback(err, user, res)
    )(req, res, provider);
  }

  static async passportStrategy(
    profile: GoogleProfile | FacebookProfile | TwitterProfile | LinkedinProfile,
    done: VerifyCallback,
    socialType: providerType
  ) {
    try {
      const whereObj = { where: { email: profile._json.email } } as any;
      if (socialType === 'linkedIn') {
        whereObj.where.email = profile.emails![0].value;
      }
      const user = await User.findOne({
        ...whereObj,
        select: ['id', 'role', 'activation_token', 'reset_password_token'],
        join: { alias: 'user', leftJoinAndSelect: { role: 'user.role' } },
      });

      if (!user) {
        return done(
          new Error(
            `Please first create normal account in order to use social login.`
          )
        );
      }

      if (user.activation_token) {
        return done(
          new Error(`Please activate your account in order to login`)
        );
      }

      if (user.reset_password_token) {
        return done(new Error(`Please reset your password in order to login`));
      }

      whereObj.where[`${socialType}Id`] = profile.id;

      const findUserWithEmailSocialId = await User.findOne({ ...whereObj });

      if (!findUserWithEmailSocialId) {
        user[`${socialType}Id` as idTypes] = profile.id;
        await user.save();
        return done(undefined, user);
      }

      return done(undefined, user);
    } catch (error) {
      return done(error.message, null);
    }
  }

  private async passportCallback(
    err: Error | undefined,
    { id, role }: User,
    res: Response
  ) {
    const { url } = Configuration.appConfig;
    try {
      if (err) return res.redirect(`${url}/auth/login?err=${err}`);

      const accessToken = this.jwt.signToken({ id, role });
      this.cookie.setRefreshToken(res, this.jwt.signToken({ id, role }, true));

      return res.redirect(`${url}/auth/login?token=${accessToken}`);
    } catch (error) {
      this.logger.error(error, 'passport callback');
      const customError =
        'Something happened. We were unable to perform request.';
      return res.redirect(`${url}/auth/login?err=${customError}`);
    }
  }
}

passport.serializeUser((user: User, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id } });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Configuration.appConfig.social.googleID,
      clientSecret: Configuration.appConfig.social.googleSecretID,
      callbackURL: Configuration.appConfig.social.googleCallBack,
    },
    (_, __, profile, done) =>
      PassportService.passportStrategy(profile, done, 'google')
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: Configuration.appConfig.social.facebookID,
      clientSecret: Configuration.appConfig.social.facebookSecretID,
      callbackURL: Configuration.appConfig.social.facebookCallBack,
      profileFields: ['id', 'email'],
    },
    (_, __, profile, done) =>
      PassportService.passportStrategy(profile, done, 'facebook')
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: Configuration.appConfig.social.twitterID,
      consumerSecret: Configuration.appConfig.social.twitterSecretID,
      callbackURL: Configuration.appConfig.social.twitterCallBack,
      includeEmail: true,
      userProfileURL:
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    },
    (_, __, profile, done) =>
      PassportService.passportStrategy(profile, done, 'twitter')
  )
);

passport.use(
  new LinkedinStrategy(
    {
      clientID: Configuration.appConfig.social.linkedinID,
      clientSecret: Configuration.appConfig.social.linkedinSecretID,
      callbackURL: Configuration.appConfig.social.linkedinCallBack,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      scope: ['r_emailaddress', 'r_liteprofile'],
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    (_, __, profile, done) =>
      PassportService.passportStrategy(profile, done, 'linkedIn')
  )
);

export default passport;
