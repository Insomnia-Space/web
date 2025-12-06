'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Database, Phone, MessageSquare } from 'lucide-react';
import type { ProductDetail } from '@/types/product-types';

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
        {product.data_quota && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Data Quota</p>
              <p className="text-lg font-bold text-gray-900">{product.data_quota}</p>
            </div>
          </div>
        )}

        {product.call_minutes && product.call_minutes !== '0' && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-green-100 p-2">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Call Minutes</p>
              <p className="text-lg font-bold text-gray-900">{product.call_minutes}</p>
            </div>
          </div>
        )}

        {product.sms_count && product.sms_count !== '0' && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-purple-100 p-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">SMS Count</p>
              <p className="text-lg font-bold text-gray-900">{product.sms_count}</p>
            </div>
          </div>
        )}

        {product.validity_days && (
          <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-4">
            <div className="rounded-full bg-amber-100 p-2">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Validity Period</p>
              <p className="text-lg font-bold text-gray-900">{product.validity_days} days</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}