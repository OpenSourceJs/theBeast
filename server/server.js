import express from 'express';
import path from 'path';
import http from 'http';
import middleware from './middlewares/serverMiddleware';
import { clientErr, serverErr } from './middlewares/errors';
import dbconfig from '../server/dbConfig/mongodb';
import router from './api/auth/routes';

const server = express();
http.createServer(server);

server.use(express.static(path.join(__dirname, '../client/dist')));

// middleware
middleware(server);

// api routes
router(server);

// mongodb
dbconfig();

// setup global handle errors
server.use(clientErr);
server.use(serverErr);

export default server;
