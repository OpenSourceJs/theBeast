const clientProd = {
  entry: [
      'frontend.js'
  ],
  output: {
     filename: 'frontend-output.js'
  }
  // other loaders, plugins etc. specific for frontend
};

const serverProd = {
  entry: [
      'backend.js'
  ],
  output: {
     filename: 'backend-output.js'
  },
  target: 'node',
  externals: // specify for example node_modules to be not bundled
  // other loaders, plugins etc. specific for backend
};

module.exports = [
 Object.assign({} , common, frontend),
 Object.assign({} , common, backend)
];
