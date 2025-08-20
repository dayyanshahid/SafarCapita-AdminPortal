"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Building2,
  User,
  AlertTriangle,
  MoreHorizontal,
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  sellerId: string;
  sellerName: string;
  documentType: string;
  fileName: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  reviewer?: string;
  reviewDate?: string;
  notes?: string;
  priority: "low" | "medium" | "high";
  fileSize: string;
  category: "identity" | "business" | "financial" | "compliance";
}

const mockDocuments: Document[] = [
  {
    id: "doc-001",
    sellerId: "seller-001",
    sellerName: "Global Trade Corp",
    documentType: "Business Registration",
    fileName: "business_registration.pdf",
    uploadDate: "2024-01-15T10:30:00Z",
    status: "pending",
    priority: "high",
    fileSize: "2.4 MB",
    category: "business",
  },
  {
    id: "doc-002",
    sellerId: "seller-002",
    sellerName: "Export Solutions Ltd",
    documentType: "Tax Certificate",
    fileName: "tax_certificate_2024.pdf",
    uploadDate: "2024-01-14T14:20:00Z",
    status: "approved",
    reviewer: "John Smith",
    reviewDate: "2024-01-15T09:15:00Z",
    priority: "medium",
    fileSize: "1.8 MB",
    category: "compliance",
  },
  {
    id: "doc-003",
    sellerId: "seller-003",
    sellerName: "International Traders Inc",
    documentType: "Financial Statements",
    fileName: "financial_statements_2023.pdf",
    uploadDate: "2024-01-13T16:45:00Z",
    status: "under_review",
    reviewer: "Sarah Johnson",
    priority: "high",
    fileSize: "5.2 MB",
    category: "financial",
  },
  {
    id: "doc-004",
    sellerId: "seller-001",
    sellerName: "Global Trade Corp",
    documentType: "Director ID",
    fileName: "director_passport.pdf",
    uploadDate: "2024-01-12T11:30:00Z",
    status: "rejected",
    reviewer: "Mike Wilson",
    reviewDate: "2024-01-13T10:20:00Z",
    notes: "Document quality is poor, please resubmit with clearer image",
    priority: "medium",
    fileSize: "3.1 MB",
    category: "identity",
  },
  {
    id: "doc-005",
    sellerId: "seller-004",
    sellerName: "Maritime Logistics Co",
    documentType: "Bank Statement",
    fileName: "bank_statement_dec_2023.pdf",
    uploadDate: "2024-01-11T09:15:00Z",
    status: "approved",
    reviewer: "Lisa Chen",
    reviewDate: "2024-01-12T14:30:00Z",
    priority: "low",
    fileSize: "4.7 MB",
    category: "financial",
  },
];

export default function SellerDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || doc.category === categoryFilter;
    const matchesPriority =
      priorityFilter === "all" || doc.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "under_review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "identity":
        return <User className="h-4 w-4" />;
      case "business":
        return <Building2 className="h-4 w-4" />;
      case "financial":
        return <FileText className="h-4 w-4" />;
      case "compliance":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleDocumentAction = (
    documentId: string,
    action: "approve" | "reject",
    notes?: string
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: action === "approve" ? "approved" : "rejected",
              reviewer: "Current Admin",
              reviewDate: new Date().toISOString(),
              notes: notes || doc.notes,
            }
          : doc
      )
    );
  };

  const handleBulkAction = (action: "approve" | "reject") => {
    const notes = reviewNotes.trim();
    selectedDocuments.forEach((docId) => {
      handleDocumentAction(docId, action, notes);
    });
    setSelectedDocuments([]);
    setReviewNotes("");
    setShowBulkActions(false);
  };

  const toggleDocumentSelection = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId)
        ? prev.filter((id) => id !== documentId)
        : [...prev, documentId]
    );
  };

  const stats = {
    total: documents.length,
    pending: documents.filter((d) => d.status === "pending").length,
    approved: documents.filter((d) => d.status === "approved").length,
    rejected: documents.filter((d) => d.status === "rejected").length,
    underReview: documents.filter((d) => d.status === "under_review").length,
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-900">
            Document Management
          </h1>
          <p className="text-red-600 mt-1">
            Review and verify seller documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {selectedDocuments.length > 0 && (
            <Button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="bg-red-600 hover:bg-red-700"
              size="sm"
            >
              Bulk Actions ({selectedDocuments.length})
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-700">
                  {stats.pending}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {stats.underReview}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-700">
                  {stats.approved}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.rejected}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions Panel */}
      {showBulkActions && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-red-900">
                Bulk Actions for {selectedDocuments.length} documents
              </h3>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">
                  Review Notes
                </label>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes for bulk action..."
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleBulkAction("approve")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Selected
                </Button>
                <Button
                  onClick={() => handleBulkAction("reject")}
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
                <Button
                  onClick={() => setShowBulkActions(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents, sellers, or file names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="identity">Identity</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  selectedDocuments.includes(document.id)
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(document.id)}
                      onChange={() => toggleDocumentSelection(document.id)}
                      className="mt-1 h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(document.category)}
                          <h3 className="font-semibold text-gray-900">
                            {document.documentType}
                          </h3>
                        </div>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            document.status
                          )}`}
                        >
                          {document.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <Badge
                          className={`text-xs ${getPriorityColor(
                            document.priority
                          )}`}
                        >
                          {document.priority === "high" && (
                            <Star className="h-3 w-3 mr-1" />
                          )}
                          {document.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Seller:</span>
                          <div className="font-medium">
                            {document.sellerName}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">File:</span>
                          <div className="font-medium">{document.fileName}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Size:</span>
                          <div className="font-medium">{document.fileSize}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Uploaded:</span>
                          <div className="font-medium">
                            {new Date(document.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {document.reviewer && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">Reviewed by:</span>
                          <span className="font-medium ml-1">
                            {document.reviewer}
                          </span>
                          {document.reviewDate && (
                            <span className="text-gray-500 ml-2">
                              on{" "}
                              {new Date(
                                document.reviewDate
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}

                      {document.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <span className="text-gray-600">Notes:</span>
                          <div className="mt-1">{document.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    {document.status === "pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleDocumentAction(document.id, "approve")
                          }
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            handleDocumentAction(
                              document.id,
                              "reject",
                              "Requires review"
                            )
                          }
                          size="sm"
                          variant="destructive"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No documents found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
