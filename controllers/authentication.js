const User = require('../models/user');

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  // See if a user with the given email exists
  User.findOne({ email }, function(err, existingUser) {
    if (err) return next(err);

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email,
      password
    });

    // save to db
    user.save(function(err) {
      if (err) return next(err);

      res.json({ success: true });
    });
  });

  // Respond to request indicating the user was created
}