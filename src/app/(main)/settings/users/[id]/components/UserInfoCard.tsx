'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/stat-card';
import { Mail, Shield, Calendar, Clock, Phone, Building } from 'lucide-react';
import type { UserDetail } from '@/types/user-types';

interface UserInfoCardProps {
  user: UserDetail;
}

export function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            label="Email"
            value={user.email}
            icon={<Mail className="h-4 w-4" />}
          />
          <StatCard
            label="Role"
            value={user.role}
            icon={<Shield className="h-4 w-4" />}
          />
          {user.phone && (
            <StatCard
              label="Phone"
              value={user.phone}
              icon={<Phone className="h-4 w-4" />}
            />
          )}
          {user.department && (
            <StatCard
              label="Department"
              value={user.department}
              icon={<Building className="h-4 w-4" />}
            />
          )}
          {user.createdAt && (
            <StatCard
              label="Created"
              value={new Date(user.createdAt).toLocaleDateString('id-ID')}
              icon={<Calendar className="h-4 w-4" />}
            />
          )}
          {user.updatedAt && (
            <StatCard
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleDateString('id-ID')}
              icon={<Clock className="h-4 w-4" />}
            />
          )}
        </div>

        {user.lastLogin && (
          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium">Last Login</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(user.lastLogin).toLocaleString('id-ID')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}