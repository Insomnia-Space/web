'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useAppDispatch } from '@/store/hooks';
import { generateRecommendation } from '@/store/slices/recommendationSlice';
import { CustomerService } from '@/services/customer.service';
import { useRouter } from 'next/navigation';
import type { Customer } from '@/types/customer-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GenerateRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GenerateRecommendationModal({
  isOpen,
  onClose,
}: GenerateRecommendationModalProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadCustomers();
    }
  }, [isOpen]);

  const loadCustomers = async () => {
    try {
      setLoadingCustomers(true);
      const response = await CustomerService.getAll({ page: 1, limit: 100 });
      setCustomers(response.customers);
    } catch (err) {
      // ✅ Fixed: Removed console.error and proper error handling
      if (err instanceof Error) {
        setError('Failed to load customers. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedCustomerId) {
      setError('Please select a customer');
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(
        generateRecommendation({ customer_id: selectedCustomerId })
      ).unwrap();
      
      handleClose();
      router.push(`/recommendation-history/${result.id}`);
    } catch (err) {
      // ✅ Fixed: Proper error handling without 'any'
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to generate recommendation');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedCustomerId('');
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate New Recommendation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="customer">Select Customer *</Label>
            {loadingCustomers ? (
              <div className="flex items-center justify-center py-4">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <Select
                value={selectedCustomerId}
                onValueChange={setSelectedCustomerId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a customer..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.customer_code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            💡 AI will analyze customer behavior and generate personalized product recommendations
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || loadingCustomers}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Generating...
                </>
              ) : (
                'Generate Recommendation'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}