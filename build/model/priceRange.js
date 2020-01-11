"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var priceRangeSchema = {
  status: _joi["default"].string().required(),
  min_price: _joi["default"].number().required(),
  max_price: _joi["default"].number().required(),
  start_year: _joi["default"].number().required(),
  stop_year: _joi["default"].number().required(),
  state: _joi["default"].string().required(),
  manufacturer: _joi["default"].string().required(),
  model: _joi["default"].string().required()
};
var _default = priceRangeSchema;
exports["default"] = _default;