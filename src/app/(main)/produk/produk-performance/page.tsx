'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, Package, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ProductPerformance {
  id: number;
  productName: string;
  timesRecommended: number;
  avgConfidenceScore: number;
  acceptanceRate: number;
}

// Sample data - nanti ganti dengan data dari API
const sampleData: ProductPerformance[] = [
  {
    id: 1,
    productName: 'Paket Internet Unlimited 50GB',
    timesRecommended: 245,
    avgConfidenceScore: 0.92,
    acceptanceRate: 89.5,
  },
  {
    id: 2,
    productName: 'Paket Voice & SMS Premium',
    timesRecommended: 189,
    avgConfidenceScore: 0.88,
    acceptanceRate: 85.2,
  },
  {
    id: 3,
    productName: 'Paket Streaming HD',
    timesRecommended: 167,
    avgConfidenceScore: 0.85,
    acceptanceRate: 82.7,
  },
  {
    id: 4,
    productName: 'Paket Family 100GB',
    timesRecommended: 156,
    avgConfidenceScore: 0.91,
    acceptanceRate: 91.3,
  },
  {
    id: 5,
    productName: 'Paket Gaming Low Latency',
    timesRecommended: 143,
    avgConfidenceScore: 0.87,
    acceptanceRate: 86.8,
  },
  {
    id: 6,
    productName: 'Paket Business 200GB',
    timesRecommended: 128,
    avgConfidenceScore: 0.94,
    acceptanceRate: 93.1,
  },
  {
    id: 7,
    productName: 'Paket Social Media',
    timesRecommended: 112,
    avgConfidenceScore: 0.83,
    acceptanceRate: 80.4,
  },
  {
    id: 8,
    productName: 'Paket Roaming International',
    timesRecommended: 98,
    avgConfidenceScore: 0.89,
    acceptanceRate: 87.9,
  },
];

type SortField = 'timesRecommended' | 'avgConfidenceScore' | 'acceptanceRate';
type SortOrder = 'asc' | 'desc' | null;

export default function ProductPerformancePage() {
  const [data] = useState<ProductPerformance[]>(sampleData);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle sort order
      if (sortOrder === 'desc') {
        setSortOrder('asc');
      } else if (sortOrder === 'asc') {
        setSortOrder(null);
        setSortField(null);
      } else {
        setSortOrder('desc');
      }
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortField || !sortOrder) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, sortField, sortOrder]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Product Name',
      'Times Recommended',
      'Avg Confidence Score',
      'Acceptance Rate',
    ];
    const csvData = sortedData.map(item => [
      item.productName,
      item.timesRecommended,
      (item.avgConfidenceScore * 100).toFixed(1) + '%',
      item.acceptanceRate.toFixed(1) + '%',
    ]);

    const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `product-performance-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field || !sortOrder) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    }
    return sortOrder === 'desc' ? (
      <ArrowDown className="ml-2 h-4 w-4 text-blue-600" />
    ) : (
      <ArrowUp className="ml-2 h-4 w-4 text-blue-600" />
    );
  };

  // Calculate statistics
  const stats = {
    totalProducts: data.length,
    totalRecommendations: data.reduce((sum, item) => sum + item.timesRecommended, 0),
    avgConfidence:
      (data.reduce((sum, item) => sum + item.avgConfidenceScore, 0) / data.length) * 100,
    avgAcceptance: data.reduce((sum, item) => sum + item.acceptanceRate, 0) / data.length,
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Performance Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Analisis performa produk berdasarkan rekomendasi dan tingkat penerimaan
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recommendations</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {stats.totalRecommendations}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {stats.avgConfidence.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Acceptance</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {stats.avgAcceptance.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-full bg-orange-100 p-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-lg border border-gray-200 bg-white">
          {/* Table Header with Export Button */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Product Performance Table</h2>
              <p className="mt-0.5 text-sm text-gray-600">{sortedData.length} products</p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    <button
                      onClick={() => handleSort('timesRecommended')}
                      className="flex items-center hover:text-blue-600"
                    >
                      Times Recommended
                      {getSortIcon('timesRecommended')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    <button
                      onClick={() => handleSort('avgConfidenceScore')}
                      className="flex items-center hover:text-blue-600"
                    >
                      Avg Confidence Score
                      {getSortIcon('avgConfidenceScore')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                    <button
                      onClick={() => handleSort('acceptanceRate')}
                      className="flex items-center hover:text-blue-600"
                    >
                      Acceptance Rate
                      {getSortIcon('acceptanceRate')}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedData.map((item, index) => (
                  <tr key={item.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.timesRecommended}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {(item.avgConfidenceScore * 100).toFixed(1)}%
                        </div>
                        <div className="ml-2 h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${item.avgConfidenceScore * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            item.acceptanceRate >= 90
                              ? 'bg-green-100 text-green-800'
                              : item.acceptanceRate >= 85
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {item.acceptanceRate.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
