const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// Get all notifications for user
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const { read, limit = 50, skip = 0 } = req.query;

  let query = { user: req.user.id };

  // Filter by read status if specified
  if (read !== undefined) {
    query.read = read === 'true';
  }

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .populate('relatedProductId', 'name category quantity')
    .populate('relatedSaleId', 'total items');

  const total = await Notification.countDocuments(query);
  const unreadCount = await Notification.countDocuments({ user: req.user.id, read: false });

  res.status(200).json({
    success: true,
    data: notifications,
    meta: {
      total,
      unreadCount,
      limit: parseInt(limit),
      skip: parseInt(skip),
    },
  });
});

// Get single notification
exports.getNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id).populate(
    'relatedProductId'
  );

  if (!notification) {
    return next(
      new ErrorResponse(`Notification not found with id ${req.params.id}`, 404)
    );
  }

  // Verify ownership
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to access this notification', 401));
  }

  res.status(200).json({
    success: true,
    data: notification,
  });
});

// Mark notification as read
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true, runValidators: true }
  );

  if (!notification) {
    return next(
      new ErrorResponse(`Notification not found with id ${req.params.id}`, 404)
    );
  }

  // Verify ownership
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to access this notification', 401));
  }

  res.status(200).json({
    success: true,
    data: notification,
  });
});

// Mark all notifications as read
exports.markAllAsRead = asyncHandler(async (req, res, next) => {
  await Notification.updateMany({ user: req.user.id, read: false }, { read: true });

  const unreadCount = await Notification.countDocuments({ user: req.user.id, read: false });

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read',
    meta: {
      unreadCount,
    },
  });
});

// Delete notification
exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    return next(
      new ErrorResponse(`Notification not found with id ${req.params.id}`, 404)
    );
  }

  // Verify ownership
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to delete this notification', 401));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Delete all old notifications (admin utility)
exports.deleteOldNotifications = asyncHandler(async (req, res, next) => {
  const daysOld = req.body.daysOld || 90;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const result = await Notification.deleteMany({
    user: req.user.id,
    createdAt: { $lt: cutoffDate },
  });

  res.status(200).json({
    success: true,
    message: `Deleted ${result.deletedCount} old notifications`,
    data: result,
  });
});

// Create notification (internal use - not exposed via API)
exports.createNotification = asyncHandler(async (userId, notificationData) => {
  const notification = await Notification.create({
    user: userId,
    ...notificationData,
  });
  return notification;
});
