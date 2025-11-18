import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CustomerDetailHeaderProps {
  customerId: string;
  onGenerateRecommendation: () => void;
  isGenerating?: boolean;
}

export function CustomerDetailHeader({
  onGenerateRecommendation,
  isGenerating = false,
}: CustomerDetailHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <Link
        href="/customers"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customer List
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Detail View</h1>
          <p className="mt-1 text-sm text-gray-600">Complete profile and activity information</p>
        </div>
        <button
          onClick={onGenerateRecommendation}
          disabled={isGenerating}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Recommendation'}
        </button>
      </div>
    </>
  );
}
