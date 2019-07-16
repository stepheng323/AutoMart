"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signinSchema = exports.userSchema = exports.users = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [{
  id: 1,
  email: 'stepheng323@gmail.com',
  first_name: 'abiodun',
  last_name: 'oyebanji',
  password: 'olaTUNDE',
  address: '13 omolola close',
  is_admin: true
}];
exports.users = users;
var userSchema = {
  id: _joi["default"].number(),
  first_name: _joi["default"].string().required(),
  last_name: _joi["default"].string().required(),
  email: _joi["default"].string().required(),
  password: _joi["default"].string().required(),
  address: _joi["default"].string().required(),
  is_admin: _joi["default"]["boolean"]().required()
};
exports.userSchema = userSchema;
var signinSchema = {
  email: _joi["default"].string().required(),
  password: _joi["default"].string().required()
};
exports.signinSchema = signinSchema;