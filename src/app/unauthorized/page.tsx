'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased">
      <Card className="w-full max-w-sm rounded-xl border-none bg-white text-center shadow-sm">
        <CardHeader className="p-8">
          <div className="mx-auto mb-4 h-12 w-12 text-yellow-600 opacity-80">
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
                d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zM5 11v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>

          <CardTitle className="text-xl font-semibold tracking-tight text-gray-800">
            Akses Ditolak
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            Anda tidak memiliki izin untuk mengakses halaman ini. Silakan masuk dengan akun yang
            berwenang.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <div className="rounded-lg bg-yellow-50 p-3 text-left">
            <p className="text-xs font-medium text-gray-700">
              Halaman ini membutuhkan autentikasi atau izin khusus. Jika Anda yakin ini sebuah
              kesalahan, hubungi administrator.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              asChild
              variant="outline"
              className="h-10 w-full rounded-lg border-yellow-200 text-base font-medium text-yellow-700 shadow-sm transition-all hover:bg-yellow-50"
            >
              <Link href="/auth/signin">Masuk</Link>
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
            Butuh bantuan?{' '}
            <a
              className="text-yellow-600 hover:underline"
              href="mailto:support@telco-recommendation.com"
            >
              Hubungi tim dukungan
            </a>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
