// app/(main)/recommendation-history/components/RecommendationListHeader.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';
import { GenerateRecommendationModal } from './GenerateRecommendationModal';

interface RecommendationListHeaderProps {
  onRefresh: () => void;
  loading?: boolean;
}

export function RecommendationListHeader({ onRefresh, loading }: RecommendationListHeaderProps) {
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between rounded-xl p-6">
        <div>
          <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-800">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Recommendation History
          </h1>
          <p className="text-sm text-gray-600">
            View and manage AI-generated product recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowGenerateModal(true)}
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Sparkles className="h-4 w-4" />
            Generate New
          </Button>
        </div>
      </div>

      <GenerateRecommendationModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
      />
    </>
  );
}