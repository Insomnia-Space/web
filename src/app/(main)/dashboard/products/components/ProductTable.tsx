'use client';

import { Table } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import ProgressBar from '@/components/progress-bar';
import type { ProductPerformance } from '@/store/slices/productSlice';

// Extend ProductPerformance to satisfy Table's constraint
type TableProductPerformance = ProductPerformance & Record<string, unknown>;

interface ProductTableProps {
  products: ProductPerformance[];
  sortField: 'timesRecommended' | 'avgConfidenceScore' | 'acceptanceRate' | null;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (field: 'timesRecommended' | 'avgConfidenceScore' | 'acceptanceRate') => void;
  loading?: boolean;
}

export function ProductTable({ products, loading = false }: ProductTableProps) {
  const getAcceptanceBadgeVariant = (rate: number) => {
    if (rate >= 90) return 'default';
    if (rate >= 85) return 'secondary';
    return 'outline';
  };

  const columns = [
    {
      key: 'productName',
      label: 'Product Name',
      render: (value: unknown, row: TableProductPerformance, index: number) => (
        <div className="flex items-center">
          <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            {index + 1}
          </div>
          <div className="text-sm font-medium text-gray-900">{value as string}</div>
        </div>
      ),
    },
    {
      key: 'timesRecommended',
      label: 'Times Recommended',
      sortable: true,
      render: (value: unknown) => (
        <div className="text-sm font-medium text-gray-900">
          {(value as number).toLocaleString()}
        </div>
      ),
    },
    {
      key: 'avgConfidenceScore',
      label: 'Avg Confidence Score',
      sortable: true,
      render: (value: unknown) => {
        const score = value as number;
        return (
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-900">{(score * 100).toFixed(1)}%</div>
            <div className="max-w-[100px] flex-1">
              <ProgressBar value={score * 100} color="blue" size="sm" />
            </div>
          </div>
        );
      },
    },
    {
      key: 'acceptanceRate',
      label: 'Acceptance Rate',
      sortable: true,
      render: (value: unknown) => {
        const rate = value as number;
        const variant = getAcceptanceBadgeVariant(rate);
        return <Badge variant={variant as unknown}>{rate.toFixed(1)}%</Badge>;
      },
    },
  ];

  return (
    <Table<TableProductPerformance>
      columns={columns}
      data={products as TableProductPerformance[]}
      loading={loading}
      emptyMessage="No products found. Try adjusting your search or filters."
      hoverable
      className="rounded-lg"
    />
  );
}
