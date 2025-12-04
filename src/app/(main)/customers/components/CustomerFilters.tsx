import SearchBar from '@/components/search-bar';
import { Filter } from 'lucide-react';

interface CustomerFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  filterStatus: 'All' | 'Active' | 'Churned';
  onFilterChange: (status: 'All' | 'Active' | 'Churned') => void;
  loading?: boolean;
}

export function CustomerFilters({
  searchTerm,
  onSearchChange,
  onSearchClear,
  filterStatus,
  onFilterChange,
  loading = false,
}: CustomerFiltersProps) {
  const statusOptions: Array<'All' | 'Active' | 'Churned'> = ['All', 'Active', 'Churned'];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search Bar */}
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onClear={onSearchClear}
        placeholder="Search by Customer ID or Name..."
        loading={loading}
        className="flex-1 md:max-w-md"
      />

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Status:</span>
        <div className="flex gap-2">
          {statusOptions.map(status => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
