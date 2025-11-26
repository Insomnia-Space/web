'use client';

import { ArrowLeft, Edit, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import type { ProductDetail } from '@/types/product.types';
import { cn } from '@/lib/utils';

interface ProductDetailHeaderProps {
  product: ProductDetail;
  onEdit?: () => void;
  onDelete?: () => void;
  onPurchase?: () => void;
}

export function ProductDetailHeader({
  product,
  onEdit,
  onDelete,
  onPurchase,
}: ProductDetailHeaderProps) {
  const router = useRouter();

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
          <Badge
            className={cn(
              'text-sm font-semibold',
              product.category === 'Data' && 'bg-blue-100 text-blue-700',
              product.category === 'Voice' && 'bg-amber-100 text-amber-700',
              product.category === 'Combo' && 'bg-purple-100 text-purple-700'
            )}
          >
            {product.category}
          </Badge>
        </div>
        <p className="text-muted-foreground">ID: {product.id}</p>
      </div>
      <div className="flex gap-2">
        {onPurchase && (
          <Button
            onClick={onPurchase}
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Purchase
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button onClick={onDelete} variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
