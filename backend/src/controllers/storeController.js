const StoreProfile = require('../models/StoreProfile');
const asyncHandler = require('../middleware/async');

exports.getStoreProfile = asyncHandler(async (req, res) => {
  const profile = await StoreProfile.findOne({ user: req.user.id });
  res.status(200).json({ success: true, data: profile || null });
});

exports.upsertStoreProfile = asyncHandler(async (req, res) => {
  const profile = await StoreProfile.findOneAndUpdate(
    { user: req.user.id },
    { ...req.body, user: req.user.id },
    { new: true, upsert: true, runValidators: true }
  );
  res.status(200).json({ success: true, data: profile });
});