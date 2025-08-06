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
    // Prevent browser back button
    history.pushState(null, "", location.href);
    const handlePopState = () => {
      history.pushState(null, "", location.href);
    };

    // Add event listener for back button
    window.addEventListener("popstate", handlePopState);

    // Check if user is logged in
    const isLoggedIn = !!user || !!localStorage.getItem("_st");
    const isAuthPage = pathname === "/login";

    if (!isLoggedIn && !isAuthPage) {
      router.replace("/login");
    } else if (isLoggedIn && isAuthPage) {
      router.replace("/admin");
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, router, user]);

  return null;
}
