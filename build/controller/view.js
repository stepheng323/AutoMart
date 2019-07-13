"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: "specific",
    // eslint-disable-next-line class-methods-use-this
    value: function specific(req, res, next) {
      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: "could not connect ".concat(err)
          });
          return;
        }

        var query = 'SELECT * FROM cars WHERE id = $1';
        var value = [req.params.id];
        client.query(query, value, function (error, results) {
          if (error) {
            res.status(400).json({
              status: 400,
              error: "".concat(error)
            });
            return;
          }

          done();
          var data = results.rows[0];

          if (!data) {
            res.status(404).json({
              status: 404,
              error: 'car with the specified id not found'
            });
            return;
          }

          res.status(200).json({
            status: 200,
            data: data
          });
          next();
        });
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "soldOrAvailable",
    value: function soldOrAvailable(req, res, next) {
      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: "could not connect ".concat(err)
          });
          return;
        }

        var decoded = req.userData;
        var query = 'SELECT * FROM users WHERE id = $1';
        var value = [decoded.id];
        client.query(query, value, function (error, results) {
          if (error) {
            res.status(400).json({
              status: 400,
              error: "".concat(error)
            });
            return;
          }

          var user = results.rows[0];

          if (!user) {
            res.status(403).json({
              status: 403,
              error: 'you must be logged in'
            });
            return;
          }

          var query2 = 'SELECT * FROM cars WHERE status IN($1, $2)';
          var value2 = ['available', 'sold'];

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

          client.query(query2, value2, function (queryError2, results2) {
            done();

            if (queryError2) {
              res.status(400).json({
                status: 400,
                error: "".concat(error)
              });
              return;
            }

            var availableOrSold = results2.rows;

            if (!availableOrSold) {
              res.status(404).json({
                status: 404,
                error: 'no cars found'
              });
              return;
            }

            res.status(200).json({
              status: 200,
              data: availableOrSold
            });
          });
        });
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "unsold",
    value: function unsold(req, res, next) {
      if (req.query.min_price && req.query.max_price) {
        next();
        return;
      }

      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: 'could not connect to the pool'
          });
          return;
        }

        var query3 = 'SELECT * FROM cars WHERE status = $1';
        var value3 = [req.query.status];
        client.query(query3, value3, function (error, results) {
          if (error) {
            res.status(400).json({
              status: 400,
              error: "".concat(error)
            });
            return;
          }

          done();
          var available = results.rows;

          if (!available) {
            res.status(404).json({
              status: 404,
              error: 'no cars found'
            });
            return;
          }

          res.status(200).json({
            status: 200,
            data: available
          });
        });
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "priceRange",
    value: function priceRange(req, res) {
      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: 'could not connect to the pool'
          });
          return;
        }

        var query4 = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3';
        var value4 = [req.query.status, req.query.min_price, req.query.max_price];
        client.query(query4, value4, function (error, results) {
          done();

          if (error) {
            res.status(500).json({
              status: 500,
              error: "".concat(error)
            });
            return;
          }

          var filtered = results.rows;

          if (!filtered) {
            res.status(404).json({
              status: 404,
              error: 'no cars found'
            });
            return;
          }

          res.status(200).json({
            status: 200,
            data: filtered
          });
        });
      });
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "deleteCar",
    value: function deleteCar(req, res) {
      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: 'could not connect to the pool'
          });
          return;
        }

        var decoded = req.userData;
        var query5 = 'SELECT is_admin FROM users WHERE id = $1';
        var value5 = [decoded.id];
        client.query(query5, value5, function (error, results) {
          if (error) {
            res.status(500).json({
              status: 500,
              error: "".concat(error)
            });
            return;
          }

          var user = results.rows[0];

          if (user.is_admin) {
            var query = 'DELETE FROM cars WHERE id = $1 RETURNING *';
            var value = [req.params.car_id];
            client.query(query, value, function (queryError, queryResults) {
              done();

              if (queryError) {
                res.status(500).json({
                  status: 500,
                  error: "".concat(queryError)
                });
                return;
              }

              if (!queryResults.rows[0]) {
                res.status(400).json({
                  status: 400,
                  error: 'car not found'
                });
                return;
              }

              res.status(200).json({
                status: 200,
                data: 'Car ad succefully deleted'
              });
            });
          } else {
            res.status(403).json({
              status: 403,
              data: 'Only an admin can delete cars ad'
            });
          }
        });
      });
    }
  }]);

  return View;
}();

var view = new View();
var _default = view;
exports["default"] = _default;