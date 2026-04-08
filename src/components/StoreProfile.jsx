import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeAPI } from "../utils/api";

export default function StoreProfile({ isSetupMode = false, onSave = null }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("marketmind-user")) || null;
    } catch {
      return null;
    }
  }, []);

  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: currentUser?.name || "",
    phone: "",
    address: "",
    gstNumber: "",
    upiId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    if (!formData.storeName.trim()) {
      setError("Store name is required");
      return false;
    }
    if (!formData.ownerName.trim()) {
      setError("Owner name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
      return false;
    }
    return true;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await storeAPI.updateProfile(formData);
      
      if (response?.data) {
        if (onSave) onSave(response.data);
        localStorage.setItem("marketmind-store-profile", JSON.stringify(response.data));
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Failed to save store profile");
      console.error("Error saving store profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">
          <h1 className="text-2xl font-bold">🏪 {isSetupMode ? "Store Setup" : "Store Profile"}</h1>
          <p className="text-white/90 mt-1">
            {isSetupMode ? "Complete your store profile to continue" : "Manage your store information"}
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 m-4 rounded-lg">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name *</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              onBlur={() => handleBlur("storeName")}
              placeholder="Enter store name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name *</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              onBlur={() => handleBlur("ownerName")}
              placeholder="Enter owner name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={() => handleBlur("address")}
              placeholder="Enter store address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              placeholder="Enter UPI ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-semibold transition"
            >
              {loading ? "Saving..." : isSetupMode ? "Save & Continue" : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
