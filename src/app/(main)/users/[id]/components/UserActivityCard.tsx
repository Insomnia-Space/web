'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock } from 'lucide-react';
import type { UserDetail } from '@/types/user-types';

interface UserActivityCardProps {
  user: UserDetail;
}

export function UserActivityCard({ user: _user }: UserActivityCardProps) {
  // Mock activity data - replace with real data from API
  const activities = [
    {
      id: '1',
      action: 'Logged in',
      timestamp: new Date().toISOString(),
      description: 'User logged in from Jakarta, Indonesia',
    },
    {
      id: '2',
      action: 'Updated profile',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      description: 'Changed email preferences',
    },
    {
      id: '3',
      action: 'Created document',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      description: 'Created new project document',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-4 rounded-lg border border-gray-100 p-4"
            >
              <div className="flex-1 space-y-1">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {new Date(activity.timestamp).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No recent activity
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}