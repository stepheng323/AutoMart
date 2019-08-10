"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signinSchema = exports.userSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = {
  id: _joi.default.number(),
  first_name: _joi.default.string().required(),
  last_name: _joi.default.string().required(),
  email: _joi.default.string().required(),
  password: _joi.default.string().required(),
  address: _joi.default.string().required()
};
exports.userSchema = userSchema;
const signinSchema = {
  email: _joi.default.string().required(),
  password: _joi.default.string().required()
};
exports.signinSchema = signinSchema;