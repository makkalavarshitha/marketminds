import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sales({ products }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discountType, setDiscountType] = useState("none");
  const [discountValue, setDiscountValue] = useState("");
  const today = new Date().toISOString().split("T")[0];

  // Search products
  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (q === "") return [];
    return products
      .filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          String(p.barcode || p.sku || "").toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [searchTerm, products]);

  // Get product recommendations (products commonly bought together)
  const getRecommendations = () => {
    if (cart.length === 0) return [];
    const cartCategories = new Set(cart.map((item) => item.category));
    return products
      .filter(
        (p) =>
          !cart.some((item) => item.id === p.id) &&
          cartCategories.has(p.category)
      )
      .slice(0, 4);
  };

  const recommendations = getRecommendations();

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount =
    discountType === "percentage"
      ? (subtotal * Number(discountValue || 0)) / 100
      : discountType === "flat"
      ? Number(discountValue || 0)
      : 0;
  const tax = Math.round((subtotal - discountAmount) * 0.05 * 100) / 100;
  const total = subtotal - discountAmount + tax;

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity < Number(product.quantity || 0)) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        alert(`Only ${product.quantity} ${product.name} in stock!`);
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSearchTerm("");
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    if (newQty > Number(product?.quantity || 0)) {
      alert(`Only ${product?.quantity || 0} in stock!`);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const quickAdjust = (productId, delta) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    updateQuantity(productId, item.quantity + delta);
  };

  const generateBill = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }

    const bill = {
      id: `INV-${Date.now()}`,
      date: today,
      customerName,
      phoneNumber,
      items: cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
      status: "Paid",
    };

    try {
      const existing = JSON.parse(localStorage.getItem("marketmind-bills")) || [];
      existing.push(bill);
      localStorage.setItem("marketmind-bills", JSON.stringify(existing));
    } catch (e) {
      console.error("Error saving bill:", e);
    }

    setCart([]);
    setCustomerName("");
    setPhoneNumber("");
    setShowCheckout(false);
    setPaymentMethod("cash");
    setDiscountType("none");
    setDiscountValue("");
    navigate("/billing");
  };

  const printReceipt = () => {
    const w = window.open("", "", "height=600,width=400");
    w.document.write(`
      <html>
      <head><title>Receipt</title>
      <style>
        body { font-family: monospace; margin: 20px; font-size: 12px; }
        .header { text-align: center; font-weight: bold; margin-bottom: 10px; }
        .line { border-bottom: 1px dashed #000; margin: 5px 0; }
        table { width: 100%; }
        th, td { text-align: left; padding: 2px; }
        .right { text-align: right; }
      </style></head>
      <body>
      <div class="header">MarketMind Store<br/>Receipt</div>
      <div class="line"></div>
      <p>Date: ${today}<br/>Inv: ${`INV-${Date.now()}`.slice(0, 15)}</p>
      <p>Customer: ${customerName}</p>
      <div class="line"></div>
      <table>
      <thead><tr><th>Item</th><th class="right">Qty</th><th class="right">₹</th></tr></thead>
      <tbody>
      ${cart
        .map(
          (item) =>
            `<tr><td>${item.name}</td><td class="right">${item.quantity}</td><td class="right">${(
              item.price * item.quantity
            ).toFixed(2)}</td></tr>`
        )
        .join("")}
      </tbody>
      </table>
      <div class="line"></div>
      <table>
      <tr><td>Subtotal:</td><td class="right">₹${subtotal.toFixed(2)}</td></tr>
      ${discountAmount > 0 ? `<tr><td>Discount:</td><td class="right">-₹${discountAmount.toFixed(2)}</td></tr>` : ""}
      <tr><td>Tax (5%):</td><td class="right">₹${tax.toFixed(2)}</td></tr>
      <tr style="font-weight: bold;"><td>TOTAL:</td><td class="right">₹${total.toFixed(2)}</td></tr>
      </table>
      <p style="text-align: center; margin-top: 10px;">
      Payment: ${paymentMethod.toUpperCase()}<br/>
      Thank You!
      </p>
      </body></html>
    `);
    w.document.close();
    setTimeout(() => w.print(), 250);
  };

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus("🔴 Voice not supported in this browser");
      setTimeout(() => setVoiceStatus(""), 3000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    setVoiceStatus("🎙 Listening...");
    setVoiceTranscript("");
    setIsListening(true);

    recognition.onresult = (event) => {
      try {
        const result = event.results[event.results.length - 1];
        const spokenText = result[0].transcript.trim();
        setVoiceTranscript(spokenText);

        if (!result.isFinal) {
          setVoiceStatus("🎙 Listening...");
          return;
        }

        const transcript = spokenText.toLowerCase().trim();
        setVoiceStatus(`Heard: "${transcript}"`);

        if (transcript.includes("add")) {
          setVoiceCommand(transcript);
        } else if (transcript.includes("clear")) {
          setCart([]);
          setVoiceStatus("✅ Cart cleared");
        } else if (transcript.includes("checkout") || transcript.includes("bill")) {
          if (cart.length > 0) {
            setShowCheckout(true);
            setVoiceStatus("✅ Opening checkout");
          } else {
            setVoiceStatus("❌ Cart is empty");
          }
        } else if (transcript.includes("help")) {
          setVoiceStatus("Say: 'add 2 milk' | 'clear' | 'checkout'");
        } else {
          setVoiceStatus(`Try: "add [qty] [product]" or "checkout"`);
        }
        setTimeout(() => setVoiceStatus(""), 4000);
      } catch (error) {
        console.error("Voice error:", error);
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

  // Today's sales from bills
  const allBills = JSON.parse(localStorage.getItem("marketmind-bills")) || [];
  const todaysBills = allBills.filter((b) => b.date === today);
  const totalSalesValue = todaysBills.reduce((sum, b) => sum + (b.total || 0), 0);
  const avgBillValue = todaysBills.length > 0 ? totalSalesValue / todaysBills.length : 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6">
      {/* Sales Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-xs text-gray-500">Today's Sales</p>
          <p className="text-2xl font-bold text-green-700">₹{totalSalesValue.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-xs text-gray-500">Orders</p>
          <p className="text-2xl font-bold">{todaysBills.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-xs text-gray-500">Avg Bill</p>
          <p className="text-2xl font-bold">₹{avgBillValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-xs text-gray-500">Cart Items</p>
          <p className="text-2xl font-bold text-blue-600">{cart.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Search */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Search Product / Scan Barcode
            </label>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type product name, barcode..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {searchResults.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-400 rounded-lg p-3 text-left transition"
                  >
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                    <p className="text-sm font-bold text-blue-700">₹{p.price}</p>
                    <p className="text-xs text-gray-500">
                      Stock: {p.quantity}
                      {Number(p.quantity || 0) <= 5 && Number(p.quantity || 0) > 0 && (
                        <span className="ml-1 text-orange-600">⚠</span>
                      )}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleVoiceCommand}
                className={`flex-1 text-white px-4 py-2 rounded-lg font-semibold transition ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
              >
                {isListening ? "🔴 Recording..." : "🎙 Voice Add"}
              </button>
              <button
                onClick={() => setCart([])}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200"
              >
                Clear Cart
              </button>
            </div>
            {(isListening || voiceTranscript) && (
              <div className="mt-2 p-2 rounded-lg border border-purple-100 bg-purple-50">
                <p className="text-xs text-gray-600 mb-1">Live transcription:</p>
                <p className="text-sm text-gray-800 font-medium min-h-5">
                  {voiceTranscript || "Listening for your voice..."}
                </p>
              </div>
            )}
            {voiceStatus && <p className="text-xs text-gray-600 mt-2">{voiceStatus}</p>}
          </div>

          {/* Cart Table */}
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-900">Shopping Cart ({cart.length} items)</h3>
            </div>

            {cart.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                <p className="text-lg">Cart is empty. Start searching for products!</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Product</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Price</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Qty</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold">Total</th>
                        <th className="px-4 py-2 text-center text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900">{item.name}</div>
                            {Number(item.quantity || 0) <= 5 && (
                              <p className="text-xs text-orange-600">⚠ Only {item.quantity} left</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">₹{item.price}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => quickAdjust(item.id, -1)}
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                              >
                                −
                              </button>
                              <span className="w-6 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => quickAdjust(item.id, 1)}
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-bold">₹{(item.price * item.quantity).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl shadow border border-gray-100 p-5 mt-5">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Recommendations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {recommendations.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-400 rounded-lg p-2 text-sm text-left transition"
                  >
                    <p className="font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                    <p className="font-bold text-amber-700">₹{p.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Bill Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 sticky top-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Bill Summary</h3>

            <div className="space-y-2 mb-4 pb-4 border-b">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Tax (5%):</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-green-700">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Discount */}
            <div className="mb-4 pb-4 border-b">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mb-2"
              >
                <option value="none">No Discount</option>
                <option value="percentage">Percentage %</option>
                <option value="flat">Flat Amount ₹</option>
              </select>
              {discountType !== "none" && (
                <input
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  type="number"
                  placeholder={discountType === "percentage" ? "10" : "50"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                />
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-4 pb-4 border-b">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "cash", icon: "💵", label: "Cash" },
                  { value: "card", icon: "💳", label: "Card" },
                  { value: "upi", icon: "📱", label: "UPI" },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
                      paymentMethod === method.value
                        ? "bg-blue-600 text-white border-2 border-blue-600"
                        : "border-2 border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                  >
                    {method.icon}
                    <br />
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4 pb-4 border-b">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Walk-in Customer"
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mb-2"
              />
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Optional"
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
              />
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setShowCheckout(true)}
              disabled={cart.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold text-lg transition"
            >
              📋 Generate Bill
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">Confirm Checkout</h2>
              <button onClick={() => setShowCheckout(false)} className="text-2xl">✕</button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Order Details */}
              <div>
                <h3 className="font-bold text-lg mb-3">Order Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1 border-b">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-sm font-semibold">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount:</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg text-green-700">
                    <span>TOTAL:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Customer & Payment */}
              <div>
                <h3 className="font-bold text-lg mb-3">Customer & Payment</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Customer name..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Phone (optional)</label>
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Payment Method</label>
                    <p className="px-3 py-2 bg-blue-50 border border-blue-300 rounded-lg font-semibold">
                      {paymentMethod === "cash" && "💵 Cash"}
                      {paymentMethod === "card" && "💳 Card"}
                      {paymentMethod === "upi" && "📱 UPI"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={generateBill}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                  >
                    Generate Bill
                  </button>
                </div>

                {!customerName.trim() && (
                  <p className="text-sm text-red-600 mt-2 font-semibold">⚠ Please enter customer name</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t flex gap-2">
              <button
                onClick={printReceipt}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                🖨 Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
