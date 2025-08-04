"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, Calendar, Building2, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface InvoiceStatusCardProps {
  invoice: any
  onViewDetails: () => void
  formatCurrency: (amount: number) => string
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export default function InvoiceStatusCard({
  invoice,
  onViewDetails,
  formatCurrency,
  getStatusColor,
  getStatusText,
}: InvoiceStatusCardProps) {
  const getProgressPercentage = (status: string, currentStage: string) => {
    const stages = ["submitted", "review", "credit_check", "approved", "funded", "collection", "collected"]

    if (status === "rejected") return 100

    const currentIndex = stages.indexOf(currentStage)
    return currentIndex >= 0 ? ((currentIndex + 1) / stages.length) * 100 : 0
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "funded":
        return <CheckCircle className="h-4 w-4" />
      case "collected":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysInProcess = (submissionDate: string) => {
    const submitted = new Date(submissionDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - submitted.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              {getStatusIcon(invoice.status)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{invoice.invoiceNumber}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Building2 className="h-4 w-4" />
                <span>{invoice.buyerName}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Submitted: {formatDate(invoice.submissionDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{getDaysInProcess(invoice.submissionDate)} days in process</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold">{formatCurrency(invoice.amount)}</div>
            <Badge className={getStatusColor(invoice.status)}>{getStatusText(invoice.status)}</Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Processing Progress</span>
            <span className="text-muted-foreground">
              {Math.round(getProgressPercentage(invoice.status, invoice.currentStage))}% Complete
            </span>
          </div>
          <Progress value={getProgressPercentage(invoice.status, invoice.currentStage)} className="h-2" />
        </div>

        {/* Financial Information */}
        {(invoice.advanceAmount || invoice.factorRate) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
            {invoice.factorRate && (
              <div>
                <div className="text-xs text-muted-foreground">Factor Rate</div>
                <div className="font-semibold">{invoice.factorRate}%</div>
              </div>
            )}
            {invoice.advanceAmount && (
              <div>
                <div className="text-xs text-muted-foreground">Advance Amount</div>
                <div className="font-semibold text-green-600">{formatCurrency(invoice.advanceAmount)}</div>
              </div>
            )}
            {invoice.reserveAmount && (
              <div>
                <div className="text-xs text-muted-foreground">Reserve Amount</div>
                <div className="font-semibold">{formatCurrency(invoice.reserveAmount)}</div>
              </div>
            )}
            {invoice.buyerCreditRating && (
              <div>
                <div className="text-xs text-muted-foreground">Buyer Rating</div>
                <div className="font-semibold">{invoice.buyerCreditRating}</div>
              </div>
            )}
          </div>
        )}

        {/* Current Stage Information */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Current Stage: </span>
            <span className="font-medium capitalize">{invoice.currentStage?.replace("_", " ")}</span>
          </div>

          <Button variant="outline" size="sm" onClick={onViewDetails}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>

        {/* Notes or Rejection Reason */}
        {(invoice.notes || invoice.rejectionReason) && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">
              {invoice.rejectionReason ? "Rejection Reason" : "Notes"}
            </div>
            <div className="text-sm">{invoice.rejectionReason || invoice.notes}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
