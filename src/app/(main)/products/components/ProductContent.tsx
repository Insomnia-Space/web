'use client';

import { useAppSelector } from '@/store/hooks';
import { ProductGridView } from './ProductGridView';
import { ProductTableView } from './ProductTableView';
import EmptyState from '@/components/empty-state';
import SkeletonLoader from '@/components/skeleton-loader';
import { Search } from 'lucide-react';

export function ProductContent() {
  const { viewMode, loading, filteredItems } = useAppSelector(state => state.product);

  if (loading) {
    return (
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <SkeletonLoader type="table" rows={5} />
        )}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-10 w-10" />}
        title="Tidak ada produk yang cocok"
        message="Coba ubah filter atau kata kunci pencarian"
      />
    );
  }

  return viewMode === 'grid' ? <ProductGridView /> : <ProductTableView />;
}
