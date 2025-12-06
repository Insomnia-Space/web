'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ProductPerformance } from '@/types/dashboard-types';
import { Download, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardService } from '@/services/dashboard.service';
import { toast } from 'sonner';

interface ProductPerformanceTableProps {
  products: ProductPerformance[];
}

const categoryColors = {
  data: 'bg-blue-50 text-blue-700 border-blue-100',
  voice: 'bg-amber-50 text-amber-700 border-amber-100',
  combo: 'bg-purple-50 text-purple-700 border-purple-100',
  addon: 'bg-green-50 text-green-700 border-green-100',
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-600',
};

export function ProductPerformanceTable({ products }: ProductPerformanceTableProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await DashboardService.exportProductPerformance();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `product-performance-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Product performance exported successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export data';
      toast.error(message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card className="border-gray-100 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Top performing products overview</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={exporting}
            className="gap-2 border-gray-200 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold text-gray-600">
                <th className="pb-3 pr-4">Product</th>
                <th className="pb-3 px-2">Category</th>
                <th className="pb-3 px-2 text-right">Price</th>
                <th className="pb-3 px-2 text-center">Recommended</th>
                <th className="pb-3 px-2 text-center">Confidence</th>
                <th className="pb-3 px-2 text-right">Revenue</th>
                <th className="pb-3 pl-2 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const TrendIcon = trendIcons[product.trend];
                return (
                  <tr key={product.product_id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="text-sm font-medium text-gray-900">{product.product_name}</p>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className={cn('border text-xs', categoryColors[product.category])}>
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </p>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {product.times_recommended}x
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {product.avg_confidence}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        Rp {product.revenue_potential.toLocaleString('id-ID')}
                      </p>
                    </td>
                    <td className="py-3 pl-2 text-center">
                      <TrendIcon className={cn('inline h-4 w-4', trendColors[product.trend])} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}