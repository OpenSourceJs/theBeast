import express from 'express';
import path from 'path';
import http from 'http';
import passport from 'passport';
import middleware from './middlewares/serverMiddleware';
import passportService from './services/passport';
import { clientErr, serverErr } from './middlewares/errors';
import userRoute from './api/auth/userRouters';

const server = express();
const app = http.createServer(server);
const requireAuth = passport.authenticate('jwt', { session: false });

server.use(express.static(path.join(__dirname, '../client/dist')));

server.get('/', requireAuth, (req, res) => {
  res.send({ message: 'Super secret code is ABC123' });
});

server.use('/signin', userRoute);
server.use('/signup', userRoute);

server.get('/', requireAuth, (req, res) => {
  res.send({ message: 'Super secret code is ABC123' });
});

// middleware
middleware(server);

// setup global handle errors
server.use(clientErr);
server.use(serverErr);

export default server;
