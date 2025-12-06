'use client';

import { useAppSelector } from '@/store/hooks';
import { selectPaginatedItems } from '@/store/slices/productSlice';
import { ProductGridView } from './ProductGridView';
import { ProductTableView } from './ProductTableView';
import { LoadingSpinner } from '@/components/loading-spinner';

export function ProductContent() {
  const { viewMode, loading } = useAppSelector(state => state.product);
  const items = useAppSelector(selectPaginatedItems);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">No Products Found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your filters or create a new product
          </p>
        </div>
      </div>
    );
  }

  return viewMode === 'grid' ? <ProductGridView /> : <ProductTableView />;
}