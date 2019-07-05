import Joi from 'joi';
import pool from '../config';

class UpdateOrders {
  // eslint-disable-next-line class-methods-use-this
  updateOrders(req, res) {
    // validate users input
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
    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: 'could not connect to the pool',
        });
        return;
      }
      const query = 'SELECT * FROM orders WHERE id = $1';
      const value = [req.params.id];

      client.query(query, value, (queryError, results) => {
        if (queryError) {
          res.status(400).json({
            status: 400,
            error: `${queryError}`,
          });
          return;
        }
        const decoded = req.userData;
        const order = results.rows[0];

        if (!order) {
          res.status(404).json({
            status: 404,
            error: 'order not found',
          });
          return;
        }

        if (decoded.id !== order.buyer) {
          res.status(403).json({
            status: 403,
            error: 'you can only update orders you posted',
          });
          return;
        }
        if (order.status === 'pending') {
          const query2 = 'UPDATE orders SET amount = $1 WHERE id = $2 RETURNING *';
          const value2 = [req.body.new_price_offered, req.params.id];

          client.query(query2, value2, (queryError2, queryResult2) => {
            const order2 = queryResult2.rows[0];
            if (queryError2) {
              res.status(400).json({
                status: 400,
                error: `${queryError2}`,
              });
              return;
            }
            done();
            res.status(201).json({
              status: 201,
              data: {
                id: order.id,
                car_id: order.car_id,
                status: order.status,
                old_price_offered: order.amount,
                new_price_offered: order2.amount,
              },
            });
          });
        } else {
          res.status(403).json({
            status: 403,
            error: 'you can only update pending order',
          });
        }
      });
    });
  }
}
const ordersUpdate = new UpdateOrders();
export default ordersUpdate;
