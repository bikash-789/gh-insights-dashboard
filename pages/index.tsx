import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RepoSearch from '../components/RepoSearch';
import Alert from '../components/Alert';
import MetricsCards from '../components/MetricsCards';
import RepoStatsCard from '../components/RepoStatsCard';
import ContributorStatsCard from '../components/ContributorStatsCard';
import IssueStatsCard from '../components/IssueStatsCard';
import DetailedPRStatsCard from '../components/DetailedPRStatsCard';
import WidgetManager from '../components/widgets';
import { useGitHubData } from '../hooks/useGitHubData';
import { useTheme } from '../contexts/ThemeContext';
import { THEME, VIEWS, DEFAULTS, COLORS, ERROR_MESSAGES, ALERT_TYPES } from '../constants';


type ViewType = typeof VIEWS.OVERVIEW | typeof VIEWS.WIDGETS | typeof VIEWS.DETAILS;

const Home: NextPage = () => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
  const [
    { 
      metrics, 
      repoStats, 
      contributorStats, 
      issueStats, 
      detailedPRStats,
      recentActivity,
      loading, 
      error, 
      apiConnected 
    },
    { 
      fetchData, 
      checkApiConnection 
    }
  ] = useGitHubData();
  
  const [searchOrg, setSearchOrg] = useState(DEFAULTS.ORGANIZATION);
  const [searchRepo, setSearchRepo] = useState(DEFAULTS.REPOSITORY);
  const [showWidgets, setShowWidgets] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>(VIEWS.OVERVIEW as ViewType);

  useEffect(() => {
    checkApiConnection();
  }, []);

  useEffect(() => {
    if (apiConnected !== null && apiConnected) {
      fetchData(searchOrg, searchRepo);
    }
  }, [searchOrg, searchRepo, apiConnected]);

  useEffect(() => {
    if (metrics && repoStats && contributorStats && issueStats && detailedPRStats) {
      setShowWidgets(true);
    }
  }, [metrics, repoStats, contributorStats, issueStats, detailedPRStats]);

  const handleSearch = (org: string, repo: string) => {
    setSearchOrg(org);
    setSearchRepo(repo);
  };

  const renderContent = () => {
    if (loading && apiConnected !== false) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 opacity-70"></div>
        </div>
      );
    }
    
    if (error && error !== ERROR_MESSAGES.API_CONNECTION) {
      return <Alert type={ALERT_TYPES.ERROR} message={error} />;
    }
    
    if (!metrics || !repoStats || !contributorStats || !issueStats || !detailedPRStats) {
      return null;
    }
    
    switch (activeView) {
      case VIEWS.OVERVIEW:
        return (
          <>
            <div className="mb-8">
              <MetricsCards metrics={metrics} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <RepoStatsCard stats={repoStats} sharpEdges={true} />
              </div>
              <div className="lg:col-span-1">
                <div className={`p-6 ${isDark ? COLORS.DARK.BG_PRIMARY : COLORS.LIGHT.BG_PRIMARY} shadow-lg h-full flex flex-col justify-center`}>
                  <h2 className={`text-lg font-medium mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Repository Activity</h2>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Open Pull Requests</span>
                      <span className={`text-lg font-semibold ${isDark ? COLORS.PURPLE.DARK_TEXT : COLORS.PURPLE.LIGHT_TEXT}`}>{metrics.open_prs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Open Issues</span>
                      <span className={`text-lg font-semibold ${isDark ? COLORS.RED.DARK_TEXT : COLORS.RED.LIGHT_TEXT}`}>{issueStats.open_issues}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>PRs Merged Last Week</span>
                      <span className={`text-lg font-semibold ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT}`}>{metrics.merged_last_week}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Avg. Resolve Time</span>
                      <span className={`text-lg font-semibold ${isDark ? COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_TEXT}`}>{metrics.avg_merge_time?.split('.')[0] || '0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ContributorStatsCard stats={contributorStats} sharpEdges={true} />
              <IssueStatsCard stats={issueStats} sharpEdges={true} />
            </div>
            <div className="mb-8">
              <DetailedPRStatsCard stats={detailedPRStats} sharpEdges={true} />
            </div>
          </>
        );
      case VIEWS.WIDGETS:
        return showWidgets ? (
          <WidgetManager 
            org={searchOrg}
            repo={searchRepo}
            quickStats={{
              openPRs: metrics?.open_prs ?? 0,
              mergedPRs: metrics?.merged_last_week ?? 0,
              openIssues: issueStats?.open_issues ?? 0,
              closedIssues: issueStats?.closed_issues ?? 0
            }}
            recentActivity={recentActivity?.items || []}
            repoStats={repoStats}
            issueStats={issueStats}
            prStats={detailedPRStats}
          />
        ) : null;
      case VIEWS.DETAILS:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Repository Details</h2>
                <RepoStatsCard stats={repoStats} sharpEdges={true} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Contributors</h2>
                <ContributorStatsCard stats={contributorStats} sharpEdges={true} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Issues</h2>
                <IssueStatsCard stats={issueStats} sharpEdges={true} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${isDark ? COLORS.DARK.TEXT_PRIMARY : COLORS.LIGHT.TEXT_PRIMARY}`}>Pull Requests</h2>
                <DetailedPRStatsCard stats={detailedPRStats} sharpEdges={true} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      {apiConnected === false && (
        <Alert 
          type={ALERT_TYPES.WARNING} 
          message={ERROR_MESSAGES.API_CONNECTION} 
        />
      )}
      
      <div className="mb-8">
        <RepoSearch 
          onSearch={handleSearch}
          initialOrg={searchOrg}
          initialRepo={searchRepo}
          disabled={apiConnected === false}
        />
      </div>
      
      {!loading && !error && metrics && (
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeView === VIEWS.OVERVIEW 
              ? `${isDark ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}` 
              : `${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'}`}`}
            onClick={() => setActiveView(VIEWS.OVERVIEW as ViewType)}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeView === VIEWS.WIDGETS 
              ? `${isDark ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}` 
              : `${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'}`}`}
            onClick={() => setActiveView(VIEWS.WIDGETS as ViewType)}
          >
            Custom Widgets
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeView === VIEWS.DETAILS 
              ? `${isDark ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}` 
              : `${isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'}`}`}
            onClick={() => setActiveView(VIEWS.DETAILS as ViewType)}
          >
            Detailed View
          </button>
        </div>
      )}
      
      {renderContent()}
    </Layout>
  );
};

export default Home; 