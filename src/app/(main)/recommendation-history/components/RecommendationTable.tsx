'use client';

import { Column, Table } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import type { Recommendation } from '@/types/recommendation.types';
import { cn } from '@/lib/utils';
import { Eye, Repeat } from 'lucide-react';
import { format } from 'date-fns'; // ✅ Add this import

interface RecommendationTableProps {
  data: Recommendation[];
  loading?: boolean;
}

const statusColors = {
  sent: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-blue-100 text-blue-700',
};

export function RecommendationTable({ data, loading }: RecommendationTableProps) {
  const router = useRouter();

  const columns: Column<Recommendation>[] = [
    {
      key: 'customer_name',
      label: 'Customer',
      render: (item: Recommendation) => (
        <div className="space-y-0.5">
          <p className="font-bold text-gray-800">{item.customer_name}</p>
          <p className="font-mono text-xs text-gray-400">{item.customer_id}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (item: Recommendation) => (
        <div className="flex items-center gap-2">
          <Badge className={cn('text-xs font-semibold capitalize', statusColors[item.status])}>
            {item.status}
          </Badge>
          {item.is_overridden === 1 && (
            <>
              <Repeat className="h-3 w-3 text-orange-600" />
              <span className="sr-only">Overridden</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'model_version',
      label: 'Model',
      width: '120px',
      render: (item: Recommendation) => (
        <div className="space-y-0.5">
          <p className="font-mono text-xs font-semibold text-gray-900">{item.model_version}</p>
          <p className="text-xs text-gray-500">{item.algorithm}</p>
        </div>
      ),
    },
    {
      key: 'processing_time_ms',
      label: 'Processing Time',
      width: '140px',
      render: (item: Recommendation) => (
        <span className="text-sm font-medium text-gray-900">
          {item.processing_time_ms}ms
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      width: '180px',
      render: (item: Recommendation) => (
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-gray-900">
            {format(new Date(item.created_at), 'MMM dd, yyyy')}
          </p>
          <p className="text-xs text-gray-500">
            {format(new Date(item.created_at), 'hh:mm a')}
          </p>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      width: '100px',
      align: 'right' as const,
      render: (item: Recommendation) => (
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/recommendation-history/${item.id}`);
          }}
        >
          <Eye className="h-3 w-3" />
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in overflow-x-auto rounded-xl border border-gray-200 duration-300">
      <Table<Recommendation>
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage="No recommendations found"
        onRowClick={(item) => router.push(`/recommendation-history/${item.id}`)}
        hoverable
        striped
      />
    </div>
  );
}