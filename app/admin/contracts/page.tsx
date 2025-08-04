"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Send,
  AlertTriangle,
} from "lucide-react"

// Mock data for contracts
const contractsData = [
  {
    id: "CT-2024-001",
    title: "Trade Finance Agreement",
    client: "ABC Corporation",
    clientEmail: "finance@abccorp.com",
    type: "Trade Finance",
    status: "active",
    value: 250000,
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    riskLevel: "low",
    utilization: 75,
    documents: [
      { name: "Master Agreement", status: "signed", uploadDate: "2024-01-15" },
      { name: "KYC Documents", status: "verified", uploadDate: "2024-01-10" },
      { name: "Financial Statements", status: "approved", uploadDate: "2024-01-12" },
    ],
    terms: {
      advanceRate: 85,
      factorFee: 2.5,
      minimumFee: 500,
      creditLimit: 250000,
      termLength: 60,
    },
    lastActivity: "2024-01-20",
    createdBy: "Admin User",
    notes: "High-value client with excellent payment history",
  },
  {
    id: "CT-2024-002",
    title: "Invoice Factoring Agreement",
    client: "XYZ Limited",
    clientEmail: "accounts@xyzltd.com",
    type: "Invoice Factoring",
    status: "pending_signature",
    value: 150000,
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    riskLevel: "medium",
    utilization: 0,
    documents: [
      { name: "Factoring Agreement", status: "pending_signature", uploadDate: "2024-01-18" },
      { name: "UCC Filing", status: "draft", uploadDate: "2024-01-18" },
    ],
    terms: {
      advanceRate: 80,
      factorFee: 3.0,
      minimumFee: 300,
      creditLimit: 150000,
      termLength: 45,
    },
    lastActivity: "2024-01-18",
    createdBy: "Admin User",
    notes: "New client, requires additional documentation",
  },
  {
    id: "CT-2024-003",
    title: "Supply Chain Finance",
    client: "DEF Industries",
    clientEmail: "procurement@defindustries.com",
    type: "Supply Chain",
    status: "expired",
    value: 500000,
    startDate: "2023-06-01",
    endDate: "2024-01-01",
    riskLevel: "high",
    utilization: 90,
    documents: [
      { name: "Supply Chain Agreement", status: "expired", uploadDate: "2023-06-01" },
      { name: "Supplier Agreements", status: "expired", uploadDate: "2023-06-01" },
    ],
    terms: {
      advanceRate: 75,
      factorFee: 3.5,
      minimumFee: 1000,
      creditLimit: 500000,
      termLength: 90,
    },
    lastActivity: "2024-01-01",
    createdBy: "Admin User",
    notes: "Contract expired, renewal under discussion",
  },
]

