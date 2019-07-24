/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import dotenv from 'dotenv';
import orderSchema from '../model/orders';
import pool from '../config';
import { newOrder, checkCar, orderExist } from '../helpers/query';

dotenv.config();

class CreateOrders {
  createOrder(req, res) {
    const result = Joi.validate(req.body, orderSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'internal server error1',
        });
        return;
      }
      // check if the car_id is the database
      client.query(checkCar, [req.body.car_id], (queryError, queryResult) => {
        if (queryError) {
          res.status(500).json({
            status: 500,
            error: 'internal server error2',
          });
          return;
        }
        const car = queryResult.rows[0];
        if (!car) {
          res.status(404).json({
            status: 404,
            error: 'car not found',
          });
          return;
        }
        // check if car status is sold , we can not order sold cars right?
        if (car.status !== 'available') {
          res.status(403).json({
            status: 403,
            error: 'you can only order available cars',
          });
          return;
        }
        const decoded = req.userData;
        client.query(orderExist, [req.body.car_id, decoded.id], (querysError, querysResult) => {
          if (querysError) {
            res.status(500).json({
              status: 500,
              error: 'internal server error',
            });
            return;
          }
          const orderFilter = querysResult.rows[0];
          // check if the user have already made an order of this same car
          if (orderFilter) {
            res.status(409).json({
              status: 409,
              error: 'you already ordered this car',
            });
            return;
          }
          const order = {
            buyer: decoded.id,
            car_id: req.body.car_id,
            amount: req.body.amount,
            status: 'pending',
          };
          const value = [order.buyer, order.car_id, order.amount, order.status];

          client.query(newOrder, value, (queryError2, queryResult2) => {
            done();
            if (queryError2) {
              res.status(500).json({
                status: 500,
                error: 'internal server error2',
              });
              return;
            }
            const dbOrder = queryResult2.rows[0];
            res.status(201).json({
              status: 201,
              data: {
                id: dbOrder.id,
                car_id: car.id,
                created_on: car.created_on,
                status: dbOrder.status,
                price: car.price,
                price_offerd: dbOrder.amount,
              },
            });
          });
        });
      });
    });
  }
}
const createOrders = new CreateOrders();
export default createOrders;
