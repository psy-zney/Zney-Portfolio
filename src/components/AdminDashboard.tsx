import React, { useState, useEffect } from 'react';
import { Lock, Eye, Users, MousePointerClick, ArrowLeft, LogOut, Globe, Clock, Smartphone, Monitor } from 'lucide-react';

interface AdminDashboardProps {
  onExit: () => void;
  lang: 'vie' | 'eng';
}

interface StatData {
  totalViews: number;
  uniqueVisitors: number;
  topPaths: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  recentVisits: { ip: string; user_agent: string; path: string; timestamp: string }[];
  status: string;
}

export function AdminDashboard({ onExit, lang }: AdminDashboardProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(false);

  // Read password from local storage on mount
  useEffect(() => {
    const savedPass = localStorage.getItem('zney_admin_pass');
    if (savedPass) {
      setPassword(savedPass);
      fetchData(savedPass);
    }
  }, []);

  const fetchData = async (pass: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://projectors-legislation-structural-subsidiary.trycloudflare.com/stats', {
        headers: { 'Authorization': `Bearer ${pass}` }
      });
      
      if (res.status === 401) {
        setError(lang === 'vie' ? 'Mật khẩu không chính xác!' : 'Incorrect password!');
        setIsAuthenticated(false);
        localStorage.removeItem('zney_admin_pass');
        setLoading(false);
        return;
      }
      
      const jsonData = await res.json();
      setData(jsonData);
      setIsAuthenticated(true);
      localStorage.setItem('zney_admin_pass', pass);
    } catch (err) {
      setError(lang === 'vie' ? 'Lỗi kết nối máy chủ' : 'Server connection error');
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    fetchData(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('zney_admin_pass');
    setIsAuthenticated(false);
    setPassword('');
    setData(null);
  };

  const parseUserAgent = (ua: string) => {
    let browser = 'Unknown';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    
    let os = 'Unknown';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Linux')) os = 'Linux';
    
    return { browser, os };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] w-full bg-[#050810] flex items-center justify-center p-4 font-mono relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-900/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md">
          <button 
            onClick={onExit}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> {lang === 'vie' ? 'Quay lại' : 'Back'}
          </button>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Lock className="text-sky-400" size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h1>
            <p className="text-center text-slate-400 mb-8 text-sm">
              {lang === 'vie' ? 'Nhập mật khẩu quản trị' : 'Enter admin password'}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-center tracking-[0.2em]"
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  lang === 'vie' ? 'Đăng Nhập' : 'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-[#050810] text-slate-200 p-4 md:p-8 font-sans overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <button onClick={onExit} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Globe className="text-sky-400" /> zney Analytics
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => fetchData(password)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700"
            >
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors border border-red-500/20 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Eye size={64} />
            </div>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mb-2">Total Page Views</p>
            <p className="text-5xl font-bold text-white">{data?.totalViews || 0}</p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Users size={64} />
            </div>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-wider mb-2">Unique Visitors</p>
            <p className="text-5xl font-bold text-white">{data?.uniqueVisitors || 0}</p>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Pages */}
          <div className="lg:col-span-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MousePointerClick size={18} className="text-sky-400" /> Top Pages
            </h2>
            <div className="space-y-3">
              {(!data?.topPaths || data.topPaths.length === 0) ? (
                <p className="text-slate-500 text-sm">No data yet</p>
              ) : (
                data.topPaths.map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <span className="font-mono text-sm text-sky-300 truncate pr-4">{p.path || '/'}</span>
                    <span className="font-bold bg-slate-950 px-2 py-1 rounded text-sm text-slate-300">{p.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Visits */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-hidden flex flex-col">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-sky-400" /> Recent Visitors
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-950/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Time</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">Path</th>
                    <th className="px-4 py-3 rounded-tr-lg">Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {data?.recentVisits?.map((v, i) => {
                    const { browser, os } = parseUserAgent(v.user_agent);
                    return (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                          {new Date(v.timestamp + 'Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-300">
                          {v.ip}
                        </td>
                        <td className="px-4 py-3 text-sky-400">
                          {v.path || '/'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {os === 'iOS' || os === 'Android' ? <Smartphone size={14} className="text-slate-400" /> : <Monitor size={14} className="text-slate-400" />}
                            <span className="text-slate-300">{browser}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{os}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
