'use client';

import { Pagination } from '@/components/pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentPage } from '@/store/slices/productCatalogSlice';

export function ProductPagination() {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector(state => state.product);

  if (pagination.totalItems === 0) {
    return null;
  }

  return (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={page => dispatch(setCurrentPage(page))}
      itemsPerPage={pagination.itemsPerPage}
      totalItems={pagination.totalItems}
      showInfo
    />
  );
}
