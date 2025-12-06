// app/(public)/not-found/page.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn

// --- Kelas Glassmorphism & Utilitas ---

// Kelas Glassmorphism untuk Card container
const glassCardContainerClass = cn(
  "w-full max-w-sm rounded-xl shadow-2xl backdrop-blur-md", 
  "border border-white/30 bg-white/10 dark:border-gray-800/50 dark:bg-gray-900/10" // Glassmorphism Core
);

// Kelas Glassmorphism untuk Button Outline (Cek Ulang)
const glassButtonOutlineClass = cn(
  "h-10 w-full rounded-lg border-blue-400/50 text-base font-medium text-blue-500 shadow-md transition-all",
  "bg-blue-600/10 hover:bg-blue-600/20 dark:border-blue-500/30 dark:bg-blue-900/10 dark:hover:bg-blue-900/20"
);

// Kelas Glassmorphism untuk Button Ghost (Kembali ke Beranda)
const glassButtonGhostClass = cn(
    "h-10 w-full rounded-lg text-sm transition-all",
    "text-gray-600 hover:bg-white/20 dark:text-gray-300 dark:hover:bg-gray-700/50"
);

// Kelas untuk Link Bantuan (Glassy Accent)
const glassHelpBoxClass = cn(
    "rounded-lg p-3 text-left border border-white/20",
    "bg-blue-600/10 dark:bg-blue-900/10 dark:border-gray-700/50"
);

// Kelas Teks (untuk Dark Mode)
const primaryTextClass = "text-gray-800 dark:text-white";
const secondaryTextClass = "text-gray-500 dark:text-gray-400";
const helpTextClass = "text-gray-700 dark:text-gray-300";
const accentColorClass = "text-blue-500 dark:text-blue-400";

// ---------------------------------------------

export default function NotFoundPage() {
  return (
    // CONTAINER BACKGROUND: Memberikan latar belakang yang sedikit transparan untuk efek blur
    <div className="flex min-h-screen items-center justify-center bg-gray-100/50 p-4 font-sans antialiased dark:bg-gray-900/50">
      
      {/* CARD CONTAINER: GLASSMORPHISM */}
      <Card className={glassCardContainerClass}>
        <CardHeader className="p-8">
          {/* ICON: Menggunakan warna aksen Glassmorphism */}
          <div className="mx-auto mb-4 h-12 w-12 opacity-80">
            <Search className={cn("h-full w-full", accentColorClass)} />
          </div>

          <CardTitle className={cn("text-2xl font-semibold tracking-tight", primaryTextClass)}>
            404 — Halaman Tidak Ditemukan
          </CardTitle>
          <CardDescription className={cn("mt-1 text-sm", secondaryTextClass)}>
            Maaf, halaman yang Anda cari tidak ditemukan. Coba periksa kembali URL atau kembali ke
            beranda.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <div className="space-y-3 pt-2">
            {/* BUTTON 1: CEK ULANG (GLASSMORPHISM OUTLINE) */}
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className={glassButtonOutlineClass}
            >
              Cek Ulang
            </Button>

            {/* BUTTON 2: KEMBALI KE BERANDA (GLASSMORPHISM GHOST) */}
            <Button
              variant="ghost"
              asChild
              className={glassButtonGhostClass}
            >
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>

          {/* HELP/LINK BOX: GLASSY BACKGROUND */}
          <div className={glassHelpBoxClass}>
            <p className={cn("text-xs font-medium", helpTextClass)}>
              Berikut beberapa halaman yang mungkin membantu:
            </p>
            <div className="mt-2 space-y-1">
              <Link
                href="/auth/signin"
                className={cn("block text-sm hover:underline", accentColorClass)}
              >
                Masuk
              </Link>
              <Link
                href="/recommendations"
                className={cn("block text-sm hover:underline", accentColorClass)}
              >
                Rekomendasi
              </Link>
              <Link
                href="/dashboard"
                className={cn("block text-sm hover:underline", accentColorClass)}
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className={cn("mt-4 text-xs", secondaryTextClass)}>
            Jika masalah berlanjut,{' '}
            <a
              className={cn(accentColorClass, "hover:underline")}
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