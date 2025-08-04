"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Upload, FileText, CheckCircle, X, AlertCircle } from "lucide-react"

interface DocumentUploadStepProps {
  onComplete: (data: any) => void
  onBack: () => void
}

interface Document {
  id: string
  name: string
  description: string
  required: boolean
  uploaded: boolean
  file?: File
}

export default function DocumentUploadStep({ onComplete, onBack }: DocumentUploadStepProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "business-registration",
      name: "Business Registration Certificate",
      description: "Official business registration document",
      required: true,
      uploaded: false,
    },
    {
      id: "tax-documents",
      name: "Tax Registration Documents",
      description: "Tax ID and registration certificates",
      required: true,
      uploaded: false,
    },
    {
      id: "bank-statements",
      name: "Bank Statements (Last 6 months)",
      description: "Recent bank statements showing transaction history",
      required: true,
      uploaded: false,
    },
    {
      id: "financial-statements",
      name: "Financial Statements",
      description: "Profit & loss, balance sheet, cash flow statements",
      required: true,
      uploaded: false,
    },
    {
      id: "export-license",
      name: "Export License",
      description: "Export/import license if applicable",
      required: false,
      uploaded: false,
    },
    {
      id: "trade-license",
      name: "Trade License",
      description: "Trade or professional license",
      required: false,
      uploaded: false,
    },
  ])

  const [isAnimating, setIsAnimating] = useState(false)

  const handleFileUpload = (documentId: string, file: File) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === documentId ? { ...doc, uploaded: true, file } : doc)))
  }

  const handleFileRemove = (documentId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === documentId ? { ...doc, uploaded: false, file: undefined } : doc)),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const uploadedFiles = documents.reduce(
      (acc, doc) => {
        if (doc.file) {
          acc[doc.id] = doc.file
        }
        return acc
      },
      {} as Record<string, File>,
    )

    onComplete({ documents: uploadedFiles })
  }

  const requiredDocuments = documents.filter((doc) => doc.required)
  const requiredUploaded = requiredDocuments.filter((doc) => doc.uploaded).length
  const totalUploaded = documents.filter((doc) => doc.uploaded).length
  const isFormValid = requiredUploaded === requiredDocuments.length
  const uploadProgress = (requiredUploaded / requiredDocuments.length) * 100

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Please upload clear, legible copies of all required documents. Accepted formats: PDF, JPG, PNG (Max 10MB
              per file)
            </AlertDescription>
          </Alert>

          {/* Progress Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload Progress</h3>
              <div className="text-sm font-medium text-blue-600">
                {requiredUploaded}/{requiredDocuments.length} required documents
              </div>
            </div>
            <Progress value={uploadProgress} className="h-3 bg-white/50" />
            <div className="mt-2 text-sm text-gray-600">
              {totalUploaded} of {documents.length} total documents uploaded
            </div>
          </div>

          {/* Document Upload Grid */}
          <div className="grid gap-6">
            {documents.map((document) => (
              <div
                key={document.id}
                className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                        document.uploaded
                          ? "bg-green-100 text-green-600"
                          : document.required
                            ? "bg-red-50 text-red-500"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {document.uploaded ? <CheckCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{document.name}</h4>
                        {document.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{document.description}</p>
                    </div>
                  </div>

                  {document.uploaded && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileRemove(document.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {!document.uploaded ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mb-4">PDF, JPG, PNG up to 10MB</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            alert("File size must be less than 10MB")
                            return
                          }
                          handleFileUpload(document.id, file)
                        }
                      }}
                      className="hidden"
                      id={`file-${document.id}`}
                    />
                    <label
                      htmlFor={`file-${document.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </label>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">{document.file?.name}</p>
                        <p className="text-xs text-green-600">
                          {document.file && (document.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        Uploaded
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-8 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-12 px-6 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isAnimating}
              className={`h-12 px-8 font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${
                isFormValid
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white hover:scale-105 hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Verification
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
