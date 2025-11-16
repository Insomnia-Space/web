import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  type?: 'text' | 'title' | 'card' | 'table' | 'circle';
  rows?: number;
  className?: string;
}

export default function SkeletonLoader({
  type = 'text',
  rows = 3,
  className = '',
}: SkeletonLoaderProps) {
  const baseClass = 'animate-pulse bg-gray-200 rounded';

  if (type === 'text') {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClass, 'h-4')}
            style={{ width: i === rows - 1 ? '70%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'title') {
    return <div className={cn(baseClass, 'h-8 w-1/2', className)} />;
  }

  if (type === 'card') {
    return (
      <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
        <div className={cn(baseClass, 'mb-4 h-4 w-1/2')} />
        <div className={cn(baseClass, 'h-8 w-3/4')} />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={cn('space-y-3', className)}>
        {/* Header */}
        <div className={cn(baseClass, 'h-10 w-full')} />
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={cn(baseClass, 'h-12 w-full')} />
        ))}
      </div>
    );
  }

  if (type === 'circle') {
    return <div className={cn(baseClass, 'h-12 w-12 rounded-full', className)} />;
  }

  return null;
}
