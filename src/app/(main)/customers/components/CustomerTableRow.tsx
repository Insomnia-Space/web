import { Badge } from '@/components/ui/badge';
import type { Customer } from '@/types/customer-types'; 

interface CustomerTableRowProps {
  customer: Customer;
  onClick?: () => void;
}

export function CustomerTableRow({ customer, onClick }: CustomerTableRowProps) {
  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'destructive';
  };

  const getClvVariant = (segment: string) => {
    switch (segment) {
      case 'high_value':
        return 'default';
      case 'medium_value':
        return 'secondary';
      case 'low_value':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <tr onClick={onClick} className="cursor-pointer transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{customer.customer_code}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{customer.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{customer.age}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={getStatusVariant(customer.status)}>{customer.status}</Badge>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge variant={getClvVariant(customer.clv_segment)}>
          {customer.clv_segment.replace('_', ' ')}
        </Badge>
      </td>
    </tr>
  );
}