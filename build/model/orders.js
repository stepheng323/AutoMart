"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderSchema = exports.orders = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var orders = [{
  id: 1,
  buyer: 1,
  car_id: 1,
  amount: 5000,
  status: 'pending'
}];
exports.orders = orders;
var orderSchema = {
  car_id: _joi["default"].number().required(),
  amount: _joi["default"].number().required()
};
exports.orderSchema = orderSchema;