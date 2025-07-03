import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { MINECRAFT_SERVER_IP } = process.env;
  const serverIP = MINECRAFT_SERVER_IP || 'smp.anihaven.site';

  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const status = {
      online: data.online || false,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 0,
        list: data.players?.list || [],
      },
      version: data.version || 'Unknown',
      motd: data.motd?.clean?.[0] || data.motd?.raw?.[0] || 'No MOTD',
      favicon: data.icon || null,
      ping: data.debug?.ping || 0,
    };

    res.status(200).json(status);
  } catch (error) {
    console.error('Minecraft Status API Error:', error);
    res.status(500).json({ 
      online: false,
      players: { online: 0, max: 0, list: [] },
      version: 'Unknown',
      motd: 'Server unreachable',
      ping: 0,
      error: 'Failed to fetch server status' 
    });
  }
}