"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, Building2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowRight } from "lucide-react"
import { format } from "date-fns"

interface InvoiceData {
  invoiceNumber?: string
  amount?: number
  currency?: string
  issueDate?: string
  dueDate?: string
  description?: string
  buyerName?: string
  buyerEmail?: string
  buyerAddress?: string
}

interface InvoiceDetailsStepProps {
  data?: InvoiceData
  onUpdate: (data: Partial<InvoiceData>) => void
  onNext: () => void
}

export default function InvoiceDetailsStep({ data = {}, onUpdate, onNext }: InvoiceDetailsStepProps) {
  const [issueDate, setIssueDate] = useState<Date | undefined>(data.issueDate ? new Date(data.issueDate) : undefined)
  const [dueDate, setDueDate] = useState<Date | undefined>(data.dueDate ? new Date(data.dueDate) : undefined)

  const handleInputChange = (field: keyof InvoiceData, value: string | number) => {
    onUpdate({ [field]: value })
  }

  const handleDateChange = (field: "issueDate" | "dueDate", date: Date | undefined) => {
    if (field === "issueDate") {
      setIssueDate(date)
      onUpdate({ issueDate: date?.toISOString() })
    } else {
      setDueDate(date)
      onUpdate({ dueDate: date?.toISOString() })
    }
  }

  const isFormValid = () => {
    return (
      data.invoiceNumber && data.amount && data.currency && issueDate && dueDate && data.buyerName && data.buyerEmail
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Invoice & Order Details</h2>
        <p className="text-gray-600 mt-2">
          Provide comprehensive information about your invoice, order, and trade transaction
        </p>
      </div>

      {/* Basic Invoice Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input
                id="invoiceNumber"
                value={data.invoiceNumber || ""}
                onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                placeholder="INV-2024-001"
              />
            </div>

            <div>
              <Label htmlFor="amount">Invoice Amount *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  value={data.amount || ""}
                  onChange={(e) => handleInputChange("amount", Number.parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="currency">Currency *</Label>
              <Select value={data.currency || "USD"} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Issue Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {issueDate ? format(issueDate, "PPP") : "Select issue date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={issueDate}
                    onSelect={(date) => handleDateChange("issueDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Due Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => handleDateChange("dueDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buyer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Buyer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="buyerName">Buyer Name *</Label>
            <Input
              id="buyerName"
              value={data.buyerName || ""}
              onChange={(e) => handleInputChange("buyerName", e.target.value)}
              placeholder="Company Name"
            />
          </div>

          <div>
            <Label htmlFor="buyerEmail">Buyer Email *</Label>
            <Input
              id="buyerEmail"
              type="email"
              value={data.buyerEmail || ""}
              onChange={(e) => handleInputChange("buyerEmail", e.target.value)}
              placeholder="buyer@company.com"
            />
          </div>

          <div>
            <Label htmlFor="buyerAddress">Buyer Address</Label>
            <Textarea
              id="buyerAddress"
              value={data.buyerAddress || ""}
              onChange={(e) => handleInputChange("buyerAddress", e.target.value)}
              placeholder="Full address"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="description">Invoice Description</Label>
            <Textarea
              id="description"
              value={data.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of goods/services"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end pt-6 border-t">
        <Button onClick={onNext} disabled={!isFormValid()} className="bg-blue-600 hover:bg-blue-700">
          Next: Buyer Verification
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
