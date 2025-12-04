import { Activity, Database, MessageSquare, PhoneCall } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { CustomerDetail } from '@/store/slices/customerSlice';

interface UsagePatternCardProps {
  customer: CustomerDetail;
}

export function UsagePatternCard({ customer }: UsagePatternCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Activity className="h-5 w-5 text-purple-600" />
          Usage Pattern
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            label="Avg Data Usage"
            value={`${customer.avgDataUsage} GB`}
            description="per month"
            icon={<Database className="h-5 w-5 text-blue-600" />}
            className="bg-blue-50"
          />
          <StatCard
            label="Call Duration"
            value={customer.callDuration}
            description="minutes/month"
            icon={<PhoneCall className="h-5 w-5 text-green-600" />}
            className="bg-green-50"
          />
          <StatCard
            label="SMS Count"
            value={customer.smsCount}
            description="messages/month"
            icon={<MessageSquare className="h-5 w-5 text-purple-600" />}
            className="bg-purple-50"
          />
        </div>
      </div>
    </div>
  );
}
