// app/products/page.tsx
'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearFilters,
  selectAllProducts,
  selectPaginatedProducts,
  selectProductFilters,
  selectProductLoading,
  selectProductPagination,
  selectProductSorting,
  selectProductStats,
  setItemsPerPage,
  setMinAcceptanceRate,
  setMinConfidenceScore,
  setPage,
  setSearchTerm,
  setSorting,
} from '@/store/slices/productSlice';
import { ProductListHeader } from '@/app/(main)/dashboard/products/components/ProductListHeader';
import { ProductStatsCards } from '@/app/(main)/dashboard/products/components/ProductStatsCards';
import { ProductFilters } from '@/app/(main)/dashboard/products/components/ProductFilters';
import { ProductTable } from '@/app/(main)/dashboard/products/components/ProductTable';
import { ProductPagination } from '@/app/(main)/dashboard/products/components/ProductPagination';
import ToastNotification, { type ToastType } from '@/components/toast-notification';
import { useState } from 'react';

export default function ProductPerformancePage() {
  const dispatch = useAppDispatch();
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  const paginatedProducts = useAppSelector(selectPaginatedProducts);
  const allProducts = useAppSelector(selectAllProducts);
  const stats = useAppSelector(selectProductStats);
  const filters = useAppSelector(selectProductFilters);
  const { sortField, sortOrder } = useAppSelector(selectProductSorting);
  const pagination = useAppSelector(selectProductPagination);
  const loading = useAppSelector(selectProductLoading);

  // Export to CSV function
  const exportToCSV = () => {
    try {
      const headers = [
        'Product Name',
        'Times Recommended',
        'Avg Confidence Score',
        'Acceptance Rate',
      ];

      const csvData = allProducts.map(item => [
        item.productName,
        item.timesRecommended.toString(),
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

      setToast({
        type: 'success',
        message: `${allProducts.length} products exported to CSV successfully!`,
      });
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({
        type: 'error',
        message: 'Failed to export data. Please try again.',
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <ProductListHeader totalProducts={stats.totalProducts} onExport={exportToCSV} />

        {/* Statistics Cards */}
        <ProductStatsCards stats={stats} />

        {/* Filters */}
        <ProductFilters
          searchTerm={filters.searchTerm}
          minAcceptanceRate={filters.minAcceptanceRate}
          minConfidenceScore={filters.minConfidenceScore}
          onSearchChange={value => dispatch(setSearchTerm(value))}
          onAcceptanceRateChange={value => dispatch(setMinAcceptanceRate(value))}
          onConfidenceScoreChange={value => dispatch(setMinConfidenceScore(value))}
          onClearFilters={() => dispatch(clearFilters())}
        />

        {/* Product Table */}
        <ProductTable
          products={paginatedProducts}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={field => dispatch(setSorting({ field }))}
          loading={loading}
        />

        {/* Pagination */}
        {!loading && paginatedProducts.length > 0 && (
          <ProductPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={page => dispatch(setPage(page))}
            onItemsPerPageChange={itemsPerPage => dispatch(setItemsPerPage(itemsPerPage))}
          />
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </DashboardLayout>
  );
}
