'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/loading-spinner';
import { RecommendationService } from '@/services/recommendation.service';
import { ProductService } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/product-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OverrideRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendationId: string;
}

export function OverrideRecommendationModal({
  isOpen,
  onClose,
  recommendationId,
}: OverrideRecommendationModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    override_reason: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await ProductService.getAll({ page: 1, limit: 100 });
      setProducts(response.products);
    } catch (err) {
      // ✅ Fixed: Removed console.error and proper error handling
      if (err instanceof Error) {
        setError('Failed to load products. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.product_id || !formData.override_reason.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await RecommendationService.override(recommendationId, formData);
      handleClose();
      router.refresh();
    } catch (err) {
      // ✅ Fixed: Proper error handling without 'any'
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to override recommendation');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      product_id: '',
      override_reason: '',
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Override Recommendation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="product_id">Select Product *</Label>
            {loadingProducts ? (
              <div className="flex items-center justify-center py-4">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <Select
                value={formData.product_id}
                onValueChange={(value) => setFormData({ ...formData, product_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - Rp {Number(product.price).toLocaleString('id-ID')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="override_reason">Reason for Override *</Label>
            <Textarea
              id="override_reason"
              rows={4}
              value={formData.override_reason}
              onChange={(e) => setFormData({ ...formData, override_reason: e.target.value })}
              placeholder="Explain why you're overriding the recommendation..."
              required
            />
          </div>

          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
            ⚠️ This will replace the AI-generated recommendation with your manual selection.
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || loadingProducts} variant="destructive">
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Overriding...
                </>
              ) : (
                'Override Recommendation'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}