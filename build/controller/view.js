"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

var _priceRange = _interopRequireDefault(require("../model/priceRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: "specific",
    value: function specific(req, res, next) {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref2, rows, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _config["default"].query(_query.checkCar, [req.params.id]);

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                data = rows[0];

                if (data) {
                  _context.next = 8;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'car with the specified id not found'
                });
                return _context.abrupt("return");

              case 8:
                res.status(200).json({
                  status: 200,
                  data: data
                });
                next();

              case 10:
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
  }, {
    key: "soldOrAvailable",
    value: function soldOrAvailable(req, res, next) {
      var decoded = req.userData;

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref4, rows, user, results2, availableOrSold;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _config["default"].query(_query.checkUser, [decoded.id]);

              case 2:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                user = rows[0];

                if (user.is_admin) {
                  _context2.next = 8;
                  break;
                }

                next();
                return _context2.abrupt("return");

              case 8:
                if (!(req.query.status === 'available')) {
                  _context2.next = 11;
                  break;
                }

                next();
                return _context2.abrupt("return");

              case 11:
                if (!(req.query.min_price && req.query.max_price)) {
                  _context2.next = 14;
                  break;
                }

                next();
                return _context2.abrupt("return");

              case 14:
                _context2.next = 16;
                return _config["default"].query(_query.checkCarStatus2, ['available', 'sold']);

              case 16:
                results2 = _context2.sent;
                availableOrSold = results2.rows;

                if (availableOrSold) {
                  _context2.next = 21;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  erorr: 'no car found'
                });
                return _context2.abrupt("return");

              case 21:
                res.status(200).json({
                  status: 200,
                  data: availableOrSold
                });

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'internal server error'
        });
      });
    }
  }, {
    key: "unsold",
    value: function unsold(req, res, next) {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _ref6, available;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(req.query.min_price && req.query.max_price)) {
                  _context3.next = 3;
                  break;
                }

                next();
                return _context3.abrupt("return");

              case 3:
                _context3.next = 5;
                return _config["default"].query(_query.checkCarStatus, [req.query.status]);

              case 5:
                _ref6 = _context3.sent;
                available = _ref6.rows;

                if (available) {
                  _context3.next = 10;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'no cars found'
                });
                return _context3.abrupt("return");

              case 10:
                res.status(200).json({
                  status: 200,
                  data: available
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'internal server error'
        });
      });
    }
  }, {
    key: "priceRange",
    value: function priceRange(req, res) {
      var result = _joi["default"].validate(req.query, _priceRange["default"]);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var value4, _ref8, rows, filtered;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                value4 = [req.query.status, req.query.min_price, req.query.max_price, req.query.start_year, req.query.stop_year, req.query.state, req.query.manufacturer, req.query.model];
                _context4.next = 3;
                return _config["default"].query(_query.checkPriceRange, value4);

              case 3:
                _ref8 = _context4.sent;
                rows = _ref8.rows;
                filtered = rows;

                if (!(filtered.length < 1)) {
                  _context4.next = 9;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'no cars found'
                });
                return _context4.abrupt("return");

              case 9:
                res.status(200).json({
                  status: 200,
                  data: filtered
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'internal server error'
        });
      });
    }
  }, {
    key: "deleteCar",
    value: function deleteCar(req, res) {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var decoded, _ref10, rows, user, results;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                decoded = req.userData;
                _context5.next = 3;
                return _config["default"].query(_query.checkAdmin, [decoded.id]);

              case 3:
                _ref10 = _context5.sent;
                rows = _ref10.rows;
                user = rows[0];

                if (!user.is_admin) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 9;
                return _config["default"].query(_query.deleteCar, [req.params.car_id]);

              case 9:
                results = _context5.sent;

                if (results.rows[0]) {
                  _context5.next = 13;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'No Car Found'
                });
                return _context5.abrupt("return");

              case 13:
                res.status(200).json({
                  status: 200,
                  data: 'car ad successfully deleted'
                });
                _context5.next = 17;
                break;

              case 16:
                res.status(403).json({
                  status: 403,
                  error: 'Only admin can delete a car'
                });

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'Internal Server Error'
        });
      });
    }
  }]);

  return View;
}();

var view = new View();
var _default = view;
exports["default"] = _default;