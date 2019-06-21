import joi from 'joi';
import pg from 'pg';

class UpdatePrice {
  // eslint-disable-next-line class-methods-use-this
  priceUpdate(req, res) {
    const schema = {
      price: joi.number().required(),
    };
    const result = joi.validate(req.body, schema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    // ready Database for query
    const config = {
      user: 'abiodun',
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.DB_PORT,
      max: 10,
      idleTimeoutMillis: 30000,
    };

    const pool = new pg.Pool(config);

    pool.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('connected to the Database');
    });

    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: 'could not connect to the pool',
        });
        return;
      }
      const query = 'SELECT * FROM cars WHERE id = $1';
      const value = [req.params.id];

      client.query(query, value, (queryError, results) => {
        if (queryError) {
          res.status(500).json({
            status: 500,
            error: `${queryError}`,
          });
          return;
        }
        const decoded = req.userData;
        const car = results.rows[0];
        if (!car) {
          res.status(404).json({
            status: 404,
            error: 'car not found',
          });
          return;
        }

        // check to see if the user is the car owner
        if (decoded.id !== car.owner) {
          res.status(403).json({
            status: 403,
            error: 'you can only update cars you posted',
          });
          return;
        }
        if (car.status !== 'sold') {
          const query2 = 'UPDATE cars SET price =$1 WHERE id = $2 RETURNING *';
          const value2 = [req.body.price, req.params.id];

          client.query(query2, value2, (queryError2, result2) => {
            done();
            if (queryError2) {
              res.status(500).json({
                status: 500,
                error: `${queryError2}`,
              });
              return;
            }
            const car2 = result2.rows[0];

            res.status(200).json({
              status: 200,
              data: {
                id: car2.id,
                email: decoded.email,
                created_on: car2.created_on,
                manufacturer: car2.manufacturer,
                model: car2.model,
                price: car2.price,
                state: car2.state,
                status: car2.status,
              },
            });
          });
        } else {
          res.status(404).json({
            status: 404,
            error: 'car can only be updated when status is available',
          });
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  sold(req, res) {
    const schema = {
      status: joi.string().required(),
    };
    const result = joi.validate(req.body, schema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }

    // ready Database for query
    const config = {
      user: 'abiodun',
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.DB_PORT,
      max: 10,
      idleTimeoutMillis: 30000,
    };

    const pool = new pg.Pool(config);

    pool.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('Connected to the Database');
    });

    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: 'Could not connect to the database',
        });
        return;
      }
      const query = 'SELECT * FROM cars WHERE id = $1';
      const value = [req.params.id];

      client.query(query, value, (queryError, results) => {
        if (queryError) {
          res.status(400).json({
            status: 400,
            error: `${queryError}`,
          });
          return;
        }
        const car = results.rows[0];

        if (!car) {
          res.status(404).json({
            status: 404,
            error: 'car not found',
          });
          return;
        }

        const decoded = req.userData;

        if (decoded.id !== car.owner) {
          res.status(404).json({
            status: 404,
            error: 'you can only update cars you posted',
          });
          return;
        }
        if (car.status !== 'sold') {
          const query2 = 'UPDATE cars SET status =$1 WHERE id = $2 RETURNING *';
          const value2 = [req.body.status, req.params.id];

          client.query(query2, value2, (queryError2, result2) => {
            done();
            const car2 = result2.rows[0];

            res.status(201).json({
              status: 201,
              data: {
                id: car2.id,
                email: decoded.email,
                created_on: car2.created_on,
                manufacturer: car2.manufacturer,
                model: car2.model,
                price: car2.price,
                state: car2.state,
                status: car2.status,
              },
            });
          });
        } else {
          res.status(403).json({
            status: 403,
            error: 'A car can only be updated when the status is available',
          });
        }
      });
    });
  }
}
const updatePrice = new UpdatePrice();
export default updatePrice;
