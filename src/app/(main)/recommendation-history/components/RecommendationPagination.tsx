// app/(main)/recommendation-history/components/RecommendationPagination.tsx

'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentPage } from '@/store/slices/recommendationSlice';
import { selectPageInfo } from '@/store/slices/recommendationSlice';

export function RecommendationPagination() {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.recommendation);
  const pageInfo = useAppSelector(selectPageInfo);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{pageInfo.start}</span> to{' '}
        <span className="font-semibold">{pageInfo.end}</span> of{' '}
        <span className="font-semibold">{pageInfo.total}</span> recommendations
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
          let pageNum;
          if (pagination.totalPages <= 5) {
            pageNum = i + 1;
          } else if (pagination.currentPage <= 3) {
            pageNum = i + 1;
          } else if (pagination.currentPage >= pagination.totalPages - 2) {
            pageNum = pagination.totalPages - 4 + i;
          } else {
            pageNum = pagination.currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={pagination.currentPage === pageNum ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              className="w-10"
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}