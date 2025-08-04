"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  DollarSign,
  FileText,
  Clock,
  Settings,
  Mail,
  Smartphone,
  Eye,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
  Filter,
} from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "error" | "info"
  category: "approval" | "documentation" | "funding" | "system" | "deadline"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  relatedRequestId?: string
  priority: "high" | "medium" | "low"
  channels: ("email" | "sms" | "push")[]
}

interface NotificationSettings {
  emailEnabled: boolean
  smsEnabled: boolean
  pushEnabled: boolean
  categories: {
    approval: boolean
    documentation: boolean
    funding: boolean
    system: boolean
    deadline: boolean
  }
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      category: "approval",
      title: "Request Approved",
      message:
        "Your financing request INV-2024-001 has been approved for $125,000. Funding will be processed within 24 hours.",
      timestamp: "2024-01-15T14:30:00Z",
      read: false,
      actionRequired: false,
      relatedRequestId: "INV-2024-001",
      priority: "high",
      channels: ["email", "sms", "push"],
    },
    {
      id: "2",
      type: "warning",
      category: "documentation",
      title: "Missing Documentation",
      message: "Bill of Lading is required for request INV-2024-002. Please upload within 48 hours to avoid delays.",
      timestamp: "2024-01-15T12:15:00Z",
      read: false,
      actionRequired: true,
      relatedRequestId: "INV-2024-002",
      priority: "high",
      channels: ["email", "push"],
    },
    {
      id: "3",
      type: "info",
      category: "funding",
      title: "Funds Disbursed",
      message: "Advance payment of $106,250 has been transferred to your account ending in 4567.",
      timestamp: "2024-01-15T10:45:00Z",
      read: true,
      actionRequired: false,
      relatedRequestId: "INV-2024-001",
      priority: "medium",
      channels: ["email", "sms"],
    },
    {
      id: "4",
      type: "error",
      category: "approval",
      title: "Request Rejected",
      message:
        "Request INV-2024-003 has been rejected due to insufficient buyer credit rating. Contact support for alternatives.",
      timestamp: "2024-01-14T16:20:00Z",
      read: true,
      actionRequired: true,
      relatedRequestId: "INV-2024-003",
      priority: "high",
      channels: ["email", "push"],
    },
    {
      id: "5",
      type: "warning",
      category: "deadline",
      title: "Payment Due Soon",
      message: "Invoice INV-2024-001 payment is due in 3 days. Buyer has been notified.",
      timestamp: "2024-01-14T09:00:00Z",
      read: false,
      actionRequired: false,
      relatedRequestId: "INV-2024-001",
      priority: "medium",
      channels: ["email"],
    },
  ])

  const [settings, setSettings] = useState<NotificationSettings>({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    categories: {
      approval: true,
      documentation: true,
      funding: true,
      system: true,
      deadline: true,
    },
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "08:00",
    },
  })

  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState<string>("all")

  const getNotificationIcon = (type: string, category: string) => {
    if (category === "funding") return <DollarSign className="h-5 w-5" />
    if (category === "documentation") return <FileText className="h-5 w-5" />
    if (category === "deadline") return <Clock className="h-5 w-5" />

    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Bell className="h-5 w-5 text-blue-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "error":
        return "border-l-red-500 bg-red-50"
      default:
        return "border-l-blue-500 bg-blue-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Low</Badge>
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const markAsUnread = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: false } : notif)))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread" && notif.read) return false
    if (activeTab === "action-required" && !notif.actionRequired) return false
    if (filterType !== "all" && notif.category !== filterType) return false
    return true
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length
  const actionRequiredCount = notifications.filter((notif) => notif.actionRequired && !notif.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notification Center
          </h1>
          <p className="text-sm text-gray-600 mt-1">Stay updated on your financing requests and account activity</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      {actionRequiredCount > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{actionRequiredCount} notification(s) require your immediate attention.</strong> Please review and
            take necessary actions to avoid delays in processing.
          </AlertDescription>
        </Alert>
      )}

      {/* Notification Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="action-required">Action Required ({actionRequiredCount})</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="all">All Categories</option>
              <option value="approval">Approvals</option>
              <option value="documentation">Documentation</option>
              <option value="funding">Funding</option>
              <option value="deadline">Deadlines</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
                <p className="text-gray-600">
                  {activeTab === "unread"
                    ? "All caught up! No unread notifications."
                    : activeTab === "action-required"
                      ? "No actions required at this time."
                      : "You don't have any notifications yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-l-4 transition-all duration-200 ${getNotificationColor(notification.type)} ${
                    !notification.read ? "shadow-md" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">{getNotificationIcon(notification.type, notification.category)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            {getPriorityBadge(notification.priority)}
                            {notification.actionRequired && (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200">Action Required</Badge>
                            )}
                          </div>
                          <p className={`text-sm ${!notification.read ? "text-gray-700" : "text-gray-600"} mb-2`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                            {notification.relatedRequestId && (
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {notification.relatedRequestId}
                              </span>
                            )}
                            <div className="flex items-center gap-1">
                              {notification.channels.includes("email") && <Mail className="h-3 w-3" />}
                              {notification.channels.includes("sms") && <Smartphone className="h-3 w-3" />}
                              {notification.channels.includes("push") && <Bell className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 ml-4">
                        {notification.relatedRequestId && (
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)
                          }
                        >
                          {notification.read ? (
                            <MarkAsUnread className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Delivery Channels */}
          <div>
            <h4 className="font-medium mb-3">Delivery Channels</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>Email Notifications</span>
                </div>
                <Switch
                  checked={settings.emailEnabled}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailEnabled: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-gray-500" />
                  <span>SMS Notifications</span>
                </div>
                <Switch
                  checked={settings.smsEnabled}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsEnabled: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span>Push Notifications</span>
                </div>
                <Switch
                  checked={settings.pushEnabled}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushEnabled: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Notification Categories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(settings.categories).map(([category, enabled]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="capitalize">{category.replace("_", " ")}</span>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        categories: { ...prev.categories, [category]: checked },
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
