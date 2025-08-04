"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Ship,
  Shield,
  CheckCircle,
  AlertTriangle,
  X,
  Eye,
  Download,
  RefreshCw,
  Camera,
  Paperclip,
} from "lucide-react"

interface DocumentCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  required: boolean
  documents: DocumentType[]
}

interface DocumentType {
  id: string
  name: string
  description: string
  required: boolean
  formats: string[]
  maxSize: number
  uploaded?: UploadedFile
  validationStatus?: "pending" | "valid" | "invalid"
  validationMessage?: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  url: string
}

interface DocumentUploadStepProps {
  onNext: () => void
  onPrevious: () => void
}

export default function DocumentUploadStep({ onNext, onPrevious }: DocumentUploadStepProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [validationInProgress, setValidationInProgress] = useState<string[]>([])

  const documentCategories: DocumentCategory[] = [
    {
      id: "invoice-docs",
      name: "Invoice Documents",
      description: "Core invoice and commercial documents",
      icon: <FileText className="h-5 w-5" />,
      required: true,
      documents: [
        {
          id: "commercial-invoice",
          name: "Commercial Invoice",
          description: "Original commercial invoice with all details",
          required: true,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
          uploaded: {
            id: "1",
            name: "commercial-invoice.pdf",
            size: 2.5,
            type: "application/pdf",
            uploadDate: "2024-01-15T10:30:00Z",
            url: "/documents/commercial-invoice.pdf",
          },
          validationStatus: "valid",
          validationMessage: "Document verified and accepted",
        },
        {
          id: "purchase-order",
          name: "Purchase Order",
          description: "Buyer's purchase order or contract",
          required: true,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
          uploaded: {
            id: "2",
            name: "purchase-order.pdf",
            size: 1.8,
            type: "application/pdf",
            uploadDate: "2024-01-15T10:35:00Z",
            url: "/documents/purchase-order.pdf",
          },
          validationStatus: "valid",
        },
        {
          id: "proforma-invoice",
          name: "Proforma Invoice",
          description: "Preliminary invoice (if applicable)",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
      ],
    },
    {
      id: "shipping-docs",
      name: "Shipping Documents",
      description: "Transportation and logistics documents",
      icon: <Ship className="h-5 w-5" />,
      required: true,
      documents: [
        {
          id: "bill-of-lading",
          name: "Bill of Lading (B/L)",
          description: "Original or telex release B/L",
          required: true,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
          validationStatus: "pending",
        },
        {
          id: "packing-list",
          name: "Packing List",
          description: "Detailed packing list with weights and dimensions",
          required: true,
          formats: ["PDF", "JPG", "PNG", "XLS", "XLSX"],
          maxSize: 10,
        },
        {
          id: "delivery-receipt",
          name: "Delivery Receipt",
          description: "Proof of delivery or acceptance",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "freight-invoice",
          name: "Freight Invoice",
          description: "Shipping and freight charges",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
      ],
    },
    {
      id: "insurance-docs",
      name: "Insurance & Compliance",
      description: "Insurance certificates and compliance documents",
      icon: <Shield className="h-5 w-5" />,
      required: false,
      documents: [
        {
          id: "insurance-certificate",
          name: "Insurance Certificate",
          description: "Marine cargo insurance certificate",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "certificate-of-origin",
          name: "Certificate of Origin",
          description: "Country of origin certification",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "inspection-certificate",
          name: "Inspection Certificate",
          description: "Third-party inspection or quality certificate",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "surveyor-certificate",
          name: "Surveyor Certificate",
          description: "Independent surveyor's report",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "customs-declaration",
          name: "Customs Declaration",
          description: "Export/import customs documentation",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
      ],
    },
    {
      id: "financial-docs",
      name: "Financial Documents",
      description: "Banking and financial documentation",
      icon: <FileText className="h-5 w-5" />,
      required: false,
      documents: [
        {
          id: "letter-of-credit",
          name: "Letter of Credit",
          description: "LC or documentary credit (if applicable)",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "bank-guarantee",
          name: "Bank Guarantee",
          description: "Performance or payment guarantee",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
        {
          id: "credit-insurance",
          name: "Credit Insurance",
          description: "Trade credit insurance policy",
          required: false,
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 10,
        },
      ],
    },
  ]

  const handleFileUpload = useCallback(async (documentId: string, files: FileList) => {
    const file = files[0]
    if (!file) return

    // Start upload progress
    setUploadProgress((prev) => ({ ...prev, [documentId]: 0 }))

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const currentProgress = prev[documentId] || 0
        if (currentProgress >= 100) {
          clearInterval(uploadInterval)
          return prev
        }
        return { ...prev, [documentId]: currentProgress + 10 }
      })
    }, 200)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(uploadInterval)
      setUploadProgress((prev) => ({ ...prev, [documentId]: 100 }))

      // Start validation
      setValidationInProgress((prev) => [...prev, documentId])

      // Simulate validation
      setTimeout(() => {
        setValidationInProgress((prev) => prev.filter((id) => id !== documentId))
      }, 2000)
    }, 2000)
  }, [])

  const removeDocument = (documentId: string) => {
    // Remove uploaded file logic
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[documentId]
      return newProgress
    })
  }

  const validateDocument = async (documentId: string) => {
    setValidationInProgress((prev) => [...prev, documentId])

    // Simulate validation
    setTimeout(() => {
      setValidationInProgress((prev) => prev.filter((id) => id !== documentId))
    }, 2000)
  }

  const getOverallProgress = () => {
    const allDocuments = documentCategories.flatMap((cat) => cat.documents)
    const requiredDocuments = allDocuments.filter((doc) => doc.required)
    const uploadedRequired = requiredDocuments.filter((doc) => doc.uploaded)

    return requiredDocuments.length > 0 ? (uploadedRequired.length / requiredDocuments.length) * 100 : 0
  }

  const getValidationSummary = () => {
    const allDocuments = documentCategories.flatMap((cat) => cat.documents)
    const uploadedDocs = allDocuments.filter((doc) => doc.uploaded)
    const validDocs = uploadedDocs.filter((doc) => doc.validationStatus === "valid")
    const invalidDocs = uploadedDocs.filter((doc) => doc.validationStatus === "invalid")
    const pendingDocs = uploadedDocs.filter(
      (doc) => doc.validationStatus === "pending" || validationInProgress.includes(doc.id),
    )

    return {
      total: uploadedDocs.length,
      valid: validDocs.length,
      invalid: invalidDocs.length,
      pending: pendingDocs.length,
    }
  }

  const canProceed = () => {
    const requiredDocuments = documentCategories.flatMap((cat) => cat.documents).filter((doc) => doc.required)
    return requiredDocuments.every((doc) => doc.uploaded && doc.validationStatus === "valid")
  }

  const validationSummary = getValidationSummary()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Supporting Documentation</h2>
        <p className="text-gray-600 mt-2">
          Upload all required trade finance documents for verification and processing
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Required Documents</span>
                <span className="text-sm text-gray-600">{Math.round(getOverallProgress())}% Complete</span>
              </div>
              <Progress value={getOverallProgress()} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{validationSummary.total}</div>
                <div className="text-sm text-gray-600">Uploaded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{validationSummary.valid}</div>
                <div className="text-sm text-gray-600">Validated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{validationSummary.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{validationSummary.invalid}</div>
                <div className="text-sm text-gray-600">Invalid</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <Tabs defaultValue="invoice-docs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          {documentCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
              {category.required && <Badge className="bg-red-100 text-red-700 text-xs">Required</Badge>}
            </TabsTrigger>
          ))}
        </TabsList>

        {documentCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.name}
                  {category.required && <Badge className="bg-red-100 text-red-700">Required</Badge>}
                </CardTitle>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.documents.map((document) => (
                    <DocumentUploadCard
                      key={document.id}
                      document={document}
                      uploadProgress={uploadProgress[document.id]}
                      isValidating={validationInProgress.includes(document.id)}
                      onUpload={(files) => handleFileUpload(document.id, files)}
                      onRemove={() => removeDocument(document.id)}
                      onValidate={() => validateDocument(document.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Validation Alerts */}
      {validationSummary.invalid > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{validationSummary.invalid} document(s) failed validation.</strong> Please review and re-upload the
            corrected documents.
          </AlertDescription>
        </Alert>
      )}

      {validationSummary.pending > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />
          <AlertDescription className="text-yellow-800">
            <strong>{validationSummary.pending} document(s) are being validated.</strong> This process typically takes
            1-2 minutes.
          </AlertDescription>
        </Alert>
      )}

      {canProceed() && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>All required documents uploaded and validated!</strong> You can proceed to the next step.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700" disabled={!canProceed()}>
          Next: Review & Submit
        </Button>
      </div>
    </div>
  )
}

