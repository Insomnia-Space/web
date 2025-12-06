'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfile, selectProfileUpdating } from '@/store/slices/profileSlice';
import { toast } from 'sonner';
import type { UserProfileDetail } from '@/types/profile.types';

interface EditProfileFormProps {
  profile: UserProfileDetail;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const dispatch = useAppDispatch();
  const updating = useAppSelector(selectProfileUpdating);
  
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error as string || 'Failed to update profile');
    }
  };

  const hasChanges = 
    formData.name !== profile.name || 
    formData.email !== profile.email;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={!hasChanges || updating}
            className="w-full gap-2"
          >
            <Save className="h-4 w-4" />
            {updating ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}