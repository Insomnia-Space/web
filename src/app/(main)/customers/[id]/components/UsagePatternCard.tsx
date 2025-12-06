'use client';

import { Activity, Database, MessageSquare, PhoneCall } from 'lucide-react';
import type { Customer } from '@/types/customer-types'; 
import { cn } from '@/lib/utils'; // Pastikan cn diimpor

interface UsagePatternCardProps {
  customer: Customer;
}

// Kelas Glassmorphism Card (untuk container utama)
const glassCardClass = cn(
  "relative overflow-hidden rounded-2xl shadow-xl transition-all",
  "border border-white/20 bg-white/10 backdrop-blur-lg dark:bg-gray-900/10 dark:border-gray-800/50"
);

// Kelas Glassmorphism Header Border
const glassHeaderBorderClass = "border-b border-white/30 dark:border-gray-700/50";

// Kelas Glassmorphism Item (untuk setiap stat individual)
const glassItemClass = cn(
    "rounded-xl border border-white/30 p-4 transition-all hover:shadow-lg backdrop-blur-sm",
    "bg-white/20 dark:border-gray-700 dark:bg-gray-800/20"
);

// Kelas Background Ikon (transparan dan dark mode support)
const iconBgClass = "rounded-lg p-2 bg-white/50 dark:bg-gray-700/50";


export function UsagePatternCard({ customer }: UsagePatternCardProps) {
  const usageStats = [
    {
      icon: Database,
      label: 'Avg Data Usage',
      value: `${customer.avg_data_usage} GB`,
      description: 'per month',
      color: 'blue',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: PhoneCall,
      label: 'Call Duration',
      value: `${customer.avg_call_duration} min`,
      description: 'per month',
      color: 'green',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      icon: MessageSquare,
      label: 'SMS Count',
      value: customer.avg_sms_count.toString(),
      description: 'per month',
      color: 'purple',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    // CARD UTAMA: GLASSMORPHISM
    <div className={glassCardClass}>
      
      {/* Decorative background (Vibrancy) */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-400/10 via-pink-400/5 to-indigo-400/5 blur-3xl" />

      {/* HEADER: GLASSMORPHISM BORDER */}
      <div className={cn("px-6 py-4", glassHeaderBorderClass)}>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
          <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Usage Pattern
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {usageStats.map((stat) => {
            const Icon = stat.icon;
            return (
              // STAT ITEM: GLASSMORPHISM ITEM
              <div
                key={stat.label}
                className={glassItemClass}
              >
                <div className="flex items-center gap-3">
                  {/* Icon Circle: Background Glassmorphism */}
                  <div className={iconBgClass}>
                    <Icon className={cn("h-5 w-5", stat.textColor)} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}