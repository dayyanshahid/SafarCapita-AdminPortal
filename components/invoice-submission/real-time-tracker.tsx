"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Eye,
  RefreshCw,
  Bell,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react"

interface TrackingStatus {
  stage: string
  status: "completed" | "in_progress" | "pending" | "failed"
  timestamp: string
  description: string
  details?: string
  estimatedCompletion?: string
  assignedTo?: string
  notes?: string[]
}

interface RealTimeTrackerProps {
  requestId: string
  currentStatus: string
  onStatusUpdate?: (status: string) => void
}

export default function RealTimeTracker({ requestId, currentStatus, onStatusUpdate }: RealTimeTrackerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [trackingData, setTrackingData] = useState<TrackingStatus[]>([
    {
      stage: "draft",
      status: "completed",
      timestamp: "2024-01-15T10:30:00Z",
      description: "Request created and saved as draft",
      details: "Initial request form completed with basic information",
      assignedTo: "System",
    },
    {
      stage: "submitted",
      status: "completed",
      timestamp: "2024-01-15T11:45:00Z",
      description: "Request submitted for review",
      details: "All required documents uploaded and validated",
      assignedTo: "Review Team",
    },
    {
      stage: "under_review",
      status: "in_progress",
      timestamp: "2024-01-15T12:00:00Z",
      description: "Document verification in progress",
      details: "Credit team reviewing buyer information and trade documents",
      estimatedCompletion: "2024-01-16T16:00:00Z",
      assignedTo: "Sarah Johnson - Senior Credit Analyst",
      notes: ["Buyer credit check initiated", "Trade documents under verification", "Awaiting final compliance review"],
    },
    {
      stage: "approved",
      status: "pending",
      timestamp: "",
      description: "Pending approval decision",
      details: "Awaiting final credit committee approval",
      estimatedCompletion: "2024-01-16T18:00:00Z",
    },
    {
      stage: "funded",
      status: "pending",
      timestamp: "",
      description: "Funding process pending",
      details: "Will initiate once approval is received",
    },
  ])

  const refreshStatus = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const getStageProgress = () => {
    const completedStages = trackingData.filter((stage) => stage.status === "completed").length
    const totalStages = trackingData.length
    return (completedStages / totalStages) * 100
  }

  const getCurrentStage = () => {
    return trackingData.find((stage) => stage.status === "in_progress") || trackingData[trackingData.length - 1]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatTimeRemaining = (estimatedCompletion: string) => {
    const now = new Date()
    const completion = new Date(estimatedCompletion)
    const diffHours = Math.ceil((completion.getTime() - now.getTime()) / (1000 * 60 * 60))

    if (diffHours < 0) return "Overdue"
    if (diffHours < 24) return `${diffHours} hours remaining`
    const diffDays = Math.ceil(diffHours / 24)
    return `${diffDays} days remaining`
  }

  const currentStage = getCurrentStage()

  return (
    <div className="space-y-6">
      {/* Header with Real-time Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Real-Time Request Tracking
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Request ID: {requestId}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Last Updated</div>
                <div className="text-sm font-medium">{lastUpdated.toLocaleTimeString()}</div>
              </div>
              <Button variant="outline" size="sm" onClick={refreshStatus} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(getStageProgress())}% Complete</span>
              </div>
              <Progress value={getStageProgress()} className="h-2" />
            </div>

            {/* Current Stage Info */}
            {currentStage && (
              <Alert className="border-blue-200 bg-blue-50">
                <Clock className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Current Stage:</strong> {currentStage.description}
                      {currentStage.assignedTo && (
                        <div className="text-sm text-blue-700 mt-1">Assigned to: {currentStage.assignedTo}</div>
                      )}
                    </div>
                    {currentStage.estimatedCompletion && (
                      <Badge variant="outline" className="text-blue-700 border-blue-300">
                        {formatTimeRemaining(currentStage.estimatedCompletion)}
                      </Badge>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detailed Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trackingData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                {/* Timeline line */}
                {index < trackingData.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-20 bg-border"></div>}

                <div className="flex gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(stage.status)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-gray-900">{stage.description}</h4>
                        <Badge className={`text-xs ${getStatusColor(stage.status)}`}>
                          {stage.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </div>
                      {stage.timestamp && (
                        <div className="text-sm text-muted-foreground">
                          {new Date(stage.timestamp).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {stage.details && <p className="text-sm text-muted-foreground mb-3">{stage.details}</p>}

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {stage.assignedTo && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span className="font-medium">{stage.assignedTo}</span>
                        </div>
                      )}
                      {stage.estimatedCompletion && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Expected:</span>
                          <span className="font-medium">{new Date(stage.estimatedCompletion).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {stage.notes && stage.notes.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Progress Notes
                        </div>
                        <ul className="space-y-1">
                          {stage.notes.map((note, noteIndex) => (
                            <li key={noteIndex} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Set Alerts
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Documents
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Request Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
