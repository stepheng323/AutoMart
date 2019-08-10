"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
class UpdateOrders {
  updateOrders(req, res) {
    const schema = {
      price: _joi.default.number().required()
    };

    const result = _joi.default.validate(req.body, schema);

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
      } = await _config.default.query(_query.checkOrder, [req.params.id]);
      const decoded = req.userData;
      const order = rows[0];

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
        const value2 = [req.body.price, req.params.id];
        const queryResult = await _config.default.query(_query.updateOrder, value2);
        const order2 = queryResult.rows[0];
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
      } else {
        res.status(409).json({
          status: 409,
          error: 'you can only update pending order'
        });
      }
    })().catch(() => {
      res.status(500).json({
        status: 500,
        error: 'Internal server error'
      });
    });
  }

}

const ordersUpdate = new UpdateOrders();
var _default = ordersUpdate;
exports.default = _default;