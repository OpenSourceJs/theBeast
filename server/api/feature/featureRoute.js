import express from 'express';
const passport = require('passport');
const passportService = require('../../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const featureRoute = express.Router();

featureRoute.route('/*').get(requireAuth, (req, res) => {
  res.send({ message: 'Super secret code is ABC123' });
});

export default featureRoute;
