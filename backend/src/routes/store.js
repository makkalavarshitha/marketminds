const express = require('express');
const { getStoreProfile, upsertStoreProfile } = require('../controllers/storeController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);

router.route('/').get(getStoreProfile).put(upsertStoreProfile);

module.exports = router;