import express from 'express';

import Signin from '../controller/signin';
import Signup from '../controller/signup';
import Carscreate from '../controller/createCar';
import Orders from '../controller/postOrder';
import CheckAuth from '../middleware/checkAuth';
import OrdersUpdate from '../controller/updateOrder';
import UpdatePrice from '../controller/updatePrice';
import View from '../controller/view';
import { upload } from '../middleware/cloudinary';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to my app',
  });
});
router.post('/api/v1/auth/signup', Signup.createUser);
router.post('/api/v1/auth/signin', Signin.signIn);
router.post('/api/v1/car', CheckAuth, upload.single('image_url'), Carscreate.createCar);
router.post('/api/v1/order', CheckAuth, Orders.createOrder);
router.patch('/api/v1/order/:id/price', CheckAuth, OrdersUpdate.updateOrders);
router.patch('/api/v1/car/:id/price', CheckAuth, UpdatePrice.priceUpdate);
router.patch('/api/v1/car/:id/status', CheckAuth, UpdatePrice.sold);
router.get('/api/v1/car/:id', CheckAuth, View.specific);
router.get('/api/v1/car', CheckAuth, View.soldOrAvailable);
router.get('/api/v1/car', View.unsold);
router.get('/api/v1/car', View.priceRange);
router.delete('/api/v1/car/:car_id', CheckAuth, View.deleteCar);

export default router;
