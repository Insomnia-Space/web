import { CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Customer } from '@/types/customer-types';
import { format } from 'date-fns';

interface SubscriptionCardProps {
  customer: Customer;
}

export function SubscriptionCard({ customer }: SubscriptionCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <CreditCard className="h-5 w-5 text-green-600" />
          Subscription
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Current Plan</p>
            <p className="mt-1 font-semibold text-gray-900">{customer.current_plan}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <div className="mt-1">
              <Badge variant={customer.status === 'active' ? 'default' : 'destructive'}>
                {customer.status}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Join Date</p>
            <p className="mt-1 font-semibold text-gray-900">
              {format(new Date(customer.join_date), 'MMMM dd, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}