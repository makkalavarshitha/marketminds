const express = require('express');
const {
  getNotifications,
  getNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteOldNotifications,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all notifications
router.get('/', getNotifications);

// Get single notification
router.get('/:id', getNotification);

// Mark single notification as read
router.put('/:id', markAsRead);

// Mark all notifications as read
router.put('/mark-all/read', markAllAsRead);

// Delete notification
router.delete('/:id', deleteNotification);

// Delete old notifications
router.delete('/cleanup/old', deleteOldNotifications);

module.exports = router;
