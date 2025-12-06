'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Sparkles, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Customer } from '@/types/customer-types';
import { cn } from '@/lib/utils';
import { UpdateCustomerModal } from './UpdateCustomerModal';
import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';
import { useAppDispatch } from '@/store/hooks';
import { deleteCustomer } from '@/store/slices/customerSlice';
import { generateRecommendation } from '@/store/slices/recommendationSlice';

interface CustomerDetailHeaderProps {
  customer: Customer;
}

const statusColors = {
  active: 'bg-green-100 text-green-700',
  churned: 'bg-red-100 text-red-700',
};

const clvColors = {
  high_value: 'bg-purple-100 text-purple-700',
  medium_value: 'bg-blue-100 text-blue-700',
  low_value: 'bg-gray-100 text-gray-700',
};

export function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCustomer(customer.id)).unwrap();
      router.push('/customers');
    } catch (error) {
      // ✅ Fixed: Removed console.error
      if (error instanceof Error) {
        // Could dispatch a toast notification here
      }
    }
  };

  const handleGenerateRecommendation = async () => {
    try {
      setGenerating(true);
      const result = await dispatch(
        generateRecommendation({ customer_id: customer.id })
      ).unwrap();
      router.push(`/recommendation-history/${result.id}`);
    } catch (error) {
      // ✅ Fixed: Removed console.error
      if (error instanceof Error) {
        // Could dispatch a toast notification here
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/customers')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-800">
              {customer.name}
            </h1>
            <p className="text-sm text-gray-600">
              {customer.customer_code} • {customer.occupation}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn('text-sm font-semibold capitalize', statusColors[customer.status])}>
            {customer.status}
          </Badge>
          <Badge className={cn('text-sm font-semibold', clvColors[customer.clv_segment])}>
            {customer.clv_segment.replace('_', ' ')}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUpdateModal(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleGenerateRecommendation}
            disabled={generating}
            className="gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Sparkles className="h-4 w-4" />
            {generating ? 'Generating...' : 'Generate Recommendation'}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <UpdateCustomerModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        customer={customer}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        customerName={customer.name}
      />
    </>
  );
}