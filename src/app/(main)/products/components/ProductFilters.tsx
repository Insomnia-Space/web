'use client';

import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategoryFilter, setSearchTerm } from '@/store/slices/productCatalogSlice';
import { cn } from '@/lib/utils';

const categories = ['Data', 'Voice', 'Combo'] as const;

export function ProductFilters() {
  const dispatch = useAppDispatch();
  const { filters, items } = useAppSelector(state => state.product);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={filters.searchTerm}
          onChange={value => dispatch(setSearchTerm(value))}
          placeholder="Cari nama produk, ID, atau deskripsi..."
          className="max-w-md flex-1"
        />
        <Button
          variant="outline"
          onClick={() => dispatch(resetFilters())}
          className="gap-2 transition-all hover:bg-gray-100"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => dispatch(setCategoryFilter('All'))}
          className={cn(
            'relative rounded-lg px-4 py-2 text-sm font-medium transition-all',
            'hover:scale-105 active:scale-95',
            filters.category === 'All'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-200'
              : 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
          )}
        >
          All Products
          {filters.category === 'All' && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex h-5 w-5 rounded-full bg-purple-500"></span>
            </span>
          )}
        </button>

        {categories.map(cat => {
          const count = items.filter(p => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => dispatch(setCategoryFilter(cat))}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-medium transition-all',
                'hover:scale-105 active:scale-95',
                filters.category === cat
                  ? cat === 'Data'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200'
                    : cat === 'Voice'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200'
                  : 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
              )}
            >
              <span>{cat}</span>
              <span
                className={cn(
                  'ml-1.5 rounded-full px-1.5 py-0.5 text-xs',
                  filters.category === cat ? 'bg-white/20' : 'bg-gray-100'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
