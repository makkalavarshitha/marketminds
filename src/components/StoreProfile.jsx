import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORE_PROFILE_KEY = "marketmind-store-profile";

export default function StoreProfile({ isSetupMode = false }) {
  const navigate = useNavigate();

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("marketmind-user")) || null;
    } catch {
      return null;
    }
  }, []);

  const existingProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(STORE_PROFILE_KEY)) || null;
    } catch {
      return null;
    }
  }, []);

  const [formData, setFormData] = useState(() => ({
    storeName: existingProfile?.storeName || "",
    ownerName: existingProfile?.ownerName || currentUser?.name || "",
    phone: existingProfile?.phone || "",
    email: existingProfile?.email || currentUser?.email || "",
    address: existingProfile?.address || "",
    storeType: existingProfile?.storeType || "",
  }));

  const handleSave = (event) => {
    event.preventDefault();

    const requiredValues = Object.values(formData).every((value) => String(value || "").trim().length > 0);
    if (!requiredValues) {
      alert("Please fill in all fields before continuing.");
      return;
    }

    const profile = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORE_PROFILE_KEY, JSON.stringify(profile));

    if (currentUser?.email) {
      const users = JSON.parse(localStorage.getItem("marketmind-users") || "[]");
      const userIndex = users.findIndex((user) => user.email === currentUser.email);
      const joinedDate = new Date().toISOString().split("T")[0];
      const updatedUser = {
        id: users[userIndex]?.id || Date.now(),
        name: profile.ownerName,
        email: profile.email,
        role: "Owner",
        store: profile.storeName,
        status: users[userIndex]?.status || "Active",
        joined: users[userIndex]?.joined || joinedDate,
      };

      if (userIndex >= 0) {
        users[userIndex] = updatedUser;
      } else {
        users.push(updatedUser);
      }
      localStorage.setItem("marketmind-users", JSON.stringify(users));

      const stores = JSON.parse(localStorage.getItem("marketmind-stores") || "[]");
      const storeIndex = stores.findIndex((store) => store.email === currentUser.email || store.email === profile.email);
      const updatedStore = {
        id: stores[storeIndex]?.id || Date.now() + 1,
        name: profile.storeName,
        owner: profile.ownerName,
        email: profile.email,
        status: stores[storeIndex]?.status || "Pending",
        products: stores[storeIndex]?.products || 0,
        revenue: stores[storeIndex]?.revenue || 0,
        lastActive: new Date().toISOString().split("T")[0],
        location: profile.address,
      };

      if (storeIndex >= 0) {
        stores[storeIndex] = updatedStore;
      } else {
        stores.push(updatedStore);
      }
      localStorage.setItem("marketmind-stores", JSON.stringify(stores));
    }

    navigate("/dashboard", { replace: true });
  };

  if (!isSetupMode && !existingProfile) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow border border-gray-100 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">🏪 Store Profile</h1>
          <p className="text-gray-600 mt-2">Store details are not set up yet.</p>
          <button
            onClick={() => navigate("/store-setup")}
            className="mt-6 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
          >
            Complete Store Setup
          </button>
        </div>
      </div>
    );
  }

  if (!isSetupMode && existingProfile) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">
            <h1 className="text-2xl font-bold">🏪 Store Profile</h1>
            <p className="text-white/90 mt-1">View your store information</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileItem label="Store Name" value={existingProfile.storeName} />
            <ProfileItem label="Owner Name" value={existingProfile.ownerName} />
            <ProfileItem label="Phone" value={existingProfile.phone} />
            <ProfileItem label="Email" value={existingProfile.email} />
            <ProfileItem label="Address" value={existingProfile.address} />
            <ProfileItem label="Store Type" value={existingProfile.storeType} />
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => navigate("/store-setup")}
              className="w-full px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
            >
              Edit Store Info
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">
          <h1 className="text-2xl font-bold">🏪 Store Setup</h1>
          <p className="text-white/90 mt-1">Complete your store profile to continue</p>
        </div>

        <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Store Name" value={formData.storeName} onChange={(value) => setFormData((prev) => ({ ...prev, storeName: value }))} />
          <InputField label="Owner Name" value={formData.ownerName} onChange={(value) => setFormData((prev) => ({ ...prev, ownerName: value }))} />
          <InputField label="Phone Number" value={formData.phone} onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))} />
          <InputField label="Email" type="email" value={formData.email} onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))} />
          <InputField label="Address" value={formData.address} onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))} />
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Store Type</label>
            <select
              value={formData.storeType}
              onChange={(e) => setFormData((prev) => ({ ...prev, storeType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select store type</option>
              <option value="Grocery">Grocery</option>
              <option value="Supermarket">Supermarket</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="General">General Store</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900 mt-1">{value || "-"}</p>
    </div>
  );
}