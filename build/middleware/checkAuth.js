"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({
      status: 401,
      error: 'Access Denied'
    });
  }

  const token = bearer.split(' ')[1];

  _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid Token'
      });
    }

    req.userData = data;
    next();
  });
};

var _default = auth;
exports.default = _default;