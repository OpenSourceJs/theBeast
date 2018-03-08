require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__("chalk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_open__ = __webpack_require__("open");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_open___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_open__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http__ = __webpack_require__("http");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_utils__ = __webpack_require__("./libs/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__server_server__ = __webpack_require__("./server/server.js");



// import { execute, subscribe } from 'graphql'



// import schema from './schema'

var port = 4000;

var app = __WEBPACK_IMPORTED_MODULE_2_http___default.a.createServer(__WEBPACK_IMPORTED_MODULE_4__server_server__["default"]);
var currentApp = __WEBPACK_IMPORTED_MODULE_4__server_server__["default"];

var renderToTheBrowser = function renderToTheBrowser() {
  return global.setTimeout(function () {
    __WEBPACK_IMPORTED_MODULE_1_open___default()('http://localhost:' + port);
  }, 30000);
};

__WEBPACK_IMPORTED_MODULE_4__server_server__["default"].listen(port, function (err) {
  if (err) {
    Object(__WEBPACK_IMPORTED_MODULE_3__libs_utils__["a" /* default */])(err);
  } else {
    renderToTheBrowser();
  }
  Object(__WEBPACK_IMPORTED_MODULE_3__libs_utils__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.blue.bold('Listening on http//localhost:' + __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.red(port) + ' ====>>> \uD83C\uDF0E'));
});

if (true) {
  module.hot.accept(["./server/server.js"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_4__server_server__ = __webpack_require__("./server/server.js"); (function () {
    __WEBPACK_IMPORTED_MODULE_4__server_server__["default"].removeListener('request', currentApp);
    __WEBPACK_IMPORTED_MODULE_4__server_server__["default"].on('request', __WEBPACK_IMPORTED_MODULE_4__server_server__["default"]);
    currentApp = __WEBPACK_IMPORTED_MODULE_4__server_server__["default"];
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ })

};
//# sourceMappingURL=0.e43d52ea7410a08e1c7b.hot-update.js.map