'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAuth } from '@/hooks';
import { Calendar, icons } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { useState } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'7' | '30' | '90'>('30');

  const stats = [
    {
      title: 'Total Customers',
      value: '1,234',
      change: '+12%',
      icon: <icons.Users className="h-7 w-7 text-blue-600" />,
    },
    {
      title: 'Total Recommendations Generated',
      value: '456',
      change: '+5%',
      icon: <icons.TrendingUp className="h-7 w-7 text-blue-600" />,
    },
    {
      title: 'Avg Confidence Score',
      value: '$12,345',
      change: '+8%',
      icon: <icons.Target className="h-7 w-7 text-blue-600" />,
    },
    {
      title: 'Active vs Churned Ratio',
      value: '23%',
      change: '+2%',
      icon: <icons.UserCheck className="h-7 w-7 text-blue-600" />,
    },
  ];

  const recentActivities = [
    { id: 1, action: 'User registered', user: 'john@example.com', time: '2 minutes ago' },
    { id: 2, action: 'Payment processed', user: 'jane@example.com', time: '5 minutes ago' },
    { id: 3, action: 'Profile updated', user: 'bob@example.com', time: '10 minutes ago' },
  ];

  const recommendationTrendData = [
    { week: 'Week 1', recommendations: 65, percentage: 59 },
    { week: 'Week 2', recommendations: 78, percentage: 71 },
    { week: 'Week 3', recommendations: 90, percentage: 82 },
    { week: 'Week 4', recommendations: 81, percentage: 74 },
    { week: 'Week 5', recommendations: 95, percentage: 86 },
    { week: 'Week 6', recommendations: 110, percentage: 100 },
    { week: 'Week 7', recommendations: 105, percentage: 95 },
  ];

  const topProductsData = [
    { product: 'Premium Plan', count: 145, percentage: 100 },
    { product: 'Basic Plan', count: 98, percentage: 68 },
    { product: 'Enterprise Plan', count: 86, percentage: 59 },
    { product: 'Starter Plan', count: 72, percentage: 50 },
    { product: 'Professional Plan', count: 55, percentage: 38 },
  ];

  const lineChartConfig = {
    recommendations: {
      label: 'Recommendations',
      color: 'hsl(217, 91%, 60%)',
    },
  } satisfies ChartConfig;

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
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
          <div>
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-600">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-xl border-gray-200 shadow-sm">
              {/* <div className='flex flex-col'> */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <p className="mt-1 text-xs text-gray-500">
                  <span className="font-semibold text-green-600">{stat.change}</span> from last
                  month
                </p>
              </CardContent>
              {/* </div> */}
              {/* <div className="flex items-center mx-auto">{stat.icon}</div> */}
            </Card>
          ))}
        </div>

        {/* Time Filter Buttons */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            <Button
              variant={timeFilter === '7' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-md"
              onClick={() => setTimeFilter('7')}
            >
              7 Days
            </Button>
            <Button
              variant={timeFilter === '30' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-md"
              onClick={() => setTimeFilter('30')}
            >
              30 Days
            </Button>
            <Button
              variant={timeFilter === '90' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-md"
              onClick={() => setTimeFilter('90')}
            >
              90 Days
            </Button>
          </div>
        </div>

        {/* Charts Section - Simple Bar Charts without Recharts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Chart 1: Recommendation Trend (Simple Bar Chart) */}
          <Card className="rounded-xl border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight text-gray-800">
                    Recommendation Trend
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    Weekly recommendations over {timeFilter} days period
                  </CardDescription>
                </div>
                <div className="rounded-lg bg-blue-50 p-2">
                  <icons.TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-600">Peak</p>
                    <p className="mt-1 text-xl font-bold text-blue-600">110</p>
                  </div>
                  <div className="border-x border-indigo-200 text-center">
                    <p className="text-xs font-medium text-gray-600">Average</p>
                    <p className="mt-1 text-xl font-bold text-indigo-600">89</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-600">Growth</p>
                    <p className="mt-1 text-xl font-bold text-green-600">+61%</p>
                  </div>
                </div>

                {/* Line Chart menggunakan ChartContainer */}
                <ChartContainer config={lineChartConfig} className="h-[350px] w-full">
                  <LineChart
                    data={recommendationTrendData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={value => value.replace('Week ', 'W')}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      style={{ fontSize: '12px' }}
                    />
                    <ChartTooltip
                      cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      type="monotone"
                      dataKey="recommendations"
                      stroke="var(--color-recommendations)"
                      strokeWidth={3}
                      dot={{
                        fill: 'var(--color-recommendations)',
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        fill: 'var(--color-recommendations)',
                      }}
                    />
                  </LineChart>
                </ChartContainer>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 rounded-lg border border-gray-100 bg-white p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-medium text-gray-600">Recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-gray-600">Growth Trend</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart 2: Top 5 Recommended Products (Simple Bar Chart) */}
          <Card className="rounded-xl border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight text-gray-800">
                Top 5 Recommended Products
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Most recommended products in the last {timeFilter} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProductsData.map((data, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{data.product}</span>
                      <span className="font-semibold text-green-600">{data.count}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
