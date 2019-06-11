import express from 'express';

import signin from '../controller/signin';
import signup from '../controller/signup';
import carscreate from '../controller/createCar';
import orders from '../controller/postOrder';
import checkAuth from '../middleware/checkAuth';
import ordersUpdate from '../controller/updateOrder';
import updatePrice from '../controller/updatePrice';
import view from '../controller/view';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/api/v1/auth/signup', signup.createUser);
router.post('/api/v1/auth/signin', signin.signIn);
router.post('/api/v1/car', checkAuth, carscreate.createCar);
router.post('/api/v1/order', checkAuth, orders.createOrder);
router.patch('/api/v1/order/:id/price', checkAuth, ordersUpdate.updateOrders);
router.patch('/api/v1/car/:id/price', checkAuth, updatePrice.priceUpdate);
router.patch('/api/v1/car/:id/status', checkAuth, updatePrice.sold);
router.get('/api/v1/car/:id', view.specific);
router.get('/api/v1/car', view.unsold);
router.get('/api/v1/car', view.priceRange);

export default router;
