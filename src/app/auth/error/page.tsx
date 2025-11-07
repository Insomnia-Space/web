'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface AuthErrorPageProps {
  searchParams: {
    error?: string;
    callbackUrl?: string;
  };
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error, callbackUrl } = searchParams;

  const getErrorMessage = (error?: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      case 'Default':
        return 'An error occurred during authentication.';
      case 'Signin':
        return 'Error occurred while trying to sign in.';
      case 'OAuthSignin':
        return 'Error in constructing an authorization URL.';
      case 'OAuthCallback':
        return 'Error in handling the response from an OAuth provider.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account in the database.';
      case 'EmailCreateAccount':
        return 'Could not create email account in the database.';
      case 'Callback':
        return 'Error in the OAuth callback handler route.';
      case 'OAuthAccountNotLinked':
        return 'Email on the account is already linked, but not with this OAuth account.';
      case 'EmailSignin':
        return 'Sending the e-mail with the verification token failed.';
      case 'CredentialsSignin':
        return 'The authorize callback returned null in the Credentials provider.';
      case 'SessionRequired':
        return 'The content of this page requires you to be signed in at all times.';
      default:
        return 'An unexpected authentication error occurred.';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans antialiased">
      <Card className="w-full max-w-sm rounded-xl border-none bg-white text-center shadow-sm">
        <CardHeader className="p-8">
          <div className="mx-auto mb-4 h-12 w-12 text-red-500 opacity-80">
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
                d="M12 9v2m0 4h.01M10.29 3.86l-7 12A1 1 0 004.14 17h15.72a1 1 0 00.86-1.5l-7-12a1 1 0 00-1.43 0z"
              />
            </svg>
          </div>

          <CardTitle className="text-xl font-semibold tracking-tight text-gray-800">
            Authentication Error
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            {getErrorMessage(error)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-left">
              <p className="text-sm text-red-800">
                <span className="font-medium">Error Code:</span> {error}
              </p>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Button
              asChild
              variant="outline"
              className="h-10 w-full rounded-lg border-red-200 text-base font-medium text-red-500 shadow-sm transition-all hover:bg-red-50"
            >
              <Link href="/auth/signin">Try Sign In Again</Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="h-10 w-full rounded-lg text-sm text-gray-500 transition-all hover:bg-gray-100"
            >
              <Link href={callbackUrl || '/'}>Go Back</Link>
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            If you continue to experience issues,{' '}
            <a
              className="text-red-600 hover:underline"
              href="mailto:support@telco-recommendation.com"
            >
              contact support
            </a>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
