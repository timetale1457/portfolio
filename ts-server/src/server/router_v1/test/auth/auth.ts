import passport, { Profile } from 'passport';
import dotenv from 'dotenv';

import oauth, { VerifyCallback } from 'passport-google-oauth20';
const GoogleStrategy = oauth.Strategy

dotenv.config();

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/api/v1/test/google/callback'
  },
  (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    // 사용자 정보는 profile에 저장되어 있음
    done(null, profile);
  }
));

export default passport;