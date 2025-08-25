"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import CustomModal from "@/components/CustomModal";
import makeRequest from "../../../Api's/ApiHelper";
import {
  getAllContractsApiCall,
  createAndUpdateContractApiCall,
  getCompanyListApiCall,
  contractUpdateStatusApiCall,
} from "@/Api's/repo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Send,
  AlertTriangle,
  MoreVertical,
} from "lucide-react";

// Mock data for contracts
const contractsData = [
  {
    id: "CT-2024-001",
    title: "Trade Finance Agreement",
    client: "ABC Corporation",
    clientEmail: "finance@abccorp.com",
    type: "Trade Finance",
    status: "active",
    value: 250000,
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    riskLevel: "low",
    utilization: 75,
    documents: [
      { name: "Master Agreement", status: "signed", uploadDate: "2024-01-15" },
      { name: "KYC Documents", status: "verified", uploadDate: "2024-01-10" },
      {
        name: "Financial Statements",
        status: "approved",
        uploadDate: "2024-01-12",
      },
    ],
    terms: {
      advanceRate: 85,
      factorFee: 2.5,
      minimumFee: 500,
      creditLimit: 250000,
      termLength: 60,
    },
    lastActivity: "2024-01-20",
    createdBy: "Admin User",
    notes: "High-value client with excellent payment history",
  },
  {
    id: "CT-2024-002",
    title: "Invoice Factoring Agreement",
    client: "XYZ Limited",
    clientEmail: "accounts@xyzltd.com",
    type: "Invoice Factoring",
    status: "pending_signature",
    value: 150000,
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    riskLevel: "medium",
    utilization: 0,
    documents: [
      {
        name: "Factoring Agreement",
        status: "pending_signature",
        uploadDate: "2024-01-18",
      },
      { name: "UCC Filing", status: "draft", uploadDate: "2024-01-18" },
    ],
    terms: {
      advanceRate: 80,
      factorFee: 3.0,
      minimumFee: 300,
      creditLimit: 150000,
      termLength: 45,
    },
    lastActivity: "2024-01-18",
    createdBy: "Admin User",
    notes: "New client, requires additional documentation",
  },
  {
    id: "CT-2024-003",
    title: "Supply Chain Finance",
    client: "DEF Industries",
    clientEmail: "procurement@defindustries.com",
    type: "Supply Chain",
    status: "expired",
    value: 500000,
    startDate: "2023-06-01",
    endDate: "2024-01-01",
    riskLevel: "high",
    utilization: 90,
    documents: [
      {
        name: "Supply Chain Agreement",
        status: "expired",
        uploadDate: "2023-06-01",
      },
      {
        name: "Supplier Agreements",
        status: "expired",
        uploadDate: "2023-06-01",
      },
    ],
    terms: {
      advanceRate: 75,
      factorFee: 3.5,
      minimumFee: 1000,
      creditLimit: 500000,
      termLength: 90,
    },
    lastActivity: "2024-01-01",
    createdBy: "Admin User",
    notes: "Contract expired, renewal under discussion",
  },
];

