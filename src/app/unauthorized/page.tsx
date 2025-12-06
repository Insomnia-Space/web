// app/(public)/unauthorized/page.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Import cn

// --- Kelas Glassmorphism & Utilitas ---

// Kelas Glassmorphism untuk Card container
const glassCardContainerClass = cn(
  "w-full max-w-sm rounded-xl shadow-2xl backdrop-blur-md", 
  "border border-white/30 bg-white/10 dark:border-gray-800/50 dark:bg-gray-900/10" // Glassmorphism Core
);

// Kelas Glassmorphism untuk Button Primary (Masuk) - Yellow Accent
const glassButtonPrimaryClass = cn(
  "h-10 w-full rounded-lg text-base font-medium shadow-md transition-all",
  "text-yellow-700 border-yellow-400/50 bg-yellow-600/10 hover:bg-yellow-600/20",
  "dark:text-yellow-400 dark:border-yellow-500/30 dark:bg-yellow-900/10 dark:hover:bg-yellow-900/20"
);

// Kelas Glassmorphism untuk Button Ghost (Kembali ke Beranda)
const glassButtonGhostClass = cn(
    "h-10 w-full rounded-lg text-sm transition-all",
    "text-gray-600 hover:bg-white/20 dark:text-gray-300 dark:hover:bg-gray-700/50"
);

// Kelas untuk Info Izin (Glassy Accent)
const glassInfoBoxClass = cn(
    "rounded-lg p-3 text-left",
    "bg-yellow-600/10 dark:bg-yellow-900/10"
);

// Kelas Teks (untuk Dark Mode)
const primaryTextClass = "text-gray-800 dark:text-white";
const secondaryTextClass = "text-gray-500 dark:text-gray-400";
const infoTextClass = "text-gray-700 dark:text-gray-300";
const accentColorClass = "text-yellow-600 dark:text-yellow-400";

// ---------------------------------------------

export default function UnauthorizedPage() {
  return (
    // CONTAINER BACKGROUND: Memberikan latar belakang yang sedikit transparan untuk efek blur
    <div className="flex min-h-screen items-center justify-center bg-gray-100/50 p-4 font-sans antialiased dark:bg-gray-900/50">
      
      {/* CARD CONTAINER: GLASSMORPHISM */}
      <Card className={glassCardContainerClass}>
        <CardHeader className="p-8">
          {/* ICON: Menggunakan warna aksen Glassmorphism */}
          <div className="mx-auto mb-4 h-12 w-12 opacity-80">
            <User className={cn("h-full w-full", accentColorClass)} />
          </div>

          <CardTitle className={cn("text-xl font-semibold tracking-tight", primaryTextClass)}>
            Akses Ditolak
          </CardTitle>
          <CardDescription className={cn("mt-1 text-sm", secondaryTextClass)}>
            Anda tidak memiliki izin untuk mengakses halaman ini. Silakan masuk dengan akun yang
            berwenang.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {/* INFO BOX: GLASSY BACKGROUND */}
          <div className={glassInfoBoxClass}>
            <p className={cn("text-xs font-medium", infoTextClass)}>
              Halaman ini membutuhkan autentikasi atau izin khusus. Jika Anda yakin ini sebuah
              kesalahan, hubungi administrator.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* BUTTON 1: MASUK (GLASSMORPHISM PRIMARY/OUTLINE) */}
            <Button
              asChild
              variant="outline" // Menggunakan outline karena ini adalah halaman error/notif
              className={glassButtonPrimaryClass}
            >
              <Link href="/auth/signin">Masuk</Link>
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

          <div className={cn("mt-4 text-xs", secondaryTextClass)}>
            Butuh bantuan?{' '}
            <a
              className={cn(accentColorClass, "hover:underline")}
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