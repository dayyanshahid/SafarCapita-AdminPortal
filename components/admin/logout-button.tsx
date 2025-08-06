"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/actions";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("_st"); // Secure Token
    localStorage.removeItem("_su"); // Secure User
    localStorage.removeItem("_lt"); // Login Time

    // Clear Redux state
    dispatch(setUser(null));

    // Redirect to login page
    router.push("/login");
  };

  return (
    <SidebarMenuButton
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="size-4" />
      <span>Logout</span>
    </SidebarMenuButton>
  );
}
