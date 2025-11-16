import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value?: number;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value = 0,
  color = 'blue',
  size = 'md',
  showLabel = false,
  animated = false,
  className = '',
}: ProgressBarProps) {
  // Clamp value between 0-100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={className}>
      <div className={cn('w-full overflow-hidden rounded-full bg-gray-200', sizes[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            colors[color],
            animated && 'animate-pulse'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-right text-xs text-gray-500">{clampedValue.toFixed(1)}%</p>
      )}
    </div>
  );
}
