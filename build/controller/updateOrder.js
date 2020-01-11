"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdateOrders =
/*#__PURE__*/
function () {
  function UpdateOrders() {
    _classCallCheck(this, UpdateOrders);
  }

  _createClass(UpdateOrders, [{
    key: "updateOrders",
    value: function updateOrders(req, res) {
      var schema = {
        price: _joi["default"].number().required()
      };

      var result = _joi["default"].validate(req.body, schema);

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
        var _ref2, rows, decoded, order, value2, queryResult, order2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _config["default"].query(_query.checkOrder, [req.params.id]);

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                decoded = req.userData;
                order = rows[0];

                if (order) {
                  _context.next = 9;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'order not found'
                });
                return _context.abrupt("return");

              case 9:
                if (!(decoded.id !== order.buyer)) {
                  _context.next = 12;
                  break;
                }

                res.status(403).json({
                  status: 403,
                  error: 'you can only update orders you posted'
                });
                return _context.abrupt("return");

              case 12:
                if (!(order.status === 'pending')) {
                  _context.next = 21;
                  break;
                }

                value2 = [req.body.price, req.params.id];
                _context.next = 16;
                return _config["default"].query(_query.updateOrder, value2);

              case 16:
                queryResult = _context.sent;
                order2 = queryResult.rows[0];
                res.status(200).json({
                  status: 200,
                  data: {
                    id: order.id,
                    car_id: order.car_id,
                    status: order.status,
                    old_price_offered: order.amount,
                    new_price_offered: order2.amount
                  }
                });
                _context.next = 22;
                break;

              case 21:
                res.status(409).json({
                  status: 409,
                  error: 'you can only update pending order'
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'Internal server error'
        });
      });
    }
  }]);

  return UpdateOrders;
}();

var ordersUpdate = new UpdateOrders();
var _default = ordersUpdate;
exports["default"] = _default;