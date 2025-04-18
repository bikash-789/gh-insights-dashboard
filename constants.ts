export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};


export const LAYOUT = {
  HEADER_HEIGHT: '64px',
  MAIN_MAX_WIDTH: 'max-w-7xl',
  ANIMATION_DELAY: {
    INITIAL: '0ms',
    SHORT: '2000ms',
    MEDIUM: '4000ms',
    LONG: '6000ms',
  },
};


export const CARD_TYPES = {
  REPO_STATS: 'repoStats',
  CONTRIBUTOR_STATS: 'contributorStats',
  ISSUE_STATS: 'issueStats',
  PR_STATS: 'prStats',
};

export const WIDGET_TYPES = {
  QUICK_STATS: 'quickStats',
  RECENT_ACTIVITY: 'recentActivity',
  CHART: 'chart',
  REPO_OVERVIEW: 'repoOverview',
  ISSUES_OVERVIEW: 'issuesOverview',
  PR_DETAILS: 'prDetails',
};


export const VIEWS = {
  OVERVIEW: 'overview',
  WIDGETS: 'widgets',
  DETAILS: 'details',
};


export const DEFAULTS = {
  ORGANIZATION: 'google',
  REPOSITORY: 'zx',
};


export const COLORS = {
  LIGHT: {
    BG_PRIMARY: 'bg-white',
    BG_SECONDARY: 'bg-gray-50',
    BG_HIGHLIGHT: 'bg-gray-100',
    TEXT_PRIMARY: 'text-gray-700',
    TEXT_SECONDARY: 'text-gray-500',
    TEXT_HIGHLIGHT: 'text-gray-900',
    BORDER: 'border-gray-200',
  },
  DARK: {
    BG_PRIMARY: 'glass-medium',
    BG_SECONDARY: 'bg-zinc-800/20',
    BG_HIGHLIGHT: 'bg-zinc-700',
    TEXT_PRIMARY: 'text-zinc-200',
    TEXT_SECONDARY: 'text-zinc-400',
    TEXT_HIGHLIGHT: 'text-white',
    BORDER: 'border-zinc-800/20',
  },
  BLUE: {
    LIGHT_BG: 'bg-blue-100',
    LIGHT_TEXT: 'text-blue-600',
    DARK_BG: 'bg-blue-500/20',
    DARK_TEXT: 'text-blue-300',
  },
  GREEN: {
    LIGHT_BG: 'bg-green-100',
    LIGHT_TEXT: 'text-green-600',
    DARK_BG: 'bg-green-500/20',
    DARK_TEXT: 'text-green-300',
  },
  RED: {
    LIGHT_BG: 'bg-red-100',
    LIGHT_TEXT: 'text-red-600',
    DARK_BG: 'bg-red-500/20',
    DARK_TEXT: 'text-red-300',
  },
  PURPLE: {
    LIGHT_BG: 'bg-purple-100',
    LIGHT_TEXT: 'text-purple-600',
    DARK_BG: 'bg-purple-500/20',
    DARK_TEXT: 'text-purple-300',
  },
  YELLOW: {
    LIGHT_BG: 'bg-yellow-100',
    LIGHT_TEXT: 'text-yellow-600',
    DARK_BG: 'bg-yellow-500/20',
    DARK_TEXT: 'text-yellow-300',
  },
  ORANGE: {
    LIGHT_BG: 'bg-orange-100',
    LIGHT_TEXT: 'text-orange-600',
    DARK_BG: 'bg-orange-500/20',
    DARK_TEXT: 'text-orange-300',
  },
  INDIGO: {
    LIGHT_BG: 'bg-indigo-100',
    LIGHT_TEXT: 'text-indigo-600',
    DARK_BG: 'bg-indigo-500/20',
    DARK_TEXT: 'text-indigo-300',
  },
};


export const API = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    REPO_STATS: '/api/repo-stats',
    CONTRIBUTOR_STATS: '/api/contributor-stats',
    ISSUE_STATS: '/api/issue-stats',
    PR_STATS: '/api/detailed-pr-stats',
    METRICS: '/api/metrics',
    RECENT_ACTIVITY: '/api/recent-activity',
  },
};


export const ACTIVITY_TYPES = {
  PUSH: 'push',
  PR: 'pr',
  ISSUE: 'issue',
  COMMENT: 'comment',
};


export const PR_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};


export const ERROR_MESSAGES = {
  API_CONNECTION: `Cannot connect to API server. Make sure it is running at ${API.BASE_URL}`,
  UNKNOWN_DATE: 'Unknown date',
};


export const DATE_FORMAT_OPTIONS = {
  SHORT: { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  } as Intl.DateTimeFormatOptions,
};

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
}; 