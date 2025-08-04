"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Filter, X, RotateCcw, Search } from "lucide-react"

interface AdvancedFiltersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filters: any) => void
  activeFilters: any
}

export function AdvancedFilters({ open, onOpenChange, onApplyFilters, activeFilters }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState({
    // Status filters
    status: activeFilters.status || [],
    priority: activeFilters.priority || [],

    // Date filters
    submissionDateRange: activeFilters.submissionDateRange || null,
    lastUpdatedRange: activeFilters.lastUpdatedRange || null,

    // Financial filters
    revenueRange: activeFilters.revenueRange || [0, 10000000],
    requestedLimitRange: activeFilters.requestedLimitRange || [0, 2000000],
    averageOrderValueRange: activeFilters.averageOrderValueRange || [0, 500000],

    // Company filters
    industry: activeFilters.industry || [],
    businessType: activeFilters.businessType || [],
    yearsInBusinessRange: activeFilters.yearsInBusinessRange || [0, 50],
    employeeCountRange: activeFilters.employeeCountRange || [1, 1000],

    // Risk filters
    riskScore: activeFilters.riskScore || [0, 100],
    creditRating: activeFilters.creditRating || [],
    completionScore: activeFilters.completionScore || [0, 100],

    // Operations filters
    cashFlowCycle: activeFilters.cashFlowCycle || [],
    primaryCurrency: activeFilters.primaryCurrency || [],

    // Document filters
    documentStatus: activeFilters.documentStatus || [],

    // Search filters
    companyName: activeFilters.companyName || "",
    contactPerson: activeFilters.contactPerson || "",
    email: activeFilters.email || "",
  })

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "under_review", label: "Under Review" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "incomplete", label: "Incomplete" },
  ]

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]

  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "construction", label: "Construction" },
    { value: "transportation", label: "Transportation" },
    { value: "textiles", label: "Textiles & Apparel" },
    { value: "agriculture", label: "Agriculture" },
    { value: "automotive", label: "Automotive" },
    { value: "electronics", label: "Electronics" },
    { value: "food_beverage", label: "Food & Beverage" },
    { value: "other", label: "Other" },
  ]

  const businessTypeOptions = [
    { value: "corporation", label: "Corporation" },
    { value: "llc", label: "LLC" },
    { value: "partnership", label: "Partnership" },
    { value: "sole_proprietorship", label: "Sole Proprietorship" },
  ]

  const creditRatingOptions = [
    { value: "A+", label: "A+" },
    { value: "A", label: "A" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B", label: "B" },
    { value: "B-", label: "B-" },
    { value: "C+", label: "C+" },
    { value: "C", label: "C" },
    { value: "C-", label: "C-" },
    { value: "D", label: "D" },
  ]

  const cashFlowCycleOptions = [
    { value: "30", label: "30 days" },
    { value: "60", label: "60 days" },
    { value: "90", label: "90 days" },
    { value: "120", label: "120 days" },
    { value: "120+", label: "Over 120 days" },
  ]

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CHF", label: "CHF - Swiss Franc" },
    { value: "CNY", label: "CNY - Chinese Yuan" },
  ]

  const documentStatusOptions = [
    { value: "all_complete", label: "All Documents Complete" },
    { value: "missing_documents", label: "Missing Documents" },
    { value: "pending_review", label: "Pending Document Review" },
  ]

  const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item: string) => item !== value),
    }))
  }

  const handleSliderChange = (field: string, value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDateRangeChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: [],
      priority: [],
      submissionDateRange: null,
      lastUpdatedRange: null,
      revenueRange: [0, 10000000],
      requestedLimitRange: [0, 2000000],
      averageOrderValueRange: [0, 500000],
      industry: [],
      businessType: [],
      yearsInBusinessRange: [0, 50],
      employeeCountRange: [1, 1000],
      riskScore: [0, 100],
      creditRating: [],
      completionScore: [0, 100],
      cashFlowCycle: [],
      primaryCurrency: [],
      documentStatus: [],
      companyName: "",
      contactPerson: "",
      email: "",
    })
  }

  const applyFilters = () => {
    onApplyFilters(filters)
    onOpenChange(false)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.status.length > 0) count++
    if (filters.priority.length > 0) count++
    if (filters.submissionDateRange) count++
    if (filters.lastUpdatedRange) count++
    if (filters.revenueRange[0] > 0 || filters.revenueRange[1] < 10000000) count++
    if (filters.requestedLimitRange[0] > 0 || filters.requestedLimitRange[1] < 2000000) count++
    if (filters.averageOrderValueRange[0] > 0 || filters.averageOrderValueRange[1] < 500000) count++
    if (filters.industry.length > 0) count++
    if (filters.businessType.length > 0) count++
    if (filters.yearsInBusinessRange[0] > 0 || filters.yearsInBusinessRange[1] < 50) count++
    if (filters.employeeCountRange[0] > 1 || filters.employeeCountRange[1] < 1000) count++
    if (filters.riskScore[0] > 0 || filters.riskScore[1] < 100) count++
    if (filters.creditRating.length > 0) count++
    if (filters.completionScore[0] > 0 || filters.completionScore[1] < 100) count++
    if (filters.cashFlowCycle.length > 0) count++
    if (filters.primaryCurrency.length > 0) count++
    if (filters.documentStatus.length > 0) count++
    if (filters.companyName) count++
    if (filters.contactPerson) count++
    if (filters.email) count++
    return count
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Apply advanced filters to find specific applications based on multiple criteria.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Search className="h-4 w-4" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={filters.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Search by company name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={filters.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Search by contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={filters.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Search by email"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status & Priority Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status & Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Application Status</Label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${option.value}`}
                        checked={filters.status.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("status", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`status-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${option.value}`}
                        checked={filters.priority.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("priority", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`priority-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Date Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Submission Date Range</Label>
                  <DateRangePicker
                    value={filters.submissionDateRange}
                    onChange={(value) => handleDateRangeChange("submissionDateRange", value)}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated Range</Label>
                  <DateRangePicker
                    value={filters.lastUpdatedRange}
                    onChange={(value) => handleDateRangeChange("lastUpdatedRange", value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Financial Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Annual Revenue: ${filters.revenueRange[0].toLocaleString()} - $
                  {filters.revenueRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={filters.revenueRange}
                  onValueChange={(value) => handleSliderChange("revenueRange", value)}
                  max={10000000}
                  min={0}
                  step={50000}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Requested Credit Limit: ${filters.requestedLimitRange[0].toLocaleString()} - $
                  {filters.requestedLimitRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={filters.requestedLimitRange}
                  onValueChange={(value) => handleSliderChange("requestedLimitRange", value)}
                  max={2000000}
                  min={0}
                  step={25000}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Average Order Value: ${filters.averageOrderValueRange[0].toLocaleString()} - $
                  {filters.averageOrderValueRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={filters.averageOrderValueRange}
                  onValueChange={(value) => handleSliderChange("averageOrderValueRange", value)}
                  max={500000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Company Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Industry</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {industryOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${option.value}`}
                        checked={filters.industry.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("industry", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`industry-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">Business Type</Label>
                <div className="flex flex-wrap gap-2">
                  {businessTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`businessType-${option.value}`}
                        checked={filters.businessType.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("businessType", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`businessType-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Years in Business: {filters.yearsInBusinessRange[0]} - {filters.yearsInBusinessRange[1]} years
                  </Label>
                  <Slider
                    value={filters.yearsInBusinessRange}
                    onValueChange={(value) => handleSliderChange("yearsInBusinessRange", value)}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Employee Count: {filters.employeeCountRange[0]} - {filters.employeeCountRange[1]} employees
                  </Label>
                  <Slider
                    value={filters.employeeCountRange}
                    onValueChange={(value) => handleSliderChange("employeeCountRange", value)}
                    max={1000}
                    min={1}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk & Credit Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk & Credit Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Risk Score: {filters.riskScore[0]}% - {filters.riskScore[1]}%
                </Label>
                <Slider
                  value={filters.riskScore}
                  onValueChange={(value) => handleSliderChange("riskScore", value)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Completion Score: {filters.completionScore[0]}% - {filters.completionScore[1]}%
                </Label>
                <Slider
                  value={filters.completionScore}
                  onValueChange={(value) => handleSliderChange("completionScore", value)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">Credit Rating</Label>
                <div className="flex flex-wrap gap-2">
                  {creditRatingOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`creditRating-${option.value}`}
                        checked={filters.creditRating.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("creditRating", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`creditRating-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operations & Banking Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Operations & Banking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Cash Flow Cycle</Label>
                <div className="flex flex-wrap gap-2">
                  {cashFlowCycleOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cashFlowCycle-${option.value}`}
                        checked={filters.cashFlowCycle.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("cashFlowCycle", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`cashFlowCycle-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-3 block">Primary Currency</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {currencyOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`currency-${option.value}`}
                        checked={filters.primaryCurrency.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("primaryCurrency", option.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`currency-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Document Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {documentStatusOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`documentStatus-${option.value}`}
                      checked={filters.documentStatus.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleMultiSelectChange("documentStatus", option.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={`documentStatus-${option.value}`} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={resetFilters} className="gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Reset All Filters
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={applyFilters} className="bg-red-600 hover:bg-red-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
