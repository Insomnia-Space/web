'use client';

import { Briefcase, MapPin, User, Calendar } from 'lucide-react';
import type { Customer } from '@/types/customer-types'; 
import { format } from 'date-fns';
import { cn } from '@/lib/utils'; // Pastikan cn diimpor

interface DemographicsCardProps {
  customer: Customer;
}

// Kelas Glassmorphism Card (untuk container utama)
const glassCardClass = cn(
  "relative overflow-hidden rounded-2xl shadow-xl transition-all",
  "border border-white/20 bg-white/10 backdrop-blur-lg dark:bg-gray-900/10 dark:border-gray-800/50"
);

// Kelas Glassmorphism Item Background (untuk ikon dan item grid)
const glassItemBackgroundClass = cn(
    "rounded-lg p-2 bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm"
);

// Kelas Glassmorphism Header Border
const glassHeaderBorderClass = "border-b border-white/30 dark:border-gray-700/50";


export function DemographicsCard({ customer }: DemographicsCardProps) {
  const demographicItems = [
    {
      icon: User,
      label: 'Age & Gender',
      value: `${customer.age} years old, ${customer.gender.charAt(0).toUpperCase() + customer.gender.slice(1)}`, // Capitalize gender
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
      icon: Calendar,
      label: 'Join Date',
      value: format(new Date(customer.join_date), 'MMMM dd, yyyy'),
    },
  ];

  return (
    // CARD UTAMA: GLASSMORPHISM
    <div className={glassCardClass}>
      
      {/* Decorative background (Vibrancy) */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-purple-400/5 blur-3xl" />
      
      {/* HEADER: GLASSMORPHISM BORDER */}
      <div className={cn("px-6 py-4", glassHeaderBorderClass)}>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Demographics
        </h2>
      </div>
      
      <div className="p-6">
        {/* Customer Name & ID */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/30 text-2xl font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{customer.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Customer ID: <span className='font-mono'>{customer.customer_code}</span></p>
          </div>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {demographicItems.map(item => (
            // GRID ITEM: SLIGHT GLASSMORPHISM EFFECT
            <div key={item.label} className="flex items-start gap-3 transition-colors hover:bg-white/20 hover:rounded-lg p-2 -m-2 dark:hover:bg-gray-700/20">
              <div className={cn(glassItemBackgroundClass, "flex-shrink-0")}>
                <item.icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}