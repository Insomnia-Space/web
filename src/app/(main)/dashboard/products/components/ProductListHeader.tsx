'use client';

import { Download } from 'lucide-react';

interface ProductListHeaderProps {
  totalProducts: number;
  onExport: () => void;
}

export function ProductListHeader({ totalProducts, onExport }: ProductListHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Performance Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Analisis performa {totalProducts} produk berdasarkan rekomendasi dan tingkat penerimaan
          </p>
        </div>
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>
    </div>
  );
}
