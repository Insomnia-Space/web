'use client';

import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import type { ProductDetail } from '@/types/product-types';
import { cn } from '@/lib/utils';

interface ProductDetailHeaderProps {
  product: ProductDetail;
  onEdit?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
}

export function ProductDetailHeader({
  product,
  onEdit,
  onDelete,
  deleting = false,
}: ProductDetailHeaderProps) {
  const router = useRouter();

  const categoryColors = {
    data: 'bg-blue-100 text-blue-700',
    voice: 'bg-amber-100 text-amber-700',
    combo: 'bg-purple-100 text-purple-700',
    addon: 'bg-green-100 text-green-700',
  };

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <Button
          variant="ghost"
          onClick={() => router.push('/products')}
          className="mb-2 gap-2 px-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Product Catalog
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Badge className={cn('text-sm font-semibold capitalize', categoryColors[product.category])}>
            {product.category}
          </Badge>
          {product.is_active === 1 ? (
            <Badge variant="default" className="bg-green-500">
              Active
            </Badge>
          ) : (
            <Badge variant="secondary">Inactive</Badge>
          )}
        </div>
        <p className="text-muted-foreground">Code: {product.product_code}</p>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <Button onClick={onEdit} variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button onClick={onDelete} variant="destructive" className="gap-2" disabled={deleting}>
            <Trash2 className="h-4 w-4" />
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </div>
    </div>
  );
}