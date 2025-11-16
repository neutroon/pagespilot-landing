import { fetchWithAuth } from "@/services/auth-api";
import {
  CreateUserRequest,
  FacebookAnalytics,
  ManagedUser,
  User,
} from "./admin-api";
import { MANAGER_API } from "./config";

export interface DashboardStats {
  data: {
    totalManagedUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalFacebookAccounts: number;
    totalPages: number;
    recentActivities: [];
    userPerformance: [];
  };
}
export interface Manager {
  id: number;
  email: string;
  role: string;
}

export interface ManagerLoginRequest {
  email: string;
  password: string;
}

export interface ManagerLoginResponse {
  message: string;
  user: Manager;
}

class ManagerService {
  async createUser(data: CreateUserRequest): Promise<User> {
    return fetchWithAuth(MANAGER_API.CREATE_USER, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getMyUsers(): Promise<ManagedUser[]> {
    return fetchWithAuth(MANAGER_API.MY_USERS);
  }

  async getMyManagers(): Promise<Manager[]> {
    return fetchWithAuth(MANAGER_API.MY_MANAGERS);
  }

  async getDashboard(): Promise<DashboardStats> {
    return fetchWithAuth(MANAGER_API.DASHBOARD);
  }

  async getMyUserById(id: number): Promise<User> {
    return fetchWithAuth(MANAGER_API.USER_BY_ID(id));
  }

  async getMyUserAnalytics(id: number): Promise<FacebookAnalytics> {
    return fetchWithAuth(MANAGER_API.USER_ANALYTICS(id));
  }

  async deactivateMyUser(id: number): Promise<{ message: string; user: User }> {
    return fetchWithAuth(MANAGER_API.USER_DEACTIVATE(id), {
      method: "PATCH",
    });
  }

  async reactivateMyUser(id: number): Promise<{ message: string; user: User }> {
    return fetchWithAuth(MANAGER_API.USER_REACTIVATE(id), {
      method: "PATCH",
    });
  }
}

export const managerService = new ManagerService();
