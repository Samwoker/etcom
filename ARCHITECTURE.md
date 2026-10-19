# ETCOM FRONTEND DEMO: ARCHITECTURE & AGENT RULES

> **Etcom ("Hire. Pay. Prove.")** — A mobile-first marketplace for hiring verified independent professionals in Addis Ababa, paid with M-PESA.
> **Role of this Document**: This is the single source of truth for the Etcom frontend architecture, design system, coding conventions, domain models, and agent operating protocol. Every agent working in this repository MUST read and adhere to this document before writing or modifying any code.

---

## 1. Purpose and Scope

- **Nature of Project**: Frontend-only clickable demo engineered for a high-stakes hackathon pitch.
- **Backend & Network**: Strictly NO real backend, database, authentication provider, SMS gateway, or payment API. Everything is mocked using in-memory state and simulated asynchronous delays (300ms–600ms).
- **Core Mission**: Deliver a seamless, believable, high-fidelity experience covering complete user journeys for:
  1. **Customer** (requesting a pro, browsing verified tradespeople, reviewing quotes, chatting, paying via M-PESA, confirming completion, rating/disputing).
  2. **Professional** (onboarding, submitting identity & skill evidence, managing requests, submitting itemized quotes, tracking active jobs, managing portfolio & reviews).
  3. **Admin** (reviewing verification queues for identity/skills, evaluating evidence, resolving job disputes).
- **Scope Discipline**: **Do NOT add features, pages, buttons, or dependencies that are not explicitly requested.**

---

## 2. Non-Negotiable Rules

1. **shadcn/ui for Every Primitive**: Use shadcn/ui for all base UI elements (`Button`, `Card`, `Input`, `Badge`, `Tabs`, `Sheet`, `Dialog`, `Avatar`, `Skeleton`, `Separator`, etc.). Never hand-roll a primitive component that shadcn provides.
2. **Untouchable shadcn Primitives**: Never edit files in `src/components/ui/`. If modifications or customized behaviors are needed, wrap or compose them in `src/components/shared/` or feature components.
3. **Thin Pages**: Page components in `src/pages/` are strictly composition shells. They wire together feature components and call hooks. **Zero business logic, zero inline mock data literals, and zero styling logic beyond outer layout classes.**
4. **No Hardcoded Tokens**: Zero hardcoded hex colors, arbitrary border radii, or bespoke fonts in component markup. Always use semantic Tailwind theme tokens (e.g., `bg-primary`, `text-primary`, `text-muted-foreground`, `bg-muted`, `border-border`, `rounded-xl`).
5. **No Inline Styles**: `style={{}}` is strictly prohibited except for dynamic runtime values (e.g., dynamic progress bar percentages).
6. **Strict TypeScript (No `any`)**: All domain models, component props, hook returns, and service responses must have explicit, strongly-typed TypeScript definitions located in `src/types/`.
7. **No Real Network Calls**: All data must be fetched and mutated through mock service functions in `src/services/` that return Promises with realistic delays (300ms–600ms).
8. **Three Mandatory UI States on Every Screen**: Every view must explicitly handle:
   - **Loading state**: Render realistic `Skeleton` placeholders matching the shape of the content.
   - **Empty state**: Display the shared `EmptyState` component with appropriate icon, message, and call-to-action.
   - **Error / Edge states**: Graceful fallbacks for missing records, failed payments, or restricted listings.
9. **Single Responsibility & File Size**: One component per file. Target file length is **under 120 lines**. Split into smaller sub-components once a component exceeds this threshold.
10. **Mobile-First Responsive Web App**: Base styles are engineered mobile-first (390px). On medium (tablet, 768px) and desktop screens, the application responsively scales with fluid containers (`max-w-xl md:max-w-2xl lg:max-w-3xl`) and adaptive layouts (e.g. responsive grids). No artificial phone-mock bezels or fixed height borders.
11. **Iconography & Visual Cleanliness**: Use `lucide-react` exclusively for all icons. **Zero emojis in the user interface.**
12. **Tripartite Verification Transparency**: **Never display a single generic "Verified" badge.** Identity, skills, and work history are distinct pillars and must always be presented separately.

---

