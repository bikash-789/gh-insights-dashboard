import type { NextApiRequest, NextApiResponse } from 'next';
import { API } from '../../constants';

interface RecentActivityItem {
  id: string;
  type: 'pr' | 'issue' | 'push' | 'comment';
  title: string;
  user: string;
  time: string;
  url: string;
}

interface RecentActivityResponse {
  items: RecentActivityItem[];
}

interface ErrorResponse {
  error: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecentActivityResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported for this endpoint' 
    });
  }
  const { org, repo } = req.query;
  if (!org || !repo) {
    return res.status(400).json({ error: 'Missing required parameters: org and repo' });
  }
  const orgString = Array.isArray(org) ? org[0] : String(org);
  const repoString = Array.isArray(repo) ? repo[0] : String(repo);
  
  try {
    const backendUrl = `${API.BASE_URL}${API.ENDPOINTS.RECENT_ACTIVITY}?org=${encodeURIComponent(orgString)}&repo=${encodeURIComponent(repoString)}`;
    console.log('Proxying recent-activity request to:', backendUrl);
    const response = await fetch(backendUrl).catch(err => {
      console.error('Backend connection error:', err);
      throw new Error('Cannot connect to backend server. Is it running?');
    });
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404) {
        return res.status(404).json({ 
          error: 'Not found', 
          message: `Repository "${orgString}/${repoString}" not found or no recent activity available` 
        });
      }
      
      throw new Error(`Backend returned error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from backend',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 