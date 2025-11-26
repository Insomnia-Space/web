'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/stat-card';
import { Calendar, Clock, DollarSign, Tag } from 'lucide-react';
import type { ProductDetail } from '@/types/product.types';

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
          <StatCard
            label="Price"
            value={`Rp ${product.price.toLocaleString('id-ID')}`}
            icon={<DollarSign className="h-4 w-4" />}
            description="per month"
          />
          <StatCard label="Category" value={product.category} icon={<Tag className="h-4 w-4" />} />
          <StatCard
            label="Created Date"
            value={new Date(product.createdAt).toLocaleDateString('id-ID')}
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            label="Last Updated"
            value={new Date(product.updatedAt).toLocaleDateString('id-ID')}
            icon={<Clock className="h-4 w-4" />}
          />
        </div>

        {product.description && (
          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium">Description</h4>
            <p className="text-muted-foreground text-sm">{product.description}</p>
          </div>
        )}

        {product.features && product.features.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium">Features</h4>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
