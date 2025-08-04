"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, CheckCircle, FileText, Building2, DollarSign, Send } from "lucide-react"

interface ReviewSubmissionStepProps {
  onComplete: (data: any) => void
  onBack: () => void
  isAnimating?: boolean
  formData?: any
}

export default function ReviewSubmissionStep({ onComplete, onBack, isAnimating, formData }: ReviewSubmissionStepProps) {
  const [confirmations, setConfirmations] = useState({
    accuracy: false,
    authorization: false,
    terms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirmationChange = (field: string, checked: boolean) => {
    setConfirmations((prev) => ({ ...prev, [field]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission process
    setTimeout(() => {
      onComplete({
        confirmations,
        submissionDate: new Date().toISOString(),
        status: "submitted",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const isFormValid = Object.values(confirmations).every(Boolean)

  const formatCurrency = (amount: string) => {
    const num = Number.parseFloat(amount)
    return isNaN(num) ? "" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPaymentTermsText = (terms: string) => {
    const termsMap: Record<string, string> = {
      "net-15": "Net 15 days",
      "net-30": "Net 30 days",
      "net-45": "Net 45 days",
      "net-60": "Net 60 days",
      "net-90": "Net 90 days",
    }
    return termsMap[terms] || terms
  }

  return (
    <Card className="border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-1 bg-orange-600"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              <Eye className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>
              <p className="text-sm text-gray-600">
                Please review all information before submitting your invoice for factoring
              </p>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Invoice Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Invoice Details</h4>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Invoice Number:</span>
                  <span className="font-semibold text-gray-900">{formData?.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Invoice Amount:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(formData?.invoiceAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Currency:</span>
                  <span className="font-semibold text-gray-900">{formData?.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Invoice Date:</span>
                  <span className="font-semibold text-gray-900">{formatDate(formData?.invoiceDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Due Date:</span>
                  <span className="font-semibold text-gray-900">{formatDate(formData?.dueDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Terms:</span>
                  <span className="font-semibold text-gray-900">{getPaymentTermsText(formData?.paymentTerms)}</span>
                </div>
                {formData?.poNumber && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">PO Number:</span>
                    <span className="font-semibold text-gray-900">{formData.poNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Buyer Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Buyer Information</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-600">Company Name:</span>
                  <div className="font-semibold text-gray-900">{formData?.buyerName}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Address:</span>
                  <div className="font-semibold text-gray-900">{formData?.buyerAddress}</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Country:</span>
                  <span className="font-semibold text-gray-900">{formData?.buyerCountry}</span>
                </div>
                {formData?.selectedBuyer && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Pre-approved Buyer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                        Credit: {formData.selectedBuyer.creditRating}
                      </Badge>
                      <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        {formData.selectedBuyer.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                )}
                {formData?.relationshipDuration && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Relationship:</span>
                    <span className="font-semibold text-gray-900">{formData.relationshipDuration}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Factoring Estimate */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-blue-900">Factoring Estimate</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-sm text-blue-700">Estimated Rate:</span>
                <div className="text-xl font-semibold text-blue-900">2.5% - 3.5%</div>
                <p className="text-xs text-blue-600">Per month</p>
              </div>
              <div>
                <span className="text-sm text-blue-700">Advance Amount (85%):</span>
                <div className="text-xl font-semibold text-blue-900">
                  {formatCurrency((Number.parseFloat(formData?.invoiceAmount || "0") * 0.85).toString())}
                </div>
                <p className="text-xs text-blue-600">Available immediately</p>
              </div>
              <div>
                <span className="text-sm text-blue-700">Reserve Amount (15%):</span>
                <div className="text-xl font-semibold text-blue-900">
                  {formatCurrency((Number.parseFloat(formData?.invoiceAmount || "0") * 0.15).toString())}
                </div>
                <p className="text-xs text-blue-600">Released upon collection</p>
              </div>
            </div>

            <Alert className="mt-4 border-blue-300 bg-blue-100">
              <AlertDescription className="text-blue-800">
                <strong>Note:</strong> Final rates and terms will be determined after credit review and document
                verification. This estimate is based on preliminary assessment.
              </AlertDescription>
            </Alert>
          </div>

          {/* Document Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Uploaded Documents</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData?.documents && Object.keys(formData.documents).length > 0 ? (
                Object.entries(formData.documents).map(([key, file]: [string, any]) => (
                  <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2">No documents uploaded</p>
              )}
            </div>
          </div>

          {/* Confirmations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Confirmations Required</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="accuracy"
                  checked={confirmations.accuracy}
                  onCheckedChange={(checked) => handleConfirmationChange("accuracy", checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="accuracy" className="text-sm font-medium text-gray-900">
                    Information Accuracy
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    I confirm that all information provided is accurate and complete to the best of my knowledge.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="authorization"
                  checked={confirmations.authorization}
                  onCheckedChange={(checked) => handleConfirmationChange("authorization", checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="authorization" className="text-sm font-medium text-gray-900">
                    Authorization to Factor
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    I have the authority to factor this invoice and assign payment rights to Safar Capital.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={confirmations.terms}
                  onCheckedChange={(checked) => handleConfirmationChange("terms", checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="terms" className="text-sm font-medium text-gray-900">
                    Terms and Conditions
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    I agree to the factoring terms and conditions, including fees, advance rates, and collection
                    procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Next Steps:</strong> After submission, our team will review your invoice within 2-4 business
              hours. You'll receive email notifications about the approval status and funding timeline.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between pt-8 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isAnimating || isSubmitting}
              className={`h-12 px-8 font-semibold rounded-lg shadow-sm transition-all duration-300 ${
                isFormValid && !isSubmitting
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Invoice...
                </>
              ) : (
                <>
                  Submit for Factoring
                  <Send className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
