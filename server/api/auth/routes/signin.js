import express from 'express';
const passport = require('passport');
const Authentication = require('../authentication');
const passportService = require('../../../services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const signInRoute = express.Router();

signInRoute.route('/').post(requireSignin, Authentication.signin);

export default signInRoute;
