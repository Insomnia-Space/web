// app/(main)/recommendation-history/components/RecommendationStatsCards.tsx

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Send, FileText, Clock, Repeat } from 'lucide-react';
import type { RecommendationStats } from '@/types/recommendation.types';

interface RecommendationStatsCardsProps {
  stats: RecommendationStats;
}

export function RecommendationStatsCards({ stats }: RecommendationStatsCardsProps) {
  const cards = [
    {
      title: 'Total Recommendations',
      value: stats.total,
      icon: TrendingUp,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Sent',
      value: stats.sent,
      icon: Send,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Draft',
      value: stats.draft,
      icon: FileText,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'Overridden',
      value: stats.overridden,
      icon: Repeat,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">{card.value}</h3>
                </div>
                <div className={`rounded-xl p-3 ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}