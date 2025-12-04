import { Briefcase, Mail, MapPin, Phone, User } from 'lucide-react';
import { CustomerDetail } from '@/store/slices/customerSlice';

interface DemographicsCardProps {
  customer: CustomerDetail;
}

export function DemographicsCard({ customer }: DemographicsCardProps) {
  const demographicItems = [
    {
      icon: User,
      label: 'Age & Gender',
      value: `${customer.age} years old, ${customer.gender}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: customer.location,
    },
    {
      icon: Briefcase,
      label: 'Occupation',
      value: customer.occupation,
    },
    {
      icon: Mail,
      label: 'Email',
      value: customer.email,
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: customer.phone,
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <User className="h-5 w-5 text-blue-600" />
          Demographics
        </h2>
      </div>
      <div className="p-6">
        {/* Customer Name & ID */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
            <p className="text-sm text-gray-600">Customer ID: {customer.id}</p>
          </div>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {demographicItems.map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <item.icon className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
