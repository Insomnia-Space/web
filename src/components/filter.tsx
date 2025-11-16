'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterProps {
  label?: string;
  options: FilterOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  clearable?: boolean;
  className?: string;
}

export default function Filter({
  label = '',
  options = [],
  value = '',
  onChange,
  multiple = false,
  placeholder = 'Select...',
  clearable = true,
  className = '',
}: FilterProps) {
  const handleClear = () => {
    onChange(multiple ? [] : '');
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <div className="relative">
        <select
          value={value as string}
          onChange={e => onChange(e.target.value)}
          multiple={multiple}
          className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>

        {/* Clear Button */}
        {clearable && value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
