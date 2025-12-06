// app/(main)/recommendation-history/components/RecommendationFilters.tsx

'use client';

import SearchBar from '@/components/search-bar';
import Filter from '@/components/filter';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearchTerm,
  setStatusFilter,
  setDateRangeFilter,
  setOverriddenFilter,
  resetFilters,
} from '@/store/slices/recommendationSlice';

export function RecommendationFilters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.recommendation);

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'sent', label: 'Sent' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
  ];

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
  ];

  const overrideOptions = [
    { value: 'all', label: 'All' },
    { value: 'true', label: 'Overridden' },
    { value: 'false', label: 'Not Overridden' },
  ];

  return (
    <div className="space-y-4">
      <div className="w-full">
        <SearchBar
          value={filters.searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
          placeholder="Search by customer name, ID, or recommendation ID..."
          className="w-full"
        />
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-48">
            <Filter
              options={statusOptions}
              value={filters.status}
              onChange={(value) =>
                dispatch(setStatusFilter(value as typeof filters.status))
              }
              placeholder="Status"
            />
          </div>

          <div className="w-full sm:w-48">
            <Filter
              options={dateRangeOptions}
              value={filters.dateRange.toString()}
              onChange={(value) => dispatch(setDateRangeFilter(Number(value) as 7 | 30 | 90))}
              placeholder="Date Range"
            />
          </div>

          <div className="w-full sm:w-48">
            <Filter
              options={overrideOptions}
              value={
                filters.isOverridden === undefined
                  ? 'all'
                  : filters.isOverridden.toString()
              }
              onChange={(value) =>
                dispatch(
                  setOverriddenFilter(
                    value === 'all' ? undefined : value === 'true'
                  )
                )
              }
              placeholder="Override Status"
            />
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => dispatch(resetFilters())}
          className="w-full gap-2 sm:w-auto sm:flex-shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}