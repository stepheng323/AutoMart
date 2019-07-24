/* eslint-disable class-methods-use-this */
import pool from '../config';
import {
  checkCar,
  checkUser,
  checkCarStatus,
  checkCarStatus2,
  checkPriceRange,
  checkAdmin,
  deleteCar,
} from '../helpers/query';

class View {
  specific(req, res, next) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'internal server error',
        });
        return;
      }

      client.query(checkCar, [req.params.id], (error, results) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error: 'internal server error',
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

  soldOrAvailable(req, res, next) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'internal server error',
        });
        return;
      }
      const decoded = req.userData;

      client.query(checkUser, [decoded.id], (error, results) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error: 'internal server error',
          });
          return;
        }
        const user = results.rows[0];
        if (!user.is_admin) {
          next();
          return;
        }
        if (req.query.status === 'available') {
          next();
          return;
        }
        if (req.query.min_price && req.query.max_price) {
          next();
          return;
        }

        client.query(checkCarStatus2, ['available', 'sold'], (queryError2, results2) => {
          done();
          if (queryError2) {
            res.status(500).json({
              status: 500,
              error: 'internal server error',
            });
            return;
          }
          const availableOrSold = results2.rows;
          if (!availableOrSold) {
            res.status(404).json({
              status: 404,
              error: 'no car found',
            });
            return;
          }
          res.status(200).json({
            status: 200,
            data: availableOrSold,
          });
        });
      });
    });
  }

  
  unsold(req, res, next) {
    if (req.query.min_price && req.query.max_price) {
      next();
      return;
    }
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'internal server error',
        });
        return;
      }

      client.query(checkCarStatus, [req.query.status], (error, results) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
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
          data: available,
        });
      });
    });
  }

  priceRange(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'internal server error',
        });
        return;
      }
      const value4 = [req.query.status, req.query.min_price, req.query.max_price];
      client.query(checkPriceRange, value4, (error, results) => {
        done();
        if (error) {
          res.status(500).json({
            status: 500,
            error: 'internal server error',
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
          data: filtered,
        });
      });
    });
  }

  deleteCar(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'internal server error',
        });
        return;
      }
      const decoded = req.userData;
      client.query(checkAdmin, [decoded.id], (error, results) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
          });
          return;
        }
        const user = results.rows[0];
        if (user.is_admin) {
          client.query(deleteCar, [req.params.car_id], (queryError, queryResults) => {
            done();
            if (queryError) {
              res.status(500).json({
                status: 500,
                error: 'Internal Server Error',
              });
              return;
            }
            if (!queryResults.rows[0]) {
              res.status(404).json({
                status: 404,
                error: 'no car found',
              });
              return;
            }
            res.status(200).json({
              status: 200,
              data: 'car ad successfully deleted',
            });
          });
        } else {
          res.status(403).json({
            status: 403,
            error: 'Only admin can delete a car',
          });
        }
      });
    });
  }
}
const view = new View();
export default view;
