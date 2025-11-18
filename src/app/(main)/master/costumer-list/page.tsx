'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { ChevronLeft, ChevronRight, Filter, Search, UserCheck, UserX, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';

interface Customer {
  id: string;
  name: string;
  age: number;
  status: 'Active' | 'Churned';
  clvSegment: 'High' | 'Medium' | 'Low';
}

// Sample data - nanti ganti dengan data dari API
const generateSampleData = (): Customer[] => {
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
    age: Math.floor(Math.random() * 50) + 20, // Age 20-69
    status: statuses[Math.floor(Math.random() * statuses.length)],
    clvSegment: segments[Math.floor(Math.random() * segments.length)],
  }));
};

type FilterStatus = 'All' | 'Active' | 'Churned';

export default function CustomerListPage() {
  const [customers] = useState<Customer[]>(generateSampleData());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Filter and search logic
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Filter by status
      const statusMatch = filterStatus === 'All' || customer.status === filterStatus;

      // Search by ID or Name
      const searchMatch =
        customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [customers, searchTerm, filterStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Statistics
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    churned: customers.filter(c => c.status === 'Churned').length,
  };

  // Get CLV badge color
  const getClvBadgeColor = (segment: string) => {
    switch (segment) {
      case 'High':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Customer List View</h1>
          <p className="mt-1 text-sm text-gray-600">Manage and view all customer information</p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="mt-1 text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churned Customers</p>
                <p className="mt-1 text-2xl font-bold text-red-600">{stats.churned}</p>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-lg border border-gray-200 bg-white">
          {/* Search and Filter Bar */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Customer ID or Name..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex gap-2">
                  {(['All', 'Active', 'Churned'] as FilterStatus[]).map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results info */}
            <div className="mt-3 text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} of{' '}
              {filteredCustomers.length} customers
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    Customer ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    CLV Segment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentCustomers.length > 0 ? (
                  currentCustomers.map(customer => (
                    <tr key={customer.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(customer.status)}`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getClvBadgeColor(customer.clvSegment)}`}
                        >
                          {customer.clvSegment}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm font-medium">No customers found</p>
                        <p className="mt-1 text-xs">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCustomers.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
