import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Widget from './Widget';
import { DetailedPRStats } from '../../services/api';

interface PRDetailsWidgetProps {
  stats: DetailedPRStats;
  loading?: boolean;
  onConfigure?: () => void;
  onRemove?: () => void;
}

const PRDetailsWidget: React.FC<PRDetailsWidgetProps> = ({
  stats,
  loading = false,
  onConfigure,
  onRemove
}) => {
  const { theme } = useTheme();
  const safeStats = stats || {} as DetailedPRStats;
  const openPrs = safeStats.open_prs ?? 0;
  const mergedLastWeek = safeStats.merged_last_week ?? 0;
  const smallPrs = safeStats.small_prs ?? 0;
  const mediumPrs = safeStats.medium_prs ?? 0;
  const largePrs = safeStats.large_prs ?? 0;
  const avgMergeTime = safeStats.avg_merge_time ?? '0';
  
  const totalPRs = smallPrs + mediumPrs + largePrs;
  const smallPercentage = totalPRs > 0 ? (smallPrs / totalPRs * 100).toFixed(1) : '0';
  const mediumPercentage = totalPRs > 0 ? (mediumPrs / totalPRs * 100).toFixed(1) : '0';
  const largePercentage = totalPRs > 0 ? (largePrs / totalPRs * 100).toFixed(1) : '0';
  
  return (
    <Widget
      title="Pull Request Details"
      loading={loading}
      onConfigure={onConfigure}
      onRemove={onRemove}
      size="medium"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Avg Merge Time</p>
          </div>
          <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{avgMergeTime.split('.')[0]}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Open PRs</p>
          </div>
          <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>{openPrs.toLocaleString()}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Merged Last Week</p>
          </div>
          <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>{mergedLastWeek.toLocaleString()}</p>
        </div>
      </div>
      
      <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-zinc-800/20' : 'border-gray-200'}`}>
        <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}`}>PR Size Distribution</p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1 text-xs">
              <span className={theme === 'dark' ? 'text-green-300' : 'text-green-600'}>
                Small PRs ({smallPercentage}%)
              </span>
              <span className={theme === 'dark' ? 'text-green-300' : 'text-green-600'}>
                {smallPrs.toLocaleString()}
              </span>
            </div>
            <div className={`w-full h-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full`}>
              <div 
                className={`h-2 ${theme === 'dark' ? 'bg-green-500' : 'bg-green-600'} rounded-full`} 
                style={{ width: `${smallPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-xs">
              <span className={theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}>
                Medium PRs ({mediumPercentage}%)
              </span>
              <span className={theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}>
                {mediumPrs.toLocaleString()}
              </span>
            </div>
            <div className={`w-full h-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full`}>
              <div 
                className={`h-2 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-600'} rounded-full`} 
                style={{ width: `${mediumPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-xs">
              <span className={theme === 'dark' ? 'text-red-300' : 'text-red-600'}>
                Large PRs ({largePercentage}%)
              </span>
              <span className={theme === 'dark' ? 'text-red-300' : 'text-red-600'}>
                {largePrs.toLocaleString()}
              </span>
            </div>
            <div className={`w-full h-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full`}>
              <div 
                className={`h-2 ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'} rounded-full`} 
                style={{ width: `${largePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default PRDetailsWidget; 