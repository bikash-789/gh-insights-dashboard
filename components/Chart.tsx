import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { fetchMonthlyStats, MonthlyStats } from '../services/api';

export interface ChartProps {
  title: string;
  org: string;
  repo: string;
  darkMode?: boolean;
  sharpEdges?: boolean;
}

const Chart: React.FC<ChartProps> = ({ title, org, repo, darkMode = false, sharpEdges = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MonthlyStats[]>([]);

  useEffect(() => {
    const getMonthlyStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const monthlyData = await fetchMonthlyStats(org, repo);
        setData(monthlyData);
      } catch (err) {
        console.error('Error fetching monthly stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load monthly statistics');
      } finally {
        setLoading(false);
      }
    };

    getMonthlyStats();
  }, [org, repo]);
  const fallbackData = [
    { month: 'Jan 2023', open_prs: 12, merged_prs: 45, issues: 23 },
    { month: 'Feb 2023', open_prs: 15, merged_prs: 38, issues: 19 },
    { month: 'Mar 2023', open_prs: 8, merged_prs: 42, issues: 25 },
    { month: 'Apr 2023', open_prs: 10, merged_prs: 35, issues: 18 },
    { month: 'May 2023', open_prs: 14, merged_prs: 50, issues: 22 },
    { month: 'Jun 2023', open_prs: 16, merged_prs: 55, issues: 27 },
  ];

  const chartData = data.length > 0 ? data : fallbackData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`custom-tooltip p-4 shadow-lg border ${sharpEdges ? '' : 'rounded-md'} ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'}`}>
          <p className={`font-medium mb-2 ${darkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center mb-1">
              <div
                className={`w-3 h-3 mr-2 ${sharpEdges ? '' : 'rounded-full'}`}
                style={{ backgroundColor: entry.color }}
              ></div>
              <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                <span className="font-medium">{entry.name}: </span>
                <span>{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const barColors = darkMode ? {
    open_prs: '#60a5fa',
    merged_prs: '#34d399',
    issues: '#f87171',
  } : {
    open_prs: '#6366f1',
    merged_prs: '#10b981',
    issues: '#ef4444',
  };

  return (
    <div>
      {title && <h2 className={`text-xl font-medium mb-4 ${darkMode ? 'text-zinc-200' : 'text-gray-700'}`}>{title}</h2>}
      
      {loading && (
        <div className="flex justify-center items-center h-80">
          <div className="relative w-16 h-16">
            <svg className="animate-spin" viewBox="0 0 50 50">
              <circle 
                cx="25" 
                cy="25" 
                r="20" 
                fill="none" 
                className={`stroke-current ${darkMode ? 'text-blue-400/20' : 'text-indigo-500/20'}`} 
                strokeWidth="4"
              />
              <circle 
                cx="25" 
                cy="25" 
                r="20" 
                fill="none" 
                className={`stroke-current ${darkMode ? 'text-blue-400' : 'text-indigo-500'}`}
                strokeWidth="4"
                strokeDasharray="60, 100"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
      
      {error && (
        <div className={`p-4 mb-4 ${sharpEdges ? '' : 'rounded'} ${darkMode ? 'bg-red-900/20 border border-red-800/30' : 'bg-red-50 border-l-4 border-red-400'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className={`h-5 w-5 ${darkMode ? 'text-red-400' : 'text-red-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 20,
              }}
              barGap={4}
              barSize={20}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkMode ? "#374151" : "#f0f0f0"} 
                vertical={false} 
              />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: 15 }}
                iconType={sharpEdges ? "square" : "circle"}
                iconSize={8}
                formatter={(value) => <span className={darkMode ? 'text-zinc-300' : 'text-gray-700'}>{value}</span>}
              />
              <Bar 
                dataKey="open_prs" 
                fill={barColors.open_prs}
                name="Open PRs"
                radius={sharpEdges ? [0, 0, 0, 0] : [4, 4, 0, 0]}
              />
              <Bar 
                dataKey="merged_prs" 
                fill={barColors.merged_prs}
                name="Merged PRs"
                radius={sharpEdges ? [0, 0, 0, 0] : [4, 4, 0, 0]}
              />
              <Bar 
                dataKey="issues" 
                fill={barColors.issues}
                name="Issues"
                radius={sharpEdges ? [0, 0, 0, 0] : [4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Chart; 