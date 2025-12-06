'use client';

import { CheckCircle, Shield, Users, XCircle } from 'lucide-react';
import { KPICard } from '@/components/kpi-card';
import { useAppSelector } from '@/store/hooks';

export function UserStatsCards() {
  const { stats } = useAppSelector((state) => state.user);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Users"
        value={stats.total}
        icon={Users}
        color="blue"
        subtitle="All registered"
      />
      <KPICard
        title="Active Users"
        value={stats.active}
        icon={CheckCircle}
        color="green"
        subtitle="Currently active"
      />
      <KPICard
        title="Inactive Users"
        value={stats.inactive}
        icon={XCircle}
        color="red"
        subtitle="Deactivated"
      />
      <KPICard
        title="Administrators"
        value={stats.admin}
        icon={Shield}
        color="purple"
        subtitle="Admin roles"
      />
    </div>
  );
}