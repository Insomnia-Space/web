'use client';

interface ProductPerformance {
  id: number;
  productName: string;
  timesRecommended: number;
  avgConfidenceScore: number;
  acceptanceRate: number;
}

interface ProductTableRowProps {
  product: ProductPerformance;
  index: number;
}

export function ProductTableRow({ product, index }: ProductTableRowProps) {
  const getAcceptanceBadgeColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-100 text-green-800';
    if (rate >= 85) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            {index + 1}
          </div>
          <div className="text-sm font-medium text-gray-900">{product.productName}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {product.timesRecommended.toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2 text-sm font-medium text-gray-900">
            {(product.avgConfidenceScore * 100).toFixed(1)}%
          </div>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${product.avgConfidenceScore * 100}%` }}
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getAcceptanceBadgeColor(product.acceptanceRate)}`}
        >
          {product.acceptanceRate.toFixed(1)}%
        </span>
      </td>
    </tr>
  );
}
