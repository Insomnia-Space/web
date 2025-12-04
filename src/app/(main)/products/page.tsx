'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setItems } from '@/store/slices/productCatalogSlice';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/Layouts';
import {
  ProductContent,
  ProductFilters,
  ProductListHeader,
  ProductPagination,
  ProductStatsCards,
} from './components';

// Mock data - replace with API call
const mockProducts = [
  {
    id: 'PKT-DATA-001',
    name: 'Unlimited Pro',
    category: 'Data' as const,
    price: 199000,
    description: 'Paket data unlimited dengan FUP tinggi untuk streaming & kerja remote.',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: 'PKT-DATA-002',
    name: 'Streaming Max',
    category: 'Data' as const,
    price: 129000,
    description: 'Optimized untuk video HD & platform OTT dengan prioritas QoS.',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-16',
  },
  {
    id: 'PKT-VOICE-001',
    name: 'Voice Saver 250',
    category: 'Voice' as const,
    price: 75000,
    description: '250 menit nelpon semua operator + bonus VoIP gateway.',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-17',
  },
  {
    id: 'PKT-VOICE-002',
    name: 'Call Unlimited Local',
    category: 'Voice' as const,
    price: 99000,
    description: 'Nelpon lokal unlimited (area sama) + 50 menit nasional.',
    createdAt: '2024-01-04',
    updatedAt: '2024-01-18',
  },
  {
    id: 'PKT-COMBO-001',
    name: 'Combo Smart 15GB + 200Min',
    category: 'Combo' as const,
    price: 159000,
    description: '15GB kuota nasional + 200 menit telpon + 200 SMS.',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-19',
  },
  {
    id: 'PKT-COMBO-002',
    name: 'Gaming Plus 30GB',
    category: 'Combo' as const,
    price: 179000,
    description: '30GB data dengan latency optimized + 100 menit voice.',
    createdAt: '2024-01-06',
    updatedAt: '2024-01-20',
  },
  {
    id: 'PKT-DATA-003',
    name: 'Work From Anywhere 50GB',
    category: 'Data' as const,
    price: 229000,
    description: '50GB high-speed untuk remote working multi device tethering.',
    createdAt: '2024-01-07',
    updatedAt: '2024-01-21',
  },
  {
    id: 'PKT-COMBO-003',
    name: 'Family Share 80GB',
    category: 'Combo' as const,
    price: 299000,
    description: '80GB dapat dibagi 5 user + kontrol parental usage.',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22',
  },
  {
    id: 'PKT-VOICE-003',
    name: 'Enterprise Voice 1000',
    category: 'Voice' as const,
    price: 499000,
    description: 'Bundle enterprise voice 1000 menit + SIP trunk integration.',
    createdAt: '2024-01-09',
    updatedAt: '2024-01-23',
  },
  {
    id: 'PKT-DATA-004',
    name: 'Night Owl 100GB',
    category: 'Data' as const,
    price: 99000,
    description: 'Kuota malam (00.00–06.00) besar untuk download & backup.',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-24',
  },
];

export default function ProductCatalogPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Replace with actual API call
    // const fetchProducts = async () => {
    //   const response = await fetch('/api/products');
    //   const data = await response.json();
    //   dispatch(setItems(data));
    // };
    // fetchProducts();

    dispatch(setItems(mockProducts));
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <ProductListHeader />
        <ProductStatsCards />

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <ProductFilters />
          </CardHeader>
          <CardContent className="space-y-4">
            <ProductContent />
            <ProductPagination />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
