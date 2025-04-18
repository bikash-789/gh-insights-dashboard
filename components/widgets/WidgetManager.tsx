import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import QuickStatsWidget from './QuickStatsWidget';
import RecentActivityWidget from './RecentActivityWidget';
import ChartWidget from './ChartWidget';
import RepoOverviewWidget from './RepoOverviewWidget';
import IssuesOverviewWidget from './IssuesOverviewWidget';
import PRDetailsWidget from './PRDetailsWidget';
import WidgetGrid from './WidgetGrid';
import { THEME, COLORS, ACTIVITY_TYPES, WIDGET_TYPES } from '../../constants';

interface WidgetManagerProps {
  org: string;
  repo: string;
  quickStats: {
    openPRs: number;
    mergedPRs: number;
    openIssues: number;
    closedIssues: number;
  };
  recentActivity: Array<{
    id: string;
    type: typeof ACTIVITY_TYPES.PUSH | typeof ACTIVITY_TYPES.PR | typeof ACTIVITY_TYPES.ISSUE | typeof ACTIVITY_TYPES.COMMENT;
    title: string;
    user: string;
    time: string;
    url?: string;
  }>;
  repoStats?: any;
  issueStats?: any;
  prStats?: any;
}

type WidgetType = typeof WIDGET_TYPES.QUICK_STATS | typeof WIDGET_TYPES.RECENT_ACTIVITY | 
                 typeof WIDGET_TYPES.CHART | typeof WIDGET_TYPES.REPO_OVERVIEW | 
                 typeof WIDGET_TYPES.ISSUES_OVERVIEW | typeof WIDGET_TYPES.PR_DETAILS;

interface WidgetConfig {
  id: string;
  type: WidgetType;
}

const WidgetManager: React.FC<WidgetManagerProps> = ({
  org,
  repo,
  quickStats,
  recentActivity,
  repoStats,
  issueStats,
  prStats
}) => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: 'quickStats-1', type: WIDGET_TYPES.QUICK_STATS },
    { id: 'repoOverview-1', type: WIDGET_TYPES.REPO_OVERVIEW },
    { id: 'issuesOverview-1', type: WIDGET_TYPES.ISSUES_OVERVIEW },
    { id: 'prDetails-1', type: WIDGET_TYPES.PR_DETAILS },
    { id: 'recentActivity-1', type: WIDGET_TYPES.RECENT_ACTIVITY },
    { id: 'chart-1', type: WIDGET_TYPES.CHART }
  ]);
  const [isAddingWidget, setIsAddingWidget] = useState(false);
  
  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };
  
  const handleAddWidget = (type: WidgetType) => {
    const newId = `${type}-${Date.now()}`;
    setWidgets([...widgets, { id: newId, type }]);
    setIsAddingWidget(false);
  };
  
  const renderWidget = (widget: WidgetConfig) => {
    switch (widget.type) {
      case WIDGET_TYPES.QUICK_STATS:
        return (
          <QuickStatsWidget
            key={widget.id}
            stats={quickStats}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        );
      case WIDGET_TYPES.RECENT_ACTIVITY:
        return (
          <RecentActivityWidget
            key={widget.id}
            activities={recentActivity}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        );
      case WIDGET_TYPES.CHART:
        return (
          <ChartWidget
            key={widget.id}
            org={org}
            repo={repo}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        );
      case WIDGET_TYPES.REPO_OVERVIEW:
        return repoStats ? (
          <RepoOverviewWidget
            key={widget.id}
            stats={repoStats}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        ) : null;
      case WIDGET_TYPES.ISSUES_OVERVIEW:
        return issueStats ? (
          <IssuesOverviewWidget
            key={widget.id}
            stats={issueStats}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        ) : null;
      case WIDGET_TYPES.PR_DETAILS:
        return prStats ? (
          <PRDetailsWidget
            key={widget.id}
            stats={prStats}
            onRemove={() => handleRemoveWidget(widget.id)}
          />
        ) : null;
      default:
        return null;
    }
  };
  
  return (
    <>
      <WidgetGrid onAddWidget={() => setIsAddingWidget(true)}>
        {widgets.map(renderWidget)}
      </WidgetGrid>
      
      {isAddingWidget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`p-6 ${isDark ? COLORS.DARK.BG_PRIMARY : 'glass-medium'} max-w-md w-full rounded-lg shadow-xl`}>
            <h3 className={`text-xl font-medium mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>
              Add Widget
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleAddWidget(WIDGET_TYPES.QUICK_STATS)}
                className={`w-full text-left px-4 py-3 rounded-md flex items-center ${isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-gray-100/70'}`}
              >
                <div className={`p-2 rounded-md mr-3 ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Quick Stats</p>
                  <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Key repository metrics</p>
                </div>
              </button>
              
              <button
                onClick={() => handleAddWidget(WIDGET_TYPES.REPO_OVERVIEW)}
                className={`w-full text-left px-4 py-3 rounded-md flex items-center ${isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-gray-100/70'}`}
                disabled={!repoStats}
              >
                <div className={`p-2 rounded-md mr-3 ${isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Repository Overview</p>
                  <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Key repository information</p>
                </div>
              </button>
              
              <button
                onClick={() => handleAddWidget(WIDGET_TYPES.ISSUES_OVERVIEW)}
                className={`w-full text-left px-4 py-3 rounded-md flex items-center ${isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-gray-100/70'}`}
                disabled={!issueStats}
              >
                <div className={`p-2 rounded-md mr-3 ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Issues Overview</p>
                  <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Issue stats and activity</p>
                </div>
              </button>
              
              <button
                onClick={() => handleAddWidget(WIDGET_TYPES.PR_DETAILS)}
                className={`w-full text-left px-4 py-3 rounded-md flex items-center ${isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-gray-100/70'}`}
                disabled={!prStats}
              >
                <div className={`p-2 rounded-md mr-3 ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>PR Details</p>
                  <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Pull request statistics</p>
                </div>
              </button>
              
              <button
                onClick={() => handleAddWidget(WIDGET_TYPES.RECENT_ACTIVITY)}
                className={`w-full text-left px-4 py-3 rounded-md flex items-center ${isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-gray-100/70'}`}
              >
                <div className={`p-2 rounded-md mr-3 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Recent Activity</p>
                  <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Latest repository events</p>
                </div>
              </button>
              
              <button
                onClick={() => handleAddWidget(WIDGET_TYPES.CHART)}
                className={`w-full text-left px-4 py-3 rounded-md flex items-center ${isDark ? 'hover:bg-zinc-800/70' : 'hover:bg-gray-100/70'}`}
              >
                <div className={`p-2 rounded-md mr-3 ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Activity Chart</p>
                  <p className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Repository activity visualization</p>
                </div>
              </button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsAddingWidget(false)}
                className={`px-4 py-2 rounded-md ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WidgetManager; 