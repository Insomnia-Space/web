'use client';

import SearchBar from '@/components/search-bar';
import Filter from '@/components/filter';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetFilters, setRoleFilter, setSearchTerm, setStatusFilter } from '@/store/slices/userSlice';

export function UserFilters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.user);

  const roleOptions = [
    { value: 'All', label: 'All Roles' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' },
  ];

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar - Full Width */}
      <div className="w-full">
        <SearchBar
          value={filters.searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
          placeholder="Search by name, email, or ID..."
          className="w-full"
        />
      </div>

      {/* Filters and Reset Button Row */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Filter Group */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-48">
            <Filter
              options={roleOptions}
              value={filters.role}
              onChange={(value) => dispatch(setRoleFilter(value as typeof filters.role))}
              placeholder="Role"
            />
          </div>
          <div className="w-full sm:w-48">
            <Filter
              options={statusOptions}
              value={filters.status}
              onChange={(value) => dispatch(setStatusFilter(value as typeof filters.status))}
              placeholder="Status"
            />
          </div>
        </div>

        {/* Reset Button */}
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