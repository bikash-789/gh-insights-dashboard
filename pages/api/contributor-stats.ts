import type { NextApiRequest, NextApiResponse } from 'next'
import { API } from '../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { org, repo } = req.query;
  
  if (!org || !repo) {
    return res.status(400).json({ error: 'Missing required parameters: org and repo' });
  }
  
  try {
    const backendUrl = `${API.BASE_URL}${API.ENDPOINTS.CONTRIBUTOR_STATS}?org=${encodeURIComponent(String(org))}&repo=${encodeURIComponent(String(repo))}`;
    console.log('Proxying contributor-stats request to:', backendUrl);
    const response = await fetch(backendUrl).catch(err => {
      console.error('Backend connection error:', err);
      throw new Error('Cannot connect to backend server. Is it running?');
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend returned error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch contributor stats from backend',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 