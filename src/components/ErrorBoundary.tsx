// components/error-boundary.tsx

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Menggunakan komponen Button yang sudah ada
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // You can log to error reporting service here (e.g., Sentry, LogRocket)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      // Memastikan FallbackComponent menerima props yang dibutuhkan
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// --- Komponen Error Fallback dengan Glassmorphism ---

interface ErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  
  // Kelas Glassmorphism untuk Container Error
  const glassErrorContainerClass = cn(
    "max-w-md text-center rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300", 
    "border border-white/30 bg-white/10 dark:border-gray-800/50 dark:bg-gray-900/10"
  );

  // Kelas untuk Pesan Detail
  const glassMessageContainerClass = cn(
    "rounded-lg border p-4", 
    "border-red-500/30 bg-red-600/10 dark:border-red-700/50 dark:bg-red-900/10"
  );
  
  const accentTextColor = "text-red-600 dark:text-red-400";
  const primaryTextColor = "text-gray-800 dark:text-white";
  const detailTextColor = "text-red-800 dark:text-red-300";

  return (
    // Background Glassy
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100/50 dark:bg-gray-900/50">
      
      {/* CARD: GLASSMORPHISM */}
      <div className={cn("p-8", glassErrorContainerClass)}> 
        <div className="mx-auto mb-4 h-12 w-12 opacity-80" aria-hidden="true">
             <AlertTriangle className={cn("h-full w-full", accentTextColor)} />
        </div>

        <h1 className={cn("mb-4 text-2xl font-bold", accentTextColor)}>
          Oops! Something went wrong
        </h1>
        
        {/* MESSAGE CONTAINER: GLASSY RED */}
        <div className={cn("mb-6", glassMessageContainerClass)}>
          <p className={cn("mb-2 font-medium", detailTextColor)}>
            {error?.message || 'An unexpected error occurred'}
          </p>
          
          {process.env.NODE_ENV === 'development' && error?.stack && (
            <details className="text-left mt-3 pt-3 border-t border-red-500/20 dark:border-red-700/20">
              <summary className={cn("cursor-pointer font-medium", accentTextColor)}>
                Error Details (Development)
              </summary>
              <pre className={cn("mt-2 overflow-auto text-xs whitespace-pre-wrap break-all", detailTextColor)}>
                {error.stack}
              </pre>
            </details>
          )}
        </div>
        
        {/* BUTTON: Menggunakan Button component Glassmorphism (Blue/Indigo) */}
        <Button
          onClick={resetError}
          className={cn(
            "w-full h-10 rounded-lg text-white font-semibold transition duration-150 ease-in-out",
            "bg-indigo-600/80 hover:bg-indigo-700/90 shadow-lg shadow-indigo-500/30",
            "dark:bg-indigo-700 dark:hover:bg-indigo-800"
          )}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        
      </div>
    </div>
  );
}

// --- Hook for functional components error handling ---

export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    // eslint-disable-next-line no-console
    console.error('Error captured:', error);
    setError(error);
  }, []);

  return { error, resetError, captureError };
}