"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, ArrowLeft, CreditCard, Shield, Hash } from "lucide-react"

interface BankingInfoStepProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function BankingInfoStep({ onComplete, onBack }: BankingInfoStepProps) {
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    ibanCode: "",
    accountType: "",
    bankAddress: "",
    currency: "",
  })

  const [isAnimating, setIsAnimating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnimating(true)
    setTimeout(() => {
      onComplete(formData)
      setIsAnimating(false)
    }, 500)
  }

  const isFormValid = formData.bankName && formData.accountHolderName && formData.accountNumber && formData.accountType

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bank Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Bank Details</h3>
                <p className="text-sm text-gray-600">Secure payment information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-gray-700 font-medium">
                  Bank Name *
                </Label>
                <Input
                  id="bankName"
                  placeholder="Chase Bank, Wells Fargo, etc."
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType" className="text-gray-700 font-medium">
                  Account Type *
                </Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="business">Business Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolderName" className="text-gray-700 font-medium">
                Account Holder Name *
              </Label>
              <Input
                id="accountHolderName"
                placeholder="Exact name as it appears on bank account"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Account Information */}
          <div className="border-t pt-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <Hash className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Account Information</h3>
                <p className="text-sm text-gray-600">Enter your bank account details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-gray-700 font-medium">
                  Account Number *
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="1234567890"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routingNumber" className="text-gray-700 font-medium">
                  Routing Number
                </Label>
                <Input
                  id="routingNumber"
                  placeholder="021000021"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="swiftCode" className="text-gray-700 font-medium">
                  SWIFT/BIC Code
                </Label>
                <Input
                  id="swiftCode"
                  placeholder="CHASUS33"
                  value={formData.swiftCode}
                  onChange={(e) => handleInputChange("swiftCode", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ibanCode" className="text-gray-700 font-medium">
                  IBAN Code
                </Label>
                <Input
                  id="ibanCode"
                  placeholder="GB29 NWBK 6016 1331 9268 19"
                  value={formData.ibanCode}
                  onChange={(e) => handleInputChange("ibanCode", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-gray-700 font-medium">
                  Primary Currency
                </Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAddress" className="text-gray-700 font-medium">
                  Bank Address
                </Label>
                <Input
                  id="bankAddress"
                  placeholder="Bank's full address"
                  value={formData.bankAddress}
                  onChange={(e) => handleInputChange("bankAddress", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Security Notice:</strong> All banking information is encrypted and stored securely. This
              information will be used exclusively for fund disbursements and any errors may cause delays in processing
              your financing requests.
            </AlertDescription>
          </Alert>

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
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white hover:scale-105 hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Documents
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
