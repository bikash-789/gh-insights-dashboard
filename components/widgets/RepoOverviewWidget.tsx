import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Widget from './Widget';
import { RepoStats } from '../../services/api';

interface RepoOverviewWidgetProps {
  stats: RepoStats;
  loading?: boolean;
  onConfigure?: () => void;
  onRemove?: () => void;
}

const RepoOverviewWidget: React.FC<RepoOverviewWidgetProps> = ({
  stats,
  loading = false,
  onConfigure,
  onRemove
}) => {
  const { theme } = useTheme();
  const safeStats = stats || {} as RepoStats;
  
  const stars = safeStats.stars ?? 0;
  const forks = safeStats.forks ?? 0;
  const watchers = safeStats.watchers ?? 0;
  const sizeKb = safeStats.size_kb ?? 0;
  const language = safeStats.language ?? 'Unknown';
  const lastUpdated = safeStats.last_updated ?? new Date().toISOString();
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    } catch (e) {
      return 'Unknown date';
    }
  };

  const formatSize = (sizeKb: number) => {
    if (sizeKb < 1024) {
      return `${sizeKb} KB`;
    } else if (sizeKb < 1024 * 1024) {
      return `${(sizeKb / 1024).toFixed(1)} MB`;
    } else {
      return `${(sizeKb / (1024 * 1024)).toFixed(1)} GB`;
    }
  };
  
  return (
    <Widget
      title="Repository Overview"
      loading={loading}
      onConfigure={onConfigure}
      onRemove={onRemove}
      size="medium"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Stars</p>
          </div>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`}>{stars.toLocaleString()}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Forks</p>
          </div>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{forks.toLocaleString()}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Watchers</p>
          </div>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>{watchers.toLocaleString()}</p>
        </div>
      </div>
      
      <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-zinc-800/20' : 'border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Language</p>
            </div>
            <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>{language}</p>
          </div>
          
          <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Size</p>
            </div>
            <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>{formatSize(sizeKb)}</p>
          </div>
          
          <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Updated</p>
            </div>
            <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>{formatDate(lastUpdated)}</p>
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default RepoOverviewWidget; 