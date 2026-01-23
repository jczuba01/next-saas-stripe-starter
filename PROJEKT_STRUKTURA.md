# 📊 Struktura Projektu - SaaS Starter z Next.js + Stripe

## 🎯 Krótka Charakterystyka
**To jest Full-Stack aplikacja Next.js 14** - wszystko w jednym repozytorium.
- **Frontend**: Next.js App Router (React Components)
- **Backend**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: NextAuth v5 (JWT + Credentials)
- **Chat**: OpenRouter API integration

---

## 📁 STRUKTURA KATALOGÓW

### 1️⃣ ROOT LEVEL - Konfiguracyjne pliki projektu

```
├── auth.ts                    [BACKEND] NextAuth setup + session config
├── auth.config.ts             [BACKEND] Credentials provider + login logic
├── middleware.ts              [BACKEND] Auth middleware - chroni protected routes
├── next.config.js             [CONFIG] Next.js config - contentlayer, images
├── tsconfig.json              [CONFIG] TypeScript config + path aliases (@/*)
├── tailwind.config.ts         [CONFIG] Tailwind CSS themes & colors
├── postcss.config.js          [CONFIG] PostCSS + Tailwind
├── prettier.config.js         [CONFIG] Code formatting rules
├── contentlayer.config.ts      [CONFIG] Markdown content processing
├── env.mjs                    [CONFIG] Environment variables validation (t3-env)
├── package.json               [CONFIG] Dependencies + scripts (dev, build, start)
```

---

## 🎨 FRONTEND - `app/` folder (Next.js App Router)

### Root Layout
```
app/
├── layout.tsx                 [FRONTEND] Root HTML layout + providers setup
│   ├── SessionProvider        (NextAuth)
│   ├── ThemeProvider          (Dark/Light mode)
│   ├── ModalProvider          (Global modals)
│   ├── Analytics              (Vercel Analytics)
│   └── Toaster                (Sonner notifications)
├── page.tsx                   [FRONTEND] Homepage - just AuthSection component
└── robots.ts                  [FRONTEND] SEO - robots.txt
```

### Auth Routes (jeśli nie zalogowany → redirect)
```
app/(auth)/
├── layout.tsx                 [FRONTEND] Auth layout - redirects if already logged in
├── login/
│   └── page.tsx               [FRONTEND] Login page - UserAuthForm component
├── register/
│   └── page.tsx               [FRONTEND] Register page - UserAuthForm component
```

### Protected Routes (jeśli zalogowany → dashboard UI)
```
app/(protected)/
├── layout.tsx                 [FRONTEND] Sidebar + Header + Nav (główny layout aplikacji)
├── admin/
│   ├── page.tsx               [FRONTEND] Admin Panel - tylko dla ADMIN role
│   ├── layout.tsx             [FRONTEND] Admin sub-layout
│   └── orders/
│       └── page.tsx           [FRONTEND] Orders table placeholder
├── dashboard/
│   ├── page.tsx               [FRONTEND] Dashboard page - hello screen
│   └── settings/
│       └── page.tsx           [FRONTEND] User settings - name, role, delete account
└── chat/
    └── page.tsx               [FRONTEND] Chat page - ChatComponent
```

### API Routes (Backend - HTTP Endpoints)
```
app/api/
├── auth/
│   └── [...nextauth]/         [BACKEND] NextAuth API - /api/auth/signin, /api/auth/callback, etc.
│       └── route.ts           Handles all auth endpoints
├── chat/
│   └── route.ts               [BACKEND] POST /api/chat - OpenRouter API integration
├── user/
│   └── route.ts               [BACKEND] GET /api/user - Get current user info (placeholder)
├── models/
│   └── (probably empty)       [BACKEND] GET /api/models - fetch available AI models
└── webhooks/
    └── (structure varies)     [BACKEND] Stripe webhooks, email webhooks
```

---

## 🧩 COMPONENTS - `components/` folder

