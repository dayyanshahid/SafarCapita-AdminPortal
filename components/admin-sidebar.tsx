"use client";

import type * as React from "react";
import {
  BarChart3,
  Building2,
  CreditCard,
  FileText,
  Home,
  Monitor,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useActivePath } from "@/hooks/use-active-path";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/admin/logout-button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

// Menu items
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Admin Management",
      icon: Shield,
      items: [
        {
          title: "Roles & Permissions",
          url: "/admin/roles",
        },
        {
          title: "User Management",
          url: "/admin/users",
        },
      ],
    },
    {
      title: "Seller Management",
      url: "/admin/sellers",
      icon: Building2,
    },
    {
      title: "Financing Requests",
      url: "/admin/financing/requests",
      icon: CreditCard,
    },
    {
      title: "Contract Management",
      url: "/admin/contracts",
      icon: FileText,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isActive, pathname } = useActivePath();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-red-600 text-sidebar-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Safar Capital</span>
                  <span className="truncate text-xs">Admin Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.title === "Financing Requests"}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.items ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={cn(
                              item.items?.some((subItem) =>
                                isActive(subItem.url)
                              ) && "bg-red-50 text-red-900"
                            )}
                          >
                            {item.icon && (
                              <item.icon
                                className={cn(
                                  item.items?.some((subItem) =>
                                    isActive(subItem.url)
                                  ) && "text-red-600"
                                )}
                              />
                            )}
                            <span>{item.title}</span>
                            <ChevronRight
                              className={cn(
                                "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
                                item.items?.some((subItem) =>
                                  isActive(subItem.url)
                                ) && "text-red-600"
                              )}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={cn(
                                    isActive(subItem.url) &&
                                      "bg-red-50 text-red-900 hover:bg-red-100"
                                  )}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton
                        tooltip={item.title}
                        asChild
                        className={cn(
                          isActive(item.url) &&
                            "bg-red-50 text-red-900 hover:bg-red-100"
                        )}
                      >
                        <a href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={cn(
                                isActive(item.url) && "text-red-600"
                              )}
                            />
                          )}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users className="size-4" />
              <span>Admin User</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