## 3. Technology Stack & Allowed Dependencies

| Category | Approved Technology | Usage / Constraints |
|---|---|---|
| **Build & Runtime** | Vite + React 19 + TypeScript | Strict TS compiler settings (`noImplicitAny`, etc.) |
| **Styling** | Tailwind CSS v4 | Semantic theme variables mapped to CSS tokens |
| **Component Primitives** | shadcn/ui | Located in `src/components/ui/` (never modify directly) |
| **Routing** | `react-router-dom` | Centralized routes in `src/app/routes.ts` |
| **State Management** | `zustand` | Single demo store in `src/store/demoStore.ts` |
| **Icons** | `lucide-react` | Sole source of icons across the app |
| **Notifications** | `sonner` (via shadcn) | User feedback for actions |
| **Typography** | `@fontsource-variable/inter` | Loaded globally as `--font-sans` |
| **Utilities** | `clsx`, `tailwind-merge`, `class-variance-authority` | Class composition via `cn()` in `src/lib/utils.ts` |

> ⚠️ **Dependency Policy**: Any additional package not in this list requires explicit user authorization before installation. Path alias `@/` maps to `src/`.

---

## 4. Directory & File Organization

```
src/
├── app/
│   ├── router.tsx             # Route table and RouterProvider configuration only
│   ├── routes.ts              # Centralized ROUTES path constants (only place paths are written)
│   └── providers.tsx          # App-wide providers (Sonner Toaster, etc.)
├── layouts/
│   ├── MobileShell.tsx        # Centered phone-width container, safe areas, floating DemoSwitcher
│   ├── AuthLayout.tsx         # Clean header, no bottom navigation
│   ├── CustomerLayout.tsx     # Customer header + BottomNav (Home, Jobs, Alerts, Account)
│   ├── ProLayout.tsx          # Pro header + BottomNav (Dashboard, Requests, Portfolio, Verification)
│   └── AdminLayout.tsx        # Admin header + BottomNav (Queue, Disputes)
├── pages/
│   ├── auth/                  # Thin route components for login, signup, phone verification
│   ├── customer/              # Thin route components for customer flow
│   ├── pro/                   # Thin route components for professional flow
│   └── admin/                 # Thin route components for admin verification & dispute queues
├── features/
│   ├── <domain>/              # auth, professionals, jobs, quotes, chat, payments,
│   │                          # reviews, verification, disputes, notifications
│   │   ├── components/        # Domain-specific UI components
│   │   ├── hooks/             # Data fetching, mutations, and form state hooks
│   │   └── index.ts           # Public domain API (external consumers import ONLY from here)
├── components/
│   ├── ui/                    # shadcn/ui primitives (DO NOT MODIFY)
│   └── shared/                # App-wide composite components (StatusBadge, PageHeader, etc.)
├── services/                  # Simulated async APIs (one file per domain, returns Promises)
├── data/                      # Immutable typed fixtures (professionals, jobs, reviews, etc.)
├── store/
│   └── demoStore.ts           # Zustand store: role, active user, demo switches, mutable job graph
├── types/                     # Domain type definitions (one file per domain)
├── lib/
│   ├── utils.ts               # Standard shadcn `cn` utility
│   ├── format.ts              # Currency (ETB), phone, and date formatters
│   └── constants.ts           # App-wide constants
└── styles/
    └── index.css              # Tailwind configuration & M-PESA theme CSS variables
```

---

## 5. Layering & Architectural Import Rules

```
┌─────────────────────────────────────────────────────────────┐
│                           PAGES                             │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              │
┌──────────────────────────────┐              │
│           FEATURES           │              │
│    (components/ & hooks/)    │              │
└──────────────┬───────────────┘              │
               │                              │
               ▼                              │
┌──────────────────────────────┐              │
│           SERVICES           │              │
│   (async simulated calls)    │              │
└──────────────┬───────────────┘              │
               │                              │
               ▼                              │
┌──────────────────────────────┐              ▼
│             DATA             │    ┌───────────────────┐
│     (immutable fixtures)     │    │ COMPONENTS/SHARED │
└──────────────────────────────┘    └─────────┬─────────┘
               ▲                              │
               │ (read/write state)           ▼
┌──────────────────────────────┐    ┌───────────────────┐
│       STORE/DEMOSTORE        │    │   COMPONENTS/UI   │
└──────────────────────────────┘    │     (shadcn)      │
                                    └───────────────────┘

[Allowed anywhere: src/types/* and src/lib/*]
```

