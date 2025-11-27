import { useCallback, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const t: ToastItem = { id, message, type };
    setToasts(prev => [...prev, t]);

    // Auto remove after duration
    const timer = setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const success = useCallback((message: string) => push(message, 'success'), [push]);
  const error = useCallback((message: string) => push(message, 'error'), [push]);
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, success, error, removeToast };
}