// Mock data for templates
const templatesData = [
  {
    id: "TPL-001",
    name: "Standard Trade Finance Agreement",
    description: "Comprehensive trade finance agreement for established businesses",
    category: "Trade Finance",
    version: "2.1",
    lastModified: "2024-01-10",
    usage: 45,
    status: "active",
    content: `TRADE FINANCE AGREEMENT

This Trade Finance Agreement ("Agreement") is entered into on [DATE] between Safar Capital ("Lender") and [CLIENT_NAME] ("Borrower").

TERMS AND CONDITIONS:
1. Credit Limit: $[CREDIT_LIMIT]
2. Advance Rate: [ADVANCE_RATE]%
3. Factor Fee: [FACTOR_FEE]%
4. Term Length: [TERM_LENGTH] days

[Additional terms and conditions...]`,
    fields: [
      { name: "CLIENT_NAME", label: "Client Name", type: "text", required: true },
      { name: "CREDIT_LIMIT", label: "Credit Limit", type: "number", required: true },
      { name: "ADVANCE_RATE", label: "Advance Rate (%)", type: "number", required: true },
      { name: "FACTOR_FEE", label: "Factor Fee (%)", type: "number", required: true },
      { name: "TERM_LENGTH", label: "Term Length (days)", type: "number", required: true },
    ],
  },
  {
    id: "TPL-002",
    name: "Invoice Factoring Contract",
    description: "Standard invoice factoring agreement with recourse options",
    category: "Factoring",
    version: "1.8",
    lastModified: "2024-01-05",
    usage: 32,
    status: "active",
    content: `INVOICE FACTORING AGREEMENT

This Invoice Factoring Agreement ("Agreement") is made between Safar Capital ("Factor") and [CLIENT_NAME] ("Client").

FACTORING TERMS:
1. Advance Rate: [ADVANCE_RATE]%
2. Factor Fee: [FACTOR_FEE]%
3. Minimum Fee: $[MINIMUM_FEE]
4. Credit Limit: $[CREDIT_LIMIT]

[Additional factoring terms...]`,
    fields: [
      { name: "CLIENT_NAME", label: "Client Name", type: "text", required: true },
      { name: "ADVANCE_RATE", label: "Advance Rate (%)", type: "number", required: true },
      { name: "FACTOR_FEE", label: "Factor Fee (%)", type: "number", required: true },
      { name: "MINIMUM_FEE", label: "Minimum Fee ($)", type: "number", required: true },
      { name: "CREDIT_LIMIT", label: "Credit Limit ($)", type: "number", required: true },
    ],
  },
  {
    id: "TPL-003",
    name: "Supply Chain Finance Terms",
    description: "Comprehensive supply chain financing agreement",
    category: "Supply Chain",
    version: "3.0",
    lastModified: "2023-12-20",
    usage: 18,
    status: "draft",
    content: `SUPPLY CHAIN FINANCE AGREEMENT

This Supply Chain Finance Agreement is between Safar Capital and [CLIENT_NAME].

SUPPLY CHAIN TERMS:
1. Maximum Facility: $[CREDIT_LIMIT]
2. Advance Rate: [ADVANCE_RATE]%
3. Discount Rate: [FACTOR_FEE]%
4. Payment Terms: [TERM_LENGTH] days

[Supply chain specific terms...]`,
    fields: [
      { name: "CLIENT_NAME", label: "Client Name", type: "text", required: true },
      { name: "CREDIT_LIMIT", label: "Credit Limit ($)", type: "number", required: true },
      { name: "ADVANCE_RATE", label: "Advance Rate (%)", type: "number", required: true },
      { name: "FACTOR_FEE", label: "Discount Rate (%)", type: "number", required: true },
      { name: "TERM_LENGTH", label: "Payment Terms (days)", type: "number", required: true },
    ],
  },
]

