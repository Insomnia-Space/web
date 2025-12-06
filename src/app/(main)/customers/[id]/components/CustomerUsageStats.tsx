'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Phone, MessageSquare, CreditCard, Video, Navigation, AlertCircle } from 'lucide-react';
import type { Customer } from '@/types/customer-types';

interface CustomerUsageStatsProps {
  customer: Customer;
}

export function CustomerUsageStats({ customer }: CustomerUsageStatsProps) {
  const stats = [
    {
      title: 'Data Usage',
      value: `${customer.avg_data_usage} GB`,
      subtitle: 'Average monthly',
      icon: Wifi,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Call Duration',
      value: `${customer.avg_call_duration} min`,
      subtitle: 'Average monthly',
      icon: Phone,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'SMS Count',
      value: customer.avg_sms_count.toString(),
      subtitle: 'Average monthly',
      icon: MessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'Monthly Spend',
      value: `Rp ${customer.monthly_spend.toLocaleString('id-ID')}`,
      subtitle: 'Average amount',
      icon: CreditCard,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      title: 'Video Usage',
      value: `${customer.pct_video_usage}%`,
      subtitle: 'Of total data',
      icon: Video,
      color: 'pink',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
    },
    {
      title: 'Top-up Frequency',
      value: customer.topup_freq.toString(),
      subtitle: 'Times per month',
      icon: CreditCard,
      color: 'indigo',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
    {
      title: 'Travel Score',
      value: customer.travel_score.toString(),
      subtitle: 'Mobility indicator',
      icon: Navigation,
      color: 'teal',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-600',
    },
    {
      title: 'Complaints',
      value: customer.complaint_count.toString(),
      subtitle: 'Total recorded',
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md"
              >
                <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}