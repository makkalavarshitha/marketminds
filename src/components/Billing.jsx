import { useState, useEffect, useMemo } from 'react';
import { salesAPI } from '../utils/api';

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sales from API on mount
  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await salesAPI.getSales();
        // Convert sales data to bill format
        const billsData = (response.data || []).map((sale) => ({
          id: sale._id,
          date: new Date(sale.createdAt).toISOString().split('T')[0],
          customerName: sale.customerName || 'Walk-in',
          phoneNumber: sale.phoneNumber,
          items: sale.items || [],
          subtotal: sale.subtotal || 0,
          discountType: sale.discountType || 'none',
          discountValue: sale.discountValue || 0,
          discountAmount: sale.discountAmount || 0,
          tax: sale.tax || 0,
          total: sale.total || 0,
          paymentMethod: sale.paymentMethod || 'cash',
          status: sale.status || 'Paid',
        }));
        setBills(billsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching sales:', err);
        setError(err.message || 'Failed to load sales data');
        setBills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [dateFilter, setDateFilter] = useState('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundProduct, setRefundProduct] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');

  const formatShortDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  // Filter bills by date
  const getDateRangeBills = () => {
    const now = new Date();
    const start = new Date(now);
    
    switch (dateFilter) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        start.setDate(now.getDate() - now.getDay());
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'custom': {
        if (!customStartDate && !customEndDate) return bills;
        return bills.filter((b) => {
          const billDate = new Date(b.date);
          const startDate = customStartDate ? new Date(customStartDate) : null;
          const endDate = customEndDate ? new Date(customEndDate) : null;

          if (startDate) startDate.setHours(0, 0, 0, 0);
          if (endDate) endDate.setHours(23, 59, 59, 999);

          if (startDate && billDate < startDate) return false;
          if (endDate && billDate > endDate) return false;
          return true;
        });
      }
      case 'all':
        return bills;
      default:
        return bills;
    }
    
    return bills.filter(b => new Date(b.date) >= start);
  };

  const billsByDateRange = getDateRangeBills();

  const filteredBills = billsByDateRange.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bill.customerName && bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || bill.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Analytics calculations
  const totalBills = billsByDateRange.length;
  const totalAmount = billsByDateRange.reduce((sum, bill) => sum + (bill.total || 0), 0);
  const paidBills = billsByDateRange.filter(b => b.status === 'Paid');
  const paidAmount = paidBills.reduce((sum, b) => sum + (b.total || 0), 0);
  const pendingBills = billsByDateRange.filter(b => b.status === 'Pending');
  const pendingAmount = pendingBills.reduce((sum, b) => sum + (b.total || 0), 0);
  const todaysBills = bills.filter(b => b.date === today);
  const avgBillValue = totalBills > 0 ? totalAmount / totalBills : 0;

  // Top payment method
  const paymentMethods = billsByDateRange.reduce((acc, bill) => {
    const method = bill.paymentMethod || 'Cash';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});
  const topPaymentMethod = Object.entries(paymentMethods).sort((a, b) => b[1] - a[1])[0] || ['Cash', 0];
  const paymentPercentage = totalBills > 0 ? Math.round((topPaymentMethod[1] / totalBills) * 100) : 0;

  // Top selling products
  const topProducts = useMemo(() => {
    const products = {};
    billsByDateRange.forEach(bill => {
      bill.items?.forEach(item => {
        products[item.name] = (products[item.name] || 0) + item.qty;
      });
    });
    return Object.entries(products)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, qty]) => ({ name, qty }));
  }, [billsByDateRange]);

  const salesTrend = useMemo(() => {
    const points = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-IN', { weekday: 'short' });
      const value = bills
        .filter((b) => b.date === key)
        .reduce((sum, b) => sum + Number(b.total || 0), 0);
      points.push({ key, label, value });
    }
    return points;
  }, [bills]);
  const maxTrendValue = Math.max(...salesTrend.map((p) => p.value), 1);

  // AI Insights
  const getAIInsights = () => {
    const insights = [];
    
    if (todaysBills.length > 0) {
      insights.push(`📊 ${todaysBills.length} bills created today`);
    }
    
    const yesterdayCount = billsByDateRange.filter(b => {
      const d = new Date(b.date);
      const yd = new Date();
      yd.setDate(yd.getDate() - 1);
      return d.toISOString().split('T')[0] === yd.toISOString().split('T')[0];
    }).length;
    
    if (yesterdayCount > 0 && todaysBills.length > yesterdayCount) {
      const increase = Math.round(((todaysBills.length - yesterdayCount) / yesterdayCount) * 100);
      insights.push(`📈 ${increase}% more bills than yesterday`);
    }
    
    if (topProducts.length > 0) {
      insights.push(`⭐ Best seller: ${topProducts[0].name}`);
    }
    
    if (paymentPercentage > 0) {
      insights.push(`💳 ${topPaymentMethod[0]} used in ${paymentPercentage}% transactions`);
    }
    
    if (pendingAmount > 0) {
      insights.push(`⚠️ ${pendingBills.length} pending bills (₹${pendingAmount.toFixed(0)})`);
    }
    
    return insights.length > 0 ? insights : ['✅ All systems running smoothly'];
  };

  const getStatusBadge = (status) => {
    if (status === 'Paid') {
      return { className: 'bg-green-100 text-green-800', label: '🟢 Paid' };
    }
    if (status === 'Pending') {
      return { className: 'bg-yellow-100 text-yellow-800', label: '🟡 Pending' };
    }
    if (status === 'Cancelled') {
      return { className: 'bg-red-100 text-red-800', label: '🔴 Cancelled' };
    }
    if (status === 'Refunded') {
      return { className: 'bg-blue-100 text-blue-800', label: '🔵 Refunded' };
    }
    return { className: 'bg-gray-100 text-gray-700', label: status || 'Unknown' };
  };

  const printBill = (bill) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${bill.id}</title>
          <style>
            body { font-family: monospace; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { margin: 0; color: #1e40af; font-size: 20px; }
            .line { border-bottom: 1px dashed #000; margin: 10px 0; }
            .info { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px; }
            table { width: 100%; font-size: 11px; margin: 15px 0; }
            th, td { padding: 5px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f0f0f0; font-weight: bold; }
            .right { text-align: right; }
            .total { font-weight: bold; font-size: 14px; }
            .footer { text-align: center; margin-top: 20px; font-size: 10px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MarketMind Supermarket</h1>
            <p>Receipt/Invoice</p>
          </div>
          <div class="line"></div>
          <div class="info">
            <div><strong>Invoice:</strong> ${bill.id}</div>
            <div><strong>Date:</strong> ${bill.date}</div>
          </div>
          <div class="info">
            <div><strong>Customer:</strong> ${bill.customerName || 'Walk-in'}</div>
            <div><strong>Status:</strong> ${bill.status}</div>
          </div>
          <div class="line"></div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="right">Qty</th>
                <th class="right">Price</th>
                <th class="right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${bill.items?.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td class="right">${item.qty}</td>
                  <td class="right">₹${item.price}</td>
                  <td class="right">₹${item.total}</td>
                </tr>
              `).join('') || ''}
            </tbody>
          </table>
          <div class="line"></div>
          <div class="info total">
            <div>Total Amount:</div>
            <div class="right">₹${bill.total?.toFixed(2) || '0.00'}</div>
          </div>
          <div class="info">
            <div><strong>Payment:</strong> ${bill.paymentMethod || 'Cash'}</div>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Powered by MarketMind</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  const downloadCSV = () => {
    const headers = ['Invoice', 'Customer', 'Items', 'Amount', 'Payment', 'Date', 'Status'];
    const rows = billsByDateRange.map(bill => [
      bill.id,
      bill.customerName || 'Walk-in',
      bill.items?.length || 0,
      bill.total?.toFixed(2),
      bill.paymentMethod || 'Cash',
      bill.date,
      bill.status
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${today}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadPDF = () => {
    const doc = `
MarketMind Sales Report
Date: ${today}
=====================================

SUMMARY
Total Bills: ${totalBills}
Total Revenue: ₹${totalAmount.toFixed(2)}
Paid: ₹${paidAmount.toFixed(2)}
Pending: ₹${pendingAmount.toFixed(2)}
Average Bill: ₹${avgBillValue.toFixed(2)}

TOP PRODUCTS
${topProducts.map((p, i) => `${i + 1}. ${p.name} - ${p.qty} sold`).join('\n')}

PAYMENT METHODS
${Object.entries(paymentMethods).map(([method, count]) => `${method}: ${count} transactions`).join('\n')}

=====================================
Report generated on ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([doc], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${today}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadInvoicePDF = (bill) => {
    const content = `
MarketMind Supermarket
----------------------
Invoice: ${bill.id}
Customer: ${bill.customerName || 'Walk-in'}
Date: ${bill.date}

${bill.items?.map((item) => `${item.name} x${item.qty}    ₹${item.total}`).join('\n') || ''}

Total: ₹${(bill.total || 0).toFixed(2)}
Payment: ${bill.paymentMethod || 'Cash'}
Status: ${bill.status}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bill.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const sendInvoiceToCustomer = (bill) => {
    const message = `Invoice ${bill.id} | Amount: ₹${(bill.total || 0).toFixed(2)} | Status: ${bill.status}`;
    if (navigator.share) {
      navigator.share({ title: 'MarketMind Invoice', text: message });
      return;
    }
    navigator.clipboard?.writeText(message);
    alert('Invoice summary copied. You can send it to customer.');
  };

  const handleRefund = () => {
    if (!refundProduct.trim()) {
      alert('Please select a product to refund');
      return;
    }
    if (!refundAmount || Number(refundAmount) <= 0) {
      alert('Please enter refund amount');
      return;
    }
    
    const updatedBills = bills.map(b => {
      if (b.id === selectedBill.id) {
        return { ...b, status: 'Refunded' };
      }
      return b;
    });
    setBills(updatedBills);
    localStorage.setItem('marketmind-bills', JSON.stringify(updatedBills));
    setShowRefundModal(false);
    setRefundProduct('');
    setRefundAmount('');
    setRefundReason('');
    setSelectedBill(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6">
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white px-6 py-5 rounded-xl shadow border border-gray-100 text-center">
            <p className="text-lg font-semibold text-gray-800">Loading Billing Data...</p>
            <p className="text-sm text-gray-500 mt-1">Fetching your sales transactions</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-800 text-sm"><strong>Error:</strong> {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
      <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">💳 Invoice Management</h1>
        <p className="text-gray-600 mt-1">Complete billing & sales analytics system</p>
      </div>

      {/* Billing Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Total Bills</p>
          <p className="text-2xl font-bold text-gray-900">{totalBills}</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Today's Bills</p>
          <p className="text-2xl font-bold text-indigo-700">{todaysBills.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-700">₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-red-100 p-4">
          <p className="text-xs text-gray-500">Pending Payments</p>
          <p className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Average Bill Value</p>
          <p className="text-2xl font-bold text-blue-700">₹{Math.round(avgBillValue).toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">📈 Sales Trend (Last 7 Days)</h3>
          <p className="text-xs text-gray-500">Daily revenue snapshot</p>
        </div>
        <div className="grid grid-cols-7 gap-2 items-end h-44">
          {salesTrend.map((point) => (
            <div key={point.key} className="flex flex-col items-center justify-end h-full">
              <div
                className="w-8 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-md"
                style={{ height: `${Math.max((point.value / maxTrendValue) * 100, 8)}%` }}
                title={`₹${point.value.toLocaleString('en-IN')}`}
              />
              <p className="text-[10px] text-gray-500 mt-2">{point.label}</p>
              <p className="text-[10px] text-gray-700">₹{Math.round(point.value).toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search Invoice / Customer</label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearchTerm((prev) => prev.trim());
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Invoice or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold whitespace-nowrap"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date Filter</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            {dateFilter === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bills Table */}
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h3 className="font-semibold text-gray-900">📋 Invoice Table ({filteredBills.length})</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={downloadCSV}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  Export CSV
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  Export PDF
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  Download Report
                </button>
              </div>
            </div>
            
            {filteredBills.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                <p className="text-lg">No invoices found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Invoice #</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Items</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Payment Method</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredBills.map((bill) => (
                      <tr key={bill.id} className="hover:bg-blue-50">
                        <td className="px-4 py-3 font-semibold text-blue-600">{bill.id}</td>
                        <td className="px-4 py-3 text-sm">{bill.customerName || 'Walk-in'}</td>
                        <td className="px-4 py-3 text-sm text-center">{bill.items?.length || 0} items</td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                            {bill.paymentMethod || 'Cash'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-semibold">₹{(bill.total || 0).toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">{formatShortDate(bill.date)}</td>
                        <td className="px-4 py-3 text-center">
                          {(() => {
                            const status = getStatusBadge(bill.status);
                            return (
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                                {status.label}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedBill(bill)}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
                            >
                              View
                            </button>
                            <button
                              onClick={() => printBill(bill)}
                              className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                            >
                              Print
                            </button>
                            {bill.status !== 'Refunded' && (
                              <button
                                onClick={() => {
                                  setSelectedBill(bill);
                                  setShowRefundModal(true);
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold text-xs"
                              >
                                Refund
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow border border-purple-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">🤖 AI Insights</h3>
            <div className="space-y-2">
              {getAIInsights().map((insight, idx) => (
                <p key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span>{insight}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Top Products */}
          {topProducts.length > 0 && (
            <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">⭐ Top Selling Products</h3>
              <div className="space-y-2">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-amber-50 rounded-lg">
                    <span className="font-semibold text-gray-900">{idx + 1}. {product.name}</span>
                    <span className="text-xs bg-amber-200 text-amber-900 px-2 py-1 rounded">
                      {product.qty} sold
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">📄 Invoice Details</h2>
              <button
                onClick={() => setSelectedBill(null)}
                className="text-2xl hover:opacity-80"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Invoice</p>
                    <p className="text-lg font-bold">{selectedBill.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Date</p>
                    <p className="text-lg font-bold">{selectedBill.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Customer</p>
                    <p className="text-lg font-bold">{selectedBill.customerName || 'Walk-in'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Payment</p>
                    <p className="text-lg font-bold">{selectedBill.paymentMethod || 'Cash'}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-center">Qty</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedBill.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2 text-center">{item.qty}</td>
                          <td className="px-4 py-2 text-right">₹{item.price}</td>
                          <td className="px-4 py-2 text-right font-semibold">₹{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total & Status */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-green-700">₹{(selectedBill.total || 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Status</p>
                    {(() => {
                      const status = getStatusBadge(selectedBill.status);
                      return <p className="text-lg font-bold">{status.label}</p>;
                    })()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-4">
                <button
                  onClick={() => printBill(selectedBill)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  🖨 Print
                </button>
                <button
                  onClick={() => downloadInvoicePDF(selectedBill)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                >
                  📄 Download PDF
                </button>
                <button
                  onClick={() => sendInvoiceToCustomer(selectedBill)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  📲 Send to Customer
                </button>
                {selectedBill.status !== 'Refunded' && (
                  <button
                    onClick={() => setShowRefundModal(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold sm:col-span-3"
                  >
                    💸 Refund
                  </button>
                )}
                <button
                  onClick={() => setSelectedBill(null)}
                  className="sm:col-span-3 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-xl font-bold">💸 Process Refund</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                <select
                  value={refundProduct}
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    setRefundProduct(selectedName);
                    const item = selectedBill?.items?.find((it) => it.name === selectedName);
                    setRefundAmount(item ? String(item.total || 0) : '');
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  <option value="">Choose product...</option>
                  {selectedBill?.items?.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name} - ₹{item.total}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Refund Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  <option value="">Select reason...</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Defective">Defective</option>
                  <option value="Wrong Item">Wrong Item</option>
                  <option value="Customer Request">Customer Request</option>
                </select>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <strong>Invoice:</strong> {selectedBill?.id}
                  <br />
                  <strong>Product:</strong> {refundProduct || 'Not selected'}
                  <br />
                  <strong>Amount:</strong> ₹{refundAmount || '0'}
                  <br />
                  <strong>Reason:</strong> {refundReason || 'Not specified'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRefundModal(false);
                    setRefundProduct('');
                    setRefundAmount('');
                    setRefundReason('');
                  }}
                  className="flex-1 border-2 border-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefund}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                >
                  Confirm Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
