'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, DollarSign, Tag } from 'lucide-react';
import type { ProductDetail } from '@/types/product-types';

interface ProductInfoCardProps {
  product: ProductDetail;
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="rounded-full bg-green-100 p-2">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-lg font-bold">
                Rp {Number(product.price).toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Tag className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="text-lg font-bold capitalize">{product.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="rounded-full bg-purple-100 p-2">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-sm font-medium">
                {new Date(product.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="rounded-full bg-orange-100 p-2">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium">
                {new Date(product.updated_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {product.description && (
          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}