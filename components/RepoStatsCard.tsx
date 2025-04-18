import React from 'react';
import { RepoStats } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { THEME, COLORS, DATE_FORMAT_OPTIONS, ERROR_MESSAGES } from '../constants';

interface RepoStatsCardProps {
  stats: RepoStats;
  darkMode?: boolean;
  sharpEdges?: boolean;
}

const RepoStatsCard: React.FC<RepoStatsCardProps> = ({ 
  stats, 
  darkMode: _darkMode = false,
  sharpEdges = false 
}) => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
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
      return new Intl.DateTimeFormat('en-US', DATE_FORMAT_OPTIONS.SHORT).format(date);
    } catch (e) {
      return ERROR_MESSAGES.UNKNOWN_DATE;
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
    <div className={`overflow-hidden ${isDark ? COLORS.DARK.BG_PRIMARY : COLORS.LIGHT.BG_PRIMARY} shadow-lg transition-all duration-300`}>
      <div className="px-6 py-4 border-b border-zinc-800/20">
        <h2 className={`text-lg font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Repository Overview</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.YELLOW.DARK_BG : COLORS.YELLOW.LIGHT_BG} ${isDark ? COLORS.YELLOW.DARK_TEXT : COLORS.YELLOW.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Stars</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.YELLOW.DARK_TEXT : COLORS.YELLOW.LIGHT_TEXT}`}>{stars.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.BLUE.DARK_BG : COLORS.BLUE.LIGHT_BG} ${isDark ? COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Forks</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_TEXT}`}>{forks.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.PURPLE.DARK_BG : COLORS.PURPLE.LIGHT_BG} ${isDark ? COLORS.PURPLE.DARK_TEXT : COLORS.PURPLE.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Watchers</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.PURPLE.DARK_TEXT : COLORS.PURPLE.LIGHT_TEXT}`}>{watchers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${isDark ? COLORS.DARK.BORDER : COLORS.LIGHT.BORDER}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.GREEN.DARK_BG : COLORS.GREEN.LIGHT_BG} ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Primary Language</p>
                <p className={`text-lg font-semibold ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT}`}>{language}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.ORANGE.DARK_BG : COLORS.ORANGE.LIGHT_BG} ${isDark ? COLORS.ORANGE.DARK_TEXT : COLORS.ORANGE.LIGHT_TEXT} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Repository Size</p>
                <p className={`text-lg font-semibold ${isDark ? COLORS.ORANGE.DARK_TEXT : COLORS.ORANGE.LIGHT_TEXT}`}>{formatSize(sizeKb)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.RED.DARK_BG : COLORS.RED.LIGHT_BG} ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT} mr-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Last Updated</p>
                <p className={`text-lg font-semibold ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT}`}>{formatDate(lastUpdated)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoStatsCard; 