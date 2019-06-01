const express = require('express');
const controller = require('../controller/signup');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/api/v1/auth/signup', controller.postUser);

module.exports = router;
