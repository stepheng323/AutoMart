import express from 'express';
import signin from '../controller/signin';
import signup from '../controller/signup';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/api/v1/auth/signup', signup.createUser);
router.post('/api/v1/auth/signin', signin.signIn);

export default router;
