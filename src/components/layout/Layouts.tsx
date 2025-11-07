'use client';

import React from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import LoadingPage from '@/app/loading';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <ErrorBoundary>
          <React.Suspense fallback={<LoadingPage />}>{children}</React.Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function DashboardLayout({ children, showSidebar = true }: DashboardLayoutProps) {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Sidebar - Full Height */}
      {showSidebar && (
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>
      )}

      {/* Main Area (Header + Content) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-6">
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingPage />}>{children}</React.Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {(title || description) && (
          <div className="mb-6 text-center">
            {title && <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>}
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}
        <ErrorBoundary>
          <React.Suspense fallback={<LoadingPage />}>{children}</React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
