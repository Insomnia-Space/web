'use client';

import React from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="flex">
        {sidebar && (
          <aside className="min-h-[calc(100vh-3.5rem)] w-64 border-r bg-gray-50 p-4">
            {sidebar}
          </aside>
        )}
        <main className={`flex-1 p-6 ${sidebar ? '' : 'container mx-auto'}`}>
          <ErrorBoundary>{children}</ErrorBoundary>
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
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  );
}
