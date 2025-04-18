import type { NextApiRequest, NextApiResponse } from 'next'
import { API } from '../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${API.BASE_URL}/api/health`).catch(err => {
      console.error('Backend health check failed:', err);
      throw new Error('Failed to connect to backend');
    });
    
    if (!response.ok) {
      throw new Error(`Backend health check failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Backend health check error:', error);
    return res.status(503).json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 