### Strict Boundary Constraints:
1. **Unidirectional Flow**: `pages -> features -> services -> data` (with `features -> store`).
2. **Components Boundary**: `components/ui` and `components/shared` must **NEVER** import from `features`, `pages`, `services`, or `store`.
3. **Pure Services**: `services/` must **NEVER** import React, hooks, or UI components. They are pure TypeScript functions returning Promises.
4. **Pure Data Fixtures**: `data/` contains only static, typed objects and arrays. No functions with business logic.
5. **Feature Encapsulation**: A feature must never import internal files of another feature (e.g., `features/jobs/components/JobItem.tsx`). External features must import only from `features/<domain>/index.ts`.
6. **No Direct Page Imports**: Pages must never bypass features to import directly from `services/` or `data/`.

---

## 6. Responsibility Matrix ("What Goes Where")

| Concern | Location | Rule |
|---|---|---|
| Route strings | `src/app/routes.ts` | The ONLY location where path strings may exist. |
| Page structure & wrappers | `src/layouts/` | Shell, headers, footers, safe area insets. |
| Page route endpoints | `src/pages/` | Pure composition of features. Max 50 lines. |
| Domain-specific UI | `src/features/<domain>/components/` | Domain logic & specific layout. |
| Domain data fetching & forms | `src/features/<domain>/hooks/` | Calls services, returns standard `{ data, isLoading, error, actions }`. |
| Simulated backend calls | `src/services/` | Async functions with `delay(300-600)`. |
| Raw sample fixtures | `src/data/` | Static typed arrays with Addis Ababa context. |
| Live interactive demo state | `src/store/demoStore.ts` | Role switching, mutable jobs, payment toggles. |
| Formatting helpers | `src/lib/format.ts` | `formatETB()`, `formatEthiopianPhone()`, date helpers. |
| Reusable composites | `src/components/shared/` | UI patterns used across two or more pages. |
| Atomic primitives | `src/components/ui/` | Direct shadcn components. Untouchable. |

---

## 7. Design System & Theme Specification (M-PESA Aesthetic)

All design tokens are defined as CSS variables in `src/styles/index.css` and mapped to Tailwind semantic classes.

### 7.1 Color Palette
- **M-PESA Primary Green**: `#4CB848` (Primary brand color)
  - Dark / Active: `#2E8B2E`
  - Soft Tint / Background Highlight: `#E8F5E9`
- **Destructive / Accent Red**: `#E4002B` (Failed states, cancellations, disputes)
- **Warning Amber**: `#F5A623` (In-review, pending items, negotiation)
- **Foreground / Text**: `#1A1A1A` (High-contrast primary text)
- **Muted Text**: `#6B7280` (Secondary metadata, captions)
- **Background**: `#FFFFFF` (Base surface)
- **Muted / Surface Background**: `#F4F6F4` (Cards, list item backgrounds, inputs)
- **Borders & Dividers**: `#E3E8E3` (Subtle boundary lines)

### 7.2 Status Color Matrix
| Status Category | Semantic Meaning | Color Token | Badge Style |
|---|---|---|---|
| **Verified / Confirmed / Completed** | Approved, paid, done | Primary Green (`#4CB848`) | Light green bg + dark green text |
| **In Review / Pending / Negotiating** | Awaiting action or validation | Warning Amber (`#F5A623`) | Light amber bg + dark amber text |
| **Not Verified / Neutral / Unpaid** | Missing, unsubmitted, draft | Muted Gray (`#6B7280`) | Light gray bg + gray text |
| **Rejected / Disputed / Failed** | Denied, payment failed, conflict | Destructive Red (`#E4002B`) | Light red bg + dark red text |

