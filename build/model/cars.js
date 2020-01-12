"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carSchema = exports.cars = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carSchema = {
  id: _joi.default.number(),
  owner: _joi.default.number(),
  created_on: _joi.default.date(),
  state: _joi.default.string().required(),
  price: _joi.default.number().required(),
  manufacturer: _joi.default.string().required(),
  model: _joi.default.string(),
  body_type: _joi.default.string(),
  color: _joi.default.string(),
  year: _joi.default.number(),
  description: _joi.default.string()
};
exports.carSchema = carSchema;
const cars = [{
  id: 1,
  owner: 1,
  created_on: new Date(),
  state: 'used',
  status: 'available',
  price: 50000,
  manufacturer: 'toyota',
  model: 'camry',
  body_type: 'car'
}];
exports.cars = cars;