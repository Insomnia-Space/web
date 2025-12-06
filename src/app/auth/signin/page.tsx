'use client';

import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/forms/LoginForm';
import { CardContent } from '@/components/ui/card';
import { LoginFormData } from '@/schemas/auth';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      // Store tokens in localStorage
      if (session.accessToken) {
        localStorage.setItem('access_token', session.accessToken);
      }
      if (session.refreshToken) {
        localStorage.setItem('refresh_token', session.refreshToken);
      }
      router.push('/dashboard');
    }
  }, [session, status, router]);

  const handleLogin = async (values: LoginFormData) => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || 'Login failed. Please check your credentials.');
      } else {
        toast.success('Login successful!');
      }
    } catch (error) {
      // ✅ Fixed: Removed console.error and proper error handling
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased lg:min-h-0 lg:py-20">
      <div className="w-full max-w-sm rounded-xl border-none bg-white text-center">
        <CardContent className="space-y-6 px-8 pb-8">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </CardContent>
      </div>
    </div>
  );
}