### 7.3 Typography & Sizing
- **Font Family**: Inter Variable (`@fontsource-variable/inter`) configured as `--font-sans`.
- **Page Titles**: `20px` (`text-xl`), font-semibold (`font-semibold`), tracking-tight.
- **Section Headers**: `16px` (`text-base`), font-semibold (`font-semibold`).
- **Body Text**: `14px` (`text-sm`), regular or medium.
- **Captions & Metadata**: `12px` (`text-xs`), text-muted-foreground.

### 7.4 Radii & Spatial Metrics
- **Cards**: `rounded-xl` (`12px`).
- **Inputs & Selects**: `rounded-lg` (`10px`).
- **Badges & Primary CTAs**: Fully rounded pills (`rounded-full`).
- **Page Padding**: Standard `px-4` (`16px`) horizontal padding.
- **Card Spacing**: `gap-3` (`12px`) or `gap-4` (`16px`) between cards in lists.
- **Primary Action Buttons**: Full-width on mobile (`w-full`), minimum touch height of `48px` (`h-12`), solid green (`bg-primary text-primary-foreground`).

---

## 8. Shared Component Catalog (`src/components/shared/`)

Every multi-use component must be built once in `src/components/shared/` and reused everywhere:

1. **`PageHeader`**: Sticky or top header with optional back navigation (`ChevronLeft`), title, and optional right action/icon.
2. **`BottomNav`**: Role-aware bottom navigation bar with active state indicators (Customer, Pro, Admin).
3. **`StatusBadge`**: Pill badge supporting variants (`verified`, `pending`, `neutral`, `failed`, `disputed`) with consistent colors.
4. **`VerificationBadges`**: Renders three distinct status indicators side-by-side:
   - **Identity** (e.g., "National ID: Verified" / "Not submitted")
   - **Skills** (e.g., "Trade Certificate: Accepted" / "Self-reported")
   - **Work History** (e.g., "4 Confirmed Jobs" / "New to Etcom")
5. **`JobStatusStrip`**: Visual component rendering the 3 independent job lifecycle axes:
   - `QuoteStatus` (Requested / Quoted / Negotiating / Accepted / Declined)
   - `PaymentStatus` (Unpaid / Pending / Confirmed / Failed)
   - `CompletionStatus` (Not Started / In Progress / Awaiting Confirmation / Completed / Disputed)
6. **`PriceTag`**: Formats prices in Ethiopian Birr (e.g., `3,500 ETB`) with optional label breakdown (Labor / Materials).
7. **`RatingStars`**: Renders numerical score alongside filled/empty `lucide-react` star icons and review count.
8. **`EmptyState`**: Centered icon, title, supporting description, and optional primary button.
9. **`ListSkeleton`**: Generic list skeleton loader displaying simulated card rows with pulsing bone shapes.
10. **`StickyCta`**: Fixed bottom container above mobile safe area, housing the primary 48px full-width action button.
11. **`ProfessionalCard`**: Reusable summary card for pros (avatar, name, trade, location, verification badges, rating, job count).
12. **`ChatBubble`**: Renders sender vs. receiver chat messages with timestamp and status indicators.
13. **`DemoSwitcher`**: Floating presentation button on `MobileShell`. Opens a bottom `Sheet` allowing quick switching between:
    - Roles: Customer, Professional, Admin
    - Simulated M-PESA payment outcome: `success` vs. `fail`
    - Demo reset action: Restores initial fixtures.

---

## 9. Mobile-First & Responsive Web App Specifications

- **Mobile-First Foundation**: Designed mobile-first for `390px` mobile viewport (iPhone 14/15/16 dimensions) with thumb-accessible controls.
- **Responsive Viewport Adaptation**: On medium (tablet, 768px) and desktop screens, `MobileShell` acts as a responsive web app container scaling smoothly (`max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto`). Eliminates rigid phone-mock frames or artificial height cutoffs.
- **Adaptive Layouts**: Multi-item layouts (such as role selection, service cards, or dashboard summaries) adapt responsively from single-column vertical stacks on mobile into 2-column or multi-column grids on medium screens (`md:grid md:grid-cols-2`).
- **Touch & Click Target Minimum**: All clickable elements must have a touch target of at least `44px` x `44px`.
- **Modals vs. Sheets**: Use bottom `Sheet` / `Drawer` on mobile and responsive dialog/sheets on medium viewports.
- **Bottom Navigation Clearance**: All scrollable pages with a bottom nav must include bottom padding (`pb-20` / `pb-24`) so content is never obscured by the navigation bar or sticky CTA.

