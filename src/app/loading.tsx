import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoadingPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
          <CardTitle className="text-xl font-semibold">Loading Application...</CardTitle>
          <CardDescription>Please wait while we prepare your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full animate-pulse rounded-full bg-blue-600"
                style={{ width: '60%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">Initializing Telco Recommendation System...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
