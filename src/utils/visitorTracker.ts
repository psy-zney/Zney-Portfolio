export interface VisitorInfo {
  ip: string;
  country?: string;
  city?: string;
  browser: string;
  os: string;
  visitCount: number;
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

export async function fetchVisitorInfo(): Promise<VisitorInfo> {
  const { browser, os } = parseUserAgent();
  let ip = '127.0.0.1';
  let country = '';
  let city = '';
  let visitCount = 1;

  // Fetch Public IP & Geo Location
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      ip = data.ip || ip;
      country = data.country_name || '';
      city = data.city || '';
    }
  } catch {
    try {
      const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        ip = data.ip || ip;
      }
    } catch {
      // Fallback if IP services are unreachable
    }
  }

  // Increment & Fetch Global Visit Counter
  try {
    const counterRes = await fetch('https://api.counterapi.dev/v1/psy-zney-portfolio/visits/up', { signal: AbortSignal.timeout(3000) });
    if (counterRes.ok) {
      const counterData = await counterRes.json();
      if (counterData && typeof counterData.count === 'number') {
        visitCount = counterData.count;
      }
    }
  } catch {
    // Localstorage fallback for visits
    const key = 'zney_portfolio_visits';
    const local = parseInt(localStorage.getItem(key) || '100', 10) + 1;
    localStorage.setItem(key, local.toString());
    visitCount = local;
  }

  return {
    ip,
    country,
    city,
    browser,
    os,
    visitCount,
  };
}