---

## 10. Domain Model & TypeScript Specifications (`src/types/`)

### 10.1 Roles & Verification
```typescript
export type Role = 'customer' | 'professional' | 'admin';

// Verification consists of THREE INDEPENDENT fields. Never combine into one badge.
export type IdentityStatus = 
  | 'not_submitted' 
  | 'in_review' 
  | 'verified' 
  | 'more_info_needed' 
  | 'rejected';

export type SkillsStatus = 
  | 'not_submitted' 
  | 'in_review' 
  | 'evidence_accepted' 
  | 'assessment_required' 
  | 'more_info_needed' 
  | 'not_verified';

// Work history is derived ONLY from completed Etcom platform jobs. Never self-reported.
export type WorkHistoryCount = number;

export type ListingStatus = 
  | 'in_progress' 
  | 'eligible' 
  | 'restricted' 
  | 'suspended';
```

### 10.2 Job Lifecycle (Three Orthogonal Axes)
```typescript
// Axis 1: Quote state
export type QuoteStatus = 
  | 'requested' 
  | 'quoted' 
  | 'negotiating' 
  | 'accepted' 
  | 'declined';

// Axis 2: M-PESA payment state
export type PaymentStatus = 
  | 'unpaid' 
  | 'pending' 
  | 'confirmed' 
  | 'failed';

// Axis 3: Execution and dispute state
export type CompletionStatus = 
  | 'not_started' 
  | 'in_progress' 
  | 'awaiting_confirmation' 
  | 'completed' 
  | 'disputed';
```

### 10.3 Core Entities
```typescript
export interface Professional {
  id: string;
  fullName: string;
  phone: string;
  trade: 'Plumber' | 'Electrician' | 'TV Repair' | 'Painter' | 'Carpenter';
  subCity: 'Bole' | 'Piassa' | 'CMC' | 'Kazanchis' | 'Sarbet' | 'Gerji' | 'Akaki';
  avatarUrl: string;
  bio: string;
  identityStatus: IdentityStatus;
  skillsStatus: SkillsStatus;
  confirmedJobsCount: number; // Etcom verified jobs
  listingStatus: ListingStatus;
  claimedExperienceYears: number; // Must be labeled "Self-reported" in UI
  rating: number;
  reviewCount: number;
  hourlyRateEstimate?: number;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  subCity: string;
  avatarUrl?: string;
}

export interface Quote {
  id: string;
  jobId: string;
  proId: string;
  laborAmountETB: number;
  materialsAmountETB: number;
  totalAmountETB: number;
  scopeDescription: string;
  validUntil: string;
  createdAt: string;
  status: QuoteStatus;
}

export interface Job {
  id: string;
  customerId: string;
  proId: string;
  title: string;
  description: string;
  category: string;
  subCity: string;
  quoteStatus: QuoteStatus;
  paymentStatus: PaymentStatus;
  completionStatus: CompletionStatus;
  activeQuote?: Quote;
  createdAt: string;
  scheduledDate?: string;
}

export interface Message {
  id: string;
  jobId: string;
  senderId: string;
  senderRole: Role;
  text: string;
  timestamp: string;
  attachmentName?: string;
}

export interface Review {
  id: string;
  jobId: string;
  proId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface EvidenceItem {
  id: string;
  proId: string;
  type: 'national_id' | 'kebele_id' | 'trade_license' | 'tvet_certificate' | 'portfolio_photo';
  title: string;
  fileName: string;
  status: 'pending' | 'accepted' | 'rejected' | 'more_info_needed';
  rejectionReason?: string;
  submittedAt: string;
}

export interface Dispute {
  id: string;
  jobId: string;
  proId: string;
  customerId: string;
  reason: string;
  desiredResolution: string;
  status: 'opened' | 'under_review' | 'resolved_refund' | 'resolved_payout' | 'closed';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  linkRoute: string;
  read: boolean;
  createdAt: string;
}
```

