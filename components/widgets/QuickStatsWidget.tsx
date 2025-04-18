import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Widget from './Widget';

interface QuickStatsWidgetProps {
  stats: {
    openPRs: number;
    mergedPRs: number;
    openIssues: number;
    closedIssues: number;
  };
  loading?: boolean;
  onConfigure?: () => void;
  onRemove?: () => void;
}

const QuickStatsWidget: React.FC<QuickStatsWidgetProps> = ({ 
  stats, 
  loading = false,
  onConfigure,
  onRemove
}) => {
  const { theme } = useTheme();
  
  const safeStats = {
    openPRs: stats?.openPRs ?? 0,
    mergedPRs: stats?.mergedPRs ?? 0,
    openIssues: stats?.openIssues ?? 0,
    closedIssues: stats?.closedIssues ?? 0
  };
  
  return (
    <Widget 
      title="Quick Stats" 
      loading={loading}
      onConfigure={onConfigure}
      onRemove={onRemove}
      size="medium"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Open PRs</p>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>{safeStats.openPRs}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Merged PRs</p>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>{safeStats.mergedPRs}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Open Issues</p>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-amber-300' : 'text-amber-600'}`}>{safeStats.openIssues}</p>
        </div>
        
        <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>Closed Issues</p>
          <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{safeStats.closedIssues}</p>
        </div>
      </div>
    </Widget>
  );
};

export default QuickStatsWidget; 