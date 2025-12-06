// app/(public)/loading/page.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Import cn

// --- Kelas Glassmorphism & Utilitas ---

// Kelas Glassmorphism untuk Card container
const glassCardContainerClass = cn(
  "w-full max-w-md text-center shadow-2xl backdrop-blur-md", 
  "border border-white/30 bg-white/10 dark:border-gray-800/50 dark:bg-gray-900/10" // Glassmorphism Core
);

// Kelas Teks (untuk Dark Mode)
const primaryTextClass = "text-gray-800 dark:text-white";
const secondaryTextClass = "text-gray-500 dark:text-gray-400";
const progressBarTrackClass = "rounded-full bg-gray-200 dark:bg-gray-700/50";


// ---------------------------------------------

export default function LoadingPage() {
  return (
    // CONTAINER BACKGROUND: Memberikan latar belakang yang sedikit transparan untuk efek blur
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100/50 dark:bg-gray-900/50">
      
      {/* CARD CONTAINER: GLASSMORPHISM */}
      <Card className={glassCardContainerClass}>
        <CardHeader>
          <div className="mx-auto mb-4">
            {/* SPINNER: Menggunakan warna aksen Glassmorphism (Blue) */}
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500 dark:border-blue-400"></div>
          </div>
          
          <CardTitle className={cn("text-xl font-semibold", primaryTextClass)}>
            Loading Application...
          </CardTitle>
          <CardDescription className={secondaryTextClass}>
            Please wait while we prepare your experience.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            {/* PROGRESS BAR TRACK: Menggunakan warna track Dark Mode yang lebih halus */}
            <div className={cn("h-2 overflow-hidden", progressBarTrackClass)}>
              {/* PROGRESS BAR FILL: Menggunakan warna aksen Glassmorphism (Blue) */}
              <div
                className="h-full animate-pulse rounded-full bg-blue-600 dark:bg-blue-400"
                style={{ width: '60%' }} // Tetap menggunakan inline style untuk demo width
              ></div>
            </div>
            
            <p className={cn("text-sm", secondaryTextClass)}>
              Initializing Telco Recommendation System...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}