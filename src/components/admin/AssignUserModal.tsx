"use client";

import { useState, useEffect } from "react";
import { adminService, AssignUserRequest } from "@/lib/admin-api";
import {
  X,
  Save,
  User as UserIcon,
  Shield,
  Search,
  CheckCircle,
} from "lucide-react";
import { User as UserType } from "@/lib/admin-api";

interface AssignUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignUserModal({
  isOpen,
  onClose,
  onSuccess,
}: AssignUserModalProps) {
  const [managers, setManagers] = useState<UserType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [assignedUserIds, setAssignedUserIds] = useState<Set<number>>(
    new Set()
  );
  const [formData, setFormData] = useState<AssignUserRequest>({
    managerId: 0,
    userId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [managerSearch, setManagerSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [usersData, assignmentsData] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAssignments(),
      ]);

      // Filter managers and users
      const managersData = usersData.filter(
        (user) => user.role === "manager" && user.isActive
      );
      const regularUsers = usersData.filter(
        (user) => user.role === "user" && user.isActive
      );

      setManagers(managersData);
      setUsers(regularUsers);

      // Get already assigned user IDs
      const assignedIds = new Set(
        assignmentsData.data?.map((a) => a.userId) || []
      );
      setAssignedUserIds(assignedIds);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.managerId) {
      newErrors.managerId = "Please select a manager";
    }

    if (!formData.userId) {
      newErrors.userId = "Please select a user";
    }

    if (
      formData.managerId &&
      formData.userId &&
      formData.managerId === formData.userId
    ) {
      newErrors.userId = "User and manager cannot be the same person";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await adminService.assignUserToManager(
        formData.managerId,
        formData.userId
      );
      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      console.error("Failed to assign user:", error);
      setErrors({ submit: error.message || "Failed to assign user" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      managerId: 0,
      userId: 0,
    });
    setErrors({});
    setManagerSearch("");
    setUserSearch("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Filter managers and users based on search
  const filteredManagers = managers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(managerSearch.toLowerCase()) ||
      manager.email.toLowerCase().includes(managerSearch.toLowerCase())
  );

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase());
    const isNotAssigned = !assignedUserIds.has(user.id);
    return matchesSearch && isNotAssigned;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center me-3">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Assign User to Manager
              </h3>
              <p className="text-sm text-gray-500">
                Create a new user-manager assignment
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <div className="space-y-6">
            {/* Manager Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Manager
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search managers..."
                  value={managerSearch}
                  onChange={(e) => setManagerSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredManagers.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500 text-center">
                    No managers found
                  </div>
                ) : (
                  filteredManagers.map((manager) => (
                    <button
                      key={manager.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, managerId: manager.id })
                      }
                      className={`w-full flex items-center p-3 text-left hover:bg-gray-50 ${
                        formData.managerId === manager.id
                          ? "bg-purple-50 border-l-4 border-purple-500"
                          : ""
                      }`}
                    >
                      <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center me-3">
                        <span className="text-sm font-medium text-white">
                          {manager.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {manager.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {manager.email}
                        </div>
                      </div>
                      {formData.managerId === manager.id && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </button>
                  ))
                )}
              </div>
              {errors.managerId && (
                <p className="mt-1 text-sm text-red-600">{errors.managerId}</p>
              )}
            </div>

            {/* User Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredUsers.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500 text-center">
                    {userSearch
                      ? "No users found matching search"
                      : "No unassigned users available"}
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, userId: user.id })
                      }
                      className={`w-full flex items-center p-3 text-left hover:bg-gray-50 ${
                        formData.userId === user.id
                          ? "bg-purple-50 border-l-4 border-purple-500"
                          : ""
                      }`}
                    >
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center me-3">
                        <span className="text-sm font-medium text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      {formData.userId === user.id && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </button>
                  ))
                )}
              </div>
              {errors.userId && (
                <p className="mt-1 text-sm text-red-600">{errors.userId}</p>
              )}
            </div>

            {/* Assignment Preview */}
            {formData.managerId && formData.userId && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-purple-900 mb-2">
                  Assignment Preview
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center me-3">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {
                          managers.find((m) => m.id === formData.managerId)
                            ?.name
                        }
                      </div>
                      <div className="text-xs text-gray-500">Manager</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {users.find((u) => u.id === formData.userId)?.name}
                      </div>
                      <div className="text-xs text-gray-500">User</div>
                    </div>
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center ms-3">
                      <UserIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.managerId || !formData.userId}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin me-2"></div>
              ) : (
                <Save className="h-4 w-4 me-2" />
              )}
              {isLoading ? "Assigning..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
