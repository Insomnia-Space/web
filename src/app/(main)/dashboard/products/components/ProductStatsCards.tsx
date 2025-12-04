'use client';

import { KPICard } from '@/components/kpi-card';
import { CheckCircle, Package, Target, TrendingUp } from 'lucide-react';

interface ProductStatsCardsProps {
  stats: {
    totalProducts: number;
    totalRecommendations: number;
    avgConfidence: number;
    avgAcceptance: number;
  };
}

export function ProductStatsCards({ stats }: ProductStatsCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Products"
        value={stats.totalProducts.toString()}
        icon={Package}
        color="blue"
      />

      <KPICard
        title="Total Recommendations"
        value={stats.totalRecommendations.toLocaleString()}
        icon={TrendingUp}
        color="green"
      />

      <KPICard
        title="Avg Confidence"
        value={`${stats.avgConfidence.toFixed(1)}%`}
        icon={Target}
        color="purple"
      />

      <KPICard
        title="Avg Acceptance"
        value={`${stats.avgAcceptance.toFixed(1)}%`}
        icon={CheckCircle}
        color="yellow"
      />
    </div>
  );
}
