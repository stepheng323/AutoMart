import pool from '../config';

class View {
  // eslint-disable-next-line class-methods-use-this
  specific(req, res, next) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: `could not connect ${err}`,
        });
        return;
      }
      const query = 'SELECT * FROM cars WHERE id = $1';
      const value = [req.params.id];

      client.query(query, value, (error, results) => {
        if (error) {
          res.status(400).json({
            status: 400,
            error: `${error}`,
          });
          return;
        }
        done();
        const data = results.rows[0];
        if (!data) {
          res.status(404).json({
            status: 404,
            error: 'car with the specified id not found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          data,
        });
        next();
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  soldOrAvailable(req, res, next) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: `could not connect ${err}`,
        });
        return;
      }
      const decoded = req.userData;
      const query = 'SELECT * FROM users WHERE id = $1';
      const value = [decoded.id];

      client.query(query, value, (error, results) => {
        if (error) {
          res.status(400).json({
            status: 400,
            error: `${error}`,
          });
          return;
        }
        const user = results.rows[0];

        if (!user) {
          res.status(403).json({
            status: 403,
            error: 'you must be logged in',
          });
          return;
        }
        const query2 = 'SELECT * FROM cars WHERE status IN($1, $2)';
        const value2 = ['available', 'sold'];

        if (!user.is_admin) {
          next();
          return;
        }
        if (req.query.min_price && req.query.max_price) {
          next();
          return;
        }
        client.query(query2, value2, (queryError2, results2) => {
          done();
          if (queryError2) {
            res.status(400).json({
              status: 400,
              error: `${error}`,
            });
            return;
          }
          const availableOrSold = results2.rows;
          if (!availableOrSold) {
            res.status(404).json({
              status: 404,
              error: 'no cars found',
            });
            return;
          }
          res.status(200).json({
            status: 200,
            availableOrSold,
          });
        });
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  unsold(req, res, next) {
    if (req.query.min_price && req.query.max_price) {
      next();
      return;
    }
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'could not connect to the pool',
        });
        return;
      }
      const query3 = 'SELECT * FROM cars WHERE status = $1';
      const value3 = [req.query.status];

      client.query(query3, value3, (error, results) => {
        if (error) {
          res.status(400).json({
            status: 400,
            error: `${error}`,
          });
          return;
        }
        done();
        const available = results.rows;

        if (!available) {
          res.status(404).json({
            status: 404,
            error: 'no cars found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          available,
        });
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  priceRange(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'could not connect to the pool',
        });
        return;
      }
      const query4 = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3';
      const value4 = [req.query.status, req.query.min_price, req.query.max_price];
      client.query(query4, value4, (error, results) => {
        done();
        if (error) {
          res.status(500).json({
            status: 500,
            error: `${error}`,
          });
          return;
        }
        const filtered = results.rows;
        if (!filtered) {
          res.status(404).json({
            status: 404,
            error: 'no cars found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          filtered,
        });
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  deleteCar(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'could not connect to the pool',
        });
        return;
      }
      const decoded = req.userData;
      const query5 = 'SELECT is_admin FROM users WHERE id = $1';
      const value5 = [decoded.id];

      client.query(query5, value5, (error, results) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error: `${error}`,
          });
          return;
        }
        const user = results.rows[0];
        if (user.is_admin) {
          const query = 'DELETE FROM cars WHERE id = $1 RETURNING *';
          const value = [req.params.car_id];

          client.query(query, value, (queryError, queryResults) => {
            done();
            if (queryError) {
              res.status(500).json({
                status: 500,
                error: `${queryError}`,
              });
              return;
            }
            if (!queryResults.rows[0]) {
              res.status(400).json({
                status: 400,
                error: 'car not found',
              });
              return;
            }

            res.status(200).json({
              status: 200,
              data: 'Car ad succefully deleted',
            });
          });
        } else {
          res.status(403).json({
            status: 403,
            data: 'Only an admin can delete cars ad',
          });
        }
      });
    });
  }
}
const view = new View();
export default view;
