import express from 'express';
const passport = require('passport');
const Authentication = require('../authentication');
const passportService = require('../../../services/passport');

const requireSignin = passport.authenticate('local', { session: false });
const signInRoute = express.Router();

signInRoute
  .route('/')
  // get('/', requireAuth, (req, res) => {
  //   res.send({ message: 'Super secret code is ABC123' });
  // });
  .post(requireSignin, Authentication.signin);

export default signInRoute;
