import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Widget from './Widget';
import Chart from '../Chart';

interface ChartWidgetProps {
  org: string;
  repo: string;
  loading?: boolean;
  onConfigure?: () => void;
  onRemove?: () => void;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ 
  org, 
  repo,
  loading = false,
  onConfigure,
  onRemove
}) => {
  const { theme } = useTheme();
  
  return (
    <Widget 
      title="Repository Activity" 
      loading={loading}
      onConfigure={onConfigure}
      onRemove={onRemove}
      size="large"
    >
      <Chart 
        title="" 
        org={org} 
        repo={repo} 
        darkMode={theme === 'dark'} 
        sharpEdges={true} 
      />
    </Widget>
  );
};

export default ChartWidget; 