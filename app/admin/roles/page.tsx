"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield,
  Users,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Settings,
  FileText,
  CreditCard,
  Building2,
  BarChart3,
  Monitor,
  Search,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import makeRequest from "@/Api's/ApiHelper";
import {
  getAllActionsApiCall,
  postRoleApiCall,
  getAllRolesApiCall,
  deleteRoleApiCall,
} from "@/Api's/repo";
import { useToast } from "@/hooks/use-toast";

export default function RolesPermissionsPage() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);

  // Mock data for roles
  interface Action {
    _id: string;
    action_name: string;
    created_at: string;
    updatedAt: string;
    __v: number;
  }

  interface ActionResponse {
    response_code: number;
    success: boolean;
    status_code: number;
    total_records: number;
    page_number: number;
    total_pages: number;
    message: string;
    error_message: null | string;
    token: null | string;
    result: Action[];
  }

  type RolePermissions = {
    [key: string]: {
      view: boolean;
      edit: boolean;
      delete: boolean;
    };
  };

  interface RoleAction {
    _id: string;
    action_name: string;
  }

  interface Role {
    _id: string;
    role_name: string;
    role_actions: RoleAction[];
    description: string;
    created_at: string;
    user_role_count: number;
  }

  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  const fetchRoles = async () => {
    setIsLoadingRoles(true);
    try {
      const response = await makeRequest<{
        success: boolean;
        result: Role[];
        message: string;
      }>({
        url: getAllRolesApiCall,
        method: "GET",
      });

      if (response.data.success) {
        setRoles(response.data.result);
      } else {
        toast.error(response.data.message || "Failed to fetch roles");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("An error occurred while fetching roles");
    } finally {
      // Add a small delay to ensure loading state is visible
      setTimeout(() => {
        setIsLoadingRoles(false);
      }, 500);
    }
  };

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Mock data for testing layout
  const oldRoles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      permissions: {
        dashboard: { view: true, edit: true, delete: true },
        users: { view: true, edit: true, delete: true },
        sellers: { view: true, edit: true, delete: true },
        financing: { view: true, edit: true, delete: true },
        contracts: { view: true, edit: true, delete: true },
        monitoring: { view: true, edit: true, delete: true },
        reports: { view: true, edit: true, delete: true },
        settings: { view: true, edit: true, delete: true },
      },
      createdAt: "2024-01-01",
      isSystem: true,
    },
    {
      id: 2,
      name: "Admin",
      description: "Administrative access with limited system settings",
      userCount: 5,
      permissions: {
        dashboard: { view: true, edit: true, delete: false },
        users: { view: true, edit: true, delete: false },
        sellers: { view: true, edit: true, delete: true },
        financing: { view: true, edit: true, delete: true },
        contracts: { view: true, edit: true, delete: false },
        monitoring: { view: true, edit: true, delete: false },
        reports: { view: true, edit: false, delete: false },
        settings: { view: true, edit: false, delete: false },
      },
      createdAt: "2024-01-15",
      isSystem: false,
    },
    {
      id: 3,
      name: "Operations Manager",
      description: "Manages day-to-day operations and financing requests",
      userCount: 8,
      permissions: {
        dashboard: { view: true, edit: false, delete: false },
        users: { view: true, edit: false, delete: false },
        sellers: { view: true, edit: true, delete: false },
        financing: { view: true, edit: true, delete: false },
        contracts: { view: true, edit: true, delete: false },
        monitoring: { view: true, edit: true, delete: false },
        reports: { view: true, edit: false, delete: false },
        settings: { view: false, edit: false, delete: false },
      },
      createdAt: "2024-02-01",
      isSystem: false,
    },
    {
      id: 4,
      name: "Risk Analyst",
      description: "Focuses on risk assessment and monitoring",
      userCount: 4,
      permissions: {
        dashboard: { view: true, edit: false, delete: false },
        users: { view: false, edit: false, delete: false },
        sellers: { view: true, edit: false, delete: false },
        financing: { view: true, edit: true, delete: false },
        contracts: { view: true, edit: false, delete: false },
        monitoring: { view: true, edit: true, delete: false },
        reports: { view: true, edit: false, delete: false },
        settings: { view: false, edit: false, delete: false },
      },
      createdAt: "2024-02-15",
      isSystem: false,
    },
    {
      id: 5,
      name: "Viewer",
      description: "Read-only access to most system areas",
      userCount: 12,
      permissions: {
        dashboard: { view: true, edit: false, delete: false },
        users: { view: false, edit: false, delete: false },
        sellers: { view: true, edit: false, delete: false },
        financing: { view: true, edit: false, delete: false },
        contracts: { view: true, edit: false, delete: false },
        monitoring: { view: true, edit: false, delete: false },
        reports: { view: true, edit: false, delete: false },
        settings: { view: false, edit: false, delete: false },
      },
      createdAt: "2024-03-01",
      isSystem: false,
    },
  ];

  // Map action names to icons
  const actionIconMap = {
    dashboard: BarChart3,
    "account-management": Users,
    "seller-management": Building2,
    "financing-request": CreditCard,
    "contract-management": FileText,
  };

  // Map action names to display names
  const actionDisplayMap = {
    dashboard: "Dashboard",
    "account-management": "User Management",
    "seller-management": "Seller Management",
    "financing-request": "Financing Requests",
    "contract-management": "Contract Management",
  };

  const [permissionModules, setPermissionModules] = useState<
    Array<{ key: string; name: string; icon: any; _id: string }>
  >([]);

  const filteredRoles = roles.filter(
    (role) =>
      role.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchActions = async () => {
    try {
      const response = await makeRequest<ActionResponse>({
        url: getAllActionsApiCall,
        method: "GET",
      });

      if (response.data.success) {
        const actions = response.data.result.map((action: Action) => {
          const actionName =
            action.action_name as keyof typeof actionDisplayMap;
          return {
            key: action.action_name,
            name: actionDisplayMap[actionName] || action.action_name,
            icon: actionIconMap[actionName] || FileText,
            _id: action._id,
          };
        });
        setPermissionModules(actions);
      }
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  const handleCreateRole = async (
    formData: {
      name: string;
      description: string;
      permissions: RolePermissions;
    },
    editingRole?: Role
  ) => {
    setIsLoading(true);
    try {
      // Get selected action IDs
      const selectedActions = Object.entries(formData.permissions)
        .filter(([_, perms]) => perms.view) // Only include actions that have view permission
        .map(([key]) => {
          const action = permissionModules.find((module) => module.key === key);
          return action?._id;
        })
        .filter(Boolean); // Remove undefined values

      const roleData = {
        role_name: formData.name,
        role_actions: selectedActions,
        user_id: "689b40ed93cd06f6a42ed6bc", // TODO: Get from current user
        created_by: "689b27d0e3c6967475e44c11", // TODO: Get from current user
        description: formData.description,
        owner: "admin",
        ...(editingRole && { _id: editingRole._id }), // Include _id if editing
      };

      const response = await makeRequest({
        url: postRoleApiCall,
        method: "POST",
        data: roleData,
      });

      if (response.data.success) {
        toast.success(
          editingRole
            ? "Role updated successfully"
            : "Role created successfully"
        );
        if (editingRole) {
          setIsEditRoleOpen(false);
          setSelectedRole(null);
        } else {
          setIsCreateRoleOpen(false);
        }
        // Refresh roles list
        fetchRoles();
      } else {
        toast.error(
          response.data.message ||
            `Failed to ${editingRole ? "update" : "create"} role`
        );
      }
    } catch (error) {
      console.error(
        `Error ${editingRole ? "updating" : "creating"} role:`,
        error
      );
      toast.error(
        `An error occurred while ${
          editingRole ? "updating" : "creating"
        } the role`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch actions when dialog opens
  const handleCreateDialogChange = (open: boolean) => {
    if (open) {
      fetchActions();
    }
    setIsCreateRoleOpen(open);
  };

  const handleEditRole = async (role: Role) => {
    try {
      setIsLoading(true);
      await fetchActions(); // Fetch fresh actions before opening edit dialog
      setSelectedRole(role);
      setIsEditRoleOpen(true);
    } catch (error) {
      console.error("Error preparing edit dialog:", error);
      toast.error("Failed to prepare edit dialog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    setIsDeletingId(roleId);
    try {
      const response = await makeRequest({
        url: deleteRoleApiCall,
        method: "POST",
        data: { _id: roleId },
      });

      if (response.data.success) {
        toast.success("Role deleted successfully");
        // Refresh roles list
        await fetchRoles();
      } else {
        toast.error(response.data.message || "Failed to delete role");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("An error occurred while deleting the role");
    } finally {
      setIsDeletingId(null);
    }
  };

  const RoleForm = ({
    role,
    isEdit = false,
    onSubmit,
    isLoading = false,
  }: {
    role?: Role;
    isEdit?: boolean;
    onSubmit: (
      data: {
        name: string;
        description: string;
        permissions: RolePermissions;
      },
      editingRole?: Role
    ) => Promise<void>;
    isLoading?: boolean;
  }) => {
    const [formData, setFormData] = useState<{
      name: string;
      description: string;
      permissions: RolePermissions;
    }>({
      name: "",
      description: "",
      permissions: {},
    });

    // Initialize form data when role or permissionModules change
    useEffect(() => {
      setFormData({
        name: role?.role_name || "",
        description: role?.description || "",
        permissions: Object.fromEntries(
          permissionModules.map((module) => [
            module.key,
            {
              view:
                role?.role_actions?.some(
                  (action: RoleAction) => action.action_name === module.key
                ) || false,
              edit:
                role?.role_actions?.some(
                  (action: RoleAction) => action.action_name === module.key
                ) || false,
              delete:
                role?.role_actions?.some(
                  (action: RoleAction) => action.action_name === module.key
                ) || false,
            },
          ])
        ),
      });
    }, [role, permissionModules]);

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter role name"
            />
          </div>
          <div>
            <Label htmlFor="roleDescription">Description</Label>
            <Textarea
              id="roleDescription"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter role description"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Permissions</h4>
          <div className="space-y-4">
            {permissionModules.map((module) => {
              const ModuleIcon = module.icon;
              const modulePermissions = formData.permissions[module.key] || {
                view: false,
                edit: false,
                delete: false,
              };

              return (
                <Card key={module.key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <ModuleIcon className="h-4 w-4" />
                      {module.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Allow Access
                      </div>
                      <Switch
                        id={`${module.key}-access`}
                        checked={modulePermissions.view}
                        onCheckedChange={(checked) => {
                          setFormData({
                            ...formData,
                            permissions: {
                              ...formData.permissions,
                              [module.key]: {
                                view: checked,
                                edit: checked,
                                delete: checked,
                              },
                            },
                          });
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            disabled={isLoading}
            onClick={() =>
              onSubmit(
                {
                  name: formData.name,
                  description: formData.description,
                  permissions: formData.permissions,
                },
                role
              )
            }
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {isEdit ? "Saving..." : "Creating..."}
              </div>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Role"
            )}
          </Button>
        </div>
      </div>
    );
  };

  const headerActions = (
    <div className="flex gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      <Dialog
        open={isCreateRoleOpen}
        onOpenChange={(open) => {
          if (open) {
            fetchActions();
          }
          setIsCreateRoleOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role with specific permissions for your team members.
            </DialogDescription>
          </DialogHeader>
          <RoleForm onSubmit={handleCreateRole} isLoading={isLoading} />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateRoleOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardHeader title="Roles & Permissions" actions={headerActions} />

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingRoles
              ? // Loading skeletons
                [...Array(6)].map((_, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
                          <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                      <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
                          <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : filteredRoles.map((role) => {
                  return (
                    <Card key={role._id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-lg">
                              {role.role_name}
                            </CardTitle>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleEditRole(role)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              {/* <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Users
                              </DropdownMenuItem> */}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteRole(role._id)}
                                disabled={isDeletingId === role._id}
                                className="text-red-600"
                              >
                                {isDeletingId === role._id ? (
                                  <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Role
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>{role.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Users assigned:
                            </span>
                            <Badge variant="outline">
                              {role.user_role_count}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Created:
                            </span>
                            <span>
                              {new Date(role.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="pt-2">
                            <div className="flex flex-wrap gap-1">
                              {role.role_actions.map((action) => {
                                const moduleInfo = permissionModules.find(
                                  (m) => m.key === action.action_name
                                );
                                return (
                                  <Badge
                                    key={action._id}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {moduleInfo?.name || action.action_name}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Overview of all roles and their permissions across different
                modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">Role</TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Dashboard
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col  items-center gap-2">
                          <Users className="h-4 w-4" />
                          User Management
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col  items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Seller Management
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col  items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Financing Requests
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col  items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Contract Management
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            {role.role_name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {role.role_actions.some(
                            (action) => action.action_name === "dashboard"
                          )
                            ? "✓"
                            : "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {role.role_actions.some(
                            (action) =>
                              action.action_name === "account-management"
                          )
                            ? "✓"
                            : "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {role.role_actions.some(
                            (action) =>
                              action.action_name === "seller-management"
                          )
                            ? "✓"
                            : "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {role.role_actions.some(
                            (action) =>
                              action.action_name === "financing-request"
                          )
                            ? "✓"
                            : "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {role.role_actions.some(
                            (action) =>
                              action.action_name === "contract-management"
                          )
                            ? "✓"
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="font-medium">✓</span>
                  <span>Has Access</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>-</span>
                  <span>No Access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Role Dialog */}
      <Dialog
        open={isEditRoleOpen}
        onOpenChange={(open) => {
          setIsEditRoleOpen(open);
          if (!open) {
            setSelectedRole(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.role_name}</DialogTitle>
            <DialogDescription>
              Modify the role permissions and settings.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <RoleForm
              role={selectedRole}
              isEdit={true}
              onSubmit={handleCreateRole}
              isLoading={isLoading}
            />
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditRoleOpen(false);
                setSelectedRole(null);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
