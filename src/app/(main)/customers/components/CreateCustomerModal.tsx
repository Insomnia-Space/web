'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useAppDispatch } from '@/store/hooks';
import { createCustomer, fetchCustomers } from '@/store/slices/customerSlice';
import type { CreateCustomerDto } from '@/types/customer-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCustomerModal({ isOpen, onClose }: CreateCustomerModalProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: '',
    age: 18,
    gender: 'male',
    location: '',
    occupation: '',
    current_plan: '',
    clv_segment: 'medium_value',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.occupation.trim() ||
      !formData.current_plan.trim()
    ) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.age < 17 || formData.age > 100) {
      setError('Age must be between 17 and 100');
      return;
    }

    try {
      setLoading(true);
      await dispatch(createCustomer(formData)).unwrap();

      // Refresh list
      await dispatch(fetchCustomers({ page: 1, limit: 20 }));

      handleClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to create customer');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      age: 18,
      gender: 'male',
      location: '',
      occupation: '',
      current_plan: '',
      clv_segment: 'medium_value',
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl border-0 shadow-2xl">
        <DialogHeader className="relative pb-4">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50 blur-3xl" />
          <DialogTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-2xl font-bold text-transparent">
            ✨ Add New Customer
          </DialogTitle>
          <p className="text-sm text-gray-600">Fill in the customer information below</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="animate-in fade-in rounded-xl border-0 bg-gradient-to-r from-red-50 to-rose-50 p-4 shadow-sm duration-300">
              <p className="text-sm font-semibold text-red-600">⚠️ {error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                min="17"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value as 'male' | 'female' })
                }
              >
                <SelectTrigger className="border-gray-200 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">♂ Male</SelectItem>
                  <SelectItem value="female">♀ Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Jakarta"
                className="border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-sm font-semibold text-gray-700">
                Occupation *
              </Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                placeholder="Software Engineer"
                className="border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Current Plan */}
            <div className="space-y-2">
              <Label htmlFor="current_plan" className="text-sm font-semibold text-gray-700">
                Current Plan *
              </Label>
              <Input
                id="current_plan"
                value={formData.current_plan}
                onChange={(e) => setFormData({ ...formData, current_plan: e.target.value })}
                placeholder="Basic Plan"
                className="border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* CLV Segment */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clv_segment" className="text-sm font-semibold text-gray-700">
                CLV Segment *
              </Label>
              <Select
                value={formData.clv_segment}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    clv_segment: value as CreateCustomerDto['clv_segment'],
                  })
                }
              >
                <SelectTrigger className="border-gray-200 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_value">💎 High Value</SelectItem>
                  <SelectItem value="medium_value">⭐ Medium Value</SelectItem>
                  <SelectItem value="low_value">📊 Low Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 border-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Create Customer
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}