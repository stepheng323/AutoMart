"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCar = exports.checkAdmin = exports.checkPriceRange = exports.checkCarStatus2 = exports.checkCarStatus = exports.checkUser = exports.updateCarStatus = exports.updateCarPrice = exports.updateOrder = exports.checkOrder = exports.orderExist = exports.checkCar = exports.newOrder = exports.newCarWithImage = exports.newCar = exports.checkMail = exports.newUser = void 0;

/* eslint-disable no-tabs */
var checkMail = 'SELECT * FROM users WHERE email = $1';
exports.checkMail = checkMail;
var newUser = 'INSERT INTO users(first_name, last_name, email, password, address, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
exports.newUser = newUser;
var newCar = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, color, year, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
exports.newCar = newCar;
var newCarWithImage = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, image_url, color, year, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *';
exports.newCarWithImage = newCarWithImage;
var newOrder = 'INSERT INTO orders(buyer, car_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *';
exports.newOrder = newOrder;
var checkCar = 'SELECT * FROM cars WHERE id = $1';
exports.checkCar = checkCar;
var checkOrder = 'SELECT * FROM orders WHERE id = $1';
exports.checkOrder = checkOrder;
var orderExist = 'SELECT * FROM orders where car_id = $1 AND buyer= $2';
exports.orderExist = orderExist;
var updateOrder = 'UPDATE orders SET amount = $1 WHERE id = $2 RETURNING *';
exports.updateOrder = updateOrder;
var updateCarPrice = 'UPDATE cars SET price =$1 WHERE id = $2 RETURNING *';
exports.updateCarPrice = updateCarPrice;
var updateCarStatus = 'UPDATE cars SET status =$1 WHERE id = $2 RETURNING *';
exports.updateCarStatus = updateCarStatus;
var checkUser = 'SELECT * FROM users WHERE id = $1';
exports.checkUser = checkUser;
var checkCarStatus = 'SELECT * FROM cars WHERE status = $1 ORDER BY id DESC';
exports.checkCarStatus = checkCarStatus;
var checkCarStatus2 = 'SELECT * FROM cars WHERE status IN($1, $2)';
exports.checkCarStatus2 = checkCarStatus2;
var checkPriceRange = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3 AND year >= $4 AND year <= $5 AND state =$6 AND manufacturer=$7 AND model =$8';
exports.checkPriceRange = checkPriceRange;
var checkAdmin = 'SELECT is_admin FROM users WHERE id = $1';
exports.checkAdmin = checkAdmin;
var deleteCar = 'DELETE FROM cars WHERE id = $1 RETURNING *';
exports.deleteCar = deleteCar;