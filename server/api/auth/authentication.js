const jwt = require('jsonwebtoken');
const User = require('./user');
const secretToken = require('../../../config/secret');

const tokenForUser = user => {
  const timeStamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timeStamp }, secretToken.secret);
};
const isValidEmail = validEmail => {
  const emailRegex = new RegExp(
    /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
  );
  return emailRegex.test(validEmail);
};

exports.signin = (req, res, next) => {
  // User already had their email and password auth'd
  // We jsut need to give then a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  if (isValidEmail(email)) {
    return res
      .status(422)
      .send({ error: 'You must provide valid email format' });
  }

  // See if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    // if a user with eamil doesn't exist, create and save record
    const user = new User({
      email,
      password,
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
      // Reponse to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
