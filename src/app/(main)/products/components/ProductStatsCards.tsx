'use client';

import { Database, Layers, Package, Phone } from 'lucide-react';
import { KPICard } from '@/components/kpi-card';
import { useAppSelector } from '@/store/hooks';

export function ProductStatsCards() {
  const { stats } = useAppSelector(state => state.product);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Products"
        value={stats.total}
        icon={Package}
        color="blue"
        subtitle="All packages"
      />
      <KPICard
        title="Data Packages"
        value={stats.data}
        icon={Database}
        color="green"
        subtitle="Internet plans"
      />
      <KPICard
        title="Voice Packages"
        value={stats.voice}
        icon={Phone}
        color="yellow"
        subtitle="Call plans"
      />
      <KPICard
        title="Combo Packages"
        value={stats.combo}
        icon={Layers}
        color="purple"
        subtitle="Bundle offers"
      />
    </div>
  );
}
