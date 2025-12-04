'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { selectPaginatedItems } from '@/store/slices/productCatalogSlice';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function ProductGridView() {
  const router = useRouter();
  const items = useAppSelector(selectPaginatedItems);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="animate-in fade-in grid grid-cols-1 gap-4 duration-300 md:grid-cols-2 lg:grid-cols-3">
      {items.map((product, idx) => (
        <div
          key={product.id}
          className="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-1 hover:scale-[1.02] hover:border-purple-300 hover:shadow-xl"
          style={{ animationDelay: `${idx * 50}ms` }}
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-10" />

          <div className="relative space-y-3">
            <div className="flex items-start justify-between">
              <Badge
                className={cn(
                  'text-[11px] font-semibold transition-all group-hover:scale-110',
                  product.category === 'Data' &&
                    'bg-blue-100 text-blue-700 group-hover:bg-blue-200',
                  product.category === 'Voice' &&
                    'bg-amber-100 text-amber-700 group-hover:bg-amber-200',
                  product.category === 'Combo' &&
                    'bg-purple-100 text-purple-700 group-hover:bg-purple-200'
                )}
              >
                {product.category}
              </Badge>
              <span className="font-mono text-[10px] text-gray-400">{product.id}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-purple-600">
                {product.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-xs text-gray-600 transition-all group-hover:line-clamp-none">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <div>
                <p className="text-[10px] font-medium text-gray-500">Harga</p>
                <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-all group-hover:opacity-100 hover:from-purple-700 hover:to-pink-700"
                onClick={e => {
                  e.stopPropagation();
                  // Handle select action
                }}
              >
                Pilih
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
