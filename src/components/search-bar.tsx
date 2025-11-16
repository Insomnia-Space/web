'use client';

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  loading?: boolean;
  debounce?: number;
  className?: string;
}

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search...',
  onClear,
  loading = false,
  debounce = 300,
  className = '',
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue);
    }, debounce);

    return () => clearTimeout(timer);
  }, [internalValue, debounce, onChange]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={internalValue}
        onChange={e => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-gray-300 py-2 pr-10 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {internalValue && !loading && onClear && (
        <button
          onClick={() => {
            setInternalValue('');
            onClear();
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
