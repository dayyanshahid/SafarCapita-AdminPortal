"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  DollarSign,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  Bell,
  ArrowUpRight,
  Eye,
  Download,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";

export default function AdminDashboard() {
  // Mock data for admin dashboard
  const mockData = {
    totalSellers: 156,
    activeSellers: 142,
    pendingApplications: 23,
    totalFinancingRequests: 89,
    approvedRequests: 67,
    pendingRequests: 15,
    rejectedRequests: 7,
    totalFinancingVolume: 12500000,
    monthlyVolume: 2100000,
    averageProcessingTime: 2.3,
    systemHealth: 98.5,
    recentActivity: [
      {
        id: 1,
        type: "seller_application",
        description: "New seller application from TechCorp Inc.",
        timestamp: "2024-01-15T10:30:00Z",
        status: "pending",
        priority: "medium",
      },
      {
        id: 2,
        type: "financing_request",
        description: "Financing request approved for $125,000",
        timestamp: "2024-01-15T09:15:00Z",
        status: "approved",
        priority: "high",
      },
      {
        id: 3,
        type: "document_verification",
        description: "Document verification completed for Global Trade Ltd.",
        timestamp: "2024-01-15T08:45:00Z",
        status: "completed",
        priority: "low",
      },
      {
        id: 4,
        type: "risk_assessment",
        description: "Risk assessment flagged for MegaCorp Solutions",
        timestamp: "2024-01-15T08:00:00Z",
        status: "flagged",
        priority: "high",
      },
    ],
    systemAlerts: [
      {
        id: 1,
        type: "warning",
        message: "High volume of pending applications requires attention",
        timestamp: "2024-01-15T11:00:00Z",
      },
      {
        id: 2,
        type: "info",
        message: "Monthly processing targets exceeded by 15%",
        timestamp: "2024-01-15T10:00:00Z",
      },
      {
        id: 3,
        type: "error",
        message: "Document validation service experiencing delays",
        timestamp: "2024-01-15T09:30:00Z",
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "seller_application":
        return <Users className="h-4 w-4" />;
      case "financing_request":
        return <DollarSign className="h-4 w-4" />;
      case "document_verification":
        return <FileText className="h-4 w-4" />;
      case "risk_assessment":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const headerActions = (
    <div className="flex gap-3">
      <Button variant="outline" className="gap-2 bg-transparent">
        <Download className="h-4 w-4" />
        Export Report
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Eye className="h-4 w-4" />
        System Logs
      </Button>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardHeader title="Admin Dashboard" actions={headerActions} />

      <div className="space-y-6">
        {/* System Health & Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sellers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.totalSellers}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+8</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Financing Volume
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(mockData.totalFinancingVolume)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+15%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Applications
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockData.pendingApplications}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.systemHealth}%</div>
              <Progress value={mockData.systemHealth} className="mt-2" />
            </CardContent>
          </Card> */}
        </div>

        {/* Processing Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Processing Overview
              </CardTitle>
              <CardDescription>
                Current status of financing requests and applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {mockData.approvedRequests}
                  </div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockData.pendingRequests}
                  </div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {mockData.rejectedRequests}
                  </div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Average Processing Time
                  </span>
                  <span className="text-sm font-bold">
                    {mockData.averageProcessingTime} days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 border rounded-lg"
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(alert.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system activities and administrative actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(activity.priority)}>
                      {activity.priority}
                    </Badge>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
