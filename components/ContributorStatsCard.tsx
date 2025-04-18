import React from 'react';
import { ContributorStats } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { THEME, COLORS } from '../constants';

interface ContributorStatsCardProps {
  stats: ContributorStats;
  darkMode?: boolean;
  sharpEdges?: boolean;
}

const ContributorStatsCard: React.FC<ContributorStatsCardProps> = ({ 
  stats, 
  darkMode: _darkMode = false,
  sharpEdges = false 
}) => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
  const safeStats = stats || {} as ContributorStats;
  
  const totalContributors = safeStats.total_contributors ?? 0;
  const commitsLast30Days = safeStats.commits_last_30_days ?? 0;
  const avgCommitsPerDay = safeStats.avg_commits_per_day ?? 0;
  const topContributors = safeStats.top_contributors ?? [];

  return (
    <div className={`overflow-hidden ${isDark ? COLORS.DARK.BG_PRIMARY : COLORS.LIGHT.BG_PRIMARY} shadow-lg transition-all duration-300`}>
      <div className={`px-6 py-4 border-b ${isDark ? COLORS.DARK.BORDER : COLORS.LIGHT.BORDER}`}>
        <h2 className={`text-lg font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Contributors Overview</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.INDIGO.DARK_BG : COLORS.INDIGO.LIGHT_BG} ${isDark ? COLORS.INDIGO.DARK_TEXT : COLORS.INDIGO.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Total Contributors</p>
              <p className={`text-2xl font-semibold ${isDark ? COLORS.INDIGO.DARK_TEXT : COLORS.INDIGO.LIGHT_TEXT}`}>{totalContributors.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${isDark ? COLORS.ORANGE.DARK_BG : COLORS.ORANGE.LIGHT_BG} ${isDark ? COLORS.ORANGE.DARK_TEXT : COLORS.ORANGE.LIGHT_TEXT} mr-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Recent Activity (30 days)</p>
              <div className="flex items-baseline space-x-2">
                <p className={`text-2xl font-semibold ${isDark ? COLORS.ORANGE.DARK_TEXT : COLORS.ORANGE.LIGHT_TEXT}`}>{commitsLast30Days}</p>
                <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>commits</p>
                <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>
                  (~{avgCommitsPerDay} per day)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${isDark ? COLORS.DARK.BORDER : COLORS.LIGHT.BORDER}`}>
          <h3 className={`text-md font-medium mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Top Contributors</h3>
          <div className="grid grid-cols-1 gap-4">
            {topContributors.slice(0, 3).map((contributor, index) => (
              <div key={index} className={`flex items-center p-4 ${isDark ? COLORS.DARK.BG_SECONDARY : COLORS.LIGHT.BG_SECONDARY} ${!sharpEdges && 'rounded-lg'}`}>
                <img 
                  src={contributor.avatar_url} 
                  alt={`${contributor.username} avatar`}
                  className={`h-12 w-12 ${!sharpEdges && 'rounded-full'} mr-4 border-2 ${isDark ? 'border-zinc-700' : 'border-white'}`}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline">
                    <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>
                      {contributor.username}
                    </p>
                    <span className={`px-3 py-1 ${!sharpEdges && 'rounded-full'} text-xs font-medium ${isDark ? COLORS.BLUE.DARK_BG + ' ' + COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_BG + ' ' + COLORS.BLUE.LIGHT_TEXT}`}>
                      {contributor.contributions.toLocaleString()} contributions
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorStatsCard; 