/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint no-console: 0 */

	var path = __webpack_require__(1);
	var express = __webpack_require__(2);
	var webpack = __webpack_require__(3);
	var webpackMiddleware = __webpack_require__(4);
	var webpackHotMiddleware = __webpack_require__(5);
	var Rollbar = __webpack_require__(6);

	var isDeveloping = process.env.NODE_ENV !== 'production';
	var port = isDeveloping ? 3000 : process.env.PORT;
	var app = express();

	var token = '53a4b7fdd2824c3895d3770260df84e5';

	var rollbar = Rollbar.init({
	  accessToken: token,
	  handleUncaughtExceptions: true
	});
	var other = __webpack_require__(7);

	app.get('/error', function (req, res) {
	  req.user_id = 'test-user';
	  throw new Error('Hello World');
	});
	app.get('/dolog', function (req, res) {
	  var u = rollbar.log('hello there', req, {
	    customName: 'bork bork'
	  }, function (err, resp) {
	    if (err) {
	      console.log('Error');
	      console.log(err);
	    } else {
	      console.log('Response');
	      console.log(resp);
	    }
	  });
	  res.send(JSON.stringify(u));
	});
	app.get('/other', function (req, res) {
	  other.doSomeLog('hello', req);
	  other.doSomeError('bork bork bork', req);
	  res.json({ hello: 'world' });
	});

	app.use(express.static(path.join(__dirname)));

	app.get('*', function response(req, res) {
	  res.sendFile(path.join(__dirname, '../dist/index.html'));
	});

	app.use(rollbar.errorHandler());

	app.listen(port, '0.0.0.0', function onStart(err) {
	  if (err) {
	    console.log(err);
	  }
	  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("webpack");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("rollbar");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var rollbar = __webpack_require__(6).instance;

	exports.doSomeLog = function (message, req, custom, callback) {
	  console.log(rollbar);
	  rollbar.log(message, req, custom, callback);
	};

	exports.doSomeError = function (message, req, custom, callback) {
	  rollbar.error(message, req, custom, callback);
	};

/***/ })
/******/ ]);