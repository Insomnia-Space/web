import { Customer } from '@/store/slices/customerSlice';
import { CustomerTableRow } from './CustomerTableRow';
import EmptyState from '@/components/empty-state';
import { Users } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
  onRowClick?: (customer: Customer) => void;
}

export function CustomerTable({ customers, loading, onRowClick }: CustomerTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="ml-4 text-gray-500">Loading customers...</p>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-12 w-12 text-gray-400" />}
        title="No customers found"
        message="Try adjusting your search or filter"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
              Customer ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
              CLV Segment
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {customers.map(customer => (
            <CustomerTableRow
              key={customer.id}
              customer={customer}
              onClick={() => onRowClick?.(customer)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
