"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Building, User, Globe, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react"

interface CompanyProfileStepProps {
  onComplete: (data: any) => void
  onBack: () => void
  isAnimating?: boolean
}

export default function CompanyProfileStep({ onComplete, onBack, isAnimating }: CompanyProfileStepProps) {
  const [formData, setFormData] = useState({
    legalName: "",
    businessType: "",
    country: "",
    contactPersonName: "",
    contactPersonTitle: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    website: "",
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouchedFields((prev) => ({ ...prev, [field]: true }))

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "legalName":
        return value.length < 2 ? "Company name must be at least 2 characters" : ""
      case "contactPersonName":
        return value.length < 2 ? "Contact name must be at least 2 characters" : ""
      case "phoneNumber":
        return !/^\+?[\d\s\-$$$$]+$/.test(value) ? "Please enter a valid phone number" : ""
      case "website":
        return value && !/^https?:\/\/.+\..+/.test(value) ? "Please enter a valid website URL" : ""
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

    // Mark all required fields as touched
    const requiredFields = ["legalName", "businessType", "country", "contactPersonName", "phoneNumber"]
    const newTouchedFields = { ...touchedFields }
    requiredFields.forEach((field) => {
      newTouchedFields[field] = true
    })
    setTouchedFields(newTouchedFields)

    // Validate all fields
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

  const isFormValid = ["legalName", "businessType", "country", "contactPersonName", "phoneNumber"].every(
    (field) => formData[field as keyof typeof formData] && !validationErrors[field],
  )

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
                <p className="text-sm text-gray-600">Tell us about your business</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="legalName" className="text-gray-700 font-medium flex items-center gap-2">
                  Legal Company Name *{getFieldIcon("legalName")}
                </Label>
                <Input
                  id="legalName"
                  placeholder="ABC Trading Company Ltd."
                  value={formData.legalName}
                  onChange={(e) => handleInputChange("legalName", e.target.value)}
                  className={`h-12 transition-all duration-200 ${
                    validationErrors.legalName
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : touchedFields.legalName && formData.legalName
                        ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  required
                />
                {validationErrors.legalName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.legalName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-gray-700 font-medium flex items-center gap-2">
                  Business Type *{getFieldIcon("businessType")}
                </Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleInputChange("businessType", value)}
                >
                  <SelectTrigger
                    className={`h-12 transition-all duration-200 ${
                      validationErrors.businessType
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.businessType && formData.businessType
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">Limited Liability Company</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.businessType && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.businessType}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-700 font-medium flex items-center gap-2">
                  Country *{getFieldIcon("country")}
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger
                    className={`h-12 transition-all duration-200 ${
                      validationErrors.country
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.country && formData.country
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">🇺🇸 United States</SelectItem>
                    <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                    <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="de">🇩🇪 Germany</SelectItem>
                    <SelectItem value="fr">🇫🇷 France</SelectItem>
                    <SelectItem value="pk">🇵🇰 Pakistan</SelectItem>
                    <SelectItem value="in">🇮🇳 India</SelectItem>
                    <SelectItem value="other">🌍 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-700 font-medium flex items-center gap-2">
                  Website
                  {getFieldIcon("website")}
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className={`h-12 pl-10 transition-all duration-200 ${
                      validationErrors.website
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : touchedFields.website && formData.website
                          ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  />
                </div>
                {validationErrors.website && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.website}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Person Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Primary Contact</h3>
                <p className="text-sm text-gray-600">Who should we contact about your account?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPersonName" className="text-gray-700 font-medium flex items-center gap-2">
                  Full Name *{getFieldIcon("contactPersonName")}
                </Label>
                <Input
                  id="contactPersonName"
                  placeholder="John Doe"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                  className={`h-12 transition-all duration-200 ${
                    validationErrors.contactPersonName
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : touchedFields.contactPersonName && formData.contactPersonName
                        ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  required
                />
                {validationErrors.contactPersonName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.contactPersonName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPersonTitle" className="text-gray-700 font-medium">
                  Job Title
                </Label>
                <Input
                  id="contactPersonTitle"
                  placeholder="CEO, CFO, etc."
                  value={formData.contactPersonTitle}
                  onChange={(e) => handleInputChange("contactPersonTitle", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-700 font-medium flex items-center gap-2">
                Phone Number *{getFieldIcon("phoneNumber")}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={`h-12 pl-10 transition-all duration-200 ${
                    validationErrors.phoneNumber
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : touchedFields.phoneNumber && formData.phoneNumber
                        ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  required
                />
              </div>
              {validationErrors.phoneNumber && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* Business Address Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Business Address</h3>
                <p className="text-sm text-gray-600">Where is your business located?</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 font-medium">
                  Street Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="123 Business Street, Suite 100"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={2}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700 font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-gray-700 font-medium">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-gray-100">
            <Button
              type="submit"
              disabled={!isFormValid || isAnimating}
              className={`h-12 px-8 font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${
                isFormValid
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:scale-105 hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Financial Details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
