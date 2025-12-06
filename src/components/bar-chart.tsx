'use client';

import { cn } from '@/lib/utils';
import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import SkeletonLoader from '@/components/skeleton-loader';

interface BarChartProps {
  data: Record<string, string | number>[];
  xKey?: string;
  yKey?: string;
  title?: string;
  height?: number;
  color?: string;
  horizontal?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  loading?: boolean;
  className?: string;
}

export default function BarChart({
  data = [],
  xKey = 'name',
  yKey = 'value',
  title = '',
  height = 300,
  color = '#3B82F6',
  horizontal = false,
  showGrid = true,
  showTooltip = true,
  loading = false,
  className = '',
}: BarChartProps) {
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
        <RechartsBar data={data} layout={horizontal ? 'vertical' : 'horizontal'}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {horizontal ? (
            <>
              <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis type="category" dataKey={xKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            </>
          )}
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
          <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}
