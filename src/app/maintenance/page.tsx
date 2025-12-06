// app/(public)/maintenance/page.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

// Kelas Glassmorphism untuk Button Ghost (Hubungi Dukungan)
const glassButtonGhostClass = cn(
    "h-10 w-full rounded-lg text-sm transition-all",
    "text-gray-600 hover:bg-white/20 dark:text-gray-300 dark:hover:bg-gray-700/50"
);

// Kelas untuk Info Estimasi Waktu (Glassy Accent)
const glassTimeEstimateClass = cn(
    "rounded-lg p-3",
    "bg-blue-600/10 dark:bg-blue-900/10"
);

// Kelas Teks (untuk Dark Mode)
const primaryTextClass = "text-gray-800 dark:text-white";
const secondaryTextClass = "text-gray-500 dark:text-gray-400";
const estimateTextClass = "text-gray-700 dark:text-gray-300";
const accentColorClass = "text-blue-500 dark:text-blue-400";

// ---------------------------------------------

export default function MaintenancePage() {
  return (
    // CONTAINER BACKGROUND: Memberikan latar belakang yang sedikit transparan untuk efek blur
    <div className="flex min-h-screen items-center justify-center bg-gray-100/50 p-4 font-sans antialiased dark:bg-gray-900/50">
      
      {/* CARD CONTAINER: GLASSMORPHISM */}
      <Card className={glassCardContainerClass}>
        <CardHeader className="p-8">
          {/* SVG ICON: Menggunakan warna aksen Glassmorphism */}
          <div className="mx-auto mb-4 h-12 w-12 opacity-80" aria-hidden="true">
            <svg
              className={cn("h-full w-full", accentColorClass)}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <CardTitle className={cn("text-xl font-semibold tracking-tight", primaryTextClass)}>
            Pembaruan Sistem
          </CardTitle>
          <CardDescription className={cn("mt-1 text-sm", secondaryTextClass)}>
            Kami sedang melakukan pemeliharaan terencana.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {/* ESTIMATE INFO: GLASSY BACKGROUND */}
          <div className={glassTimeEstimateClass}>
            <p className={cn("text-xs font-medium", estimateTextClass)}>
              <span className={cn("font-semibold", accentColorClass)}>Perkiraan Selesai:</span>{' '}
              <span className="font-bold">~ 30 Menit</span>
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* BUTTON 1: CEK ULANG (GLASSMORPHISM OUTLINE) */}
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className={glassButtonOutlineClass}
            >
              Cek Ulang
            </Button>

            {/* BUTTON 2: HUBUNGI DUKUNGAN (GLASSMORPHISM GHOST) */}
            <Button
              variant="ghost"
              asChild
              className={glassButtonGhostClass}
            >
              <a href="mailto:support@telco-recommendation.com">Hubungi Tim Dukungan</a>
            </Button>
          </div>

          <div className={cn("mt-4 text-xs", secondaryTextClass)}>
            Kami menghargai kesabaran dan pengertian Anda.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}