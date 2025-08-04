"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building2, User, DollarSign, FileText, Save, X, TrendingUp, CreditCard } from "lucide-react"

interface ManualApplicationFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function ManualApplicationForm({ open, onOpenChange, onSubmit }: ManualApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    businessType: "",
    industry: "",
    taxId: "",
    website: "",
    businessDescription: "",
    yearsInBusiness: "",
    employeeCount: "",
    annualRevenue: "",

    // Contact Information
    contactPerson: "",
    title: "",
    email: "",
    phone: "",
    address: "",

    // Financial Information
    requestedLimit: "",
    averageOrderValue: "",
    monthlyTransactionVolume: "",
    primaryExportMarkets: "",
    majorClients: "",

    // Operations Information
    cashFlowCycle: "",
    numberOfEmployees: "",

    // Banking Information
    bankName: "",
    accountType: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    swiftBicCode: "",
    ibanCode: "",
    primaryCurrency: "",
    bankAddress: "",

    // Additional Information
    priority: "medium",
    notes: "",
  })

  const steps = [
    { id: "company", title: "Company Info", icon: Building2 },
    { id: "contact", title: "Contact Info", icon: User },
    { id: "financial", title: "Financial Info", icon: DollarSign },
    { id: "operations", title: "Operations", icon: TrendingUp },
    { id: "banking", title: "Banking Info", icon: CreditCard },
    { id: "review", title: "Review", icon: FileText },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const applicationData = {
      ...formData,
      id: `APP-${Date.now()}`,
      submissionDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: "pending",
      completionScore: 100,
      riskScore: 70,
      creditRating: "B+",
      documentsComplete: 0,
      totalDocuments: 5,
      riskLevel: "medium",
      source: "manual",
    }

    onSubmit(applicationData)
    onOpenChange(false)

    // Reset form
    setFormData({
      companyName: "",
      businessType: "",
      industry: "",
      taxId: "",
      website: "",
      businessDescription: "",
      yearsInBusiness: "",
      employeeCount: "",
      annualRevenue: "",
      contactPerson: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      requestedLimit: "",
      averageOrderValue: "",
      monthlyTransactionVolume: "",
      primaryExportMarkets: "",
      majorClients: "",
      cashFlowCycle: "",
      numberOfEmployees: "",
      bankName: "",
      accountType: "",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      swiftBicCode: "",
      ibanCode: "",
      primaryCurrency: "",
      bankAddress: "",
      priority: "medium",
      notes: "",
    })
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Company Info
        return formData.companyName && formData.businessType && formData.industry && formData.taxId
      case 1: // Contact Info
        return formData.contactPerson && formData.email && formData.phone
      case 2: // Financial Info
        return formData.requestedLimit && formData.annualRevenue && formData.averageOrderValue
      case 3: // Operations
        return formData.cashFlowCycle && formData.numberOfEmployees
      case 4: // Banking Info
        return formData.bankName && formData.accountType && formData.accountHolderName && formData.accountNumber
      default:
        return true
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Create Manual Application
          </DialogTitle>
          <DialogDescription>
            Create a new seller application manually for existing clients or special cases.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStep ? "bg-red-600 border-red-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="ml-2">
                  <div className={`text-sm font-medium ${index <= currentStep ? "text-red-600" : "text-gray-400"}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px mx-3 ${index < currentStep ? "bg-red-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Enter company legal name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => handleInputChange("businessType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="textiles">Textiles & Apparel</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="food_beverage">Food & Beverage</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="taxId">Tax ID *</Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                        placeholder="XX-XXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness">Years in Business</Label>
                      <Input
                        id="yearsInBusiness"
                        type="number"
                        value={formData.yearsInBusiness}
                        onChange={(e) => handleInputChange("yearsInBusiness", e.target.value)}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeCount">Employee Count</Label>
                      <Input
                        id="employeeCount"
                        type="number"
                        value={formData.employeeCount}
                        onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                      <Input
                        id="annualRevenue"
                        type="number"
                        value={formData.annualRevenue}
                        onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                        placeholder="1000000"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="businessDescription">Business Description</Label>
                    <Textarea
                      id="businessDescription"
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                      placeholder="Describe the company's business activities..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="CEO, CFO, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Business St, Suite 100, City, State 12345"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="requestedLimit">Requested Credit Limit *</Label>
                      <Input
                        id="requestedLimit"
                        type="number"
                        value={formData.requestedLimit}
                        onChange={(e) => handleInputChange("requestedLimit", e.target.value)}
                        placeholder="500000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="averageOrderValue">Average Order Value *</Label>
                      <Input
                        id="averageOrderValue"
                        type="number"
                        value={formData.averageOrderValue}
                        onChange={(e) => handleInputChange("averageOrderValue", e.target.value)}
                        placeholder="25000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyTransactionVolume">Monthly Transaction Volume</Label>
                      <Input
                        id="monthlyTransactionVolume"
                        type="number"
                        value={formData.monthlyTransactionVolume}
                        onChange={(e) => handleInputChange("monthlyTransactionVolume", e.target.value)}
                        placeholder="150000"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Market Presence</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="primaryExportMarkets">Primary Export Markets</Label>
                        <Textarea
                          id="primaryExportMarkets"
                          value={formData.primaryExportMarkets}
                          onChange={(e) => handleInputChange("primaryExportMarkets", e.target.value)}
                          placeholder="e.g., United States, European Union, Canada, Australia..."
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="majorClients">Major Clients/Buyers</Label>
                        <Textarea
                          id="majorClients"
                          value={formData.majorClients}
                          onChange={(e) => handleInputChange("majorClients", e.target.value)}
                          placeholder="List major clients or buyer companies..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Operations Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cashFlowCycle">Cash Flow Cycle (Days) *</Label>
                      <Select
                        value={formData.cashFlowCycle}
                        onValueChange={(value) => handleInputChange("cashFlowCycle", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select cash flow cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="120">120 days</SelectItem>
                          <SelectItem value="120+">Over 120 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="numberOfEmployees">Number of Employees *</Label>
                      <Input
                        id="numberOfEmployees"
                        type="number"
                        value={formData.numberOfEmployees}
                        onChange={(e) => handleInputChange("numberOfEmployees", e.target.value)}
                        placeholder="50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Banking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                        placeholder="Chase Bank"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountType">Account Type *</Label>
                      <Select
                        value={formData.accountType}
                        onValueChange={(value) => handleInputChange("accountType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business_checking">Business Checking</SelectItem>
                          <SelectItem value="business_savings">Business Savings</SelectItem>
                          <SelectItem value="money_market">Money Market</SelectItem>
                          <SelectItem value="current_account">Current Account</SelectItem>
                          <SelectItem value="trade_finance">Trade Finance Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                      <Input
                        id="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                        placeholder="Company Legal Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                        placeholder="1234567890"
                      />
                    </div>
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        value={formData.routingNumber}
                        onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                        placeholder="021000021"
                      />
                    </div>
                    <div>
                      <Label htmlFor="swiftBicCode">SWIFT/BIC Code</Label>
                      <Input
                        id="swiftBicCode"
                        value={formData.swiftBicCode}
                        onChange={(e) => handleInputChange("swiftBicCode", e.target.value)}
                        placeholder="CHASUS33"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ibanCode">IBAN Code</Label>
                      <Input
                        id="ibanCode"
                        value={formData.ibanCode}
                        onChange={(e) => handleInputChange("ibanCode", e.target.value)}
                        placeholder="GB29 NWBK 6016 1331 9268 19"
                      />
                    </div>
                    <div>
                      <Label htmlFor="primaryCurrency">Primary Currency</Label>
                      <Select
                        value={formData.primaryCurrency}
                        onValueChange={(value) => handleInputChange("primaryCurrency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                          <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                          <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bankAddress">Bank Address</Label>
                    <Textarea
                      id="bankAddress"
                      value={formData.bankAddress}
                      onChange={(e) => handleInputChange("bankAddress", e.target.value)}
                      placeholder="Bank's full address including city, state, and postal code"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Review Application
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Company Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span> {formData.companyName}
                          </div>
                          <div>
                            <span className="text-gray-600">Type:</span> {formData.businessType}
                          </div>
                          <div>
                            <span className="text-gray-600">Industry:</span> {formData.industry}
                          </div>
                          <div>
                            <span className="text-gray-600">Tax ID:</span> {formData.taxId}
                          </div>
                          {formData.website && (
                            <div>
                              <span className="text-gray-600">Website:</span> {formData.website}
                            </div>
                          )}
                          {formData.yearsInBusiness && (
                            <div>
                              <span className="text-gray-600">Years in Business:</span> {formData.yearsInBusiness}
                            </div>
                          )}
                          {formData.employeeCount && (
                            <div>
                              <span className="text-gray-600">Employees:</span> {formData.employeeCount}
                            </div>
                          )}
                          {formData.annualRevenue && (
                            <div>
                              <span className="text-gray-600">Annual Revenue:</span> $
                              {Number.parseInt(formData.annualRevenue).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Contact:</span> {formData.contactPerson}
                          </div>
                          {formData.title && (
                            <div>
                              <span className="text-gray-600">Title:</span> {formData.title}
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Email:</span> {formData.email}
                          </div>
                          <div>
                            <span className="text-gray-600">Phone:</span> {formData.phone}
                          </div>
                          {formData.address && (
                            <div>
                              <span className="text-gray-600">Address:</span> {formData.address}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Operations</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Cash Flow Cycle:</span> {formData.cashFlowCycle} days
                          </div>
                          <div>
                            <span className="text-gray-600">Number of Employees:</span> {formData.numberOfEmployees}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Financial Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Requested Limit:</span> $
                            {Number.parseInt(formData.requestedLimit || "0").toLocaleString()}
                          </div>
                          <div>
                            <span className="text-gray-600">Average Order Value:</span> $
                            {Number.parseInt(formData.averageOrderValue || "0").toLocaleString()}
                          </div>
                          {formData.monthlyTransactionVolume && (
                            <div>
                              <span className="text-gray-600">Monthly Transaction Volume:</span> $
                              {Number.parseInt(formData.monthlyTransactionVolume).toLocaleString()}
                            </div>
                          )}
                          {formData.primaryExportMarkets && (
                            <div>
                              <span className="text-gray-600">Primary Export Markets:</span>{" "}
                              {formData.primaryExportMarkets}
                            </div>
                          )}
                          {formData.majorClients && (
                            <div>
                              <span className="text-gray-600">Major Clients:</span> {formData.majorClients}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Banking Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Bank:</span> {formData.bankName}
                          </div>
                          <div>
                            <span className="text-gray-600">Account Type:</span> {formData.accountType}
                          </div>
                          <div>
                            <span className="text-gray-600">Account Holder:</span> {formData.accountHolderName}
                          </div>
                          <div>
                            <span className="text-gray-600">Account Number:</span> ****
                            {formData.accountNumber.slice(-4)}
                          </div>
                          {formData.routingNumber && (
                            <div>
                              <span className="text-gray-600">Routing Number:</span> {formData.routingNumber}
                            </div>
                          )}
                          {formData.swiftBicCode && (
                            <div>
                              <span className="text-gray-600">SWIFT/BIC:</span> {formData.swiftBicCode}
                            </div>
                          )}
                          {formData.primaryCurrency && (
                            <div>
                              <span className="text-gray-600">Primary Currency:</span> {formData.primaryCurrency}
                            </div>
                          )}
                        </div>
                      </div>

                      {formData.businessDescription && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Business Description</h4>
                          <p className="text-sm text-gray-600">{formData.businessDescription}</p>
                        </div>
                      )}

                      {formData.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Additional Notes</h4>
                          <p className="text-sm text-gray-600">{formData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} disabled={!isStepValid(currentStep)} className="bg-red-600 hover:bg-red-700">
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Create Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
