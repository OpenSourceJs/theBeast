require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./server/middlewares/serverMiddleware.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cors__ = __webpack_require__("cors");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan__ = __webpack_require__("morgan");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_helmet__ = __webpack_require__("helmet");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__("body-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_compression__ = __webpack_require__("compression");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cookie_parser__ = __webpack_require__("cookie-parser");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_express_session__ = __webpack_require__("express-session");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_validator__ = __webpack_require__("express-validator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_express_validator__);









/* harmony default export */ __webpack_exports__["a"] = (function (server) {
  server.use(__WEBPACK_IMPORTED_MODULE_0_cors___default()({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'token_authorization']
  }));
  server.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json({
    type: '*/*'
  }));
  server.use(__WEBPACK_IMPORTED_MODULE_2_helmet___default()());
  server.use(__WEBPACK_IMPORTED_MODULE_4_compression___default()());
  server.use(__WEBPACK_IMPORTED_MODULE_5_cookie_parser___default()());
  server.use(__WEBPACK_IMPORTED_MODULE_1_morgan___default()('combined'));
  server.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
  server.use(__WEBPACK_IMPORTED_MODULE_7_express_validator___default()());
  server.use(__WEBPACK_IMPORTED_MODULE_6_express_session___default()({ secret: 'max', resave: false, saveUninitialized: false }));
});

/***/ }),

/***/ "./server/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__("path");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_serverMiddleware__ = __webpack_require__("./server/middlewares/serverMiddleware.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_errors__ = __webpack_require__("./server/middlewares/errors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__server_dbConfig_mongodb__ = __webpack_require__("./server/dbConfig/mongodb.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_auth_routes_signin__ = __webpack_require__("./server/api/auth/routes/signin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_auth_routes_signup__ = __webpack_require__("./server/api/auth/routes/signup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_feature_featureRoute__ = __webpack_require__("./server/api/feature/featureRoute.js");
__webpack_require__("dotenv").config();










var server = __WEBPACK_IMPORTED_MODULE_0_express___default()();

server.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, '../client/dist')));

// middleware
Object(__WEBPACK_IMPORTED_MODULE_2__middlewares_serverMiddleware__["a" /* default */])(server);

// api routes
server.use('/signup', __WEBPACK_IMPORTED_MODULE_6__api_auth_routes_signup__["a" /* default */]);
server.use('/signin', __WEBPACK_IMPORTED_MODULE_5__api_auth_routes_signin__["a" /* default */]);
server.use('/feature', __WEBPACK_IMPORTED_MODULE_7__api_feature_featureRoute__["a" /* default */]);

// mongodb
Object(__WEBPACK_IMPORTED_MODULE_4__server_dbConfig_mongodb__["a" /* default */])();

// setup global handle errors
server.use(__WEBPACK_IMPORTED_MODULE_3__middlewares_errors__["a" /* clientErr */]);
server.use(__WEBPACK_IMPORTED_MODULE_3__middlewares_errors__["b" /* serverErr */]);

/* harmony default export */ __webpack_exports__["default"] = (server);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ })

};
//# sourceMappingURL=0.1922c4b4bf16da5bcfc1.hot-update.js.map