<!-- 5fe5fa30-76c3-4cee-ab6b-d86bdcfc804e da6a63a9-b11a-4c68-9cc8-9eb4b8fdd341 -->
# Admin Dashboard Implementation Plan

## Phase 1: Admin API Configuration & Services

### 1.1 Update API Configuration

**File**: `src/lib/config.ts`

- Add admin API endpoints for all operations:
- Authentication: `/api/v1/admin/login`, `/api/v1/admin/refresh`, `/api/v1/users/logout`
- User Management: `/api/v1/admin/users`, `/api/v1/admin/users/:id`, `/api/v1/admin/users/:id/deactivate`, etc.
- Admin/Manager/User Creation: `/api/v1/admin/addAdmin`, `/api/v1/admin/create-manager`, `/api/v1/admin/create-user`
- Assignments: `/api/v1/admin/assign-user`, `/api/v1/admin/assignments`, `/api/v1/admin/assignments/:id`
- Facebook Analytics: `/api/v1/admin/facebook/analytics`, `/api/v1/admin/facebook/users/:id/accounts`, `/api/v1/admin/facebook/accounts/:id`

### 1.2 Create Admin API Service

**File**: `src/lib/admin-api.ts` (new file)

- Create comprehensive AdminService class with methods for:
- Authentication: `adminLogin()`, `adminRefresh()`, `adminLogout()`
- User CRUD: `getAllUsers()`, `getUserById()`, `updateUser()`, `deleteUser()`, `deactivateUser()`, `reactivateUser()`
- Role Management: `createAdmin()`, `createManager()`, `createUser()`
- Assignments: `assignUserToManager()`, `getAssignments()`, `deleteAssignment()`
- Analytics: `getAnalytics()`, `getUserFacebookAccounts()`, `deleteFacebookAccount()`
- Define TypeScript interfaces for all request/response types
- Include proper error handling and HTTP-only cookie support

## Phase 2: Admin Authentication System

### 2.1 Create Admin Auth Context

**File**: `src/contexts/AdminAuthContext.tsx` (new file)

- Create separate AdminAuthContext with:
- State: `admin`, `isAdminAuthenticated`, `isLoading`
- Methods: `adminLogin()`, `adminLogout()`, `refreshAdminToken()`
- Auto token refresh (14 minutes for 15-minute tokens)
- Session persistence check on mount
- Support roles: `admin`, `super_admin`, `manager`

### 2.2 Create Admin Login Page

**File**: `src/app/admin/login/page.tsx` (new file)

- Professional admin login form with:
- Email and password fields
- Remember me option
- Error handling and validation
- Loading states
- Redirect to `/admin/dashboard` on success
- Different styling from user login (admin theme)

### 2.3 Admin Layout Wrapper

**File**: `src/app/admin/layout.tsx` (new file)

- Wrap admin routes with AdminAuthProvider
- Apply admin-specific styling/theme
- Include admin navigation structure

## Phase 3: Admin Dashboard Core

### 3.1 Admin Dashboard Overview

**File**: `src/app/admin/dashboard/page.tsx` (new file)

- Admin dashboard with:
- Stats cards: Total Users, Active Users, Total FB Accounts, Total Pages, Active Rate
- Recent activities feed from analytics
- Quick action buttons (Create User, Create Manager, View Analytics)
- Charts/graphs for user analytics (using recharts or similar)
- Role-based content (super_admin sees more than admin)

### 3.2 Admin Navigation Component

**File**: `src/components/admin/AdminNavbar.tsx` (new file)

- Admin-specific navbar with:
- Logo and brand
- Navigation items: Dashboard, Users, Managers, Assignments, Analytics, Settings
- Admin profile dropdown with logout
- Role badge display
- Language switcher

## Phase 4: User Management Interface

### 4.1 Users List Page

**File**: `src/app/admin/users/page.tsx` (new file)

- Full-featured users table with:
- Columns: ID, Name, Email, Role, Status, Created Date, Actions
- Search/filter by name, email, role, status
- Pagination (client-side or server-side)
- Sorting by columns
- Bulk actions selection
- Action buttons: View, Edit, Deactivate, Delete
- "Create User" button
- Export to CSV option
- Use a data table library (TanStack Table recommended)

