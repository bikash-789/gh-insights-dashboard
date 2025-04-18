import React from 'react';
import { IssueStats } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

interface IssueStatsCardProps {
  stats: IssueStats;
  darkMode?: boolean;
  sharpEdges?: boolean;
}

const IssueStatsCard: React.FC<IssueStatsCardProps> = ({ 
  stats, 
  darkMode: _darkMode = false,
  sharpEdges = false 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const safeStats = stats || {} as IssueStats;
  
  const openIssues = safeStats.open_issues ?? 0;
  const closedIssues = safeStats.closed_issues ?? 0;
  const avgResolutionTime = safeStats.avg_resolution_time ?? '0';
  const oldestOpenIssue = safeStats.oldest_open_issue ?? new Date().toISOString();
  const issuesLast30Days = safeStats.issues_last_30_days ?? 0;
  
  const totalIssues = openIssues + closedIssues;
  const openPercentage = totalIssues > 0 ? (openIssues / totalIssues * 100).toFixed(1) : '0';
  
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

  return (
    <div className={`overflow-hidden ${isDark ? 'glass-medium' : 'bg-white'} shadow-lg transition-all duration-300`}>
      <div className="px-6 py-4 border-b border-zinc-800/20">
        <h2 className={`text-lg font-medium ${isDark ? 'text-zinc-200' : 'text-gray-700'}`}>Issues Overview</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? 'bg-red-500/20' : 'bg-red-100'} ${isDark ? 'text-red-300' : 'text-red-600'} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>Open Issues</p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-red-300' : 'text-red-600'}`}>{openIssues.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                  {openPercentage}% of all issues
                </span>
                <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                  Oldest: {formatDate(oldestOpenIssue)}
                </span>
              </div>
              <div className={`w-full h-2 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} ${!sharpEdges && 'rounded-full'}`}>
                <div 
                  className={`h-2 ${isDark ? 'bg-red-500' : 'bg-red-600'} ${!sharpEdges && 'rounded-full'}`} 
                  style={{ width: `${openPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? 'bg-green-500/20' : 'bg-green-100'} ${isDark ? 'text-green-300' : 'text-green-600'} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>Closed Issues</p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-green-300' : 'text-green-600'}`}>{closedIssues.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                  {(100 - parseFloat(openPercentage)).toFixed(1)}% of all issues
                </span>
                <span className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                  Avg Resolution: {avgResolutionTime}
                </span>
              </div>
              <div className={`w-full h-2 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} ${!sharpEdges && 'rounded-full'}`}>
                <div 
                  className={`h-2 ${isDark ? 'bg-green-500' : 'bg-green-600'} ${!sharpEdges && 'rounded-full'}`} 
                  style={{ width: `${100 - parseFloat(openPercentage)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-zinc-800/20' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} ${isDark ? 'text-blue-300' : 'text-blue-600'} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>Recent Activity (30 days)</p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>{issuesLast30Days} new issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueStatsCard; 