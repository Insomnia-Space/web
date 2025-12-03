'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  History,
  RefreshCcw,
  Search,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface RecommendationHistory {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  recommendedProducts: string[];
  status: 'Sent' | 'Draft';
  isOverridden: boolean;
  overriddenBy?: string;
  confidence: number;
}

// Mock data
const mockHistory: RecommendationHistory[] = [
  {
    id: 'REC-001',
    customerId: 'CUST01234',
    customerName: 'John Doe',
    date: '2025-12-02T10:30:00',
    recommendedProducts: ['Work From Anywhere 50GB', 'Gaming Plus 30GB', 'Combo Smart 15GB'],
    status: 'Sent',
    isOverridden: false,
    confidence: 94.5,
  },
  {
    id: 'REC-002',
    customerId: 'CUST01235',
    customerName: 'Jane Smith',
    date: '2025-12-01T09:15:00',
    recommendedProducts: ['Streaming Max HD', 'Voice Saver 250', 'Family Share 80GB'],
    status: 'Sent',
    isOverridden: true,
    overriddenBy: 'Marketing Team',
    confidence: 87.3,
  },
  {
    id: 'REC-003',
    customerId: 'CUST01236',
    customerName: 'Robert Johnson',
    date: '2025-11-30T14:20:00',
    recommendedProducts: ['Unlimited Pro Data 100GB', 'Call Unlimited Local', 'Gaming Plus 30GB'],
    status: 'Draft',
    isOverridden: false,
    confidence: 91.2,
  },
  {
    id: 'REC-004',
    customerId: 'CUST01237',
    customerName: 'Emily Davis',
    date: '2025-11-29T16:45:00',
    recommendedProducts: ['Student Pack 25GB', 'Voice Saver 250', 'Streaming Max HD'],
    status: 'Sent',
    isOverridden: false,
    confidence: 88.9,
  },
  {
    id: 'REC-005',
    customerId: 'CUST01238',
    customerName: 'Michael Brown',
    date: '2025-11-28T11:00:00',
    recommendedProducts: [
      'Enterprise Voice 1000',
      'Business Data 200GB',
      'Work From Anywhere 50GB',
    ],
    status: 'Sent',
    isOverridden: true,
    overriddenBy: 'Sales Manager',
    confidence: 95.7,
  },
  {
    id: 'REC-006',
    customerId: 'CUST01239',
    customerName: 'Sarah Wilson',
    date: '2025-11-27T13:30:00',
    recommendedProducts: ['Family Share 80GB', 'Combo Smart 15GB', 'Weekend Data 60GB'],
    status: 'Sent',
    isOverridden: false,
    confidence: 82.4,
  },
  {
    id: 'REC-007',
    customerId: 'CUST01240',
    customerName: 'David Martinez',
    date: '2025-11-26T08:50:00',
    recommendedProducts: [
      'Premium Combo 150GB',
      'International Voice 500',
      'Unlimited Pro Data 100GB',
    ],
    status: 'Draft',
    isOverridden: false,
    confidence: 89.6,
  },
  {
    id: 'REC-008',
    customerId: 'CUST01241',
    customerName: 'Lisa Anderson',
    date: '2025-11-25T15:10:00',
    recommendedProducts: ['Night Owl 100GB', 'Voice Saver 250', 'Streaming Max HD'],
    status: 'Sent',
    isOverridden: false,
    confidence: 86.1,
  },
  {
    id: 'REC-009',
    customerId: 'CUST01242',
    customerName: 'James Taylor',
    date: '2025-11-24T10:20:00',
    recommendedProducts: ['Gaming Plus 30GB', 'Work From Anywhere 50GB', 'Call Unlimited Local'],
    status: 'Sent',
    isOverridden: true,
    overriddenBy: 'Marketing Team',
    confidence: 90.3,
  },
  {
    id: 'REC-010',
    customerId: 'CUST01243',
    customerName: 'Patricia Thomas',
    date: '2025-11-05T12:40:00',
    recommendedProducts: ['Family Share 80GB', 'Student Pack 25GB', 'Weekend Data 60GB'],
    status: 'Sent',
    isOverridden: false,
    confidence: 84.7,
  },
  {
    id: 'REC-011',
    customerId: 'CUST01244',
    customerName: 'Christopher White',
    date: '2025-10-20T09:30:00',
    recommendedProducts: ['Business Data 200GB', 'Enterprise Voice 1000', 'Premium Combo 150GB'],
    status: 'Sent',
    isOverridden: false,
    confidence: 93.2,
  },
  {
    id: 'REC-012',
    customerId: 'CUST01245',
    customerName: 'Amanda Garcia',
    date: '2025-10-15T14:00:00',
    recommendedProducts: ['Streaming Max HD', 'Combo Smart 15GB', 'Voice Saver 250'],
    status: 'Draft',
    isOverridden: false,
    confidence: 85.8,
  },
  {
    id: 'REC-013',
    customerId: 'CUST01246',
    customerName: 'Daniel Rodriguez',
    date: '2025-10-10T11:25:00',
    recommendedProducts: [
      'Unlimited Pro Data 100GB',
      'Gaming Plus 30GB',
      'International Voice 500',
    ],
    status: 'Sent',
    isOverridden: true,
    overriddenBy: 'Sales Manager',
    confidence: 92.1,
  },
  {
    id: 'REC-014',
    customerId: 'CUST01247',
    customerName: 'Michelle Lee',
    date: '2025-09-28T16:15:00',
    recommendedProducts: ['Night Owl 100GB', 'Weekend Data 60GB', 'Student Pack 25GB'],
    status: 'Sent',
    isOverridden: false,
    confidence: 81.9,
  },
  {
    id: 'REC-015',
    customerId: 'CUST01248',
    customerName: 'Kevin Walker',
    date: '2025-09-20T10:05:00',
    recommendedProducts: ['Work From Anywhere 50GB', 'Premium Combo 150GB', 'Business Data 200GB'],
    status: 'Sent',
    isOverridden: false,
    confidence: 88.4,
  },
];

