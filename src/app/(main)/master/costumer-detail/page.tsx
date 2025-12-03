'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  CreditCard,
  Database,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  Save,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CustomerDetail {
  id: string;
  // Demographics
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  location: string;
  occupation: string;
  email: string;
  phone: string;

  // Subscription
  currentPlan: string;
  status: 'Active' | 'Churned';
  joinDate: string;

  // Usage Pattern
  avgDataUsage: number; // GB/month
  callDuration: number; // minutes/month
  smsCount: number; // SMS/month

  // Transaction History
  transactions: Array<{
    id: string;
    product: string;
    date: string;
    price: number;
  }>;
}

interface RecommendedProduct {
  id: string;
  name: string;
  category: 'Paket Data' | 'Voice' | 'Combo';
  price: number;
  confidence: number; // 0-100
  benefits: string[];
  reasoning: string;
}

interface RecommendationResult {
  products: RecommendedProduct[];
  generatedAt: string;
  featureImportance: {
    dataUsage: number;
    callDuration: number;
    smsCount: number;
    transactionHistory: number;
  };
  isOverridden: boolean;
  overriddenProduct?: string;
}

// Sample data - nanti ganti dengan data dari API
const sampleCustomer: CustomerDetail = {
  id: 'CUST01234',
  name: 'John Doe',
  age: 32,
  gender: 'Male',
  location: 'Jakarta Selatan, DKI Jakarta',
  occupation: 'Software Engineer',
  email: 'john.doe@email.com',
  phone: '+62 812-3456-7890',
  currentPlan: 'Paket Internet Unlimited 50GB',
  status: 'Active',
  joinDate: '2023-01-15',
  avgDataUsage: 45.5,
  callDuration: 320,
  smsCount: 150,
  transactions: [
    {
      id: 'TRX001',
      product: 'Paket Internet Unlimited 50GB',
      date: '2024-11-01',
      price: 150000,
    },
    {
      id: 'TRX002',
      product: 'Paket Voice & SMS Premium',
      date: '2024-10-15',
      price: 75000,
    },
    {
      id: 'TRX003',
      product: 'Paket Streaming HD',
      date: '2024-10-01',
      price: 50000,
    },
    {
      id: 'TRX004',
      product: 'Paket Internet Unlimited 50GB',
      date: '2024-09-28',
      price: 150000,
    },
    {
      id: 'TRX005',
      product: 'Paket Gaming Low Latency',
      date: '2024-09-15',
      price: 100000,
    },
  ],
};

// Mock available products for override
const availableProducts = [
  { id: 'PKT-001', name: 'Unlimited Pro Data 100GB' },
  { id: 'PKT-002', name: 'Streaming Max HD' },
  { id: 'PKT-003', name: 'Voice Saver 250' },
  { id: 'PKT-004', name: 'Call Unlimited Local' },
  { id: 'PKT-005', name: 'Combo Smart 15GB' },
  { id: 'PKT-006', name: 'Gaming Plus 30GB' },
  { id: 'PKT-007', name: 'Work From Anywhere 50GB' },
  { id: 'PKT-008', name: 'Family Share 80GB' },
];

