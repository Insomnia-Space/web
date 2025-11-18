// ==================== app/customers/[id]/page.tsx ====================
'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { useAppDispatch } from '@/store/hooks';
import { CustomerDetail as CustomerDetailType } from '@/store/slices/customerSlice';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomerDetailHeader } from '@/app/(main)/customers/[id]/components/CustomerDetailHeader';
import { DemographicsCard } from '@/app/(main)/customers/[id]/components/DemographicsCard';
import { SubscriptionCard } from '@/app/(main)/customers/[id]/components/SubscriptionCard';
import { UsagePatternCard } from '@/app/(main)/customers/[id]/components/UsagePatternCard';
import { TransactionHistoryCard } from '@/app/(main)/customers/[id]/components/TransactionHistoryCard';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useToast } from '@/hooks/use-toast';

// Sample customer detail data (nanti ganti dengan API call)
const getSampleCustomerDetail = (id: string): CustomerDetailType => ({
  id,
  name: 'John Doe',
  age: 32,
  gender: 'Male',
  location: 'Jakarta Selatan, DKI Jakarta',
  occupation: 'Software Engineer',
  email: 'john.doe@email.com',
  phone: '+62 812-3456-7890',
  currentPlan: 'Paket Internet Unlimited 50GB',
  status: 'Active',
  clvSegment: 'High',
  joinDate: '2023-01-15',
  avgDataUsage: 45.5,
  callDuration: 320,
  smsCount: 150,
  transactions: [
    {
      id: 'TRX001',
      product: 'Paket Internet Unlimited 50GB',
      date: '2024-11-01',
      price: 150000,
    },
    {
      id: 'TRX002',
      product: 'Paket Voice & SMS Premium',
      date: '2024-10-15',
      price: 75000,
    },
    {
      id: 'TRX003',
      product: 'Paket Streaming HD',
      date: '2024-10-01',
      price: 50000,
    },
    {
      id: 'TRX004',
      product: 'Paket Internet Unlimited 50GB',
      date: '2024-09-28',
      price: 150000,
    },
    {
      id: 'TRX005',
      product: 'Paket Gaming Low Latency',
      date: '2024-09-15',
      price: 100000,
    },
  ],
});

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const customerId = params.id as string;

  // Local state for customer detail (nanti ganti dengan Redux selector)
  const [customer, setCustomer] = useState<CustomerDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load customer detail
  useEffect(() => {
    const loadCustomerDetail = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        // await dispatch(fetchCustomerDetail(customerId)).unwrap();

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const customerData = getSampleCustomerDetail(customerId);
        setCustomer(customerData);
      } catch (error) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Failed to load customer detail:', error);
        }
        toast({
          title: 'Error',
          description: 'Failed to load customer details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      loadCustomerDetail();
    }
  }, [customerId, dispatch, toast]);

  // Handle generate recommendation
  const handleGenerateRecommendation = async () => {
    try {
      setIsGenerating(true);

      // TODO: Replace with actual API call
      // await dispatch(generateRecommendation(customerId)).unwrap();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Success',
        description: 'Recommendation generated successfully!',
      });

      // Navigate to recommendations page
      // router.push(`/recommendations/${customerId}`);
    } catch (error) {
      // Log error for debugging in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to generate recommendation:', error);
      }
      toast({
        title: 'Error',
        description: 'Failed to generate recommendation',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner size="xl" />
          <p className="ml-4 text-gray-500">Loading customer details...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Customer not found
  if (!customer) {
    return (
      <DashboardLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Customer Not Found</h2>
            <p className="mt-2 text-gray-600">The customer you are looking for doesnt exist.</p>
            <button
              onClick={() => router.push('/customers')}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Back to Customer List
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <CustomerDetailHeader
          customerId={customer.id}
          onGenerateRecommendation={handleGenerateRecommendation}
          isGenerating={isGenerating}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Demographics & Subscription & Usage */}
          <div className="space-y-6 lg:col-span-2">
            {/* Demographics Card */}
            <DemographicsCard customer={customer} />

            {/* Subscription Card */}
            <SubscriptionCard customer={customer} />

            {/* Usage Pattern Card */}
            <UsagePatternCard customer={customer} />
          </div>

          {/* Right Column - Transaction History */}
          <div className="lg:col-span-1">
            <TransactionHistoryCard transactions={customer.transactions} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
