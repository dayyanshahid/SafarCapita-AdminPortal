"use client";

import { useState, useEffect, use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import makeRequest from "@/Api's/ApiHelper";
import { getCompanyDetailById } from "@/Api's/repo";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  TrendingUp,
  Users,
  XCircle,
  Shield,
  MessageSquare,
  Send,
  Plus,
  Edit,
  Star,
  CreditCard,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

// Enhanced mock data for TechCorp Solutions with contracts and financing requests
const mockApplication = {
  id: "APP-2024-001",
  submissionDate: "2024-01-10",
  lastUpdated: "2024-01-15",
  status: "under_review",
  priority: "high",
  assignedTo: "Sarah Johnson",
  daysInProcess: 5,

  // Company Information
  company: "TechCorp Solutions Ltd",
  companyId: "TCS-001",
  registrationNumber: "12345678",
  taxId: "TAX-TCS-001",
  incorporationDate: "2018-03-15",
  companyType: "Private Limited Company",
  industry: "Information Technology",
  subIndustry: "Software Development & IT Services",
  businessDescription:
    "Leading provider of enterprise software solutions and IT consulting services for global markets",

  // Contact Information
  primaryContact: "John Smith",
  position: "Chief Financial Officer",
  email: "john.smith@techcorp.com",
  phone: "+1-555-0123",
  alternateContact: "Jane Doe",
  alternatePosition: "Finance Manager",
  alternateEmail: "jane.doe@techcorp.com",
  alternatePhone: "+1-555-0124",

  // Address Information
  registeredAddress: "123 Tech Street, Silicon Valley, CA 94000, USA",
  operationalAddress: "123 Tech Street, Silicon Valley, CA 94000, USA",
  mailingAddress: "123 Tech Street, Silicon Valley, CA 94000, USA",
  country: "United States",
  state: "California",
  city: "Silicon Valley",
  zipCode: "94000",

  // Financial Information
  annualRevenue: 15000000,
  currency: "USD",
  employeeCount: 150,
  yearEstablished: 2018,
  creditRating: "A-",
  requestedCreditLimit: 2000000,

  // Banking Information
  bankName: "First National Bank",
  accountNumber: "****1234",
  routingNumber: "021000021",
  swiftCode: "FNBKUS33",
  bankAddress: "456 Banking Ave, New York, NY 10001",

  // Business Information
  mainProducts: ["Enterprise Software", "Cloud Solutions", "IT Consulting"],
  mainMarkets: ["North America", "Europe", "Asia-Pacific"],
  keyCustomers: [
    "Fortune 500 Companies",
    "Government Agencies",
    "Healthcare Organizations",
  ],
  competitiveAdvantages: [
    "Proprietary Technology",
    "Strong R&D Team",
    "Global Presence",
  ],

  // Application Status
  documentsComplete: 85,
  verificationScore: 92,
  riskScore: 78,
  riskLevel: "medium",

  // Enhanced Contracts Data
  contracts: [
    {
      id: "CTR-2024-001",
      title: "Enterprise Software License Agreement",
      type: "Software Licensing",
      buyer: "Microsoft Corporation",
      buyerCountry: "United States",
      contractValue: 2500000,
      currency: "USD",
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      paymentTerms: "Net 30",
      status: "active",
      utilization: 65,
      riskLevel: "low",
      lastPayment: "2024-01-15",
      nextPayment: "2024-02-15",
      description:
        "Multi-year enterprise software licensing agreement with Microsoft for cloud-based solutions",
      keyTerms: [
        "Exclusive licensing rights",
        "Performance guarantees",
        "Maintenance included",
      ],
      performanceMetrics: {
        onTimeDelivery: 98,
        qualityScore: 95,
        customerSatisfaction: 92,
      },
    },
    {
      id: "CTR-2024-002",
      title: "IT Consulting Services Agreement",
      type: "Professional Services",
      buyer: "Amazon Web Services",
      buyerCountry: "United States",
      contractValue: 1800000,
      currency: "USD",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      paymentTerms: "Net 45",
      status: "active",
      utilization: 42,
      riskLevel: "low",
      lastPayment: "2024-01-10",
      nextPayment: "2024-02-10",
      description:
        "Comprehensive IT consulting and implementation services for AWS cloud infrastructure",
      keyTerms: [
        "Dedicated team allocation",
        "SLA guarantees",
        "Knowledge transfer",
      ],
      performanceMetrics: {
        onTimeDelivery: 96,
        qualityScore: 94,
        customerSatisfaction: 89,
      },
    },
    {
      id: "CTR-2024-003",
      title: "Custom Software Development",
      type: "Development Services",
      buyer: "Google LLC",
      buyerCountry: "United States",
      contractValue: 3200000,
      currency: "USD",
      startDate: "2024-03-01",
      endDate: "2025-08-31",
      paymentTerms: "Net 30",
      status: "pending",
      utilization: 0,
      riskLevel: "medium",
      lastPayment: null,
      nextPayment: "2024-03-15",
      description:
        "Custom enterprise application development for Google's internal operations",
      keyTerms: [
        "Milestone-based payments",
        "IP ownership transfer",
        "Post-launch support",
      ],
      performanceMetrics: {
        onTimeDelivery: null,
        qualityScore: null,
        customerSatisfaction: null,
      },
    },
  ],

  // Enhanced Financing Requests Data
  financingRequests: [
    {
      id: "FR-2024-001",
      submissionDate: "2024-01-15",
      buyer: "Microsoft Corporation",
      buyerCountry: "United States",
      invoiceNumber: "INV-2024-0156",
      invoiceAmount: 425000,
      requestedAmount: 340000,
      currency: "USD",
      advanceRate: 80,
      status: "approved",
      approvalDate: "2024-01-17",
      disbursementDate: "2024-01-18",
      dueDate: "2024-02-15",
      riskScore: 85,
      aiValidationScore: 96,
      productCategory: "Software Licensing",
      paymentTerms: "Net 30",
      description:
        "Q1 2024 software licensing fees for enterprise cloud solutions",
      timeline: [
        { stage: "submitted", date: "2024-01-15", status: "completed" },
        { stage: "document_review", date: "2024-01-15", status: "completed" },
        { stage: "credit_check", date: "2024-01-16", status: "completed" },
        { stage: "approved", date: "2024-01-17", status: "completed" },
        { stage: "disbursed", date: "2024-01-18", status: "completed" },
        { stage: "collection", date: "2024-01-18", status: "in_progress" },
      ],
    },
    {
      id: "FR-2024-002",
      submissionDate: "2024-01-12",
      buyer: "Amazon Web Services",
      buyerCountry: "United States",
      invoiceNumber: "INV-2024-0142",
      invoiceAmount: 180000,
      requestedAmount: 144000,
      currency: "USD",
      advanceRate: 80,
      status: "approved",
      approvalDate: "2024-01-14",
      disbursementDate: "2024-01-15",
      dueDate: "2024-02-26",
      riskScore: 88,
      aiValidationScore: 94,
      productCategory: "IT Consulting",
      paymentTerms: "Net 45",
      description:
        "January 2024 consulting services for cloud infrastructure implementation",
      timeline: [
        { stage: "submitted", date: "2024-01-12", status: "completed" },
        { stage: "document_review", date: "2024-01-12", status: "completed" },
        { stage: "credit_check", date: "2024-01-13", status: "completed" },
        { stage: "approved", date: "2024-01-14", status: "completed" },
        { stage: "disbursed", date: "2024-01-15", status: "completed" },
        { stage: "collection", date: "2024-01-15", status: "in_progress" },
      ],
    },
    {
      id: "FR-2024-003",
      submissionDate: "2024-01-08",
      buyer: "Oracle Corporation",
      buyerCountry: "United States",
      invoiceNumber: "INV-2024-0128",
      invoiceAmount: 95000,
      requestedAmount: 76000,
      currency: "USD",
      advanceRate: 80,
      status: "completed",
      approvalDate: "2024-01-09",
      disbursementDate: "2024-01-10",
      dueDate: "2024-02-07",
      collectionDate: "2024-02-05",
      riskScore: 92,
      aiValidationScore: 98,
      productCategory: "Software Development",
      paymentTerms: "Net 30",
      description: "Custom integration services for Oracle database systems",
      timeline: [
        { stage: "submitted", date: "2024-01-08", status: "completed" },
        { stage: "document_review", date: "2024-01-08", status: "completed" },
        { stage: "credit_check", date: "2024-01-09", status: "completed" },
        { stage: "approved", date: "2024-01-09", status: "completed" },
        { stage: "disbursed", date: "2024-01-10", status: "completed" },
        { stage: "collection", date: "2024-01-10", status: "completed" },
        { stage: "completed", date: "2024-02-05", status: "completed" },
      ],
    },
    {
      id: "FR-2024-004",
      submissionDate: "2024-01-18",
      buyer: "Salesforce Inc.",
      buyerCountry: "United States",
      invoiceNumber: "INV-2024-0178",
      invoiceAmount: 220000,
      requestedAmount: 176000,
      currency: "USD",
      advanceRate: 80,
      status: "under_review",
      approvalDate: null,
      disbursementDate: null,
      dueDate: "2024-03-19",
      riskScore: 82,
      aiValidationScore: 91,
      productCategory: "Software Integration",
      paymentTerms: "Net 60",
      description:
        "CRM integration and customization services for Salesforce platform",
      timeline: [
        { stage: "submitted", date: "2024-01-18", status: "completed" },
        { stage: "document_review", date: "2024-01-18", status: "in_progress" },
        { stage: "credit_check", date: null, status: "pending" },
        { stage: "approved", date: null, status: "pending" },
      ],
    },
  ],

  // Documents
  documents: [
    {
      name: "Certificate of Incorporation",
      type: "legal",
      status: "completed",
      uploadDate: "2024-01-10",
      required: true,
    },
    {
      name: "Tax Registration Certificate",
      type: "tax",
      status: "completed",
      uploadDate: "2024-01-10",
      required: true,
    },
    {
      name: "Financial Statements (2023)",
      type: "financial",
      status: "completed",
      uploadDate: "2024-01-11",
      required: true,
    },
    {
      name: "Bank Statements (Last 6 months)",
      type: "banking",
      status: "completed",
      uploadDate: "2024-01-11",
      required: true,
    },
    {
      name: "Trade References",
      type: "reference",
      status: "pending",
      uploadDate: null,
      required: true,
    },
    {
      name: "Insurance Certificate",
      type: "insurance",
      status: "completed",
      uploadDate: "2024-01-12",
      required: false,
    },
  ],

  // Performance Metrics
  performanceMetrics: {
    totalTransactionVolume: 1200000,
    averageTransactionSize: 200000,
    onTimePaymentRate: 96,
    creditUtilization: 45,
    riskScore: 78,
    relationshipDuration: 6, // months
  },
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    Pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: Clock,
    },
    under_review: {
      label: "Under Review",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Eye,
    },
    Approved: {
      label: "Approved",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
    Rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircle,
    },
    Completed: {
      label: "Completed",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
    Active: {
      label: "Active",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
    },
    in_progress: {
      label: "In Progress",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Clock,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <Badge className={config.color}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};

const getRiskBadge = (riskLevel: string) => {
  const riskConfig = {
    low: {
      label: "Low Risk",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    medium: {
      label: "Medium Risk",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    high: {
      label: "High Risk",
      color: "bg-red-100 text-red-800 border-red-200",
    },
  };

  const config =
    riskConfig[riskLevel as keyof typeof riskConfig] || riskConfig.medium;

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface ApiResponse {
  response_code: number;
  success: boolean;
  status_code: number;
  total_records: null | number;
  page_number: null | number;
  total_pages: null | number;
  message: string;
  error_message: null | string;
  token: null | string;
  result: {
    company: {
      _id: string;
      legal_company_name: string;
      business_type: string;
      website: string;
      street_address: string;
      city: string;
      zip_postal_code: string;
      country: string;
      phone_number: string;
      annual_revenue_range: string;
      years_in_business: string;
      avg_order_value: string;
      monthly_transaction_volume: string;
      primary_export_market: string;
      major_client_buyers: string;
      cash_flow_cyle: string;
      no_of_employees: string;
      employee_id: {
        _id: string;
        auth_id: string;
        first_name: string;
        last_name: string;
        image: string;
        job_title: string;
        department: string;
        bio: string;
        two_factor_authentication: string;
        login_alerts: string;
        email_notifications: number;
        sms_notifications: number;
        push_notifications: number;
        notification_types: {
          invoice_updates: string;
          payment_alerts: string;
          system_maintenance: string;
          marketing_emails: string;
        };
        timezone: string;
        language: string;
        action_type: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      action_type: number;
      status: string;
      documents_status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    invoices: {
      data: Array<{
        _id: string;
        invoice_number: string;
        purchase_order_number: string;
        invoice_date: string;
        due_date: string;
        delivery_date: string;
        invoice_amount: number;
        currency: string;
        payment_terms: string;
        invoice_description: string;
        order_number: string;
        incoterms: string;
        port_of_loading: string;
        port_of_discharge: string;
        shipment_information: string;
        product_description: string;
        product_category: string;
        unit_of_measure: string;
        quantity: number;
        unit_price: number;
        total_weight_kg: number;
        requested_financing_amount: number;
        requested_advance_rate: number;
        repayment_period: string;
        buyers_id: {
          _id: string;
          buyer_company_name: string;
          registration_number: string;
          employee_id: string;
          country: string;
          buyer_address: string;
          contact_email: string;
          contact_phone: string;
          credit_limit: number;
          status: string;
          action_type: number;
          createdAt: string;
          updatedAt: string;
          __v: number;
        };
        employee_id: string;
        invoice_documents: {
          fcr: string;
          gd: string;
          bill_of_lading: string;
          packing_list: string;
          _id: string;
        };
        company_id: string;
        status: string;
        action_type: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
        timeline: {
          _id: string;
          invoice_id: string;
          steps: Array<{
            name: string;
            status: string;
            date: string | null;
            description: string | null;
            _id: string;
          }>;
          createdAt: string;
          updatedAt: string;
          __v: number;
        };
      }>;
      totalCount: number;
      active_invoices: number;
      total_funded: number;
      average_processing_time: number;
      avg_approval_percentage: number;
    };
    bank_details: null | {
      _id: string;
      bank_name: string;
      company_id: string;
      account_holder_name: string;
      account_number: string;
      routing_number: string;
      swift_bic_code: string;
      account_type: string;
      currency: string;
      is_verified: number;
      type: string;
      bank_address: string;
      iban: string;
      action_type: number;
      createdAt: string;
      updatedAt: string;
    };
    stats: {
      annual_revenue: number;
      total_transaction_volume: number;
      average_transaction_size: number;
    };
  };
  misc_data: null | any;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SellerApplicationDetailPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await makeRequest({
          url: getCompanyDetailById,
          method: "GET",
          params: { _id: unwrappedParams.id },
        });
        debugger
        if (response?.data?.success) {
          setApiData(response.data);
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [unwrappedParams.id]);

  // We'll handle contracts and financing in separate API integrations

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );

  console.log('apiData?.result?.company?',apiData)
  debugger

  return (
    <div className="flex-1 space-y-6 p-6">
      {isLoading && <LoadingOverlay />}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />  
            {/* Back */}
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {apiData?.result?.company?.legal_company_name
                  ? apiData.result.company.legal_company_name
                  : "No value found"}
              </h1>
              {getStatusBadge(
                apiData?.result?.company?.status
                  ? apiData.result.company.status
                  : "-"
              )}
              {/* <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {apiData?.result?.company?._id
                  ? apiData.result.company._id
                  : "No value found"}
              </Badge> */}
            </div>
            <p className="text-muted-foreground">
              Created{" "}
              {apiData?.result?.company?.createdAt
                ? formatDate(apiData.result.company.createdAt)
                : "-"}{" "}
              • Last updated{" "}
              {apiData?.result?.company?.updatedAt
                ? formatDate(apiData.result.company.updatedAt)
                : "-"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {/* <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Applicant
          </Button> */}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Annual Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${apiData?.result?.stats?.annual_revenue || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {apiData?.result?.company?.no_of_employees || "-"} employees
            </p>
          </CardContent>
        </Card>

        {/* <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Metrics
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    mockApplication.performanceMetrics.totalTransactionVolume,
                    mockApplication.currency
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Transaction Volume
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    mockApplication.performanceMetrics.averageTransactionSize,
                    mockApplication.currency
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Transaction Size
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
        {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockApplication.creditRating}
              </div>
              <p className="text-xs text-muted-foreground">
                Risk Score: {mockApplication.riskScore}%
              </p>
            </CardContent>
          </Card> */}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplication.documentsComplete}%
            </div>
            <Progress
              value={mockApplication.documentsComplete}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplication.verificationScore}%
            </div>
            <Progress
              value={mockApplication.verificationScore}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Processing Time
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockApplication.daysInProcess} days
            </div>
            <p className="text-xs text-muted-foreground">
              Assigned to {mockApplication.assignedTo}
            </p>
          </CardContent>
        </Card> */}
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5  ">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="financing">Financing</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          {/* <TabsTrigger value="performance">Performance</TabsTrigger> */}
          {/* <TabsTrigger value="actions">Actions</TabsTrigger> */}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Company Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Company Name</Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.company?.legal_company_name ||
                      "No value found"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Business Type</Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.company?.business_type ||
                      "No value found"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Website</Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.company?.website || "No value found"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Years in Business
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.years_in_business ||
                        "No value found"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Employees</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.no_of_employees ||
                        "No value found"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div>
                  <Label className="text-sm font-medium">Annual Revenue</Label>
                  <p className="text-lg font-semibold">
                    {formatCurrency(
                      mockApplication.annualRevenue,
                      mockApplication.currency
                    )}
                  </p>
                </div> */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Annual Revenue Range
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.annual_revenue_range ||
                        "No value found"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Monthly Transaction Volume
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.monthly_transaction_volume ||
                        "No value found"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Average Order Value
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.avg_order_value ||
                        "No value found"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Cash Flow Cycle
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.cash_flow_cyle ||
                        "No value found"}{" "}
                      days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Contract Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Contract Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">-</div>
                    <div className="text-sm text-blue-700">Total Contracts</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">-</div>
                    <div className="text-sm text-green-700">
                      Active Contracts
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Total Contract Value
                  </Label>
                  <p className="text-lg font-semibold">-</p>
                </div>
              </CardContent>
            </Card>

            {/* Financing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Financing History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {apiData?.result?.invoices?.totalCount ||
                        "No value found"}
                    </div>
                    <div className="text-sm text-purple-700">
                      Total Requests
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {apiData?.result?.invoices?.avg_approval_percentage ||
                        "0"}{" "}
                      %
                    </div>
                    <div className="text-sm text-green-700">Approval Rate</div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Total Financed Amount
                  </Label>
                  <p className="text-lg font-semibold">
                    {apiData?.result?.invoices?.total_funded || "0"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Metrics */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Application Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {mockApplication.verificationScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Verification Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {mockApplication.riskLevel.toUpperCase()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Risk Level
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockApplication.documentsComplete}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Document Completion
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {mockApplication.daysInProcess}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Days in Process
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </TabsContent>

        {/* Company Info Tab */}
        <TabsContent value="company" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Company Name</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.legal_company_name
                        ? apiData.result.company.legal_company_name
                        : apiData?.result?.company?.legal_company_name ===
                          undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Company ID</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?._id
                        ? apiData.result.company._id
                        : apiData?.result?.company?._id === undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Business Type</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.business_type
                        ? apiData.result.company.business_type
                        : apiData?.result?.company?.business_type === undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Website</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.website
                        ? apiData.result.company.website
                        : apiData?.result?.company?.website === undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Years in Business
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.years_in_business
                        ? apiData.result.company.years_in_business
                        : apiData?.result?.company?.years_in_business ===
                          undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Number of Employees
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.no_of_employees
                        ? apiData.result.company.no_of_employees
                        : apiData?.result?.company?.no_of_employees ===
                          undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Primary Export Market
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.company?.primary_export_market
                      ? apiData.result.company.primary_export_market
                      : apiData?.result?.company?.primary_export_market ===
                        undefined
                      ? "No key found"
                      : "-"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Major Client Buyers
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.company?.major_client_buyers
                      ? apiData.result.company.major_client_buyers
                      : apiData?.result?.company?.major_client_buyers ===
                        undefined
                      ? "No key found"
                      : "-"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Primary Contact</Label>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {apiData?.result?.company?.employee_id?.first_name
                        ? apiData.result.company.employee_id.first_name
                        : apiData?.result?.company?.employee_id?.first_name ===
                          undefined
                        ? "No key found"
                        : "-"}{" "}
                      {apiData?.result?.company?.employee_id?.last_name
                        ? apiData.result.company.employee_id.last_name
                        : apiData?.result?.company?.employee_id?.last_name ===
                          undefined
                        ? "No key found"
                        : "-"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.employee_id?.job_title
                        ? apiData.result.company.employee_id.job_title
                        : apiData?.result?.company?.employee_id?.job_title ===
                          undefined
                        ? "No key found"
                        : "-"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {apiData?.result?.company?.phone_number
                        ? apiData.result.company.phone_number
                        : apiData?.result?.company?.phone_number === undefined
                        ? "No key found"
                        : "-"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Street Address</Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.company?.street_address
                      ? apiData.result.company.street_address
                      : apiData?.result?.company?.street_address === undefined
                      ? "No key found"
                      : "-"}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">City</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.city
                        ? apiData.result.company.city
                        : apiData?.result?.company?.city === undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Country</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.country
                        ? apiData.result.company.country
                        : apiData?.result?.company?.country === undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Zip Code</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.company?.zip_postal_code
                        ? apiData.result.company.zip_postal_code
                        : apiData?.result?.company?.zip_postal_code ===
                          undefined
                        ? "No key found"
                        : "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Banking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  Banking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Bank Name</Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.bank_details?.bank_name || "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Account Number
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.bank_details?.account_number || "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Routing Number
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.bank_details?.routing_number || "-"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">SWIFT Code</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.bank_details?.swift_bic_code || "-"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Currency</Label>
                    <p className="text-sm text-muted-foreground">
                      {apiData?.result?.bank_details?.currency || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Bank Address</Label>
                  <p className="text-sm text-muted-foreground">
                    {apiData?.result?.bank_details?.bank_address || "-"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Details */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    Main Products/Services
                  </Label>
                  <div className="space-y-1">
                    {mockApplication.mainProducts.map((product, index) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        • {product}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Main Markets</Label>
                  <div className="space-y-1">
                    {mockApplication.mainMarkets.map((market, index) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        • {market}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Key Customers</Label>
                  <div className="space-y-1">
                    {mockApplication.keyCustomers.map((customer, index) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        • {customer}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Competitive Advantages
                  </Label>
                  <div className="space-y-1">
                    {mockApplication.competitiveAdvantages.map(
                      (advantage, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          • {advantage}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          {/* Contract Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contract Portfolio Summary
              </CardTitle>
              <CardDescription>
                Overview of all contracts associated with this seller
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">-</div>
                  <div className="text-sm text-blue-700">Total Contracts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">-</div>
                  <div className="text-sm text-green-700">Active Contracts</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">-</div>
                  <div className="text-sm text-purple-700">Total Value</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">-</div>
                  <div className="text-sm text-orange-700">Avg Utilization</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Details */}
          <div className="grid gap-6">
            {mockApplication.contracts.map((contract) => (
              <Card
                key={contract.id}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {contract.title}
                      </CardTitle>
                      <CardDescription>
                        {contract.id} • {contract.type} • {contract.buyer}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(contract.status)}
                      {getRiskBadge(contract.riskLevel)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="text-sm font-medium">
                        Contract Value
                      </Label>
                      <p className="text-lg font-semibold">
                        {formatCurrency(
                          contract.contractValue,
                          contract.currency
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Contract Period
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(contract.startDate)} -{" "}
                        {formatDate(contract.endDate)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Payment Terms
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {contract.paymentTerms}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {contract.description}
                    </p>
                  </div>

                  {/* <div>
                    <Label className="text-sm font-medium">
                      Contract Utilization
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={contract.utilization}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium">
                        {contract.utilization}%
                      </span>
                    </div>
                  </div> */}

                  {/* {contract.performanceMetrics.onTimeDelivery && (
                    <div>
                      <Label className="text-sm font-medium">
                        Performance Metrics
                      </Label>
                      <div className="grid gap-2 md:grid-cols-3 mt-2">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">
                            {contract.performanceMetrics.onTimeDelivery}%
                          </div>
                          <div className="text-xs text-green-700">
                            On-Time Delivery
                          </div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">
                            {contract.performanceMetrics.qualityScore}%
                          </div>
                          <div className="text-xs text-blue-700">
                            Quality Score
                          </div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="text-lg font-bold text-purple-600">
                            {contract.performanceMetrics.customerSatisfaction}%
                          </div>
                          <div className="text-xs text-purple-700">
                            Customer Satisfaction
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

                  <div>
                    <Label className="text-sm font-medium">Key Terms</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {contract.keyTerms.map((term, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      {contract.lastPayment && (
                        <span>
                          Last Payment: {formatDate(contract.lastPayment)}
                        </span>
                      )}
                      {contract.nextPayment && (
                        <span>
                          {" "}
                          • Next Payment: {formatDate(contract.nextPayment)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Financing Tab */}
        <TabsContent value="financing" className="space-y-6">
          {/* Financing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Financing Request Summary
              </CardTitle>
              <CardDescription>
                Overview of all financing requests from this seller
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {apiData?.result?.invoices?.totalCount || 0}
                  </div>
                  <div className="text-sm text-blue-700">Total Requests</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {apiData?.result?.invoices?.active_invoices || 0}
                  </div>
                  <div className="text-sm text-green-700">Active Invoices</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${apiData?.result?.invoices?.total_funded || 0}
                  </div>
                  <div className="text-sm text-purple-700">Total Funded</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {apiData?.result?.invoices?.avg_approval_percentage || 0}%
                  </div>
                  <div className="text-sm text-orange-700">Approval Rate</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {apiData?.result?.invoices?.average_processing_time || 0}{" "}
                    days
                  </div>
                  <div className="text-sm text-yellow-700">
                    Avg Processing Time
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financing Request Details */}
          <div className="grid gap-6">
            {apiData?.result?.invoices?.data.map((invoice) => (
              <Card
                key={invoice._id}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        {invoice._id}
                      </CardTitle>
                      <CardDescription>
                        {invoice.invoice_number} •{" "}
                        {invoice.buyers_id?.buyer_company_name || "No buyer"} •{" "}
                        {invoice.product_category || "No category"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(invoice.status)}
                      <Badge variant="outline" className="text-xs">
                        {invoice.requested_advance_rate || 0}% Advance
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Invoice Amount
                      </Label>
                      <p className="text-lg font-semibold">
                        {formatCurrency(
                          invoice.invoice_amount,
                          invoice.currency
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Requested Amount
                      </Label>
                      <p className="text-lg font-semibold text-blue-600">
                        {formatCurrency(
                          invoice.requested_financing_amount,
                          invoice.currency
                        )}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Invoice Date
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(invoice.invoice_date)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Due Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(invoice.due_date)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {invoice.invoice_description || "No description"}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* <div>
                      <Label className="text-sm font-medium">
                        Risk Assessment
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={request.riskScore}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">
                          {request.riskScore}%
                        </span>
                      </div>
                    </div> */}
                    {/* <div>
                      <Label className="text-sm font-medium">
                        AI Validation Score
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={request.aiValidationScore}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">
                          {request.aiValidationScore}%
                        </span>
                      </div>
                    </div> */}
                  </div>

                  {/* Timeline */}
                  {invoice.timeline && (
                    <div>
                      <Label className="text-sm font-medium">
                        Transaction Timeline
                      </Label>
                      <div className="grid gap-2 md:grid-cols-4 mt-2">
                        {invoice.timeline.steps.map((step, index) => (
                          <div
                            key={index}
                            className={`text-center p-2 ${
                              step.status === "Completed" ||
                              step.status === "completed"
                                ? "bg-green-50"
                                : step.status === "Pending"
                                ? "bg-yellow-50"
                                : "bg-blue-50"
                            } rounded`}
                          >
                            <div
                              className={`text-sm font-medium ${
                                step.status === "Completed" ||
                                step.status === "completed"
                                  ? "text-green-700"
                                  : step.status === "Pending"
                                  ? "text-yellow-700"
                                  : "text-blue-700"
                              }`}
                            >
                              {step.name}
                            </div>
                            <div
                              className={`text-xs ${
                                step.status === "Completed" ||
                                step.status === "completed"
                                  ? "text-green-600"
                                  : step.status === "Pending"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {step.date ? formatDate(step.date) : "Pending"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      Payment Terms: {invoice.payment_terms || "-"}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/financing/requests/${invoice._id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      {invoice.invoice_documents?.fcr && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`${BASE_URL}/${invoice.invoice_documents.fcr}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Application Documents
              </CardTitle>
              <CardDescription>
                All documents submitted with this application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Bank Statements */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Bank Statements</span>
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          BANKING
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(
                      apiData?.result?.company?.documents_status || "pending"
                    )}
                    <Button variant="outline" size="sm" disabled>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                {/* Business Registration Certificate */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          Business Registration Certificate
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          LEGAL
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(
                      apiData?.result?.company?.documents_status || "pending"
                    )}
                    <Button variant="outline" size="sm" disabled>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                {/* Financial Statements */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          Financial Statements
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          FINANCIAL
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(
                      apiData?.result?.company?.documents_status || "pending"
                    )}
                    <Button variant="outline" size="sm" disabled>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                {/* Tax Registration Documents */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          Tax Registration Documents
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          TAX
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(
                      apiData?.result?.company?.documents_status || "pending"
                    )}
                    <Button variant="outline" size="sm" disabled>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                {/* Verification Image */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Verification Image</span>
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          VERIFICATION
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(
                      apiData?.result?.company?.documents_status || "pending"
                    )}
                    <Button variant="outline" size="sm" disabled>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
              <CardDescription>
                Key performance indicators and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      mockApplication.performanceMetrics.totalTransactionVolume,
                      mockApplication.currency
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Transaction Volume
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(
                      mockApplication.performanceMetrics.averageTransactionSize,
                      mockApplication.currency
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Transaction Size
                  </div>
                </div>
                {/* <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {mockApplication.performanceMetrics.onTimePaymentRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    On-Time Payment Rate
                  </div>
                </div> */}
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div>
                  <Label className="text-sm font-medium">
                    Credit Utilization
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress
                      value={
                        mockApplication.performanceMetrics.creditUtilization
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">
                      {mockApplication.performanceMetrics.creditUtilization}%
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Risk Score</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress
                      value={mockApplication.performanceMetrics.riskScore}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">
                      {mockApplication.performanceMetrics.riskScore}%
                    </span>
                  </div>
                </div>
                {/* <div>
                  <Label className="text-sm font-medium">
                    Relationship Duration
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mockApplication.performanceMetrics.relationshipDuration}{" "}
                    months
                  </p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Decision Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Application Decision
                </CardTitle>
                <CardDescription>
                  Make approval or rejection decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Application
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Approve with Conditions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="decision-notes">Decision Notes</Label>
                  <Textarea
                    id="decision-notes"
                    placeholder="Add notes about your decision..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Communication Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication
                </CardTitle>
                <CardDescription>
                  Communicate with the applicant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Additional Information
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="message">Quick Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message..."
                    className="min-h-[100px]"
                  />
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Internal Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Internal Notes
              </CardTitle>
              <CardDescription>
                Add internal notes for team collaboration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="internal-note">Add Internal Note</Label>
                <Textarea
                  id="internal-note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note for internal team use..."
                  className="min-h-[100px]"
                />
                <Button onClick={() => setNewNote("")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Previous Notes</h4>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Sarah Johnson</span>
                      <span className="text-xs text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strong application with excellent financial metrics.
                      Company has solid track record and good contract
                      portfolio. Recommend approval with standard terms.
                    </p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Michael Chen</span>
                      <span className="text-xs text-muted-foreground">
                        1 day ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Verified all documents. Financial statements look good and
                      banking references are positive. Credit rating is
                      appropriate for requested limit.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
