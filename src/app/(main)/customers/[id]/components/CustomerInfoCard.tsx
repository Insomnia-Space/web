'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Smartphone, User } from 'lucide-react';
import type { Customer } from '@/types/customer-types';
import { format } from 'date-fns';

interface CustomerInfoCardsProps {
  customer: Customer;
}

const genderLabels = {
  male: 'Male',
  female: 'Female',
};

export function CustomerInfoCards({ customer }: CustomerInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Full Name</p>
            <p className="font-semibold text-gray-900">{customer.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Age</p>
            <p className="font-semibold text-gray-900">{customer.age} years old</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="font-semibold text-gray-900">{genderLabels[customer.gender]}</p>
          </div>
        </CardContent>
      </Card>

      {/* Location & Occupation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4 text-green-600" />
            Location & Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-semibold text-gray-900">{customer.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Occupation</p>
            <p className="font-semibold text-gray-900">{customer.occupation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Device Brand</p>
            <p className="font-semibold text-gray-900">{customer.device_brand}</p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Smartphone className="h-4 w-4 text-purple-600" />
            Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Current Plan</p>
            <p className="font-semibold text-gray-900">{customer.current_plan}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Join Date</p>
            <p className="font-semibold text-gray-900">
              {format(new Date(customer.join_date), 'MMMM dd, yyyy')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Customer Code</p>
            <p className="font-mono text-sm font-semibold text-gray-900">{customer.customer_code}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}