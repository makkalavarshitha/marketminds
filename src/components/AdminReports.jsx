import { useEffect, useMemo, useState } from "react";

const ISSUE_REPORTS_KEY = "marketmind-issue-reports";

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved"];
const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

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

  const [selectedReport, setSelectedReport] = useState(null);
  const [responseText, setResponseText] = useState("");

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

  const handlePriorityChange = (id, priority) => {
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, priority } : report)));
  };

  const handleMarkResolved = (id) => {
    handleStatusChange(id, "Resolved");
  };

  const openDetails = (report) => {
    setSelectedReport(report);
    setResponseText(report.adminResponse || "");
  };

  const sendResponse = () => {
    if (!selectedReport) return;

    setReports((prev) =>
      prev.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              adminResponse: responseText,
              status: report.status === "Open" ? "In Progress" : report.status,
            }
          : report
      )
    );

    setSelectedReport((prev) => (prev ? { ...prev, adminResponse: responseText } : prev));
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
                        onClick={() => openDetails(report)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleMarkResolved(report.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition"
                      >
                        Mark as Resolved
                      </button>
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <select
                        value={report.priority}
                        onChange={(e) => handlePriorityChange(report.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        {PRIORITY_OPTIONS.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Issue Details #{selectedReport.id}</h3>
              <button onClick={() => setSelectedReport(null)} className="text-2xl hover:opacity-80">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Info label="Store" value={selectedReport.storeName} />
                <Info label="Issue Type" value={selectedReport.issueType} />
                <Info label="Priority" value={selectedReport.priority} />
                <Info label="Status" value={selectedReport.status} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium text-gray-900 mt-1">{selectedReport.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Admin Response</p>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  placeholder="Write reply here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={sendResponse}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
              >
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
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

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
