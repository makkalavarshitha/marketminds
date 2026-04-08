const express = require('express');
const auth = require('./auth');
const products = require('./products');
const sales = require('./sales');
const store = require('./store');
const notifications = require('./notifications');

const router = express.Router();
router.use('/auth', auth);
router.use('/products', products);
router.use('/sales', sales);
router.use('/store', store);
router.use('/notifications', notifications);

module.exports = router;