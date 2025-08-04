"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, TrendingUp, Globe, Users, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"

interface FinancialDetailsStepProps {
  onComplete: (data: any) => void
  onBack: () => void
  isAnimating?: boolean
}

export default function FinancialDetailsStep({ onComplete, onBack, isAnimating }: FinancialDetailsStepProps) {
  const [formData, setFormData] = useState({
    annualRevenue: "",
    revenueRange: "",
    exportMarkets: "",
    majorClients: "",
    averageOrderValue: "",
    monthlyTransactionVolume: "",
    cashFlowCycle: "",
    businessYears: "",
    employeeCount: "",
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouchedFields((prev) => ({ ...prev, [field]: true }))

    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "exportMarkets":
        return value.length < 5 ? "Please provide more details about your export markets" : ""
      case "averageOrderValue":
        return value && isNaN(Number(value)) ? "Please enter a valid number" : ""
      case "monthlyTransactionVolume":
        return value && isNaN(Number(value)) ? "Please enter a valid number" : ""
      default:
        return ""
    }
  }

  useEffect(() => {
    const errors: Record<string, string> = {}
    Object.entries(formData).forEach(([field, value]) => {
      if (touchedFields[field]) {
        const error = validateField(field, value)
        if (error) errors[field] = error
      }
    })
    setValidationErrors(errors)
  }, [formData, touchedFields])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = ["revenueRange", "exportMarkets", "businessYears"]
    const newTouchedFields = { ...touchedFields }
    requiredFields.forEach((field) => {
      newTouchedFields[field] = true
    })
    setTouchedFields(newTouchedFields)

    const errors: Record<string, string> = {}
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = "This field is required"
      } else {
        const error = validateField(field, formData[field as keyof typeof formData])
        if (error) errors[field] = error
      }
    })

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    onComplete(formData)
  }

  const getFieldIcon = (field: string) => {
    if (touchedFields[field]) {
      return validationErrors[field] ? (
        <AlertCircle className="h-4 w-4 text-red-500" />
      ) : formData[field as keyof typeof formData] ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : null
    }
    return null
  }

  const isFormValid = ["revenueRange", "exportMarkets", "businessYears"].every(
    (field) => formData[field as keyof typeof formData] && !validationErrors[field],
  )

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Revenue Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Revenue & Growth</h3>
                <p className="text-sm text-gray-600">Help us understand your business size and growth</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="revenueRange" className="text-gray-700 font-medium flex items-center gap-2">
                  Annual Revenue Range *{getFieldIcon("revenueRange")}
                </Label>
                <Select
                  value={formData.revenueRange}
                  onValueChange={(value) => handleInputChange("revenueRange", value)}
                >
                  <SelectTrigger
                    className={`h-12 transition-all duration-200 ${
                      validationErrors.revenueRange
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.revenueRange && formData.revenueRange
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">💰 Under $100,000</SelectItem>
                    <SelectItem value="100k-500k">💰 $100,000 - $500,000</SelectItem>
                    <SelectItem value="500k-1m">💰 $500,000 - $1,000,000</SelectItem>
                    <SelectItem value="1m-5m">💰 $1,000,000 - $5,000,000</SelectItem>
                    <SelectItem value="5m-10m">💰 $5,000,000 - $10,000,000</SelectItem>
                    <SelectItem value="over-10m">💰 Over $10,000,000</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.revenueRange && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.revenueRange}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessYears" className="text-gray-700 font-medium flex items-center gap-2">
                  Years in Business *{getFieldIcon("businessYears")}
                </Label>
                <Select
                  value={formData.businessYears}
                  onValueChange={(value) => handleInputChange("businessYears", value)}
                >
                  <SelectTrigger
                    className={`h-12 transition-all duration-200 ${
                      validationErrors.businessYears
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.businessYears && formData.businessYears
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1">🌱 Less than 1 year</SelectItem>
                    <SelectItem value="1-2">🌿 1-2 years</SelectItem>
                    <SelectItem value="3-5">🌳 3-5 years</SelectItem>
                    <SelectItem value="6-10">🏢 6-10 years</SelectItem>
                    <SelectItem value="over-10">🏛️ Over 10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="averageOrderValue" className="text-gray-700 font-medium flex items-center gap-2">
                  Average Order Value
                  {getFieldIcon("averageOrderValue")}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="averageOrderValue"
                    type="number"
                    placeholder="50,000"
                    value={formData.averageOrderValue}
                    onChange={(e) => handleInputChange("averageOrderValue", e.target.value)}
                    className={`h-12 pl-10 transition-all duration-200 ${
                      validationErrors.averageOrderValue
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.averageOrderValue && formData.averageOrderValue
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {validationErrors.averageOrderValue && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.averageOrderValue}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyTransactionVolume" className="text-gray-700 font-medium flex items-center gap-2">
                  Monthly Transaction Volume
                  {getFieldIcon("monthlyTransactionVolume")}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="monthlyTransactionVolume"
                    type="number"
                    placeholder="500,000"
                    value={formData.monthlyTransactionVolume}
                    onChange={(e) => handleInputChange("monthlyTransactionVolume", e.target.value)}
                    className={`h-12 pl-10 transition-all duration-200 ${
                      validationErrors.monthlyTransactionVolume
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.monthlyTransactionVolume && formData.monthlyTransactionVolume
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Market Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Market Presence</h3>
                <p className="text-sm text-gray-600">Where do you do business?</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="exportMarkets" className="text-gray-700 font-medium flex items-center gap-2">
                  Primary Export Markets *{getFieldIcon("exportMarkets")}
                </Label>
                <Textarea
                  id="exportMarkets"
                  placeholder="List the main countries/regions you export to (e.g., USA, Canada, Europe, Middle East)"
                  value={formData.exportMarkets}
                  onChange={(e) => handleInputChange("exportMarkets", e.target.value)}
                  rows={3}
                  className={`transition-all duration-200 ${
                    validationErrors.exportMarkets
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : touchedFields.exportMarkets && formData.exportMarkets
                        ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  required
                />
                {validationErrors.exportMarkets && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.exportMarkets}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="majorClients" className="text-gray-700 font-medium">
                  Major Clients/Buyers
                </Label>
                <Textarea
                  id="majorClients"
                  placeholder="List your top 3-5 clients or buyer companies (optional)"
                  value={formData.majorClients}
                  onChange={(e) => handleInputChange("majorClients", e.target.value)}
                  rows={3}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
                <p className="text-xs text-gray-500">This information helps us understand your customer base</p>
              </div>
            </div>
          </div>

          {/* Business Operations */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Operations</h3>
                <p className="text-sm text-gray-600">Tell us about your business operations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cashFlowCycle" className="text-gray-700 font-medium">
                  Cash Flow Cycle (Days)
                </Label>
                <Select
                  value={formData.cashFlowCycle}
                  onValueChange={(value) => handleInputChange("cashFlowCycle", value)}
                >
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                    <SelectValue placeholder="Select cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">⚡ 30 days</SelectItem>
                    <SelectItem value="60">📅 60 days</SelectItem>
                    <SelectItem value="90">📊 90 days</SelectItem>
                    <SelectItem value="120">⏰ 120 days</SelectItem>
                    <SelectItem value="over-120">⏳ Over 120 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCount" className="text-gray-700 font-medium">
                  Number of Employees
                </Label>
                <Select
                  value={formData.employeeCount}
                  onValueChange={(value) => handleInputChange("employeeCount", value)}
                >
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">👥 1-10</SelectItem>
                    <SelectItem value="11-50">👥 11-50</SelectItem>
                    <SelectItem value="51-100">👥 51-100</SelectItem>
                    <SelectItem value="101-500">👥 101-500</SelectItem>
                    <SelectItem value="over-500">👥 Over 500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-8 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-12 px-6 border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isAnimating}
              className={`h-12 px-8 font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${
                isFormValid
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Banking Info
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
