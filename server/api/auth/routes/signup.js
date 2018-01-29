import express from 'express';
const passport = require('passport');
const Authentication = require('../authentication');
const passportService = require('../../../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const signUpRoute = express.Router();

signUpRoute.route('/').post(Authentication.signup);

export default signUpRoute;
