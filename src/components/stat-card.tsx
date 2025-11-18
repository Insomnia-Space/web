import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({ label, value, icon, description, className }: StatCardProps) {
  return (
    <div className={cn('rounded-lg bg-gray-50 p-4', className)}>
      <div className="flex items-center gap-3">
        {icon && <div className="rounded-lg bg-white p-2">{icon}</div>}
        <div className="flex-1">
          <p className="text-xs text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
  );
}
