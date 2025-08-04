"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
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
  Building2,
  Star,
  ChevronDown,
  ChevronRight,
  Shield,
  CreditCard,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ManualApplicationForm } from "@/components/admin/manual-application-form"
import { AdvancedFilters } from "@/components/admin/advanced-filters"

// Types
interface SellerApplication {
  id: string
  companyName: string
  contactPerson: string
  title: string
  email: string
  phone: string
  address: string
  submissionDate: string
  lastUpdated: string
  status: "pending" | "under_review" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
  businessType: string
  industry: string
  annualRevenue: number
  yearsInBusiness: number
  employeeCount: number
  requestedLimit: number
  completionScore: number
  riskScore: number
  creditRating: string
  taxId: string
  website: string
  businessDescription: string
  documentsComplete: number
  totalDocuments: number
  riskLevel: "low" | "medium" | "high"
  source?: string
  // Enhanced fields
  averageOrderValue: number
  monthlyTransactionVolume: number
  primaryExportMarkets: string
  majorClients: string
  cashFlowCycle: string
  numberOfEmployees: number
  bankName: string
  accountType: string
  accountHolderName: string
  accountNumber: string
  routingNumber: string
  swiftBicCode: string
  ibanCode: string
  primaryCurrency: string
  bankAddress: string
  documents: Document[]
  // New fields for contracts and financing
  contracts: Contract[]
  financingRequests: FinancingRequest[]
}

interface Contract {
  id: string
  title: string
  type: string
  status: "active" | "expired" | "pending"
  value: number
  startDate: string
  endDate: string
  utilization: number
}

interface FinancingRequest {
  id: string
  submissionDate: string
  buyer: string
  invoiceAmount: number
  requestedAmount: number
  currency: string
  status: "pending" | "approved" | "under_review" | "completed" | "rejected"
  priority: "high" | "medium" | "low"
}

