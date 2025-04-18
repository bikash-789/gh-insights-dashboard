import React from 'react';
import Card from './Card';
import { RepoMetrics } from '../services/api';

interface MetricsCardsProps {
  metrics: RepoMetrics;
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        title="Average Merge Time" 
        value={metrics?.avg_merge_time ? metrics.avg_merge_time.split('.')[0] : '0'} 
        icon="clock"
        color="blue"
        glass={true}
        glassStrength="medium"
        sharpEdges={true}
      />
      <Card 
        title="Open Pull Requests" 
        value={metrics?.open_prs !== undefined ? metrics.open_prs.toString() : '0'} 
        icon="git-pull-request"
        color="purple"
        glass={true}
        glassStrength="medium"
        sharpEdges={true}
      />
      <Card 
        title="Merged Last Week" 
        value={metrics?.merged_last_week !== undefined ? metrics.merged_last_week.toString() : '0'} 
        icon="check-circle"
        color="green"
        glass={true}
        glassStrength="medium"
        sharpEdges={true}
      />
    </div>
  );
} 