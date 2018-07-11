const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
  // jwt can come from anywhere so tell to look in header
  jwtFromRequet: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
// payload - decoded jwt
// done needs to be called if successfully logged in
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.find(payload.sub, function(err, user) {
    // false meaning no user was found
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin);