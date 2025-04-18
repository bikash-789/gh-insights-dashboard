export interface RepoMetrics {
  avg_merge_time: string;
  open_prs: number;
  merged_last_week: number;
}

export interface MonthlyStats {
  month: string;
  open_prs: number;
  merged_prs: number;
  issues: number;
}

export interface MonthlyStatsResponse {
  data: MonthlyStats[];
}

export interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  size_kb: number;
  last_updated: string;
  language: string;
}

export interface ContributorInfo {
  username: string;
  contributions: number;
  avatar_url: string;
}

export interface ContributorStats {
  total_contributors: number;
  top_contributors: ContributorInfo[];
  commits_last_30_days: number;
  avg_commits_per_day: number;
}

export interface IssueStats {
  open_issues: number;
  closed_issues: number;
  avg_resolution_time: string;
  oldest_open_issue: string;
  issues_last_30_days: number;
}

export interface DetailedPRStats {
  avg_merge_time: string;
  open_prs: number;
  merged_last_week: number;
  small_prs: number;
  medium_prs: number;
  large_prs: number;
  avg_comments: number;
  prs_without_review: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'pr' | 'issue' | 'push' | 'comment';
  title: string;
  user: string;
  time: string;
  url: string;
}

export interface RecentActivity {
  items: RecentActivityItem[];
}

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export class ConnectionError extends Error {
  constructor(message: string = 'Cannot connect to API server') {
    super(message);
    this.name = 'ConnectionError';
  }
}

class ApiClient {
  private async request<T>(endpoint: string, params: Record<string, string>): Promise<T> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      
      const url = `/api/${endpoint}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(`API request failed: ${response.status} - ${errorText}`, response.status);
      }
      
      return await response.json() as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      console.error(`Request to ${endpoint} failed:`, error);
      throw new ConnectionError('Failed to connect to API server');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch('/api/backendHealth');
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  async getRepoMetrics(org: string, repo: string): Promise<RepoMetrics> {
    return this.request<RepoMetrics>('metrics', { org, repo });
  }

  async getMonthlyStats(org: string, repo: string): Promise<MonthlyStats[]> {
    const response = await this.request<MonthlyStatsResponse>('monthly-stats', { org, repo });
    return response.data;
  }

  async getRepoStats(org: string, repo: string): Promise<RepoStats> {
    return this.request<RepoStats>('repo-stats', { org, repo });
  }

  async getContributorStats(org: string, repo: string): Promise<ContributorStats> {
    return this.request<ContributorStats>('contributor-stats', { org, repo });
  }

  async getIssueStats(org: string, repo: string): Promise<IssueStats> {
    return this.request<IssueStats>('issue-stats', { org, repo });
  }

  async getDetailedPRStats(org: string, repo: string): Promise<DetailedPRStats> {
    return this.request<DetailedPRStats>('detailed-pr-stats', { org, repo });
  }

  async getRecentActivity(org: string, repo: string): Promise<RecentActivity> {
    return this.request<RecentActivity>('recent-activity', { org, repo });
  }
}

export const apiClient = new ApiClient();

export const checkApiConnection = () => apiClient.checkHealth();
export const fetchRepoMetrics = (org: string, repo: string) => apiClient.getRepoMetrics(org, repo);
export const fetchMonthlyStats = (org: string, repo: string) => apiClient.getMonthlyStats(org, repo);
export const fetchRepoStats = (org: string, repo: string) => apiClient.getRepoStats(org, repo);
export const fetchContributorStats = (org: string, repo: string) => apiClient.getContributorStats(org, repo);
export const fetchIssueStats = (org: string, repo: string) => apiClient.getIssueStats(org, repo);
export const fetchDetailedPRStats = (org: string, repo: string) => apiClient.getDetailedPRStats(org, repo);
export const fetchRecentActivity = (org: string, repo: string) => apiClient.getRecentActivity(org, repo); 