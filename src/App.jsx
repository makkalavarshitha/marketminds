import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductForm from "./components/product-form";
import ProductTable from "./components/product-table";
import Sales from "./components/Sales";
import Billing from "./components/Billing";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import "./App.css";
import Dashboard from "./components/dashboard";
import StoreProfile from "./components/StoreProfile";
import OwnerReportIssue from "./components/OwnerReportIssue";
import Help from "./components/Help";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import { ensureDemoDataSeeded } from "./utils/seedDemoData";

// Admin Portal Components
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";
import AdminDashboardNew from "./components/AdminDashboardNew";
import AdminStoreManagement from "./components/AdminStoreManagement";
import AdminGlobalProducts from "./components/AdminGlobalProducts";
import AdminPlatformAnalytics from "./components/AdminPlatformAnalytics";
import AdminUserManagement from "./components/AdminUserManagement";
import AdminReports from "./components/AdminReports";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const storeProfile = (() => {
    try {
      return JSON.parse(localStorage.getItem("marketmind-store-profile")) || null;
    } catch {
      return null;
    }
  })();

  const ownerNeedsSetup = user?.portal !== "admin" && !storeProfile;

  // Check if current route is admin portal
  const isAdminPortal = location.pathname.startsWith("/admin");

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

  const handleLogin = (u) => {
    setUser(u);
    if (u?.portal === "admin") {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    const hasStoreProfile = (() => {
      try {
        return Boolean(JSON.parse(localStorage.getItem("marketmind-store-profile")));
      } catch {
        return false;
      }
    })();

    if (!hasStoreProfile) {
      navigate("/store-setup", { replace: true });
      return;
    }

    navigate("/dashboard", { replace: true });
  };

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
      {/* Conditional Sidebar - Admin or Owner */}
      {isAdminPortal ? <AdminSidebar /> : <Sidebar />}

      <div className="min-h-screen md:pl-64 min-w-0">
        {/* Show appropriate Navbar */}
        {isAdminPortal ? (
          <AdminNavbar onLogout={handleLogout} />
        ) : (
          <Navbar user={user} onLogout={handleLogout} />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">

          <Routes>
            {/* Owner Portal Routes */}
            <Route
              path="/"
              element={<Navigate to={user?.portal === "admin" ? "/admin/dashboard" : ownerNeedsSetup ? "/store-setup" : "/dashboard"} replace />}
            />

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
              element={ownerNeedsSetup ? <Navigate to="/store-setup" replace /> : <Dashboard products={products} storeName={storeProfile?.storeName} />}
            />

            <Route
              path="/store-setup"
              element={user?.portal === "admin" ? <Navigate to="/admin/dashboard" replace /> : <StoreProfile isSetupMode />}
            />

            <Route
              path="/store-profile"
              element={user?.portal === "admin" ? <Navigate to="/admin/dashboard" replace /> : ownerNeedsSetup ? <Navigate to="/store-setup" replace /> : <StoreProfile />}
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

            {/* Admin Portal Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboardNew />} />
            <Route path="/admin/stores" element={<AdminStoreManagement />} />
            <Route path="/admin/products" element={<AdminGlobalProducts />} />
            <Route path="/admin/analytics" element={<AdminPlatformAnalytics />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/notifications" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/alerts" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/settings" element={<Navigate to="/admin/dashboard" replace />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;