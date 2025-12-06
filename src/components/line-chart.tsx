// components/charts/LineChart.tsx

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

// --- Kelas Glassmorphism & Utilitas ---

// Kelas Glassmorphism untuk container Card
const glassChartContainerClass = cn(
  "rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300", 
  "border border-white/30 bg-white/10 dark:border-gray-800/50 dark:bg-gray-900/10" // Glassmorphism Core
);

// Kelas untuk Judul dan Teks
const titleTextClass = "text-gray-900 dark:text-white";
const axisStrokeColor = "#6b7280"; // Gray-500
const darkAxisStrokeColor = "#9ca3af"; // Gray-400

// Custom Tooltip Component (Untuk menerapkan Glassmorphism pada tooltip)
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        // Mendapatkan warna dari Line yang sedang aktif
        const lineColor = payload[0].stroke || 'rgb(59, 130, 246)'; 

        return (
            <div className={cn(
                "p-3 rounded-lg shadow-lg backdrop-blur-sm border",
                "bg-white/70 border-gray-300/50 dark:bg-gray-900/70 dark:border-gray-700/50" // Glassmorphism Tooltip
            )}>
                <p className={cn("text-sm font-semibold mb-1", titleTextClass)}>
                    {label}: 
                </p>
                {payload.map((item: any, index: number) => (
                    <p key={`item-${index}`} className="text-sm" style={{ color: item.stroke }}>
                        {item.name}: <span className={cn("font-bold", titleTextClass)}>{item.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// ---------------------------------------------

export default function LineChart({
  data = [],
  xKey = 'name',
  yKey = 'value',
  title = '',
  height = 300,
  color = '#3B82F6', // Blue-500 default
  showGrid = true,
  showTooltip = true,
  loading = false,
  className = '',
}: LineChartProps) {
  if (loading) {
    return (
      // Gunakan kelas Glassmorphism untuk Skeleton Container
      <div className={cn('p-6', glassChartContainerClass, className)}>
        <SkeletonLoader type="card" />
      </div>
    );
  }

  return (
    // CHART CONTAINER: GLASSMORPHISM
    <div className={cn('p-6', glassChartContainerClass, className)}>
      {title && <h3 className={cn("mb-4 text-lg font-semibold", titleTextClass)}>{title}</h3>}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsLine data={data} 
            style={{ 
                color: 'var(--color-primary-text, #1f2937)', 
                fontFamily: 'sans-serif' 
            }}
        >
          {/* GRID: Menggunakan warna yang lebih halus dan konsisten */}
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700/50" />}
          
          {/* XAXIS: Dark Mode */}
          <XAxis 
            dataKey={xKey} 
            stroke={axisStrokeColor} 
            style={{ fontSize: '12px' }} 
            className="dark:stroke-gray-400" 
          />
          
          {/* YAXIS: Dark Mode */}
          <YAxis 
            stroke={axisStrokeColor} 
            style={{ fontSize: '12px' }} 
            className="dark:stroke-gray-400" 
          />
          
          {/* TOOLTIP: Menggunakan CustomTooltip Glassmorphism */}
          {showTooltip && (
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ outline: 'none' }}
            />
          )}
          
          {/* LEGEND: Dark Mode */}
          <Legend wrapperStyle={{ color: darkAxisStrokeColor, paddingTop: '10px' }} />
          
          {/* LINE: Tetap menggunakan warna yang ditentukan */}
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={2}
            // Dot: Tambahkan opacity untuk nuansa Glassy pada dot
            dot={{ fill: color, r: 4, fillOpacity: 0.8 }} 
            activeDot={{ r: 6 }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}