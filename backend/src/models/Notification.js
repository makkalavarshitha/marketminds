const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['product_added', 'low_stock', 'expiry_warning', 'sale_completed', 'inventory_alert'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedProductId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    relatedSaleId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Sale',
    },
    read: {
      type: Boolean,
      default: false,
    },
    actionUrl: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, read: 1 });

// TTL index: auto-delete notifications after 90 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('Notification', notificationSchema);
