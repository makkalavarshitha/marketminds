import { useState, useEffect } from "react";

function ProductForm({ onAddProduct, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    mfgDate: "",
    expiry: "",
    sku: "",
    supplier: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Fish",
    "Grains & Cereals",
    "Snacks",
    "Beverages",
    "Bakery",
    "Frozen Foods",
    "Spices & Condiments",
    "Personal Care",
    "Other",
  ];

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name || !form.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    // Category validation
    if (!form.category) {
      newErrors.category = "Category is required";
    }

    // Price validation
    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Quantity validation
    if (!form.quantity && form.quantity !== "0") {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(form.quantity) || parseInt(form.quantity) < 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    // SKU validation
    if (!form.sku || !form.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    // Supplier validation
    if (!form.supplier || !form.supplier.trim()) {
      newErrors.supplier = "Supplier is required";
    }

    // Date validation
    if (form.mfgDate && form.expiry) {
      if (new Date(form.mfgDate) > new Date(form.expiry)) {
        newErrors.expiry = "Expiry date must be after manufacturing date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      category: true,
      price: true,
      quantity: true,
      sku: true,
      supplier: true,
    });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await onAddProduct({
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
      });

      setForm({
        name: "",
        category: "",
        price: "",
        quantity: "",
        mfgDate: "",
        expiry: "",
        sku: "",
        supplier: "",
      });
      setTouched({});
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prev) => ({ ...prev, submit: error.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 max-w-5xl mx-auto mb-8">
      
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>

        {editingProduct && (
          <button
            onClick={onCancel}
            type="button"
            className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50"
            disabled={loading}
          >
            ✕
          </button>
        )}
      </div>

      {errors.submit && (
        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-red-600 text-sm font-medium">Error: {errors.submit}</p>
        </div>
      )}

      {/* Product Details Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            placeholder="Enter product name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name && touched.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.name && touched.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            SKU / Barcode *
          </label>
          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            onBlur={() => handleBlur("sku")}
            placeholder="Enter SKU"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.sku && touched.sku
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.sku && touched.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            onBlur={() => handleBlur("category")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.category && touched.category
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && touched.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            onBlur={() => handleBlur("price")}
            placeholder="Enter price"
            step="0.01"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.price && touched.price
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.price && touched.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            onBlur={() => handleBlur("quantity")}
            placeholder="Enter quantity"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.quantity && touched.quantity
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.quantity && touched.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Supplier *
          </label>
          <input
            type="text"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            onBlur={() => handleBlur("supplier")}
            placeholder="Enter supplier name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.supplier && touched.supplier
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.supplier && touched.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
        </div>

        {/* Manufacturing Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Manufacturing Date
          </label>
          <input
            type="date"
            name="mfgDate"
            value={form.mfgDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.expiry && touched.expiry
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.expiry && touched.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold shadow transition"
          >
            {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-800 py-3 rounded-lg font-semibold shadow transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;