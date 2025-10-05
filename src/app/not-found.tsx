import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-24 w-24 text-blue-500">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <CardTitle className="mb-2 text-4xl font-bold text-gray-900">404</CardTitle>
          <CardTitle className="text-xl font-semibold text-gray-700">Page Not Found</CardTitle>
          <CardDescription className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. The page might have been moved,
            deleted, or you entered the wrong URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>

          <div className="border-t pt-4">
            <p className="mb-2 text-sm text-gray-500">Popular pages:</p>
            <div className="space-y-1">
              <Link
                href="/auth/signin"
                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Sign In
              </Link>
              <Link
                href="/recommendations"
                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Recommendations
              </Link>
              <Link
                href="/dashboard"
                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
