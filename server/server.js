import express from 'express';
import path from 'path';
import http from 'http';
import middleware from './middlewares/serverMiddleware';
import { clientErr, serverErr } from './middlewares/errors';
import dbconfig from '../server/dbConfig/mongodb';
import signInRoute from './api/auth/routes/signin';
import signUpRoute from './api/auth/routes/signup';
import featureRoute from './api/feature/featureRoute';
const server = express();
http.createServer(server);

server.use(express.static(path.join(__dirname, '../client/dist')));

// middleware
middleware(server);

// api routes
server.use('/signup', signUpRoute);
server.use('/signin', signInRoute);
server.use('/feature', featureRoute);

// mongodb
dbconfig();

// setup global handle errors
server.use(clientErr);
server.use(serverErr);

export default server;
