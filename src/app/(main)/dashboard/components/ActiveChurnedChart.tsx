'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ActiveChurnedRatio } from '@/types/dashboard-types';
import { Users, UserX } from 'lucide-react';

interface ActiveChurnedChartProps {
  ratio: ActiveChurnedRatio;
}

export function ActiveChurnedChart({ ratio }: ActiveChurnedChartProps) {
  const total = ratio.active + ratio.churned;
  
  const activePercentage = total === 0 ? 0 : (ratio.active / total) * 100;
  const churnedPercentage = total === 0 ? 0 : (ratio.churned / total) * 100;

  const circumference = 2 * Math.PI * 40;
  const activeDashOffset = (activePercentage * circumference) / 100;
  const churnedDashOffset = (churnedPercentage * circumference) / 100;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 shadow-lg shadow-green-500/20">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Customer Retention</CardTitle>
            <CardDescription className="text-xs">Active vs churned overview</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Donut Chart with enhanced styling */}
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100/50 to-red-100/50 blur-xl" />
              
              <svg className="relative h-full w-full -rotate-90 transform drop-shadow-lg" viewBox="0 0 100 100">
                {/* Active Arc with gradient */}
                <defs>
                  <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="churnedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#activeGradient)"
                  strokeWidth="16"
                  strokeDasharray={`${activeDashOffset} ${circumference}`}
                  className="transition-all duration-700"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#churnedGradient)"
                  strokeWidth="16"
                  strokeDasharray={`${churnedDashOffset} ${circumference}`}
                  strokeDashoffset={`-${activeDashOffset}`}
                  className="transition-all duration-700"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-gray-900">{activePercentage.toFixed(1)}%</p>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Active</p>
              </div>
            </div>
          </div>

          {/* Legend with enhanced cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-sm transition-all hover:shadow-lg">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-green-200/30 blur-2xl" />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-sm" />
                    <span className="text-xs font-semibold text-gray-700">Active</span>
                  </div>
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{ratio.active.toLocaleString()}</p>
                <p className="mt-1 text-xs font-medium text-gray-500">{activePercentage.toFixed(1)}% of total</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-red-50 to-rose-50 p-4 shadow-sm transition-all hover:shadow-lg">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-red-200/30 blur-2xl" />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-sm" />
                    <span className="text-xs font-semibold text-gray-700">Churned</span>
                  </div>
                  <UserX className="h-4 w-4 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{ratio.churned.toLocaleString()}</p>
                <p className="mt-1 text-xs font-medium text-gray-500">{churnedPercentage.toFixed(1)}% of total</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}