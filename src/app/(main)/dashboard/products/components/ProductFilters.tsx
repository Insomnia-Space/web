'use client';

import SearchBar from '@/components/search-bar';
import Filter from '@/components/filter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  searchTerm: string;
  minAcceptanceRate: number | null;
  minConfidenceScore: number | null;
  onSearchChange: (value: string) => void;
  onAcceptanceRateChange: (value: number | null) => void;
  onConfidenceScoreChange: (value: number | null) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  searchTerm,
  minAcceptanceRate,
  minConfidenceScore,
  onSearchChange,
  onAcceptanceRateChange,
  onConfidenceScoreChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = minAcceptanceRate !== null || minConfidenceScore !== null;

  const acceptanceRateOptions = [
    { value: '', label: 'All' },
    { value: '90', label: '≥ 90%' },
    { value: '85', label: '≥ 85%' },
    { value: '80', label: '≥ 80%' },
    { value: '75', label: '≥ 75%' },
  ];

  const confidenceScoreOptions = [
    { value: '', label: 'All' },
    { value: '90', label: '≥ 90%' },
    { value: '85', label: '≥ 85%' },
    { value: '80', label: '≥ 80%' },
    { value: '75', label: '≥ 75%' },
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="max-w-md flex-1">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Cari produk..."
            onClear={() => onSearchChange('')}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Filter
            label="Min Acceptance Rate"
            options={acceptanceRateOptions}
            value={minAcceptanceRate?.toString() || ''}
            onChange={value => onAcceptanceRateChange(value ? Number(value) : null)}
            clearable={true}
            className="w-full sm:w-48"
          />

          <Filter
            label="Min Confidence Score"
            options={confidenceScoreOptions}
            value={minConfidenceScore?.toString() || ''}
            onChange={value => onConfidenceScoreChange(value ? Number(value) : null)}
            clearable={true}
            className="w-full sm:w-48"
          />

          {hasActiveFilters && (
            <div className="flex items-end">
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
