"use client";

import { usePathname } from "next/navigation";

export function useActivePath() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Exact match for dashboard
    if (path === "/admin" && pathname === "/admin") {
      return true;
    }
    // For other routes, check if the pathname starts with the path
    // This ensures sub-routes are highlighted correctly
    return path !== "/admin" && pathname.startsWith(path);
  };

  return { isActive, pathname };
}
