import { KPICard } from '@/components/kpi-card';
import { UserCheck, UserX, Users } from 'lucide-react';

interface CustomerStatsCardsProps {
  stats: {
    total: number;
    active: number;
    churned: number;
  };
}

export function CustomerStatsCards({ stats }: CustomerStatsCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <KPICard title="Total Customers" value={stats.total} icon={Users} color="blue" />
      <KPICard title="Active Customers" value={stats.active} icon={UserCheck} color="green" />
      <KPICard title="Churned Customers" value={stats.churned} icon={UserX} color="red" />
    </div>
  );
}
