'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased">
      <Card className="w-full max-w-sm rounded-xl border-none bg-white text-center shadow-sm">
        <CardHeader className="p-8">
          <div className="mx-auto mb-4 h-12 w-12 text-red-400 opacity-80">
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M10.29 3.86l-7 12A1 1 0 004.14 17h15.72a1 1 0 00.86-1.5l-7-12a1 1 0 00-1.43 0z"
              />
            </svg>
          </div>

          <CardTitle className="text-xl font-semibold tracking-tight text-gray-800">
            Terjadi Kesalahan
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            Kami mengalami kesalahan tak terduga. Silakan coba lagi.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-left">
              <p className="mb-1 text-sm font-medium text-red-800">Detail Error (Development):</p>
              <p className="text-xs break-words text-red-700">{error.message}</p>
              {error.digest && (
                <p className="mt-1 text-xs text-red-600">Error ID: {error.digest}</p>
              )}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              onClick={reset}
              className="h-10 w-full rounded-lg border-red-200 text-base font-medium text-red-500 shadow-sm transition-all hover:bg-red-50"
            >
              Coba Lagi
            </Button>

            <Button
              variant="ghost"
              asChild
              className="h-10 w-full rounded-lg text-sm text-gray-500 transition-all hover:bg-gray-100"
            >
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Jika masalah terus berlanjut, silakan hubungi tim dukungan.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
