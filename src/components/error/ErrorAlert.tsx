import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ErrorAlert({ message, onClose, className }: ErrorAlertProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg bg-red-50 text-red-700",
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}