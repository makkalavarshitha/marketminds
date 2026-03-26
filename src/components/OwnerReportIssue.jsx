import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ISSUE_REPORTS_KEY = "marketmind-issue-reports";

const ISSUE_TYPES = [
  "Inventory Issue",
  "Billing Issue",
  "Login Problem",
  "Technical Bug",
  "Other",
];

export default function OwnerReportIssue() {
  const navigate = useNavigate();

  const storeProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("marketmind-store-profile")) || null;
    } catch {
      return null;
    }
  }, []);

  const [formData, setFormData] = useState({
    issueType: "Inventory Issue",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.description.trim()) {
      alert("Please enter issue description.");
      return;
    }

    const current = (() => {
      try {
        return JSON.parse(localStorage.getItem(ISSUE_REPORTS_KEY) || "[]");
      } catch {
        return [];
      }
    })();

    const maxId = current.reduce((max, item) => Math.max(max, Number(item.id) || 0), 1022);

    const newReport = {
      id: maxId + 1,
      storeName: storeProfile?.storeName || "Unknown Store",
      issueType: formData.issueType,
      description: formData.description.trim(),
      date: new Date().toISOString().split("T")[0],
      priority: "Medium",
      status: "Open",
      adminResponse: "",
    };

    localStorage.setItem(ISSUE_REPORTS_KEY, JSON.stringify([newReport, ...current]));
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <h1 className="text-2xl font-bold">🚨 Report Issue</h1>
          <p className="text-white/90 mt-1">Submit an issue to admin support team</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Store Name</label>
            <input
              value={storeProfile?.storeName || "Unknown Store"}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Issue Type</label>
            <select
              value={formData.issueType}
              onChange={(e) => setFormData((prev) => ({ ...prev, issueType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {ISSUE_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the issue..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
