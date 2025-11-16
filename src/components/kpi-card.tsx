import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface KPICardProps {
  title?: string;
  value?: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  loading?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  subtitle?: string;
  className?: string;
}

export default function KPICard({
  title = '',
  value = '',
  icon = null,
  trend = undefined,
  loading = false,
  color = 'blue',
  subtitle = '',
  className = '',
}: KPICardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  if (loading) {
    return (
      <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
        <div className="animate-pulse">
          <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="h-8 w-3/4 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>

          {/* Subtitle or Trend */}
          {(subtitle || trend) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center text-sm font-medium',
                    trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.direction === 'up' ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  )}
                  {trend.value}%
                </span>
              )}
              {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className={cn('rounded-lg p-3', colorClasses[color])}>
            <div className="h-6 w-6">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}
