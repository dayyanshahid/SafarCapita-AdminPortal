"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  User,
  DollarSign,
  Save,
  ArrowLeft,
  TrendingUp,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";

export default function CreateManualApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  });

  const steps = [
    { id: "company", title: "Company Info", icon: Building2 },
    { id: "contact", title: "Contact Info", icon: User },
    { id: "financial", title: "Financial Info", icon: DollarSign },
    { id: "operations", title: "Operations", icon: TrendingUp },
    { id: "banking", title: "Banking Info", icon: CreditCard },
    { id: "review", title: "Review", icon: CheckCircle },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Generate a unique application ID
      const applicationId = `APP-${Date.now()}`;

      const applicationData = {
        id: applicationId,
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        title: formData.title || "N/A",
        email: formData.email,
        phone: formData.phone,
        address: formData.address || "N/A",
        submissionDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        status: "pending" as const,
        priority: formData.priority as "high" | "medium" | "low",
        businessType: formData.businessType,
        industry: formData.industry,
        annualRevenue: Number.parseInt(formData.annualRevenue) || 0,
        yearsInBusiness: Number.parseInt(formData.yearsInBusiness) || 0,
        employeeCount: Number.parseInt(formData.employeeCount) || 0,
        requestedLimit: Number.parseInt(formData.requestedLimit) || 0,
        completionScore: 100,
        riskScore: 70,
        creditRating: "B+",
        taxId: formData.taxId,
        website: formData.website || "",
        businessDescription: formData.businessDescription || "",
        documentsComplete: 0,
        totalDocuments: 5,
        riskLevel: "medium" as const,
        source: "manual",
        // Enhanced fields
        averageOrderValue: Number.parseInt(formData.averageOrderValue) || 0,
        monthlyTransactionVolume:
          Number.parseInt(formData.monthlyTransactionVolume) || 0,
        primaryExportMarkets: formData.primaryExportMarkets || "",
        majorClients: formData.majorClients || "",
        cashFlowCycle: formData.cashFlowCycle || "30",
        numberOfEmployees: Number.parseInt(formData.numberOfEmployees) || 0,
        bankName: formData.bankName,
        accountType: formData.accountType,
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        routingNumber: formData.routingNumber || "",
        swiftBicCode: formData.swiftBicCode || "",
        ibanCode: formData.ibanCode || "",
        primaryCurrency: formData.primaryCurrency || "USD",
        bankAddress: formData.bankAddress || "",
        documents: [],
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // console.log("Creating manual application:", applicationData);

      // Show success message and redirect
      alert(`Application ${applicationId} created successfully!`);
      router.push("/admin/sellers");
    } catch (error) {
      console.error("Error creating application:", error);
      alert("Error creating application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: // Company Info
        return (
          formData.companyName &&
          formData.businessType &&
          formData.industry &&
          formData.taxId
        );
      case 1: // Contact Info
        return formData.contactPerson && formData.email && formData.phone;
      case 2: // Financial Info
        return (
          formData.requestedLimit &&
          formData.annualRevenue &&
          formData.averageOrderValue
        );
      case 3: // Operations
        return formData.cashFlowCycle && formData.numberOfEmployees;
      case 4: // Banking Info
        return (
          formData.bankName &&
          formData.accountType &&
          formData.accountHolderName &&
          formData.accountNumber
        );
      default:
        return true;
    }
  };

  const completionPercentage = ((currentStep + 1) / steps.length) * 100;

  const headerActions = (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={() => router.push("/admin/sellers")}
        className="gap-2 bg-transparent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </Button>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <DashboardHeader
        title="Create Manual Application"
        actions={headerActions}
      />

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Application Progress</h3>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}:{" "}
                {steps[currentStep].title}
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {Math.round(completionPercentage)}% Complete
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    index <= currentStep
                      ? "bg-red-600 border-red-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      index <= currentStep ? "text-red-600" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Step {index + 1}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-px mx-4 ${
                      index < currentStep ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="flex-1">
        <CardContent className="p-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter the basic company information and business details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    placeholder="Enter company legal name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) =>
                      handleInputChange("businessType", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole_proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      handleInputChange("industry", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="textiles">
                        Textiles & Apparel
                      </SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="food_beverage">
                        Food & Beverage
                      </SelectItem>
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
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="https://company.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="yearsInBusiness">Years in Business</Label>
                  <Input
                    id="yearsInBusiness"
                    type="number"
                    value={formData.yearsInBusiness}
                    onChange={(e) =>
                      handleInputChange("yearsInBusiness", e.target.value)
                    }
                    placeholder="5"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={formData.employeeCount}
                    onChange={(e) =>
                      handleInputChange("employeeCount", e.target.value)
                    }
                    placeholder="50"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    value={formData.annualRevenue}
                    onChange={(e) =>
                      handleInputChange("annualRevenue", e.target.value)
                    }
                    placeholder="1000000"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="businessDescription">
                  Business Description
                </Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) =>
                    handleInputChange("businessDescription", e.target.value)
                  }
                  placeholder="Describe the company's business activities..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter the primary contact person details for this application.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    placeholder="John Smith"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="CEO, CFO, etc."
                    className="mt-1"
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
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
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
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5" />
                  Financial Information
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-6">
                  Provide financial details and market information for credit
                  assessment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="requestedLimit">
                    Requested Credit Limit *
                  </Label>
                  <Input
                    id="requestedLimit"
                    type="number"
                    value={formData.requestedLimit}
                    onChange={(e) =>
                      handleInputChange("requestedLimit", e.target.value)
                    }
                    placeholder="500000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="averageOrderValue">
                    Average Order Value *
                  </Label>
                  <Input
                    id="averageOrderValue"
                    type="number"
                    value={formData.averageOrderValue}
                    onChange={(e) =>
                      handleInputChange("averageOrderValue", e.target.value)
                    }
                    placeholder="25000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyTransactionVolume">
                    Monthly Transaction Volume
                  </Label>
                  <Input
                    id="monthlyTransactionVolume"
                    type="number"
                    value={formData.monthlyTransactionVolume}
                    onChange={(e) =>
                      handleInputChange(
                        "monthlyTransactionVolume",
                        e.target.value
                      )
                    }
                    placeholder="150000"
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-4">Market Presence</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primaryExportMarkets">
                      Primary Export Markets
                    </Label>
                    <Textarea
                      id="primaryExportMarkets"
                      value={formData.primaryExportMarkets}
                      onChange={(e) =>
                        handleInputChange(
                          "primaryExportMarkets",
                          e.target.value
                        )
                      }
                      placeholder="e.g., United States, European Union, Canada, Australia..."
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="majorClients">Major Clients/Buyers</Label>
                    <Textarea
                      id="majorClients"
                      value={formData.majorClients}
                      onChange={(e) =>
                        handleInputChange("majorClients", e.target.value)
                      }
                      placeholder="List major clients or buyer companies..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5" />
                  Operations Information
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-6">
                  Operational details that affect cash flow and risk assessment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="cashFlowCycle">
                    Cash Flow Cycle (Days) *
                  </Label>
                  <Select
                    value={formData.cashFlowCycle}
                    onValueChange={(value) =>
                      handleInputChange("cashFlowCycle", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
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
                  <Label htmlFor="numberOfEmployees">
                    Number of Employees *
                  </Label>
                  <Input
                    id="numberOfEmployees"
                    type="number"
                    value={formData.numberOfEmployees}
                    onChange={(e) =>
                      handleInputChange("numberOfEmployees", e.target.value)
                    }
                    placeholder="50"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5" />
                  Banking Information
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-6">
                  Banking details for fund transfers and account verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
                    placeholder="Chase Bank"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) =>
                      handleInputChange("accountType", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business_checking">
                        Business Checking
                      </SelectItem>
                      <SelectItem value="business_savings">
                        Business Savings
                      </SelectItem>
                      <SelectItem value="money_market">Money Market</SelectItem>
                      <SelectItem value="current_account">
                        Current Account
                      </SelectItem>
                      <SelectItem value="trade_finance">
                        Trade Finance Account
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="accountHolderName">
                    Account Holder Name *
                  </Label>
                  <Input
                    id="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={(e) =>
                      handleInputChange("accountHolderName", e.target.value)
                    }
                    placeholder="Company Legal Name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      handleInputChange("accountNumber", e.target.value)
                    }
                    placeholder="1234567890"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) =>
                      handleInputChange("routingNumber", e.target.value)
                    }
                    placeholder="021000021"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="swiftBicCode">SWIFT/BIC Code</Label>
                  <Input
                    id="swiftBicCode"
                    value={formData.swiftBicCode}
                    onChange={(e) =>
                      handleInputChange("swiftBicCode", e.target.value)
                    }
                    placeholder="CHASUS33"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ibanCode">IBAN Code</Label>
                  <Input
                    id="ibanCode"
                    value={formData.ibanCode}
                    onChange={(e) =>
                      handleInputChange("ibanCode", e.target.value)
                    }
                    placeholder="GB29 NWBK 6016 1331 9268 19"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="primaryCurrency">Primary Currency</Label>
                  <Select
                    value={formData.primaryCurrency}
                    onValueChange={(value) =>
                      handleInputChange("primaryCurrency", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">
                        AUD - Australian Dollar
                      </SelectItem>
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
                  onChange={(e) =>
                    handleInputChange("bankAddress", e.target.value)
                  }
                  placeholder="Bank's full address including city, state, and postal code"
                  rows={2}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5" />
                  Review Application
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-6">
                  Please review all information before submitting the
                  application.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Company Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">
                          {formData.companyName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {formData.businessType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Industry:</span>
                        <span className="font-medium">{formData.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax ID:</span>
                        <span className="font-medium">{formData.taxId}</span>
                      </div>
                      {formData.website && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Website:</span>
                          <span className="font-medium">
                            {formData.website}
                          </span>
                        </div>
                      )}
                      {formData.yearsInBusiness && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Years in Business:
                          </span>
                          <span className="font-medium">
                            {formData.yearsInBusiness}
                          </span>
                        </div>
                      )}
                      {formData.employeeCount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Employees:</span>
                          <span className="font-medium">
                            {formData.employeeCount}
                          </span>
                        </div>
                      )}
                      {formData.annualRevenue && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Revenue:</span>
                          <span className="font-medium">
                            $
                            {Number.parseInt(
                              formData.annualRevenue
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">
                          {formData.contactPerson}
                        </span>
                      </div>
                      {formData.title && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Title:</span>
                          <span className="font-medium">{formData.title}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                      {formData.address && (
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium mt-1">{formData.address}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Operations
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cash Flow Cycle:</span>
                        <span className="font-medium">
                          {formData.cashFlowCycle} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Number of Employees:
                        </span>
                        <span className="font-medium">
                          {formData.numberOfEmployees}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Financial Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Requested Limit:</span>
                        <span className="font-medium">
                          $
                          {Number.parseInt(
                            formData.requestedLimit || "0"
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Average Order Value:
                        </span>
                        <span className="font-medium">
                          $
                          {Number.parseInt(
                            formData.averageOrderValue || "0"
                          ).toLocaleString()}
                        </span>
                      </div>
                      {formData.monthlyTransactionVolume && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Monthly Transaction Volume:
                          </span>
                          <span className="font-medium">
                            $
                            {Number.parseInt(
                              formData.monthlyTransactionVolume
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {formData.primaryExportMarkets && (
                        <div>
                          <span className="text-gray-600">
                            Primary Export Markets:
                          </span>
                          <p className="font-medium mt-1">
                            {formData.primaryExportMarkets}
                          </p>
                        </div>
                      )}
                      {formData.majorClients && (
                        <div>
                          <span className="text-gray-600">Major Clients:</span>
                          <p className="font-medium mt-1">
                            {formData.majorClients}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Banking Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank:</span>
                        <span className="font-medium">{formData.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Type:</span>
                        <span className="font-medium">
                          {formData.accountType.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Holder:</span>
                        <span className="font-medium">
                          {formData.accountHolderName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-medium">
                          ****{formData.accountNumber.slice(-4)}
                        </span>
                      </div>
                      {formData.routingNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Routing Number:</span>
                          <span className="font-medium">
                            {formData.routingNumber}
                          </span>
                        </div>
                      )}
                      {formData.swiftBicCode && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">SWIFT/BIC:</span>
                          <span className="font-medium">
                            {formData.swiftBicCode}
                          </span>
                        </div>
                      )}
                      {formData.primaryCurrency && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Primary Currency:
                          </span>
                          <span className="font-medium">
                            {formData.primaryCurrency}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.businessDescription && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Business Description
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formData.businessDescription}
                      </p>
                    </div>
                  )}

                  {formData.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Additional Notes
                      </h4>
                      <p className="text-sm text-gray-600">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="priority">Application Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleInputChange("priority", value)
                  }
                >
                  <SelectTrigger className="mt-1 max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional notes or special instructions..."
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/sellers")}
              >
                Cancel
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Creating..." : "Create Application"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
