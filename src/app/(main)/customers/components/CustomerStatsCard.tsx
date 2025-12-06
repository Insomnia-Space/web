'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Clock, TrendingUp, UserCheck, Users, UserX } from 'lucide-react';
import type { CustomerStatistics } from '@/types/customer-types';

interface CustomerStatsCardsProps {
  statistics: CustomerStatistics | null;
  loading?: boolean;
}

const colorVariants = {
  blue: {
    gradient: 'from-blue-50 to-blue-100/50',
    icon: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30',
    iconColor: 'text-white',
  },
  green: {
    gradient: 'from-green-50 to-green-100/50',
    icon: 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30',
    iconColor: 'text-white',
  },
  red: {
    gradient: 'from-red-50 to-red-100/50',
    icon: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30',
    iconColor: 'text-white',
  },
  purple: {
    gradient: 'from-purple-50 to-purple-100/50',
    icon: 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30',
    iconColor: 'text-white',
  },
  orange: {
    gradient: 'from-amber-50 to-orange-100/50',
    icon: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30',
    iconColor: 'text-white',
  },
};

export function CustomerStatsCards({ statistics, loading }: CustomerStatsCardsProps) {
  if (loading || !statistics) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse border-0">
            <CardContent className="p-6">
              <div className="h-24 rounded-xl bg-gray-200"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Customers',
      value: statistics.total_customers.toLocaleString(),
      icon: Users,
      color: 'blue' as const,
    },
    {
      title: 'Active',
      value: statistics.active_customers.toLocaleString(),
      subtitle: `${statistics.active_ratio}% active rate`,
      icon: UserCheck,
      color: 'green' as const,
    },
    {
      title: 'Churned',
      value: statistics.churned_customers.toLocaleString(),
      subtitle: `${(100 - statistics.active_ratio).toFixed(1)}% churn rate`,
      icon: UserX,
      color: 'red' as const,
    },
    {
      title: 'Average CLV',
      value: `Rp ${(statistics.average_clv / 1000000).toFixed(1)}M`,
      subtitle: 'Customer lifetime value',
      icon: TrendingUp,
      color: 'purple' as const,
    },
    {
      title: 'Avg Tenure',
      value: `${statistics.average_tenure_months} mo`,
      subtitle: 'Average duration',
      icon: Clock,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const colors = colorVariants[card.color];
        
        return (
          <Card
            key={card.title}
            className="group relative overflow-hidden border-0 shadow-none transition-all hover:shadow-lg"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-40 ${colors.gradient}`} />
            
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {card.title}
                  </p>
                  <h3 className="mt-3 text-3xl font-bold text-gray-900">{card.value}</h3>
                  {card.subtitle && (
                    <p className="mt-2 text-xs font-medium text-gray-500">{card.subtitle}</p>
                  )}
                </div>
                <div
                  className={`rounded-2xl p-3 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 ${colors.icon}`}
                >
                  <Icon className={`h-5 w-5 ${colors.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}