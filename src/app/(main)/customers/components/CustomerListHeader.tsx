'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Users } from 'lucide-react';
import { CreateCustomerModal } from './CreateCustomerModal';

interface CustomerListHeaderProps {
  onRefresh: () => void;
  loading?: boolean;
}

export function CustomerListHeader({ onRefresh, loading }: CustomerListHeaderProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border-0 p-8 ">
        <div className="relative flex items-center justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-2xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Customer Management
              </h1>
            </div>
            <p className="ml-[60px] text-sm text-gray-600">
              Manage customer information and generate AI recommendations 🎯
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onRefresh}
              disabled={loading}
              className="gap-2 border-0 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white hover:shadow"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="gap-2 border-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      <CreateCustomerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}