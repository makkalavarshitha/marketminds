import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────
   Sub-component: Landing Navbar (public)
───────────────────────────────────────── */
function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Why Us", href: "#why-us" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
            <span className="text-lg font-bold text-gray-900">
              Market<span className="text-indigo-600">Mind</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              id="landing-nav-login"
              className="text-sm font-semibold text-indigo-600 border-2 border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              id="landing-nav-register"
              className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 rounded-xl shadow hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 space-y-2 animate-slide-down shadow-lg rounded-b-2xl">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg mx-2 transition"
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 px-4 pt-2">
              <Link
                to="/login"
                className="text-center text-sm font-semibold text-indigo-600 border-2 border-indigo-200 py-2 rounded-xl hover:bg-indigo-50 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 py-2 rounded-xl shadow hover:shadow-md transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────
   Feature card data
───────────────────────────────────────── */
const features = [
  {
    icon: "📦",
    title: "Smart Inventory Tracking",
    desc: "Monitor all your products in real-time. Get instant visibility into stock levels, categories, and product details.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: "⏰",
    title: "Expiry Date Alerts",
    desc: "Never lose money on expired goods. Automated alerts notify you weeks before products reach their expiry date.",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: "📈",
    title: "Sales Analytics",
    desc: "Understand your business with detailed sales charts, trend reports, and revenue breakdowns at a glance.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
  },
  {
    icon: "🧾",
    title: "Fast Billing System",
    desc: "Generate professional invoices in seconds. Streamline checkout and reduce customer wait times significantly.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: "🔔",
    title: "Restock Notifications",
    desc: "Get intelligent low-stock warnings so you reorder at the right time — no more stockouts or over-ordering.",
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: "🏪",
    title: "Multi-Store Management",
    desc: "Manage your store profile, staff users, and store-specific settings all from one unified dashboard.",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
  },
];

/* ─────────────────────────────────────────
   Benefits data
───────────────────────────────────────── */
const benefits = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Optimized for speed — every action responds instantly so your team stays productive.",
  },
  {
    icon: "🔒",
    title: "Secure & Reliable",
    desc: "JWT-based auth and MongoDB Atlas ensure your data is safe, backed up, and always available.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    desc: "Works beautifully on any screen — phones, tablets, and desktop computers alike.",
  },
  {
    icon: "🎯",
    title: "Built for Owners",
    desc: "Designed specifically for supermarket owners — not generic ERP bloatware.",
  },
];

/* ─────────────────────────────────────────
   Testimonials data
───────────────────────────────────────── */
const testimonials = [
  {
    name: "Rajan Mehta",
    role: "Owner, Mehta Supermart",
    avatar: "R",
    avatarColor: "from-blue-500 to-indigo-600",
    quote:
      "MarketMind completely transformed how I run my store. The expiry alerts alone have saved me thousands in waste every month.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Manager, FreshMart Pune",
    avatar: "P",
    avatarColor: "from-purple-500 to-pink-500",
    quote:
      "The billing system is incredibly fast. Checkout lines are shorter and our customers are much happier. Highly recommend!",
    stars: 5,
  },
  {
    name: "Anil Kuvrekar",
    role: "Owner, Kuvrekar General Stores",
    avatar: "A",
    avatarColor: "from-green-500 to-teal-500",
    quote:
      "I was managing everything in spreadsheets before. Now I have real-time dashboards and it actually feels like running a modern business.",
    stars: 5,
  },
];

