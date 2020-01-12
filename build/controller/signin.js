"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _users = require("../model/users");

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
class Signin {
  signIn(req, res) {
    const result = _joi.default.validate(req.body, _users.signinSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message
      });
      return;
    }

    (async () => {
      const {
        rows
      } = await _config.default.query(_query.checkMail, [req.body.email]);
      const user = rows[0];

      if (!user) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid Email or Address Combination'
        }); // return;
      }

      const verifiedPassword = await _bcrypt.default.compare(req.body.password, user.password);

      if (verifiedPassword) {
        const token = await _jsonwebtoken.default.sign({
          email: user.email,
          id: user.id
        }, process.env.TOKEN_SECRET, {
          expiresIn: '7hr'
        });
        res.status(200).json({
          status: 200,
          data: {
            token,
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Invalid Email or Password Combination'
        });
      }
    })().catch(() => {
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error'
      });
    });
  }

}

const signin = new Signin();
var _default = signin;
exports.default = _default;