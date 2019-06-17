import Joi from 'joi';
import { orders } from '../model/orders';

class UpdateOrders {
  // eslint-disable-next-line class-methods-use-this
  updateOrders(req, res) {
    const order = orders.find(o => o.id === parseInt(req.params.id, 10));
    if (!order) {
      res.status(404).json({
        status: 404,
        error: 'order not found',
      });
      return;
    }
    const decoded = req.userData;

    if (decoded.id !== order.buyer) {
      res.status(404).json({
        status: 404,
        error: 'you can only update orders you posted',
      });
      return;
    }

    const schema = {
      new_price_offered: Joi.number().required(),
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    if (order.status === 'pending') {
      order.new_price_offered = req.body.new_price_offered;
      res.status(201).json({
        status: 201,
        data: {
          id: order.id,
          car_id: order.car_id,
          status: order.status,
          old_price_offered: order.amount,
          new_price_offered: order.new_price_offered,
        },
      });
    } else {
      res.status(403).json({
        status: 403,
        error: 'Order can only be updated when the status is pending',
      });
    }
  }
}
const ordersUpdate = new UpdateOrders();
export default ordersUpdate;
