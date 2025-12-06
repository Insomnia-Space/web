'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 opacity-50 blur-3xl" />
        
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30">
            <span className="text-3xl">⚠️</span>
          </div>
          <AlertDialogTitle className="text-center text-2xl font-bold text-gray-900">
            Delete Customer?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600">
            This will permanently delete customer{' '}
            <span className="font-bold text-gray-900">"{customerName}"</span>
            <br />
            This action cannot be undone and will remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex gap-3 sm:justify-center">
          <AlertDialogCancel
            onClick={onClose}
            className="border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="border-0 bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-500/30 hover:from-red-700 hover:to-rose-700"
          >
            Delete Forever
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}