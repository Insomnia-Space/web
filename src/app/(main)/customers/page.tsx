'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/Layouts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCustomers,
  fetchCustomerStatistics,
} from '@/store/slices/customerSlice';
import { LoadingSpinner } from '@/components/loading-spinner';
import { CustomerListHeader } from './components/CustomerListHeader';
import { CustomerStatsCards } from './components/CustomerStatsCard';
import { CustomerFilters } from './components/CustomerFilters';
import { CustomerTable } from './components/CustomerTable';
import { CustomerPagination } from './components/CustomerPagination';

export default function CustomersPage() {
  const dispatch = useAppDispatch();
  const { items, statistics, loading, error, pagination, filters } = useAppSelector(
    (state) => state.customers
  );

  // ✅ Fixed: Added filters to dependency array
  useEffect(() => {
    dispatch(fetchCustomerStatistics());
    dispatch(fetchCustomers({ page: 1, limit: 20, filters }));
  }, [dispatch, filters]);

  // ✅ Fixed: Added pagination dependencies
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchCustomers({ 
        page: pagination.current_page, 
        limit: pagination.per_page, 
        filters 
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, pagination.current_page, pagination.per_page, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchCustomerStatistics());
    dispatch(fetchCustomers({ 
      page: pagination.current_page, 
      limit: pagination.per_page, 
      filters 
    }));
  };

  if (loading && items.length === 0 && !statistics) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <CustomerListHeader onRefresh={handleRefresh} loading={loading} />

        {/* Stats Cards */}
        <CustomerStatsCards statistics={statistics} loading={loading} />

        {/* Filters */}
        <CustomerFilters />

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Table */}
        <CustomerTable data={items} loading={loading} />

        {/* Pagination */}
        <CustomerPagination />
      </div>
    </DashboardLayout>
  );
}