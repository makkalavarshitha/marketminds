const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.ObjectId, ref: 'Product' },
  name: String,
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const saleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  customerName: { type: String, default: 'Walk-in' },
  phoneNumber: String,
  items: [saleItemSchema],
  subtotal: { type: Number, required: true },
  discountType: { type: String, enum: ['none', 'percentage', 'flat'], default: 'none' },
  discountValue: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'upi', 'card'], default: 'cash' },
  status: { type: String, enum: ['Paid', 'Pending', 'Refunded'], default: 'Paid' },
}, { timestamps: true });

// Indexes for performance optimization
saleSchema.index({ user: 1, createdAt: -1 }); // List sales by user, newest first
saleSchema.index({ status: 1, paymentMethod: 1 }); // Filter by status and payment method

module.exports = mongoose.model('Sale', saleSchema);