'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLoading, setSelectedItem, deleteProduct } from '@/store/slices/productSlice';
import { ProductDetailHeader, ProductInfoCard, ProductSpecsCard } from './components';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import ToastNotification from '@/components/toast-notification';
import { DashboardLayout } from '@/components/layout/Layouts';
import { ProductService } from '@/services/product.service';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedItem, loading } = useAppSelector((state) => state.product);
  const { toasts, success, error, removeToast } = useToast();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const product = await ProductService.getById(params.id as string);
        dispatch(setSelectedItem(product));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load product details';
        error(message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (params?.id) {
      loadData();
    }
  }, [params.id, dispatch, error]);

  const handleEdit = () => {
    router.push(`/products/${params.id}/edit`);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    if (!confirm(`Are you sure you want to delete "${selectedItem.name}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      await ProductService.delete(selectedItem.id);
      dispatch(deleteProduct(selectedItem.id));
      success('Product deleted successfully');
      router.push('/products');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      error(message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
            <p className="mt-2 text-muted-foreground">
              The requested product could not be found.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="mt-4 text-blue-600 hover:underline"
            >
              Back to Product Catalog
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto space-y-6 p-6">
        <ProductDetailHeader
          product={selectedItem}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleting={deleting}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <ProductInfoCard product={selectedItem} />
          <ProductSpecsCard product={selectedItem} />
        </div>
      </div>

      {/* Toast Notifications */}
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