'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { persistor, store } from '@/store';
import { Toaster } from '@/components/ui/sonner';
import LoadingPage from '@/app/loading';

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
          {children}
          <Toaster />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
