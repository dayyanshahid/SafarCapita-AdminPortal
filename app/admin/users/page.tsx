"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@safarCapital.com",
      phone: "+1 (555) 123-4567",
      role: "Super Admin",
      roleId: 1,
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "IT",
      loginCount: 245,
      isOnline: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@safarCapital.com",
      phone: "+1 (555) 234-5678",
      role: "Admin",
      roleId: 2,
      status: "active",
      lastLogin: "2024-01-15T09:15:00Z",
      createdAt: "2024-01-15T00:00:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Operations",
      loginCount: 189,
      isOnline: true,
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@safarCapital.com",
      phone: "+1 (555) 345-6789",
      role: "Operations Manager",
      roleId: 3,
      status: "active",
      lastLogin: "2024-01-14T16:45:00Z",
      createdAt: "2024-02-01T00:00:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Operations",
      loginCount: 156,
      isOnline: false,
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@safarCapital.com",
      phone: "+1 (555) 456-7890",
      role: "Risk Analyst",
      roleId: 4,
      status: "active",
      lastLogin: "2024-01-15T08:20:00Z",
      createdAt: "2024-02-15T00:00:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Risk Management",
      loginCount: 98,
      isOnline: true,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@safarCapital.com",
      phone: "+1 (555) 567-8901",
      role: "Viewer",
      roleId: 5,
      status: "inactive",
      lastLogin: "2024-01-10T14:30:00Z",
      createdAt: "2024-03-01T00:00:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Finance",
      loginCount: 45,
      isOnline: false,
    },
    {
      id: 6,
      name: "Lisa Thompson",
      email: "lisa.thompson@safarCapital.com",
      phone: "+1 (555) 678-9012",
      role: "Operations Manager",
      roleId: 3,
      status: "pending",
      lastLogin: null,
      createdAt: "2024-01-14T00:00:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Operations",
      loginCount: 0,
      isOnline: false,
    },
  ]

  const roles = [
    { id: 1, name: "Super Admin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "Operations Manager" },
    { id: 4, name: "Risk Analyst" },
    { id: 5, name: "Viewer" },
  ]

  const departments = ["IT", "Operations", "Risk Management", "Finance", "Legal", "Compliance"]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatLastLogin = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateUser = () => {
    setIsCreateUserOpen(false)
    // Handle user creation logic
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditUserOpen(true)
  }

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteUser = () => {
    // Handle user deletion logic
    console.log("Delete user:", userToDelete?.id)
    setIsDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleToggleUserStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    // Handle status toggle logic
    console.log(`Toggle user ${userId} status to ${newStatus}`)
  }

  const UserForm = ({ user, isEdit = false }: { user?: any; isEdit?: boolean }) => {
    const [formData, setFormData] = useState({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "",
      department: user?.department || "",
      status: user?.status || "active",
    })

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="userName">Full Name</Label>
            <Input
              id="userName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="userEmail">Email Address</Label>
            <Input
              id="userEmail"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="userDepartment">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="userRole">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isEdit && (
            <div>
              <Label htmlFor="userStatus">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
          )}
        </div>

        {!isEdit && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="sendInvite" defaultChecked />
              <Label htmlFor="sendInvite">Send invitation email</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              The user will receive an email with instructions to set up their account.
            </p>
          </div>
        )}
      </div>
    )
  }

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
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.name}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account and assign appropriate permissions.</DialogDescription>
          </DialogHeader>
          <UserForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardHeader title="User Management" actions={headerActions} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((users.filter((u) => u.status === "active").length / users.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.isOnline).length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting activation</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
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
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
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
                      {user.role}
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatLastLogin(user.lastLogin)}</TableCell>
                  <TableCell className="text-sm">{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id, user.status)}>
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
                        <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
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
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User: {selectedUser?.name}</DialogTitle>
            <DialogDescription>Update user information and permissions.</DialogDescription>
          </DialogHeader>
          {selectedUser && <UserForm user={selectedUser} isEdit={true} />}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditUserOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone. All user data and
              access will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
