'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label = '',
      type = 'text',
      error = '',
      helperText = '',
      icon = null,
      required = false,
      disabled = false,
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

        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div className="h-5 w-5 text-gray-400">{icon}</div>
            </div>
          )}

          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              'block w-full rounded-lg border px-3 py-2 transition-colors duration-200',
              'focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
              icon && 'pl-10',
              error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300',
              disabled && 'cursor-not-allowed bg-gray-100 opacity-60',
              className
            )}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
