'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/Layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDashboardOverview,
  fetchProductPerformance,
  fetchModelInfo,
} from '@/store/slices/dashboardSlice';
import { Calendar, Users, TrendingUp, Target, Database, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { KPICard } from '@/components/kpi-card';
import { TopProductsChart } from './components/TopProductsChart';
import { ActiveChurnedChart } from './components/ActiveChurnedChart';
import { ModelInfoCard } from './components/ModelInfoCard';
import { ProductPerformanceTable } from './components/ProductPerformanceTable';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const { overview, productPerformance, modelInfo, loading, error } = useAppSelector(
    state => state.dashboard
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDashboardOverview());
      dispatch(fetchProductPerformance());
      dispatch(fetchModelInfo());
    }
  }, [dispatch, isAuthenticated]);

  const handleRefresh = () => {
    dispatch(fetchDashboardOverview());
    dispatch(fetchProductPerformance());
    dispatch(fetchModelInfo());
  };

  if (!isAuthenticated) {
    return (
      <DashboardLayout showSidebar={false}>
        <div className="flex min-h-[400px] items-center justify-center">
          <Card className="w-full max-w-md border-0 shadow-xl rounded-3xl text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
            <CardHeader className="relative">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                <span className="text-3xl">🔒</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Access Denied</CardTitle>
              <CardDescription className="text-gray-600">
                You need to be logged in to view this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <a href="/auth/signin">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (loading && (!overview || !productPerformance || !modelInfo)) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <Card className="w-full max-w-md border-0 shadow-xl rounded-3xl text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-50" />
            <CardHeader className="relative">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
                <span className="text-3xl">⚠️</span>
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">Error</CardTitle>
              <CardDescription className="text-gray-700">{error}</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button onClick={handleRefresh} className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg">
                Try Again
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
        {/* Header - Modern Panze Style dengan Gradient */}
        <div className="relative overflow-hidden rounded-3xl border-0 p-8 ">
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, <span className="font-bold text-gray-900">{user?.name ?? 'User'}</span>! 👋
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="gap-2 border-0 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white hover:shadow"
              >
                <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards dengan Gradient Backgrounds */}
        {overview && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Total Customers"
              value={overview.kpi.total_customers.toLocaleString('id-ID')}
              icon={Users}
              color="blue"
            />
            <KPICard
              title="Total Recommendations"
              value={overview.kpi.total_recommendations.toLocaleString('id-ID')}
              icon={TrendingUp}
              color="green"
            />
            <KPICard
              title="Avg Confidence Score"
              value={`${parseFloat(overview.kpi.avg_confidence_score).toFixed(1)}%`}
              icon={Target}
              color="purple"
            />
            <KPICard
              title="Active Customer Ratio"
              value={`${overview.active_vs_churned_ratio.ratio_percentage}%`}
              icon={Database}
              color="yellow"
            />
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {overview?.top_products && <TopProductsChart products={overview.top_products} />}
          {overview?.active_vs_churned_ratio && <ActiveChurnedChart ratio={overview.active_vs_churned_ratio} />}
        </div>

        {/* Model Info & Product Performance */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">{modelInfo && <ModelInfoCard modelInfo={modelInfo} />}</div>
          <div className="lg:col-span-2">
            {productPerformance && (
              <ProductPerformanceTable products={productPerformance.slice(0, 5)} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}