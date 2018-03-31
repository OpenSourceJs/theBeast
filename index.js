import chalk from 'chalk';
import open from 'open';
import http from 'http';
// import { execute, subscribe } from 'graphql'
import { createServer } from 'http';
import print from './libs/utils';
import server from './server/server';
// import schema from './schema'

const port = 4000;

const app = http.createServer(server);
let currentApp = server;

const renderToTheBrowser = () => {
  return global.setTimeout(() => {
    open(`http://localhost:${port}`);
  }, 30000);
};

server.listen(port, err => {
  if (err) {
    print(err);
  } else {
    renderToTheBrowser();
  }
  print(
    chalk.blue.bold(
      `Listening on http//localhost:${chalk.red(port)} ====>>> 🌎`,
    ),
  );
});