// Mock data for templates
const templatesData = [
  {
    id: "TPL-001",
    name: "Standard Trade Finance Agreement",
    description:
      "Comprehensive trade finance agreement for established businesses",
    category: "Trade Finance",
    version: "2.1",
    lastModified: "2024-01-10",
    usage: 45,
    status: "active",
    content: `TRADE FINANCE AGREEMENT

This Trade Finance Agreement ("Agreement") is entered into on [DATE] between Safar Capital ("Lender") and [CLIENT_NAME] ("Borrower").

TERMS AND CONDITIONS:
1. Credit Limit: $[CREDIT_LIMIT]
2. Advance Rate: [ADVANCE_RATE]%
3. Factor Fee: [FACTOR_FEE]%
4. Term Length: [TERM_LENGTH] days

[Additional terms and conditions...]`,
    fields: [
      {
        name: "CLIENT_NAME",
        label: "Client Name",
        type: "text",
        required: true,
      },
      {
        name: "CREDIT_LIMIT",
        label: "Credit Limit",
        type: "number",
        required: true,
      },
      {
        name: "ADVANCE_RATE",
        label: "Advance Rate (%)",
        type: "number",
        required: true,
      },
      {
        name: "FACTOR_FEE",
        label: "Factor Fee (%)",
        type: "number",
        required: true,
      },
      {
        name: "TERM_LENGTH",
        label: "Term Length (days)",
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "TPL-002",
    name: "Invoice Factoring Contract",
    description: "Standard invoice factoring agreement with recourse options",
    category: "Factoring",
    version: "1.8",
    lastModified: "2024-01-05",
    usage: 32,
    status: "active",
    content: `INVOICE FACTORING AGREEMENT

This Invoice Factoring Agreement ("Agreement") is made between Safar Capital ("Factor") and [CLIENT_NAME] ("Client").

FACTORING TERMS:
1. Advance Rate: [ADVANCE_RATE]%
2. Factor Fee: [FACTOR_FEE]%
3. Minimum Fee: $[MINIMUM_FEE]
4. Credit Limit: $[CREDIT_LIMIT]

[Additional factoring terms...]`,
    fields: [
      {
        name: "CLIENT_NAME",
        label: "Client Name",
        type: "text",
        required: true,
      },
      {
        name: "ADVANCE_RATE",
        label: "Advance Rate (%)",
        type: "number",
        required: true,
      },
      {
        name: "FACTOR_FEE",
        label: "Factor Fee (%)",
        type: "number",
        required: true,
      },
      {
        name: "MINIMUM_FEE",
        label: "Minimum Fee ($)",
        type: "number",
        required: true,
      },
      {
        name: "CREDIT_LIMIT",
        label: "Credit Limit ($)",
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "TPL-003",
    name: "Supply Chain Finance Terms",
    description: "Comprehensive supply chain financing agreement",
    category: "Supply Chain",
    version: "3.0",
    lastModified: "2023-12-20",
    usage: 18,
    status: "draft",
    content: `SUPPLY CHAIN FINANCE AGREEMENT

This Supply Chain Finance Agreement is between Safar Capital and [CLIENT_NAME].

SUPPLY CHAIN TERMS:
1. Maximum Facility: $[CREDIT_LIMIT]
2. Advance Rate: [ADVANCE_RATE]%
3. Discount Rate: [FACTOR_FEE]%
4. Payment Terms: [TERM_LENGTH] days

[Supply chain specific terms...]`,
    fields: [
      {
        name: "CLIENT_NAME",
        label: "Client Name",
        type: "text",
        required: true,
      },
      {
        name: "CREDIT_LIMIT",
        label: "Credit Limit ($)",
        type: "number",
        required: true,
      },
      {
        name: "ADVANCE_RATE",
        label: "Advance Rate (%)",
        type: "number",
        required: true,
      },
      {
        name: "FACTOR_FEE",
        label: "Discount Rate (%)",
        type: "number",
        required: true,
      },
      {
        name: "TERM_LENGTH",
        label: "Payment Terms (days)",
        type: "number",
        required: true,
      },
    ],
  },
];

export default function ContractManagementPage() {
  const { toast } = useToast();
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isNewContractOpen, setIsNewContractOpen] = useState(false);
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false);
  const [isGenerateContractOpen, setIsGenerateContractOpen] = useState(false);
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedContractForRejection, setSelectedContractForRejection] =
    useState<any>(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [contractFormData, setContractFormData] = useState<any>({});
  const [templateFormData, setTemplateFormData] = useState<any>({});

  // Client dropdown state
  const [clients, setClients] = useState<any[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clientsError, setClientsError] = useState(false);
  const [clientsPage, setClientsPage] = useState(1);
  const [hasMoreClients, setHasMoreClients] = useState(true);
  const [totalClientsPages, setTotalClientsPages] = useState(1);

  // Contracts data state
  const [contracts, setContracts] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContracts = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await makeRequest({
        url: getAllContractsApiCall,
        method: "GET",
        params: {
          page_number: page,
          // Add any other query parameters if needed
        },
      });

      const data = response.data;
      if (data.success) {
        setContracts(data.result);
        setTotalRecords(data.total_records);
        setCurrentPage(data.page_number);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts(currentPage);
  }, [currentPage]); // Re-fetch when page changes

  useEffect(() => {
    if (isNewContractOpen) {
      // Reset states and fetch first page
      setClients([]);
      setClientsPage(1);
      setHasMoreClients(true);
      setClientsError(false);
      fetchClients(1, false);
    }
  }, [isNewContractOpen]);

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Expired: "bg-red-100 text-red-800",
      approval_required: "bg-blue-100 text-blue-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return (
      variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };
    return variants[risk as keyof typeof variants] || variants.low;
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
      case "verified":
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending_signature":
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "draft":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "expired":
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.contract_title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contract.company_id.legal_company_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      contract.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const fetchClients = async (page = 1, append = false) => {
    try {
      setClientsLoading(true);
      setClientsError(false);

      const response = await makeRequest({
        url: getCompanyListApiCall,
        method: "GET",
        params: {
          page_number: page,
          page_size: 20, // Fetch 20 records at a time
        },
      });

      if (response.data.success) {
        setClients((prev) =>
          append ? [...prev, ...response.data.result] : response.data.result
        );
        setTotalClientsPages(response.data.total_pages);
        setHasMoreClients(page < response.data.total_pages);
        setClientsPage(page);
      } else {
        setClientsError(true);
        toast({
          title: "Error",
          description: "Failed to fetch clients. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClientsError(true);
      toast({
        title: "Error",
        description: "Failed to fetch clients. Please try again.",
        variant: "error",
      });
    } finally {
      setClientsLoading(false);
    }
  };

  const handleCreateContract = async () => {
    try {
      // Validate required fields
      if (
        !contractFormData.clientId ||
        !contractFormData.contractType
        // !contractFormData.value
      ) {
        toast({
          title: "Error",
          description:
            "Please fill in all required fields (Client, Contract Type, and Amount)",
          variant: "error",
        });
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("company_id", contractFormData.clientId);
      formData.append("contract_title", contractFormData.contractType);
      // formData.append(
      //   "contract_description",
      //   contractFormData.description || ""
      // );
      // formData.append("value", contractFormData.value);
      // formData.append("start_date", contractFormData.startDate);
      // formData.append("end_date", contractFormData.endDate);

      if (contractFormData.contractImage) {
        formData.append(
          "admin_signed_contract",
          contractFormData.contractImage
        );
      }

      // Make API call to create contract
      const response = await makeRequest({
        url: createAndUpdateContractApiCall,
        method: "POST",
        data: formData,
      });

      if (response.data.success) {
        // Refresh the contracts list
        fetchContracts(currentPage);
        setIsNewContractOpen(false);
        setContractFormData({});
        alert("Contract created successfully");
      }
    } catch (error) {
      console.error("Error creating contract:", error);
      alert("Failed to create contract. Please try again.");
    }
  };

  const handleGenerateContract = () => {
    console.log(
      "Generating contract from template:",
      selectedTemplate,
      templateFormData
    );
    setIsGenerateContractOpen(false);
    setTemplateFormData({});
    // Here you would generate the contract from the template
  };

  const handleSendForSignature = (contractId: string) => {
    console.log("Sending contract for signature:", contractId);
    // Here you would integrate with DocuSign or similar service
  };

  const getDocumentUrl = (path: string) => {
    if (!path) return "";
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${path.replace(/\\/g, "/")}`;
  };

  const handleDownloadDocument = async (
    documentPath: string,
    fileName: string
  ) => {
    try {
      const url = getDocumentUrl(documentPath);
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Error",
        description: "Failed to download document. Please try again.",
        variant: "error",
      });
    }
  };

  const handleViewDocument = (documentPath: string) => {
    const url = getDocumentUrl(documentPath);
    window.open(url, "_blank");
  };

  const handleUpdateStatus = async (
    contractId: string,
    newStatus: string,
    statusDescription?: string
  ) => {
    try {
      setIsStatusUpdating(true);
      const data = {
        _id: contractId,
        status: newStatus,
        ...(statusDescription && { status_description: statusDescription }),
      };

      const response = await makeRequest({
        url: contractUpdateStatusApiCall,
        method: "POST",
        data,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Information updated successfully",
          variant: "success",
        });

        // Reset rejection states if needed
        if (newStatus === "Rejected") {
          setRejectionReason("");
          setIsRejectionDialogOpen(false);
          setSelectedContractForRejection(null);
        }

        // Refresh the contracts list
        await fetchContracts(currentPage);
      } else {
        // Handle unsuccessful response
        toast({
          title: "Error",
          description:
            response.data.message ||
            "Failed to update contract status. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error updating contract status:", error);
      toast({
        title: "Error",
        description: "Failed to update contract status. Please try again.",
        variant: "error",
      });
    } finally {
      // Ensure loading state is always reset
      setIsStatusUpdating(false);
      // Reset rejection dialog state if it was open
      if (isRejectionDialogOpen) {
        setIsRejectionDialogOpen(false);
        setRejectionReason("");
        setSelectedContractForRejection(null);
      }
    }
  };

  const handleStatusAction = (contractId: string, newStatus: string) => {
    if (newStatus === "Active") {
      handleUpdateStatus(contractId, newStatus);
    } else if (newStatus === "Rejected") {
      setSelectedContractForRejection(contractId);
      setIsRejectionDialogOpen(true);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Contract Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsNewContractOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList> */}

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Contracts
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRecords}</div>
                <p className="text-xs text-muted-foreground">
                  {
                    contracts.filter((c) => c.status.toLowerCase() === "active")
                      .length
                  }{" "}
                  active
                </p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {contracts
                    .reduce((sum, c) => sum + (Number(c.value) || 0), 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Portfolio value</p>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Signatures
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    contracts.filter(
                      (c) => c.status.toLowerCase() === "pending"
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting execution
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="approval_required">
                  Approval Required
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contracts Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead>Contract ID</TableHead> */}
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead>Value</TableHead> */}
                  <TableHead>Actions</TableHead>
                  <TableHead>Update Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredContracts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No contracts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContracts.map((contract) => (
                    <TableRow key={contract._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {contract.company_id.legal_company_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {contract.contract_title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Contract</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadge(
                            contract?.is_expired ? "Expired" : contract.status
                          )}
                        >
                          {contract?.is_expired ? "Expired" : contract.status}
                        </Badge>
                      </TableCell>
                      {/* <TableCell>
                          ${Number(contract.value || 0).toLocaleString()}
                        </TableCell> */}
                      <TableCell>
                        <div className="flex items-center gap-0">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedContract(contract)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  {selectedContract?.contract_title}
                                </DialogTitle>
                                <DialogDescription>
                                  Contract ID: {selectedContract?._id}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedContract && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h4 className="font-semibold">
                                        Client Information
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p>
                                          <strong>Client:</strong>{" "}
                                          {
                                            selectedContract.company_id
                                              .legal_company_name
                                          }
                                        </p>

                                        <p>
                                          <strong>Type:</strong> Contract
                                        </p>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <h4 className="font-semibold">
                                        Contract Details
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        {/* <p>
                                          <strong>Value:</strong> $
                                          {Number(
                                            selectedContract.value || 0
                                          ).toLocaleString()}
                                        </p>
                                        <p>
                                          <strong>Start Date:</strong>{" "}
                                          {new Date(
                                            selectedContract.start_date
                                          ).toLocaleDateString()}
                                        </p>
                                        <p>
                                          <strong>End Date:</strong>{" "}
                                          {new Date(
                                            selectedContract.end_date
                                          ).toLocaleDateString()}
                                        </p>
                                        <p>
                                          <strong>Description:</strong>{" "}
                                          {selectedContract.contract_description ||
                                            "N/A"}
                                        </p> */}
                                        <p>
                                          <strong>Status:</strong>{" "}
                                          {selectedContract.is_expired ? (
                                            <Badge
                                              className={getStatusBadge(
                                                "Expired"
                                              )}
                                            >
                                              Expired
                                            </Badge>
                                          ) : (
                                            <Badge
                                              className={getStatusBadge(
                                                selectedContract.status
                                              )}
                                            >
                                              {selectedContract.status}
                                            </Badge>
                                          )}
                                        </p>
                                        {selectedContract.status_description && (
                                          <p>
                                            <strong>Status Description:</strong>{" "}
                                            {
                                              selectedContract.status_description
                                            }
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Documents</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                          {getDocumentStatusIcon(
                                            selectedContract.status
                                          )}
                                          <div>
                                            <p className="font-medium">
                                              Seller Contract Document
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                              {
                                                selectedContract.seller_contract_document
                                              }
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {selectedContract.seller_contract_document ? (
                                            <>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                  handleDownloadDocument(
                                                    selectedContract.seller_contract_document,
                                                    `seller_contract${selectedContract.seller_contract_document.substring(
                                                      selectedContract.seller_contract_document.lastIndexOf(
                                                        "."
                                                      )
                                                    )}`
                                                  )
                                                }
                                              >
                                                <Download className="h-4 w-4 mr-1" />
                                              </Button>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                  handleViewDocument(
                                                    selectedContract.seller_contract_document
                                                  )
                                                }
                                              >
                                                <Eye className="h-4 w-4 mr-1" />
                                              </Button>
                                            </>
                                          ) : (
                                            <span className="text-sm text-muted-foreground">
                                              Document not available
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                          {getDocumentStatusIcon(
                                            selectedContract.status
                                          )}
                                          <div>
                                            <p className="font-medium">
                                              Admin Signed Contract
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                              {selectedContract.admin_signed_contract ||
                                                "No document uploaded"}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {selectedContract.admin_signed_contract ? (
                                            <>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                  handleDownloadDocument(
                                                    selectedContract.admin_signed_contract,
                                                    `admin_signed_contract${selectedContract.admin_signed_contract.substring(
                                                      selectedContract.admin_signed_contract.lastIndexOf(
                                                        "."
                                                      )
                                                    )}`
                                                  )
                                                }
                                              >
                                                <Download className="h-4 w-4 mr-1" />
                                              </Button>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                  handleViewDocument(
                                                    selectedContract.admin_signed_contract
                                                  )
                                                }
                                              >
                                                <Eye className="h-4 w-4 mr-1" />
                                              </Button>
                                            </>
                                          ) : (
                                            <span className="text-sm text-muted-foreground">
                                              Document not available
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-semibold">
                                      Status Description
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedContract.contract_description ||
                                        "No status description available"}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          {/* <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                          </Button> */}
                          {/* <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          </Button> */}
                        </div>
                      </TableCell>
                      <TableCell>
                        {!contract.is_expired && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusAction(contract._id, "Active")
                                }
                                disabled={isStatusUpdating}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {isStatusUpdating
                                  ? "Updating..."
                                  : "Mark as Active"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusAction(contract._id, "Rejected")
                                }
                                className="text-red-600"
                                disabled={isStatusUpdating}
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                {isStatusUpdating
                                  ? "Updating..."
                                  : "Mark as Rejected"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        {contract.is_expired && (
                          <span className="text-xs text-muted-foreground">
                            Cannot update expired contract
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * 10 + 1} to{" "}
                  {Math.min(currentPage * 10, totalRecords)} of {totalRecords}{" "}
                  entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        {/* <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contract Templates</h3>
            <Button onClick={() => setIsNewTemplateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templatesData.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusBadge(template.status)}>
                      {template.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{template.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Version:</span>
                      <span className="font-medium">{template.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage:</span>
                      <span className="font-medium">
                        {template.usage} contracts
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Modified:</span>
                      <span className="font-medium">
                        {template.lastModified}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>
                              {template.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-muted/10">
                              <pre className="whitespace-pre-wrap text-sm">
                                {template.content}
                              </pre>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold">Template Fields</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {template.fields.map((field, index) => (
                                  <div
                                    key={index}
                                    className="p-2 border rounded text-sm"
                                  >
                                    <strong>{field.label}</strong> ({field.type}
                                    )
                                    {field.required && (
                                      <span className="text-red-500">*</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isGenerateContractOpen}
                        onOpenChange={setIsGenerateContractOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Generate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              Generate Contract from Template
                            </DialogTitle>
                            <DialogDescription>
                              Fill in the template fields to generate a new
                              contract
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTemplate && (
                            <div className="space-y-4">
                              {selectedTemplate.fields.map(
                                (field: any, index: number) => (
                                  <div key={index} className="space-y-2">
                                    <Label htmlFor={field.name}>
                                      {field.label}
                                      {field.required && (
                                        <span className="text-red-500">*</span>
                                      )}
                                    </Label>
                                    <Input
                                      id={field.name}
                                      type={field.type}
                                      value={templateFormData[field.name] || ""}
                                      onChange={(e) =>
                                        setTemplateFormData({
                                          ...templateFormData,
                                          [field.name]: e.target.value,
                                        })
                                      }
                                      required={field.required}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsGenerateContractOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleGenerateContract}>
                              Generate Contract
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent> */}

        {/* <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>DocuSign Integration</CardTitle>
                <CardDescription>
                  Configure digital signature settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>DocuSign API Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Connected and active
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    defaultValue="••••••••••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    defaultValue="https://api.safarcapital.com/webhooks/docusign"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-id">Account ID</Label>
                  <Input
                    id="account-id"
                    defaultValue="12345678-1234-1234-1234-123456789012"
                  />
                </div>
                <Button>Update DocuSign Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Settings</CardTitle>
                <CardDescription>
                  Configure default contract terms and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-advance-rate">
                      Default Advance Rate (%)
                    </Label>
                    <Input
                      id="default-advance-rate"
                      type="number"
                      defaultValue="85"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-factor-fee">
                      Default Factor Fee (%)
                    </Label>
                    <Input
                      id="default-factor-fee"
                      type="number"
                      step="0.1"
                      defaultValue="2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-minimum-fee">
                      Default Minimum Fee ($)
                    </Label>
                    <Input
                      id="default-minimum-fee"
                      type="number"
                      defaultValue="500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-term-length">
                      Default Term Length (days)
                    </Label>
                    <Input
                      id="default-term-length"
                      type="number"
                      defaultValue="60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract-numbering">
                    Contract Numbering Format
                  </Label>
                  <Input
                    id="contract-numbering"
                    defaultValue="CT-{YYYY}-{###}"
                  />
                  <p className="text-sm text-muted-foreground">
                    Use {"{YYYY}"} for year, {"{MM}"} for month, {"{###}"} for
                    sequential number
                  </p>
                </div>
                <Button>Save Contract Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure contract-related notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract-created" defaultChecked />
                    <Label htmlFor="contract-created">
                      Notify when new contract is created
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract-signed" defaultChecked />
                    <Label htmlFor="contract-signed">
                      Notify when contract is signed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract-expiring" defaultChecked />
                    <Label htmlFor="contract-expiring">
                      Notify when contract is expiring (30 days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="signature-pending" defaultChecked />
                    <Label htmlFor="signature-pending">
                      Notify when signature is pending (7 days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="compliance-issues" defaultChecked />
                    <Label htmlFor="compliance-issues">
                      Notify about compliance issues
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    defaultValue="admin@safarcapital.com"
                  />
                </div>
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Configure document storage and retention policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="retention-period">
                    Document Retention Period (years)
                  </Label>
                  <Input id="retention-period" type="number" defaultValue="7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage-location">Storage Location</Label>
                  <Select defaultValue="aws-s3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws-s3">AWS S3</SelectItem>
                      <SelectItem value="azure-blob">
                        Azure Blob Storage
                      </SelectItem>
                      <SelectItem value="google-cloud">
                        Google Cloud Storage
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                  <Input id="max-file-size" type="number" defaultValue="50" />
                </div>
                <div className="space-y-4">
                  <Label>Allowed File Types</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf" defaultChecked />
                      <Label htmlFor="pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="docx" defaultChecked />
                      <Label htmlFor="docx">DOCX</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="xlsx" defaultChecked />
                      <Label htmlFor="xlsx">XLSX</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="jpg" />
                      <Label htmlFor="jpg">JPG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="png" />
                      <Label htmlFor="png">PNG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="txt" />
                      <Label htmlFor="txt">TXT</Label>
                    </div>
                  </div>
                </div>
                <Button>Save Document Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}
      </Tabs>

      <Dialog open={isNewContractOpen} onOpenChange={setIsNewContractOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Create New Contract</DialogTitle>
            <DialogDescription>
              Enter the details for the new contract
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow pr-2 -mr-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client">Select Client</Label>
                <Select
                  value={contractFormData.clientId || ""}
                  onValueChange={(value) =>
                    setContractFormData({
                      ...contractFormData,
                      clientId: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        clientsLoading && clients.length === 0
                          ? "Fetching clients..."
                          : clientsError && clients.length === 0
                          ? "Error loading clients"
                          : "Select a client"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent
                    className="w-full z-50 max-h-[300px]"
                    position="popper"
                    side="bottom"
                    align="start"
                    onScroll={(e) => {
                      const target = e.target as HTMLDivElement;
                      if (
                        !clientsLoading &&
                        hasMoreClients &&
                        target.scrollTop + target.clientHeight >=
                          target.scrollHeight - 50
                      ) {
                        fetchClients(clientsPage + 1, true);
                      }
                    }}
                  >
                    {clientsError && clients.length === 0 ? (
                      <div className="p-2 text-center">
                        <p className="text-sm text-red-500 mb-2">
                          Failed to load clients
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchClients(1, false)}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : (
                      <>
                        {clients.map((client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {client.legal_company_name}
                          </SelectItem>
                        ))}
                        {clientsLoading && (
                          <div className="p-2 text-center">
                            <span className="text-sm text-muted-foreground">
                              Loading...
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract-type">Contract Type</Label>
                <Select
                  value={contractFormData.contractType || ""}
                  onValueChange={(value) =>
                    setContractFormData({
                      ...contractFormData,
                      contractType: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent
                    className="w-full z-50"
                    position="popper"
                    side="bottom"
                    align="start"
                  >
                    <SelectItem value="standard">Standard Contract</SelectItem>
                    <SelectItem value="special">Special Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Contract Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={contractFormData.startDate || ""}
                    onChange={(e) =>
                      setContractFormData({
                        ...contractFormData,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Contract End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={contractFormData.endDate || ""}
                    onChange={(e) =>
                      setContractFormData({
                        ...contractFormData,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Contract Amount ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="Enter contract amount"
                    value={contractFormData.value || ""}
                    onChange={(e) =>
                      setContractFormData({
                        ...contractFormData,
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="description">Contract Description</Label>
                <Textarea
                  id="description"
                  value={contractFormData.description || ""}
                  onChange={(e) =>
                    setContractFormData({
                      ...contractFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter contract description..."
                />
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="contract-image">Contract Document</Label>
                <Input
                  id="contract-image"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setContractFormData({
                      ...contractFormData,
                      contractImage: e.target.files?.[0] || null,
                    })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Upload contract image or PDF (Max size: 5MB)
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsNewContractOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateContract}>Create Contract</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Modal */}
      <CustomModal
        isOpen={isRejectionDialogOpen}
        onClose={() => {
          setIsRejectionDialogOpen(false);
          setRejectionReason("");
          setSelectedContractForRejection(null);
        }}
        title="Enter Rejection Reason"
        description="Please provide a reason for rejecting this contract."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">Reason</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px] w-full"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectionDialogOpen(false);
                setRejectionReason("");
                setSelectedContractForRejection(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!rejectionReason.trim()) {
                  toast({
                    title: "Error",
                    description: "Please enter a rejection reason",
                    variant: "error",
                  });
                  return;
                }
                handleUpdateStatus(
                  selectedContractForRejection,
                  "Rejected",
                  rejectionReason.trim()
                );
              }}
              disabled={isStatusUpdating}
            >
              {isStatusUpdating ? "Updating..." : "Submit"}
            </Button>
          </div>
        </div>
      </CustomModal>

      <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a new contract template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="e.g., Standard Trade Finance Agreement"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Factoring-and-Security-Agreement">
                      Factoring and Security Agreement
                    </SelectItem>
                    <SelectItem value="Special-Power-of-Attorney">
                      Special Power of Attorney
                    </SelectItem>
                    <SelectItem value="Bill-of-Sale">Bill of Sale</SelectItem>
                    <SelectItem value="Corporate-Resolutions">
                      Corporate Resolutions
                    </SelectItem>
                    <SelectItem value="Intercreditor-Agreement">
                      Intercreditor Agreement
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Input
                id="template-description"
                placeholder="Brief description of the template"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea
                id="template-content"
                className="min-h-[300px]"
                placeholder="Enter the template content with placeholders like [CLIENT_NAME], [CREDIT_LIMIT], etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewTemplateOpen(false)}
            >
              Cancel
            </Button>
            <Button>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
