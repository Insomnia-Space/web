'use client';

import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label = '',
      error = '',
      helperText = '',
      required = false,
      disabled = false,
      rows = 4,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={cn(
            'block w-full resize-none rounded-lg border px-3 py-2 transition-colors duration-200',
            'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300',
            disabled && 'cursor-not-allowed bg-gray-100 opacity-60',
            className
          )}
          {...props}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';

export default TextareaField;