export default function ContractManagementPage() {
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewContractOpen, setIsNewContractOpen] = useState(false)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const [isGenerateContractOpen, setIsGenerateContractOpen] = useState(false)
  const [contractFormData, setContractFormData] = useState<any>({})
  const [templateFormData, setTemplateFormData] = useState<any>({})

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending_signature: "bg-yellow-100 text-yellow-800",
      expired: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
      terminated: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return variants[risk as keyof typeof variants] || variants.low
  }

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
      case "verified":
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending_signature":
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "draft":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "expired":
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredContracts = contractsData.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateContract = () => {
    console.log("Creating contract:", contractFormData)
    setIsNewContractOpen(false)
    setContractFormData({})
    // Here you would typically make an API call to create the contract
  }

  const handleGenerateContract = () => {
    console.log("Generating contract from template:", selectedTemplate, templateFormData)
    setIsGenerateContractOpen(false)
    setTemplateFormData({})
    // Here you would generate the contract from the template
  }

  const handleSendForSignature = (contractId: string) => {
    console.log("Sending contract for signature:", contractId)
    // Here you would integrate with DocuSign or similar service
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Contract Management</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsNewContractOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractsData.length}</div>
                <p className="text-xs text-muted-foreground">
                  {contractsData.filter((c) => c.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${contractsData.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Portfolio value</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Signatures</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contractsData.filter((c) => c.status === "pending_signature").length}
                </div>
                <p className="text-xs text-muted-foreground">Awaiting execution</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">Contract execution rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending_signature">Pending Signature</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contracts Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contract.client}</div>
                        <div className="text-sm text-muted-foreground">{contract.clientEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(contract.status)}>{contract.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>${contract.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getRiskBadge(contract.riskLevel)}>{contract.riskLevel}</Badge>
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
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedContract?.title}</DialogTitle>
                              <DialogDescription>Contract ID: {selectedContract?.id}</DialogDescription>
                            </DialogHeader>
                            {selectedContract && (
                              <div className="space-y-6">
                                {/* Contract Overview */}
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Client Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Client:</strong> {selectedContract.client}
                                      </p>
                                      <p>
                                        <strong>Email:</strong> {selectedContract.clientEmail}
                                      </p>
                                      <p>
                                        <strong>Type:</strong> {selectedContract.type}
                                      </p>
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        <Badge className={getStatusBadge(selectedContract.status)}>
                                          {selectedContract.status.replace("_", " ")}
                                        </Badge>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Contract Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Value:</strong> ${selectedContract.value.toLocaleString()}
                                      </p>
                                      <p>
                                        <strong>Start Date:</strong> {selectedContract.startDate}
                                      </p>
                                      <p>
                                        <strong>End Date:</strong> {selectedContract.endDate}
                                      </p>
                                      <p>
                                        <strong>Risk Level:</strong>{" "}
                                        <Badge className={getRiskBadge(selectedContract.riskLevel)}>
                                          {selectedContract.riskLevel}
                                        </Badge>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Contract Terms */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Contract Terms</h4>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Advance Rate</p>
                                      <p className="text-2xl font-bold text-blue-600">
                                        {selectedContract.terms.advanceRate}%
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Factor Fee</p>
                                      <p className="text-2xl font-bold text-green-600">
                                        {selectedContract.terms.factorFee}%
                                      </p>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                      <p className="font-medium">Credit Limit</p>
                                      <p className="text-2xl font-bold text-purple-600">
                                        ${selectedContract.terms.creditLimit.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Documents */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Documents</h4>
                                  <div className="space-y-2">
                                    {selectedContract.documents.map((doc: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                      >
                                        <div className="flex items-center gap-3">
                                          {getDocumentStatusIcon(doc.status)}
                                          <div>
                                            <p className="font-medium">{doc.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                              {doc.status} • {doc.uploadDate}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4" />
                                          </Button>
                                          {doc.status === "pending_signature" && (
                                            <Button
                                              size="sm"
                                              onClick={() => handleSendForSignature(selectedContract.id)}
                                            >
                                              <Send className="h-4 w-4 mr-1" />
                                              Send
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Notes */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold">Notes</h4>
                                  <p className="text-sm text-muted-foreground">{selectedContract.notes}</p>
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
                        {contract.status === "pending_signature" && (
                          <Button size="sm" onClick={() => handleSendForSignature(contract.id)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contract Templates</h3>
            <Button onClick={() => setIsNewTemplateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templatesData.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <Badge className={getStatusBadge(template.status)}>{template.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{template.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Version:</span>
                      <span className="font-medium">{template.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage:</span>
                      <span className="font-medium">{template.usage} contracts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Modified:</span>
                      <span className="font-medium">{template.lastModified}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>{template.description}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-muted/10">
                              <pre className="whitespace-pre-wrap text-sm">{template.content}</pre>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">Template Fields</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {template.fields.map((field, index) => (
                                  <div key={index} className="p-2 border rounded text-sm">
                                    <strong>{field.label}</strong> ({field.type})
                                    {field.required && <span className="text-red-500">*</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={isGenerateContractOpen} onOpenChange={setIsGenerateContractOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1" onClick={() => setSelectedTemplate(template)}>
                            <FileText className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Generate Contract from Template</DialogTitle>
                            <DialogDescription>
                              Fill in the template fields to generate a new contract
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTemplate && (
                            <div className="space-y-4">
                              {selectedTemplate.fields.map((field: any, index: number) => (
                                <div key={index} className="space-y-2">
                                  <Label htmlFor={field.name}>
                                    {field.label}
                                    {field.required && <span className="text-red-500">*</span>}
                                  </Label>
                                  <Input
                                    id={field.name}
                                    type={field.type}
                                    value={templateFormData[field.name] || ""}
                                    onChange={(e) =>
                                      setTemplateFormData({
                                        ...templateFormData,
                                        [field.name]: e.target.value,
                                      })
                                    }
                                    required={field.required}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsGenerateContractOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleGenerateContract}>Generate Contract</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            {/* DocuSign Integration */}
            <Card>
              <CardHeader>
                <CardTitle>DocuSign Integration</CardTitle>
                <CardDescription>Configure digital signature settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>DocuSign API Status</Label>
                    <p className="text-sm text-muted-foreground">Connected and active</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" defaultValue="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" defaultValue="https://api.safarcapital.com/webhooks/docusign" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-id">Account ID</Label>
                  <Input id="account-id" defaultValue="12345678-1234-1234-1234-123456789012" />
                </div>
                <Button>Update DocuSign Configuration</Button>
              </CardContent>
            </Card>

            {/* Contract Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Settings</CardTitle>
                <CardDescription>Configure default contract terms and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-advance-rate">Default Advance Rate (%)</Label>
                    <Input id="default-advance-rate" type="number" defaultValue="85" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-factor-fee">Default Factor Fee (%)</Label>
                    <Input id="default-factor-fee" type="number" step="0.1" defaultValue="2.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-minimum-fee">Default Minimum Fee ($)</Label>
                    <Input id="default-minimum-fee" type="number" defaultValue="500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-term-length">Default Term Length (days)</Label>
                    <Input id="default-term-length" type="number" defaultValue="60" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract-numbering">Contract Numbering Format</Label>
                  <Input id="contract-numbering" defaultValue="CT-{YYYY}-{###}" />
                  <p className="text-sm text-muted-foreground">
                    Use {"{YYYY}"} for year, {"{MM}"} for month, {"{###}"} for sequential number
                  </p>
                </div>
                <Button>Save Contract Settings</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure contract-related notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract-created" defaultChecked />
                    <Label htmlFor="contract-created">Notify when new contract is created</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract-signed" defaultChecked />
                    <Label htmlFor="contract-signed">Notify when contract is signed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract-expiring" defaultChecked />
                    <Label htmlFor="contract-expiring">Notify when contract is expiring (30 days)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="signature-pending" defaultChecked />
                    <Label htmlFor="signature-pending">Notify when signature is pending (7 days)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compliance-issues" defaultChecked />
                    <Label htmlFor="compliance-issues">Notify about compliance issues</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@safarcapital.com" />
                </div>
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>

            {/* Document Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Configure document storage and retention policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Document Retention Period (years)</Label>
                  <Input id="retention-period" type="number" defaultValue="7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage-location">Storage Location</Label>
                  <Select defaultValue="aws-s3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws-s3">AWS S3</SelectItem>
                      <SelectItem value="azure-blob">Azure Blob Storage</SelectItem>
                      <SelectItem value="google-cloud">Google Cloud Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                  <Input id="max-file-size" type="number" defaultValue="50" />
                </div>
                <div className="space-y-4">
                  <Label>Allowed File Types</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf" defaultChecked />
                      <Label htmlFor="pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="docx" defaultChecked />
                      <Label htmlFor="docx">DOCX</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="xlsx" defaultChecked />
                      <Label htmlFor="xlsx">XLSX</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="jpg" />
                      <Label htmlFor="jpg">JPG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="png" />
                      <Label htmlFor="png">PNG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="txt" />
                      <Label htmlFor="txt">TXT</Label>
                    </div>
                  </div>
                </div>
                <Button>Save Document Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Contract Dialog */}
      <Dialog open={isNewContractOpen} onOpenChange={setIsNewContractOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Contract</DialogTitle>
            <DialogDescription>Enter the details for the new contract</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  value={contractFormData.clientName || ""}
                  onChange={(e) => setContractFormData({ ...contractFormData, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Client Email</Label>
                <Input
                  id="client-email"
                  type="email"
                  value={contractFormData.clientEmail || ""}
                  onChange={(e) => setContractFormData({ ...contractFormData, clientEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contract-type">Contract Type</Label>
                <Select
                  value={contractFormData.contractType || ""}
                  onValueChange={(value) => setContractFormData({ ...contractFormData, contractType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trade-finance">Trade Finance</SelectItem>
                    <SelectItem value="invoice-factoring">Invoice Factoring</SelectItem>
                    <SelectItem value="supply-chain">Supply Chain Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contract-value">Contract Value ($)</Label>
                <Input
                  id="contract-value"
                  type="number"
                  value={contractFormData.contractValue || ""}
                  onChange={(e) => setContractFormData({ ...contractFormData, contractValue: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="advance-rate">Advance Rate (%)</Label>
                <Input
                  id="advance-rate"
                  type="number"
                  value={contractFormData.advanceRate || ""}
                  onChange={(e) => setContractFormData({ ...contractFormData, advanceRate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="factor-fee">Factor Fee (%)</Label>
                <Input
                  id="factor-fee"
                  type="number"
                  step="0.1"
                  value={contractFormData.factorFee || ""}
                  onChange={(e) => setContractFormData({ ...contractFormData, factorFee: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term-length">Term Length (days)</Label>
                <Input
                  id="term-length"
                  type="number"
                  value={contractFormData.termLength || ""}
                  onChange={(e) => setContractFormData({ ...contractFormData, termLength: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={contractFormData.notes || ""}
                onChange={(e) => setContractFormData({ ...contractFormData, notes: e.target.value })}
                placeholder="Additional notes or special terms..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewContractOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateContract}>Create Contract</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Template Dialog */}
      <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>Create a new contract template</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input id="template-name" placeholder="e.g., Standard Trade Finance Agreement" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trade-finance">Trade Finance</SelectItem>
                    <SelectItem value="factoring">Factoring</SelectItem>
                    <SelectItem value="supply-chain">Supply Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Input id="template-description" placeholder="Brief description of the template" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea
                id="template-content"
                className="min-h-[300px]"
                placeholder="Enter the template content with placeholders like [CLIENT_NAME], [CREDIT_LIMIT], etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>
              Cancel
            </Button>
            <Button>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
