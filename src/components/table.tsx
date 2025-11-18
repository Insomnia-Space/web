import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { LoadingSpinner } from './loading-spinner';

interface Column<T> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  hoverable?: boolean;
  striped?: boolean;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  hoverable = false,
  striped = false,
  className,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="ml-4 text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className={cn(
                  'px-6 py-3 text-xs font-medium tracking-wider text-gray-700 uppercase',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  !column.align && 'text-left'
                )}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn('divide-y divide-gray-200 bg-white', striped && 'divide-y-0')}>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'transition-colors',
                striped && rowIndex % 2 === 1 && 'bg-gray-50',
                hoverable && 'hover:bg-gray-100',
                onRowClick && 'cursor-pointer'
              )}
            >
              {columns.map(column => (
                <td
                  key={column.key}
                  className={cn(
                    'px-6 py-4 text-sm whitespace-nowrap text-gray-900',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {column.render
                    ? column.render(row[column.key as keyof T] as unknown, row, rowIndex)
                    : (row[column.key as keyof T] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
