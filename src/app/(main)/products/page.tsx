'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/Layouts';
import {
  ProductListHeader,
  ProductStatsCards,
  ProductFilters,
  ProductContent,
  ProductPagination,
} from './components';
import { CreateProductModal } from './components/CreateProductModal';
import { useAppDispatch } from '@/store/hooks';
import { addProduct, fetchProducts } from '@/store/slices/productSlice';
import { ProductService } from '@/services/product.service';
import { useToast } from '@/hooks/use-toast';
import ToastNotification from '@/components/toast-notification';
import type { CreateProductDto } from '@/types/product-types';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { toasts, success, error: showError, removeToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts({})).unwrap();
      } catch (err) {
        // ✅ Fixed: Removed console.error and proper error handling
        if (err instanceof Error) {
          showError(err.message);
        } else {
          showError('Failed to fetch products');
        }
      }
    };

    fetchData();
  }, [dispatch, showError]);

  const handleCreateProduct = async (data: CreateProductDto) => {
    setCreating(true);
    try {
      const newProduct = await ProductService.create(data);
      dispatch(addProduct(newProduct));
      success('Product created successfully');
      setIsCreateModalOpen(false);
      dispatch(fetchProducts({}));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create product';
      showError(message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto space-y-6 p-6">
        <ProductListHeader onAddNew={() => setIsCreateModalOpen(true)} />
        <ProductStatsCards />
        <ProductFilters />
        <ProductContent />
        <ProductPagination />
      </div>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProduct}
        loading={creating}
      />

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}