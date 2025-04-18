import { useState, useEffect } from 'react';
import { 
  apiClient, 
  ApiError,
  ConnectionError,
  RepoMetrics,
  RepoStats,
  ContributorStats,
  IssueStats,
  DetailedPRStats,
  MonthlyStats,
  RecentActivity
} from '../services/api';
import { ERROR_MESSAGES } from '../constants';

export interface GitHubDataState {
  metrics: RepoMetrics | null;
  repoStats: RepoStats | null;
  contributorStats: ContributorStats | null;
  issueStats: IssueStats | null;
  detailedPRStats: DetailedPRStats | null;
  monthlyStats: MonthlyStats[] | null;
  recentActivity: RecentActivity | null;
  loading: boolean;
  error: string | null;
  apiConnected: boolean | null;
}

export interface GitHubDataActions {
  fetchData: (org: string, repo: string) => Promise<void>;
  checkApiConnection: () => Promise<void>;
}

export function useGitHubData(): [GitHubDataState, GitHubDataActions] {
  const [state, setState] = useState<GitHubDataState>({
    metrics: null,
    repoStats: null,
    contributorStats: null,
    issueStats: null,
    detailedPRStats: null,
    monthlyStats: null,
    recentActivity: null,
    loading: false,
    error: null,
    apiConnected: null
  });

  const checkApiConnection = async (): Promise<void> => {
    try {
      const response = await fetch('/api/backendHealth');
      const connected = response.ok;
      
      setState(prev => ({
        ...prev,
        apiConnected: connected,
        error: !connected 
          ? ERROR_MESSAGES.API_CONNECTION 
          : prev.error
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        apiConnected: false,
        error: 'Cannot connect to API server'
      }));
    }
  };

  const fetchData = async (org: string, repo: string): Promise<void> => {
    if (state.apiConnected === false) return;

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [
        metrics,
        repoStats,
        contributorStats,
        issueStats,
        detailedPRStats,
        monthlyStats,
        recentActivity
      ] = await Promise.all([
        apiClient.getRepoMetrics(org, repo),
        apiClient.getRepoStats(org, repo),
        apiClient.getContributorStats(org, repo),
        apiClient.getIssueStats(org, repo),
        apiClient.getDetailedPRStats(org, repo),
        apiClient.getMonthlyStats(org, repo),
        apiClient.getRecentActivity(org, repo)
      ]);

      setState(prev => ({
        ...prev,
        metrics,
        repoStats,
        contributorStats,
        issueStats,
        detailedPRStats,
        monthlyStats,
        recentActivity,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      
      let errorMessage = 'Failed to load repository data';
      
      if (error instanceof ApiError) {
        if (error.status === 404) {
          errorMessage = `Repository "${org}/${repo}" not found or no metrics available`;
        } else {
          errorMessage = `API Error: ${error.message}`;
        }
      } else if (error instanceof ConnectionError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  };

  return [
    state,
    {
      fetchData,
      checkApiConnection
    }
  ];
} 