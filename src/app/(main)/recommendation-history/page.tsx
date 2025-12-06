// app/(main)/recommendation-history/page.tsx

'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/Layouts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchRecommendations,
  selectPaginatedItems,
} from '@/store/slices/recommendationSlice';
import { LoadingSpinner } from '@/components/loading-spinner';
import { RecommendationListHeader } from './components/RecommendationListHeader';
import { RecommendationStatsCards } from './components/RecommendationStatsCards';
import { RecommendationFilters } from './components/RecommendationFilters';
import { RecommendationTable } from './components/RecommendationTable';
import { RecommendationPagination } from './components/RecommendationPagination';

export default function RecommendationHistoryPage() {
  const dispatch = useAppDispatch();
  const { loading, error, stats } = useAppSelector((state) => state.recommendation);
  const paginatedItems = useAppSelector(selectPaginatedItems);

  useEffect(() => {
    dispatch(fetchRecommendations(undefined));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchRecommendations(undefined));
  };

  if (loading && paginatedItems.length === 0) {
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
        {/* Header */}
        <RecommendationListHeader onRefresh={handleRefresh} loading={loading} />

        {/* Stats Cards */}
        <RecommendationStatsCards stats={stats} />

        {/* Filters */}
        <RecommendationFilters />

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Table */}
        <RecommendationTable data={paginatedItems} loading={loading} />

        {/* Pagination */}
        <RecommendationPagination />
    </DashboardLayout>
  );
}