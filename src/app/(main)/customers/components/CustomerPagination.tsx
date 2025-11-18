import { Pagination } from '@/components/pagination';

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export function CustomerPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}: CustomerPaginationProps) {
  if (totalItems === 0) return null;

  return (
    <div className="border-t border-gray-200 px-6 py-4">
      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex}-{endIndex} of {totalItems} customers
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        showInfo={false}
      />
    </div>
  );
}
