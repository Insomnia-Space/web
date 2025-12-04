'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock as ClockIcon, Database, FileText } from 'lucide-react';
import type { ProductDetail } from '@/types/product.types';

interface ProductSpecsCardProps {
  product: ProductDetail;
}

export function ProductSpecsCard({ product }: ProductSpecsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Package Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.quota && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Quota</p>
              <p className="text-lg font-bold text-gray-900">{product.quota}</p>
            </div>
          </div>
        )}

        {product.validity && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-green-100 p-2">
              <ClockIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Validity Period</p>
              <p className="text-lg font-bold text-gray-900">{product.validity}</p>
            </div>
          </div>
        )}

        {product.terms && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-amber-100 p-2">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Terms & Conditions</p>
              <p className="text-sm text-gray-600">{product.terms}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
