"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Eye,
  Download,
  Edit,
  CreditCard,
  TrendingUp,
  Shield,
  Activity,
} from "lucide-react"

// Mock seller data
const sellerData = {
  id: "SELL-001",
  companyName: "TechCorp Solutions Inc.",
  contactPerson: "John Smith",
  title: "Chief Financial Officer",
  email: "john.smith@techcorp.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave, Suite 500, New York, NY 10001",
  registrationDate: "2024-01-15",
  status: "active",
  verificationStatus: "verified",
  riskLevel: "low",
  creditRating: "A-",
  businessType: "Technology Services",
  industry: "Software Development",
  annualRevenue: 2500000,
  yearsInBusiness: 5,
  employeeCount: 45,
  website: "https://techcorp.com",
  taxId: "12-3456789",
  businessDescription:
    "TechCorp Solutions provides enterprise software development and IT consulting services to Fortune 500 companies.",
  bankDetails: {
    bankName: "JPMorgan Chase Bank",
    accountType: "Business Checking",
    accountNumber: "****7890",
    routingNumber: "021000021",
    swiftCode: "CHASUS33",
  },
  documents: [
    { name: "Business License", status: "verified", uploadDate: "2024-01-15", size: "2.3 MB" },
    { name: "Tax Returns 2023", status: "verified", uploadDate: "2024-01-15", size: "5.7 MB" },
    { name: "Financial Statements", status: "verified", uploadDate: "2024-01-15", size: "3.1 MB" },
    { name: "Bank Statements", status: "verified", uploadDate: "2024-01-15", size: "4.2 MB" },
  ],
}

// Mock contracts data for this seller
const sellerContracts = [
  {
    id: "CT-2024-001",
    title: "Trade Finance Agreement",
    type: "Trade Finance",
    status: "active",
    value: 250000,
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    utilization: 75,
    terms: {
      advanceRate: 85,
      factorFee: 2.5,
      creditLimit: 250000,
    },
    performance: {
      totalTransactions: 12,
      totalVolume: 187500,
      avgPaymentDays: 28,
      onTimePayments: 100,
    },
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
    terms: {
      advanceRate: 80,
      factorFee: 3.0,
      creditLimit: 150000,
    },
    performance: {
      totalTransactions: 24,
      totalVolume: 142500,
      avgPaymentDays: 32,
      onTimePayments: 96,
    },
  },
]

// Mock financing requests data for this seller
const sellerFinancingRequests = [
  {
    id: "FR-2024-001",
    submissionDate: "2024-01-15",
    buyer: "Microsoft Corporation",
    buyerCountry: "United States",
    invoiceNumber: "INV-2024-0156",
    invoiceAmount: 485000,
    requestedAmount: 388000,
    currency: "USD",
    status: "approved",
    priority: "high",
    productCategory: "IT Hardware & Electronics",
    tradeRoute: "Singapore → Seattle",
    dueDate: "2024-03-10",
    approvalDate: "2024-01-16",
    disbursementDate: "2024-01-17",
    repaymentDate: "2024-03-10",
    documentsComplete: 100,
    aiValidationScore: 96,
    riskScore: 85,
  },
  {
    id: "FR-2024-002",
    submissionDate: "2024-01-20",
    buyer: "Apple Inc.",
    buyerCountry: "United States",
    invoiceNumber: "INV-2024-0178",
    invoiceAmount: 320000,
    requestedAmount: 256000,
    currency: "USD",
    status: "under_review",
    priority: "medium",
    productCategory: "IT Hardware & Electronics",
    tradeRoute: "Singapore → San Francisco",
    dueDate: "2024-04-20",
    documentsComplete: 92,
    aiValidationScore: 94,
    riskScore: 78,
  },
  {
    id: "FR-2023-089",
    submissionDate: "2023-12-10",
    buyer: "IBM Corporation",
    buyerCountry: "United States",
    invoiceNumber: "INV-2023-0445",
    invoiceAmount: 180000,
    requestedAmount: 144000,
    currency: "USD",
    status: "completed",
    priority: "low",
    productCategory: "Software Services",
    tradeRoute: "New York → Austin",
    dueDate: "2024-01-10",
    approvalDate: "2023-12-11",
    disbursementDate: "2023-12-12",
    repaymentDate: "2024-01-08",
    documentsComplete: 100,
    aiValidationScore: 91,
    riskScore: 82,
  },
]

