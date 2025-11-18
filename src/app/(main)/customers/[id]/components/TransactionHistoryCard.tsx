import { Calendar, TrendingUp } from 'lucide-react';
import { Transaction } from '@/store/slices/customerSlice';

interface TransactionHistoryCardProps {
  transactions: Transaction[];
}

export function TransactionHistoryCard({ transactions }: TransactionHistoryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          Transaction History
        </h2>
        <p className="mt-1 text-xs text-gray-600">Last 5 transactions</p>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{transaction.product}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(transaction.date)}
                  </div>
                </div>
                <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                  #{index + 1}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                <span className="text-xs text-gray-600">Transaction ID:</span>
                <span className="text-xs font-medium text-gray-900">{transaction.id}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">Amount:</span>
                <span className="text-sm font-bold text-green-600">
                  {formatCurrency(transaction.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
