import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { Database } from 'bun:sqlite';
import { cors } from 'hono/cors';
import { createHash } from 'crypto';

const db = new Database('analytics.sqlite', { create: true });

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    user_agent TEXT,
    path TEXT,
    referrer TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const app = new Hono();

// Enable CORS for the portfolio domain (using '*' for simplicity, but can be restricted)
app.use('*', cors());

// Track a page view
app.post('/track', async (c) => {
  try {
    const body = await c.req.json();
    const { path, referrer, session_id } = body;
    
    // Get client IP and User Agent
    const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';

    const insert = db.prepare('INSERT INTO visits (ip, user_agent, path, referrer, session_id) VALUES (?, ?, ?, ?, ?)');
    insert.run(ip, userAgent, path || '/', referrer || '', session_id || 'unknown');

    return c.json({ success: true });
  } catch (err) {
    console.error('Error tracking visit:', err);
    return c.json({ success: false, error: 'Failed to log visit' }, 500);
  }
});

// Get basic statistics (Protected)
app.get('/stats', (c) => {
  // Check Password against Hash
  const authHeader = c.req.header('Authorization');
  let providedPass = '';
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    providedPass = authHeader.split(' ')[1] || '';
  } else if (c.req.query('pass')) {
    providedPass = c.req.query('pass') || '';
  }

  const providedHash = createHash('sha256').update(providedPass).digest('hex');
  const validHash = '25c2ca07b3b47304f3d4368b624430af46ec538aa061fe51c9bb9b818f4fc2e7';

  if (providedHash !== validHash) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    // Total visits
    const totalViewsQuery = db.query('SELECT COUNT(*) as count FROM visits').get() as { count: number };
    
    // Unique visitors (based on IP)
    const uniqueVisitorsQuery = db.query('SELECT COUNT(DISTINCT ip) as count FROM visits').get() as { count: number };
    
    // Page views by path
    const pathsQuery = db.query('SELECT path, COUNT(*) as count FROM visits GROUP BY path ORDER BY count DESC LIMIT 10').all();
    
    // Top referrers
    const referrersQuery = db.query('SELECT referrer, COUNT(*) as count FROM visits WHERE referrer != \'\' GROUP BY referrer ORDER BY count DESC LIMIT 10').all();

    // Recent visits (last 50)
    const recentVisitsQuery = db.query('SELECT ip, user_agent, path, timestamp FROM visits ORDER BY timestamp DESC LIMIT 50').all();

    // Flow analysis
    const allSessionsQuery = db.query('SELECT session_id, path, timestamp FROM visits WHERE session_id IS NOT NULL AND session_id != "unknown" ORDER BY session_id, timestamp ASC').all() as any[];
    
    const flowTransitions: Record<string, number> = {};
    const sessionPaths: Record<string, string[]> = {};

    allSessionsQuery.forEach(row => {
      if (!sessionPaths[row.session_id]) {
        sessionPaths[row.session_id] = [];
      }
      const paths = sessionPaths[row.session_id];
      if (paths.length === 0 || paths[paths.length - 1] !== row.path) {
        paths.push(row.path);
      }
    });

    Object.values(sessionPaths).forEach(paths => {
      for (let i = 0; i < paths.length - 1; i++) {
        const transition = `${paths[i]} ➔ ${paths[i+1]}`;
        flowTransitions[transition] = (flowTransitions[transition] || 0) + 1;
      }
    });

    const topFlows = Object.entries(flowTransitions)
      .map(([transition, count]) => ({ transition, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return c.json({
      totalViews: totalViewsQuery.count,
      uniqueVisitors: uniqueVisitorsQuery.count,
      topPaths: pathsQuery,
      topReferrers: referrersQuery,
      recentVisits: recentVisitsQuery,
      topFlows,
      status: 'online'
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    return c.json({ error: 'Failed to fetch statistics' }, 500);
  }
});

// Redirect root to portfolio
app.get('/', (c) => {
  return c.redirect('https://psy-zney.github.io/');
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
console.log(`Analytics server running on port ${port}`);

Bun.serve({
  port,
  fetch: app.fetch,
});