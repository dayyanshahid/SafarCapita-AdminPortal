"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  TrendingUp,
  FileText,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function SellerApplicationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Mock data for seller applications
  const applications = [
    {
      id: "APP-001",
      companyName: "TechCorp Solutions Inc.",
      contactPerson: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      submissionDate: "2024-01-15",
      status: "pending",
      priority: "high",
      businessType: "Technology Services",
      annualRevenue: 2500000,
      yearsInBusiness: 5,
      requestedLimit: 500000,
      completionScore: 85,
      riskScore: 75,
      creditRating: "B+",
      documentsComplete: 3,
      documentsTotal: 4,
    },
    {
      id: "APP-002",
      companyName: "Global Trade Ltd.",
      contactPerson: "Sarah Johnson",
      email: "sarah@globaltrade.com",
      phone: "+1 (555) 987-6543",
      submissionDate: "2024-01-14",
      status: "under_review",
      priority: "medium",
      businessType: "Import/Export",
      annualRevenue: 5000000,
      yearsInBusiness: 12,
      requestedLimit: 1000000,
      completionScore: 100,
      riskScore: 85,
      creditRating: "A-",
      documentsComplete: 4,
      documentsTotal: 4,
    },
    {
      id: "APP-003",
      companyName: "MegaCorp Solutions",
      contactPerson: "Mike Wilson",
      email: "mike@megacorp.com",
      phone: "+1 (555) 456-7890",
      submissionDate: "2024-01-13",
      status: "approved",
      priority: "low",
      businessType: "Manufacturing",
      annualRevenue: 8000000,
      yearsInBusiness: 15,
      requestedLimit: 1500000,
      completionScore: 100,
      riskScore: 92,
      creditRating: "A+",
      documentsComplete: 4,
      documentsTotal: 4,
    },
    {
      id: "APP-004",
      companyName: "StartupCo Inc.",
      contactPerson: "Emily Davis",
      email: "emily@startupco.com",
      phone: "+1 (555) 321-0987",
      submissionDate: "2024-01-12",
      status: "rejected",
      priority: "low",
      businessType: "Software Development",
      annualRevenue: 500000,
      yearsInBusiness: 2,
      requestedLimit: 200000,
      completionScore: 60,
      riskScore: 45,
      creditRating: "C",
      documentsComplete: 2,
      documentsTotal: 4,
    },
    {
      id: "APP-005",
      companyName: "Healthcare Plus LLC",
      contactPerson: "Dr. Amanda Rodriguez",
      email: "amanda@healthcareplus.com",
      phone: "+1 (555) 654-3210",
      submissionDate: "2024-01-11",
      status: "pending",
      priority: "high",
      businessType: "Healthcare Services",
      annualRevenue: 3200000,
      yearsInBusiness: 8,
      requestedLimit: 750000,
      completionScore: 90,
      riskScore: 80,
      creditRating: "A-",
      documentsComplete: 4,
      documentsTotal: 4,
    },
    {
      id: "APP-006",
      companyName: "Construction Pro Inc.",
      contactPerson: "Robert Chen",
      email: "robert@constructionpro.com",
      phone: "+1 (555) 789-0123",
      submissionDate: "2024-01-10",
      status: "under_review",
      priority: "medium",
      businessType: "Construction",
      annualRevenue: 4500000,
      yearsInBusiness: 10,
      requestedLimit: 900000,
      completionScore: 95,
      riskScore: 78,
      creditRating: "B+",
      documentsComplete: 4,
      documentsTotal: 4,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <Eye className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Statistics
  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    underReview: applications.filter((app) => app.status === "under_review").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  const headerActions = (
    <div className="flex gap-3">
      <Button variant="outline" className="gap-2 bg-transparent">
        <Download className="h-4 w-4" />
        Export Applications
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Filter className="h-4 w-4" />
        Advanced Filters
      </Button>
      <Button className="gap-2 bg-red-600 hover:bg-red-700">
        <Plus className="h-4 w-4" />
        Manual Application
      </Button>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardHeader title="Seller Applications" actions={headerActions} />

      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Application Management
            </CardTitle>
            <CardDescription>Review and manage seller onboarding applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by company, contact, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Submission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Requested Limit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">{application.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.companyName}</div>
                          <div className="text-sm text-muted-foreground">{application.businessType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(application.submissionDate)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status.replace("_", " ")}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(application.priority)}>
                          {application.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getRiskScoreColor(application.riskScore)}`}>
                            {application.riskScore}%
                          </span>
                          <TrendingUp className={`h-3 w-3 ${getRiskScoreColor(application.riskScore)}`} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{application.completionScore}%</div>
                          <div className="text-xs text-muted-foreground">
                            ({application.documentsComplete}/{application.documentsTotal})
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatCurrency(application.requestedLimit)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/sellers/applications/${application.id}`)}
                            className="bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No applications found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
