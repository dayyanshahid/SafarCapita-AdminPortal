"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import makeRequest from "@/Api's/ApiHelper";
import {
  getAllAdminUsersApiCall,
  getAllRolesApiCall,
  addAdminUserApiCall,
  updateAdminUserApiCall,
} from "@/Api's/repo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Search,
  UserPlus,
  Mail,
  Calendar,
  Shield,
  Activity,
  Lock,
  Unlock,
  Download,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { useDispatch } from "react-redux";
import { showToast } from "@/redux/actions";

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    department: string;
    status: string;
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [usersResponse, rolesResponse] = await Promise.all([
        makeRequest({
          url: getAllAdminUsersApiCall,
          method: "GET",
        }),
        makeRequest({
          url: getAllRolesApiCall,
          method: "GET",
        }),
      ]);

      if (rolesResponse?.data?.success) {
        setRoles(rolesResponse.data.result);
      }

      if (usersResponse?.data?.success) {
        const mappedUsers = usersResponse.data.result.map((user: any) => ({
          id: user._id, // auth_id
          employeeId: user.employee._id, // employee id for updates
          name: user.employee.first_name || "",
          email: user.email,
          phone: user.phone || "",
          role: user.role,
          roleId: user.role_id,
          status: user.is_active === "true" ? "active" : "inactive",
          lastLogin: null,
          createdAt: user.createdAt,
          avatar: "/placeholder.svg?height=40&width=40",
          department: user?.employee?.department || "",
          loginCount: 0,
          isOnline: false,
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (values: FormData) => {
    try {
      const apiFormData = new FormData();
      apiFormData.append("first_name", values.name);
      apiFormData.append("email", values.email);
      apiFormData.append("password", values.password);
      apiFormData.append("phone", values.phone || "");
      apiFormData.append("department", values.department || "");
      apiFormData.append("role_id", values.role);
      apiFormData.append("created_by", "689b40ed93cd06f6a42ed6bc"); // Replace with actual logged in user ID
      apiFormData.append("is_active", "true");
      apiFormData.append("is_admin", "true");

      const response = await makeRequest({
        url: addAdminUserApiCall,
        method: "POST",
        data: apiFormData,
      });

      if (response?.data?.success) {
        dispatch(
          showToast({
            id: Date.now().toString(),
            type: "success",
            message: response.data.message || "User added successfully",
            duration: 5000,
          })
        );

        // Only on success: Reset form and close dialog
        setIsCreateUserOpen(false);

        // Refresh users list
        try {
          setIsLoading(true);
          const [usersResponse, rolesResponse] = await Promise.all([
            makeRequest({
              url: getAllAdminUsersApiCall,
              method: "GET",
            }),
            makeRequest({
              url: getAllRolesApiCall,
              method: "GET",
            }),
          ]);

          if (rolesResponse?.data?.success) {
            setRoles(rolesResponse.data.result);
          }

          if (usersResponse?.data?.success) {
            const mappedUsers = usersResponse.data.result.map((user: any) => ({
              id: user._id,
              name: user.employee.first_name || "",
              email: user.email,
              phone: user.phone || "",
              role: user.role,
              roleId: user.role_id,
              status: user.is_active === "true" ? "active" : "inactive",
              lastLogin: null,
              createdAt: user.createdAt,
              avatar: "/placeholder.svg?height=40&width=40",
              department: user?.employee?.department || "",
              loginCount: 0,
              isOnline: false,
            }));
            setUsers(mappedUsers);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // If API returns error, keep the form data
        throw new Error(response.data.message || "Failed to create user");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      dispatch(
        showToast({
          id: Date.now().toString(),
          type: "error",
          message: error.message || "Failed to create user. Please try again.",
          duration: 5000,
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    "IT",
    "Operations",
    "Risk Management",
    "Finance",
    "Legal",
    "Compliance",
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLastLogin = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // handleCreateUser is already defined above

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setTimeout(() => {
      setIsEditUserOpen(true);
    }, 0);
  };

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await makeRequest({
        url: updateAdminUserApiCall,
        method: "POST",
        data: {
          _id: userToDelete?.employeeId, // Using employee ID for delete
          action_type: 3, // 3 for delete
        },
      });

      if (response?.data?.success) {
        dispatch(
          showToast({
            id: Date.now().toString(),
            type: "success",
            message: response.data.message || "User deleted successfully",
            duration: 5000,
          })
        );
        fetchData(); // Refresh the list
      } else {
        throw new Error(response?.data?.message || "Failed to delete user");
      }
    } catch (error: any) {
      dispatch(
        showToast({
          id: Date.now().toString(),
          type: "error",
          message: error.message || "Failed to delete user",
          duration: 5000,
        })
      );
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: string
  ) => {
    debugger;
    try {
      const response = await makeRequest({
        url: updateAdminUserApiCall,
        method: "POST",
        data: {
          _id: userId, // Using employee ID for deactivate
          is_active: currentStatus == "inactive" ? "true" : "false", // 4 for deactivate
        },
      });

      if (response?.data?.success) {
        dispatch(
          showToast({
            id: Date.now().toString(),
            type: "success",
            message:
              response.data.message ||
              `User ${
                currentStatus === "active" ? "deactivated" : "activated"
              } successfully`,
            duration: 5000,
          })
        );
        fetchData(); // Refresh the list
      } else {
        throw new Error(
          response?.data?.message || "Failed to update user status"
        );
      }
    } catch (error: any) {
      dispatch(
        showToast({
          id: Date.now().toString(),
          type: "error",
          message: error.message || "Failed to update user status",
          duration: 5000,
        })
      );
    }
  };

  interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    department: string;
    status: string;
  }

  const UserFormDialog = ({
    isOpen,
    onClose,
    onSubmit,
    user,
    isEdit = false,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => Promise<any>;
    user?: any;
    isEdit?: boolean;
  }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      phone: user?.phone || "",
      role: user?.roleId || "",
      department: user?.department || "",
      status: user?.status || "active",
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (
        !isEdit &&
        (!formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.role)
      ) {
        dispatch(
          showToast({
            id: Date.now().toString(),
            type: "error",
            message: "Please fill in all required fields",
            duration: 5000,
          })
        );
        return;
      }

      try {
        setIsSubmitting(true);
        const result = await onSubmit(formData);
        // Only close if the API call was successful
        if (result?.data?.success) {
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            department: "",
            status: "active",
          });
          setTimeout(() => {
            onClose();
          }, 0);
        }
      } catch (error: any) {
        console.error("Form submission failed:", error);
        dispatch(
          showToast({
            id: Date.now().toString(),
            type: "error",
            message: error.message || "Failed to submit form",
            duration: 5000,
          })
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open && !isSubmitting) {
            setFormData({
              name: "",
              email: "",
              password: "",
              phone: "",
              role: "",
              department: "",
              status: "active",
            });
            setTimeout(() => {
              onClose();
            }, 0);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? `Edit User: ${user?.name}` : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update user information and permissions."
                : "Create a new user account and assign appropriate permissions."}
            </DialogDescription>
          </DialogHeader>
          <form id="userForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="userEmail">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userPhone">Phone Number</Label>
                <Input
                  id="userPhone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="userPassword">Password</Label>
                <Input
                  id="userPassword"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="userRole">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="userDepartment">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, department: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* {isEdit && (
              <div>
                <Label htmlFor="userStatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )} */}
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" form="userForm" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  {isEdit ? "Saving..." : "Creating..."}
                </div>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const headerActions = (
    <div className="flex gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-64"
        />
      </div>

      <Button className="gap-2" onClick={() => setIsCreateUserOpen(true)}>
        <UserPlus className="h-4 w-4" />
        Add User
      </Button>

      <UserFormDialog
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardHeader title="User Management" actions={headerActions} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
              ) : (
                users.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
              ) : (
                users.filter((u) => u.status === "active").length
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
              ) : (
                `${Math.round(
                  (users.filter((u) => u.status === "active").length /
                    users.length) *
                    100
                )}% of total`
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead>Last Login</TableHead> */}
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        {user?.role?.role_name}
                      </div>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    {/* <TableCell className="text-sm">
                    {formatLastLogin(user.lastLogin)}
                  </TableCell> */}
                    <TableCell className="text-sm">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleUserStatus(
                                user.employeeId,
                                user.status
                              )
                            }
                          >
                            {user.status === "active" ? (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Unlock className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {selectedUser && (
        <UserFormDialog
          isOpen={isEditUserOpen}
          onClose={() => {
            setIsEditUserOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={async (data) => {
            const updateData: any = {
              _id: selectedUser.employeeId,
              first_name: data.name,
              email: data.email,
              phone: data.phone || "",
              department: data.department || "",
              role_id: data.role,
            };

            // Only add password if it's provided
            if (data.password) {
              updateData.password = data.password;
            }

            const response = await makeRequest({
              url: updateAdminUserApiCall,
              method: "POST",
              data: updateData,
            });

            if (response?.data?.success) {
              dispatch(
                showToast({
                  id: Date.now().toString(),
                  type: "success",
                  message: response.data.message || "User updated successfully",
                  duration: 5000,
                })
              );

              // Refresh the users list
              fetchData();
            }

            return response;
          }}
          user={selectedUser}
          isEdit={true}
        />
      )}

      {/* Delete User Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action
              cannot be undone. All user data and access will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
