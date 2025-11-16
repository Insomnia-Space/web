'use client';

import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showInfo?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 20,
  totalItems = 0,
  showInfo = true,
  className = '',
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const showPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {showInfo && (
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
