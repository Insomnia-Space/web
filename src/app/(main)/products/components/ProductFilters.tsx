'use client';

import SearchBar from '@/components/search-bar';
import Filter from '@/components/filter';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sliders } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters,
  setCategoryFilter,
  setSearchTerm,
  setPriceRange,
  fetchProducts,
} from '@/store/slices/productSlice';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProductFilters() {
  const dispatch = useAppDispatch();
  const { filters, categories } = useAppSelector((state) => state.product);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState<string>('');
  const [localMaxPrice, setLocalMaxPrice] = useState<string>('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render to avoid conflict with page.tsx fetchProducts
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      dispatch(fetchProducts({}));
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.searchTerm, filters.category, filters.minPrice, filters.maxPrice, dispatch]);

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...(categories && categories.length > 0
      ? categories.map((cat) => ({
          value: cat.category,
          label: `${cat.display_name} (${cat.count})`,
        }))
      : [
          { value: 'data', label: 'Data' },
          { value: 'voice', label: 'Voice' },
          { value: 'combo', label: 'Combo' },
          { value: 'addon', label: 'Add-on' },
        ]),
  ];

  const handlePriceFilter = () => {
    dispatch(
      setPriceRange({
        min: localMinPrice ? Number(localMinPrice) : undefined,
        max: localMaxPrice ? Number(localMaxPrice) : undefined,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setLocalMinPrice('');
    setLocalMaxPrice('');
  };

  return (
    <div className="space-y-4">
      <div className="w-full">
        <SearchBar
          value={filters.searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
          placeholder="Search products by name or code..."
          className="w-full"
        />
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-64">
            <Filter
              options={categoryOptions}
              value={filters.category}
              onChange={(value) =>
                dispatch(setCategoryFilter(value as typeof filters.category))
              }
              placeholder="Category"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="gap-2"
          >
            <Sliders className="h-4 w-4" />
            {showAdvanced ? 'Hide' : 'Show'} Price Filter
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full gap-2 sm:w-auto sm:flex-shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {showAdvanced && (
        <div className="rounded-lg border bg-white p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="minPrice">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="1000000"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handlePriceFilter} className="w-full">
                Apply Price Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}