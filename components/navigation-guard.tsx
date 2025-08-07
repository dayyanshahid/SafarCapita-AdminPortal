"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";

export function NavigationGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = !!user || !!localStorage.getItem("_st");
    const isAuthPage = pathname === "/login";

    if (!isLoggedIn && !isAuthPage) {
      // Use push instead of replace to maintain history
      router.push("/login");
    } else if (isLoggedIn && isAuthPage) {
      // Use push instead of replace to maintain history
      router.push("/admin");
    }
  }, [pathname, router, user]);

  return null;
}
