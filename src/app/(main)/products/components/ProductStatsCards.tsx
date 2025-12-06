'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Package, Wifi, Phone, Zap, PlusCircle } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

export function ProductStatsCards() {
  const { stats } = useAppSelector(state => state.product);

  const statsData = [
    {
      title: 'Total Products',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Data Packages',
      value: stats.data,
      icon: Wifi,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'Voice Packages',
      value: stats.voice,
      icon: Phone,
      color: 'bg-amber-100 text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
    },
    {
      title: 'Combo Deals',
      value: stats.combo,
      icon: Zap,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Add-ons',
      value: stats.addon,
      icon: PlusCircle,
      color: 'bg-pink-100 text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {statsData.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className={`rounded-xl p-3 transition-all group-hover:scale-110 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}