'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/Layouts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomerDetail } from '@/store/slices/customerSlice';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerDetailHeader } from './components/CustomerDetailHeader';
import { CustomerInfoCards } from './components/CustomerInfoCard';
import { CustomerUsageStats } from './components/CustomerUsageStats';
import { cn } from '@/lib/utils'; // Pastikan cn diimpor

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedItem: customer, loading, error } = useAppSelector(
    (state) => state.customers
  );

  // Kelas Glassmorphism untuk Error Card
  const glassErrorCardClass = cn(
    "w-full max-w-md text-center rounded-2xl shadow-xl",
    "border border-white/30 bg-white/10 backdrop-blur-lg dark:bg-gray-900/10" 
  );
  
  // Kelas Solid Gradien untuk Tombol (Default: Primary/Blue)
  const solidButtonPrimaryClass = cn(
    "border-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30", 
    "hover:from-blue-700 hover:to-indigo-700"
  );
  
  // Kelas Glassmorphism untuk Teks Error
  const textErrorTitleClass = "text-red-600 dark:text-red-400";
  const textErrorDescriptionClass = "mb-4 text-gray-700 dark:text-gray-300";


  useEffect(() => {
    if (params.id) {
      dispatch(fetchCustomerDetail(params.id as string));
    }
  }, [dispatch, params.id]);

  if (loading && !customer) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          {/* ERROR CARD: GLASSMORPHISM */}
          <Card className={glassErrorCardClass}>
            
            {/* Background Dekoratif di dalam Card */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-red-400/10 via-rose-400/10 to-orange-400/10 blur-3xl" />
            
            <CardHeader>
              <CardTitle className={textErrorTitleClass}>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={textErrorDescriptionClass}>{error}</p>
              
              {/* Tombol: Solid Gradien */}
              <Button 
                onClick={() => router.push('/customers')}
                className={solidButtonPrimaryClass}
              >
                Back to Customers
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <CustomerDetailHeader customer={customer} />

        {/* Info Cards */}
        <CustomerInfoCards customer={customer} />

        {/* Usage Stats */}
        <CustomerUsageStats customer={customer} />
      </div>
    </DashboardLayout>
  );
}