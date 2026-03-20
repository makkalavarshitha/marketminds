import { useEffect, useMemo, useState } from "react";

const ISSUE_REPORTS_KEY = "marketmind-issue-reports";

const defaultReports = [
  {
    id: 1023,
    storeName: "Fresh Mart",
    issueType: "Billing Issue",
    description: "Wrong total amount shown on checkout invoice.",
    date: "2026-03-18",
    priority: "High",
    status: "Open",
    adminResponse: "",
  },
  {
    id: 1024,
    storeName: "Green Basket",
    issueType: "Inventory Issue",
    description: "Stock count mismatch after manual update.",
    date: "2026-03-17",
    priority: "Medium",
    status: "In Progress",
    adminResponse: "We are checking sync logs and will update soon.",
  },
  {
    id: 1025,
    storeName: "Quick Shop",
    issueType: "Login Problem",
    description: "Owner cannot login from mobile browser.",
    date: "2026-03-15",
    priority: "Low",
    status: "Resolved",
    adminResponse: "Issue fixed after clearing stale session token.",
  },
];

export default function AdminReports() {
  const [reports, setReports] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ISSUE_REPORTS_KEY) || "[]");
      return saved.length > 0 ? saved : defaultReports;
    } catch {
      return defaultReports;
    }
  });


  useEffect(() => {
    localStorage.setItem(ISSUE_REPORTS_KEY, JSON.stringify(reports));
  }, [reports]);

  const counts = useMemo(() => {
    const open = reports.filter((r) => r.status === "Open").length;
    const inProgress = reports.filter((r) => r.status === "In Progress").length;
    const resolved = reports.filter((r) => r.status === "Resolved").length;

    return {
      total: reports.length,
      open,
      inProgress,
      resolved,
    };
  }, [reports]);

  const handleStatusChange = (id, status) => {
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, status } : report)));
  };

  const handleMarkResolved = (id) => {
    handleStatusChange(id, "Resolved");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">🚨 Issue Reports</h1>
        <p className="text-gray-600 mt-1">Track store issues, update status, and send admin responses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Reports" value={counts.total} tone="indigo" icon="📋" />
        <SummaryCard title="Open Issues" value={counts.open} tone="red" icon="⚠" />
        <SummaryCard title="In Progress" value={counts.inProgress} tone="yellow" icon="🟡" />
        <SummaryCard title="Resolved" value={counts.resolved} tone="green" icon="✅" />
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">📋 Issue Reports Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Report ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Store Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Issue Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-900">#{report.id}</td>
                  <td className="px-4 py-3 text-gray-800">{report.storeName}</td>
                  <td className="px-4 py-3 text-gray-700">{report.issueType}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate" title={report.description}>{report.description}</td>
                  <td className="px-4 py-3 text-gray-600">{report.date}</td>
                  <td className="px-4 py-3">{priorityBadge(report.priority)}</td>
                  <td className="px-4 py-3">{statusBadge(report.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 min-w-[170px]">
                      <button
                        onClick={() => handleMarkResolved(report.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition"
                      >
                        Mark as Resolved
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, tone, icon }) {
  const tones = {
    indigo: "text-indigo-700 bg-indigo-50",
    red: "text-red-700 bg-red-50",
    yellow: "text-yellow-700 bg-yellow-50",
    green: "text-green-700 bg-green-50",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <span className={`px-2 py-1 rounded text-sm font-semibold ${tones[tone]}`}>{icon}</span>
      </div>
    </div>
  );
}

function statusBadge(status) {
  const map = {
    Open: "bg-red-100 text-red-800 border-red-300",
    "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-300",
    Resolved: "bg-green-100 text-green-800 border-green-300",
  };

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${map[status]}`}>{status}</span>;
}

function priorityBadge(priority) {
  const map = {
    High: "bg-red-100 text-red-800 border-red-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-green-100 text-green-800 border-green-300",
  };

  return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${map[priority]}`}>{priority}</span>;
}