export default function SellerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      under_review: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      verified: "bg-green-100 text-green-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return variants[risk as keyof typeof variants] || "bg-gray-100 text-gray-800"
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sellers
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{sellerData.companyName}</h2>
          <p className="text-muted-foreground">Seller ID: {sellerData.id}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusBadge(sellerData.status)}>{sellerData.status}</Badge>
          <Badge className={getStatusBadge(sellerData.verificationStatus)}>{sellerData.verificationStatus}</Badge>
          <Badge className={getRiskBadge(sellerData.riskLevel)}>{sellerData.riskLevel} risk</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="financing">Financing Requests</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerContracts.length}</div>
                <p className="text-xs text-muted-foreground">
                  {sellerContracts.filter((c) => c.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Financing</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(sellerFinancingRequests.reduce((sum, r) => sum + r.requestedAmount, 0))}
                </div>
                <p className="text-xs text-muted-foreground">{sellerFinancingRequests.length} requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Rating</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerData.creditRating}</div>
                <p className="text-xs text-muted-foreground">{sellerData.riskLevel} risk profile</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(sellerData.annualRevenue)}</div>
                <p className="text-xs text-muted-foreground">{sellerData.yearsInBusiness} years in business</p>
              </CardContent>
            </Card>
          </div>

          {/* Company Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Contact Person</Label>
                    <p className="text-sm text-muted-foreground">{sellerData.contactPerson}</p>
                    <p className="text-sm text-muted-foreground">{sellerData.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Business Type</Label>
                    <p className="text-sm text-muted-foreground">{sellerData.businessType}</p>
                    <p className="text-sm text-muted-foreground">{sellerData.industry}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{sellerData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{sellerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{sellerData.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Registered: {formatDate(sellerData.registrationDate)}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Business Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{sellerData.businessDescription}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Annual Revenue</Label>
                    <p className="text-lg font-semibold">{formatCurrency(sellerData.annualRevenue)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Employee Count</Label>
                    <p className="text-lg font-semibold">{sellerData.employeeCount}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Banking Information</Label>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{sellerData.bankDetails.bankName}</p>
                    <p>{sellerData.bankDetails.accountType}</p>
                    <p>Account: {sellerData.bankDetails.accountNumber}</p>
                    <p>Routing: {sellerData.bankDetails.routingNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Tax ID</Label>
                    <p className="text-sm text-muted-foreground">{sellerData.taxId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Website</Label>
                    <a href={sellerData.website} className="text-sm text-blue-600 hover:underline">
                      {sellerData.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Contract Portfolio</h3>
              <p className="text-sm text-muted-foreground">All contracts and agreements for {sellerData.companyName}</p>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Contract
            </Button>
          </div>

          {/* Contract Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerContracts.filter((c) => c.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Contract Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(sellerContracts.reduce((sum, c) => sum + c.value, 0))}
                </div>
                <p className="text-xs text-muted-foreground">Lifetime value</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(sellerContracts.reduce((sum, c) => sum + c.utilization, 0) / sellerContracts.length)}%
                </div>
                <p className="text-xs text-muted-foreground">Credit utilization</p>
              </CardContent>
            </Card>
          </div>

          {/* Contracts Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellerContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(contract.status)}>{contract.status}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(contract.value)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(contract.startDate)}</div>
                        <div className="text-muted-foreground">to {formatDate(contract.endDate)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={contract.utilization} className="w-16" />
                        <span className="text-sm">{contract.utilization}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedContract(contract)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{selectedContract?.title}</DialogTitle>
                              <DialogDescription>Contract ID: {selectedContract?.id}</DialogDescription>
                            </DialogHeader>
                            {selectedContract && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Contract Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Type:</strong> {selectedContract.type}
                                      </p>
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        <Badge className={getStatusBadge(selectedContract.status)}>
                                          {selectedContract.status}
                                        </Badge>
                                      </p>
                                      <p>
                                        <strong>Value:</strong> {formatCurrency(selectedContract.value)}
                                      </p>
                                      <p>
                                        <strong>Period:</strong> {formatDate(selectedContract.startDate)} to{" "}
                                        {formatDate(selectedContract.endDate)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Terms</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Advance Rate:</strong> {selectedContract.terms.advanceRate}%
                                      </p>
                                      <p>
                                        <strong>Factor Fee:</strong> {selectedContract.terms.factorFee}%
                                      </p>
                                      <p>
                                        <strong>Credit Limit:</strong>{" "}
                                        {formatCurrency(selectedContract.terms.creditLimit)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Performance Metrics</h4>
                                  <div className="grid grid-cols-4 gap-4">
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Total Transactions</p>
                                      <p className="text-2xl font-bold text-blue-600">
                                        {selectedContract.performance.totalTransactions}
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Total Volume</p>
                                      <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(selectedContract.performance.totalVolume)}
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Avg Payment Days</p>
                                      <p className="text-2xl font-bold text-purple-600">
                                        {selectedContract.performance.avgPaymentDays}
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">On-Time Payments</p>
                                      <p className="text-2xl font-bold text-orange-600">
                                        {selectedContract.performance.onTimePayments}%
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Financing Requests Tab */}
        <TabsContent value="financing" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Financing Request History</h3>
              <p className="text-sm text-muted-foreground">
                All financing requests submitted by {sellerData.companyName}
              </p>
            </div>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>

          {/* Financing Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sellerFinancingRequests.length}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Financed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    sellerFinancingRequests
                      .filter((r) => r.status === "approved" || r.status === "completed")
                      .reduce((sum, r) => sum + r.requestedAmount, 0),
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Approved amount</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (sellerFinancingRequests.filter((r) => r.status === "approved" || r.status === "completed").length /
                      sellerFinancingRequests.length) *
                      100,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Success rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    sellerFinancingRequests.reduce((sum, r) => sum + r.riskScore, 0) / sellerFinancingRequests.length,
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Risk assessment</p>
              </CardContent>
            </Card>
          </div>

          {/* Financing Requests Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Invoice Amount</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellerFinancingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.buyer}</div>
                        <div className="text-sm text-muted-foreground">{request.buyerCountry}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(request.invoiceAmount, request.currency)}</TableCell>
                    <TableCell>{formatCurrency(request.requestedAmount, request.currency)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(request.status)}>{request.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={request.riskScore} className="w-16" />
                        <span className="text-sm">{request.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(request.submissionDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Financing Request Details</DialogTitle>
                              <DialogDescription>Request ID: {selectedRequest?.id}</DialogDescription>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Request Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Buyer:</strong> {selectedRequest.buyer}
                                      </p>
                                      <p>
                                        <strong>Invoice Number:</strong> {selectedRequest.invoiceNumber}
                                      </p>
                                      <p>
                                        <strong>Product Category:</strong> {selectedRequest.productCategory}
                                      </p>
                                      <p>
                                        <strong>Trade Route:</strong> {selectedRequest.tradeRoute}
                                      </p>
                                      <p>
                                        <strong>Due Date:</strong> {formatDate(selectedRequest.dueDate)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Financial Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Invoice Amount:</strong>{" "}
                                        {formatCurrency(selectedRequest.invoiceAmount, selectedRequest.currency)}
                                      </p>
                                      <p>
                                        <strong>Requested Amount:</strong>{" "}
                                        {formatCurrency(selectedRequest.requestedAmount, selectedRequest.currency)}
                                      </p>
                                      <p>
                                        <strong>Advance Rate:</strong>{" "}
                                        {Math.round(
                                          (selectedRequest.requestedAmount / selectedRequest.invoiceAmount) * 100,
                                        )}
                                        %
                                      </p>
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        <Badge className={getStatusBadge(selectedRequest.status)}>
                                          {selectedRequest.status.replace("_", " ")}
                                        </Badge>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Assessment Scores</h4>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Documents Complete</p>
                                      <p className="text-2xl font-bold text-blue-600">
                                        {selectedRequest.documentsComplete}%
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">AI Validation Score</p>
                                      <p className="text-2xl font-bold text-green-600">
                                        {selectedRequest.aiValidationScore}%
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Risk Score</p>
                                      <p className="text-2xl font-bold text-purple-600">{selectedRequest.riskScore}</p>
                                    </div>
                                  </div>
                                </div>
                                {selectedRequest.status === "completed" && (
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Transaction Timeline</h4>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <p className="font-medium">Approved</p>
                                        <p className="text-muted-foreground">
                                          {formatDate(selectedRequest.approvalDate)}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="font-medium">Disbursed</p>
                                        <p className="text-muted-foreground">
                                          {formatDate(selectedRequest.disbursementDate)}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="font-medium">Repaid</p>
                                        <p className="text-muted-foreground">
                                          {formatDate(selectedRequest.repaymentDate)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Document Repository</h3>
              <p className="text-sm text-muted-foreground">All documents uploaded by {sellerData.companyName}</p>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellerData.documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(doc.status)}>{doc.status}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Performance Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive performance metrics for {sellerData.companyName}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sellerContracts.reduce((sum, c) => sum + c.performance.totalTransactions, 0)}
                </div>
                <p className="text-xs text-muted-foreground">All contracts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(sellerContracts.reduce((sum, c) => sum + c.performance.totalVolume, 0))}
                </div>
                <p className="text-xs text-muted-foreground">Processed volume</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Payment Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    sellerContracts.reduce((sum, c) => sum + c.performance.avgPaymentDays, 0) / sellerContracts.length,
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Days to payment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">On-Time Payment Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    sellerContracts.reduce((sum, c) => sum + c.performance.onTimePayments, 0) / sellerContracts.length,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Payment reliability</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contract Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellerContracts.map((contract) => (
                    <div key={contract.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{contract.title}</span>
                        <span className="text-sm text-muted-foreground">{contract.performance.onTimePayments}%</span>
                      </div>
                      <Progress value={contract.performance.onTimePayments} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financing Request Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Approved Requests</span>
                      <span className="text-sm text-muted-foreground">
                        {
                          sellerFinancingRequests.filter((r) => r.status === "approved" || r.status === "completed")
                            .length
                        }
                        /{sellerFinancingRequests.length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (sellerFinancingRequests.filter((r) => r.status === "approved" || r.status === "completed")
                          .length /
                          sellerFinancingRequests.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average AI Score</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(
                          sellerFinancingRequests.reduce((sum, r) => sum + r.aiValidationScore, 0) /
                            sellerFinancingRequests.length,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        sellerFinancingRequests.reduce((sum, r) => sum + r.aiValidationScore, 0) /
                        sellerFinancingRequests.length
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
