'use strict';

import path from 'path';

export const clientErr = (err, req, res, next) => {
  console.error(err.message);
  res
    .status(404)
    .sendFile(path.join(__dirname, '../../client/public/notFound.html'));
  next();
};

export const serverErr = (err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .sendFile(
      path.join(__dirname, '../../client/public/internalServerError.html')
    );
  next();
};


