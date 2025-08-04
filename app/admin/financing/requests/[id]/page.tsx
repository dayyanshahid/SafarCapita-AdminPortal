"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileText,
  Globe,
  Mail,
  MapPin,
  Package,
  Phone,
  Ship,
  TrendingUp,
  Users,
  XCircle,
  AlertTriangle,
  Shield,
  MessageSquare,
  Send,
  Plus,
  Edit,
  Search,
  CreditCard,
  Banknote,
  Target,
  CheckCircle2,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"

// Enhanced mock data with comprehensive approval stages
const mockRequest = {
  id: "FR-2024-001",
  submissionDate: "2024-01-15",
  lastUpdated: "2024-01-18",

  // Company Information
  company: "Global Tech Solutions Ltd",
  companyId: "GTS-001",
  companyEmail: "finance@globaltech.com",
  companyPhone: "+86-21-1234-5678",
  companyAddress: "Building 5, Tech Park, Shanghai 200000, China",

  // Invoice Information
  invoiceNumber: "INV-2024-0156",
  poNumber: "PO-EU-789456",
  invoiceDate: "2024-01-10",
  dueDate: "2024-02-10",
  deliveryDate: "2024-01-20",
  invoiceAmount: 125000,
  currency: "USD",
  paymentTerms: "Net 30",
  invoiceDescription: "Supply of laptop computers and accessories as per purchase order",

  // Order & Shipment Information
  orderNumber: "ORD-2024-0089",
  incoterms: "CIF",
  portOfLoading: "Shanghai Port",
  portOfDischarge: "Hamburg Port",
  shipmentInfo: "Container shipment via MSC Vessel",

  // Product Details
  productDescription: "Laptop computers and accessories",
  productCategory: "IT Hardware",
  unitOfMeasure: "Units",
  quantity: 500,
  unitPrice: 250,
  totalWeight: 2500,

  // Financing Terms
  requestedAmount: 100000,
  advanceRate: 80,
  repaymentPeriod: 90,

  // Buyer Information
  buyer: "European Electronics Corp",
  buyerRegistration: "DE123456789",
  buyerEmail: "procurement@euroelectronics.de",
  buyerPhone: "+49-40-123456",
  buyerCountry: "Germany",
  creditLimit: 500000,
  buyerPaymentTerms: "Net 30",
  billingAddress: "Hauptstraße 123, 20095 Hamburg, Germany",

  // Status and Processing
  status: "document_review",
  priority: "high",
  assignedTo: "Sarah Johnson",
  daysInProcess: 3,
  currentStage: 2,

  // Validation and Risk
  documentsComplete: 85,
  aiValidationScore: 92,
  riskScore: "medium",

  // Enhanced Approval Stages
  approvalStages: [
    {
      id: 1,
      stage: "invoice_submitted",
      title: "Invoice Submitted",
      description: "Financing request and invoice documentation submitted by seller",
      status: "completed",
      icon: "FileText",
      timestamp: "2024-01-15T09:00:00Z",
      actor: "Global Tech Solutions Ltd",
      estimatedDuration: "Immediate",
      requirements: ["Invoice document", "Purchase order", "Basic company information"],
      completedAt: "2024-01-15T09:00:00Z",
      notes: "All required documents submitted successfully",
    },
    {
      id: 2,
      stage: "document_review",
      title: "Document Review",
      description: "Comprehensive review of all submitted trade documents for completeness and authenticity",
      status: "in_progress",
      icon: "Search",
      timestamp: "2024-01-15T10:30:00Z",
      actor: "Sarah Johnson",
      estimatedDuration: "2-4 hours",
      requirements: [
        "Invoice verification",
        "Purchase order validation",
        "Delivery receipt confirmation",
        "Trade document authenticity check",
      ],
      progress: 65,
      notes: "Currently reviewing trade documents. Sales contract still pending.",
    },
    {
      id: 3,
      stage: "credit_check",
      title: "Credit Check",
      description: "Buyer creditworthiness assessment and risk evaluation",
      status: "pending",
      icon: "CreditCard",
      timestamp: null,
      actor: "Credit Assessment Team",
      estimatedDuration: "1-2 business days",
      requirements: [
        "Buyer credit history analysis",
        "Financial statement review",
        "Payment behavior assessment",
        "Industry risk evaluation",
      ],
      progress: 0,
      notes: "Awaiting document review completion",
    },
    {
      id: 4,
      stage: "risk_assessment",
      title: "Risk Assessment",
      description: "Comprehensive risk analysis including geographic, industry, and concentration risks",
      status: "pending",
      icon: "Shield",
      timestamp: null,
      actor: "Risk Management Team",
      estimatedDuration: "4-6 hours",
      requirements: [
        "Country risk evaluation",
        "Industry risk analysis",
        "Concentration risk assessment",
        "Overall risk scoring",
      ],
      progress: 0,
      notes: "Pending credit check completion",
    },
    {
      id: 5,
      stage: "approved_for_factoring",
      title: "Approved for Factoring",
      description: "Final approval decision and factoring terms confirmation",
      status: "pending",
      icon: "CheckCircle2",
      timestamp: null,
      actor: "Senior Credit Officer",
      estimatedDuration: "2-4 hours",
      requirements: [
        "Final approval decision",
        "Factoring terms confirmation",
        "Advance rate finalization",
        "Legal documentation preparation",
      ],
      progress: 0,
      notes: "Awaiting risk assessment completion",
    },
    {
      id: 6,
      stage: "advance_payment_sent",
      title: "Advance Payment Sent",
      description: "Processing and disbursement of advance payment to seller",
      status: "pending",
      icon: "Banknote",
      timestamp: null,
      actor: "Finance Operations",
      estimatedDuration: "1-2 business days",
      requirements: [
        "Payment processing setup",
        "Banking details verification",
        "Compliance checks",
        "Fund disbursement",
      ],
      progress: 0,
      notes: "Awaiting factoring approval",
    },
    {
      id: 7,
      stage: "collection_period",
      title: "Collection Period",
      description: "Monitoring buyer payment and collection activities",
      status: "pending",
      icon: "Target",
      timestamp: null,
      actor: "Collections Team",
      estimatedDuration: "30-90 days",
      requirements: ["Payment monitoring", "Buyer communication", "Collection activities", "Payment tracking"],
      progress: 0,
      notes: "Awaiting advance payment completion",
    },
    {
      id: 8,
      stage: "payment_collected",
      title: "Payment Collected",
      description: "Successful collection of payment from buyer",
      status: "pending",
      icon: "DollarSign",
      timestamp: null,
      actor: "Collections Team",
      estimatedDuration: "Immediate upon receipt",
      requirements: [
        "Payment receipt confirmation",
        "Amount verification",
        "Reserve release calculation",
        "Final settlement preparation",
      ],
      progress: 0,
      notes: "Awaiting collection period completion",
    },
    {
      id: 9,
      stage: "transaction_completed",
      title: "Transaction Completed",
      description: "Final settlement and transaction closure",
      status: "pending",
      icon: "CheckCircle",
      timestamp: null,
      actor: "Finance Operations",
      estimatedDuration: "1-2 hours",
      requirements: [
        "Reserve amount release",
        "Final settlement processing",
        "Transaction documentation",
        "Case closure",
      ],
      progress: 0,
      notes: "Awaiting payment collection",
    },
  ],

  // Documents
  documents: {
    invoiceDocuments: [
      {
        name: "Original Invoice",
        type: "original_invoice",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "2.3 MB",
        required: true,
      },
      {
        name: "Invoice Backup",
        type: "invoice_backup",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "2.3 MB",
        required: false,
      },
    ],
    supportingDocuments: [
      {
        name: "Purchase Order",
        type: "purchase_order",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "1.8 MB",
        required: true,
      },
      {
        name: "Delivery Receipt",
        type: "delivery_receipt",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "1.2 MB",
        required: true,
      },
      {
        name: "Sales Contract",
        type: "sales_contract",
        status: "pending",
        uploadDate: null,
        fileSize: null,
        required: true,
      },
    ],
    tradeDocuments: [
      {
        name: "FCR - Forwarder's Cargo Receipt",
        type: "fcr",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "1.5 MB",
        required: true,
      },
      {
        name: "GD - Goods Declaration",
        type: "goods_declaration",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "2.1 MB",
        required: true,
      },
      {
        name: "Bill of Lading",
        type: "bill_of_lading",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "1.9 MB",
        required: true,
      },
      {
        name: "Packing List",
        type: "packing_list",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "1.1 MB",
        required: true,
      },
      {
        name: "Insurance Certificate",
        type: "insurance_certificate",
        status: "pending",
        uploadDate: null,
        fileSize: null,
        required: false,
      },
      {
        name: "Certificate of Origin",
        type: "certificate_of_origin",
        status: "incomplete",
        uploadDate: "2024-01-15",
        fileSize: "0.8 MB",
        required: false,
      },
      {
        name: "Inspection Certificate",
        type: "inspection_certificate",
        status: "pending",
        uploadDate: null,
        fileSize: null,
        required: false,
      },
      {
        name: "Surveyor Certificate",
        type: "surveyor_certificate",
        status: "pending",
        uploadDate: null,
        fileSize: null,
        required: false,
      },
    ],
    additionalDocuments: [
      {
        name: "Export License",
        type: "export_license",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "0.9 MB",
        required: false,
      },
      {
        name: "Buyer Correspondence",
        type: "buyer_correspondence",
        status: "completed",
        uploadDate: "2024-01-15",
        fileSize: "0.5 MB",
        required: false,
      },
    ],
  },

  // AI Validation Details
  aiValidation: {
    overallScore: 92,
    documentValidation: 95,
    fraudDetection: 88,
    complianceCheck: 94,
    consistencyCheck: 91,
    details: [
      {
        category: "Document Authenticity",
        score: 95,
        status: "passed",
        details: "All documents appear authentic with proper formatting and signatures",
      },
      {
        category: "Invoice Validation",
        score: 98,
        status: "passed",
        details: "Invoice details match purchase order and delivery documents",
      },
      {
        category: "Trade Document Consistency",
        score: 89,
        status: "passed",
        details: "Minor discrepancies in weight declarations between documents",
      },
      {
        category: "Buyer Verification",
        score: 92,
        status: "passed",
        details: "Buyer company verified with good credit standing",
      },
      {
        category: "Fraud Indicators",
        score: 88,
        status: "warning",
        details: "Unusual shipping route detected, requires manual review",
      },
      { category: "Compliance Screening", score: 94, status: "passed", details: "No sanctions or PEP matches found" },
    ],
  },

  // Risk Assessment
  riskAssessment: {
    overallRisk: "medium",
    buyerRisk: "low",
    geographicRisk: "low",
    industryRisk: "medium",
    concentrationRisk: "medium",
    details: [
      { category: "Buyer Credit Risk", score: "low", details: "Strong credit history with 98% on-time payment rate" },
      { category: "Country Risk - Germany", score: "low", details: "Stable political and economic environment" },
      { category: "Industry Risk - IT Hardware", score: "medium", details: "Moderate volatility in technology sector" },
      {
        category: "Concentration Risk",
        score: "medium",
        details: "Buyer represents 15% of seller's total receivables",
      },
      { category: "Currency Risk - USD", score: "low", details: "Stable currency with good hedging options" },
      { category: "Operational Risk", score: "low", details: "Established trade relationship with 3+ years history" },
    ],
  },

  // Timeline
  timeline: [
    {
      id: 1,
      type: "submission",
      title: "Request Submitted",
      description: "Financing request submitted by Global Tech Solutions Ltd",
      timestamp: "2024-01-15T09:00:00Z",
      actor: "Global Tech Solutions Ltd",
      status: "completed",
    },
    {
      id: 2,
      type: "document_upload",
      title: "Documents Uploaded",
      description: "Initial document package uploaded (8 of 12 documents)",
      timestamp: "2024-01-15T09:30:00Z",
      actor: "Global Tech Solutions Ltd",
      status: "completed",
    },
    {
      id: 3,
      type: "ai_validation",
      title: "AI Validation Completed",
      description: "Automated validation completed with 92% confidence score",
      timestamp: "2024-01-15T10:15:00Z",
      actor: "AI Validation System",
      status: "completed",
    },
    {
      id: 4,
      type: "assignment",
      title: "Assigned for Review",
      description: "Request assigned to Sarah Johnson for manual review",
      timestamp: "2024-01-15T11:00:00Z",
      actor: "System",
      status: "completed",
    },
    {
      id: 5,
      type: "information_request",
      title: "Additional Information Requested",
      description: "Requested missing sales contract and insurance certificate",
      timestamp: "2024-01-16T14:30:00Z",
      actor: "Sarah Johnson",
      status: "completed",
    },
    {
      id: 6,
      type: "pending_response",
      title: "Awaiting Seller Response",
      description: "Waiting for seller to provide requested documents",
      timestamp: "2024-01-16T14:30:00Z",
      actor: "Global Tech Solutions Ltd",
      status: "pending",
    },
  ],
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: "Pending", color: "bg-gray-100 text-gray-800 border-gray-200", icon: Clock },
    in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-800 border-blue-200", icon: PlayCircle },
    completed: { label: "Completed", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    on_hold: { label: "On Hold", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  const Icon = config.icon

  return (
    <Badge className={config.color}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}

const getPriorityBadge = (priority: string) => {
  const priorityConfig = {
    high: { label: "High", color: "bg-red-100 text-red-800 border-red-200" },
    medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    low: { label: "Low", color: "bg-gray-100 text-gray-800 border-gray-200" },
  }

  const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  )
}

const getDocumentStatusBadge = (status: string) => {
  const statusConfig = {
    completed: { label: "Completed", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
    incomplete: { label: "Incomplete", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.color}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}

const getStageIcon = (iconName: string) => {
  const icons = {
    FileText,
    Search,
    CreditCard,
    Shield,
    CheckCircle2,
    Banknote,
    Target,
    DollarSign,
    CheckCircle,
  }
  const Icon = icons[iconName as keyof typeof icons] || Clock
  return Icon
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

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const formatDetailedDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function FinancingRequestDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newNote, setNewNote] = useState("")

  const calculateOverallProgress = () => {
    const completedStages = mockRequest.approvalStages.filter((stage) => stage.status === "completed").length
    return Math.round((completedStages / mockRequest.approvalStages.length) * 100)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/financing/requests">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Requests
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{mockRequest.id}</h1>
              {getStatusBadge(mockRequest.status)}
              {getPriorityBadge(mockRequest.priority)}
            </div>
            <p className="text-muted-foreground">
              Submitted {formatDate(mockRequest.submissionDate)} • Last updated {formatDate(mockRequest.lastUpdated)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requested Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockRequest.requestedAmount, mockRequest.currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockRequest.advanceRate}% of {formatCurrency(mockRequest.invoiceAmount, mockRequest.currency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateOverallProgress()}%</div>
            <Progress value={calculateOverallProgress()} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRequest.documentsComplete}%</div>
            <Progress value={mockRequest.documentsComplete} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Validation</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRequest.aiValidationScore}%</div>
            <Progress value={mockRequest.aiValidationScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRequest.daysInProcess} days</div>
            <p className="text-xs text-muted-foreground">Assigned to {mockRequest.assignedTo}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approval-stages">Approval Stages</TabsTrigger>
          <TabsTrigger value="invoice-order">Invoice & Order</TabsTrigger>
          <TabsTrigger value="documents">Trade Documents</TabsTrigger>
          <TabsTrigger value="ai-validation">AI Validation</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Company Name</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.company}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Company ID</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.companyId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contact Information</Label>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {mockRequest.companyEmail}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {mockRequest.companyPhone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {mockRequest.companyAddress}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Buyer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Buyer Company</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Registration Number</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyerRegistration}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contact Information</Label>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {mockRequest.buyerEmail}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {mockRequest.buyerPhone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      {mockRequest.buyerCountry}
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Credit Limit</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(mockRequest.creditLimit, mockRequest.currency)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Financing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Invoice Amount</Label>
                    <p className="text-lg font-semibold">
                      {formatCurrency(mockRequest.invoiceAmount, mockRequest.currency)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Requested Amount</Label>
                    <p className="text-lg font-semibold text-blue-600">
                      {formatCurrency(mockRequest.requestedAmount, mockRequest.currency)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Advance Rate</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.advanceRate}%</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Repayment Period</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.repaymentPeriod} days</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Terms</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.paymentTerms}</p>
                </div>
              </CardContent>
            </Card>

            {/* Product Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Product Description</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.productDescription}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.productCategory}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Quantity</Label>
                    <p className="text-sm text-muted-foreground">
                      {mockRequest.quantity} {mockRequest.unitOfMeasure}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Unit Price</Label>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(mockRequest.unitPrice, mockRequest.currency)}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Weight</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.totalWeight.toLocaleString()} kg</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Financial Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockRequest.aiValidationScore}%</div>
                  <div className="text-sm text-muted-foreground">AI Validation Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">Medium</div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockRequest.documentsComplete}%</div>
                  <div className="text-sm text-muted-foreground">Document Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{mockRequest.daysInProcess}</div>
                  <div className="text-sm text-muted-foreground">Days in Process</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approval Stages Tab */}
        <TabsContent value="approval-stages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Approval Workflow Stages
              </CardTitle>
              <CardDescription>
                Comprehensive trade finance approval process with detailed stage tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Progress Overview */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      Stage {mockRequest.currentStage} of {mockRequest.approvalStages.length}
                    </span>
                  </div>
                  <Progress value={calculateOverallProgress()} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Started</span>
                    <span>{calculateOverallProgress()}% Complete</span>
                    <span>Completion</span>
                  </div>
                </div>

                {/* Approval Stages */}
                <div className="space-y-4">
                  {mockRequest.approvalStages.map((stage, index) => {
                    const Icon = getStageIcon(stage.icon)
                    const isActive = stage.status === "in_progress"
                    const isCompleted = stage.status === "completed"
                    const isPending = stage.status === "pending"

                    return (
                      <div key={stage.id} className="relative">
                        {/* Timeline line */}
                        {index < mockRequest.approvalStages.length - 1 && (
                          <div className="absolute left-6 top-16 w-0.5 h-20 bg-border"></div>
                        )}

                        <div
                          className={`flex gap-4 p-6 rounded-lg border transition-all duration-200 ${
                            isActive
                              ? "border-blue-200 bg-blue-50 shadow-md"
                              : isCompleted
                                ? "border-green-200 bg-green-50"
                                : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          {/* Stage Icon */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                isActive
                                  ? "bg-blue-600 text-white"
                                  : isCompleted
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          {/* Stage Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold">{stage.title}</h3>
                                {getStatusBadge(stage.status)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {stage.timestamp ? formatDetailedDateTime(stage.timestamp) : "Not started"}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>

                            {/* Progress Bar for In Progress Stages */}
                            {isActive && stage.progress !== undefined && (
                              <div className="mb-4">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{stage.progress}%</span>
                                </div>
                                <Progress value={stage.progress} className="h-2" />
                              </div>
                            )}

                            {/* Stage Details */}
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label className="text-xs font-medium text-muted-foreground">ASSIGNED TO</Label>
                                <p className="text-sm font-medium">{stage.actor}</p>
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-muted-foreground">ESTIMATED DURATION</Label>
                                <p className="text-sm">{stage.estimatedDuration}</p>
                              </div>
                            </div>

                            {/* Requirements */}
                            <div className="mt-4">
                              <Label className="text-xs font-medium text-muted-foreground">REQUIREMENTS</Label>
                              <div className="grid gap-1 mt-1">
                                {stage.requirements.map((req, reqIndex) => (
                                  <div key={reqIndex} className="flex items-center gap-2 text-sm">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-gray-300"
                                      }`}
                                    />
                                    {req}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notes */}
                            {stage.notes && (
                              <div className="mt-4 p-3 bg-background rounded border">
                                <Label className="text-xs font-medium text-muted-foreground">NOTES</Label>
                                <p className="text-sm mt-1">{stage.notes}</p>
                              </div>
                            )}

                            {/* Completion Details */}
                            {isCompleted && stage.completedAt && (
                              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-2 text-green-800">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    Completed on {formatDetailedDateTime(stage.completedAt)}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Action Buttons for Active Stages */}
                            {isActive && (
                              <div className="mt-4 flex gap-2">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Complete Stage
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Add Note
                                </Button>
                                <Button variant="outline" size="sm">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Flag Issue
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Next Steps */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-blue-800">
                        <strong>Current Stage:</strong> Document Review (Stage 2 of 9)
                      </p>
                      <p className="text-blue-700">
                        The request is currently under document review. Sarah Johnson is reviewing all submitted trade
                        documents for completeness and authenticity. The sales contract is still pending submission.
                      </p>
                      <p className="text-blue-700">
                        <strong>Expected Next:</strong> Once document review is complete, the request will proceed to
                        Credit Check stage for buyer creditworthiness assessment.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoice & Order Tab */}
        <TabsContent value="invoice-order" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Invoice Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoice Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Invoice Number</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.invoiceNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">PO Number</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.poNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Invoice Date</Label>
                    <p className="text-sm text-muted-foreground">{formatDate(mockRequest.invoiceDate)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <p className="text-sm text-muted-foreground">{formatDate(mockRequest.dueDate)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Delivery Date</Label>
                    <p className="text-sm text-muted-foreground">{formatDate(mockRequest.deliveryDate)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Invoice Amount</Label>
                    <p className="text-lg font-semibold">
                      {formatCurrency(mockRequest.invoiceAmount, mockRequest.currency)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Currency</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.currency}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Terms</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.paymentTerms}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Invoice Description</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.invoiceDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order & Shipment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="h-5 w-5" />
                  Order & Shipment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Order Number</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.orderNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Incoterms</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.incoterms}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Port of Loading</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.portOfLoading}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Port of Discharge</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.portOfDischarge}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Shipment Information</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.shipmentInfo}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Product Description</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.productDescription}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Product Category</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.productCategory}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Unit of Measure</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.unitOfMeasure}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Quantity</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.quantity.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Unit Price</Label>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(mockRequest.unitPrice, mockRequest.currency)}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Weight</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.totalWeight.toLocaleString()} kg</p>
                </div>
              </CardContent>
            </Card>

            {/* Financing Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financing Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Requested Financing Amount</Label>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatCurrency(mockRequest.requestedAmount, mockRequest.currency)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Requested Advance Rate</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.advanceRate}%</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Repayment Period</Label>
                    <p className="text-sm text-muted-foreground">{mockRequest.repaymentPeriod} days</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium">Financing Calculation</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Invoice Amount:</span>
                      <span>{formatCurrency(mockRequest.invoiceAmount, mockRequest.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advance Rate ({mockRequest.advanceRate}%):</span>
                      <span className="font-semibold">
                        {formatCurrency(mockRequest.requestedAmount, mockRequest.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Reserve ({100 - mockRequest.advanceRate}%):</span>
                      <span>
                        {formatCurrency(mockRequest.invoiceAmount - mockRequest.requestedAmount, mockRequest.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Buyer Information Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Buyer Information Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Company Name</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Registration Number</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyerRegistration}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email Address</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyerEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyerPhone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Credit Limit</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(mockRequest.creditLimit, mockRequest.currency)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Terms</Label>
                  <p className="text-sm text-muted-foreground">{mockRequest.buyerPaymentTerms}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Billing Address</Label>
                <p className="text-sm text-muted-foreground">{mockRequest.billingAddress}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trade Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-6">
            {/* Invoice Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoice Documents
                </CardTitle>
                <CardDescription>Primary invoice documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRequest.documents.invoiceDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.name}</span>
                            {doc.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {doc.uploadDate
                              ? `Uploaded ${formatDate(doc.uploadDate)} • ${doc.fileSize}`
                              : "Not uploaded"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.status)}
                        {doc.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supporting Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>Documents that support the invoice validity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRequest.documents.supportingDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.name}</span>
                            {doc.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {doc.uploadDate
                              ? `Uploaded ${formatDate(doc.uploadDate)} • ${doc.fileSize}`
                              : "Not uploaded"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.status)}
                        {doc.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trade Finance Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="h-5 w-5" />
                  Trade Finance Documents
                </CardTitle>
                <CardDescription>International trade and shipping documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRequest.documents.tradeDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Ship className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.name}</span>
                            {doc.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              Trade Doc
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {doc.uploadDate
                              ? `Uploaded ${formatDate(doc.uploadDate)} • ${doc.fileSize}`
                              : "Not uploaded"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.status)}
                        {doc.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Additional Documents
                </CardTitle>
                <CardDescription>Optional documents that may strengthen the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRequest.documents.additionalDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.name}</span>
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700">
                              Optional
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {doc.uploadDate
                              ? `Uploaded ${formatDate(doc.uploadDate)} • ${doc.fileSize}`
                              : "Not uploaded"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.status)}
                        {doc.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Validation Tab */}
        <TabsContent value="ai-validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                AI Validation Results
              </CardTitle>
              <CardDescription>Automated validation and fraud detection analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{mockRequest.aiValidation.overallScore}%</div>
                  <div className="text-lg font-medium">Overall Validation Score</div>
                  <div className="text-sm text-muted-foreground">High confidence - Recommended for approval</div>
                </div>

                {/* Score Breakdown */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockRequest.aiValidation.documentValidation}%
                    </div>
                    <div className="text-sm font-medium">Document Validation</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{mockRequest.aiValidation.fraudDetection}%</div>
                    <div className="text-sm font-medium">Fraud Detection</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockRequest.aiValidation.complianceCheck}%</div>
                    <div className="text-sm font-medium">Compliance Check</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {mockRequest.aiValidation.consistencyCheck}%
                    </div>
                    <div className="text-sm font-medium">Consistency Check</div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Detailed Analysis</h4>
                  {mockRequest.aiValidation.details.map((detail, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{detail.category}</span>
                          {detail.status === "passed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {detail.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          {detail.status === "failed" && <XCircle className="h-4 w-4 text-red-600" />}
                        </div>
                        <div className="text-lg font-semibold">{detail.score}%</div>
                      </div>
                      <Progress value={detail.score} className="mb-2" />
                      <p className="text-sm text-muted-foreground">{detail.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risk-assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
              <CardDescription>Comprehensive risk analysis for the financing request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Risk */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2 uppercase">
                    {mockRequest.riskAssessment.overallRisk}
                  </div>
                  <div className="text-lg font-medium">Overall Risk Level</div>
                  <div className="text-sm text-muted-foreground">Acceptable risk level for financing</div>
                </div>

                {/* Risk Breakdown */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600 uppercase">
                      {mockRequest.riskAssessment.buyerRisk}
                    </div>
                    <div className="text-sm font-medium">Buyer Risk</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600 uppercase">
                      {mockRequest.riskAssessment.geographicRisk}
                    </div>
                    <div className="text-sm font-medium">Geographic Risk</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 uppercase">
                      {mockRequest.riskAssessment.industryRisk}
                    </div>
                    <div className="text-sm font-medium">Industry Risk</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 uppercase">
                      {mockRequest.riskAssessment.concentrationRisk}
                    </div>
                    <div className="text-sm font-medium">Concentration Risk</div>
                  </div>
                </div>

                {/* Detailed Risk Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Detailed Risk Analysis</h4>
                  {mockRequest.riskAssessment.details.map((risk, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{risk.category}</span>
                        <Badge
                          variant="outline"
                          className={
                            risk.score === "low"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : risk.score === "medium"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {risk.score.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{risk.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Request Timeline
              </CardTitle>
              <CardDescription>Complete workflow tracking and status history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockRequest.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.status === "completed"
                            ? "bg-green-600"
                            : event.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-gray-300"
                        }`}
                      />
                      {index < mockRequest.timeline.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-sm text-muted-foreground">{formatDateTime(event.timestamp)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.type.replace("_", " ").toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">by {event.actor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Decision Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Decision Actions
                </CardTitle>
                <CardDescription>Make approval or rejection decisions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Request
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Approve with Conditions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Request
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="decision-notes">Decision Notes</Label>
                  <Textarea
                    id="decision-notes"
                    placeholder="Add notes about your decision..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Communication Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication
                </CardTitle>
                <CardDescription>Communicate with the seller</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Additional Information
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="message">Quick Message</Label>
                  <Textarea id="message" placeholder="Type your message..." className="min-h-[100px]" />
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Internal Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Internal Notes
              </CardTitle>
              <CardDescription>Add internal notes for team collaboration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="internal-note">Add Internal Note</Label>
                <Textarea
                  id="internal-note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note for internal team use..."
                  className="min-h-[100px]"
                />
                <Button onClick={() => setNewNote("")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Previous Notes</h4>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Sarah Johnson</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reviewed all trade documents. FCR and Bill of Lading look authentic. Waiting for sales contract
                      before final approval.
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Michael Chen</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI validation shows high confidence. Buyer has excellent credit history. This looks like a good
                      candidate for approval.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
