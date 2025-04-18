import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Widget from './Widget';
import { THEME, COLORS, ACTIVITY_TYPES } from '../../constants';

interface Activity {
  id: string;
  type: typeof ACTIVITY_TYPES.PUSH | typeof ACTIVITY_TYPES.PR | typeof ACTIVITY_TYPES.ISSUE | typeof ACTIVITY_TYPES.COMMENT;
  title: string;
  user: string;
  time: string;
  url?: string;
}

interface RecentActivityWidgetProps {
  activities: Activity[];
  loading?: boolean;
  onConfigure?: () => void;
  onRemove?: () => void;
}

const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ 
  activities, 
  loading = false,
  onConfigure,
  onRemove
}) => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case ACTIVITY_TYPES.PUSH:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case ACTIVITY_TYPES.PR:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case ACTIVITY_TYPES.ISSUE:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case ACTIVITY_TYPES.COMMENT:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case ACTIVITY_TYPES.PUSH:
        return isDark ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-100';
      case ACTIVITY_TYPES.PR:
        return isDark ? 'text-purple-400 bg-purple-900/30' : 'text-purple-600 bg-purple-100';
      case ACTIVITY_TYPES.ISSUE:
        return isDark ? 'text-amber-400 bg-amber-900/30' : 'text-amber-600 bg-amber-100';
      case ACTIVITY_TYPES.COMMENT:
        return isDark ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100';
      default:
        return isDark ? 'text-gray-400 bg-gray-900/30' : 'text-gray-600 bg-gray-100';
    }
  };
  
  return (
    <Widget 
      title="Recent Activity" 
      loading={loading}
      onConfigure={onConfigure}
      onRemove={onRemove}
      size="medium"
    >
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-md ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <a 
                href={activity.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block text-sm font-medium truncate hover:underline ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}
              >
                {activity.title}
              </a>
              <p className={`text-xs ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>
                {activity.user} • {activity.time}
              </p>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <p className={`text-center py-4 ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>
            No recent activity
          </p>
        )}
      </div>
    </Widget>
  );
};

export default RecentActivityWidget; 