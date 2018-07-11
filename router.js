const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// don't create cookie based session since we're using jwt
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' })
  })
  app.post('/signup', Authentication.signup);
}