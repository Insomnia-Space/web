'use client';

import { DashboardLayout } from '@/components/layout/Layouts';
import {
  Activity,
  ArrowLeft,
  Briefcase,
  Calendar,
  CreditCard,
  Database,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  Sparkles,
  TrendingUp,
  User,
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

export default function CustomerDetailPage() {
  const [customer] = useState<CustomerDetail>(sampleCustomer);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRecommendation = () => {
    setIsGenerating(true);
    // Simulasi API call
    setTimeout(() => {
      setIsGenerating(false);
      alert('Recommendation generated! (Nanti redirect ke halaman recommendation)');
    }, 2000);
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
      </div>
    </DashboardLayout>
  );
}
