import React from 'react';
import { DetailedPRStats } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { THEME, COLORS } from '../constants';

interface DetailedPRStatsCardProps {
  stats: DetailedPRStats;
  darkMode?: boolean;
  sharpEdges?: boolean;
}

const DetailedPRStatsCard: React.FC<DetailedPRStatsCardProps> = ({ 
  stats, 
  darkMode: _darkMode = false,
  sharpEdges = false 
}) => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
  const safeStats = stats || {} as DetailedPRStats;
  
  const openPrs = safeStats.open_prs ?? 0;
  const mergedLastWeek = safeStats.merged_last_week ?? 0;
  const smallPrs = safeStats.small_prs ?? 0;
  const mediumPrs = safeStats.medium_prs ?? 0;
  const largePrs = safeStats.large_prs ?? 0;
  const avgMergeTime = safeStats.avg_merge_time ?? '0';
  const avgComments = safeStats.avg_comments ?? 0;
  const prsWithoutReview = safeStats.prs_without_review ?? 0;
  
  const totalPRs = smallPrs + mediumPrs + largePrs;
  const smallPercentage = totalPRs > 0 ? (smallPrs / totalPRs * 100).toFixed(1) : '0';
  const mediumPercentage = totalPRs > 0 ? (mediumPrs / totalPRs * 100).toFixed(1) : '0';
  const largePercentage = totalPRs > 0 ? (largePrs / totalPRs * 100).toFixed(1) : '0';

  return (
    <div className={`overflow-hidden ${isDark ? COLORS.DARK.BG_PRIMARY : COLORS.LIGHT.BG_PRIMARY} shadow-lg transition-all duration-300`}>
      <div className={`px-6 py-4 border-b ${isDark ? COLORS.DARK.BORDER : COLORS.LIGHT.BORDER}`}>
        <h2 className={`text-lg font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Pull Request Details</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.BLUE.DARK_BG : COLORS.BLUE.LIGHT_BG} ${isDark ? COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Average Merge Time</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_TEXT}`}>{avgMergeTime.split('.')[0]}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.PURPLE.DARK_BG : COLORS.PURPLE.LIGHT_BG} ${isDark ? COLORS.PURPLE.DARK_TEXT : COLORS.PURPLE.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Open PRs</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.PURPLE.DARK_TEXT : COLORS.PURPLE.LIGHT_TEXT}`}>{openPrs.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.GREEN.DARK_BG : COLORS.GREEN.LIGHT_BG} ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Merged Last Week</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT}`}>{mergedLastWeek.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${isDark ? COLORS.DARK.BORDER : COLORS.LIGHT.BORDER}`}>
          <h3 className={`text-md font-medium mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>PR Size Distribution</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className={`text-sm font-medium ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT}`}>
                  Small PRs ({smallPercentage}%)
                </span>
                <span className={`text-sm font-medium ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT}`}>
                  {smallPrs.toLocaleString()}
                </span>
              </div>
              <div className={`w-full h-3 ${isDark ? COLORS.DARK.BG_SECONDARY : COLORS.LIGHT.BG_SECONDARY}`}>
                <div 
                  className={`h-3 ${isDark ? 'bg-green-500' : 'bg-green-600'}`} 
                  style={{ width: `${smallPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className={`text-sm font-medium ${isDark ? COLORS.YELLOW.DARK_TEXT : COLORS.YELLOW.LIGHT_TEXT}`}>
                  Medium PRs ({mediumPercentage}%)
                </span>
                <span className={`text-sm font-medium ${isDark ? COLORS.YELLOW.DARK_TEXT : COLORS.YELLOW.LIGHT_TEXT}`}>
                  {mediumPrs.toLocaleString()}
                </span>
              </div>
              <div className={`w-full h-3 ${isDark ? COLORS.DARK.BG_SECONDARY : COLORS.LIGHT.BG_SECONDARY}`}>
                <div 
                  className={`h-3 ${isDark ? 'bg-yellow-500' : 'bg-yellow-600'}`} 
                  style={{ width: `${mediumPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className={`text-sm font-medium ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT}`}>
                  Large PRs ({largePercentage}%)
                </span>
                <span className={`text-sm font-medium ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT}`}>
                  {largePrs.toLocaleString()}
                </span>
              </div>
              <div className={`w-full h-3 ${isDark ? COLORS.DARK.BG_SECONDARY : COLORS.LIGHT.BG_SECONDARY}`}>
                <div 
                  className={`h-3 ${isDark ? 'bg-red-500' : 'bg-red-600'}`} 
                  style={{ width: `${largePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-center">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.ORANGE.DARK_BG : COLORS.ORANGE.LIGHT_BG} ${isDark ? COLORS.ORANGE.DARK_TEXT : COLORS.ORANGE.LIGHT_TEXT} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Average Comments</p>
                <p className={`text-xl font-semibold ${isDark ? COLORS.ORANGE.DARK_TEXT : COLORS.ORANGE.LIGHT_TEXT}`}>
                  {avgComments} per PR
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.RED.DARK_BG : COLORS.RED.LIGHT_BG} ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>No Review</p>
                <p className={`text-xl font-semibold ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT}`}>
                  {prsWithoutReview} PRs merged without review
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPRStatsCard; 