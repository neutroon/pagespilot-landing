"use client";

import { useState, useEffect } from "react";
import { User, adminService } from "@/lib/admin-api";
import {
  X,
  Save,
  Trash2,
  UserX,
  UserCheck,
  Mail,
  Calendar,
  Shield,
  Facebook,
  Activity,
  AlertTriangle,
} from "lucide-react";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => Promise<void>;
  onDelete: (userId: number) => Promise<void>;
  onDeactivate: (userId: number) => Promise<void>;
  onReactivate: (userId: number) => Promise<void>;
}

export default function UserDetailModal({
  user,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onDeactivate,
  onReactivate,
}: UserDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "" as "user" | "manager" | "admin" | "super_admin",
  });
  const [facebookAccounts, setFacebookAccounts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role as "user" | "manager" | "admin",
      });
      fetchFacebookAccounts();
    }
  }, [user]);

  const fetchFacebookAccounts = async () => {
    if (!user) return;

    try {
      const accounts = await adminService.getUserFacebookAccounts(user.id);
      setFacebookAccounts(accounts);
    } catch (error) {
      console.error("Failed to fetch Facebook accounts:", error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    if (
      confirm(
        `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`
      )
    ) {
      setIsLoading(true);
      try {
        await onDelete(user.id);
        onClose();
      } catch (error) {
        console.error("Failed to delete user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeactivate = async () => {
    if (!user) return;

    if (
      confirm(
        `Are you sure you want to ${
          user.isActive ? "deactivate" : "reactivate"
        } ${user.name}?`
      )
    ) {
      setIsLoading(true);
      try {
        if (user.isActive) {
          await onDeactivate(user.id);
        } else {
          await onReactivate(user.id);
        }
      } catch (error) {
        console.error("Failed to toggle user status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen || !user) return null;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "manager":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Information */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  User Information
                </h4>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-500">
                        Name
                      </span>
                      <span className="text-sm text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-500">
                        Email
                      </span>
                      <span className="text-sm text-gray-900">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-500">
                        Role
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        <Shield className="h-3 w-3 me-1" />
                        {user.role.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-500">
                        Status
                      </span>
                      {getStatusBadge(user.isActive, user.deletedAt)}
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-500">
                        Created
                      </span>
                      <span className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 me-1" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-500">
                        Last Updated
                      </span>
                      <span className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 me-1" />
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Facebook Accounts */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Facebook Accounts
                </h4>
                {facebookAccounts.length > 0 ? (
                  <div className="space-y-3">
                    {facebookAccounts.map((account, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Facebook className="h-4 w-4 text-blue-600 me-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {account.facebookUserId}
                            </span>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              account.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {account.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Pages: {account.pages?.length || 0} | Activities:{" "}
                          {account._count?.activities || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Facebook className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No Facebook accounts connected</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Summary */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Analytics Summary
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-blue-600 me-2" />
                    <span className="text-sm font-medium text-blue-900">
                      Total Activities
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900 mt-1">
                    {user.analytics?.length || 0}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 text-green-600 me-2" />
                    <span className="text-sm font-medium text-green-900">
                      Facebook Pages
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {facebookAccounts.reduce(
                      (total, account) => total + (account.pages?.length || 0),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4 me-2" />
                  Edit User
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  <Save className="h-4 w-4 me-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              )}

              <button
                onClick={handleDeactivate}
                disabled={isLoading}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                  user.isActive
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                } disabled:opacity-50`}
              >
                {user.isActive ? (
                  <>
                    <UserX className="h-4 w-4 me-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="h-4 w-4 me-2" />
                    Reactivate
                  </>
                )}
              </button>
            </div>

            <div className="flex space-x-3">
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                <Trash2 className="h-4 w-4 me-2" />
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
