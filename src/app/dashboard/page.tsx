'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%' },
    { title: 'Active Sessions', value: '456', change: '+5%' },
    { title: 'Revenue', value: '$12,345', change: '+8%' },
    { title: 'Growth Rate', value: '23%', change: '+2%' },
  ];

  const recentActivities = [
    { id: 1, action: 'User registered', user: 'john@example.com', time: '2 minutes ago' },
    { id: 2, action: 'Payment processed', user: 'jane@example.com', time: '5 minutes ago' },
    { id: 3, action: 'Profile updated', user: 'bob@example.com', time: '10 minutes ago' },
  ];

  if (!isAuthenticated) {
    return (
      <DashboardLayout showSidebar={false}>
        <div className="flex min-h-[400px] items-center justify-center">
          <Card className="w-full max-w-md rounded-xl text-center shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Access Denied</CardTitle>
              <CardDescription className="text-gray-500">
                You need to be logged in to view this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/auth/signin">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-xl border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <p className="mt-1 text-xs text-gray-500">
                  <span className="font-semibold text-green-600">{stat.change}</span> from last
                  month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="rounded-xl border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight text-gray-800">
                Recent Activities
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Latest user activities in your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{activity.user}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-xs text-blue-600 hover:bg-blue-100"
                    >
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight text-gray-800">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Frequently used actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-600"
                variant="outline"
                onClick={() => setIsLoading(!isLoading)}
              >
                Create New User
              </Button>
              <Button
                className="w-full justify-start text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-600"
                variant="outline"
              >
                Generate Report
              </Button>
              <Button
                className="w-full justify-start text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-600"
                variant="outline"
              >
                Export Data
              </Button>
              <Button
                className="w-full justify-start text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-600"
                variant="outline"
              >
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Card */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            <span className="font-semibold text-blue-500">💡 Tip:</span> Use the sidebar to navigate
            through different modules and features.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
