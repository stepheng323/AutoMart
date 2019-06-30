import Joi from 'joi';
import dotenv from 'dotenv';
import { orderSchema } from '../model/orders';
import pool from '../config';

dotenv.config();

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
    pool.connect((err, client, done) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('unable to connect to pool');
        return;
      }
      const decoded = req.userData;
      const order = {
        buyer: decoded.id,
        car_id: req.body.car_id,
        amount: req.body.amount,
        status: 'pending',
      };

      const query =				'INSERT INTO orders(buyer, car_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *';
      const value = [order.buyer, order.car_id, order.amount, order.status];

      client.query(query, value, (queryError, queryResult) => {
        if (queryError) {
          res.status(400).json({
            status: 500,
            errorr: 'server error',
          });
          return;
        }

        const dbResult = queryResult.rows[0];
        const query2 = 'SELECT * FROM cars WHERE id = $1';
        const id = [dbResult.car_id];

        client.query(query2, id, (queryError2, queryResult2) => {
          done();
          if (queryError2) {
            res.status(400).json({
              status: 500,
              error: 'server error',
            });
            return;
          }
          const dbResult2 = queryResult2.rows[0];
          res.status(201).json({
            status: 201,
            data: {
              id: dbResult.id,
              car_id: dbResult.car_id,
              created_on: dbResult2.created_on,
              status: dbResult.status,
              price: dbResult2.price,
              price_offerd: dbResult.amount,
            },
          });
        });
      });
    });
  }
}
const createOrders = new CreateOrders();
export default createOrders;
