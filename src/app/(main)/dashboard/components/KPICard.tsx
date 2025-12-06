'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

// Map warna untuk background solid dan border
const colorMap = {
  blue: { border: 'border-blue-400', bgIcon: 'bg-blue-100 dark:bg-blue-900/50', textIcon: 'text-blue-600 dark:text-blue-400' },
  green: { border: 'border-green-400', bgIcon: 'bg-green-100 dark:bg-green-900/50', textIcon: 'text-green-600 dark:text-green-400' },
  purple: { border: 'border-purple-400', bgIcon: 'bg-purple-100 dark:bg-purple-900/50', textIcon: 'text-purple-600 dark:text-purple-400' },
  yellow: { border: 'border-amber-400', bgIcon: 'bg-amber-100 dark:bg-amber-900/50', textIcon: 'text-amber-600 dark:text-amber-400' },
  red: { border: 'border-red-400', bgIcon: 'bg-red-100 dark:bg-red-900/50', textIcon: 'text-red-600 dark:text-red-400' },
};

export function KPICard({ title, value, icon: Icon, color = 'blue', trend }: KPICardProps) {
  const colors = colorMap[color];
  const isPositive = trend?.isPositive;
  
  return (
    // SOLID STYLING PADA CARD UTAMA:
    // 1. bg-white / dark:bg-gray-800
    // 2. border dengan warna primary
    <Card 
      className={cn(
        'group relative overflow-hidden rounded-xl border-2 p-0 shadow-lg transition-all hover:shadow-xl',
        'bg-white dark:bg-gray-800',
        colors.border
      )}
    >
      
      {/* GLOW EFFECT DIHAPUS */}
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Teks hitam/putih standar untuk background solid */}
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
            {trend && (
              <div className="mt-3 flex items-center gap-1.5">
                {/* SOLID TREND BADGE */}
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    isPositive 
                      ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                      : 'bg-red-500 text-white shadow-md shadow-red-500/30'
                  )}
                >
                  {isPositive ? '↑' : '↓'} {trend.value}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last period</span>
              </div>
            )}
          </div>
          {/* SOLID ICON CONTAINER: Menggunakan background primary light/dark */}
          <div className={cn(
            'rounded-xl p-3 shadow-md transition-transform group-hover:scale-110',
            colors.bgIcon // bg-blue-100 / dark:bg-blue-900/50
          )}>
            <Icon className={cn('h-6 w-6', colors.textIcon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}