```
components/
├── analytics.tsx              [FRONTEND] Vercel Analytics wrapper
├── tailwind-indicator.tsx     [FRONTEND] Dev tool - shows breakpoint indicator

├── chat/                      [FRONTEND] Chat feature components
│   ├── chat-component.tsx     Main chat UI container
│   ├── chat-store.tsx         [STATE] Zustand store - messages, models, loading state
│   ├── model-settings.tsx     Model configuration UI
│   └── ui/
│       ├── chat-container.tsx Layout wrapper
│       ├── chat-messages.tsx   Message display list
│       ├── chat-model-selector.tsx  Model dropdown
│       └── chat-prompt.tsx     Input field + send button

├── dashboard/                 [FRONTEND] Dashboard UI components
│   ├── content-container.tsx  Wrapper for page content
│   ├── header.tsx             Page header (h1 + description)
│   ├── delete-account.tsx     Delete account form + modal
│   ├── info-card.tsx          Stats card (unused placeholder)
│   ├── project-switcher.tsx   Project selector dropdown
│   ├── search-command.tsx     Command palette search
│   ├── section-columns.tsx    Two-column layout
│   ├── transactions-list.tsx  Table (unused placeholder)
│   └── upgrade-card.tsx       Pricing upgrade card

├── forms/                     [FRONTEND] React Hook Form forms
│   ├── user-auth-form.tsx     Login/Register form
│   ├── user-name-form.tsx     Edit name form
│   ├── user-role-form.tsx     Change role form
│   ├── billing-form-button.tsx (probably unused - stripe related)
│   ├── customer-portal-button.tsx (probably unused - stripe)
│   └── newsletter-form.tsx    Newsletter signup (unused)

├── home/                      [FRONTEND] Home page components
│   └── auth-section.tsx       Homepage simple UI

├── layout/                    [FRONTEND] Main navigation layout
│   ├── navbar.tsx             Top navigation bar
│   ├── dashboard-sidebar.tsx  Left sidebar + mobile drawer
│   ├── mobile-nav.tsx         Mobile navigation
│   ├── mode-toggle.tsx        Dark/Light mode button
│   ├── user-account-nav.tsx   User dropdown menu
│   └── site-footer.tsx        Footer

├── modals/                    [FRONTEND] Modal dialogs
│   ├── providers.tsx          Modal provider context
│   ├── delete-account-modal.tsx
│   └── sign-in-modal.tsx

├── shared/                    [FRONTEND] Reusable utility components
│   ├── blur-image.tsx         Image with blur effect
│   ├── callout.tsx            Info box component
│   ├── card-skeleton.tsx      Loading skeleton
│   ├── copy-button.tsx        Copy to clipboard button
│   ├── empty-placeholder.tsx  Empty state UI
│   ├── header-section.tsx     Section header
│   ├── icons.tsx              Icon definitions
│   ├── max-width-wrapper.tsx  Max-width container
│   ├── section-skeleton.tsx   Section loading skeleton
│   ├── toc.tsx                Table of contents
│   └── user-avatar.tsx        User profile picture

├── ui/                        [FRONTEND] Shadcn/ui Components (Radix UI based)
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── alert.tsx
│   ├── aspect-ratio.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── popover.tsx
│   ├── scroll-area.tsx
│   ├── select.tsx
│   ├── sheet.tsx
│   ├── skeleton.tsx
│   ├── sonner.tsx             Toast notifications
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toggle-group.tsx
│   ├── tooltip.tsx
│   └── ...
```

---

## ⚙️ BACKEND - Server Logic

### `lib/` folder - Business Logic & Utilities
```
lib/
├── db.ts                      [BACKEND] Prisma client singleton
├── session.ts                 [BACKEND] getCurrentUser() - get logged in user from JWT
├── utils.ts                   [FRONTEND/BACKEND] cn(), constructMetadata()
├── email.ts                   [BACKEND] Resend email sending service
├── stripe.ts                  [BACKEND] Stripe client setup (if using Stripe)
├── subscription.ts            [BACKEND] Subscription logic
├── user.ts                    [BACKEND] User utility functions
├── toc.ts                     [BACKEND] Table of contents generation
├── exceptions.ts              [BACKEND] Custom error classes

├── services/
│   ├── user.ts                [BACKEND] UserService class
│   │   ├── getUserByEmail()
│   │   ├── createUser()
│   │   ├── registerUser()
│   │   ├── updateUserName()
│   │   ├── updateUserRole()
│   │   └── deleteUser()
│   ├── openrouter-client.ts   [BACKEND] OpenRouter API client for Chat
│   │   └── createChatCompletion()

└── validations/
    ├── user.ts                [BACKEND] Zod schemas - userAuthSchema, userNameSchema, etc.
    ├── email.ts
    └── ...
```

### `actions/` folder - Server Actions (RPC-style API)
```
actions/
├── register-user.ts           [BACKEND] "use server" - serverAction for registration
├── update-user-name.ts        [BACKEND] "use server" - update user name
├── update-user-role.ts        [BACKEND] "use server" - update user role (admin only)
```

> **Server Actions** to jak RPC calls - frontend może bezpośrednio wywoływać backend bez HTTP.

---

## 🗄️ DATABASE - Prisma

```
prisma/
├── schema.prisma              [BACKEND] Database schema definition
│   ├── User model             id, email, password, name, role, timestamps
│   └── UserRole enum          ADMIN, USER
└── migrations/                Database migration history

Baza: PostgreSQL
ORM: Prisma
Auth strategy: JWT stored in cookies
```

---

## 🎛️ CONFIG - `config/` folder

```
config/
├── site.ts                    [CONFIG] siteConfig - metadata, footer links
├── dashboard.ts               [CONFIG] Dashboard sidebar menu structure
├── subscriptions.ts           [CONFIG] Pricing plans (free, basic, pro)
├── landing.ts                 [CONFIG] (UNUSED) Landing page sections
├── blog.ts                    [CONFIG] (UNUSED) Blog metadata
├── docs.ts                    [CONFIG] (UNUSED) Documentation structure
└── marketing.ts               [CONFIG] (UNUSED) Marketing page config
```

---

## 🧵 HOOKS - `hooks/` folder - React Hooks

