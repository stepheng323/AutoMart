"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderSchema = {
  car_id: _joi.default.number().required(),
  amount: _joi.default.number().required()
};
var _default = orderSchema;
exports.default = _default;