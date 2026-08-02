export interface VisitorLog {
  id?: string;
  ip: string;
  country?: string;
  city?: string;
  browser: string;
  os: string;
  userAgent?: string;
  timestamp: string;
}

export interface VisitorInfo {
  ip: string;
  country?: string;
  city?: string;
  browser: string;
  os: string;
  visitCount: number;
  logs?: VisitorLog[];
}

export function parseUserAgent(): { browser: string; os: string } {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  // OS detection
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = ua.includes('iPhone') || ua.includes('iPad') ? 'iOS' : 'macOS';
  else if (ua.includes('Linux')) os = ua.includes('Android') ? 'Android' : 'Linux';

  // Browser detection
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Safari/')) browser = 'Safari';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';

  return { browser, os };
}

// MongoDB Atlas Data API / Micro-API Endpoint configuration
const MONGO_API_ENDPOINT = (import.meta as any).env?.VITE_MONGO_API_ENDPOINT || 'https://api.counterapi.dev/v1/psy-zney-portfolio-logs';

export async function fetchVisitorInfo(): Promise<VisitorInfo> {
  const { browser, os } = parseUserAgent();
  let ip = '127.0.0.1';
  let country = 'Vietnam';
  let city = 'Ho Chi Minh City';
  let visitCount = 1;

  // Fetch Public IP & Geo Location
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      ip = data.ip || ip;
      country = data.country_name || country;
      city = data.city || city;
    }
  } catch {
    try {
      const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        ip = data.ip || ip;
      }
    } catch {
      // Fallback
    }
  }

  // Increment Global Visit Counter
  try {
    const counterRes = await fetch('https://api.counterapi.dev/v1/psy-zney-portfolio/visits/up', { signal: AbortSignal.timeout(3000) });
    if (counterRes.ok) {
      const counterData = await counterRes.json();
      if (counterData && typeof counterData.count === 'number') {
        visitCount = counterData.count;
      }
    }
  } catch {
    const key = 'zney_portfolio_visits';
    const local = parseInt(localStorage.getItem(key) || '100', 10) + 1;
    localStorage.setItem(key, local.toString());
    visitCount = local;
  }

  // Log Visitor Entry to Storage / DB Endpoint
  const currentLog: VisitorLog = {
    ip,
    country,
    city,
    browser,
    os,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };

  saveVisitorLogToDB(currentLog);

  const logs = getVisitorLogsHistory(currentLog);

  return {
    ip,
    country,
    city,
    browser,
    os,
    visitCount,
    logs,
  };
}

export function saveVisitorLogToDB(newLog: VisitorLog) {
  try {
    const existingStr = localStorage.getItem('zney_mongo_visitor_logs');
    let logs: VisitorLog[] = existingStr ? JSON.parse(existingStr) : [];
    // Prevent duplicate logs within 10 seconds for same IP
    const isRecent = logs.some(
      (l) => l.ip === newLog.ip && Math.abs(new Date(l.timestamp).getTime() - new Date(newLog.timestamp).getTime()) < 10000
    );
    if (!isRecent) {
      logs.unshift(newLog);
      if (logs.length > 50) logs = logs.slice(0, 50); // Keep last 50 logs
      localStorage.setItem('zney_mongo_visitor_logs', JSON.stringify(logs));
    }
  } catch {
    // Ignore storage errors
  }
}

export function getVisitorLogsHistory(currentLog?: VisitorLog): VisitorLog[] {
  try {
    const existingStr = localStorage.getItem('zney_mongo_visitor_logs');
    let logs: VisitorLog[] = existingStr ? JSON.parse(existingStr) : [];
    if (currentLog && !logs.some((l) => l.timestamp === currentLog.timestamp)) {
      logs.unshift(currentLog);
    }
    return logs;
  } catch {
    return currentLog ? [currentLog] : [];
  }
}

function getSessionId() {
  let sid = sessionStorage.getItem('zney_session_id');
  if (!sid) {
    sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('zney_session_id', sid);
  }
  return sid;
}

export async function trackPageView(viewName: string) {
  try {
    await fetch('https://route-hiv-blog-pdas.trycloudflare.com/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: viewName,
        referrer: document.referrer,
        session_id: getSessionId()
      }),
      signal: AbortSignal.timeout(3000)
    });
  } catch {
    // Ignore
  }
}
