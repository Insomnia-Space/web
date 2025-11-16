'use client';

import { cn } from '@/lib/utils';
import { Cell, Legend, Pie, PieChart as RechartsPie, ResponsiveContainer, Tooltip } from 'recharts';
import SkeletonLoader from '@/components/skeleton-loader';

interface PieChartProps {
  data: Record<string, string | number>[];
  nameKey?: string;
  valueKey?: string;
  title?: string;
  height?: number;
  colors?: string[];
  showTooltip?: boolean;
  loading?: boolean;
  className?: string;
}

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function PieChart({
  data = [],
  nameKey = 'name',
  valueKey = 'value',
  title = '',
  height = 300,
  colors = DEFAULT_COLORS,
  showTooltip = true,
  loading = false,
  className = '',
}: PieChartProps) {
  if (loading) {
    return (
      <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
        <SkeletonLoader type="card" />
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
      {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsPie>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
          )}
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}