### 4.2 User Detail/Edit Modal

**File**: `src/components/admin/UserDetailModal.tsx` (new file)

- Modal/slide-over with:
- User information display
- Edit form with validation
- Role selector (user, manager, admin)
- Status toggle (active/inactive)
- Facebook accounts list
- Analytics summary
- Action buttons: Save, Cancel, Deactivate, Delete
- Confirmation dialogs for destructive actions

### 4.3 Create User Modal

**File**: `src/components/admin/CreateUserModal.tsx` (new file)

- Form with fields:
- Name, Email, Password, Role selection
- Validation and error messages
- Submit and cancel buttons
- Success/error notifications

## Phase 5: Manager & Admin Management

### 5.1 Managers Page

**File**: `src/app/admin/managers/page.tsx` (new file)

- Similar structure to users page but filtered for managers
- Additional columns: Assigned Users Count
- Actions: View Assignments, Edit, Deactivate
- "Create Manager" button

### 5.2 Create Manager/Admin Modals

**Files**:

- `src/components/admin/CreateManagerModal.tsx` (new file)
- `src/components/admin/CreateAdminModal.tsx` (new file)
- Forms with name, email, password fields
- Role-specific validation
- Success notifications with created credentials

## Phase 6: User Assignments System

### 6.1 Assignments Page

**File**: `src/app/admin/assignments/page.tsx` (new file)

- Table showing all user-manager assignments:
- Columns: ID, Manager Name, User Name, Assigned Date, Assigned By, Status, Actions
- Filter by manager, user, status
- Search functionality
- "Assign User" button
- Delete assignment action with confirmation

### 6.2 Assign User Modal

**File**: `src/components/admin/AssignUserModal.tsx` (new file)

- Two-step form or dual dropdowns:
- Select Manager (dropdown with search)
- Select User (dropdown with search, show only unassigned users)
- Preview assignment details
- Confirm and cancel buttons
- Success notification

## Phase 7: Facebook Analytics & Account Management

### 7.1 Analytics Dashboard

**File**: `src/app/admin/analytics/page.tsx` (new file)

- Overview section with stats from `/api/v1/admin/facebook/analytics`:
- Total Users, Active Users, Total Accounts, Total Pages, Active Rate
- Visual charts (pie, bar, line charts)
- Recent Activities list
- User Analytics table with expandable rows
- Filters: Date range, user, activity type

### 7.2 Facebook Accounts Page

**File**: `src/app/admin/facebook/page.tsx` (new file)

- Table of all Facebook accounts across users:
- User Name, Facebook User ID, Connected Pages Count, Last Used, Status
- View pages per account
- Delete account action with confirmation
- Click user to see their accounts details
- Integration with `/api/v1/admin/facebook/users/:id/accounts`

### 7.3 User Facebook Accounts Detail

**File**: `src/components/admin/UserFacebookAccountsModal.tsx` (new file)

- Modal showing user's Facebook accounts and pages
- Account details: Facebook User ID, Token Status, Expiry
- Pages list: Page Name, Page ID, Category, Last Used
- Delete account button
- Activity count display

## Phase 8: Supporting Components & Utilities

### 8.1 Admin Data Table Component

**File**: `src/components/admin/DataTable.tsx` (new file)

- Reusable table component with:
- Generic typing for data
- Built-in search, filter, sort, pagination
- Action buttons per row
- Bulk selection support
- Loading and empty states
- Export functionality

### 8.2 Admin Protected Route

**File**: `src/components/admin/AdminProtectedRoute.tsx` (new file)

- HOC or component for protecting admin routes
- Check admin authentication
- Check role permissions (admin, super_admin, manager)
- Redirect to `/admin/login` if not authenticated
- Show "Access Denied" if wrong role

### 8.3 Admin Modals & Dialogs

**Files**:

- `src/components/admin/ConfirmDialog.tsx` (new file)
- `src/components/admin/NotificationToast.tsx` (new file)
- Reusable confirmation dialog for destructive actions
- Toast notifications for success/error messages