const PAGE_SIZE = 10;

export default function RecommendationHistoryPage() {
  const [search, setSearch] = useState('');
  const [pendingSearch, setPendingSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<7 | 30 | 90>(30);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [search, dateFilter, page]);

  const filtered = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - dateFilter);

    let data = mockHistory.filter(item => new Date(item.date) >= cutoffDate);

    if (search.trim()) {
      const s = search.toLowerCase();
      data = data.filter(
        item =>
          item.customerName.toLowerCase().includes(s) ||
          item.id.toLowerCase().includes(s) ||
          item.customerId.toLowerCase().includes(s) ||
          item.recommendedProducts.some(p => p.toLowerCase().includes(s))
      );
    }

    // Sort by date descending
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function applySearch() {
    setPage(1);
    setSearch(pendingSearch);
  }

  function resetFilters() {
    setPendingSearch('');
    setSearch('');
    setDateFilter(30);
    setPage(1);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = useMemo(() => {
    const total = filtered.length;
    const sent = filtered.filter(h => h.status === 'Sent').length;
    const draft = filtered.filter(h => h.status === 'Draft').length;
    const overridden = filtered.filter(h => h.isOverridden).length;

    return { total, sent, draft, overridden };
  }, [filtered]);

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
          <div className="rounded-[10px] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <History className="h-6 w-6 text-purple-600" />
                  <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                    Recommendation History
                  </h1>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Track and manage all customer recommendation records
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white">
                  {stats.total} Records
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="rounded-lg bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sent</p>
                  <p className="text-3xl font-bold text-green-600">{stats.sent}</p>
                </div>
                <div className="rounded-lg bg-green-100 p-3">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Draft</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.draft}</p>
                </div>
                <div className="rounded-lg bg-amber-100 p-3">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overridden</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.overridden}</p>
                </div>
                <div className="rounded-lg bg-purple-100 p-3">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="space-y-4">
            {/* Search & Refresh */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari customer name, ID, atau produk..."
                  className="pl-10 transition-all focus:ring-2 focus:ring-purple-200"
                  value={pendingSearch}
                  onChange={e => setPendingSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') applySearch();
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={applySearch}
                  className="transition-all hover:border-purple-300 hover:bg-purple-50"
                >
                  <Search className="mr-1 h-4 w-4" />
                  Search
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="transition-all hover:bg-gray-100"
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 300);
                  }}
                  className="transition-all"
                >
                  <RefreshCcw className={cn('h-4 w-4', loading && 'animate-spin')} />
                </Button>
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-semibold text-gray-700">Filter by Date Range:</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[7, 30, 90].map(days => (
                  <button
                    key={days}
                    onClick={() => {
                      setDateFilter(days as 7 | 30 | 90);
                      setPage(1);
                    }}
                    className={cn(
                      'relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                      'hover:scale-105 active:scale-95',
                      dateFilter === days
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-200'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                    )}
                  >
                    <Calendar className="mr-2 inline h-4 w-4" />
                    Last {days} Days
                    {dateFilter === days && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex h-5 w-5 rounded-full bg-purple-500"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center gap-4 rounded-lg border p-4"
                  >
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                    <div className="h-4 flex-1 rounded bg-gray-200"></div>
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {!loading && (
              <div className="animate-in fade-in overflow-x-auto rounded-xl border border-gray-200 duration-300">
                <Table className="min-w-[1100px]">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-purple-50/30 hover:from-gray-50 hover:to-purple-50/30">
                      <TableHead className="font-semibold text-gray-700">Rec ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Customer Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Recommended Products
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Override
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Confidence
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageData.map((item, idx) => (
                      <TableRow
                        key={item.id}
                        className={cn(
                          'group h-20 transition-all duration-300 ease-out',
                          'hover:bg-gradient-to-r hover:from-purple-50/40 hover:via-pink-50/30 hover:to-blue-50/40',
                          'hover:scale-[1.002] hover:shadow-sm'
                        )}
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <TableCell className="py-4">
                          <span className="font-mono text-xs font-medium text-gray-500 transition-colors group-hover:text-purple-600">
                            {item.id}
                          </span>
                        </TableCell>

                        <TableCell className="py-4">
                          <div>
                            <p className="font-bold text-gray-800 transition-colors group-hover:text-purple-700">
                              {item.customerName}
                            </p>
                            <p className="font-mono text-xs text-gray-500">{item.customerId}</p>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{formatDate(item.date)}</span>
                          </div>
                        </TableCell>

                        <TableCell className="max-w-[300px] py-4">
                          <div className="flex flex-wrap gap-1">
                            {item.recommendedProducts.slice(0, 2).map((product, i) => (
                              <Badge
                                key={i}
                                className="bg-blue-100 text-xs text-blue-700 transition-colors group-hover:bg-blue-200"
                              >
                                <Sparkles className="mr-1 h-3 w-3" />
                                {product}
                              </Badge>
                            ))}
                            {item.recommendedProducts.length > 2 && (
                              <Badge className="bg-gray-100 text-xs text-gray-600">
                                +{item.recommendedProducts.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <Badge
                            className={cn(
                              'text-xs font-semibold transition-all group-hover:scale-105',
                              item.status === 'Sent'
                                ? 'bg-green-100 text-green-700 group-hover:bg-green-200'
                                : 'bg-amber-100 text-amber-700 group-hover:bg-amber-200'
                            )}
                          >
                            {item.status === 'Sent' ? (
                              <Send className="mr-1 h-3 w-3" />
                            ) : (
                              <FileText className="mr-1 h-3 w-3" />
                            )}
                            {item.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-4 text-center">
                          {item.isOverridden ? (
                            <div className="flex flex-col items-center gap-1">
                              <Badge className="bg-orange-100 text-xs text-orange-700">
                                <Zap className="mr-1 h-3 w-3" />
                                Yes
                              </Badge>
                              {item.overriddenBy && (
                                <span className="text-[10px] text-gray-500">
                                  {item.overriddenBy}
                                </span>
                              )}
                            </div>
                          ) : (
                            <Badge className="bg-gray-100 text-xs text-gray-500">No</Badge>
                          )}
                        </TableCell>

                        <TableCell className="py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-sm font-bold text-transparent">
                              {item.confidence.toFixed(1)}%
                            </span>
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                                style={{ width: `${item.confidence}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Empty State */}
            {!loading && pageData.length === 0 && (
              <div className="animate-in fade-in py-16 text-center duration-300">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
                  <Search className="h-10 w-10 text-purple-400" />
                </div>
                <p className="font-medium text-gray-600">No recommendation history found</p>
                <p className="mt-1 text-sm text-gray-400">
                  Try adjusting your search criteria or date range
                </p>
              </div>
            )}

            {/* Pagination */}
            {!loading && pageData.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-sm text-gray-600">
                  Showing{' '}
                  <span className="font-bold text-purple-600">{(page - 1) * PAGE_SIZE + 1}</span> -{' '}
                  <span className="font-bold text-purple-600">
                    {Math.min(page * PAGE_SIZE, filtered.length)}
                  </span>{' '}
                  of <span className="font-bold text-purple-600">{filtered.length}</span> records
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="transition-all hover:border-purple-300 hover:bg-purple-50 disabled:opacity-40"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-600">
                      Page {page} of {totalPages}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className="transition-all hover:border-purple-300 hover:bg-purple-50 disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
