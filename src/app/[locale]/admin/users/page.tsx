"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { adminService, User } from "@/lib/admin-api";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import {
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Eye,
  MoreHorizontal,
  Calendar,
  Mail,
  Shield,
} from "lucide-react";

export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersData = await adminService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = () => {
    setShowCreateModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleViewUser = (user: User) => {
    router.push(`/admin/users/${user.id}`);
  };

  const handleDeactivateUser = async (user: User) => {
    if (confirm(`Are you sure you want to deactivate ${user.name}?`)) {
      try {
        await adminService.deactivateUser(user.id);
        await fetchUsers();
      } catch (error) {
        console.error("Failed to deactivate user:", error);
      }
    }
  };

  const handleReactivateUser = async (user: User) => {
    try {
      await adminService.reactivateUser(user.id);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to reactivate user:", error);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (
      confirm(
        `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`
      )
    ) {
      try {
        await adminService.deleteUser(user.id);
        await fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "deactivate":
        if (confirm(`Deactivate ${selectedUsers.length} selected users?`)) {
          // Implement bulk deactivation
          console.log("Bulk deactivate:", selectedUsers);
        }
        break;
      case "delete":
        if (
          confirm(`Permanently delete ${selectedUsers.length} selected users?`)
        ) {
          // Implement bulk deletion
          console.log("Bulk delete:", selectedUsers);
        }
        break;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { color: "bg-red-100 text-red-800", label: "Super Admin" },
      admin: { color: "bg-blue-100 text-blue-800", label: "Admin" },
      manager: { color: "bg-green-100 text-green-800", label: "Manager" },
      user: { color: "bg-gray-100 text-gray-800", label: "User" },
    };

    const config =
      roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Shield className="h-3 w-3 me-1" />
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (isActive: boolean, deletedAt?: string) => {
    if (deletedAt) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <UserX className="h-3 w-3 me-1" />
          Deleted
        </span>
      );
    }

    return isActive ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <UserCheck className="h-3 w-3 me-1" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <UserX className="h-3 w-3 me-1" />
        Inactive
      </span>
    );
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      width: "80px",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {value.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ms-3">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (value: string) => getRoleBadge(value),
    },
    {
      key: "isActive",
      label: "Status",
      sortable: true,
      render: (value: boolean, row: User) =>
        getStatusBadge(value, row.deletedAt),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 me-1" />
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "facebookAccounts",
      label: "FB Accounts",
      render: (value: any[]) => (
        <span className="text-sm text-gray-900">{value?.length || 0}</span>
      ),
    },
  ];

  const actions = [
    {
      label: "View",
      action: "view",
      icon: Eye,
      className: "text-blue-600 hover:text-blue-700",
    },
    {
      label: "Edit",
      action: "edit",
      icon: Edit,
      className: "text-green-600 hover:text-green-700",
    },
    {
      label: selectedUser?.isActive ? "Deactivate" : "Reactivate",
      action: selectedUser?.isActive ? "deactivate" : "reactivate",
      icon: selectedUser?.isActive ? UserX : UserCheck,
      className: selectedUser?.isActive
        ? "text-yellow-600 hover:text-yellow-700"
        : "text-green-600 hover:text-green-700",
    },
    {
      label: "Delete",
      action: "delete",
      icon: Trash2,
      className: "text-red-600 hover:text-red-700",
    },
  ];

  const handleRowAction = (action: string, row: User) => {
    setSelectedUser(row);

    switch (action) {
      case "view":
        handleViewUser(row);
        break;
      case "edit":
        handleEditUser(row);
        break;
      case "deactivate":
        handleDeactivateUser(row);
        break;
      case "reactivate":
        handleReactivateUser(row);
        break;
      case "delete":
        handleDeleteUser(row);
        break;
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-2">Manage all users in the system</p>
          </div>
          <button
            onClick={handleCreateUser}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 me-2" />
            Create User
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        data={users}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search users..."
        searchFields={["name", "email", "role"]}
        pagination={true}
        pageSize={10}
        sortable={true}
        selectable={true}
        onRowSelect={setSelectedUsers}
        onRowAction={handleRowAction}
        actions={actions}
        loading={isLoading}
        emptyMessage="No users found"
        exportable={true}
        onExport={() => console.log("Export users")}
      />

      {/* Create User Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create User</h3>
            <p className="text-gray-600 mb-4">
              User creation form will be implemented here.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal Placeholder */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <p className="text-gray-600 mb-4">
              Editing {selectedUser.name} - form will be implemented here.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