### 10.4 Copywriting Rules
- **No Escrow Terminology**: Under no circumstances should the word "escrow" appear in the interface.
- **No Refund Guarantees**: Never promise automatic refunds. Disputes undergo mediation.
- **Evidence Labeling**: Unclear or unverified documents must display as **"Not verified"** (never "Rejected" unless formally rejected by admin).
- **Experience Labeling**: Any unconfirmed claims must explicitly be tagged **"Self-reported"**.

---

## 11. Mock Data & Demo State Architecture

### 11.1 Fixtures Baseline (`src/data/`)
- **8 Professionals**: Diverse Addis Ababa trades (plumbers, electricians, painters, TV technicians). Must include a mix of credentials, including **at least one newly registered, unverified professional with 0 confirmed jobs**.
- **3 Customers**: Varied locations (Bole, CMC, Kazanchis).
- **6 Jobs**: Across distinct lifecycle intersections (e.g., Job 1: Quoted / Unpaid; Job 2: Accepted / Paid / In Progress; Job 3: Completed / Reviewed; Job 4: Disputed / Payment Confirmed).
- **Ethiopian Context**: Authentic names (e.g., Abebe Bikila, Dawit Yohannes, Bethlehem Tadesse), real Addis neighborhoods, local currency `ETB`, phone format `+251 9X XXX XXXX`.

### 11.2 State Store (`src/store/demoStore.ts`)
Zustand store containing:
```typescript
interface DemoStore {
  role: Role;
  currentUserId: string;
  paymentOutcome: 'success' | 'fail';
  jobs: Job[];
  quotes: Quote[];
  evidence: EvidenceItem[];
  disputes: Dispute[];
  
  // Actions
  setRole: (role: Role) => void;
  setCurrentUser: (userId: string) => void;
  setPaymentOutcome: (outcome: 'success' | 'fail') => void;
  requestQuote: (jobId: string, details: Partial<Job>) => void;
  submitQuote: (quote: Quote) => void;
  acceptQuote: (jobId: string) => void;
  simulateMpesaPayment: (jobId: string) => Promise<boolean>;
  confirmJobCompletion: (jobId: string) => void;
  raiseDispute: (jobId: string, reason: string) => void;
  adminReviewEvidence: (evidenceId: string, status: EvidenceItem['status']) => void;
  resetDemoData: () => void;
}
```

### 11.3 Interaction Simulation
- **OTP Verification**: Any 6-digit number is immediately accepted.
- **File Uploads**: HTML file pickers capture and store the filename in state without actual file upload.
- **M-PESA Payment Flow**:
  1. Displays realistic M-PESA USSD push modal/prompt.
  2. Implements a 3-second countdown / loading pulse.
  3. Evaluates `demoStore.paymentOutcome`:
     - If `'success'`: Sets `PaymentStatus = 'confirmed'`, triggers celebration toast, navigates to `/jobs/:id`.
     - If `'fail'`: Sets `PaymentStatus = 'failed'`, triggers alert toast, renders retry action.

---

## 12. Complete Route Map (`src/app/routes.ts`)

Every route is referenced exclusively through the `ROUTES` constant:

