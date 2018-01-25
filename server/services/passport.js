import passport from 'passport';
import JwtStrategy from 'passport-jwt';
import ExtractJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../api/auth/user';
import config from '../../config/secret';

const JwtS = JwtStrategy.Strategy;
const Ext = ExtractJwt.ExtractJwt;
const localOptions = { usernameField: 'email' };
const jwtOptions = {
  jwtFromRequest: Ext.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

const jwtLogin = new JwtS(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
