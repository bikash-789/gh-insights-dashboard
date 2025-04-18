import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Widget from './Widget';
import { format, parseISO } from 'date-fns';
import DynamicApexChart from '../DynamicApexChart';
import { ApexOptions } from 'apexcharts';
import { THEME, COLORS } from '../../constants';

interface IssuesOverviewWidgetProps {
  stats: {
    openIssues: number;
    closedIssues: number;
    averageResolutionTimeInDays: number;
    oldestOpenIssueDate: string | null;
    openIssuesByMonth: {
      month: string;
      count: number;
    }[];
    closedIssuesByMonth: {
      month: string;
      count: number;
    }[];
  };
  loading?: boolean;
  onConfigure?: () => void;
  onRemove?: () => void;
}

const IssuesOverviewWidget: React.FC<IssuesOverviewWidgetProps> = ({ 
  stats, 
  loading = false,
  onConfigure,
  onRemove
}) => {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;

  const safeStats = {
    openIssues: stats?.openIssues ?? 0,
    closedIssues: stats?.closedIssues ?? 0,
    averageResolutionTimeInDays: stats?.averageResolutionTimeInDays ?? 0,
    oldestOpenIssueDate: stats?.oldestOpenIssueDate,
    openIssuesByMonth: stats?.openIssuesByMonth ?? [],
    closedIssuesByMonth: stats?.closedIssuesByMonth ?? [],
  };
  
  const totalIssues = safeStats.openIssues + safeStats.closedIssues;
  const openPercentage = totalIssues > 0 
    ? Math.round((safeStats.openIssues / totalIssues) * 100) 
    : 0;
  
  const formattedOldestIssueDate = safeStats.oldestOpenIssueDate 
    ? format(parseISO(safeStats.oldestOpenIssueDate), 'MMM d, yyyy')
    : 'No open issues';

  const openMonths = safeStats.openIssuesByMonth?.map(item => item.month) || [];
  const closedMonths = safeStats.closedIssuesByMonth?.map(item => item.month) || [];
  const chartMonths = Array.from(new Set([...openMonths, ...closedMonths])).sort();

  const series = [
    {
      name: 'Open Issues',
      data: chartMonths.map(month => {
        const found = safeStats.openIssuesByMonth?.find(item => item.month === month);
        return found ? found.count : 0;
      })
    },
    {
      name: 'Closed Issues',
      data: chartMonths.map(month => {
        const found = safeStats.closedIssuesByMonth?.find(item => item.month === month);
        return found ? found.count : 0;
      })
    }
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
      foreColor: isDark ? '#9ca3af' : '#6b7280',
    },
    colors: [isDark ? '#facc15' : '#d97706', isDark ? '#60a5fa' : '#2563eb'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: chartMonths,
      labels: {
        style: {
          colors: isDark ? '#9ca3af' : '#6b7280',
        }
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#9ca3af' : '#6b7280',
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: function (val: number) {
          return val + " issues";
        }
      }
    },
    grid: {
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    legend: {
      labels: {
        colors: isDark ? '#f3f4f6' : '#111827'
      }
    }
  };

  return (
    <Widget 
      title="Issues Overview" 
      loading={loading}
      onConfigure={onConfigure}
      onRemove={onRemove}
      size="large"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-md ${isDark ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
            <p className={`text-sm font-medium ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Open Issues</p>
            <p className={`text-2xl font-semibold ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
              {safeStats.openIssues}
              <span className={`text-sm ml-2 ${openPercentage > 50 ? 'text-red-400' : 'text-green-400'}`}>
                ({openPercentage}%)
              </span>
            </p>
          </div>
          
          <div className={`p-4 rounded-md ${isDark ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
            <p className={`text-sm font-medium ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Closed Issues</p>
            <p className={`text-2xl font-semibold ${isDark ? COLORS.BLUE.DARK_TEXT : COLORS.BLUE.LIGHT_TEXT}`}>
              {safeStats.closedIssues}
            </p>
          </div>
          
          <div className={`p-4 rounded-md ${isDark ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
            <p className={`text-sm font-medium ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>Avg. Resolution Time</p>
            <p className={`text-2xl font-semibold ${isDark ? COLORS.GREEN.DARK_TEXT : COLORS.GREEN.LIGHT_TEXT}`}>
              {safeStats.averageResolutionTimeInDays.toFixed(1)} days
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-md ${isDark ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <p className={`text-sm font-medium ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>
            Oldest Open Issue
          </p>
          <p className={`text-xl font-medium ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
            {formattedOldestIssueDate}
          </p>
        </div>
        
        <div className={`p-4 rounded-md ${isDark ? 'bg-zinc-800/50' : 'bg-gray-100/80'}`}>
          <p className={`text-sm font-medium mb-4 ${isDark ? COLORS.DARK.TEXT_SECONDARY : COLORS.LIGHT.TEXT_SECONDARY}`}>
            Issues Over Time
          </p>
          <div className="h-64">
            <DynamicApexChart
              options={chartOptions}
              series={series}
              type="bar"
              height="100%"
            />
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default IssuesOverviewWidget; 