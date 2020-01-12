"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _users = require("../model/users");

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
_dotenv.default.config();

class Signup {
  createUser(req, res) {
    const result = _joi.default.validate(req.body, _users.userSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message
      });
      return;
    }

    (async () => {
      const queryResult = await _config.default.query(_query.checkMail, [req.body.email]);

      if (queryResult.rows[0]) {
        res.status(409).json({
          status: 409,
          error: 'Email Already Exist'
        });
        return;
      }

      const hash = await _bcrypt.default.hash(req.body.password, 10);

      if (hash) {
        const user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          address: req.body.address,
          is_admin: false
        };
        const value2 = [user.first_name, user.last_name, user.email, user.password, user.address, user.is_admin];
        const queryResult2 = await _config.default.query(_query.newUser, value2);

        const token = _jsonwebtoken.default.sign({
          email: queryResult2.rows[0].email,
          id: queryResult2.rows[0].id
        }, process.env.TOKEN_SECRET, {
          expiresIn: '7hr'
        });

        res.status(201).json({
          status: 201,
          data: {
            token,
            id: queryResult2.rows[0].id,
            first_name: queryResult2.rows[0].first_name,
            last_name: queryResult2.rows[0].last_name,
            email: queryResult2.rows[0].email
          }
        });
      }
    })().catch(() => {
      res.status(500).json({
        status: 500,
        error: 'internal server error'
      });
    });
  }

}

const signup = new Signup();
var _default = signup;
exports.default = _default;