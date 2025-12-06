// app/(main)/recommendation-history/[id]/components/RecommendationProductList.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Repeat } from 'lucide-react';
import type { RecommendationProduct } from '@/types/recommendation.types';
import { cn } from '@/lib/utils';

interface RecommendationProductListProps {
  products: RecommendationProduct[];
  onOverride?: () => void;
  canOverride?: boolean;
}

const categoryColors = {
  data: 'bg-blue-100 text-blue-700',
  voice: 'bg-amber-100 text-amber-700',
  combo: 'bg-purple-100 text-purple-700',
  addon: 'bg-green-100 text-green-700',
};

export function RecommendationProductList({
  products,
  onOverride,
  canOverride,
}: RecommendationProductListProps) {
  // Sort by rank_order
  const sortedProducts = [...products].sort((a, b) => a.rank_order - b.rank_order);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Recommended Products ({products.length})
          </CardTitle>
          {canOverride && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOverride}
              className="gap-2"
            >
              <Repeat className="h-4 w-4" />
              Override
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedProducts.map((product, _index) => {
            const isTopRecommendation = product.rank_order === 1;
            
            return (
              <div
                key={product.id}
                className={cn(
                  'group relative rounded-xl border p-5 transition-all hover:shadow-md',
                  isTopRecommendation
                    ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                )}
              >
                {isTopRecommendation && (
                  <div className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <Trophy className="h-3 w-3" />
                    Top Pick
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
                        #{product.rank_order}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {product.product_name}
                        </h3>
                        <p className="text-xs text-gray-500">{product.description}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge className={cn('text-xs', categoryColors[product.category])}>
                        {product.category}
                      </Badge>
                      <span className="text-sm font-mono text-gray-500">
                        ID: {product.product_id.slice(0, 8)}...
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                      <span className="font-medium text-gray-700">Reasoning:</span>{' '}
                      {product.reasoning}
                    </p>
                  </div>

                  <div className="ml-4 text-right">
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div
                      className={cn(
                        'flex items-center justify-end gap-1 rounded-full px-3 py-1',
                        product.confidence_score >= 80
                          ? 'bg-green-100 text-green-700'
                          : product.confidence_score >= 50
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      )}
                    >
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-bold">
                        {product.confidence_score}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}