"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  AlertTriangle,
  MoreHorizontal,
  Star,
  Shield,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SellerApplication {
  id: string
  companyName: string
  contactPerson: string
  email: string
  country: string
  industry: string
  applicationDate: string
  status: "pending" | "approved" | "rejected" | "under_review"
  priority: "low" | "medium" | "high"
  completionPercentage: number
  riskScore: number
  riskLevel: "low" | "medium" | "high"
  documentsSubmitted: number
  documentsRequired: number
  reviewer?: string
  reviewDate?: string
  notes?: string
  annualRevenue?: number
  yearsInBusiness?: number
}

const mockApplications: SellerApplication[] = [
  {
    id: "app-001",
    companyName: "Global Trade Corp",
    contactPerson: "John Smith",
    email: "john@globaltrade.com",
    country: "United States",
    industry: "Electronics",
    applicationDate: "2024-01-15T10:30:00Z",
    status: "pending",
    priority: "high",
    completionPercentage: 85,
    riskScore: 72,
    riskLevel: "medium",
    documentsSubmitted: 8,
    documentsRequired: 10,
    annualRevenue: 5000000,
    yearsInBusiness: 8,
  },
  {
    id: "app-002",
    companyName: "Export Solutions Ltd",
    contactPerson: "Sarah Johnson",
    email: "sarah@exportsolutions.com",
    country: "United Kingdom",
    industry: "Textiles",
    applicationDate: "2024-01-14T14:20:00Z",
    status: "approved",
    priority: "medium",
    completionPercentage: 100,
    riskScore: 85,
    riskLevel: "low",
    documentsSubmitted: 12,
    documentsRequired: 12,
    reviewer: "Mike Wilson",
    reviewDate: "2024-01-15T09:15:00Z",
    notes: "Excellent documentation and strong financial position",
    annualRevenue: 12000000,
    yearsInBusiness: 15,
  },
  {
    id: "app-003",
    companyName: "International Traders Inc",
    contactPerson: "David Chen",
    email: "david@intltraders.com",
    country: "Singapore",
    industry: "Machinery",
    applicationDate: "2024-01-13T16:45:00Z",
    status: "under_review",
    priority: "high",
    completionPercentage: 92,
    riskScore: 68,
    riskLevel: "medium",
    documentsSubmitted: 11,
    documentsRequired: 12,
    reviewer: "Lisa Chen",
    annualRevenue: 8500000,
    yearsInBusiness: 12,
  },
  {
    id: "app-004",
    companyName: "Maritime Logistics Co",
    contactPerson: "Emma Wilson",
    email: "emma@maritime.com",
    country: "Germany",
    industry: "Logistics",
    applicationDate: "2024-01-12T11:30:00Z",
    status: "rejected",
    priority: "low",
    completionPercentage: 65,
    riskScore: 45,
    riskLevel: "high",
    documentsSubmitted: 6,
    documentsRequired: 12,
    reviewer: "John Smith",
    reviewDate: "2024-01-13T10:20:00Z",
    notes: "Insufficient documentation and high risk profile",
    annualRevenue: 2000000,
    yearsInBusiness: 3,
  },
  {
    id: "app-005",
    companyName: "Tech Innovations Ltd",
    contactPerson: "Michael Brown",
    email: "michael@techinnovations.com",
    country: "Canada",
    industry: "Technology",
    applicationDate: "2024-01-11T09:15:00Z",
    status: "pending",
    priority: "medium",
    completionPercentage: 78,
    riskScore: 79,
    riskLevel: "low",
    documentsSubmitted: 9,
    documentsRequired: 12,
    annualRevenue: 15000000,
    yearsInBusiness: 20,
  },
]

