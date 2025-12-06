'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers, setCurrentPage } from '@/store/slices/customerSlice';

export function CustomerPagination() {
  const dispatch = useAppDispatch();
  const { pagination, filters } = useAppSelector((state) => state.customers);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchCustomers({ page, limit: pagination.per_page, filters }));
  };

  if (pagination.total_pages <= 1) return null;

  const pageInfo = {
    start: pagination.offset + 1,
    end: Math.min(pagination.offset + pagination.count, pagination.total),
    total: pagination.total,
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border-0 bg-white p-6 shadow-md">
      <div className="text-sm text-gray-600">
        Showing{' '}
        <span className="font-bold text-gray-900">{pageInfo.start}</span> to{' '}
        <span className="font-bold text-gray-900">{pageInfo.end}</span> of{' '}
        <span className="font-bold text-gray-900">{pageInfo.total}</span> customers
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.current_page - 1)}
          disabled={pagination.current_page === 1}
          className="gap-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
          let pageNum;
          if (pagination.total_pages <= 5) {
            pageNum = i + 1;
          } else if (pagination.current_page <= 3) {
            pageNum = i + 1;
          } else if (pagination.current_page >= pagination.total_pages - 2) {
            pageNum = pagination.total_pages - 4 + i;
          } else {
            pageNum = pagination.current_page - 2 + i;
          }

          const isActive = pagination.current_page === pageNum;

          return (
            <Button
              key={pageNum}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              className={
                isActive
                  ? 'w-10 border-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700'
                  : 'w-10 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow'
              }
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.current_page + 1)}
          disabled={pagination.current_page === pagination.total_pages}
          className="gap-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}