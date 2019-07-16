"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];

    var decoded = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);

    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'Access Denied'
    });
  }
};

var _default = auth;
exports["default"] = _default;