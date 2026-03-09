import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductForm from "./components/product-form";
import ProductTable from "./components/product-table";
import Sales from "./components/Sales";
import Billing from "./components/Billing";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import "./App.css";
import Dashboard from "./components/dashboard";
import Help from "./components/Help";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import { ensureDemoDataSeeded } from "./utils/seedDemoData";

function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("marketmind-user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Seed demo data and load products (simulated API-like startup)
  useEffect(() => {
    let mounted = true;

    const bootstrapData = async () => {
      try {
        await ensureDemoDataSeeded();
        const saved = localStorage.getItem("marketmind-products");
        if (saved && mounted) {
          setProducts(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        if (mounted) setLoadingData(false);
      }
    };

    bootstrapData();

    return () => {
      mounted = false;
    };
  }, []);

  // Save products
  useEffect(() => {
    localStorage.setItem("marketmind-products", JSON.stringify(products));
  }, [products]);

  // Add / Update
  const handleAddProduct = (product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    }
    navigate("/");
  };

  // Delete
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Edit
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    navigate("/product-form");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    navigate("/");
  };

  const handleQuickSaveProduct = (product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [...prev, product];
    });
  };

  const handleLogin = (u) => setUser(u);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("marketmind-user");
  };

  const filteredProducts = products
    .filter(
      (p) =>
        (filterCategory === "" || p.category === filterCategory) &&
        (searchTerm === "" ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort(
      (a, b) =>
        new Date(a.expiry || "9999-12-31") -
        new Date(b.expiry || "9999-12-31")
    );

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50">
        <div className="bg-white px-6 py-5 rounded-xl shadow border border-gray-100 text-center">
          <p className="text-lg font-semibold text-gray-800">Loading demo data...</p>
          <p className="text-sm text-gray-500 mt-1">Preparing inventory, billing and analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 overflow-x-hidden">
      <Sidebar />

      <div className="min-h-screen md:pl-64 min-w-0">
        <Navbar user={user} onLogout={handleLogout} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">

          <Routes>
            {/* redirect root to dashboard page */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route
              path="/product-table"
              element={
                <ProductTable
                  products={filteredProducts}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                  onQuickSave={handleQuickSaveProduct}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  allProducts={products}
                />
              }
            />

            <Route
              path="/dashboard"
              element={<Dashboard products={products} />}
            />

            {/* Product Form Route */}
            <Route
              path="/product-form"
              element={
                <ProductForm
                  onAddProduct={handleAddProduct}
                  editingProduct={editingProduct}
                  onCancel={handleCancelEdit}
                />
              }
            />

            {/* Sales Route */}
            <Route
              path="/sales"
              element={<Sales products={products} />}
            />

            {/* Billing Route */}
            <Route
              path="/billing"
              element={<Billing />}
            />

            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;