"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  Package,
  Ship,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
  RefreshCw,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  Plus,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Enhanced mock data with more realistic trade finance scenarios
const mockRequests = [
  {
    id: "FR-2024-001",
    submissionDate: "2024-01-15",
    company: "Global Electronics Trading Ltd",
    companyId: "GET-001",
    contactPerson: "Sarah Chen",
    buyer: "Microsoft Corporation",
    buyerCountry: "United States",
    invoiceNumber: "INV-2024-0156",
    poNumber: "PO-MSFT-789456",
    invoiceAmount: 485000,
    currency: "USD",
    requestedAmount: 388000,
    advanceRate: 80,
    productCategory: "IT Hardware & Electronics",
    tradeRoute: "Singapore → Seattle",
    incoterms: "FOB",
    status: "pending_review",
    priority: "high",
    documentsComplete: 92,
    aiValidationScore: 96,
    riskScore: 85,
    riskLevel: "low",
    daysInProcess: 2,
    assignedTo: "Michael Rodriguez",
    invoiceDate: "2024-01-10",
    dueDate: "2024-03-10",
    deliveryDate: "2024-01-08",
    paymentTerms: "Net 60",
    orderNumber: "ORD-2024-0089",
    portOfLoading: "Port of Singapore",
    portOfDischarge: "Port of Seattle",
    productDescription: "Dell PowerEdge Servers, Cisco Network Equipment",
    quantity: 125,
    unitOfMeasure: "Units",
    unitPrice: 3880,
    totalWeight: 2450,
    repaymentPeriod: 60,
    buyerRegistration: "600413485",
    buyerEmail: "procurement@microsoft.com",
    buyerPhone: "+1-425-882-8080",
    creditLimit: 50000000,
    billingAddress: "One Microsoft Way, Redmond, WA 98052",
    lastActivity: "2024-01-16T10:30:00Z",
    urgencyLevel: "high",
    fraudRisk: 3,
  },
  {
    id: "FR-2024-002",
    submissionDate: "2024-01-14",
    company: "Pacific Textile Exports Inc",
    companyId: "PTE-002",
    contactPerson: "James Liu",
    buyer: "Zara International S.A.",
    buyerCountry: "Spain",
    invoiceNumber: "INV-2024-0157",
    poNumber: "PO-ZARA-456789",
    invoiceAmount: 275000,
    currency: "EUR",
    requestedAmount: 220000,
    advanceRate: 80,
    productCategory: "Textiles & Apparel",
    tradeRoute: "Shanghai → Barcelona",
    incoterms: "CIF",
    status: "under_review",
    priority: "medium",
    documentsComplete: 88,
    aiValidationScore: 93,
    riskScore: 78,
    riskLevel: "medium",
    daysInProcess: 4,
    assignedTo: "Elena Vasquez",
    invoiceDate: "2024-01-08",
    dueDate: "2024-02-22",
    deliveryDate: "2024-01-06",
    paymentTerms: "Net 45",
    orderNumber: "ORD-2024-0090",
    portOfLoading: "Port of Shanghai",
    portOfDischarge: "Port of Barcelona",
    productDescription: "Organic Cotton Fabrics, Silk Blends",
    quantity: 15000,
    unitOfMeasure: "Meters",
    unitPrice: 18.33,
    totalWeight: 8500,
    repaymentPeriod: 45,
    buyerRegistration: "A15138501",
    buyerEmail: "suppliers@zara.com",
    buyerPhone: "+34-981-185-400",
    creditLimit: 25000000,
    billingAddress: "Edificio Inditex, Arteixo, A Coruña 15142, Spain",
    lastActivity: "2024-01-17T14:22:00Z",
    urgencyLevel: "medium",
    fraudRisk: 5,
  },
  {
    id: "FR-2024-003",
    submissionDate: "2024-01-13",
    company: "Industrial Machinery Solutions",
    companyId: "IMS-003",
    contactPerson: "Robert Schmidt",
    buyer: "Caterpillar Inc.",
    buyerCountry: "United States",
    invoiceNumber: "INV-2024-0158",
    poNumber: "PO-CAT-321654",
    invoiceAmount: 750000,
    currency: "USD",
    requestedAmount: 600000,
    advanceRate: 80,
    productCategory: "Industrial Machinery",
    tradeRoute: "Hamburg → Chicago",
    incoterms: "DAP",
    status: "approved",
    priority: "high",
    documentsComplete: 100,
    aiValidationScore: 98,
    riskScore: 92,
    riskLevel: "low",
    daysInProcess: 1,
    assignedTo: "David Kim",
    invoiceDate: "2024-01-05",
    dueDate: "2024-04-05",
    deliveryDate: "2024-01-03",
    paymentTerms: "Net 90",
    orderNumber: "ORD-2024-0091",
    portOfLoading: "Port of Hamburg",
    portOfDischarge: "Port of Chicago",
    productDescription: "CNC Machining Centers, Industrial Robots",
    quantity: 8,
    unitOfMeasure: "Units",
    unitPrice: 93750,
    totalWeight: 45000,
    repaymentPeriod: 90,
    buyerRegistration: "36-0714540",
    buyerEmail: "procurement@caterpillar.com",
    buyerPhone: "+1-309-675-1000",
    creditLimit: 100000000,
    billingAddress: "510 Lake Cook Road, Deerfield, IL 60015",
    lastActivity: "2024-01-14T16:45:00Z",
    urgencyLevel: "low",
    fraudRisk: 2,
  },
  {
    id: "FR-2024-004",
    submissionDate: "2024-01-12",
    company: "Fresh Produce International",
    companyId: "FPI-004",
    contactPerson: "Maria Gonzalez",
    buyer: "Walmart Inc.",
    buyerCountry: "United States",
    invoiceNumber: "INV-2024-0159",
    poNumber: "PO-WMT-654987",
    invoiceAmount: 125000,
    currency: "USD",
    requestedAmount: 100000,
    advanceRate: 80,
    productCategory: "Fresh Produce & Agriculture",
    tradeRoute: "Veracruz → Houston",
    incoterms: "FOB",
    status: "rejected",
    priority: "low",
    documentsComplete: 65,
    aiValidationScore: 76,
    riskScore: 45,
    riskLevel: "high",
    daysInProcess: 6,
    assignedTo: "Ana Rodriguez",
    invoiceDate: "2024-01-01",
    dueDate: "2024-01-31",
    deliveryDate: "2024-01-10",
    paymentTerms: "Net 15",
    orderNumber: "ORD-2024-0092",
    portOfLoading: "Port of Veracruz",
    portOfDischarge: "Port of Houston",
    productDescription: "Organic Avocados, Tropical Fruits",
    quantity: 50000,
    unitOfMeasure: "Kg",
    unitPrice: 2.5,
    totalWeight: 50000,
    repaymentPeriod: 30,
    buyerRegistration: "71-0415188",
    buyerEmail: "suppliers@walmart.com",
    buyerPhone: "+1-479-273-4000",
    creditLimit: 75000000,
    billingAddress: "702 SW 8th Street, Bentonville, AR 72716",
    lastActivity: "2024-01-17T09:15:00Z",
    urgencyLevel: "low",
    fraudRisk: 18,
  },
  {
    id: "FR-2024-005",
    submissionDate: "2024-01-11",
    company: "Automotive Parts Export Co",
    companyId: "APE-005",
    contactPerson: "Hiroshi Tanaka",
    buyer: "BMW Group",
    buyerCountry: "Germany",
    invoiceNumber: "INV-2024-0160",
    poNumber: "PO-BMW-987123",
    invoiceAmount: 320000,
    currency: "EUR",
    requestedAmount: 256000,
    advanceRate: 80,
    productCategory: "Automotive Parts",
    tradeRoute: "Yokohama → Bremen",
    incoterms: "CIF",
    status: "on_hold",
    priority: "medium",
    documentsComplete: 75,
    aiValidationScore: 84,
    riskScore: 68,
    riskLevel: "medium",
    daysInProcess: 7,
    assignedTo: "Klaus Weber",
    invoiceDate: "2024-01-02",
    dueDate: "2024-03-02",
    deliveryDate: "2024-01-15",
    paymentTerms: "Net 60",
    orderNumber: "ORD-2024-0093",
    portOfLoading: "Port of Yokohama",
    portOfDischarge: "Port of Bremen",
    productDescription: "Precision Engine Components, Brake Systems",
    quantity: 2500,
    unitOfMeasure: "Units",
    unitPrice: 128,
    totalWeight: 12000,
    repaymentPeriod: 60,
    buyerRegistration: "DE129273148",
    buyerEmail: "procurement@bmw.de",
    buyerPhone: "+49-89-382-0",
    creditLimit: 80000000,
    billingAddress: "Petuelring 130, 80788 München, Germany",
    lastActivity: "2024-01-18T11:20:00Z",
    urgencyLevel: "medium",
    fraudRisk: 8,
  },
  {
    id: "FR-2024-006",
    submissionDate: "2024-01-10",
    company: "Chemical Solutions Ltd",
    companyId: "CSL-006",
    contactPerson: "Dr. Amanda Foster",
    buyer: "BASF SE",
    buyerCountry: "Germany",
    invoiceNumber: "INV-2024-0161",
    poNumber: "PO-BASF-147258",
    invoiceAmount: 180000,
    currency: "USD",
    requestedAmount: 144000,
    advanceRate: 80,
    productCategory: "Chemicals & Materials",
    tradeRoute: "Rotterdam → Antwerp",
    incoterms: "EXW",
    status: "pending_review",
    priority: "high",
    documentsComplete: 95,
    aiValidationScore: 91,
    riskScore: 88,
    riskLevel: "low",
    daysInProcess: 8,
    assignedTo: "Sophie Martin",
    invoiceDate: "2023-12-28",
    dueDate: "2024-02-28",
    deliveryDate: "2024-01-05",
    paymentTerms: "Net 60",
    orderNumber: "ORD-2024-0094",
    portOfLoading: "Port of Rotterdam",
    portOfDischarge: "Port of Antwerp",
    productDescription: "Specialty Polymers, Industrial Catalysts",
    quantity: 500,
    unitOfMeasure: "Tons",
    unitPrice: 360,
    totalWeight: 500000,
    repaymentPeriod: 60,
    buyerRegistration: "DE000BASF111",
    buyerEmail: "procurement@basf.com",
    buyerPhone: "+49-621-60-0",
    creditLimit: 200000000,
    billingAddress: "Carl-Bosch-Straße 38, 67056 Ludwigshafen, Germany",
    lastActivity: "2024-01-18T15:45:00Z",
    urgencyLevel: "high",
    fraudRisk: 4,
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending_review: {
      label: "Pending Review",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
      icon: Clock,
    },
    under_review: {
      label: "Under Review",
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      icon: Eye,
    },
    approved: {
      label: "Approved",
      color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
      icon: XCircle,
    },
    on_hold: {
      label: "On Hold",
      color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
      icon: AlertTriangle,
    },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_review
  const Icon = config.icon

  return (
    <Badge className={`${config.color} transition-colors duration-200`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}

const getRiskBadge = (riskLevel: string, riskScore: number) => {
  const riskConfig = {
    low: { label: "Low Risk", color: "bg-green-50 text-green-700 border-green-200" },
    medium: { label: "Medium Risk", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    high: { label: "High Risk", color: "bg-red-50 text-red-700 border-red-200" },
  }

  const config = riskConfig[riskLevel as keyof typeof riskConfig] || riskConfig.medium

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={`${config.color} text-xs`}>
        {config.label}
      </Badge>
      <span
        className={`text-xs font-medium ${riskScore >= 80 ? "text-green-600" : riskScore >= 60 ? "text-yellow-600" : "text-red-600"}`}
      >
        {riskScore}%
      </span>
    </div>
  )
}

const formatCurrency = (amount: number, currency: string) => {
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

const formatRelativeTime = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  return formatDate(dateString)
}

export default function FinancingRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState<string>("submissionDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredRequests = mockRequests
    .filter((request) => {
      const matchesSearch =
        request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.productCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || request.status === statusFilter
      const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
      const matchesRisk = riskFilter === "all" || request.riskLevel === riskFilter
      const matchesTab = activeTab === "all" || request.status === activeTab

      return matchesSearch && matchesStatus && matchesPriority && matchesRisk && matchesTab
    })
    .sort((a, b) => {
      let aValue: any = a[sortField as keyof typeof a]
      let bValue: any = b[sortField as keyof typeof b]

      if (sortField === "submissionDate" || sortField === "lastActivity") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const stats = {
    total: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === "pending_review").length,
    underReview: mockRequests.filter((r) => r.status === "under_review").length,
    approved: mockRequests.filter((r) => r.status === "approved").length,
    rejected: mockRequests.filter((r) => r.status === "rejected").length,
    onHold: mockRequests.filter((r) => r.status === "on_hold").length,
    totalValue: mockRequests.reduce((sum, r) => sum + r.requestedAmount, 0),
    avgProcessingTime: Math.round(mockRequests.reduce((sum, r) => sum + r.daysInProcess, 0) / mockRequests.length),
    highRisk: mockRequests.filter((r) => r.riskLevel === "high").length,
    avgAIScore: Math.round(mockRequests.reduce((sum, r) => sum + r.aiValidationScore, 0) / mockRequests.length),
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Trade Finance Requests</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {filteredRequests.length} of {mockRequests.length}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage and review international trade financing requests from sellers worldwide
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Bell className="h-4 w-4" />
            Alerts
            {stats.pending > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-1 py-0 min-w-[16px] h-4">{stats.pending}</Badge>
            )}
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Plus className="h-4 w-4 mr-2" />
                Bulk Actions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.pending}</span> pending review
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue, "USD")}</div>
            <p className="text-xs text-muted-foreground">Requested financing</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((stats.approved / (stats.approved + stats.rejected)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgProcessingTime} days</div>
            <p className="text-xs text-muted-foreground">Average time</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highRisk}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgAIScore}%</div>
            <p className="text-xs text-muted-foreground">Average validation</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Search
              </CardTitle>
              <CardDescription>Search and filter requests by various criteria</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Cards
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by company, buyer, invoice, product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="risk">Risk Level</Label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Risk Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Requests Table/Cards */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                Trade Finance Requests
              </CardTitle>
              <CardDescription>
                {filteredRequests.length} of {mockRequests.length} requests
                {searchTerm && ` matching "${searchTerm}"`}
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="grid grid-cols-6">
                <TabsTrigger value="all" className="text-xs">
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="pending_review" className="text-xs">
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="under_review" className="text-xs">
                  Review ({stats.underReview})
                </TabsTrigger>
                <TabsTrigger value="approved" className="text-xs">
                  Approved ({stats.approved})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="text-xs">
                  Rejected ({stats.rejected})
                </TabsTrigger>
                <TabsTrigger value="on_hold" className="text-xs">
                  Hold ({stats.onHold})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {viewMode === "table" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold"
                        onClick={() => handleSort("id")}
                      >
                        Request Details
                        {sortField === "id" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold"
                        onClick={() => handleSort("productCategory")}
                      >
                        Trade Information
                        {sortField === "productCategory" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold"
                        onClick={() => handleSort("requestedAmount")}
                      >
                        Financing
                        {sortField === "requestedAmount" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold"
                        onClick={() => handleSort("status")}
                      >
                        Status & Progress
                        {sortField === "status" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 font-semibold"
                        onClick={() => handleSort("assignedTo")}
                      >
                        Assignment
                        {sortField === "assignedTo" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="ml-2 h-4 w-4" />
                          ) : (
                            <SortDesc className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-muted/50 transition-colors duration-150">
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{request.id}</span>
                            <Badge variant="outline" className="text-xs bg-gray-50">
                              {request.companyId}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{request.company}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-3 w-3" />
                              {request.buyer} ({request.buyerCountry})
                            </div>
                            <div className="text-xs text-muted-foreground">Contact: {request.contactPerson}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Invoice: {request.invoiceNumber} | PO: {request.poNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <Package className="h-3 w-3 text-muted-foreground" />
                            {request.productCategory}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Ship className="h-3 w-3" />
                            {request.tradeRoute}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {request.incoterms} | {request.quantity.toLocaleString()} {request.unitOfMeasure}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Weight: {request.totalWeight.toLocaleString()} kg
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="font-medium text-lg">
                            {formatCurrency(request.requestedAmount, request.currency)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            of {formatCurrency(request.invoiceAmount, request.currency)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {request.advanceRate}% advance • {request.repaymentPeriod}d repayment
                          </div>
                          <div className="text-xs text-muted-foreground">Due: {formatDate(request.dueDate)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-3">
                          {getStatusBadge(request.status)}

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Documents</span>
                              <span className="font-medium">{request.documentsComplete}%</span>
                            </div>
                            <Progress value={request.documentsComplete} className="h-1.5" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>AI Validation</span>
                              <span className="font-medium">{request.aiValidationScore}%</span>
                            </div>
                            <Progress value={request.aiValidationScore} className="h-1.5" />
                          </div>

                          {getRiskBadge(request.riskLevel, request.riskScore)}

                          <div className="text-xs text-muted-foreground">{request.daysInProcess} days in process</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{request.assignedTo}</div>
                          <div className="text-xs text-muted-foreground">
                            Submitted {formatDate(request.submissionDate)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Updated {formatRelativeTime(request.lastActivity)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 bg-transparent">
                            <Link href={`/admin/financing/requests/${request.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Quick Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="h-4 w-4 mr-2" />
                                Quick Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Put on Hold
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-6">
              {filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{request.id}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{request.company}</div>
                      <div className="text-sm text-muted-foreground">{request.buyer}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">
                        {formatCurrency(request.requestedAmount, request.currency)}
                      </span>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Package className="h-3 w-3 text-muted-foreground" />
                        {request.productCategory}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Ship className="h-3 w-3" />
                        {request.tradeRoute}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Documents</span>
                        <span>{request.documentsComplete}%</span>
                      </div>
                      <Progress value={request.documentsComplete} className="h-1.5" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>AI Score</span>
                        <span>{request.aiValidationScore}%</span>
                      </div>
                      <Progress value={request.aiValidationScore} className="h-1.5" />
                    </div>

                    <div className="flex items-center justify-between">
                      {getRiskBadge(request.riskLevel, request.riskScore)}
                      <span className="text-xs text-muted-foreground">{request.daysInProcess}d in process</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">{request.assignedTo}</div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/financing/requests/${request.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No requests found</h3>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? `No requests match your search for "${searchTerm}"`
                    : "No financing requests match your current filters"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setPriorityFilter("all")
                  setRiskFilter("all")
                  setActiveTab("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
