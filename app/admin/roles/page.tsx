"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function RolesPermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false)

  // Mock data for roles
  const roles = [
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
  ]

  const permissionModules = [
    { key: "dashboard", name: "Dashboard", icon: BarChart3 },
    { key: "users", name: "User Management", icon: Users },
    { key: "sellers", name: "Seller Management", icon: Building2 },
    { key: "financing", name: "Financing Requests", icon: CreditCard },
    { key: "contracts", name: "Contract Management", icon: FileText },
    { key: "monitoring", name: "Post-Financing", icon: Monitor },
    { key: "reports", name: "Reports & Analytics", icon: BarChart3 },
    { key: "settings", name: "System Settings", icon: Settings },
  ]

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateRole = () => {
    setIsCreateRoleOpen(false)
    // Handle role creation logic
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsEditRoleOpen(true)
  }

  const handleDeleteRole = (roleId: number) => {
    // Handle role deletion logic
    console.log("Delete role:", roleId)
  }

  const RoleForm = ({ role, isEdit = false }: { role?: any; isEdit?: boolean }) => {
    const [formData, setFormData] = useState({
      name: role?.name || "",
      description: role?.description || "",
      permissions: role?.permissions || {},
    })

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter role name"
            />
          </div>
          <div>
            <Label htmlFor="roleDescription">Description</Label>
            <Textarea
              id="roleDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter role description"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Permissions</h4>
          <div className="space-y-4">
            {permissionModules.map((module) => {
              const ModuleIcon = module.icon
              const modulePermissions = formData.permissions[module.key] || {
                view: false,
                edit: false,
                delete: false,
              }

              return (
                <Card key={module.key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <ModuleIcon className="h-4 w-4" />
                      {module.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.key}-view`}
                          checked={modulePermissions.view}
                          onCheckedChange={(checked) => {
                            setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [module.key]: {
                                  ...modulePermissions,
                                  view: checked,
                                },
                              },
                            })
                          }}
                        />
                        <Label htmlFor={`${module.key}-view`} className="text-sm">
                          View
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.key}-edit`}
                          checked={modulePermissions.edit}
                          onCheckedChange={(checked) => {
                            setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [module.key]: {
                                  ...modulePermissions,
                                  edit: checked,
                                },
                              },
                            })
                          }}
                        />
                        <Label htmlFor={`${module.key}-edit`} className="text-sm">
                          Edit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.key}-delete`}
                          checked={modulePermissions.delete}
                          onCheckedChange={(checked) => {
                            setFormData({
                              ...formData,
                              permissions: {
                                ...formData.permissions,
                                [module.key]: {
                                  ...modulePermissions,
                                  delete: checked,
                                },
                              },
                            })
                          }}
                        />
                        <Label htmlFor={`${module.key}-delete`} className="text-sm">
                          Delete
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

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
      <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>Define a new role with specific permissions for your team members.</DialogDescription>
          </DialogHeader>
          <RoleForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRole}>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

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
            {filteredRoles.map((role) => (
              <Card key={role.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      {role.isSystem && (
                        <Badge variant="secondary" className="text-xs">
                          System
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditRole(role)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Users
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={role.isSystem}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users assigned:</span>
                      <Badge variant="outline">{role.userCount}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{new Date(role.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(role.permissions).map(([module, perms]: [string, any]) => {
                          const hasAnyPermission = perms.view || perms.edit || perms.delete
                          if (!hasAnyPermission) return null

                          const moduleInfo = permissionModules.find((m) => m.key === module)
                          return (
                            <Badge key={module} variant="secondary" className="text-xs">
                              {moduleInfo?.name || module}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Overview of all roles and their permissions across different modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">Role</TableHead>
                      {permissionModules.map((module) => (
                        <TableHead key={module.key} className="text-center min-w-32">
                          <div className="flex flex-col items-center gap-1">
                            <module.icon className="h-4 w-4" />
                            <span className="text-xs">{module.name}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            {role.name}
                            {role.isSystem && (
                              <Badge variant="secondary" className="text-xs">
                                System
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        {permissionModules.map((module) => {
                          const perms = role.permissions[module.key] || {
                            view: false,
                            edit: false,
                            delete: false,
                          }
                          return (
                            <TableCell key={module.key} className="text-center">
                              <div className="flex justify-center gap-1">
                                {perms.view && (
                                  <Badge variant="outline" className="text-xs px-1">
                                    V
                                  </Badge>
                                )}
                                {perms.edit && (
                                  <Badge variant="outline" className="text-xs px-1">
                                    E
                                  </Badge>
                                )}
                                {perms.delete && (
                                  <Badge variant="outline" className="text-xs px-1">
                                    D
                                  </Badge>
                                )}
                                {!perms.view && !perms.edit && !perms.delete && (
                                  <span className="text-muted-foreground text-xs">-</span>
                                )}
                              </div>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs px-1">
                    V
                  </Badge>
                  <span>View</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs px-1">
                    E
                  </Badge>
                  <span>Edit</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs px-1">
                    D
                  </Badge>
                  <span>Delete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
            <DialogDescription>Modify the role permissions and settings.</DialogDescription>
          </DialogHeader>
          {selectedRole && <RoleForm role={selectedRole} isEdit={true} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditRoleOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
