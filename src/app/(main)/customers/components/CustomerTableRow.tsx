import { Badge } from '@/components/ui/badge';
import { Customer } from '@/store/slices/customerSlice';

interface CustomerTableRowProps {
  customer: Customer;
  onClick?: () => void;
}

export function CustomerTableRow({ customer, onClick }: CustomerTableRowProps) {
  const getStatusVariant = (status: string) => {
    return status === 'Active' ? 'default' : 'destructive';
  };

  const getClvVariant = (segment: string) => {
    switch (segment) {
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <tr onClick={onClick} className="cursor-pointer transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{customer.id}</div>
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
        <Badge variant={getClvVariant(customer.clvSegment)}>{customer.clvSegment}</Badge>
      </td>
    </tr>
  );
}
