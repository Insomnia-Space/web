'use client';

import SearchBar from '@/components/search-bar';
import Filter from '@/components/filter';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters,
  setCLVSegmentFilter,
  setGenderFilter,
  setSearchTerm,
  setSorting,
  setStatusFilter,
} from '@/store/slices/customerSlice';

export function CustomerFilters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.customers);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'churned', label: 'Churned' },
  ];

  const clvSegmentOptions = [
    { value: 'all', label: 'All Segments' },
    { value: 'high_value', label: 'High Value' },
    { value: 'medium_value', label: 'Medium Value' },
    { value: 'low_value', label: 'Low Value' },
  ];

  const genderOptions = [
    { value: 'all', label: 'All Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'avg_data_usage', label: 'Data Usage' },
    { value: 'avg_call_duration', label: 'Call Duration' },
    { value: 'join_date', label: 'Join Date' },
  ];

  const sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  return (
    <div className="space-y-4 rounded-2xl border-0 bg-white p-6 shadow-md">
      {/* Search Bar */}
      <div className="w-full">
        <SearchBar
          value={filters.searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
          placeholder="🔍 Search by name, code, location, or occupation..."
          className="w-full"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          {/* Status Filter */}
          <div className="w-full sm:w-auto sm:min-w-[140px]">
            <Filter
              options={statusOptions}
              value={filters.status}
              onChange={(value) =>
                dispatch(setStatusFilter(value as typeof filters.status))
              }
              placeholder="Status"
            />
          </div>

          {/* CLV Segment Filter */}
          <div className="w-full sm:w-auto sm:min-w-[160px]">
            <Filter
              options={clvSegmentOptions}
              value={filters.clv_segment}
              onChange={(value) =>
                dispatch(setCLVSegmentFilter(value as typeof filters.clv_segment))
              }
              placeholder="CLV Segment"
            />
          </div>

          {/* Gender Filter */}
          <div className="w-full sm:w-auto sm:min-w-[140px]">
            <Filter
              options={genderOptions}
              value={filters.gender}
              onChange={(value) =>
                dispatch(setGenderFilter(value as typeof filters.gender))
              }
              placeholder="Gender"
            />
          </div>

          {/* Sort By Filter */}
          <div className="w-full sm:w-auto sm:min-w-[150px]">
            <Filter
              options={sortOptions}
              value={filters.sortBy}
              onChange={(value) =>
                dispatch(setSorting({ sortBy: value as typeof filters.sortBy, sortOrder: filters.sortOrder }))
              }
              placeholder="Sort By"
            />
          </div>

          {/* Sort Order Filter */}
          <div className="w-full sm:w-auto sm:min-w-[140px]">
            <Filter
              options={sortOrderOptions}
              value={filters.sortOrder}
              onChange={(value) =>
                dispatch(setSorting({ sortBy: filters.sortBy, sortOrder: value as typeof filters.sortOrder }))
              }
              placeholder="Order"
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={() => dispatch(resetFilters())}
          className="w-full gap-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow sm:w-auto sm:flex-shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}