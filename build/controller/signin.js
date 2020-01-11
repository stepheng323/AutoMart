"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _users = require("../model/users");

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Signin =
/*#__PURE__*/
function () {
  function Signin() {
    _classCallCheck(this, Signin);
  }

  _createClass(Signin, [{
    key: "signIn",
    value: function signIn(req, res) {
      var result = _joi["default"].validate(req.body, _users.signinSchema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref2, rows, user, verifiedPassword, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _config["default"].query(_query.checkMail, [req.body.email]);

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                user = rows[0];

                if (user) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Invalid Email or Address Combination'
                }));

              case 7:
                _context.next = 9;
                return _bcrypt["default"].compare(req.body.password, user.password);

              case 9:
                verifiedPassword = _context.sent;

                if (!verifiedPassword) {
                  _context.next = 17;
                  break;
                }

                _context.next = 13;
                return _jsonwebtoken["default"].sign({
                  email: user.email,
                  id: user.id
                }, process.env.TOKEN_SECRET, {
                  expiresIn: '7hr'
                });

              case 13:
                token = _context.sent;
                res.status(200).json({
                  status: 200,
                  data: {
                    token: token,
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                  }
                });
                _context.next = 18;
                break;

              case 17:
                res.status(400).json({
                  status: 400,
                  error: 'Invalid Email or Password Combination'
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'Internal Server Error'
        });
      });
    }
  }]);

  return Signin;
}();

var signin = new Signin();
var _default = signin;
exports["default"] = _default;