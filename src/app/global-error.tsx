import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function GlobalErrorPage() {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-16 w-16 text-red-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">Application Error</CardTitle>
              <CardDescription>
                A critical error occurred and the application needs to be restarted.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">
                  This is a global application error. The entire application has crashed and needs
                  to be reloaded.
                </p>
              </div>

              <div className="space-y-2">
                <Button onClick={() => window.location.reload()} className="w-full">
                  Reload Application
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Go to Homepage</Link>
                </Button>
              </div>

              <div className="text-xs text-gray-500">
                If this error continues to occur, please contact our technical support team.
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
