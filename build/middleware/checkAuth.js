"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  var bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({
      status: 401,
      error: 'Access Denied'
    });
  }

  var token = bearer.split(' ')[1];

  _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET, function (err, data) {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Token'
      });
    }

    req.userData = data;
    next();
  });
};

var _default = auth;
exports["default"] = _default;