import Joi from 'joi';
import { orders, orderSchema } from '../db/orders';
import { cars } from '../db/cars';

class CreateOrders {
  // eslint-disable-next-line class-methods-use-this
  createOrder(req, res) {
    const result = Joi.validate(req.body, orderSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }

    const decoded = req.userData;

    const order = {
      id: orders.length + 1,
      buyer: decoded.id,
      car_id: req.body.car_id,
      amount: req.body.amount,
      status: 'pending',
    };
    orders.push(order);
    const found = cars.find(c => c.id === order.car_id);

    res.status(201).json({
      status: 201,
      data: {
        id: order.id,
        car_id: order.car_id,
        created_on: found.created_on,
        status: order.status,
        price: found.price,
        price_offerd: order.amount,
      },
    });
  }
}
const createOrders = new CreateOrders();
export default createOrders;
