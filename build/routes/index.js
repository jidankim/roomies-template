'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use('/account', _account2.default);
router.use('/event', _event2.default);

exports.default = router;