// Individual Document Upload Card Component
function DocumentUploadCard({
  document,
  uploadProgress,
  isValidating,
  onUpload,
  onRemove,
  onValidate,
}: {
  document: DocumentType
  uploadProgress?: number
  isValidating: boolean
  onUpload: (files: FileList) => void
  onRemove: () => void
  onValidate: () => void
}) {
  const getStatusIcon = () => {
    if (isValidating) {
      return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
    }

    if (document.validationStatus === "valid") {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }

    if (document.validationStatus === "invalid") {
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    }

    if (document.uploaded) {
      return <RefreshCw className="h-4 w-4 text-yellow-600" />
    }

    return null
  }

  const getStatusColor = () => {
    if (document.validationStatus === "valid") return "border-green-200 bg-green-50"
    if (document.validationStatus === "invalid") return "border-red-200 bg-red-50"
    if (document.uploaded || uploadProgress) return "border-blue-200 bg-blue-50"
    return "border-gray-200"
  }

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900">{document.name}</h4>
            {document.required && <Badge className="bg-red-100 text-red-700 text-xs">Required</Badge>}
            {getStatusIcon()}
          </div>
          <p className="text-sm text-gray-600 mb-2">{document.description}</p>
          <div className="text-xs text-gray-500">
            Formats: {document.formats.join(", ")} • Max size: {document.maxSize}MB
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress !== undefined && uploadProgress < 100 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Uploading...</span>
            <span className="text-sm text-gray-600">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Validation Status */}
      {isValidating && (
        <div className="mb-3 p-2 bg-blue-100 rounded text-sm text-blue-800">
          <RefreshCw className="h-3 w-3 inline mr-1 animate-spin" />
          Validating document...
        </div>
      )}

      {document.validationStatus === "invalid" && document.validationMessage && (
        <div className="mb-3 p-2 bg-red-100 rounded text-sm text-red-800">
          <AlertTriangle className="h-3 w-3 inline mr-1" />
          {document.validationMessage}
        </div>
      )}

      {document.validationStatus === "valid" && document.validationMessage && (
        <div className="mb-3 p-2 bg-green-100 rounded text-sm text-green-800">
          <CheckCircle className="h-3 w-3 inline mr-1" />
          {document.validationMessage}
        </div>
      )}

      {/* Uploaded File Info */}
      {document.uploaded && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium">{document.uploaded.name}</div>
                <div className="text-xs text-gray-500">
                  {document.uploaded.size}MB • Uploaded {new Date(document.uploaded.uploadDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onRemove}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Actions */}
      <div className="flex items-center gap-2">
        {!document.uploaded ? (
          <>
            <label className="flex-1">
              <input
                type="file"
                className="hidden"
                accept={document.formats.map((f) => `.${f.toLowerCase()}`).join(",")}
                onChange={(e) => e.target.files && onUpload(e.target.files)}
              />
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </span>
              </Button>
            </label>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex gap-2 w-full">
            <label className="flex-1">
              <input
                type="file"
                className="hidden"
                accept={document.formats.map((f) => `.${f.toLowerCase()}`).join(",")}
                onChange={(e) => e.target.files && onUpload(e.target.files)}
              />
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <span>
                  <Paperclip className="h-4 w-4 mr-2" />
                  Replace
                </span>
              </Button>
            </label>
            {document.validationStatus !== "valid" && (
              <Button variant="outline" onClick={onValidate} disabled={isValidating}>
                <RefreshCw className={`h-4 w-4 ${isValidating ? "animate-spin" : ""}`} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
