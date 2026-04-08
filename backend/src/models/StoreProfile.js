const mongoose = require('mongoose');

const storeProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  storeName: { type: String, required: true },
  ownerName: String,
  phone: String,
  address: String,
  gstNumber: String,
  upiId: String,
}, { timestamps: true });

module.exports = mongoose.model('StoreProfile', storeProfileSchema);