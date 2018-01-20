'use strict';
import chalk from 'chalk';
import open from 'open';
import print from './libs/utils.js';
import server from './server/server.js';

const port = process.argv[2] || process.env.Port || 3000;

server.listen(port, err => {
  if (err) {
    print(err);
  } else {
    open(`http://localhost:${port}`);
  }
  print(
    chalk.blue.bold(
      ` Listening on http//localhost:${chalk.red(port)} ====>>> 🌎`
    )
  );
});
