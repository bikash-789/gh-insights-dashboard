import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export interface CardProps {
  title: string;
  value: string;
  icon?: string;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange';
  glass?: boolean;
  glassStrength?: 'light' | 'medium' | 'strong';
  sharpEdges?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  value, 
  icon = 'chart-bar', 
  color = 'blue', 
  glass = false,
  glassStrength = 'medium',
  sharpEdges = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colorClasses = {
    blue: {
      iconBg: glass ? 'bg-blue-500/20' : isDark ? 'bg-blue-900/50' : 'bg-blue-100',
      iconColor: glass ? isDark ? 'text-blue-300' : 'text-blue-600' : isDark ? 'text-blue-300' : 'text-blue-600',
      valueColor: glass ? isDark ? 'text-blue-300' : 'text-blue-600' : isDark ? 'text-blue-300' : 'text-blue-600',
    },
    green: {
      iconBg: glass ? 'bg-green-500/20' : isDark ? 'bg-green-900/50' : 'bg-green-100',
      iconColor: glass ? isDark ? 'text-green-300' : 'text-green-600' : isDark ? 'text-green-300' : 'text-green-600',
      valueColor: glass ? isDark ? 'text-green-300' : 'text-green-600' : isDark ? 'text-green-300' : 'text-green-600',
    },
    purple: {
      iconBg: glass ? 'bg-purple-500/20' : isDark ? 'bg-purple-900/50' : 'bg-purple-100',
      iconColor: glass ? isDark ? 'text-purple-300' : 'text-purple-600' : isDark ? 'text-purple-300' : 'text-purple-600',
      valueColor: glass ? isDark ? 'text-purple-300' : 'text-purple-600' : isDark ? 'text-purple-300' : 'text-purple-600',
    },
    red: {
      iconBg: glass ? 'bg-red-500/20' : isDark ? 'bg-red-900/50' : 'bg-red-100',
      iconColor: glass ? isDark ? 'text-red-300' : 'text-red-600' : isDark ? 'text-red-300' : 'text-red-600',
      valueColor: glass ? isDark ? 'text-red-300' : 'text-red-600' : isDark ? 'text-red-300' : 'text-red-600',
    },
    orange: {
      iconBg: glass ? 'bg-orange-500/20' : isDark ? 'bg-orange-900/50' : 'bg-orange-100',
      iconColor: glass ? isDark ? 'text-orange-300' : 'text-orange-600' : isDark ? 'text-orange-300' : 'text-orange-600',
      valueColor: glass ? isDark ? 'text-orange-300' : 'text-orange-600' : isDark ? 'text-orange-300' : 'text-orange-600',
    },
  };

  
  const getGlassClass = () => {
    if (!glass) return isDark ? 'bg-zinc-800/50 shadow-sm' : 'bg-white shadow-sm';

    switch (glassStrength) {
      case 'light':
        return 'glass-light';
      case 'strong':
        return 'glass-strong';
      case 'medium':
      default:
        return 'glass-medium';
    }
  };

  
  const icons = {
    'chart-bar': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    'clock': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'git-pull-request': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
    'check-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className={`overflow-hidden ${getGlassClass()} hover-glass transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center">
          <div className={`p-3 ${!sharpEdges && 'rounded-full'} ${colorClasses[color].iconBg} ${colorClasses[color].iconColor} mr-4`}>
            {icons[icon as keyof typeof icons]}
          </div>
          <div>
            <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>{title}</p>
            <p className={`text-2xl font-semibold ${colorClasses[color].valueColor}`}>{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 