/* eslint-disable no-tabs */
const checkMail = 'SELECT * FROM users WHERE email = $1';
const newUser =	'INSERT INTO users(first_name, last_name, email, password, address, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
const newCar =	'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
const newCarWithImage =	'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, image_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
const newOrder =	'INSERT INTO orders(buyer, car_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *';
const checkCar = 'SELECT * FROM cars WHERE id = $1';
const checkOrder = 'SELECT * FROM orders WHERE id = $1';
const orderExist = 'SELECT * FROMs orders where car_id = $1 AND buyer= $2';
const updateOrder = 'UPDATE orders SET amount = $1 WHERE id = $2 RETURNING *';
const updateCarPrice = 'UPDATE cars SET price =$1 WHERE id = $2 RETURNING *';
const updateCarStatus = 'UPDATE cars SET status =$1 WHERE id = $2 RETURNING *';
const checkUser = 'SELECT * FROM users WHERE id = $1';
const checkCarStatus = 'SELECT * FROM cars WHERE status = $1';
const checkCarStatus2 = 'SELECT * FROM cars WHERE status IN($1, $2)';
const checkPriceRange = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3';
const checkAdmin = 'SELECT is_admin FROM users WHERE id = $1';
const deleteCar = 'DELETE FROM cars WHERE id = $1 RETURNING *';

export {
  newUser,
  checkMail,
  newCar,
  newCarWithImage,
  newOrder,
  checkCar,
  orderExist,
  checkOrder,
  updateOrder,
  updateCarPrice,
  updateCarStatus,
  checkUser,
  checkCarStatus,
  checkCarStatus2,
  checkPriceRange,
  checkAdmin,
  deleteCar,
};
