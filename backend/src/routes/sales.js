const express = require('express');
const { getSales, createSale, getDashboardStats } = require('../controllers/saleController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);

router.get('/dashboard/stats', getDashboardStats);
router.route('/').get(getSales).post(createSale);

module.exports = router;