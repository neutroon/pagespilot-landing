// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   ReactNode,
// } from "react";
// import { usePathname } from "next/navigation";
// import { adminService, Admin } from "../lib/admin-api";

// interface AdminAuthContextType {
//   admin: Admin | null;
//   isAdminAuthenticated: boolean;
//   isLoading: boolean;
//   adminLogin: (email: string, password: string) => Promise<void>;
//   adminLogout: () => Promise<void>;
//   refreshAdminToken: () => Promise<boolean>;
// }

// const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
//   undefined
// );

// export function AdminAuthProvider({ children }: { children: ReactNode }) {
//   const [admin, setAdmin] = useState<Admin | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const authCheckRef = useRef(false);
//   const hasInitialized = useRef(false);

//   // Check if user context is active to prevent conflicts
//   const isUserContextActive = !pathname.includes("/admin");

//   // Handle pathname changes separately
//   useEffect(() => {
//     const isLoginPage = pathname.includes("/auth/login");
//     const isNonAdminPage = !pathname.includes("/admin");

//     if (isLoginPage || isNonAdminPage) {
//       // Clear admin data on non-admin pages to prevent conflicts
//       setAdmin(null);
//       setIsLoading(false);
//       // Reset initialization flag when switching away from admin pages
//       hasInitialized.current = false;
//     }
//   }, [pathname]);

//   // Handle initial authentication check
//   useEffect(() => {
//     // Don't run auth check on login page or non-admin pages
//     if (isUserContextActive) {
//       return;
//     }

//     // Only run authentication check once per session
//     if (hasInitialized.current) {
//       return;
//     }

//     // Don't run if already authenticated
//     if (admin) {
//       return;
//     }

//     hasInitialized.current = true;

//     // Check if we already have admin data in localStorage first
//     const storedAdmin = localStorage.getItem("admin_data");
//     if (storedAdmin) {
//       console.log(localStorage.removeItem("user_data"));
//       try {
//         const parsedAdmin = JSON.parse(storedAdmin);
//         setAdmin(parsedAdmin);
//         setIsLoading(false);
//         return;
//       } catch (error) {
//         localStorage.removeItem("admin_data");
//       }
//     }

//     // Check auth with server (only if not already checking)
//     if (!authCheckRef.current) {
//       authCheckRef.current = true;
//       const checkAdminAuth = async () => {
//         try {
//           // Check if we have stored admin data first
//           const storedAdmin = localStorage.getItem("admin_data");
//           if (!storedAdmin) {
//             setAdmin(null);
//             setIsLoading(false);
//             authCheckRef.current = false;
//             return;
//           }

//           // Add timeout to prevent hanging
//           const timeoutPromise = new Promise((_, reject) =>
//             setTimeout(() => reject(new Error("Auth check timeout")), 2000)
//           );

//           // Try to refresh token to check if admin is still authenticated
//           await Promise.race([adminService.adminRefresh(), timeoutPromise]);

//           // If refresh succeeds, use stored admin data
//           setAdmin(JSON.parse(storedAdmin));
//         } catch (error) {
//           localStorage.removeItem("admin_data");
//           setAdmin(null);
//         } finally {
//           setIsLoading(false);
//           authCheckRef.current = false;
//         }
//       };

//       checkAdminAuth();
//     }
//   }, [pathname, isUserContextActive, admin]); // Include all dependencies

//   const adminLogin = async (email: string, password: string): Promise<void> => {
//     try {
//       const response = await adminService.adminLogin(email, password);
//       setAdmin(response.admin);
//       localStorage.setItem("admin_data", JSON.stringify(response.admin));
//     } catch (error) {
//       console.error("Admin login failed:", error);
//       throw error;
//     }
//   };

//   const adminLogout = async (): Promise<void> => {
//     try {
//       await adminService.adminLogout();
//     } catch (error) {
//       console.error("Admin logout error:", error);
//     } finally {
//       setAdmin(null);
//       localStorage.removeItem("admin_data");
//     }
//   };

//   const refreshAdminToken = async (): Promise<boolean> => {
//     try {
//       await adminService.adminRefresh();
//       return true;
//     } catch (error) {
//       console.error("Admin token refresh failed:", error);
//       setAdmin(null);
//       localStorage.removeItem("admin_data");
//       return false;
//     }
//   };

//   const value: AdminAuthContextType = {
//     admin,
//     isAdminAuthenticated: !!admin,
//     isLoading,
//     adminLogin,
//     adminLogout,
//     refreshAdminToken,
//   };

//   return (
//     <AdminAuthContext.Provider value={value}>
//       {children}
//     </AdminAuthContext.Provider>
//   );
// }

// export function useAdminAuth() {
//   const context = useContext(AdminAuthContext);
//   if (context === undefined) {
//     throw new Error("useAdminAuth must be used within an AdminAuthProvider");
//   }
//   return context;
// }
