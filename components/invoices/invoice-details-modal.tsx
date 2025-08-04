"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  X,
  Download,
  Eye,
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"
import StatusTimeline from "./status-timeline"

interface InvoiceDetailsModalProps {
  invoice: any
  onClose: () => void
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export default function InvoiceDetailsModal({
  invoice,
  onClose,
  formatCurrency,
  getStatusColor,
  getStatusText,
}: InvoiceDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDaysInProcess = (submissionDate: string) => {
    const submitted = new Date(submissionDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - submitted.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "funded":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "collected":
        return <CheckCircle className="h-5 w-5 text-emerald-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  // Mock buyer contact information
  const buyerContact = {
    email: "accounts@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, New York, NY 10001",
    contactPerson: "Sarah Johnson",
    title: "Accounts Payable Manager",
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <DialogTitle className="text-xl font-semibold flex items-center gap-3">
              {getStatusIcon(invoice.status)}
              {invoice.invoiceNumber}
            </DialogTitle>
            <DialogDescription className="mt-2">
              Detailed information and status tracking for this invoice
            </DialogDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Invoice Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Invoice Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice Number:</span>
                    <span className="font-semibold">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-lg">{formatCurrency(invoice.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-semibold">{invoice.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-semibold">{formatDate(invoice.dueDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submission Date:</span>
                    <span className="font-semibold">{formatDate(invoice.submissionDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days in Process:</span>
                    <span className="font-semibold">{getDaysInProcess(invoice.submissionDate)} days</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(invoice.status)}>{getStatusText(invoice.status)}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Buyer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Buyer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Name:</span>
                    <span className="font-semibold">{invoice.buyerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Rating:</span>
                    <Badge variant="outline" className="font-semibold">
                      {invoice.buyerCreditRating}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <Badge
                      variant="outline"
                      className={
                        invoice.riskLevel === "Low"
                          ? "text-green-700 border-green-300"
                          : invoice.riskLevel === "Medium"
                            ? "text-yellow-700 border-yellow-300"
                            : "text-red-700 border-red-300"
                      }
                    >
                      {invoice.riskLevel}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{buyerContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{buyerContact.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{buyerContact.address}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-medium">{buyerContact.contactPerson}</div>
                    <div className="text-sm text-muted-foreground">{buyerContact.title}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notes or Rejection Reason */}
            {(invoice.notes || invoice.rejectionReason) && (
              <Card>
                <CardHeader>
                  <CardTitle>{invoice.rejectionReason ? "Rejection Details" : "Additional Notes"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`p-4 rounded-lg ${
                      invoice.rejectionReason ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <p className="text-sm">{invoice.rejectionReason || invoice.notes}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Processing Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StatusTimeline timeline={invoice.timeline} formatDate={formatDate} formatTime={formatTime} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Supporting Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoice.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Financial Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invoice Amount:</span>
                    <span className="font-semibold text-lg">{formatCurrency(invoice.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Factor Rate:</span>
                    <span className="font-semibold">{invoice.factorRate}%</span>
                  </div>
                  <Separator />
                  {invoice.advanceAmount && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Advance Amount:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(invoice.advanceAmount)}</span>
                    </div>
                  )}
                  {invoice.reserveAmount && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reserve Amount:</span>
                      <span className="font-semibold">{formatCurrency(invoice.reserveAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Factor Fee:</span>
                    <span className="font-semibold">{formatCurrency(invoice.amount * (invoice.factorRate / 100))}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {invoice.fundingDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Funding Date:</span>
                      <span className="font-semibold">{formatDate(invoice.fundingDate)}</span>
                    </div>
                  )}
                  {invoice.expectedCollectionDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Collection:</span>
                      <span className="font-semibold">{formatDate(invoice.expectedCollectionDate)}</span>
                    </div>
                  )}
                  {invoice.collectionDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collection Date:</span>
                      <span className="font-semibold text-green-600">{formatDate(invoice.collectionDate)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Payment Terms</div>
                    <div className="text-sm text-muted-foreground">Net 30 days from invoice date</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Recourse Type</div>
                    <div className="text-sm text-muted-foreground">Non-recourse factoring</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
