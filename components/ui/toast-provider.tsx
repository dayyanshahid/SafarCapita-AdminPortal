"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Toast from "@radix-ui/react-toast";
import { RootState } from "@/redux/reducer";
import { clearToast } from "@/redux/actions";
import { cn } from "@/lib/utils";

const TOAST_DURATION = 5000;

export function ToastProvider() {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toasts);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, TOAST_DURATION);

      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  return (
    <Toast.Provider>
      {toasts.map((toast: any) => (
        <Toast.Root
          key={toast.id}
          className={cn(
            "fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg",
            {
              "bg-green-50 text-green-900": toast.type === "success",
              "bg-red-50 text-red-900": toast.type === "error",
              "bg-yellow-50 text-yellow-900": toast.type === "warning",
              "bg-blue-50 text-blue-900": toast.type === "info",
            }
          )}
          duration={toast.duration || TOAST_DURATION}
        >
          <Toast.Description className="text-sm font-medium">
            {toast.message}
          </Toast.Description>
        </Toast.Root>
      ))}
      <Toast.Viewport />
    </Toast.Provider>
  );
}
