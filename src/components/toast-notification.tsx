'use client';

import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
  className?: string;
}

export default function ToastNotification({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  className = '',
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300',
        styles[type],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        className
      )}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="flex-shrink-0 transition-opacity hover:opacity-70"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
