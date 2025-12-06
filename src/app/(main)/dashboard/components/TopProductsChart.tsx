'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TopProduct } from '@/types/dashboard-types';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopProductsChartProps {
  products: TopProduct[];
}

const categoryColors = {
  data: 'bg-blue-500/10 text-blue-700 border-blue-200',
  voice: 'bg-amber-500/10 text-amber-700 border-amber-200',
  combo: 'bg-purple-500/10 text-purple-700 border-purple-200',
  addon: 'bg-green-500/10 text-green-700 border-green-200',
};

const barGradients = [
  'from-blue-400 via-blue-500 to-blue-600',
  'from-purple-400 via-purple-500 to-purple-600',
  'from-pink-400 via-pink-500 to-pink-600',
  'from-indigo-400 via-indigo-500 to-indigo-600',
  'from-cyan-400 via-cyan-500 to-cyan-600',
];

export function TopProductsChart({ products }: TopProductsChartProps) {
  const maxRecommendations = Math.max(...products.map(p => p.times_recommended), 1);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 shadow-lg shadow-blue-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Top Recommended Products</CardTitle>
            <CardDescription className="text-xs">Products with highest recommendations</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {products.map((product, index) => {
            const percentage = (product.times_recommended / maxRecommendations) * 100;
            
            return (
              <div key={product.product_id} className="group space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-bold text-gray-700 shadow-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {product.product_name}
                      </p>
                      <Badge className={cn('mt-0.5 border text-xs font-medium', categoryColors[product.category])}>
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {product.times_recommended}
                    </p>
                    <p className="text-xs font-medium text-gray-400">
                      {product.avg_confidence}% confidence
                    </p>
                  </div>
                </div>
                <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-700 ease-out group-hover:shadow-md',
                      barGradients[index % barGradients.length]
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}