// Mock data with enhanced fields
const mockApplications: SellerApplication[] = [
  {
    id: "APP-001",
    companyName: "TechCorp Solutions Inc.",
    contactPerson: "John Smith",
    title: "Chief Financial Officer",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 500, New York, NY 10001",
    submissionDate: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-16T14:22:00Z",
    status: "approved",
    priority: "high",
    businessType: "Technology Services",
    industry: "Software Development",
    annualRevenue: 2500000,
    yearsInBusiness: 5,
    employeeCount: 45,
    requestedLimit: 500000,
    completionScore: 85,
    riskScore: 75,
    creditRating: "B+",
    taxId: "12-3456789",
    website: "https://techcorp.com",
    businessDescription:
      "TechCorp Solutions provides enterprise software development and IT consulting services to Fortune 500 companies.",
    documentsComplete: 4,
    totalDocuments: 5,
    riskLevel: "medium",
    source: "online",
    // Enhanced fields
    averageOrderValue: 75000,
    monthlyTransactionVolume: 450000,
    primaryExportMarkets: "United States, European Union, Canada",
    majorClients: "Microsoft, IBM, Oracle, SAP",
    cashFlowCycle: "60",
    numberOfEmployees: 45,
    bankName: "JPMorgan Chase Bank",
    accountType: "business_checking",
    accountHolderName: "TechCorp Solutions Inc.",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    swiftBicCode: "CHASUS33",
    ibanCode: "",
    primaryCurrency: "USD",
    bankAddress: "270 Park Avenue, New York, NY 10017",
    documents: [
      {
        id: "DOC-001",
        applicationId: "APP-001",
        documentType: "Business License",
        fileName: "business_license.pdf",
        fileSize: "2.3 MB",
        uploadDate: "2024-01-15T09:15:00Z",
        status: "approved",
        reviewedBy: "John Admin",
        reviewDate: "2024-01-16T10:30:00Z",
        notes: "Valid license, expires 2025",
        priority: "medium",
        category: "business",
      },
      {
        id: "DOC-002",
        applicationId: "APP-001",
        documentType: "Tax Returns",
        fileName: "tax_returns_2023.pdf",
        fileSize: "5.7 MB",
        uploadDate: "2024-01-15T09:20:00Z",
        status: "pending",
        priority: "high",
        category: "financial",
      },
      {
        id: "DOC-003",
        applicationId: "APP-001",
        documentType: "Financial Statements",
        fileName: "financial_statements_2023.pdf",
        fileSize: "3.1 MB",
        uploadDate: "2024-01-15T09:25:00Z",
        status: "approved",
        reviewedBy: "Sarah Admin",
        reviewDate: "2024-01-16T11:15:00Z",
        priority: "medium",
        category: "financial",
      },
    ],
    contracts: [
      {
        id: "CT-2024-001",
        title: "Trade Finance Agreement",
        type: "Trade Finance",
        status: "active",
        value: 250000,
        startDate: "2024-01-15",
        endDate: "2024-12-15",
        utilization: 75,
      },
      {
        id: "CT-2023-045",
        title: "Invoice Factoring Agreement",
        type: "Invoice Factoring",
        status: "expired",
        value: 150000,
        startDate: "2023-06-01",
        endDate: "2023-12-31",
        utilization: 95,
      },
    ],
    financingRequests: [
      {
        id: "FR-2024-001",
        submissionDate: "2024-01-15",
        buyer: "Microsoft Corporation",
        invoiceAmount: 485000,
        requestedAmount: 388000,
        currency: "USD",
        status: "approved",
        priority: "high",
      },
      {
        id: "FR-2024-002",
        submissionDate: "2024-01-20",
        buyer: "Apple Inc.",
        invoiceAmount: 320000,
        requestedAmount: 256000,
        currency: "USD",
        status: "under_review",
        priority: "medium",
      },
    ],
  },
  {
    id: "APP-002",
    companyName: "Global Trade Partners",
    contactPerson: "Sarah Johnson",
    title: "Managing Director",
    email: "sarah@globaltradepart.com",
    phone: "+1 (555) 987-6543",
    address: "456 Commerce St, Floor 12, Los Angeles, CA 90210",
    submissionDate: "2024-01-14T14:22:00Z",
    lastUpdated: "2024-01-15T11:45:00Z",
    status: "approved",
    priority: "medium",
    businessType: "Import/Export",
    industry: "International Trade",
    annualRevenue: 4200000,
    yearsInBusiness: 8,
    employeeCount: 67,
    requestedLimit: 750000,
    completionScore: 92,
    riskScore: 82,
    creditRating: "A-",
    taxId: "98-7654321",
    website: "https://globaltradepart.com",
    businessDescription:
      "Global Trade Partners specializes in international trade facilitation and supply chain management.",
    documentsComplete: 5,
    totalDocuments: 5,
    riskLevel: "low",
    source: "online",
    // Enhanced fields
    averageOrderValue: 125000,
    monthlyTransactionVolume: 650000,
    primaryExportMarkets: "European Union, Asia-Pacific, North America",
    majorClients: "Boeing, Airbus, General Electric, Siemens",
    cashFlowCycle: "90",
    numberOfEmployees: 67,
    bankName: "Bank of America",
    accountType: "business_checking",
    accountHolderName: "Global Trade Partners LLC",
    accountNumber: "9876543210",
    routingNumber: "026009593",
    swiftBicCode: "BOFAUS3N",
    ibanCode: "",
    primaryCurrency: "USD",
    bankAddress: "100 North Tryon Street, Charlotte, NC 28255",
    documents: [
      {
        id: "DOC-004",
        applicationId: "APP-002",
        documentType: "Import/Export License",
        fileName: "import_export_license.pdf",
        fileSize: "1.8 MB",
        uploadDate: "2024-01-14T14:25:00Z",
        status: "approved",
        reviewedBy: "Mike Admin",
        reviewDate: "2024-01-15T09:30:00Z",
        priority: "high",
        category: "compliance",
      },
      {
        id: "DOC-005",
        applicationId: "APP-002",
        documentType: "Bank Statements",
        fileName: "bank_statements_6months.pdf",
        fileSize: "4.2 MB",
        uploadDate: "2024-01-14T14:30:00Z",
        status: "under_review",
        reviewedBy: "Lisa Admin",
        priority: "medium",
        category: "financial",
      },
    ],
    contracts: [
      {
        id: "CT-2024-002",
        title: "Export Finance Facility",
        type: "Export Finance",
        status: "active",
        value: 500000,
        startDate: "2024-01-10",
        endDate: "2024-12-10",
        utilization: 68,
      },
    ],
    financingRequests: [
      {
        id: "FR-2024-003",
        submissionDate: "2024-01-18",
        buyer: "Boeing Company",
        invoiceAmount: 750000,
        requestedAmount: 600000,
        currency: "USD",
        status: "approved",
        priority: "high",
      },
      {
        id: "FR-2024-004",
        submissionDate: "2024-01-22",
        buyer: "Airbus SE",
        invoiceAmount: 420000,
        requestedAmount: 336000,
        currency: "EUR",
        status: "completed",
        priority: "medium",
      },
    ],
  },
  {
    id: "APP-003",
    companyName: "Manufacturing Plus LLC",
    contactPerson: "Mike Rodriguez",
    title: "Operations Manager",
    email: "m.rodriguez@mfgplus.com",
    phone: "+1 (555) 456-7890",
    address: "789 Industrial Blvd, Detroit, MI 48201",
    submissionDate: "2024-01-13T11:15:00Z",
    lastUpdated: "2024-01-14T09:20:00Z",
    status: "approved",
    priority: "low",
    businessType: "Manufacturing",
    industry: "Industrial Equipment",
    annualRevenue: 1800000,
    yearsInBusiness: 12,
    employeeCount: 89,
    requestedLimit: 300000,
    completionScore: 95,
    riskScore: 88,
    creditRating: "A",
    taxId: "11-2233445",
    website: "https://mfgplus.com",
    businessDescription: "Manufacturing Plus LLC produces high-quality industrial equipment and machinery components.",
    documentsComplete: 5,
    totalDocuments: 5,
    riskLevel: "low",
    source: "referral",
    // Enhanced fields
    averageOrderValue: 45000,
    monthlyTransactionVolume: 280000,
    primaryExportMarkets: "United States, Canada, Mexico",
    majorClients: "Ford Motor Company, General Motors, Caterpillar",
    cashFlowCycle: "30",
    numberOfEmployees: 89,
    bankName: "Wells Fargo Bank",
    accountType: "business_checking",
    accountHolderName: "Manufacturing Plus LLC",
    accountNumber: "5555666677",
    routingNumber: "121000248",
    swiftBicCode: "WFBIUS6S",
    ibanCode: "",
    primaryCurrency: "USD",
    bankAddress: "420 Montgomery Street, San Francisco, CA 94104",
    documents: [
      {
        id: "DOC-006",
        applicationId: "APP-003",
        documentType: "Manufacturing License",
        fileName: "manufacturing_license.pdf",
        fileSize: "2.1 MB",
        uploadDate: "2024-01-13T11:20:00Z",
        status: "approved",
        reviewedBy: "John Admin",
        reviewDate: "2024-01-14T08:45:00Z",
        priority: "medium",
        category: "business",
      },
    ],
    contracts: [
      {
        id: "CT-2024-003",
        title: "Equipment Finance Agreement",
        type: "Equipment Finance",
        status: "active",
        value: 200000,
        startDate: "2024-01-05",
        endDate: "2024-12-05",
        utilization: 45,
      },
    ],
    financingRequests: [
      {
        id: "FR-2024-005",
        submissionDate: "2024-01-12",
        buyer: "Ford Motor Company",
        invoiceAmount: 180000,
        requestedAmount: 144000,
        currency: "USD",
        status: "completed",
        priority: "medium",
      },
    ],
  },
]

