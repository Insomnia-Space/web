'use client';

import { Button } from '@/components/ui/button';
import { Plus, Grid, List } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setViewMode } from '@/store/slices/productSlice';

interface ProductListHeaderProps {
  onAddNew?: () => void;
}

export function ProductListHeader({ onAddNew }: ProductListHeaderProps) {
  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state) => state.product);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your telecom products and packages
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => dispatch(setViewMode('grid'))}
            className="gap-2"
          >
            <Grid className="h-4 w-4" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => dispatch(setViewMode('table'))}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Table
          </Button>
        </div>

        {onAddNew && (
          <Button onClick={onAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        )}
      </div>
    </div>
  );
}