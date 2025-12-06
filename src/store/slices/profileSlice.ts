import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';
import type { ProfileState, UpdateProfileRequest, UserProfileDetail } from '@/types/profile.types';
import { profileService } from '@/services/profile.service';

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  updating: false,
};

// Async Thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      return response.data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to fetch profile';
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (data: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      const response = await profileService.updateProfile(data);
      return response.data;
    } catch (error) {
      // ✅ Fixed: Removed 'any' type
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      return rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfileDetail>) => {
      state.profile = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.updating = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectProfileUpdating = (state: RootState) => state.profile.updating;

export const { setProfile, clearError, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;