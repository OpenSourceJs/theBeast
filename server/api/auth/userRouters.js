import express from 'express';
import passport from 'passport';
import passportService from '../../services/passport';
import userModel from './userModels';

const requireSignin = passport.authenticate('local', { session: false });
const userRoute = express.Router();

userRoute
  .route('/')
  .post(userModel.signIn, requireSignin)
  .post(userModel.signUp);

export default userRoute;
