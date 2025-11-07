'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased">
      <Card className="w-full max-w-sm rounded-xl border-none bg-white text-center shadow-sm">
        <CardHeader className="p-8">
          <div className="mx-auto mb-4 h-12 w-12 text-blue-500 opacity-80">
            <Search className="h-full w-full" />
          </div>

          <CardTitle className="text-2xl font-semibold tracking-tight text-gray-800">
            404 — Halaman Tidak Ditemukan
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            Maaf, halaman yang Anda cari tidak ditemukan. Coba periksa kembali URL atau kembali ke
            beranda.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="h-10 w-full rounded-lg border-blue-200 text-base font-medium text-blue-500 shadow-sm transition-all hover:bg-blue-50"
            >
              Cek Ulang
            </Button>

            <Button
              variant="ghost"
              asChild
              className="h-10 w-full rounded-lg text-sm text-gray-500 transition-all hover:bg-gray-100"
            >
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>

          <div className="rounded-lg bg-blue-50 p-3 text-left">
            <p className="text-xs font-medium text-gray-700">
              Berikut beberapa halaman yang mungkin membantu:
            </p>
            <div className="mt-2 space-y-1">
              <Link
                href="/auth/signin"
                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Masuk
              </Link>
              <Link
                href="/recommendations"
                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Rekomendasi
              </Link>
              <Link
                href="/dashboard"
                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Jika masalah berlanjut,{' '}
            <a
              className="text-blue-600 hover:underline"
              href="mailto:support@telco-recommendation.com"
            >
              hubungi tim dukungan
            </a>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
