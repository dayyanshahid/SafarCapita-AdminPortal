"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { showToast as showToastAction } from "@/redux/actions";

const TOAST_REMOVE_DELAY = 5000;

type ToastType = "success" | "error" | "warning" | "default";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export function useToast() {
  const dispatch = useDispatch();

  const toast = React.useCallback(
    (props: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      dispatch(
        showToastAction({
          id,
          ...props,
          duration: props.duration || TOAST_REMOVE_DELAY,
        })
      );
    },
    [dispatch]
  );

  return {
    toast,
    success: (message: string, duration?: number) =>
      toast({ type: "success", message, duration }),
    error: (message: string, duration?: number) =>
      toast({ type: "error", message, duration }),
    warning: (message: string, duration?: number) =>
      toast({ type: "warning", message, duration }),
  };
}
