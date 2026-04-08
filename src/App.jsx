import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductForm from "./components/product-form";
import ProductTable from "./components/product-table";
import Sales from "./components/Sales";
import Billing from "./components/Billing";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import Dashboard from "./components/dashboard";
import StoreProfile from "./components/StoreProfile";
import OwnerReportIssue from "./components/OwnerReportIssue";
import Help from "./components/Help";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import { productsAPI, authAPI, storeAPI } from "./utils/api";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeProfile, setStoreProfile] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("marketmind-user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const ownerNeedsSetup = !storeProfile;

  // Load products from API on mount
  useEffect(() => {
    if (!user) return;

    let mounted = true;

    const loadData = async () => {
      try {
        const [products, store] = await Promise.all([
          productsAPI.getProducts().catch(() => []),
          storeAPI.getProfile().catch(() => null),
        ]);

        if (mounted) {
          setProducts(products.data || []);
          setStoreProfile(store?.data || null);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (mounted) setLoadingData(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Add / Update Product
  const handleAddProduct = async (product) => {
    try {
      if (editingProduct) {
        await productsAPI.updateProduct(product.id, product);
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? product : p))
        );
        setEditingProduct(null);
      } else {
        const response = await productsAPI.createProduct(product);
        setProducts((prev) => [...prev, response.data]);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.message || "Failed to save product");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.message || "Failed to delete product");
    }
  };

  // Edit Product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    navigate("/product-form");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    navigate("/");
  };

  const handleLogin = (u) => {
    setUser(u);
    navigate("/dashboard", { replace: true });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("marketmind-user");
    localStorage.removeItem("marketmind-token");
    navigate("/login", { replace: true });
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

  if (loadingData && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50">
        <div className="bg-white px-6 py-5 rounded-xl shadow border border-gray-100 text-center">
          <p className="text-lg font-semibold text-gray-800">Loading...</p>
          <p className="text-sm text-gray-500 mt-1">Fetching your inventory and store data</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen md:pl-64 min-w-0 pt-16">
        <Navbar user={user} onLogout={handleLogout} onMenuClick={() => setSidebarOpen(true)} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={ownerNeedsSetup ? "/store-setup" : "/dashboard"} replace />}
            />

            <Route
              path="/product-table"
              element={
                <ProductTable
                  products={filteredProducts}
                  onDelete={handleDeleteProduct}
                  onEdit={handleEditProduct}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  allProducts={products}
                />
              }
            />

            <Route
              path="/dashboard"
              element={ownerNeedsSetup ? <Navigate to="/store-setup" replace /> : <Dashboard products={products} storeName={storeProfile?.storeName} />}
            />

            <Route
              path="/store-setup"
              element={<StoreProfile isSetupMode onSave={setStoreProfile} />}
            />

            <Route
              path="/store-profile"
              element={ownerNeedsSetup ? <Navigate to="/store-setup" replace /> : <StoreProfile onSave={setStoreProfile} />}
            />

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

            <Route
              path="/sales"
              element={<Sales products={products} />}
            />

            <Route
              path="/billing"
              element={<Billing />}
            />

            <Route
              path="/report-issue"
              element={ownerNeedsSetup ? <Navigate to="/store-setup" replace /> : <OwnerReportIssue />}
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