export default function CustomerDetailPage() {
  const [customer] = useState<CustomerDetail>(sampleCustomer);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overrideProduct, setOverrideProduct] = useState<string>('');
  const [isSavingOverride, setIsSavingOverride] = useState(false);

  // Simulasi user role - ganti dengan auth context nanti
  const userRole = 'marketing'; // 'marketing' | 'admin' | 'staff'

  const handleGenerateRecommendation = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock recommendation result
      const mockRecommendation: RecommendationResult = {
        products: [
          {
            id: 'PKT-007',
            name: 'Work From Anywhere 50GB',
            category: 'Paket Data',
            price: 229000,
            confidence: 94.5,
            benefits: [
              'High-speed data untuk remote working',
              'Multi-device tethering support',
              'Priority bandwidth untuk video conference',
            ],
            reasoning:
              'Berdasarkan profesi Software Engineer dan usage data 45.5GB/bulan yang tinggi',
          },
          {
            id: 'PKT-006',
            name: 'Gaming Plus 30GB',
            category: 'Combo',
            price: 179000,
            confidence: 87.3,
            benefits: [
              'Latency optimized untuk gaming',
              '30GB high-speed data',
              'Bonus 100 menit voice calling',
            ],
            reasoning:
              'Usage pattern menunjukkan aktivitas malam hari dan transaction history gaming package',
          },
          {
            id: 'PKT-005',
            name: 'Combo Smart 15GB',
            category: 'Combo',
            price: 159000,
            confidence: 82.1,
            benefits: [
              '15GB kuota nasional',
              '200 menit telpon + 200 SMS',
              'Hemat untuk kebutuhan sehari-hari',
            ],
            reasoning: 'Sesuai dengan call duration 320 menit/bulan dan budget conscious user',
          },
        ],
        generatedAt: new Date().toISOString(),
        featureImportance: {
          dataUsage: 0.45,
          callDuration: 0.25,
          smsCount: 0.1,
          transactionHistory: 0.2,
        },
        isOverridden: false,
      };

      setRecommendation(mockRecommendation);
    } catch (err) {
      setError('Failed to generate recommendation. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOverride = async () => {
    if (!overrideProduct) return;

    setIsSavingOverride(true);
    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update recommendation with override
      if (recommendation) {
        const selectedProduct = availableProducts.find(p => p.id === overrideProduct);
        setRecommendation({
          ...recommendation,
          isOverridden: true,
          overriddenProduct: selectedProduct?.name,
        });
      }

      alert('Override saved successfully!');
      setOverrideProduct('');
    } catch (err) {
      setError('Failed to save override. Please try again.');
      console.error(err);
    } finally {
      setIsSavingOverride(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Back Button */}
        <Link
          href="/produk/costumer/costumer-list"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customer List
        </Link>

        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Detail View</h1>
            <p className="mt-1 text-sm text-gray-600">Complete profile and activity information</p>
          </div>
          <button
            onClick={handleGenerateRecommendation}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate Recommendation'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Demographics & Subscription */}
          <div className="space-y-6 lg:col-span-2">
            {/* Demographics Card */}
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <User className="h-5 w-5 text-blue-600" />
                  Demographics
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-600">Customer ID: {customer.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Age & Gender</p>
                      <p className="font-medium text-gray-900">
                        {customer.age} years old, {customer.gender}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{customer.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <Briefcase className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Occupation</p>
                      <p className="font-medium text-gray-900">{customer.occupation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{customer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">{customer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Subscription
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-gray-500">Current Plan</p>
                    <p className="mt-1 font-semibold text-gray-900">{customer.currentPlan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {formatDate(customer.joinDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Pattern Card */}
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Usage Pattern
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-2">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Avg Data Usage</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {customer.avgDataUsage} GB
                        </p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-green-100 p-2">
                        <PhoneCall className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Call Duration</p>
                        <p className="text-2xl font-bold text-green-600">{customer.callDuration}</p>
                        <p className="text-xs text-gray-500">minutes/month</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-purple-100 p-2">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">SMS Count</p>
                        <p className="text-2xl font-bold text-purple-600">{customer.smsCount}</p>
                        <p className="text-xs text-gray-500">messages/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Transaction History */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Transaction History
                </h2>
                <p className="mt-1 text-xs text-gray-600">Last 5 transactions</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {customer.transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {transaction.product}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {formatDate(transaction.date)}
                          </div>
                        </div>
                        <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                        <span className="text-xs text-gray-600">Transaction ID:</span>
                        <span className="text-xs font-medium text-gray-900">{transaction.id}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-600">Amount:</span>
                        <span className="text-sm font-bold text-green-600">
                          {formatCurrency(transaction.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* URQ-005 & URQ-006: Recommendation Result Section */}
        {recommendation && (
          <div className="animate-in fade-in mt-6 space-y-6 duration-500">
            {/* Header with Override Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="rounded-[10px] bg-white px-4 py-2">
                    <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
                      Recommendation Result
                    </h2>
                  </div>
                </div>
                {recommendation.isOverridden && (
                  <Badge className="border-orange-300 bg-orange-100 text-orange-700">
                    <Zap className="mr-1 h-3 w-3" />
                    Manual Override
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Generated at {new Date(recommendation.generatedAt).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Top 3 Products */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {recommendation.products.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all hover:border-purple-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg ${
                        index === 0
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                          : index === 1
                            ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                            : 'bg-gradient-to-br from-amber-600 to-amber-700'
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </div>

                  {/* Gradient Header */}
                  <div
                    className={`relative p-6 ${
                      index === 0
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                        : index === 1
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                  >
                    <div className="space-y-2">
                      <Badge
                        className={`${
                          product.category === 'Paket Data'
                            ? 'bg-blue-100 text-blue-700'
                            : product.category === 'Voice'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {product.category}
                      </Badge>
                      <h3 className="pr-12 text-xl font-bold text-white">{product.name}</h3>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(product.price)}
                        <span className="text-sm font-normal opacity-90">/bulan</span>
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 p-6">
                    {/* Confidence Score */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-lg font-bold text-transparent">
                          {product.confidence.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                          style={{ width: `${product.confidence}%` }}
                        />
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Key Benefits:
                      </p>
                      <ul className="space-y-1.5">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>

            {/* URQ-006: Recommendation Reasoning */}
            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Why These Recommendations?
                  </h3>

                  {/* Individual Product Reasoning */}
                  <div className="space-y-3">
                    {recommendation.products.map((product, index) => (
                      <div
                        key={product.id}
                        className="rounded-lg border border-purple-100 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                              index === 0
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                                : index === 1
                                  ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                                  : 'bg-gradient-to-br from-amber-600 to-amber-700'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{product.name}</p>
                            <p className="mt-1 text-sm text-gray-600">{product.reasoning}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feature Importance */}
                  <div className="rounded-lg border border-purple-100 bg-white p-4">
                    <p className="mb-3 text-sm font-semibold text-gray-700">
                      Model Feature Importance:
                    </p>
                    <div className="space-y-2">
                      {Object.entries(recommendation.featureImportance).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-semibold text-purple-600">
                              {(value * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
                              style={{ width: `${value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Override Message */}
                  {recommendation.isOverridden && recommendation.overriddenProduct && (
                    <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                      <div>
                        <p className="font-semibold text-orange-800">Manual Override Applied</p>
                        <p className="mt-1 text-sm text-orange-700">
                          Recommendation has been manually overridden to:{' '}
                          <span className="font-semibold">{recommendation.overriddenProduct}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* URQ-007: Manual Override Section (Marketing Only) */}
        {recommendation && userRole === 'marketing' && (
          <div className="animate-in fade-in mt-6 rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6 duration-500">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <Save className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Manual Override
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    As a marketing staff, you can override the AI recommendation with a different
                    product.
                  </p>
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select Product to Override:
                    </label>
                    <Select value={overrideProduct} onValueChange={setOverrideProduct}>
                      <SelectTrigger className="border-orange-200 bg-white">
                        <SelectValue placeholder="Choose a product..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleSaveOverride}
                    disabled={!overrideProduct || isSavingOverride}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                  >
                    {isSavingOverride ? (
                      <>
                        <span className="mr-2 animate-spin">⏳</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Override
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="animate-in fade-in mt-6 rounded-lg border-2 border-red-200 bg-red-50 p-4 duration-300">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
