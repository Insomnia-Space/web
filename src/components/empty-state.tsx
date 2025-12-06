import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon = null,
  title = 'No data found',
  message = '',
  action = null,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center px-4 py-12 text-center', className)}
    >
      {icon && (
        <div className="mb-4 text-gray-400">
          <div className="h-16 w-16">{icon}</div>
        </div>
      )}

      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

      {message && <p className="mb-6 max-w-sm text-sm text-gray-500">{message}</p>}

      {action && <div>{action}</div>}
    </div>
  );
}
