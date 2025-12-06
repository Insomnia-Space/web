'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ModelInfo } from '@/types/dashboard-types';
import { Brain, Calendar, Database, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelInfoCardProps {
  modelInfo: ModelInfo;
}

export function ModelInfoCard({ modelInfo }: ModelInfoCardProps) {
  const statusColors = {
    active: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/30',
    inactive: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0 shadow-lg shadow-gray-500/30',
    training: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg shadow-amber-500/30',
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-2.5 shadow-lg shadow-purple-500/20">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">ML Model Info</CardTitle>
              <CardDescription className="text-xs">{modelInfo.model_type.replace(/_/g, ' ')}</CardDescription>
            </div>
          </div>
          <Badge className={cn('capitalize px-3 py-1', statusColors[modelInfo.status])}>
            {modelInfo.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Version */}
        <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Version</p>
          <p className="mt-2 font-mono text-lg font-bold text-gray-900">{modelInfo.model_version}</p>
        </div>

        {/* Metrics */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-700">
            <div className="rounded-lg bg-green-100 p-1">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            Performance Metrics
          </h4>
          <div className="grid grid-cols-2 gap-2.5">
            {Object.entries(modelInfo.metrics).map(([key, value]) => (
              <div key={key} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-3 shadow-sm transition-all hover:shadow-md">
                <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-blue-200/20 blur-xl" />
                <div className="relative">
                  <p className="text-xs font-medium capitalize text-gray-600">{key.replace(/_/g, ' ')}</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">{Number(value).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Data */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-700">
            <div className="rounded-lg bg-blue-100 p-1">
              <Database className="h-4 w-4 text-blue-600" />
            </div>
            Training Data
          </h4>
          <div className="space-y-2 rounded-xl bg-gradient-to-br from-indigo-50/50 to-blue-50/50 p-4 shadow-sm">
            <div className="flex justify-between">
              <span className="text-xs font-medium text-gray-600">Total Samples</span>
              <span className="text-sm font-bold text-gray-900">
                {modelInfo.training_data.total_samples.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-medium text-gray-600">Training</span>
              <span className="text-sm font-bold text-gray-900">
                {modelInfo.training_data.training_samples.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-medium text-gray-600">Validation</span>
              <span className="text-sm font-bold text-gray-900">
                {modelInfo.training_data.validation_samples.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-2.5 rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-white p-1.5 shadow-sm">
              <Calendar className="h-3.5 w-3.5 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Last Training</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(modelInfo.last_training_date).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-white p-1.5 shadow-sm">
              <Calendar className="h-3.5 w-3.5 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">Next Training</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(modelInfo.next_training_scheduled).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}