import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ products }) {
  const navigate = useNavigate();
  const [voiceStatus, setVoiceStatus] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, p) => sum + (Number(p.price || 0) * Number(p.quantity || 0)),
      0
    );

    const expiredProducts = products.filter(
      (p) => p.expiry && new Date(p.expiry) < new Date()
    );
    const lowStockProducts = products.filter((p) => Number(p.quantity || 0) <= 5);
    const outOfStockProducts = products.filter((p) => Number(p.quantity || 0) === 0);
    const overstockProducts = products.filter((p) => Number(p.quantity || 0) >= 80);

    return {
      totalProducts,
      totalValue,
      expiredCount: expiredProducts.length,
      lowStockCount: lowStockProducts.length,
      outOfStockCount: outOfStockProducts.length,
      overstockCount: overstockProducts.length,
      expiredProducts,
      lowStockProducts,
    };
  }, [products]);

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("marketmind-dashboard-history")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const snapshot = {
      date: todayKey,
      totalProducts: metrics.totalProducts,
      expiredCount: metrics.expiredCount,
      lowStockCount: metrics.lowStockCount,
      totalValue: metrics.totalValue,
    };

    const updated = [
      ...history.filter((item) => item.date !== todayKey),
      snapshot,
    ]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30);

    setHistory(updated);
    localStorage.setItem("marketmind-dashboard-history", JSON.stringify(updated));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey, metrics.totalProducts, metrics.expiredCount, metrics.lowStockCount, metrics.totalValue]);

  const yesterdayKey = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const lastWeekKey = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const yesterdaySnapshot = history.find((item) => item.date === yesterdayKey);
  const lastWeekSnapshot = history.find((item) => item.date === lastWeekKey);

  const formatChange = (current, previous) => {
    if (previous === undefined || previous === null) return "No historical data";
    const diff = current - previous;
    const arrow = diff > 0 ? "⬆" : diff < 0 ? "⬇" : "➡";
    const sign = diff > 0 ? "+" : "";
    return `${arrow} ${sign}${diff} since yesterday`;
  };

  const valueTrend = (() => {
    const previous = lastWeekSnapshot?.totalValue;
    if (!previous) return "No weekly history";
    const pct = ((metrics.totalValue - previous) / previous) * 100;
    const arrow = pct > 0 ? "⬆" : pct < 0 ? "⬇" : "➡";
    return `${arrow} ${pct > 0 ? "+" : ""}${pct.toFixed(1)}% from last week`;
  })();

  const getRestockQty = (item) => {
    const current = Number(item.quantity || 0);
    const threshold = 5;
    const target = Math.max(20, threshold * 4);
    return Math.max(0, target - current);
  };

  const restockSuggestions = metrics.lowStockProducts
    .map((p) => ({ ...p, suggested: getRestockQty(p) }))
    .sort((a, b) => Number(a.quantity || 0) - Number(b.quantity || 0))
    .slice(0, 6);

  const getDaysUntilExpiry = (expiry) => {
    if (!expiry) return null;
    const diff = new Date(expiry) - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const expiringSoon = products
    .map((p) => ({ ...p, days: getDaysUntilExpiry(p.expiry) }))
    .filter((p) => p.days !== null && p.days >= 0 && p.days <= 3)
    .sort((a, b) => a.days - b.days);

  const expiryGroups = {
    Today: expiringSoon.filter((p) => p.days === 0),
    Tomorrow: expiringSoon.filter((p) => p.days === 1),
    "3 Days": expiringSoon.filter((p) => p.days >= 2 && p.days <= 3),
  };

  const bills = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("marketmind-bills")) || [];
    } catch {
      return [];
    }
  }, []);

  const todaysBills = bills.filter((bill) => bill.date === todayKey);
  const todaysSales = todaysBills.reduce((sum, b) => sum + Number(b.total || 0), 0);
  const todaysOrders = todaysBills.length;

  const weeklySalesByDay = Array.from({ length: 7 }, (_, index) => {
    const d = new Date(today.getTime() - (6 - index) * 24 * 60 * 60 * 1000);
    const key = d.toISOString().split("T")[0];
    const value = bills
      .filter((b) => b.date === key)
      .reduce((sum, b) => sum + Number(b.total || 0), 0);
    return { label: d.toLocaleDateString("en-IN", { weekday: "short" }), value };
  });

  const topSellingToday = (() => {
    const map = {};
    todaysBills.forEach((bill) => {
      (bill.items || []).forEach((item) => {
        map[item.name] = (map[item.name] || 0) + Number(item.qty || 0);
      });
    });

    return Object.entries(map)
      .map(([name, sold]) => ({ name, sold }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 4);
  })();

  const topProduct = topSellingToday[0]?.name || "No sales yet";

  const inventoryHealthScore = Math.max(
    0,
    Math.min(
      100,
      100 -
        metrics.expiredCount * 12 -
        metrics.lowStockCount * 5 -
        metrics.overstockCount * 3 -
        metrics.outOfStockCount * 8
    )
  );

  const healthMeta =
    inventoryHealthScore >= 80
      ? { label: "Good", color: "text-green-700 bg-green-100" }
      : inventoryHealthScore >= 50
      ? { label: "Moderate", color: "text-amber-700 bg-amber-100" }
      : { label: "Critical", color: "text-red-700 bg-red-100" };

  const stockByCategory = Object.entries(
    products.reduce((acc, p) => {
      const category = p.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + Number(p.quantity || 0);
      return acc;
    }, {})
  ).slice(0, 6);

  const maxCategoryStock = Math.max(...stockByCategory.map(([, qty]) => qty), 1);
  const maxWeeklySales = Math.max(...weeklySalesByDay.map((d) => d.value), 1);

  const expiryRisk = {
    Critical: metrics.expiredCount,
    Warning: products.filter((p) => {
      const days = getDaysUntilExpiry(p.expiry);
      return days !== null && days >= 0 && days <= 3;
    }).length,
    Safe: products.filter((p) => {
      const days = getDaysUntilExpiry(p.expiry);
      return days === null || days > 3;
    }).length,
  };

  const alerts = [
    {
      type: "critical",
      text: `${metrics.expiredCount} products expired today`,
      show: metrics.expiredCount > 0,
    },
    {
      type: "warning",
      text: `${metrics.outOfStockCount} products out of stock`,
      show: metrics.outOfStockCount > 0,
    },
    {
      type: "warning",
      text: `${expiryGroups.Tomorrow.length} items expiring tomorrow`,
      show: expiryGroups.Tomorrow.length > 0,
    },
    {
      type: "normal",
      text: "No critical risks detected in fresh stock",
      show: metrics.expiredCount === 0 && metrics.outOfStockCount === 0,
    },
  ].filter((a) => a.show);

  const handleVoiceCommand = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatus("🔴 Voice not supported in this browser.");
      setTimeout(() => setVoiceStatus(""), 3000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    setVoiceStatus("🎙 Listening...");
    setIsListening(true);
    setTranscript("");

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus("🎙 Listening...");
    };

    recognition.onresult = (event) => {
      try {
        const result = event.results[event.results.length - 1];
        const spokenText = result[0].transcript.trim();
        setTranscript(spokenText);

        if (!result.isFinal) {
          setVoiceStatus("🎙 Listening...");
          return;
        }

        const normalizedTranscript = spokenText.toLowerCase();
        setVoiceStatus(`Heard: "${normalizedTranscript}"`);
        setIsListening(false);

        if (normalizedTranscript.includes("low stock") || normalizedTranscript.includes("inventory")) {
          navigate("/product-table");
          setVoiceStatus("✅ Opening inventory");
          return;
        }
        if (normalizedTranscript.includes("add product") || normalizedTranscript.includes("new product")) {
          navigate("/product-form");
          setVoiceStatus("✅ Opening product form");
          return;
        }
        if (normalizedTranscript.includes("sales") || normalizedTranscript.includes("pos")) {
          navigate("/sales");
          setVoiceStatus("✅ Opening sales");
          return;
        }
        if (normalizedTranscript.includes("billing") || normalizedTranscript.includes("bill") || normalizedTranscript.includes("invoice")) {
          navigate("/billing");
          setVoiceStatus("✅ Opening billing");
          return;
        }
        if (normalizedTranscript.includes("dashboard")) {
          navigate("/dashboard");
          setVoiceStatus("✅ Dashboard active");
          return;
        }

        setVoiceStatus("Try: 'low stock', 'sales', 'add product', 'billing'");
        setTimeout(() => setVoiceStatus(""), 3000);
      } catch (error) {
        console.error("Voice processing error:", error);
        setVoiceStatus("❌ Error processing voice");
        setIsListening(false);
        setTimeout(() => setVoiceStatus(""), 3000);
      }
    };

    recognition.onerror = (event) => {
      const errorMsg = event.error === "no-speech" 
        ? "❌ No speech detected. Try again." 
        : `❌ Error: ${event.error}`;
      setVoiceStatus(errorMsg);
      setIsListening(false);
      setTimeout(() => setVoiceStatus(""), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      setVoiceStatus("❌ Could not start voice");
      setIsListening(false);
      setTimeout(() => setVoiceStatus(""), 3000);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* AI Summary */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Good Morning Owner 👋</h1>
        <p className="mt-2 text-white/90">Your store snapshot for today:</p>
        <ul className="mt-3 space-y-1 text-sm md:text-base">
          <li>• {restockSuggestions.length} items need restocking</li>
          <li>• {expiryGroups.Tomorrow.length} products expiring tomorrow</li>
          <li>
            • Sales trend this week: {weeklySalesByDay[6]?.value >= weeklySalesByDay[0]?.value ? "upward" : "needs attention"}
          </li>
        </ul>
      </div>

      {/* Voice Command - Main Feature */}
      <div className="bg-white p-6 md:p-7 rounded-2xl shadow-lg border border-indigo-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">🎙 Voice Command Center</h2>
            <p className="text-sm text-gray-600 mt-1">Control dashboard with voice: inventory, sales, billing, add product.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 w-fit">
            Main Feature
          </span>
        </div>

        <button
          onClick={handleVoiceCommand}
          className={`w-full text-white py-4 rounded-xl font-semibold text-base md:text-lg transition ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {isListening ? "🔴 Recording... Speak now" : "🎙 Start Voice Dashboard Command"}
        </button>

        {(isListening || transcript) && (
          <div className="mt-3 p-3 rounded-lg border border-indigo-100 bg-indigo-50">
            <p className="text-xs text-gray-600 mb-1">Live transcription:</p>
            <p className="text-sm text-gray-800 font-medium min-h-5">
              {transcript || "Listening for your voice..."}
            </p>
          </div>
        )}

        {voiceStatus && <p className="text-xs text-gray-500 mt-2">{voiceStatus}</p>}
      </div>

      {/* Smart KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">{metrics.totalProducts}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {formatChange(metrics.totalProducts, yesterdaySnapshot?.totalProducts)}
          </p>
          <button
            onClick={() => navigate("/product-table")}
            className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            View Items →
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <h2 className="text-3xl font-bold text-amber-700 mt-1">{metrics.lowStockCount}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {formatChange(metrics.lowStockCount, yesterdaySnapshot?.lowStockCount)}
          </p>
          <button
            onClick={() => navigate("/product-table")}
            className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            View Items →
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-500">Expired Items</p>
          <h2 className="text-3xl font-bold text-red-700 mt-1">{metrics.expiredCount}</h2>
          <p className="text-sm text-red-600 mt-2">⚠ Urgent</p>
          <button
            onClick={() => navigate("/product-table")}
            className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Remove / Discount →
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-500">Inventory Value</p>
          <h2 className="text-3xl font-bold text-green-700 mt-1">₹{metrics.totalValue.toLocaleString("en-IN")}</h2>
          <p className="text-sm text-gray-600 mt-2">{valueTrend}</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Stock Levels by Category</h3>
          <div className="space-y-3">
            {stockByCategory.length === 0 ? (
              <p className="text-sm text-gray-500">No category data available.</p>
            ) : (
              stockByCategory.map(([category, qty]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{category}</span>
                    <span className="font-semibold">{qty}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(qty / maxCategoryStock) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Sales vs Stock Trend</h3>
          <div className="grid grid-cols-7 gap-2 items-end h-44">
            {weeklySalesByDay.map((day) => (
              <div key={day.label} className="flex flex-col items-center justify-end h-full">
                <div
                  className="w-6 bg-green-500 rounded-t-md"
                  style={{ height: `${(day.value / maxWeeklySales) * 100 || 8}%` }}
                  title={`₹${day.value}`}
                />
                <span className="text-xs text-gray-500 mt-2">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Expiry Risk Chart</h3>
          <div className="space-y-3">
            {Object.entries(expiryRisk).map(([key, value]) => {
              const color =
                key === "Critical"
                  ? "bg-red-500"
                  : key === "Warning"
                  ? "bg-orange-500"
                  : "bg-green-500";
              const total = Math.max(products.length, 1);
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{key}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color}`}
                      style={{ width: `${(value / total) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Restock Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Suggested Restocks</h3>
          <div className="space-y-3">
            {restockSuggestions.length === 0 ? (
              <p className="text-sm text-gray-500">No immediate restock needed.</p>
            ) : (
              restockSuggestions.map((p) => (
                <div key={p.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-gray-600">
                    {p.quantity} left → Restock {p.suggested}
                  </p>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => navigate("/product-table")}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Create Restock Order
          </button>
        </div>

        {/* Expiry Timeline */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Expiring Soon</h3>
          {Object.entries(expiryGroups).map(([label, items]) => (
            <div key={label} className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
              {items.length === 0 ? (
                <p className="text-xs text-gray-500">No items</p>
              ) : (
                <ul className="space-y-1 text-sm text-gray-700">
                  {items.map((item) => (
                    <li key={item.id}>• {item.name} – {item.quantity} units</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button
            onClick={() => navigate("/product-table")}
            className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold"
          >
            Apply Discount
          </button>
        </div>

        {/* Sales Today */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Today's Sales</h3>
          <p className="text-3xl font-bold text-green-700">₹{todaysSales.toLocaleString("en-IN")}</p>
          <p className="text-sm text-gray-600 mt-2">Orders: {todaysOrders}</p>
          <p className="text-sm text-gray-600">Top Product: {topProduct}</p>
          <p className="text-sm font-semibold text-gray-700 mt-4 mb-2">Sales this week</p>
          <div className="grid grid-cols-7 gap-1 items-end h-20">
            {weeklySalesByDay.map((d) => (
              <div
                key={`mini-${d.label}`}
                className="bg-indigo-400 rounded-t"
                title={`${d.label}: ₹${d.value}`}
                style={{ height: `${(d.value / maxWeeklySales) * 100 || 8}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Inventory Health Score */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Inventory Health</h3>
          <p className="text-3xl font-bold text-gray-900">{inventoryHealthScore} / 100</p>
          <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${healthMeta.color}`}>
            {healthMeta.label}
          </span>
          <ul className="mt-3 text-sm text-gray-600 space-y-1">
            <li>Low Stock: {metrics.lowStockCount}</li>
            <li>Expired: {metrics.expiredCount}</li>
            <li>Overstock: {metrics.overstockCount}</li>
          </ul>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Top Selling Today</h3>
          {topSellingToday.length === 0 ? (
            <p className="text-sm text-gray-500">No sales recorded today.</p>
          ) : (
            <ol className="space-y-2 text-sm text-gray-700">
              {topSellingToday.map((item, idx) => (
                <li key={item.name}>
                  {idx + 1}️⃣ {item.name} – {item.sold} sold
                </li>
              ))}
            </ol>
          )}
          <button
            onClick={() => navigate("/product-table")}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Restock
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="grid gap-2">
            <button onClick={() => navigate("/product-form")} className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 text-sm">➕ Add Product</button>
            <button onClick={() => navigate("/product-table")} className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 text-sm">📦 Update Stock</button>
            <button onClick={() => navigate("/sales")} className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 text-sm">💰 Generate Bill</button>
            <button onClick={() => navigate("/product-table")} className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 text-sm">⚠ View Expired</button>
            <button onClick={() => navigate("/billing")} className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 text-sm">📊 Sales Report</button>
          </div>
        </div>

        {/* Smart Alerts + Voice */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">🚨 Critical Alerts</h3>
          <div className="space-y-2">
            {alerts.map((alert, idx) => {
              const styles =
                alert.type === "critical"
                  ? "bg-red-100 text-red-700"
                  : alert.type === "warning"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700";
              return (
                <div key={idx} className={`text-sm px-3 py-2 rounded-lg ${styles}`}>
                  • {alert.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}