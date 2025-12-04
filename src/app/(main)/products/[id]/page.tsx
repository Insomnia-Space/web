'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLoading, setSelectedItem } from '@/store/slices/productCatalogSlice';
import { ProductDetailHeader, ProductInfoCard, ProductSpecsCard } from './components';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import ToastNotification from '@/components/toast-notification';
import { DashboardLayout } from '@/components/layout/Layouts';

// Mock detail data - replace with API call
const mockDetailData = {
  id: 'PKT-DATA-001',
  name: 'Unlimited Pro',
  category: 'Data' as const,
  price: 199000,
  description: 'Paket data unlimited dengan FUP tinggi untuk streaming & kerja remote.',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-15',
  features: [
    'Unlimited data dengan FUP 100GB',
    'Kecepatan hingga 100 Mbps',
    'Free akses ke platform streaming populer',
    'Bonus kuota malam 50GB',
    '24/7 customer support',
  ],
  quota: '100GB FUP',
  validity: '30 days',
  terms:
    'FUP berlaku setelah penggunaan 100GB. Kecepatan dikurangi menjadi 1 Mbps setelah FUP terlampaui.',
};

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { selectedItem, loading } = useAppSelector(state => state.product);
  const { toasts, success, error, removeToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        // Replace with actual API call
        // const response = await fetch(`/api/products/${params.id}`);
        // const data = await response.json();
        // dispatch(setSelectedItem(data));

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch(setSelectedItem(mockDetailData));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load product details';
        error(msg);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (params?.id) {
      loadData();
    } else {
      // no id provided
      error('Invalid product id');
    }
  }, [params.id, dispatch, error]);

  const handlePurchase = () => {
    success('Product added to cart!');
  };

  const handleEdit = () => {
    if (selectedItem?.id) {
      success(`Open editor for ${selectedItem.id}`);
    } else {
      error('No product selected to edit');
    }
  };

  const handleDelete = () => {
    if (selectedItem?.id) {
      success(`Product ${selectedItem.id} marked for deletion`);
    } else {
      error('No product selected to delete');
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
      <div className="container mx-auto p-6">
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div className="container mx-auto space-y-6 p-6">
          <ProductDetailHeader
            product={selectedItem}
            onPurchase={handlePurchase}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <ProductInfoCard product={selectedItem} />
            <ProductSpecsCard product={selectedItem} />
          </div>
        </div>

        {/* Toast Notifications */}
        <div className="fixed right-4 bottom-4 z-50 space-y-2">
          {toasts.map(toast => (
            <ToastNotification
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}
