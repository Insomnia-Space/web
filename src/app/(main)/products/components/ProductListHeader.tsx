'use client';

import { LayoutGrid, LayoutList, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setViewMode } from '@/store/slices/productCatalogSlice';

export function ProductListHeader() {
  const dispatch = useAppDispatch();
  const { viewMode, filteredItems } = useAppSelector(state => state.product);

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
      <div className="rounded-[10px] bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">Product Catalog</h1>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Jelajahi {filteredItems.length} produk telco terbaik kami
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => dispatch(setViewMode('grid'))}
              className="gap-1.5 transition-all"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              onClick={() => dispatch(setViewMode('table'))}
              className="gap-1.5 transition-all"
            >
              <LayoutList className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
