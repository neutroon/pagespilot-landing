"use client";

import { useState, useEffect } from "react";
import { User, FacebookAccount, adminService } from "@/lib/admin-api";
import {
  X,
  Trash2,
  Facebook,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface UserFacebookAccountsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteAccount: (accountId: number) => Promise<void>;
}

export default function UserFacebookAccountsModal({
  user,
  isOpen,
  onClose,
  onDeleteAccount,
}: UserFacebookAccountsModalProps) {
  const [accounts, setAccounts] = useState<FacebookAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserAccounts();
    }
  }, [isOpen, user]);

  const fetchUserAccounts = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const userAccounts = await adminService.getUserFacebookAccounts(user.id);
      setAccounts(userAccounts);
    } catch (error) {
      console.error("Failed to fetch user Facebook accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async (account: FacebookAccount) => {
    if (
      confirm(
        `Are you sure you want to delete this Facebook account? This will remove all connected pages and activities.`
      )
    ) {
      try {
        await onDeleteAccount(account.id);
        await fetchUserAccounts();
      } catch (error) {
        console.error("Failed to delete Facebook account:", error);
      }
    }
  };

  const getTokenStatus = (expiresAt: string | null) => {
    if (!expiresAt)
      return { status: "unknown", color: "gray", text: "Unknown" };

    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilExpiry < 0) {
      return { status: "expired", color: "red", text: "Expired" };
    } else if (daysUntilExpiry < 7) {
      return {
        status: "expiring",
        color: "yellow",
        text: `Expires in ${daysUntilExpiry} days`,
      };
    } else {
      return {
        status: "valid",
        color: "green",
        text: `Expires in ${daysUntilExpiry} days`,
      };
    }
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  if (!isOpen || !user) return null;

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
                {user.name}'s Facebook Accounts
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
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8">
              <Facebook className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No Facebook accounts connected</p>
              <p className="text-sm text-gray-400 mt-1">
                This user hasn't connected any Facebook accounts yet
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {accounts.map((account, index) => {
                const tokenStatus = getTokenStatus(account.expiresAt);

                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    {/* Account Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <Facebook className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            Facebook Account #{account.id}
                          </h4>
                          <p className="text-sm text-gray-500">
                            User ID: {account.facebookUserId}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(account.isActive)}
                        <span
                          className={`text-sm font-medium ${
                            account.isActive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {account.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    {/* Account Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm font-medium text-gray-500">
                            Token Type
                          </span>
                          <span className="text-sm text-gray-900">
                            {account.tokenType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm font-medium text-gray-500">
                            Scope
                          </span>
                          <span className="text-sm text-gray-900">
                            {account.scope || "Not specified"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm font-medium text-gray-500">
                            Device Info
                          </span>
                          <span className="text-sm text-gray-900">
                            {account.deviceInfo || "Unknown"}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm font-medium text-gray-500">
                            Token Status
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              tokenStatus.color === "green"
                                ? "text-green-600"
                                : tokenStatus.color === "yellow"
                                ? "text-yellow-600"
                                : tokenStatus.color === "red"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            {tokenStatus.text}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm font-medium text-gray-500">
                            Last Used
                          </span>
                          <span className="text-sm text-gray-900 flex items-center">
                            <Calendar className="h-4 w-4 me-1" />
                            {account.lastUsedAt
                              ? new Date(
                                  account.lastUsedAt
                                ).toLocaleDateString()
                              : "Never"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm font-medium text-gray-500">
                            Activities
                          </span>
                          <span className="text-sm text-gray-900 flex items-center">
                            <Activity className="h-4 w-4 me-1" />
                            {account._count?.activities || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Connected Pages */}
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">
                        Connected Pages ({account.pages?.length || 0})
                      </h5>
                      {account.pages && account.pages.length > 0 ? (
                        <div className="space-y-2">
                          {account.pages.map((page, pageIndex) => (
                            <div
                              key={pageIndex}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center">
                                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center me-3">
                                  <Facebook className="h-3 w-3 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {page.pageName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    ID: {page.pageId}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    page.isActive
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {page.isActive ? "Active" : "Inactive"}
                                </span>
                                {page.category && (
                                  <span className="text-xs text-gray-500">
                                    {page.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <Facebook className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm">No pages connected</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                          <RefreshCw className="h-4 w-4 me-1" />
                          Refresh Token
                        </button>
                        <button className="flex items-center text-sm text-gray-600 hover:text-gray-700">
                          <ExternalLink className="h-4 w-4 me-1" />
                          View on Facebook
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteAccount(account)}
                        className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4 me-1" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary */}
          {accounts.length > 0 && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {accounts.length}
                  </p>
                  <p className="text-sm text-gray-500">Total Accounts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {accounts.reduce(
                      (total, account) => total + (account.pages?.length || 0),
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Total Pages</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {accounts.reduce(
                      (total, account) =>
                        total + (account._count?.activities || 0),
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Total Activities</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
