import express from 'express';

import signin from '../controller/signin';
import signup from '../controller/signup';
import carscreate from '../controller/createCar';
import orders from '../controller/postOrder';
import checkAuth from '../middleware/checkAuth';
import ordersUpdate from '../controller/updateOrder';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/api/v1/auth/signup', signup.createUser);
router.post('/api/v1/auth/signin', signin.signIn);
router.post('/api/v1/car', checkAuth, carscreate.createCar);
router.post('/api/v1/order', checkAuth, orders.createOrder);
router.patch('/api/v1/order/:id/price', ordersUpdate.updateOrders);

export default router;
