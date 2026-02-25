/**
 * Utility functions for MarketMind
 */

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Calculate days until expiry
export const daysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null;
  const today = new Date();
  const expiry = new Date(expiryDate);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

// Get expiry status
export const getExpiryStatus = (expiryDate) => {
  const days = daysUntilExpiry(expiryDate);
  if (days === null) return "no-expiry";
  if (days < 0) return "expired";
  if (days <= 7) return "urgent";
  if (days <= 30) return "soon";
  return "good";
};

// Calculate total inventory value
export const calculateTotalValue = (products) => {
  return products.reduce((sum, p) => sum + (p.price * p.quantity || 0), 0);
};

// Get low stock items
export const getLowStockItems = (products, threshold = 5) => {
  return products.filter((p) => p.quantity < threshold);
};

// Get expiring items
export const getExpiringItems = (products, daysThreshold = 30) => {
  return products.filter((p) => {
    const days = daysUntilExpiry(p.expiry);
    return days !== null && days <= daysThreshold && days > 0;
  });
};

// Get expired items
export const getExpiredItems = (products) => {
  return products.filter((p) => {
    const days = daysUntilExpiry(p.expiry);
    return days !== null && days < 0;
  });
};

// Format currency
export const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};

// Generate report
export const generateInventoryReport = (products) => {
  return {
    totalProducts: products.length,
    totalValue: calculateTotalValue(products),
    lowStockItems: getLowStockItems(products),
    expiringItems: getExpiringItems(products),
    expiredItems: getExpiredItems(products),
    categories: [...new Set(products.map((p) => p.category).filter(Boolean))],
    outOfStock: products.filter((p) => p.quantity === 0).length,
  };
};

// Export to CSV (future feature)
export const exportToCSV = (products) => {
  const headers = [
    "Product Name",
    "SKU",
    "Category",
    "Price",
    "Quantity",
    "Manufacturing Date",
    "Expiry Date",
    "Total Value",
  ];

  const rows = products.map((p) => [
    p.name,
    p.sku || "",
    p.category || "",
    p.price,
    p.quantity,
    p.mfgDate || "",
    p.expiry || "",
    (p.price * p.quantity).toFixed(2),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
};

// Download CSV file
export const downloadCSV = (filename, csvContent) => {
  const element = document.createElement("a");
  element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
