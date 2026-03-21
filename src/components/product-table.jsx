import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductTable({ onDelete, onEdit, onQuickSave, filterCategory, setFilterCategory, allProducts }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [supplierFilter, setSupplierFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [stockModalProduct, setStockModalProduct] = useState(null);
  const [bulkStockQty, setBulkStockQty] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [scanValue, setScanValue] = useState("");

  const itemsPerPage = 10;
  const today = new Date();

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const diff = new Date(expiryDate) - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getStatusMeta = (product) => {
    const qty = Number(product.quantity || 0);
    const days = getDaysUntilExpiry(product.expiry);

    if (days !== null && days < 0) {
      return {
        label: "Expired",
        badge: "bg-red-100 text-red-700",
        row: "bg-red-50/60",
      };
    }
    if (days !== null && days <= 3) {
      return {
        label: "Expiring Soon",
        badge: "bg-orange-100 text-orange-700",
        row: "bg-orange-50/50",
      };
    }
    if (qty === 0) {
      return {
        label: "Out of Stock",
        badge: "bg-red-100 text-red-700",
        row: "bg-red-50/40",
      };
    }
    if (qty <= 5) {
      return {
        label: "Low Stock",
        badge: "bg-yellow-100 text-yellow-700",
        row: "bg-yellow-50/50",
      };
    }

    return {
      label: "Healthy",
      badge: "bg-green-100 text-green-700",
      row: "",
    };
  };

  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
  const suppliers = [...new Set(allProducts.map((p) => p.supplier).filter(Boolean))];

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    let result = allProducts.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      const barcode = String(p.barcode || p.sku || "").toLowerCase();
      const supplier = (p.supplier || "").toLowerCase();
      const price = Number(p.price || 0);
      const qty = Number(p.quantity || 0);
      const days = getDaysUntilExpiry(p.expiry);

      const matchesSearch =
        q === "" ||
        name.includes(q) ||
        category.includes(q) ||
        barcode.includes(q);

      const matchesCategory = filterCategory === "" || p.category === filterCategory;
      const matchesSupplier = supplierFilter === "" || p.supplier === supplierFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && qty > 0 && qty <= 5) ||
        (stockFilter === "out" && qty === 0) ||
        (stockFilter === "healthy" && qty > 5);

      const matchesExpiry =
        expiryFilter === "all" ||
        (expiryFilter === "today" && days === 0) ||
        (expiryFilter === "3days" && days !== null && days >= 0 && days <= 3) ||
        (expiryFilter === "7days" && days !== null && days >= 0 && days <= 7) ||
        (expiryFilter === "expired" && days !== null && days < 0);

      const matchesMinPrice = minPrice === "" || price >= Number(minPrice);
      const matchesMaxPrice = maxPrice === "" || price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSupplier &&
        matchesStock &&
        matchesExpiry &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    result.sort((a, b) => {
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "price") return Number(a.price || 0) - Number(b.price || 0);
      if (sortBy === "quantity") return Number(a.quantity || 0) - Number(b.quantity || 0);
      if (sortBy === "expiry") {
        return new Date(a.expiry || "9999-12-31") - new Date(b.expiry || "9999-12-31");
      }
      return 0;
    });

    return result;
  }, [
    allProducts,
    searchTerm,
    filterCategory,
    supplierFilter,
    stockFilter,
    expiryFilter,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const analytics = {
    total: allProducts.length,
    lowStock: allProducts.filter((p) => Number(p.quantity || 0) > 0 && Number(p.quantity || 0) <= 5).length,
    expiringSoon: allProducts.filter((p) => {
      const days = getDaysUntilExpiry(p.expiry);
      return days !== null && days >= 0 && days <= 3;
    }).length,
    expired: allProducts.filter((p) => {
      const days = getDaysUntilExpiry(p.expiry);
      return days !== null && days < 0;
    }).length,
    value: allProducts.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.quantity || 0), 0),
  };

  const toggleSelectAllPage = (checked) => {
    if (!checked) {
      setSelectedIds((prev) => prev.filter((id) => !paginatedProducts.some((p) => p.id === id)));
      return;
    }
    setSelectedIds((prev) => {
      const set = new Set(prev);
      paginatedProducts.forEach((p) => set.add(p.id));
      return [...set];
    });
  };

  const toggleSelectOne = (id, checked) => {
    setSelectedIds((prev) => (checked ? [...new Set([...prev, id])] : prev.filter((v) => v !== id)));
  };

  const bulkDelete = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach((id) => onDelete(id));
    setSelectedIds([]);
  };

  const applyBulkStock = () => {
    const addQty = Number(bulkStockQty);
    if (!addQty || addQty <= 0 || selectedIds.length === 0) return;
    allProducts.forEach((p) => {
      if (selectedIds.includes(p.id)) {
        onQuickSave({ ...p, quantity: Number(p.quantity || 0) + addQty });
      }
    });
    setBulkStockQty("");
  };

  const applyDiscount = () => {
    const pct = Number(discountPercent);
    if (!pct || pct <= 0 || pct >= 100 || selectedIds.length === 0) return;

    allProducts.forEach((p) => {
      if (selectedIds.includes(p.id)) {
        const updatedPrice = Number(p.price || 0) * (1 - pct / 100);
        onQuickSave({ ...p, price: Number(updatedPrice.toFixed(2)) });
      }
    });
    setDiscountPercent("");
  };

  const exportProducts = (productsToExport) => {
    const headers = [
      "Product",
      "Category",
      "Supplier",
      "Barcode",
      "Stock",
      "Price",
      "Expiry",
    ];
    const rows = productsToExport.map((p) => [
      p.name || "",
      p.category || "",
      p.supplier || "",
      p.barcode || p.sku || "",
      p.quantity || 0,
      p.price || 0,
      p.expiry || "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "marketmind-inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importCsv = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) return;

    const header = lines[0].split(",").map((h) => h.trim().replace(/"/g, "").toLowerCase());
    const idx = (key) => header.indexOf(key);

    const imports = lines.slice(1).map((line) => {
      const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      return {
        id: Date.now() + Math.random(),
        name: cols[idx("product")] || cols[idx("name")] || "New Product",
        category: cols[idx("category")] || "General",
        supplier: cols[idx("supplier")] || "",
        barcode: cols[idx("barcode")] || "",
        quantity: Number(cols[idx("stock")] || cols[idx("quantity")] || 0),
        price: Number(cols[idx("price")] || 0),
        expiry: cols[idx("expiry")] || "",
      };
    });

    imports.forEach((p) => onQuickSave(p));
    event.target.value = "";
  };

  const openRestockModal = (product) => {
    setStockModalProduct(product);
    setBulkStockQty("");
  };

  const updateSingleStock = () => {
    const addQty = Number(bulkStockQty);
    if (!stockModalProduct || !addQty || addQty <= 0) return;
    onQuickSave({
      ...stockModalProduct,
      quantity: Number(stockModalProduct.quantity || 0) + addQty,
    });
    setStockModalProduct(null);
    setBulkStockQty("");
  };

  const allSelectedOnPage =
    paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedIds.includes(p.id));

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl p-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Inventory Control Center</h1>
          <p className="text-gray-600 mt-1">Manage stock, expiry, and bulk operations in one place.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/product-form")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            ➕ Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow border border-gray-100 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8">
            <label className="text-sm text-gray-600">🔍 Search product by name / barcode / category</label>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {scanValue && <p className="text-xs text-gray-500 mt-1">Scanned: {scanValue}</p>}
          </div>
          <div className="md:col-span-4 flex items-end gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex-1 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-semibold"
            >
              {showFilters ? "Hide Filters" : "Advanced Filters"}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Import CSV
            </button>
            <button
              onClick={() => exportProducts(filteredProducts)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Export CSV
            </button>
            <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={importCsv} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <p className="text-xs text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">{analytics.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <p className="text-xs text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-700">{analytics.lowStock}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <p className="text-xs text-gray-500">Expiring Soon</p>
          <p className="text-2xl font-bold text-orange-700">{analytics.expiringSoon}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <p className="text-xs text-gray-500">Expired</p>
          <p className="text-2xl font-bold text-red-700">{analytics.expired}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <p className="text-xs text-gray-500">Inventory Value</p>
          <p className="text-2xl font-bold text-green-700">₹{analytics.value.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-5 rounded-xl mb-5 border border-gray-200 shadow">
          <h3 className="font-semibold text-gray-900 mb-3">Filter By</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Supplier</option>
              {suppliers.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Stock Level</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
              <option value="healthy">Healthy Stock</option>
            </select>

            <select
              value={expiryFilter}
              onChange={(e) => setExpiryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Expiry Date</option>
              <option value="today">Expiring Today</option>
              <option value="3days">Expiring in 3 days</option>
              <option value="7days">Expiring in 7 days</option>
              <option value="expired">Expired</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price</option>
              <option value="quantity">Sort: Stock</option>
              <option value="expiry">Sort: Expiry</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Bulk Actions:</span>
          <button onClick={bulkDelete} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg">Delete</button>
          <button onClick={applyBulkStock} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">Update Stock</button>
          <button onClick={applyDiscount} className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-lg">Apply Discount</button>
          <button
            onClick={() => exportProducts(allProducts.filter((p) => selectedIds.includes(p.id)))}
            className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg"
          >
            Export
          </button>

          <input
            value={bulkStockQty}
            onChange={(e) => setBulkStockQty(e.target.value)}
            type="number"
            placeholder="+Stock"
            className="ml-auto border border-gray-300 rounded-lg px-2 py-1.5 text-sm w-24"
          />
          <input
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            type="number"
            placeholder="Discount %"
            className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm w-28"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelectedOnPage}
                    onChange={(e) => toggleSelectAllPage(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Supplier</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Expiry</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-10 text-center text-gray-500">
                    No products found for current filters.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const status = getStatusMeta(p);
                  const days = getDaysUntilExpiry(p.expiry);
                  return (
                    <tr key={p.id} className={`border-t hover:bg-blue-50/40 ${status.row}`}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.id)}
                          onChange={(e) => toggleSelectOne(p.id, e.target.checked)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setDetailsProduct(p)}
                          className="text-left font-semibold text-blue-700 hover:underline"
                        >
                          {p.name}
                        </button>
                        <p className="text-xs text-gray-500">Barcode: {p.barcode || p.sku || "-"}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.category || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.supplier || "-"}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{p.quantity || 0}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">₹{Number(p.price || 0).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {p.expiry ? new Date(p.expiry).toLocaleDateString("en-IN") : "-"}
                        {days !== null && days <= 1 && days >= 0 && (
                          <p className="text-xs text-orange-700">⚠ expiring in {days} day</p>
                        )}
                        {days !== null && days < 0 && <p className="text-xs text-red-700">⚠ already expired</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${status.badge}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => onEdit(p)} className="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
                          {(Number(p.quantity || 0) <= 5 || status.label === "Low Stock") && (
                            <button
                              onClick={() => openRestockModal(p)}
                              className="px-2 py-1 bg-amber-500 text-white rounded"
                            >
                              Restock
                            </button>
                          )}
                          <button onClick={() => onDelete(p.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {(safePage - 1) * itemsPerPage + (paginatedProducts.length ? 1 : 0)}-
            {(safePage - 1) * itemsPerPage + paginatedProducts.length} of {filteredProducts.length}
          </p>
          <div className="flex gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {detailsProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Product Details</h3>
              <button onClick={() => setDetailsProduct(null)} className="text-gray-500 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p><span className="text-gray-500">Name:</span> {detailsProduct.name}</p>
              <p><span className="text-gray-500">Category:</span> {detailsProduct.category || "-"}</p>
              <p><span className="text-gray-500">Supplier:</span> {detailsProduct.supplier || "-"}</p>
              <p><span className="text-gray-500">Price:</span> ₹{Number(detailsProduct.price || 0).toFixed(2)}</p>
              <p><span className="text-gray-500">Stock:</span> {detailsProduct.quantity || 0}</p>
              <p><span className="text-gray-500">Expiry:</span> {detailsProduct.expiry || "-"}</p>
              <p><span className="text-gray-500">Barcode:</span> {detailsProduct.barcode || detailsProduct.sku || "-"}</p>
              <p><span className="text-gray-500">Added:</span> {new Date(detailsProduct.id).toLocaleDateString("en-IN")}</p>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => onEdit(detailsProduct)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Edit</button>
              <button onClick={() => openRestockModal(detailsProduct)} className="px-4 py-2 bg-amber-500 text-white rounded-lg">Update Stock</button>
              <button
                onClick={() => {
                  onDelete(detailsProduct.id);
                  setDetailsProduct(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {stockModalProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h3 className="text-xl font-bold mb-3">Add Stock</h3>
            <p className="text-sm text-gray-600">Current Stock: {stockModalProduct.quantity || 0}</p>
            <input
              value={bulkStockQty}
              onChange={(e) => setBulkStockQty(e.target.value)}
              type="number"
              placeholder="Add Quantity"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-3"
            />
            <div className="mt-4 flex gap-2">
              <button onClick={updateSingleStock} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
              <button onClick={() => setStockModalProduct(null)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;