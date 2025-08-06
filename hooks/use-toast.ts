import { useDispatch } from "react-redux";
import { showToast as showToastAction } from "@/redux/actions";
import type { Toast } from "@/redux/actionTypes";

export function useToast() {
  const dispatch = useDispatch();

  const showToast = (toast: Omit<Toast, "id">) => {
    dispatch(
      showToastAction({
        ...toast,
        id: Date.now().toString(),
      })
    );
  };

  return {
    success: (message: string, duration?: number) =>
      showToast({ type: "success", message, duration }),
    error: (message: string, duration?: number) =>
      showToast({ type: "error", message, duration }),
    warning: (message: string, duration?: number) =>
      showToast({ type: "warning", message, duration }),
    info: (message: string, duration?: number) =>
      showToast({ type: "info", message, duration }),
  };
}
