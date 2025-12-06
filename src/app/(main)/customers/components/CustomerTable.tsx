'use client';

import { useState } from 'react';
import { Column, Table } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import type { Customer } from '@/types/customer-types';
import { cn } from '@/lib/utils';
import { Eye, Sparkles, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAppDispatch } from '@/store/hooks';
import { generateRecommendation } from '@/store/slices/recommendationSlice';
import { deleteCustomer } from '@/store/slices/customerSlice';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface CustomerTableProps {
  data: Customer[];
  loading?: boolean;
}

const statusColors = {
  active: 'bg-green-500/10 text-green-700 border-green-300',
  churned: 'bg-red-500/10 text-red-700 border-red-300',
};

const clvColors = {
  high_value: 'bg-purple-500/10 text-purple-700 border-purple-300',
  medium_value: 'bg-blue-500/10 text-blue-700 border-blue-300',
  low_value: 'bg-gray-500/10 text-gray-700 border-gray-300',
};

const genderStyles = {
  male: {
    icon: '♂',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  female: {
    icon: '♀',
    bg: 'bg-pink-100',
    text: 'text-pink-700',
  },
};

export function CustomerTable({ data, loading }: CustomerTableProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const handleGenerateRecommendation = async (customerId: string) => {
    try {
      setGeneratingId(customerId);
      const result = await dispatch(
        generateRecommendation({ customer_id: customerId })
      ).unwrap();
      router.push(`/recommendation-history/${result.id}`);
    } catch (error) {
      if (error instanceof Error) {
        // Could dispatch a toast notification here
      }
    } finally {
      setGeneratingId(null);
    }
  };

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete) return;

    try {
      await dispatch(deleteCustomer(customerToDelete.id)).unwrap();
      setDeleteModalOpen(false);
      setCustomerToDelete(null);
    } catch (error) {
      if (error instanceof Error) {
        // Could dispatch a toast notification here
      }
    }
  };

  const columns: Column<Customer>[] = [
    {
      key: 'customer_code',
      label: 'Customer',
      render: (item: Customer) => {
        const genderStyle = genderStyles[item.gender];
        return (
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${genderStyle.bg} ${genderStyle.text} text-lg font-bold shadow-sm`}
            >
              {genderStyle.icon}
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-gray-900">{item.name}</p>
              <p className="font-mono text-xs text-gray-400">{item.customer_code}</p>
              <p className="text-xs text-gray-500">
                {item.age} years • {item.location}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'occupation',
      label: 'Occupation',
      width: '150px',
      render: (item: Customer) => (
        <div className="rounded-lg bg-gray-50 px-3 py-1.5">
          <span className="text-sm font-medium text-gray-700">{item.occupation}</span>
        </div>
      ),
    },
    {
      key: 'current_plan',
      label: 'Current Plan',
      width: '180px',
      render: (item: Customer) => (
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 shadow-sm">
          <span className="text-sm font-semibold text-gray-900">{item.current_plan}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (item: Customer) => (
        <Badge
          className={cn('border text-xs font-semibold capitalize', statusColors[item.status])}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'clv_segment',
      label: 'CLV Segment',
      width: '140px',
      render: (item: Customer) => (
        <Badge className={cn('border text-xs font-semibold', clvColors[item.clv_segment])}>
          {item.clv_segment.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'avg_data_usage',
      label: 'Usage Stats',
      width: '140px',
      render: (item: Customer) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <p className="text-sm font-bold text-gray-900">{item.avg_data_usage} GB</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-xs text-gray-600">{item.avg_call_duration} min</p>
          </div>
        </div>
      ),
    },
    {
      key: 'join_date',
      label: 'Join Date',
      width: '120px',
      render: (item: Customer) => (
        <div className="rounded-lg bg-gray-50 px-2 py-1 text-center">
          <span className="text-xs font-semibold text-gray-700">
            {format(new Date(item.join_date), 'MMM dd, yyyy')}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '220px',
      align: 'right' as const,
      render: (item: Customer) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/customers/${item.id}`);
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>

          <Button
            size="sm"
            className="gap-2 border-0 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-indigo-700"
            onClick={(e) => {
              e.stopPropagation();
              handleGenerateRecommendation(item.id);
            }}
            disabled={generatingId === item.id}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {generatingId === item.id ? 'Generating...' : 'AI'}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="border-0 bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-rose-700"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(item);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="animate-in fade-in overflow-hidden rounded-2xl border-0 shadow-md duration-300">
        <Table<Customer>
          columns={columns}
          data={data}
          loading={loading}
          emptyMessage="No customers found"
          onRowClick={(item) => router.push(`/customers/${item.id}`)}
          hoverable
          striped
        />
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCustomerToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        customerName={customerToDelete?.name || ''}
      />
    </>
  );
}