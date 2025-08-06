"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "@/components/ui/toast-container";
import { NavigationGuard } from "@/components/navigation-guard";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NavigationGuard />
      {children}
      <ToastContainer />
    </Provider>
  );
}
