const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.getSales = asyncHandler(async (req, res) => {
  const { limit = 50, skip = 0 } = req.query;

  const sales = await Sale.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  const total = await Sale.countDocuments({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: sales.length,
    total,
    limit: parseInt(limit),
    skip: parseInt(skip),
    data: sales,
  });
});

exports.createSale = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const sale = await Sale.create(req.body);

  // Deduct quantities from inventory and check for low stock
  for (const item of sale.items) {
    if (item.productId) {
      const updatedProduct = await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.qty } },
        { new: true }
      );

      // Check if product is now low stock
      if (updatedProduct && updatedProduct.quantity <= 5 && updatedProduct.quantity > 0) {
        await Notification.create({
          user: req.user.id,
          type: 'low_stock',
          title: 'Low Stock Alert',
          message: `"${updatedProduct.name}" is running low (${updatedProduct.quantity} units remaining)`,
          relatedProductId: updatedProduct._id,
          actionUrl: '/product-table',
        });
      }

      // Check if product is now out of stock
      if (updatedProduct && updatedProduct.quantity === 0) {
        await Notification.create({
          user: req.user.id,
          type: 'inventory_alert',
          title: 'Out of Stock',
          message: `"${updatedProduct.name}" is now out of stock`,
          relatedProductId: updatedProduct._id,
          actionUrl: '/product-table',
        });
      }
    }
  }

  // Create sale completion notification
  await Notification.create({
    user: req.user.id,
    type: 'sale_completed',
    title: 'Sale Completed',
    message: `Sale of ₹${sale.total} completed (${sale.items.length} items)`,
    relatedSaleId: sale._id,
    actionUrl: '/billing',
  });

  res.status(201).json({ success: true, data: sale });
});

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalSalesToday, recentSales, products] = await Promise.all([
    Sale.aggregate([
      { $match: { user: userId, createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } },
    ]),
    Sale.find({ user: userId }).sort({ createdAt: -1 }).limit(10),
    Product.find({ user: userId }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      salesToday: totalSalesToday[0] || { total: 0, count: 0 },
      recentSales,
      totalProducts: products.length,
      lowStock: products.filter(p => p.quantity <= 5).length,
      outOfStock: products.filter(p => p.quantity === 0).length,
    },
  });
});