/* ─────────────────────────────────────────
   Main Landing Page Component
───────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── Navbar ── */}
      <LandingNavbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4 pt-20 pb-16 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 -left-1/4 w-2/3 h-2/3 bg-gradient-to-br from-indigo-200/40 to-transparent rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-1/3 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-purple-200/40 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.75s" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Smart Inventory Platform for Supermarkets
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Manage Your Store{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Smarter
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 bg-clip-text text-transparent">
              Faster
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            MarketMind is the all-in-one inventory, billing, and analytics platform built specifically
            for supermarket owners — track stock, prevent waste, and grow your business.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              id="hero-cta-register"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start for Free
            </Link>
            <Link
              to="/login"
              id="hero-cta-login"
              className="w-full sm:w-auto bg-white text-indigo-600 border-2 border-indigo-200 px-8 py-4 rounded-xl font-semibold text-base hover:bg-indigo-50 hover:border-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In to Dashboard
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { value: "500+", label: "Stores Managed" },
              { value: "99.9%", label: "Uptime" },
              { value: "40%", label: "Less Waste" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#features"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-indigo-500 transition-colors"
        >
          <span className="text-xs font-medium">Explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Features</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
              Everything You Need to Run a{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Modern Store
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Purpose-built tools to help supermarket owners take control of operations, reduce losses, and delight customers.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`${f.bg} p-6 rounded-xl shadow border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-2xl shadow-md mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / MISSION ── */}
      <section
        id="about"
        className="bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Our Mission</span>
              <h2 className="mt-2 text-4xl font-extrabold text-gray-900 leading-tight">
                Empowering Small Stores with{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Enterprise-Grade Tools
                </span>
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                MarketMind was created to solve the real problems supermarket owners face every day —
                manual stockkeeping, missed expiry dates, slow billing, and poor sales visibility.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our mission is simple: bring the power of a full inventory management system to every
                neighbourhood store, without the complexity and cost of traditional enterprise software.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  Join MarketMind
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 border-2 border-indigo-200 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:border-indigo-300 transition-all duration-200"
                >
                  See Features
                </a>
              </div>
            </div>

            {/* Right: Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏪", title: "Problem We Solve", desc: "Manual stockkeeping, missed expiries, slow billing, zero analytics." },
                { icon: "💡", title: "Our Approach", desc: "Real-time dashboards and smart alerts that work for you in the background." },
                { icon: "🌍", title: "Our Vision", desc: "Help every small supermarket compete with modern digital tools." },
                { icon: "🎯", title: "Who We Serve", desc: "Supermarket owners, store managers, and their billing staff." },
              ].map((c) => (
                <div key={c.title} className="bg-white rounded-xl shadow border border-gray-100 p-5 hover:shadow-md transition-all">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{c.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Why MarketMind</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
              The Smarter Choice for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Supermarket Owners
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Unlike generic inventory tools, MarketMind is laser-focused on the unique challenges of running a supermarket.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex gap-4 items-start bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-3xl flex-shrink-0">{b.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold">
              <div className="px-6 py-4">Feature</div>
              <div className="px-6 py-4 text-center border-x border-white/20">Traditional Method</div>
              <div className="px-6 py-4 text-center">MarketMind</div>
            </div>
            {[
              ["Inventory Tracking", "Manual ledgers", "Real-time digital"],
              ["Expiry Monitoring", "Visual checks", "Automated alerts"],
              ["Sales Reports", "End-of-day manual", "Live analytics"],
              ["Billing", "Slow paper / POS", "Fast digital invoicing"],
              ["Stock Alerts", "None / guesswork", "Smart notifications"],
            ].map(([feat, old, neww]) => (
              <div key={feat} className="grid grid-cols-3 border-t border-gray-100 text-sm">
                <div className="px-6 py-4 font-semibold text-gray-700">{feat}</div>
                <div className="px-6 py-4 text-center text-gray-400 border-x border-gray-100">{old}</div>
                <div className="px-6 py-4 text-center text-indigo-600 font-semibold">{neww}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="testimonials"
        className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Testimonials</span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
              Loved by Store Owners{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Across India
              </span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              See what supermarket owners are saying about MarketMind after switching from manual processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl shadow border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${t.avatarColor} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-3/4 h-full bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-full bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Ready to Take Control of Your Store?
          </h2>
          <p className="mt-4 text-indigo-100 text-lg max-w-xl mx-auto">
            Join hundreds of supermarket owners who have already modernised their operations with MarketMind.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              id="cta-banner-register"
              className="w-full sm:w-auto bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Create Free Account
            </Link>
            <Link
              to="/login"
              id="cta-banner-login"
              className="w-full sm:w-auto border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <span className="text-lg font-bold text-white">
                  Market<span className="text-indigo-400">Mind</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Smart inventory and sales management platform designed for supermarket owners. Track stock, prevent waste, grow faster.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#why-us" className="hover:text-indigo-400 transition-colors">Why Us</a></li>
                <li><a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a></li>
              </ul>
            </div>

            {/* Account links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/login" className="hover:text-indigo-400 transition-colors">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-indigo-400 transition-colors">Create Account</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {new Date().getFullYear()} MarketMind. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
