import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { authService } from '@/services/auth.service';

export function useTokenRefresh() {
  const { data: session, update } = useSession();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!session?.accessToken) return;

    // Parse JWT to get expiration time
    const parseJwt = (token: string) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
      } catch {
        return null;
      }
    };

    const tokenData = parseJwt(session.accessToken);
    if (!tokenData?.exp) return;

    // Calculate when to refresh (5 minutes before expiration)
    const expiresIn = tokenData.exp * 1000 - Date.now();
    const refreshIn = Math.max(expiresIn - 5 * 60 * 1000, 0);

    const refreshToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return;

        const response = await authService.refreshToken(refreshToken);
        const { access, refresh } = response.data.token;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Update session
        await update({
          ...session,
          accessToken: access,
          refreshToken: refresh,
        });
      } catch {
        // ✅ Fixed: Removed unused 'error' variable
        // Silent fail and redirect to login
        
        // Clear tokens on refresh failure
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Redirect to login
        window.location.href = '/auth/signin';
      }
    };

    // Schedule token refresh
    refreshTimeoutRef.current = setTimeout(refreshToken, refreshIn);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [session, update]);
}