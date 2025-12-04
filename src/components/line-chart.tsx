'use client';

import { cn } from '@/lib/utils';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import SkeletonLoader from '@/components/skeleton-loader';

interface LineChartProps {
  data: Record<string, string | number>[];
  xKey?: string;
  yKey?: string;
  title?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  loading?: boolean;
  className?: string;
}

export default function LineChart({
  data = [],
  xKey = 'name',
  yKey = 'value',
  title = '',
  height = 300,
  color = '#3B82F6',
  showGrid = true,
  showTooltip = true,
  loading = false,
  className = '',
}: LineChartProps) {
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
        <RechartsLine data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
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
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}
