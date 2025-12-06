'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { UserProfileDetail } from '@/types/profile.types';

interface ProfileHeaderProps {
  profile: UserProfileDetail;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src="" alt={profile.name} />
        <AvatarFallback className="bg-blue-500 text-2xl text-white">
          {profile.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <Badge
            variant={profile.status === 'active' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {profile.status}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {profile.role}
          </Badge>
        </div>
        <p className="text-muted-foreground">{profile.email}</p>
        <p className="text-sm text-muted-foreground">
          Member since {new Date(profile.created_at).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
}