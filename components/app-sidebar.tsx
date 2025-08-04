"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Building2,
  ChevronDown,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  LogOut,
  Plus,
  Settings,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/sidebar"

// Navigation data
const data = {
  user: {
    name: "John Smith",
    email: "john.smith@company.com",
    avatar: "/avatars/john-smith.jpg",
    status: "approved", // approved, pending, rejected
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Invoice Management",
      url: "/dashboard/invoices",
      icon: FileText,
    },
    {
      title: "Financial Overview",
      url: "/dashboard/portfolio",
      icon: DollarSign,
    },
    {
      title: "Account Management",
      url: "#",
      icon: User,
      items: [
        {
          title: "Profile Settings",
          url: "/dashboard/profile",
          icon: User,
        },
        {
          title: "Company Details",
          url: "/dashboard/company",
          icon: Building2,
        },
        {
          title: "Banking Information",
          url: "/dashboard/banking",
          icon: CreditCard,
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: Bell,
        },
      ],
    },
  ],
  navSecondary: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-accent/50">
              <Link href="/dashboard">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
                  <img
                    src="/images/safar-capital-logo.png"
                    alt="Safar Capital"
                    className="h-6 w-auto brightness-0 invert"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-sidebar-foreground">Safar Capital</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">Factoring Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible
                    defaultOpen={item.items?.some((subItem) => pathname === subItem.url)}
                    className="group/collapsible"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="w-full justify-between hover:bg-sidebar-accent/80 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="ml-6 mt-1 space-y-1">
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                              className="hover:bg-sidebar-accent/60 transition-colors duration-200"
                            >
                              <Link href={subItem.url}>
                                {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={pathname === item.url}
                    className="w-full hover:bg-sidebar-accent/80 transition-colors duration-200"
                  >
                    <Link href={item.url}>
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Link href="/dashboard/submit-invoice">
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">Submit Invoice</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    isActive={pathname === item.url}
                    className="hover:bg-sidebar-accent/60 transition-colors duration-200"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors duration-200"
                >
                  <Avatar className="h-8 w-8 rounded-lg border-2 border-sidebar-border">
                    <AvatarImage src={data.user.avatar || "/placeholder.svg"} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                      {data.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">{data.user.email}</span>
                  </div>
                  <ChevronDown className="ml-auto size-4 text-sidebar-foreground/50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border border-sidebar-border"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg border-2 border-sidebar-border">
                      <AvatarImage src={data.user.avatar || "/placeholder.svg"} alt={data.user.name} />
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                        {data.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{data.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{data.user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <span className="text-sm">Account Status:</span>
                  {getStatusBadge(data.user.status)}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/profile">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/notifications">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
