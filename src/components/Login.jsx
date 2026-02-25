import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Fake authentication: accept any credentials, but provide a nicer default for admin
    const user = {
      email,
      name: email.includes('@') ? email.split('@')[0] : email,
      role: email === 'admin@marketmind.test' ? 'Administrator' : 'Manager',
    };

    try {
      if (remember) {
        localStorage.setItem('marketmind-user', JSON.stringify(user));
      }
    } catch (e) {
      // ignore
    }

    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col justify-center px-8">
          <div className="mb-6">
            <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Marketmind</div>
            <p className="mt-3 text-gray-600">Smarter inventory insights. Fast onboarding.</p>
          </div>

          <div className="rounded-xl p-6 shadow-lg bg-white/60 backdrop-blur-sm border border-white/30">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Why you'll love it</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Clean dashboard for inventory health</li>
              <li>• Quick product entry and expiry alerts</li>
              <li>• Built with Tailwind — fast and responsive</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-[1.01] transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-sm text-gray-500">Sign in to access your dashboard</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold">M</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow">Sign in</button>
              <button type="button" onClick={() => { setEmail(''); setPassword(''); }} className="flex-1 border border-gray-200 px-5 py-2 rounded-lg">Clear</button>
            </div>

            <div className="pt-4">
              <div className="text-xs text-center text-gray-500 mb-3">Or continue with</div>
              <div className="flex gap-3">
                <button type="button" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">Google</button>
                <button type="button" className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">GitHub</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
