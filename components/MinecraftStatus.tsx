import React from 'react';
import useSWR from 'swr';

interface ServerStatus {
  online: boolean;
  players: {
    online: number;
    max: number;
    list?: string[];
  };
  version: string;
  motd: string;
  favicon?: string;
  ping: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MinecraftStatus: React.FC = () => {
  const { data: status, error } = useSWR<ServerStatus>('/api/minecraft-status', fetcher, {
    refreshInterval: 1200000, // Refresh every 2 minutes
  });

  if (error) {
    return (
      <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-text-primary">Server Status</h3>
        </div>
        <p className="text-text-secondary">Failed to load server status</p>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-text-primary">Server Status</h3>
        </div>
        <p className="text-text-secondary">Loading server status...</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-gray border border-light-gray rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${status.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <h3 className="text-lg font-semibold text-text-primary">Server Status</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-text-secondary">
            <span className="font-medium">Status:</span> {status.online ? 'Online' : 'Offline'}
          </p>
        </div>
        
        {status.online && (
          <>
            <div>
              <p className="text-text-secondary">
                <span className="font-medium">Players:</span> {status.players.online}/{status.players.max}
              </p>
            </div>
            
            <div>
              <p className="text-text-secondary">
                <span className="font-medium">Version:</span> {status.version}
              </p>
            </div>
            

            
            {status.motd && (
              <div>
                <p className="text-text-secondary">
                  <span className="font-medium">MOTD:</span> {status.motd}
                </p>
              </div>
            )}
          </>
        )}
        
        <div className="mt-4 pt-4 border-t border-light-gray">
          <p className="text-text-muted text-sm">
            <span className="font-medium">Server IP:</span> smp.anihaven.site
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinecraftStatus;