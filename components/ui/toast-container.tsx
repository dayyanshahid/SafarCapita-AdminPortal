"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/reducer";
import { clearToast } from "@/redux/actions";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

interface ToastItem {
  id: string;
  type: "success" | "error" | "warning" | "default";
  message: string;
  duration?: number;
}

export function ToastContainer() {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toasts) as ToastItem[];

  useEffect(() => {
    if (toasts?.length > 0) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, toasts[0]?.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  if (!toasts?.length) return null;

  return (
    <ToastProvider>
      {toasts.map(
        (toast) =>
          toast && (
            <Toast key={toast.id} variant={toast.type || "default"}>
              <div className="grid gap-1">
                <ToastDescription>{toast.message}</ToastDescription>
              </div>
              <ToastClose />
            </Toast>
          )
      )}
      <ToastViewport />
    </ToastProvider>
  );
}