```typescript
export const ROUTES = {
  // Auth Flows
  AUTH_WELCOME: '/',
  AUTH_SIGNUP: '/signup',
  AUTH_VERIFY_PHONE: '/verify-phone',

  // Customer Journey
  CUSTOMER_HOME: '/home',
  CUSTOMER_REQUEST_NEW: '/request/new',
  CUSTOMER_RESULTS: '/results',
  CUSTOMER_PRO_DETAIL: (id: string = ':id') => `/professionals/${id}`,
  CUSTOMER_JOBS: '/jobs',
  CUSTOMER_JOB_DETAIL: (id: string = ':id') => `/jobs/${id}`,
  CUSTOMER_JOB_CHAT: (id: string = ':id') => `/jobs/${id}/chat`,
  CUSTOMER_JOB_QUOTE: (id: string = ':id') => `/jobs/${id}/quote`,
  CUSTOMER_JOB_CONFIRM: (id: string = ':id') => `/jobs/${id}/confirm`,
  CUSTOMER_JOB_PAY: (id: string = ':id') => `/jobs/${id}/pay`,
  CUSTOMER_JOB_COMPLETE: (id: string = ':id') => `/jobs/${id}/complete`,
  CUSTOMER_JOB_DISPUTE: (id: string = ':id') => `/jobs/${id}/dispute`,
  CUSTOMER_ACCOUNT: '/account',
  CUSTOMER_NOTIFICATIONS: '/notifications',

  // Professional Journey
  PRO_ONBOARDING: '/p/onboarding',
  PRO_VERIFY_IDENTITY: '/p/verify/identity',
  PRO_VERIFY_SKILLS: '/p/verify/skills',
  PRO_VERIFICATION: '/p/verification',
  PRO_DASHBOARD: '/p/dashboard',
  PRO_REQUESTS: '/p/requests',
  PRO_JOB_DETAIL: (id: string = ':id') => `/p/jobs/${id}`,
  PRO_JOB_QUOTE: (id: string = ':id') => `/p/jobs/${id}/quote`,
  PRO_PORTFOLIO: '/p/portfolio',
  PRO_REVIEWS: '/p/reviews',

  // Admin Journey
  ADMIN_QUEUE: '/admin/queue',
  ADMIN_REVIEW_DETAIL: (id: string = ':id') => `/admin/review/${id}`,
  ADMIN_DISPUTES: '/admin/disputes',
} as const;
```

---

## 13. Code Standards & Quality Guidelines

- **File Naming**:
  - Components: PascalCase (e.g., `ProfessionalCard.tsx`, `JobStatusStrip.tsx`).
  - Hooks: camelCase with `use` prefix (e.g., `useProfessionalList.ts`).
  - Services: camelCase (e.g., `jobService.ts`).
  - Types: camelCase (e.g., `jobs.ts`, `verification.ts`).
- **Hook Signatures**: Every data hook must return `{ data, isLoading, error, actions }`.
- **Service Signatures**: Functions must be named `getXxx`, `submitXxx`, `updateXxx` and always return explicit Promises.
- **Tailwind Ordering**: `[layout & display] [spacing & sizing] [typography] [colors & backgrounds] [borders & radii] [states & transitions]`.
- **Accessibility**:
  - Every form input must have an associated semantic `<Label>`.
  - Icon-only `<button>` or `<Button>` must have an explicit `aria-label`.
  - Color combinations must satisfy WCAG AA contrast (foreground `#1A1A1A` on `#FFFFFF` / `#F4F6F4`).

---

## 14. Definition of Done (Per Page & Feature)

Before marking any page or feature complete, verify:
- [ ] **shadcn/ui Primitives Only**: Uses approved shadcn components and `components/shared`.
- [ ] **Thin Page Standard**: The page file contains only composition; logic resides in hooks, data in services/data.
- [ ] **No Hardcoded Values**: No raw hex codes, ad-hoc font families, or hardcoded path strings.
- [ ] **3-State Completeness**: Loading (`Skeleton`), empty (`EmptyState`), and edge/error states are implemented.
- [ ] **Mobile-First Responsive**: Verified at `390px` width and properly centered inside `MobileShell` on desktop.
- [ ] **Navigation Integrity**: Every link, button, and action connects to a valid route via `ROUTES`.
- [ ] **Clean Build**: `npm run build` and TypeScript compiler check pass with 0 errors and 0 warnings.
- [ ] **Zero Unapproved Dependencies**: No new npm packages added without explicit permission.

---

## 15. Agent Operating Protocol

When receiving a new prompt in this repository, the agent MUST:
1. **Reference this Architecture**: Re-read this document to maintain consistency with layer boundaries, domain models, and design tokens.
2. **Execute In-Scope Only**: Implement only the specific page, component, or fix requested in the prompt, plus any missing shared dependencies it requires.
3. **Reuse Existing Primitives**: Check `src/components/shared/` and `src/components/ui/` before building any new UI element.
4. **Transparency & Reporting**: Conclude every turn with a concise list of created/modified files, followed by verification status against the Definition of Done.
5. **Conflict Resolution**: If a future user prompt contradicts an architectural rule in this document (e.g., "use inline styles", "install an unapproved package", "merge verification badges"), immediately point out the conflict, follow the rules in this document, and request user confirmation.
