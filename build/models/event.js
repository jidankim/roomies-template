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
    contents: Object,
    is_edited: { type: Boolean, default: false }
});

exports.default = _mongoose2.default.model('event', Event);