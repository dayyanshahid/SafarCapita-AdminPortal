"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Trash2, Copy, FileText, DollarSign, Building2, CheckCircle, AlertTriangle } from "lucide-react"

interface FinancingRequest {
  id: string
  invoiceNumber: string
  buyerName: string
  invoiceAmount: number
  financingAmount: number
  currency: string
  dueDate: string
  status: "draft" | "ready" | "submitted"
  createdAt: string
}

interface MultipleRequestsManagerProps {
  onRequestsChange: (requests: FinancingRequest[]) => void
  initialRequests?: FinancingRequest[]
}

export default function MultipleRequestsManager({
  onRequestsChange,
  initialRequests = [],
}: MultipleRequestsManagerProps) {
  const [requests, setRequests] = useState<FinancingRequest[]>(initialRequests)
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])

  const addNewRequest = () => {
    const newRequest: FinancingRequest = {
      id: `req-${Date.now()}`,
      invoiceNumber: "",
      buyerName: "",
      invoiceAmount: 0,
      financingAmount: 0,
      currency: "USD",
      dueDate: "",
      status: "draft",
      createdAt: new Date().toISOString(),
    }

    const updatedRequests = [...requests, newRequest]
    setRequests(updatedRequests)
    onRequestsChange(updatedRequests)
  }

  const duplicateRequest = (requestId: string) => {
    const originalRequest = requests.find((req) => req.id === requestId)
    if (!originalRequest) return

    const duplicatedRequest: FinancingRequest = {
      ...originalRequest,
      id: `req-${Date.now()}`,
      invoiceNumber: `${originalRequest.invoiceNumber}-COPY`,
      status: "draft",
      createdAt: new Date().toISOString(),
    }

    const updatedRequests = [...requests, duplicatedRequest]
    setRequests(updatedRequests)
    onRequestsChange(updatedRequests)
  }

  const removeRequest = (requestId: string) => {
    const updatedRequests = requests.filter((req) => req.id !== requestId)
    setRequests(updatedRequests)
    setSelectedRequests((prev) => prev.filter((id) => id !== requestId))
    onRequestsChange(updatedRequests)
  }

  const updateRequest = (requestId: string, updates: Partial<FinancingRequest>) => {
    const updatedRequests = requests.map((req) => (req.id === requestId ? { ...req, ...updates } : req))
    setRequests(updatedRequests)
    onRequestsChange(updatedRequests)
  }

  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId],
    )
  }

  const bulkSubmitRequests = () => {
    const updatedRequests = requests.map((req) =>
      selectedRequests.includes(req.id) && req.status === "ready" ? { ...req, status: "submitted" as const } : req,
    )
    setRequests(updatedRequests)
    onRequestsChange(updatedRequests)
    setSelectedRequests([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "ready":
        return "bg-green-100 text-green-700 border-green-200"
      case "submitted":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const readyRequests = requests.filter((req) => req.status === "ready")
  const totalFinancingAmount = selectedRequests.reduce((total, requestId) => {
    const request = requests.find((req) => req.id === requestId)
    return total + (request?.financingAmount || 0)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Multiple Financing Requests</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage multiple financing requests for batch processing
          </p>
        </div>
        <Button onClick={addNewRequest} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Request
        </Button>
      </div>

      {/* Summary Stats */}
      {requests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-xl font-semibold">{requests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Ready to Submit</p>
                  <p className="text-xl font-semibold">{readyRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Selected Amount</p>
                  <p className="text-xl font-semibold">${totalFinancingAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Selected</p>
                  <p className="text-xl font-semibold">{selectedRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedRequests.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 flex items-center justify-between">
            <span>
              {selectedRequests.length} request(s) selected for total amount of ${totalFinancingAmount.toLocaleString()}
            </span>
            <Button
              onClick={bulkSubmitRequests}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 ml-4"
              disabled={!selectedRequests.some((id) => requests.find((req) => req.id === id)?.status === "ready")}
            >
              Submit Selected
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Financing Requests</h3>
              <p className="text-gray-600 mb-4">
                Create your first financing request to get started with batch processing
              </p>
              <Button onClick={addNewRequest} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create First Request
              </Button>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              isSelected={selectedRequests.includes(request.id)}
              onToggleSelection={() => toggleRequestSelection(request.id)}
              onUpdate={(updates) => updateRequest(request.id, updates)}
              onDuplicate={() => duplicateRequest(request.id)}
              onRemove={() => removeRequest(request.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

// Individual Request Card Component
function RequestCard({
  request,
  isSelected,
  onToggleSelection,
  onUpdate,
  onDuplicate,
  onRemove,
}: {
  request: FinancingRequest
  isSelected: boolean
  onToggleSelection: () => void
  onUpdate: (updates: Partial<FinancingRequest>) => void
  onDuplicate: () => void
  onRemove: () => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "ready":
        return "bg-green-100 text-green-700 border-green-200"
      case "submitted":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4" />
      case "submitted":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <Card
      className={`transition-all duration-200 ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelection}
              className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              disabled={request.status === "draft"}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{request.invoiceNumber || "New Request"}</h3>
                <Badge className={`text-xs ${getStatusColor(request.status)} flex items-center gap-1`}>
                  {getStatusIcon(request.status)}
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Buyer:</span>
                  <div className="font-medium">{request.buyerName || "Not specified"}</div>
                </div>
                <div>
                  <span className="text-gray-600">Invoice Amount:</span>
                  <div className="font-medium">
                    {request.invoiceAmount > 0
                      ? `${request.currency} ${request.invoiceAmount.toLocaleString()}`
                      : "Not specified"}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Financing Amount:</span>
                  <div className="font-medium text-green-600">
                    {request.financingAmount > 0
                      ? `${request.currency} ${request.financingAmount.toLocaleString()}`
                      : "Not specified"}
                  </div>
                </div>
              </div>

              {request.dueDate && (
                <div className="mt-2 text-sm">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium ml-1">{new Date(request.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onDuplicate} className="text-gray-600 hover:text-blue-600">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove} className="text-gray-600 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {request.status === "draft" && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              This request is incomplete. Please complete all required fields to make it ready for submission.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-gray-500 mt-3">Created: {new Date(request.createdAt).toLocaleString()}</div>
      </CardContent>
    </Card>
  )
}
