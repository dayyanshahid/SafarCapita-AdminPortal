"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, ArrowLeft, Building2, Search, CheckCircle, AlertTriangle, Shield, Globe } from "lucide-react"

interface BuyerVerificationStepProps {
  onComplete: (data: any) => void
  onBack: () => void
  isAnimating?: boolean
  formData?: any
}

// Mock buyer database
const mockBuyerDatabase = [
  {
    id: "1",
    name: "TechCorp Inc.",
    address: "123 Tech Street, San Francisco, CA 94105",
    country: "United States",
    creditRating: "A+",
    paymentHistory: "Excellent",
    riskLevel: "Low",
    approved: true,
    daysToPayAvg: 28,
    totalTransactions: 45,
  },
  {
    id: "2",
    name: "Global Trade Ltd.",
    address: "456 Commerce Ave, New York, NY 10001",
    country: "United States",
    creditRating: "A",
    paymentHistory: "Good",
    riskLevel: "Low",
    approved: true,
    daysToPayAvg: 32,
    totalTransactions: 23,
  },
  {
    id: "3",
    name: "MegaCorp Solutions",
    address: "789 Business Blvd, Chicago, IL 60601",
    country: "United States",
    creditRating: "A-",
    paymentHistory: "Good",
    riskLevel: "Medium",
    approved: true,
    daysToPayAvg: 35,
    totalTransactions: 67,
  },
]

