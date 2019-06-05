import express from 'express';
import controller from '../controller/signup';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/api/v1/auth/signup', controller.createUser);

export default router;