export default function UnifiedSellerManagementPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [applications, setApplications] = useState<SellerApplication[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [expandedApplications, setExpandedApplications] = useState<string[]>([])
  const [showManualForm, setShowManualForm] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState({})
  const [isExporting, setIsExporting] = useState(false)

  // Helper functions
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

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
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

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
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

  // Filter functions
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
    const matchesRisk = riskFilter === "all" || app.riskLevel === riskFilter
    return matchesSearch && matchesStatus && matchesPriority && matchesRisk
  })

  // Statistics
  const applicationStats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    underReview: applications.filter((app) => app.status === "under_review").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    highRisk: applications.filter((app) => app.riskLevel === "high").length,
    readyForApproval: applications.filter((app) => app.completionScore >= 90 && app.status === "pending").length,
    totalContracts: applications.reduce((acc, app) => acc + app.contracts.length, 0),
    activeContracts: applications.reduce(
      (acc, app) => acc + app.contracts.filter((c) => c.status === "active").length,
      0,
    ),
    totalFinancingRequests: applications.reduce((acc, app) => acc + app.financingRequests.length, 0),
    totalFinancingValue: applications.reduce(
      (acc, app) => acc + app.financingRequests.reduce((sum, req) => sum + req.requestedAmount, 0),
      0,
    ),
  }

  const documentStats = {
    total: applications.reduce((acc, app) => acc + app.documents.length, 0),
    pending: applications.reduce((acc, app) => acc + app.documents.filter((doc) => doc.status === "pending").length, 0),
    approved: applications.reduce(
      (acc, app) => acc + app.documents.filter((doc) => doc.status === "approved").length,
      0,
    ),
    rejected: applications.reduce(
      (acc, app) => acc + app.documents.filter((doc) => doc.status === "rejected").length,
      0,
    ),
    underReview: applications.reduce(
      (acc, app) => acc + app.documents.filter((doc) => doc.status === "under_review").length,
      0,
    ),
  }

  // Action handlers
  const handleManualApplicationSubmit = (applicationData: any) => {
    const newApplication: SellerApplication = {
      ...applicationData,
      documents: [],
      contracts: [],
      financingRequests: [],
    }
    setApplications((prev) => [newApplication, ...prev])
  }

  const handleAdvancedFiltersApply = (filters: any) => {
    setAdvancedFilters(filters)
    // Apply advanced filters logic here
  }

  const handleExportData = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create CSV data
    const csvData = filteredApplications.map((app) => ({
      ID: app.id,
      Company: app.companyName,
      Contact: app.contactPerson,
      Email: app.email,
      Phone: app.phone,
      Status: app.status,
      Priority: app.priority,
      "Risk Level": app.riskLevel,
      "Risk Score": app.riskScore,
      "Completion Score": app.completionScore,
      "Annual Revenue": app.annualRevenue,
      "Requested Limit": app.requestedLimit,
      "Average Order Value": app.averageOrderValue,
      "Monthly Transaction Volume": app.monthlyTransactionVolume,
      "Years in Business": app.yearsInBusiness,
      "Employee Count": app.employeeCount,
      Industry: app.industry,
      "Business Type": app.businessType,
      "Cash Flow Cycle": app.cashFlowCycle,
      "Primary Currency": app.primaryCurrency,
      "Submission Date": formatDate(app.submissionDate),
      "Last Updated": formatDate(app.lastUpdated),
    }))

    // Convert to CSV
    const headers = Object.keys(csvData[0] || {})
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => headers.map((header) => `"${row[header as keyof typeof row]}"`).join(",")),
    ].join("\n")

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `seller-applications-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsExporting(false)
  }

  const toggleApplicationExpansion = (applicationId: string) => {
    setExpandedApplications((prev) =>
      prev.includes(applicationId) ? prev.filter((id) => id !== applicationId) : [...prev, applicationId],
    )
  }

  const handleApplicationAction = (applicationId: string, action: "approve" | "reject", notes?: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status: action === "approve" ? "approved" : "rejected",
              lastUpdated: new Date().toISOString(),
            }
          : app,
      ),
    )
  }

  const handleDocumentAction = (
    applicationId: string,
    documentId: string,
    action: "approve" | "reject",
    notes?: string,
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              documents: app.documents.map((doc) =>
                doc.id === documentId
                  ? {
                      ...doc,
                      status: action === "approve" ? "approved" : "rejected",
                      reviewedBy: "Current Admin",
                      reviewDate: new Date().toISOString(),
                      notes: notes || doc.notes,
                    }
                  : doc,
              ),
              documentsComplete: app.documents.filter((doc) =>
                doc.id === documentId ? action === "approve" : doc.status === "approved",
              ).length,
            }
          : app,
      ),
    )
  }

  const headerActions = (
    <div className="flex gap-3">
      <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExportData} disabled={isExporting}>
        <Download className="h-4 w-4" />
        {isExporting ? "Exporting..." : "Export Data"}
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowAdvancedFilters(true)}>
        <Filter className="h-4 w-4" />
        Advanced Filters
      </Button>
      <Button className="gap-2 bg-red-600 hover:bg-red-700" onClick={() => router.push("/admin/sellers/create")}>
        <Plus className="h-4 w-4" />
        Create Application
      </Button>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardHeader title="Seller Management" actions={headerActions} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications & Approval</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Overall Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applicationStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{applicationStats.pending}</span> pending review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applicationStats.activeContracts}</div>
                <p className="text-xs text-muted-foreground">{applicationStats.totalContracts} total contracts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Financing Requests</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applicationStats.totalFinancingRequests}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(applicationStats.totalFinancingValue)} total value
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-yellow-600">{documentStats.pending}</span> awaiting review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((applicationStats.approved / applicationStats.total) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {applicationStats.approved} of {applicationStats.total} approved
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{applicationStats.highRisk}</div>
                <p className="text-xs text-muted-foreground">Require special attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Ready for Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700 mb-2">{applicationStats.readyForApproval}</div>
                <p className="text-sm text-green-600">Applications with 90%+ completion</p>
                <Button
                  className="mt-3 bg-green-600 hover:bg-green-700"
                  size="sm"
                  onClick={() => setActiveTab("applications")}
                >
                  Review Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Needs Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-700 mb-2">{applicationStats.highRisk}</div>
                <p className="text-sm text-yellow-600">High-risk applications</p>
                <Button
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700"
                  size="sm"
                  onClick={() => {
                    setRiskFilter("high")
                    setActiveTab("applications")
                  }}
                >
                  Review Risk
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700 mb-2">{applicationStats.pending}</div>
                <p className="text-sm text-blue-600">Total pending applications</p>
                <Button
                  className="mt-3 bg-blue-600 hover:bg-blue-700"
                  size="sm"
                  onClick={() => {
                    setStatusFilter("pending")
                    setActiveTab("applications")
                  }}
                >
                  Start Review
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest seller applications submitted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-8 w-8 p-2 bg-red-100 text-red-600 rounded-lg" />
                        <div>
                          <p className="font-medium">{app.companyName}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(app.submissionDate)}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(app.status)}>
                        {app.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Review Queue</CardTitle>
                <CardDescription>Documents pending verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications
                    .flatMap((app) => app.documents.map((doc) => ({ ...doc, companyName: app.companyName })))
                    .filter((doc) => doc.status === "pending")
                    .slice(0, 5)
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 p-2 bg-yellow-100 text-yellow-600 rounded-lg" />
                          <div>
                            <p className="font-medium">{doc.documentType}</p>
                            <p className="text-sm text-muted-foreground">{doc.companyName}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(doc.priority)}>
                          {doc.priority}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications & Approval Tab */}
        <TabsContent value="applications" className="space-y-6">
          {/* Application Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{applicationStats.total}</p>
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
                    <p className="text-2xl font-bold text-yellow-600">{applicationStats.pending}</p>
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
                    <p className="text-2xl font-bold text-blue-600">{applicationStats.underReview}</p>
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
                    <p className="text-2xl font-bold text-green-600">{applicationStats.approved}</p>
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
                    <p className="text-2xl font-bold text-red-600">{applicationStats.rejected}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search applications..."
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
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List with Embedded Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Applications ({filteredApplications.length})</CardTitle>
              <CardDescription>Click on an application to view and manage its documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <Collapsible
                    key={application.id}
                    open={expandedApplications.includes(application.id)}
                    onOpenChange={() => toggleApplicationExpansion(application.id)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <div className="p-6 hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="flex items-center">
                                {expandedApplications.includes(application.id) ? (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-lg font-semibold text-gray-900">{application.companyName}</h3>
                                  <Badge variant="outline" className={getStatusColor(application.status)}>
                                    <div className="flex items-center gap-1">
                                      {getStatusIcon(application.status)}
                                      {application.status.replace("_", " ")}
                                    </div>
                                  </Badge>
                                  <Badge variant="outline" className={getPriorityColor(application.priority)}>
                                    {application.priority === "high" && <Star className="h-3 w-3 mr-1" />}
                                    {application.priority}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`${getRiskColor(application.riskLevel)} border-current`}
                                  >
                                    <Shield className="h-3 w-3 mr-1" />
                                    {application.riskLevel} risk
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <span className="text-sm text-muted-foreground">Contact:</span>
                                    <div className="font-medium">{application.contactPerson}</div>
                                    <div className="text-sm text-muted-foreground">{application.email}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-muted-foreground">Business:</span>
                                    <div className="font-medium">{application.businessType}</div>
                                    <div className="text-sm text-muted-foreground">{application.industry}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-muted-foreground">Revenue:</span>
                                    <div className="font-medium">{formatCurrency(application.annualRevenue)}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {application.yearsInBusiness} years
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-muted-foreground">Requested:</span>
                                    <div className="font-medium">{formatCurrency(application.requestedLimit)}</div>
                                    <div className="text-sm text-muted-foreground">Credit limit</div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                      <span className="text-muted-foreground">Completion</span>
                                      <span className="font-medium">{application.completionScore}%</span>
                                    </div>
                                    <Progress value={application.completionScore} className="h-2" />
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                      <span className="text-muted-foreground">Risk Score</span>
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
                                      <span className="text-muted-foreground">Documents</span>
                                      <span className="font-medium">
                                        {application.documentsComplete}/{application.totalDocuments}
                                      </span>
                                    </div>
                                    <Progress
                                      value={(application.documentsComplete / application.totalDocuments) * 100}
                                      className="h-2"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 ml-6">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/admin/sellers/applications/${application.id}`)
                                }}
                                className="bg-transparent"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>

                              {(application.status === "pending" || application.status === "under_review") && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleApplicationAction(application.id, "approve")
                                    }}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleApplicationAction(application.id, "reject")
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="border-t bg-muted/20 p-6">
                          {/* Enhanced Financial Information */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              Enhanced Financial & Operations Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-3">
                                <h5 className="font-medium text-gray-800">Financial Metrics</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Average Order Value:</span>
                                    <span className="font-medium">{formatCurrency(application.averageOrderValue)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monthly Volume:</span>
                                    <span className="font-medium">
                                      {formatCurrency(application.monthlyTransactionVolume)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Cash Flow Cycle:</span>
                                    <span className="font-medium">{application.cashFlowCycle} days</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <h5 className="font-medium text-gray-800">Market Presence</h5>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Export Markets:</span>
                                    <p className="font-medium mt-1">{application.primaryExportMarkets}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Major Clients:</span>
                                    <p className="font-medium mt-1">{application.majorClients}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <h5 className="font-medium text-gray-800">Banking Information</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Bank:</span>
                                    <span className="font-medium">{application.bankName}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Account Type:</span>
                                    <span className="font-medium">{application.accountType.replace("_", " ")}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Currency:</span>
                                    <span className="font-medium">{application.primaryCurrency}</span>
                                  </div>
                                  {application.swiftBicCode && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">SWIFT/BIC:</span>
                                      <span className="font-medium">{application.swiftBicCode}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contracts & Financing Overview */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Contracts & Financing Overview
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <h5 className="font-medium text-gray-800">
                                  Active Contracts ({application.contracts.filter((c) => c.status === "active").length})
                                </h5>
                                {application.contracts.length > 0 ? (
                                  <div className="space-y-2">
                                    {application.contracts.slice(0, 3).map((contract) => (
                                      <div
                                        key={contract.id}
                                        className="flex justify-between items-center p-2 bg-white border rounded text-sm"
                                      >
                                        <div>
                                          <p className="font-medium">{contract.title}</p>
                                          <p className="text-muted-foreground">{contract.type}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-medium">{formatCurrency(contract.value)}</p>
                                          <Badge className={`text-xs ${getStatusColor(contract.status)}`}>
                                            {contract.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                    {application.contracts.length > 3 && (
                                      <p className="text-sm text-muted-foreground">
                                        +{application.contracts.length - 3} more contracts
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">No contracts found</p>
                                )}
                              </div>
                              <div className="space-y-3">
                                <h5 className="font-medium text-gray-800">
                                  Recent Financing Requests ({application.financingRequests.length})
                                </h5>
                                {application.financingRequests.length > 0 ? (
                                  <div className="space-y-2">
                                    {application.financingRequests.slice(0, 3).map((request) => (
                                      <div
                                        key={request.id}
                                        className="flex justify-between items-center p-2 bg-white border rounded text-sm"
                                      >
                                        <div>
                                          <p className="font-medium">{request.buyer}</p>
                                          <p className="text-muted-foreground">{formatDate(request.submissionDate)}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-medium">
                                            {formatCurrency(request.requestedAmount, request.currency)}
                                          </p>
                                          <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                                            {request.status.replace("_", " ")}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                    {application.financingRequests.length > 3 && (
                                      <p className="text-sm text-muted-foreground">
                                        +{application.financingRequests.length - 3} more requests
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">No financing requests found</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Documents ({application.documents.length})
                            </h4>
                          </div>

                          {application.documents.length > 0 ? (
                            <div className="space-y-3">
                              {application.documents.map((document) => (
                                <div key={document.id} className="bg-white border rounded-lg p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h5 className="font-medium text-gray-900">{document.documentType}</h5>
                                        <Badge className={`text-xs ${getStatusColor(document.status)}`}>
                                          {document.status.replace("_", " ").toUpperCase()}
                                        </Badge>
                                        <Badge className={`text-xs ${getPriorityColor(document.priority)}`}>
                                          {document.priority.toUpperCase()}
                                        </Badge>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                          <span className="text-muted-foreground">File:</span>
                                          <div className="font-medium">{document.fileName}</div>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Size:</span>
                                          <div className="font-medium">{document.fileSize}</div>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Uploaded:</span>
                                          <div className="font-medium">{formatDate(document.uploadDate)}</div>
                                        </div>
                                      </div>

                                      {document.reviewedBy && (
                                        <div className="mt-2 text-sm">
                                          <span className="text-muted-foreground">Reviewed by:</span>
                                          <span className="font-medium ml-1">{document.reviewedBy}</span>
                                          {document.reviewDate && (
                                            <span className="text-muted-foreground ml-2">
                                              on {formatDate(document.reviewDate)}
                                            </span>
                                          )}
                                        </div>
                                      )}

                                      {document.notes && (
                                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                                          <span className="text-muted-foreground font-medium">Notes:</span>
                                          <div className="mt-1">{document.notes}</div>
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                                        <Download className="h-4 w-4" />
                                      </Button>

                                      {document.status === "pending" && (
                                        <>
                                          <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700"
                                            onClick={() => handleDocumentAction(application.id, document.id, "approve")}
                                          >
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            Approve
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                              handleDocumentAction(
                                                application.id,
                                                document.id,
                                                "reject",
                                                "Requires review",
                                              )
                                            }
                                          >
                                            <XCircle className="h-4 w-4 mr-1" />
                                            Reject
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>No documents uploaded yet</p>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
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
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ManualApplicationForm
        open={showManualForm}
        onOpenChange={setShowManualForm}
        onSubmit={handleManualApplicationSubmit}
      />

      <AdvancedFilters
        open={showAdvancedFilters}
        onOpenChange={setShowAdvancedFilters}
        onApplyFilters={handleAdvancedFiltersApply}
        activeFilters={advancedFilters}
      />
    </div>
  )
}
