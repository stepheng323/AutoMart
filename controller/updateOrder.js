import Joi from 'joi';
import pg from 'pg';

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
    // ready Database for query
    const config = {
      user: 'abiodun' || 'owxxiojqpvmffq',
      database: process.env.DATABASE || 'd7k5b8u2k7s9rp',
      password: process.env.PASSWORD || '849b56cbbb20121dc14ee194301797bbfec60cfbbe16e20dd5a028ed6e90c667',
      port: process.env.DB_PORT,
      max: 10,
      idleTimeoutMillis: 30000,
    };

    const pool = new pg.Pool(config);

    pool.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('connected to the database');
    });

    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: 'could not connect to the database',
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
        done();
      });
    });
  }
}
const ordersUpdate = new UpdateOrders();
export default ordersUpdate;
