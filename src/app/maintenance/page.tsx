'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased">
      <Card className="w-full max-w-sm rounded-xl border-none bg-white text-center shadow-sm">
        <CardHeader className="p-8">
          <div className="mx-auto mb-4 h-12 w-12 text-blue-400 opacity-70">
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

          <CardTitle className="text-xl font-semibold tracking-tight text-gray-800">
            Pembaruan Sistem
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            Kami sedang melakukan pemeliharaan terencana.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xs font-medium text-gray-700">
              <span className="font-semibold text-blue-500">Perkiraan Selesai:</span>{' '}
              <span className="font-bold">~ 30 Menit</span>
            </p>
          </div>

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
              <a href="mailto:support@telco-recommendation.com">Hubungi Tim Dukungan</a>
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Kami menghargai kesabaran dan pengertian Anda.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
