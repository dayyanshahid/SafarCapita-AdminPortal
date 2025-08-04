"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, FileText, Search, CreditCard, DollarSign, Eye, Package } from "lucide-react"

interface TimelineItem {
  stage: string
  date: string
  status: "completed" | "in_progress" | "pending"
  description: string
}

interface StatusTimelineProps {
  timeline: TimelineItem[]
  formatDate: (date: string) => string
  formatTime: (date: string) => string
}

export default function StatusTimeline({ timeline, formatDate, formatTime }: StatusTimelineProps) {
  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "submitted":
        return <FileText className="h-4 w-4" />
      case "review":
        return <Search className="h-4 w-4" />
      case "credit_check":
        return <CreditCard className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "funding_pending":
        return <Clock className="h-4 w-4" />
      case "funded":
        return <DollarSign className="h-4 w-4" />
      case "collection":
        return <Eye className="h-4 w-4" />
      case "collected":
        return <Package className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStageTitle = (stage: string) => {
    switch (stage) {
      case "submitted":
        return "Invoice Submitted"
      case "review":
        return "Document Review"
      case "credit_check":
        return "Credit Check"
      case "approved":
        return "Approved for Factoring"
      case "funding_pending":
        return "Funding Pending"
      case "funded":
        return "Advance Payment Sent"
      case "collection":
        return "Collection Period"
      case "collected":
        return "Payment Collected"
      case "completed":
        return "Transaction Completed"
      case "rejected":
        return "Invoice Rejected"
      default:
        return stage.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    }
  }

  const getStatusColor = (status: string, stage: string) => {
    if (stage === "rejected") {
      return "border-red-200 bg-red-50"
    }

    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50"
      case "in_progress":
        return "border-blue-200 bg-blue-50"
      case "pending":
        return "border-gray-200 bg-gray-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string, stage: string) => {
    if (stage === "rejected") {
      return <AlertCircle className="h-5 w-5 text-red-600" />
    }

    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string, stage: string) => {
    if (stage === "rejected") {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
    }

    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="relative">
          {/* Timeline line */}
          {index < timeline.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>}

          <div className={`flex gap-4 p-4 rounded-lg border ${getStatusColor(item.status, item.stage)}`}>
            {/* Status Icon */}
            <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status, item.stage)}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getStageIcon(item.stage)}
                    <h4 className="font-semibold">{getStageTitle(item.stage)}</h4>
                  </div>
                  {getStatusBadge(item.status, item.stage)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(item.date)} at {formatTime(item.date)}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{item.description}</p>

              {/* Additional context based on stage */}
              {item.stage === "credit_check" && item.status === "completed" && (
                <div className="mt-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                  ✓ Buyer creditworthiness verified
                </div>
              )}

              {item.stage === "funded" && item.status === "completed" && (
                <div className="mt-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                  ✓ Advance payment processed successfully
                </div>
              )}

              {item.stage === "collection" && item.status === "in_progress" && (
                <div className="mt-2 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
                  ⏳ Monitoring buyer payment - due in{" "}
                  {Math.ceil(
                    (new Date(item.date).getTime() + 30 * 24 * 60 * 60 * 1000 - new Date().getTime()) /
                      (24 * 60 * 60 * 1000),
                  )}{" "}
                  days
                </div>
              )}

              {item.stage === "rejected" && (
                <div className="mt-2 text-xs text-red-700 bg-red-100 px-2 py-1 rounded">
                  ❌ Review rejection details and consider resubmission with additional documentation
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Expected next steps */}
      {timeline.length > 0 && timeline[timeline.length - 1].status === "in_progress" && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">Next Steps</h5>
          <p className="text-sm text-blue-800">
            {timeline[timeline.length - 1].stage === "collection"
              ? "We are actively monitoring the collection process. You will be notified once payment is received from the buyer."
              : timeline[timeline.length - 1].stage === "credit_check"
                ? "Our credit team is conducting a thorough review of the buyer's creditworthiness. This typically takes 1-2 business days."
                : timeline[timeline.length - 1].stage === "review"
                  ? "Our team is reviewing the submitted documents for completeness and accuracy. This usually takes 2-4 hours."
                  : "Your invoice is being processed. We will update you as soon as there are any changes."}
          </p>
        </div>
      )}
    </div>
  )
}