export default function SellerApprovalPage() {
  const [applications, setApplications] = useState<SellerApplication[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [reviewNotes, setReviewNotes] = useState("")
  const [showBulkActions, setShowBulkActions] = useState(false)

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.country.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
    const matchesRisk = riskFilter === "all" || app.riskLevel === riskFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesRisk
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      case "under_review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleApplicationAction = (applicationId: string, action: "approve" | "reject", notes?: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status: action === "approve" ? "approved" : "rejected",
              reviewer: "Current Admin",
              reviewDate: new Date().toISOString(),
              notes: notes || app.notes,
            }
          : app,
      ),
    )
  }

  const handleBulkAction = (action: "approve" | "reject") => {
    const notes = reviewNotes.trim()
    selectedApplications.forEach((appId) => {
      handleApplicationAction(appId, action, notes)
    })
    setSelectedApplications([])
    setReviewNotes("")
    setShowBulkActions(false)
  }

  const toggleApplicationSelection = (applicationId: string) => {
    setSelectedApplications((prev) =>
      prev.includes(applicationId) ? prev.filter((id) => id !== applicationId) : [...prev, applicationId],
    )
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    underReview: applications.filter((a) => a.status === "under_review").length,
    highRisk: applications.filter((a) => a.riskLevel === "high").length,
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-900">Seller Approval Center</h1>
          <p className="text-red-600 mt-1">Review and approve seller applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {selectedApplications.length > 0 && (
            <Button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="bg-red-600 hover:bg-red-700"
              size="sm"
            >
              Bulk Actions ({selectedApplications.length})
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-700">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.underReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-700">{stats.highRisk}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions Panel */}
      {showBulkActions && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-red-900">
                Bulk Actions for {selectedApplications.length} applications
              </h3>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">Review Notes</label>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes for bulk action..."
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => handleBulkAction("approve")} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Selected
                </Button>
                <Button onClick={() => handleBulkAction("reject")} variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
                <Button onClick={() => setShowBulkActions(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications, companies, or contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

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

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className={`border rounded-lg p-6 transition-all duration-200 ${
                  selectedApplications.includes(application.id) ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(application.id)}
                      onChange={() => toggleApplicationSelection(application.id)}
                      className="mt-1 h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{application.companyName}</h3>
                        <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                          {application.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(application.priority)}`}>
                          {application.priority === "high" && <Star className="h-3 w-3 mr-1" />}
                          {application.priority.toUpperCase()}
                        </Badge>
                        <Badge className={`text-xs ${getRiskColor(application.riskLevel)}`}>
                          <Shield className="h-3 w-3 mr-1" />
                          {application.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-600">Contact Person:</span>
                          <div className="font-medium">{application.contactPerson}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Location & Industry:</span>
                          <div className="font-medium">{application.country}</div>
                          <div className="text-sm text-gray-500">{application.industry}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Business Info:</span>
                          <div className="font-medium">${application.annualRevenue?.toLocaleString()} revenue</div>
                          <div className="text-sm text-gray-500">{application.yearsInBusiness} years in business</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Application Progress</span>
                            <span className="font-medium">{application.completionPercentage}%</span>
                          </div>
                          <Progress value={application.completionPercentage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Risk Score</span>
                            <span className="font-medium">{application.riskScore}/100</span>
                          </div>
                          <Progress
                            value={application.riskScore}
                            className={`h-2 ${
                              application.riskScore >= 70
                                ? "[&>div]:bg-green-500"
                                : application.riskScore >= 50
                                  ? "[&>div]:bg-yellow-500"
                                  : "[&>div]:bg-red-500"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Documents</span>
                            <span className="font-medium">
                              {application.documentsSubmitted}/{application.documentsRequired}
                            </span>
                          </div>
                          <Progress
                            value={(application.documentsSubmitted / application.documentsRequired) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">
                        Applied: {new Date(application.applicationDate).toLocaleDateString()}
                        {application.reviewer && (
                          <span className="ml-4">
                            Reviewed by: <span className="font-medium">{application.reviewer}</span>
                            {application.reviewDate && (
                              <span className="ml-1">on {new Date(application.reviewDate).toLocaleDateString()}</span>
                            )}
                          </span>
                        )}
                      </div>

                      {application.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                          <span className="text-gray-600 font-medium">Review Notes:</span>
                          <div className="mt-1">{application.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </Button>

                    {(application.status === "pending" || application.status === "under_review") && (
                      <>
                        <Button
                          onClick={() => handleApplicationAction(application.id, "approve")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            handleApplicationAction(application.id, "reject", "Application does not meet requirements")
                          }
                          size="sm"
                          variant="destructive"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Full Application</DropdownMenuItem>
                        <DropdownMenuItem>View Documents</DropdownMenuItem>
                        <DropdownMenuItem>Add Review Note</DropdownMenuItem>
                        <DropdownMenuItem>View Risk Assessment</DropdownMenuItem>
                        <DropdownMenuItem>Export Application</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
