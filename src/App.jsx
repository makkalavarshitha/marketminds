import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('marketmind-user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("marketmind-products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("marketmind-products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === product.id ? product : p))
      );
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleLogin = (u) => {
    setUser(u);
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('marketmind-user');
    } catch (e) {}
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const filteredProducts = products
    .filter(
      (p) =>
        (filterCategory === "" || p.category === filterCategory) &&
        (searchTerm === "" ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(a.expiry || "9999-12-31") - new Date(b.expiry || "9999-12-31"));

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar user={user} onLogout={handleLogout} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
                <p className="text-gray-600 mt-1">Manage your supermarket inventory</p>
              </div>

              <div className="flex-1 flex items-center gap-4">
                <div className="flex-1 max-w-xl">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                  </div>
                </div>

                <div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="">All Categories</option>
                    {[...new Set(products.map((p) => p.category).filter(Boolean))].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setShowForm(!showForm);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
                  >
                    {showForm ? "✕ Close" : "+ Add Product"}
                  </button>
                </div>
              </div>
            </div>

            {showForm && (
              <div className="mt-6">
                <ProductForm
                  onAddProduct={handleAddProduct}
                  editingProduct={editingProduct}
                  onCancel={handleCancelEdit}
                />
              </div>
            )}
          </div>

          <DashboardCards products={products} />

          <ProductTable
            products={filteredProducts}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            allProducts={products}
          />
        </div>
      </div>
    </div>
  );
}

export default App;