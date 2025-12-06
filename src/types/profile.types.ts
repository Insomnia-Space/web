export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfileDetail extends UserProfile {
  statistics: {
    total_recommendations_generated: number;
    total_overrides: number;
    avg_confidence_score: number;
  };
}

export interface ProfileState {
  profile: UserProfileDetail | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}