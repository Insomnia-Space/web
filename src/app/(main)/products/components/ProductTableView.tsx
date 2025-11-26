'use client';

import { Table } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { selectPaginatedItems } from '@/store/slices/productCatalogSlice';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/product.types';
import { cn } from '@/lib/utils';

export function ProductTableView() {
  const router = useRouter();
  const items = useAppSelector(selectPaginatedItems);
  const { loading } = useAppSelector(state => state.product);

  const columns = [
    {
      key: 'id',
      label: 'Product ID',
      width: '150px',
      render: (item: Product) => <span className="font-mono text-xs text-gray-500">{item.id}</span>,
    },
    {
      key: 'name',
      label: 'Name',
      render: (item: Product) => (
        <div className="space-y-0.5">
          <p className="font-bold text-gray-800">{item.name}</p>
          <p className="text-[10px] font-medium text-gray-400">Product</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (item: Product) => (
        <Badge
          className={cn(
            'text-xs font-semibold',
            item.category === 'Data' && 'bg-blue-100 text-blue-700',
            item.category === 'Voice' && 'bg-amber-100 text-amber-700',
            item.category === 'Combo' && 'bg-purple-100 text-purple-700'
          )}
        >
          {item.category}
        </Badge>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      width: '150px',
      render: (item: Product) => (
        <div className="space-y-0.5">
          <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-base font-bold text-transparent">
            Rp {item.price.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] text-gray-400">per bulan</p>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (item: Product) => (
        <p className="line-clamp-2 text-xs text-gray-600">{item.description}</p>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      width: '120px',
      align: 'right' as const,
      render: (_item: Product) => (
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={e => {
            e.stopPropagation();
            // Handle select action
          }}
        >
          Pilih
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-in fade-in overflow-x-auto rounded-xl border border-gray-200 duration-300">
      <Table
        columns={columns}
        data={items}
        loading={loading}
        emptyMessage="Tidak ada produk yang cocok"
        onRowClick={item => router.push(`/products/${item.id}`)}
        hoverable
        striped
      />
    </div>
  );
}
