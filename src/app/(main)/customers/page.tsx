'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectPageInfo,
  selectPaginatedCustomers,
  setCurrentPage,
  setCustomers,
  setSearchTerm,
  setStatusFilter,
} from '@/store/slices/customerSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CustomerListHeader } from '@/app/(main)/customers/components/CustomerListHeader';
import { CustomerStatsCards } from '@/app/(main)/customers/components/CustomerStatsCard';
import { CustomerFilters } from '@/app/(main)/customers/components/CustomerFilters';
import { CustomerTable } from '@/app/(main)/customers/components/CustomerTable';
import { CustomerPagination } from '@/app/(main)/customers/components/CustomerPagination';

const generateSampleData = () => {
  const names = [
    'John Doe',
    'Jane Smith',
    'Robert Johnson',
    'Maria Garcia',
    'David Wilson',
    'Sarah Brown',
    'Michael Davis',
    'Lisa Anderson',
    'James Martinez',
    'Jennifer Taylor',
    'William Thomas',
    'Patricia Moore',
    'Richard Jackson',
    'Barbara White',
    'Joseph Harris',
    'Susan Martin',
    'Charles Thompson',
    'Jessica Garcia',
    'Thomas Robinson',
    'Nancy Clark',
    'Daniel Rodriguez',
    'Karen Lewis',
    'Matthew Lee',
    'Betty Walker',
    'Anthony Hall',
    'Sandra Allen',
    'Mark Young',
    'Donna King',
    'Paul Wright',
    'Carol Lopez',
    'Steven Hill',
    'Michelle Scott',
    'Andrew Green',
    'Emily Adams',
    'Joshua Baker',
    'Ashley Nelson',
    'Kevin Carter',
    'Kimberly Mitchell',
    'Brian Perez',
    'Amanda Roberts',
    'George Turner',
    'Melissa Phillips',
    'Edward Campbell',
    'Deborah Parker',
    'Ronald Evans',
    'Stephanie Edwards',
    'Timothy Collins',
    'Rebecca Stewart',
    'Jason Sanchez',
    'Laura Morris',
    'Jeffrey Rogers',
    'Sharon Reed',
    'Ryan Cook',
    'Cynthia Morgan',
    'Jacob Bell',
    'Kathleen Murphy',
    'Gary Bailey',
    'Amy Rivera',
    'Nicholas Cooper',
    'Angela Richardson',
  ];

  const segments: Array<'High' | 'Medium' | 'Low'> = ['High', 'Medium', 'Low'];
  const statuses: Array<'Active' | 'Churned'> = ['Active', 'Churned'];

  return names.map((name, index) => ({
    id: `CUST${String(index + 1001).padStart(5, '0')}`,
    name,
    age: Math.floor(Math.random() * 50) + 20,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    clvSegment: segments[Math.floor(Math.random() * segments.length)],
  }));
};

export default function CustomerListPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Selectors
  const { filters, pagination, loading, stats } = useAppSelector(state => state.customers);
  const paginatedCustomers = useAppSelector(selectPaginatedCustomers);
  const pageInfo = useAppSelector(selectPageInfo);

  // Initialize sample data (nanti ganti dengan fetchCustomers dari API)
  useEffect(() => {
    const sampleData = generateSampleData();
    dispatch(setCustomers(sampleData));
  }, [dispatch]);

  // Handlers
  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleSearchClear = () => {
    dispatch(setSearchTerm(''));
  };

  const handleFilterChange = (status: 'All' | 'Active' | 'Churned') => {
    dispatch(setStatusFilter(status));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleRowClick = (customer: { id: string }) => {
    router.push(`/customers/${customer.id}`);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <CustomerListHeader />

        {/* Statistics Cards */}
        <CustomerStatsCards stats={stats} />

        {/* Table Card */}
        <div className="rounded-lg border border-gray-200 bg-white">
          {/* Search and Filter Bar */}
          <div className="border-b border-gray-200 p-4">
            <CustomerFilters
              searchTerm={filters.searchTerm}
              onSearchChange={handleSearchChange}
              onSearchClear={handleSearchClear}
              filterStatus={filters.status}
              onFilterChange={handleFilterChange}
              loading={loading}
            />
          </div>

          {/* Table */}
          <CustomerTable
            customers={paginatedCustomers}
            loading={loading}
            onRowClick={handleRowClick}
          />

          {/* Pagination */}
          {pagination.totalItems > pagination.itemsPerPage && (
            <CustomerPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={pagination.totalItems}
              startIndex={pageInfo.startIndex}
              endIndex={pageInfo.endIndex}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