```
hooks/
├── use-send-message.ts        [FRONTEND] Send message to chat API
├── use-models.ts              [FRONTEND] Fetch available AI models
├── use-mounted.ts             [FRONTEND] useEffect helper for client-only
├── use-media-query.ts         [FRONTEND] Responsive design helper
├── use-lock-body.ts           [FRONTEND] Prevent body scroll
├── use-local-storage.ts       [FRONTEND] LocalStorage hook
├── use-scroll.ts              [FRONTEND] Track scroll position
└── use-intersection-observer.ts [FRONTEND] Lazy load observer
```

---

## 📁 TYPES - `types/` folder

```
types/
├── global.ts                  [TYPES] OpenRouter types, Message, AppModel
├── index.d.ts                 [TYPES] General types
└── next-auth.d.ts             [TYPES] NextAuth type augmentations
```

---

## 🎨 STYLES & ASSETS

```
styles/
├── globals.css                [FRONTEND] Global Tailwind + custom CSS
└── mdx.css                    [FRONTEND] Markdown styling

assets/
└── fonts/
    └── index.ts               [FRONTEND] Import fonts (Geist, Urban, etc.)

public/
└── _static/                   Static images, logos
```

---

## 📧 EMAIL TEMPLATES

```
emails/
└── magic-link-email.tsx       [BACKEND] React Email template (unused - no magic links)
```

---

## 📝 CONTENT

```
content/
├── blog/                      [UNUSED] Blog posts in markdown
├── docs/                      [UNUSED] Documentation in markdown
├── guides/                    [UNUSED] Guides in markdown
└── pages/                     [UNUSED] Static pages in markdown

Przetwarzane przez: Contentlayer2
```

---

## 🔐 AUTHENTICATION FLOW

```
User → Login Page (/login)
   ↓
UserAuthForm Component
   ↓
registerUser() Server Action / NextAuth Credentials
   ↓
auth.config.ts - Credentials Provider
   ↓
UserService.registerUser() / getUserByEmail()
   ↓
Prisma - PostgreSQL (create/verify user)
   ↓
JWT Token Created
   ↓
Session established
   ↓
Redirect to /dashboard
```

---

## 💬 CHAT FEATURE FLOW

```
User opens /chat
   ↓
ChatComponent renders
   ↓
ChatModelSelector loads models from /api/models
   ↓
Models stored in useChatStore (Zustand)
   ↓
User selects model + types message
   ↓
ChatPrompt submits via use-send-message hook
   ↓
POST /api/chat/route.ts
   ↓
OpenRouterClient.createChatCompletion()
   ↓
Response streamed back
   ↓
ChatMessages displays conversation
```

---

## 🚀 DATA FLOW SUMMARY

### Frontend → Backend
1. **User Actions** (click, submit) → React Components
2. **Server Actions** (`registerUser()`, `updateUserName()`) → Direct backend calls
3. **API Routes** (`POST /api/chat`) → Traditional HTTP endpoints
4. **Session** (`getCurrentUser()`) → JWT from cookies

### Backend → Database
1. **Prisma ORM** → PostgreSQL queries
2. **Services** (`UserService`) → Business logic
3. **External APIs** → OpenRouter (Chat), Stripe (payments), Resend (email)

---

## ✅ CURRENTLY USED vs ❌ UNUSED

### ✅ ACTIVE:
- `/login`, `/register` - Authentication
- `/dashboard` - Main user dashboard
- `/dashboard/settings` - User settings
- `/chat` - Chat with AI
- `/admin` - Admin panel (for ADMIN users only)

### ❌ UNUSED (Can be deleted):
- Landing page sections (features, testimonials, pricing cards)
- Blog components & content
- Documentation components & content
- Stripe webhooks & billing (config exists but no integration)
- Email functionality (setup exists but not used)

---

## 🛠️ TECH STACK

**Frontend**: React 18, Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui
**State Management**: Zustand (chat store)
**Forms**: React Hook Form + Zod validation
**Database**: PostgreSQL + Prisma ORM
**Authentication**: NextAuth v5 (JWT)
**External APIs**: OpenRouter (Chat), Stripe (optional), Resend (optional)
**Notifications**: Sonner (toast)
**UI Components**: Radix UI (via Shadcn/ui)
**Content**: Contentlayer2 (markdown processing - unused)

---

## 📊 FOLDER SIZE ESTIMATE

- `/app` - Frontend routes & pages (small)
- `/components` - Reusable UI (medium)
- `/lib` - Backend services & utilities (small)
- `/public` - Static assets (small)
- `/prisma` - Database schema & migrations (tiny)
- `/content` - Markdown files (can be large if filled)

---

## 🎓 LEARNING TIPS

1. **Start with**: `app/page.tsx` → `app/layout.tsx` → understand providers
2. **Auth flow**: `auth.ts` → `auth.config.ts` → `lib/services/user.ts`
3. **API**: `app/api/chat/route.ts` → how to handle POST requests
4. **Components**: `components/chat/` → how state & UI work together
5. **Database**: `prisma/schema.prisma` → data models

