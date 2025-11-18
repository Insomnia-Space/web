import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  subtitle?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  className?: string;
}

export function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  color = 'blue',
  className,
}: KPICardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>

          {(subtitle || trend) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center text-sm font-medium',
                    trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
                </span>
              )}
              {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>
          )}
        </div>

        {Icon && (
          <div className={cn('rounded-full p-3', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
