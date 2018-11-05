'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Event = new Schema({
    writer: String,
    category: String,
    eventName: String,
    endDate: Date,
    startDate: Date
});

exports.default = _mongoose2.default.model('event', Event);