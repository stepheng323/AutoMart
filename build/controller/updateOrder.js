"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    // eslint-disable-next-line class-methods-use-this
    value: function updateOrders(req, res) {
      // validate users input
      var schema = {
        new_price_offered: _joi["default"].number().required()
      };

      var result = _joi["default"].validate(req.body, schema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(400).json({
            status: 400,
            error: 'could not connect to the pool'
          });
          return;
        }

        var query = 'SELECT * FROM orders WHERE id = $1';
        var value = [req.params.id];
        client.query(query, value, function (queryError, results) {
          if (queryError) {
            res.status(400).json({
              status: 400,
              error: "".concat(queryError)
            });
            return;
          }

          var decoded = req.userData;
          var order = results.rows[0];

          if (!order) {
            res.status(404).json({
              status: 404,
              error: 'order not found'
            });
            return;
          }

          if (decoded.id !== order.buyer) {
            res.status(403).json({
              status: 403,
              error: 'you can only update orders you posted'
            });
            return;
          }

          if (order.status === 'pending') {
            var query2 = 'UPDATE orders SET amount = $1 WHERE id = $2 RETURNING *';
            var value2 = [req.body.new_price_offered, req.params.id];
            client.query(query2, value2, function (queryError2, queryResult2) {
              var order2 = queryResult2.rows[0];

              if (queryError2) {
                res.status(400).json({
                  status: 400,
                  error: "".concat(queryError2)
                });
                return;
              }

              done();
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
            });
          } else {
            res.status(403).json({
              status: 403,
              error: 'you can only update pending order'
            });
          }
        });
      });
    }
  }]);

  return UpdateOrders;
}();

var ordersUpdate = new UpdateOrders();
var _default = ordersUpdate;
exports["default"] = _default;