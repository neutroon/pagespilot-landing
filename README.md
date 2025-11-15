# PagesPilot - AI-Powered Content Automation Platform

<div align="center">

![PagesPilot](https://img.shields.io/badge/PagesPilot-AI%20Content%20Automation-indigo?style=for-the-badge)

**Your Content Autopilot** - Automate content generation, scheduling, and engagement across Facebook

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 📖 About

**PagesPilot** is an AI-powered content automation platform designed to help businesses and creators take control of their digital presence. The platform automates content generation, scheduling, posting, and engagement across Facebook, making it easier to maintain a consistent online presence while focusing on growing your business.

### Main Goals

- **AI-Driven Content Generation**: Automatically create engaging, on-brand content using advanced AI
- **Automated Scheduling**: Schedule and publish content across Facebook pages seamlessly
- **Smart Engagement**: Automatically respond to comments and messages 24/7 with AI-powered responses
- **Analytics & Insights**: Monitor performance metrics and gain valuable insights into your content strategy
- **Multi-Role Management**: Support for hierarchical user roles (Admin, Manager, User) with granular access control
- **Global Reach**: Full internationalization support with English and Arabic (RTL) languages

### What It Does

PagesPilot serves as a comprehensive solution for:

- **Content Creators**: Automate repetitive content creation tasks and focus on creativity
- **Social Media Managers**: Manage multiple Facebook pages efficiently from a single dashboard
- **Businesses**: Maintain consistent brand voice and presence across digital channels
- **Marketing Teams**: Track performance and optimize content strategy with data-driven insights

---

## 🚀 Features

### Core Functionality

- ✨ **AI Content Generation** - Intelligent content creation that understands your brand voice
- 📅 **Automated Scheduling** - Schedule posts in advance and maintain consistent posting
- 🤖 **Smart Automation** - 24/7 automated engagement with comments and messages
- 📊 **Analytics Dashboard** - Comprehensive analytics for posts, engagement, and reach
- 🔐 **Role-Based Access Control** - Secure multi-role system (Admin, Manager, User, Super Admin)
- 🌍 **Internationalization** - Full support for English and Arabic with RTL layout
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🔗 **Facebook Integration** - Seamless connection and management of Facebook pages

### User Roles

- **Super Admin**: Full system access and administration
- **Admin**: User management, analytics, and content oversight
- **Manager**: Team management and user assignment capabilities
- **User**: Content creation, scheduling, and personal dashboard access

---

## 🛠 Tech Stack

### Core Technologies

- **[Next.js 15.5.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Key Libraries

- **[next-intl 4.3.9](https://next-intl-docs.vercel.app/)** - Internationalization (i18n) with locale routing
- **[lucide-react 0.545.0](https://lucide.dev/)** - Beautiful icon library
- **[jose 6.1.0](https://github.com/panva/jose)** - JWT handling and verification
- **[@vercel/analytics](https://vercel.com/docs/analytics)** - Web analytics
- **[@vercel/speed-insights](https://vercel.com/docs/speed-insights)** - Performance monitoring

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turbopack](https://turbo.build/pack)** - Fast bundler (enabled by default)

### Architecture

- **File-based Routing** - Next.js App Router with locale-based routing
- **Server Components** - Optimized server-side rendering
- **API Routes** - Backend integration for authentication and Facebook API
- **Middleware** - Route protection and role-based access control
- **Context API** - Global state management for authentication

---

## 📁 Project Structure

```
website/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── [locale]/            # Internationalized routes
│   │   │   ├── (public)/        # Public routes (auth, landing)
│   │   │   │   └── auth/
│   │   │   │       ├── login/
│   │   │   │       └── signup/
│   │   │   ├── (protected)/     # Protected routes
│   │   │   │   ├── admin/       # Admin dashboard
│   │   │   │   ├── manager/     # Manager dashboard
│   │   │   │   └── user/        # User dashboard
│   │   │   ├── layout.tsx       # Locale layout
│   │   │   └── page.tsx         # Landing page
│   │   ├── layout.tsx           # Root layout
│   │   └── not-found.jsx        # 404 page
│   ├── components/              # React components
│   │   ├── admin/               # Admin-specific components
│   │   ├── sidebar/             # Sidebar components
│   │   ├── AppNavbar.tsx        # Main navigation
│   │   ├── BaseDashboardLayout.tsx
│   │   ├── FacebookPixel.tsx    # Facebook Pixel integration
│   │   └── ...
│   ├── contexts/                # React contexts
│   │   ├── AuthContext.tsx      # Authentication context
│   │   └── AdminAuthContext.tsx # Admin auth context
│   ├── i18n/                    # Internationalization config
│   │   ├── config.ts            # Locale configuration
│   │   ├── navigation.ts        # Navigation helpers
│   │   ├── request.ts           # Server-side i18n
│   │   └── routing.ts           # Routing configuration
│   ├── lib/                     # Utility libraries
│   │   ├── admin-api.ts         # Admin API client
│   │   ├── config.ts            # API configuration
│   │   ├── facebook-api.ts      # Facebook API client
│   │   ├── manager-api.ts       # Manager API client
│   │   └── role-config.ts       # Role-based routing config
│   ├── services/                # API services
│   │   ├── api.ts               # Main API client
│   │   └── auth-api.ts          # Authentication service
│   ├── middleware.ts            # Next.js middleware (route protection)
│   └── styles/                  # Global styles
├── messages/                    # Translation files
│   ├── en.json                  # English translations
│   └── ar.json                  # Arabic translations
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** 8.x or higher ([Installation Guide](https://pnpm.io/installation))
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Backend API Configuration
   NEXT_PUBLIC_API=http://localhost:8080
   
   # Facebook API Configuration (if needed)
   NEXT_PUBLIC_FACEBOOK_API_URL=https://graph.facebook.com
   
   # Add other environment variables as needed
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

   The app will automatically detect your locale preference or use the default locale (Arabic).

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production with Turbopack |
| `pnpm build:noturbopack` | Build for production without Turbopack |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint to check code quality |

---

## 💻 Working Locally

### Development Workflow

1. **Start the development server**
   ```bash
   pnpm dev
   ```
   The server will run on `http://localhost:3000` with hot-reload enabled.

2. **Access different locales**
   - English: `http://localhost:3000/en`
   - Arabic: `http://localhost:3000/ar` (default)

3. **Backend Integration**
   
   Ensure your backend API is running on the configured port (default: `http://localhost:8080`). Update `NEXT_PUBLIC_API` in `.env.local` if your backend runs on a different port.

### Common Development Tasks

#### Adding a New Page

1. Create a new file in `src/app/[locale]/` (or appropriate subdirectory)
2. Export a default React component
3. The page will be automatically routed based on the file structure

Example:
```typescript
// src/app/[locale]/about/page.tsx
export default function AboutPage() {
  return <div>About Us</div>;
}
```

#### Adding Translations

1. Open `messages/en.json` or `messages/ar.json`
2. Add your translation keys following the existing structure
3. Use translations in components:
   ```typescript
   import { useTranslations } from 'next-intl';
   
   const t = useTranslations('HomePage');
   return <h1>{t('hero.headline')}</h1>;
   ```

#### Working with Protected Routes

Routes in `(protected)/` are automatically protected by middleware. Ensure:
- User is authenticated (has `accessToken` cookie)
- User has the correct role for the route

#### Facebook Integration

To work with Facebook features:
1. Ensure backend API has Facebook integration configured
2. User must connect Facebook account via the Facebook connection flow
3. Facebook pages will appear in the dashboard after connection

### Debugging

- **Console Logs**: Check browser console for client-side errors
- **Network Tab**: Inspect API requests/responses in browser DevTools
- **TypeScript Errors**: Check terminal for type errors during development
- **ESLint**: Run `pnpm lint` to check for code quality issues

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. User logs in via `/auth/login`
2. Backend returns JWT token stored in `accessToken` cookie
3. User role stored in `role` cookie
4. Middleware validates token and role for protected routes

### Role-Based Access

- **Public Routes**: `/`, `/auth/login`, `/auth/signup`
- **User Routes**: `/user/*` - Accessible by all authenticated users
- **Manager Routes**: `/manager/*` - Requires `manager`, `admin`, or `super_admin` role
- **Admin Routes**: `/admin/*` - Requires `admin` or `super_admin` role

### Route Protection

The `middleware.ts` file handles:
- Token validation
- Role-based route access
- Automatic redirects to appropriate dashboards
- Locale preservation during redirects

---

## 🌍 Internationalization

The application supports multiple languages with automatic locale detection and RTL support.

### Supported Locales

- **English (en)** - Default LTR layout
- **Arabic (ar)** - Default locale with RTL layout

### How It Works

1. Routes are prefixed with locale: `/en/...` or `/ar/...`
2. Translations stored in `messages/{locale}.json`
3. `next-intl` handles translation loading and switching
4. Layout automatically switches to RTL for Arabic

### Adding a New Locale

1. Add locale to `src/i18n/config.ts`
2. Create `messages/{locale}.json` file
3. Add translations following existing structure
4. Update routing configuration if needed

---

## 🧪 Testing

### Running Linters

```bash
pnpm lint
```

### Type Checking

TypeScript is configured to check types during build. For manual checking:

```bash
# TypeScript will check during dev/build, but you can also:
npx tsc --noEmit
```

---

## 📦 Building for Production

### Build the Application

```bash
pnpm build
```

This creates an optimized production build in the `.next` directory.

### Start Production Server

```bash
pnpm start
```

The application will run on `http://localhost:3000` (or configured port).

### Environment Variables for Production

Ensure all required environment variables are set:

```env
NEXT_PUBLIC_API=https://api.yourdomain.com
# Add other production environment variables
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

The application is optimized for Vercel deployment with:
- Automatic builds on push
- Edge runtime support
- Analytics integration
- Speed Insights

### Other Platforms

This Next.js application can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Docker** containers
- Any Node.js hosting platform

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Follow code style**
   - Run `pnpm lint` before committing
   - Follow TypeScript best practices
   - Maintain i18n translations for both locales
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new files
- Follow React best practices (hooks, functional components)
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Maintain translations for both English and Arabic
- Write self-documenting code with clear variable names
- Add comments for complex logic

---

## 📝 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API` | Backend API base URL | `http://localhost:8080` | Yes |
| `NEXT_PUBLIC_FACEBOOK_API_URL` | Facebook Graph API URL | `https://graph.facebook.com` | No |

Add these to `.env.local` for local development or configure them in your deployment platform.

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill the process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or change the port
pnpm dev -- -p 3001
```

**Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

**TypeScript errors**
- Ensure all dependencies are installed
- Check `tsconfig.json` includes the file
- Restart the TypeScript server in your IDE

**i18n issues**
- Verify translation keys exist in both `en.json` and `ar.json`
- Clear `.next` cache: `rm -rf .next`

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👥 Support

For support, please contact the development team or open an issue in the repository.

---

<div align="center">

**Built with ❤️ by the PagesPilot Team**

[Report Bug](https://github.com/your-org/pagespilot/issues) • [Request Feature](https://github.com/your-org/pagespilot/issues) • [Documentation](#)

</div>