## Phase 9: Translations & Styling

### 9.1 Add Admin Translations

**Files**: `messages/en.json`, `messages/ar.json`

- Add comprehensive translations for:
- Admin navigation, dashboard, users, managers, assignments, analytics
- Form labels, buttons, messages, errors
- Table headers, filters, actions
- Notifications and confirmations

### 9.2 Admin Theme & Styling

**File**: `src/app/admin/globals.css` (optional) or use Tailwind

- Admin-specific color scheme (darker, more professional)
- Consistent spacing and typography
- Responsive design for all screen sizes
- Dark mode support (optional)

## Phase 10: Middleware & Route Protection

### 10.1 Update Middleware

**File**: `src/middleware.ts`

- Add admin route protection:
- Check for `adminAccessToken` cookie
- Redirect unauthenticated admins to `/admin/login`
- Prevent authenticated users from accessing admin routes
- Protect admin routes: `/admin/*` except `/admin/login`

## Implementation Order

1. **Setup** (Phase 1-2): API config, services, admin auth
2. **Core Dashboard** (Phase 3): Basic admin dashboard and navigation
3. **User Management** (Phase 4): Full user CRUD interface
4. **Extended Management** (Phase 5-6): Managers, admins, assignments
5. **Analytics** (Phase 7): Facebook analytics and account management
6. **Polish** (Phase 8-10): Reusable components, translations, protection

## Key Technical Decisions

- **Data Table**: Use TanStack Table (React Table v8) for powerful table features
- **Forms**: Use React Hook Form with Zod validation
- **Modals**: Use Headless UI or Radix UI for accessible modals
- **Charts**: Use Recharts for data visualization
- **Notifications**: Use React Hot Toast or similar
- **State Management**: React Context + hooks (no Redux needed)
- **API Calls**: Fetch with credentials: 'include' for HTTP-only cookies
- **Error Handling**: Try-catch with user-friendly error messages
- **Loading States**: Skeleton loaders and spinners throughout

## Files to Create (Summary)

### Services & Config

- `src/lib/admin-api.ts`
- Update `src/lib/config.ts`

### Context & Auth

- `src/contexts/AdminAuthContext.tsx`

### Pages

- `src/app/admin/login/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/users/page.tsx`
- `src/app/admin/managers/page.tsx`
- `src/app/admin/assignments/page.tsx`
- `src/app/admin/analytics/page.tsx`
- `src/app/admin/facebook/page.tsx`

### Components

- `src/components/admin/AdminNavbar.tsx`
- `src/components/admin/DataTable.tsx`
- `src/components/admin/AdminProtectedRoute.tsx`
- `src/components/admin/UserDetailModal.tsx`
- `src/components/admin/CreateUserModal.tsx`
- `src/components/admin/CreateManagerModal.tsx`
- `src/components/admin/CreateAdminModal.tsx`
- `src/components/admin/AssignUserModal.tsx`
- `src/components/admin/UserFacebookAccountsModal.tsx`
- `src/components/admin/ConfirmDialog.tsx`
- `src/components/admin/NotificationToast.tsx`

### Translations

- Update `messages/en.json`
- Update `messages/ar.json`

### Middleware

- Update `src/middleware.ts`

Total: ~25 new files + 4 file updates

This plan creates a production-ready admin dashboard with comprehensive user management, role-based access, and Facebook analytics monitoring.

### To-dos

- [ ] Update API configuration and create comprehensive AdminService with all endpoints
- [ ] Create AdminAuthContext and admin login page with separate authentication flow
- [ ] Build admin dashboard overview with stats, analytics, and navigation
- [ ] Create full-featured users list page with table, search, filters, and CRUD operations
- [ ] Implement managers page and create manager/admin modals
- [ ] Build user-manager assignments page with assign/unassign functionality
- [ ] Create Facebook analytics dashboard and accounts management interface
- [ ] Build reusable admin components (DataTable, modals, dialogs, notifications)
- [ ] Add comprehensive admin translations for English and Arabic
- [ ] Update middleware for admin route protection and role-based access control