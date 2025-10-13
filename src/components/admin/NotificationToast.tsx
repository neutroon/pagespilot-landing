"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface NotificationToastProps {
  toast: Toast | null;
  onClose: (id: string) => void;
}

export default function NotificationToast({
  toast,
  onClose,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);

      const duration = toast.duration || 5000;
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(toast.id), 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-blue-800";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`max-w-sm w-full rounded-lg shadow-lg border ${getBackgroundColor()}`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="ms-3 flex-1">
              <h4 className={`text-sm font-medium ${getTextColor()}`}>
                {toast.title}
              </h4>
              {toast.message && (
                <p className={`mt-1 text-sm ${getTextColor()} opacity-90`}>
                  {toast.message}
                </p>
              )}
            </div>
            <div className="ms-4 flex-shrink-0">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose(toast.id), 300);
                }}
                className={`inline-flex rounded-md p-1.5 ${getTextColor()} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    addToast({ title, message, type: "success", duration });
  };

  const showError = (title: string, message?: string, duration?: number) => {
    addToast({ title, message, type: "error", duration });
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    addToast({ title, message, type: "warning", duration });
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    addToast({ title, message, type: "info", duration });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
