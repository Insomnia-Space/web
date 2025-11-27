'use client';

import SearchBar  from '@/components/search-bar';
import Filter from '@/components/filter';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchTerm, setRoleFilter, setStatusFilter, resetFilters } from '@/store/slices/userSlice';

export function UserFilters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.user);

  const roleOptions = [
    { value: 'All', label: 'All Roles' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 gap-4">
        <SearchBar
          value={filters.searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
          placeholder="Search by name, email, or ID..."
          className="max-w-md"
        />
        <Filter
          options={roleOptions}
          value={filters.role}
          onChange={(value) => dispatch(setRoleFilter(value as any))}
          placeholder="Filter by role"
        />
        <Filter
          options={statusOptions}
          value={filters.status}
          onChange={(value) => dispatch(setStatusFilter(value as any))}
          placeholder="Filter by status"
        />
      </div>
      <Button
        variant="outline"
        onClick={() => dispatch(resetFilters())}
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}