export default function BuyerVerificationStep({
  onComplete,
  onBack,
  isAnimating,
  formData,
}: BuyerVerificationStepProps) {
  const [buyerData, setBuyerData] = useState({
    buyerName: formData?.buyerName || "",
    buyerAddress: formData?.buyerAddress || "",
    buyerCountry: formData?.buyerCountry || "",
    buyerEmail: formData?.buyerEmail || "",
    buyerPhone: formData?.buyerPhone || "",
    relationshipDuration: formData?.relationshipDuration || "",
    previousTransactions: formData?.previousTransactions || "",
    selectedBuyer: formData?.selectedBuyer || null,
  })

  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [creditCheckStatus, setCreditCheckStatus] = useState<"pending" | "approved" | "rejected" | null>(null)
  const [showManualEntry, setShowManualEntry] = useState(false)

  const handleBuyerSearch = async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const results = mockBuyerDatabase.filter((buyer) => buyer.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleBuyerSelect = (buyer: any) => {
    setBuyerData((prev) => ({
      ...prev,
      buyerName: buyer.name,
      buyerAddress: buyer.address,
      buyerCountry: buyer.country,
      selectedBuyer: buyer,
    }))
    setSearchResults([])
    setCreditCheckStatus("approved")
  }

  const handleManualEntry = () => {
    setShowManualEntry(true)
    setBuyerData((prev) => ({ ...prev, selectedBuyer: null }))
    setCreditCheckStatus(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setBuyerData((prev) => ({ ...prev, [field]: value }))

    if (field === "buyerName" && !showManualEntry) {
      handleBuyerSearch(value)
    }
  }

  const runCreditCheck = async () => {
    setCreditCheckStatus("pending")
    // Simulate credit check
    setTimeout(() => {
      setCreditCheckStatus("approved")
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(buyerData)
  }

  const isFormValid =
    buyerData.buyerName &&
    buyerData.buyerAddress &&
    buyerData.buyerCountry &&
    (buyerData.selectedBuyer || creditCheckStatus === "approved")

  const getCreditRatingColor = (rating: string) => {
    if (rating.startsWith("A")) return "text-green-600 bg-green-50 border-green-200"
    if (rating.startsWith("B")) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getRiskLevelColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <Card className="border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-1 bg-green-600"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Buyer Search Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Buyer Information</h3>
                <p className="text-sm text-gray-600">Search for existing buyer or add new buyer details</p>
              </div>
            </div>

            {!showManualEntry ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyerSearch" className="text-gray-700 font-medium">
                    Search Buyer Database
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="buyerSearch"
                      placeholder="Start typing buyer name..."
                      value={buyerData.buyerName}
                      onChange={(e) => handleInputChange("buyerName", e.target.value)}
                      className="h-12 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {isSearching && <p className="text-sm text-gray-500">Searching buyer database...</p>}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                    {searchResults.map((buyer) => (
                      <div
                        key={buyer.id}
                        onClick={() => handleBuyerSelect(buyer)}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{buyer.name}</h4>
                            <p className="text-sm text-gray-600">{buyer.address}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={`text-xs ${getCreditRatingColor(buyer.creditRating)}`}>
                                {buyer.creditRating}
                              </Badge>
                              <Badge className={`text-xs ${getRiskLevelColor(buyer.riskLevel)}`}>
                                {buyer.riskLevel} Risk
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Avg. Payment: {buyer.daysToPayAvg} days</p>
                            <p className="text-xs text-gray-500">{buyer.totalTransactions} transactions</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleManualEntry}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Can't find buyer? Add manually
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="buyerName" className="text-gray-700 font-medium">
                      Buyer Company Name *
                    </Label>
                    <Input
                      id="buyerName"
                      placeholder="Company Name Ltd."
                      value={buyerData.buyerName}
                      onChange={(e) => handleInputChange("buyerName", e.target.value)}
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyerCountry" className="text-gray-700 font-medium">
                      Country *
                    </Label>
                    <Select
                      value={buyerData.buyerCountry}
                      onValueChange={(value) => handleInputChange("buyerCountry", value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">🇺🇸 United States</SelectItem>
                        <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                        <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                        <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                        <SelectItem value="FR">🇫🇷 France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyerAddress" className="text-gray-700 font-medium">
                    Buyer Address *
                  </Label>
                  <Input
                    id="buyerAddress"
                    placeholder="Full business address"
                    value={buyerData.buyerAddress}
                    onChange={(e) => handleInputChange("buyerAddress", e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="buyerEmail" className="text-gray-700 font-medium">
                      Contact Email
                    </Label>
                    <Input
                      id="buyerEmail"
                      type="email"
                      placeholder="contact@buyer.com"
                      value={buyerData.buyerEmail}
                      onChange={(e) => handleInputChange("buyerEmail", e.target.value)}
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyerPhone" className="text-gray-700 font-medium">
                      Contact Phone
                    </Label>
                    <Input
                      id="buyerPhone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={buyerData.buyerPhone}
                      onChange={(e) => handleInputChange("buyerPhone", e.target.value)}
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {buyerData.buyerName && buyerData.buyerCountry && !creditCheckStatus && (
                  <div className="text-center">
                    <Button type="button" onClick={runCreditCheck} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Shield className="h-4 w-4 mr-2" />
                      Run Credit Check
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Buyer Information */}
          {buyerData.selectedBuyer && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h4 className="font-semibold text-green-900">Approved Buyer Selected</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">{buyerData.selectedBuyer.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{buyerData.selectedBuyer.address}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getCreditRatingColor(buyerData.selectedBuyer.creditRating)}`}>
                      Credit: {buyerData.selectedBuyer.creditRating}
                    </Badge>
                    <Badge className={`text-xs ${getRiskLevelColor(buyerData.selectedBuyer.riskLevel)}`}>
                      {buyerData.selectedBuyer.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment History:</span>
                    <span className="font-medium text-gray-900">{buyerData.selectedBuyer.paymentHistory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Payment Time:</span>
                    <span className="font-medium text-gray-900">{buyerData.selectedBuyer.daysToPayAvg} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Transactions:</span>
                    <span className="font-medium text-gray-900">{buyerData.selectedBuyer.totalTransactions}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Credit Check Status */}
          {creditCheckStatus === "pending" && (
            <Alert className="border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Running credit check on {buyerData.buyerName}. This may take a few moments...
              </AlertDescription>
            </Alert>
          )}

          {creditCheckStatus === "approved" && !buyerData.selectedBuyer && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Credit check completed successfully. {buyerData.buyerName} has been approved for factoring.
              </AlertDescription>
            </Alert>
          )}

          {creditCheckStatus === "rejected" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Credit check failed. This buyer does not meet our credit requirements for factoring.
              </AlertDescription>
            </Alert>
          )}

          {/* Relationship Information */}
          {(buyerData.selectedBuyer || creditCheckStatus === "approved") && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Business Relationship</h3>
                  <p className="text-sm text-gray-600">Information about your relationship with this buyer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="relationshipDuration" className="text-gray-700 font-medium">
                    Relationship Duration
                  </Label>
                  <Select
                    value={buyerData.relationshipDuration}
                    onValueChange={(value) => handleInputChange("relationshipDuration", value)}
                  >
                    <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New customer (first transaction)</SelectItem>
                      <SelectItem value="6months">6 months or less</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="2years">2 years</SelectItem>
                      <SelectItem value="3years">3+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousTransactions" className="text-gray-700 font-medium">
                    Previous Transactions
                  </Label>
                  <Select
                    value={buyerData.previousTransactions}
                    onValueChange={(value) => handleInputChange("previousTransactions", value)}
                  >
                    <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No previous transactions</SelectItem>
                      <SelectItem value="1-5">1-5 transactions</SelectItem>
                      <SelectItem value="6-20">6-20 transactions</SelectItem>
                      <SelectItem value="21-50">21-50 transactions</SelectItem>
                      <SelectItem value="50+">50+ transactions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

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
              disabled={!isFormValid || isAnimating}
              className={`h-12 px-8 font-semibold rounded-lg shadow-sm transition-all duration-300 ${
                isFormValid
                  ? "bg-green-600 hover:bg-green-700 text-white"
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
