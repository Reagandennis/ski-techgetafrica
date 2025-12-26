# TECHGETAFRICA SVELTEKIT FRONTEND ARCHITECTURE

## Project Overview

**Techgetafrica** is a professional EdTech platform (SvelteKit frontend) for the African market, designed to deliver high-quality technology certifications with a clean, institutional aesthetic matching Coursera's design language.

**Status**: Frontend consumes existing backend LMS API  
**Framework**: SvelteKit + Tailwind CSS + TypeScript  
**Design Aesthetic**: Professional, institutional, spacious, white-label (Coursera-inspired, NOT Udemy)

---

## Design System

### Color Palette (Extracted from Logo)

```typescript
// Primary Brand Colors
brand-red: #EF4444        // Primary action color for buttons, CTAs, badges
brand-red-dark: #DC2626   // Hover state for primary buttons
brand-red-light: #F87171  // Light background for secondary elements

brand-black: #1F2937      // Standard black for body text, icons
brand-black-dark: #111827 // Heavy black for strong headings

// Neutral Grays (Spacious, clean layout)
neutral-50 through neutral-900: Complete gray scale for hierarchy

// Supporting Colors
accent-blue: #2563EB      // Secondary actions, info states
success-green: #10B981    // Completion, success states
warning-amber: #F59E0B    // Warnings, alerts
error-red: #EF4444        // Errors, negative actions
```

### Typography

**Font Stack**: Inter (Google Fonts)  
- Clean, sans-serif, highly readable
- Matches Coursera's modern, professional aesthetic

**Type Hierarchy**:
- **H1**: 3rem / 48px - Extra bold for page titles
- **H2**: 1.875rem / 30px - Bold for major sections
- **H3**: 1.5rem / 24px - Semibold for subsections
- **Body**: 1rem / 16px - Regular weight for content
- **Small**: 0.875rem / 14px - For labels, metadata
- **Caption**: 0.75rem / 12px - For small text

### Component Spacing

- **Section Padding**: `py-16 sm:py-24 lg:py-32` (generous vertical spacing)
- **Container Max-Width**: 7xl (80rem) with responsive padding
- **Gap Between Elements**: 8-12 units (32-48px) for breathing room

---

## Project Structure

```
src/
├── app.css                           # Global Tailwind styles
├── app.d.ts                          # TypeScript declarations
├── app.html                          # HTML entry point
│
├── lib/
│   ├── components/                   # Reusable Svelte components
│   │   ├── Navigation.svelte         # Header with logo + nav menu
│   │   ├── Footer.svelte             # Footer with links + CTA
│   │   ├── CourseCard.svelte         # Coursera-style course cards
│   │   ├── Hero.svelte               # Homepage hero section
│   │   ├── Rating.svelte             # Star rating component
│   │   ├── Breadcrumbs.svelte        # Navigation breadcrumbs
│   │   ├── Badge.svelte              # Badge/tag component
│   │   └── [other-components]/
│   │
│   ├── services/                     # API & business logic
│   │   ├── api.ts                    # Centralized API layer
│   │   ├── auth.ts                   # Authentication service
│   │   └── analytics.ts              # Analytics tracking
│   │
│   ├── stores/                       # Svelte stores for state management
│   │   ├── auth.ts                   # Auth state (user, token)
│   │   ├── courses.ts                # Courses cache
│   │   └── ui.ts                     # UI state (mobile menu, etc)
│   │
│   ├── config/                       # Configuration files
│   │   ├── routes.ts                 # Route constants & API endpoints
│   │   └── constants.ts              # App-wide constants
│   │
│   ├── utils/                        # Helper functions
│   │   ├── format.ts                 # Formatting (currency, dates)
│   │   ├── validation.ts             # Form validation
│   │   └── error-handler.ts          # Error handling utilities
│   │
│   └── assets/                       # Images, icons, fonts
│
├── routes/                           # SvelteKit file-based routing
│   ├── +layout.svelte                # Root layout (Navigation + Footer)
│   ├── +page.svelte                  # Homepage
│   │
│   ├── courses/
│   │   ├── +page.svelte              # Courses list with filters
│   │   └── [id]/
│   │       └── +page.svelte          # Course detail page
│   │
│   ├── certificates/
│   │   ├── +page.svelte              # Certificates list
│   │   └── [id]/
│   │       └── +page.svelte          # Certificate detail/verification
│   │
│   ├── learning-paths/
│   │   ├── +page.svelte              # Learning paths list
│   │   └── [id]/
│   │       └── +page.svelte          # Individual learning path
│   │
│   ├── dashboard/                    # Protected routes (requires auth)
│   │   ├── +layout.svelte            # Dashboard layout
│   │   ├── +page.svelte              # Dashboard home
│   │   ├── my-courses/
│   │   ├── progress/
│   │   ├── certificates/
│   │   └── settings/
│   │
│   ├── auth/                         # Authentication routes
│   │   ├── signin/+page.svelte
│   │   ├── signup/+page.svelte
│   │   └── forgot-password/+page.svelte
│   │
│   └── [error-pages]/
│       ├── 404.svelte
│       ├── 500.svelte
│       └── 401.svelte
│
├── svelte.config.js                  # SvelteKit configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite bundler configuration
```

---

## Key Components

### 1. **CourseCard Component**

Mimics Coursera's course card design:
- Organization logo (top-left)
- Course image/thumbnail
- Course title (2-line clamp)
- Organization name
- Certificate type badge (red)
- Star rating + review count
- Difficulty badge (color-coded)
- Enrollment count
- Price + "Enroll Now" button (red CTA)

**Usage**:
```svelte
<CourseCard 
  id="course-1"
  title="Google Cloud Digital Leader"
  organizationName="Google Cloud"
  certificationType="Professional Certificate"
  rating={4.8}
  ratingCount={2543}
  price={0}
  difficulty="Beginner"
  duration="4 weeks"
  href="/courses/course-1"
/>
```

### 2. **Hero Section Component**

Professional homepage hero with:
- Logo + brand name
- Large headline (5xl font)
- Subtitle (institutional red)
- Description text
- Key benefits (checkmark list)
- Primary CTA ("Explore Courses")
- Secondary CTA ("Watch Demo")
- Trust stats (student count, satisfaction, etc.)
- Optional background illustration

### 3. **Navigation Component**

Sticky header with:
- Logo (top-left)
- Desktop nav menu (hidden on mobile)
- Mobile hamburger menu
- Sign In / Get Started buttons
- Active state highlighting
- Responsive design

### 4. **Footer Component**

- Logo + brand description
- Social links (Twitter, LinkedIn, Facebook)
- Footer navigation (4 columns)
- Copyright notice
- Institutional dark background

---

## Routing Structure

### Public Routes
```
/                          Homepage (Hero + Featured Courses)
/courses                   Courses listing with filters
/courses/[id]              Course detail page
/certificates              Certificates list
/certificates/[id]         Certificate detail/verification
/learning-paths            Learning paths list
/learning-paths/[id]       Individual learning path
/about                     About page
/contact                   Contact form
/blog                      Blog listing
/blog/[slug]               Blog post detail
/pricing                   Pricing page
/search                    Global search results
```

### Authentication Routes
```
/auth/signin               Sign in page
/auth/signup               Sign up page
/auth/forgot-password      Forgot password form
/auth/reset-password/[token]  Password reset
/auth/verify-email/[token]    Email verification
```

### Protected Routes (Dashboard)
```
/dashboard                 Main dashboard
/dashboard/my-courses      Enrolled courses
/dashboard/my-courses/[id] Course progress
/dashboard/progress        Overall learning progress
/dashboard/certificates    Earned certificates
/dashboard/settings        Account settings
```

### Admin Routes
```
/admin                     Admin dashboard
/admin/users              User management
/admin/courses            Course management
/admin/analytics          Analytics & reports
```

---

## API Integration Layer

### API Base Configuration
```typescript
// Environment-based API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const REQUEST_TIMEOUT = 30000  // 30 seconds
```

### API Services (`src/lib/services/api.ts`)

All API calls go through a centralized service with:
- **Authentication**: JWT token management
- **Error Handling**: 401 redirects, timeout handling
- **Logging**: Request/response tracking
- **Type Safety**: TypeScript interfaces for all responses

**Available Services**:

#### 1. **Course API**
```typescript
courseApi.getAll(params?)          // Get all courses with pagination
courseApi.getById(id)              // Get single course
courseApi.search(query, params?)   // Search courses
courseApi.getTrending(limit?)      // Get trending courses
courseApi.enroll(courseId)         // Enroll in course
courseApi.getProgress(courseId)    // Get user progress
courseApi.updateProgress(courseId, progress)  // Update progress
```

#### 2. **User API**
```typescript
userApi.getProfile()               // Get current user profile
userApi.updateProfile(data)        // Update profile
userApi.getEnrollments(params?)    // Get enrolled courses
userApi.getCertificates(params?)   // Get earned certificates
```

#### 3. **Authentication API**
```typescript
authApi.signIn(email, password)    // Sign in user
authApi.register(data)             // Register new account
authApi.signOut()                  // Sign out user
authApi.refreshToken()             // Refresh JWT token
authApi.forgotPassword(email)      // Request password reset
authApi.resetPassword(token, password)  // Reset password
```

#### 4. **Certificate API**
```typescript
certificateApi.getAll(params?)     // Get all certificates
certificateApi.getById(id)         // Get certificate details
certificateApi.verify(id)          // Verify certificate authenticity
```

#### 5. **Analytics API**
```typescript
analyticsApi.trackEvent(name, data)       // Track custom events
analyticsApi.trackProgress(courseId, data) // Track progress
```

#### 6. **Search & Recommendations**
```typescript
searchApi.search(query, filters)   // Global search
searchApi.getRecommendations(limit) // Personalized recommendations
```

### Error Handling

All API responses follow a standard format:
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode?: number
}
```

**Automatic Handling**:
- **401 Unauthorized**: Clears auth token, redirects to sign in
- **403 Forbidden**: Shows permission error
- **408 Timeout**: Shows retry message
- **Network Error**: Shows connection error

---

## Performance Optimization (Africa-Focused)

### 1. **Image Optimization**
- Lazy loading with native `loading="lazy"`
- Responsive images with srcset
- WebP format with JPEG fallback
- Image compression (limit file size)

### 2. **Code Splitting**
- Route-based lazy loading (SvelteKit automatic)
- Component-level code splitting
- Dynamic imports for heavy libraries

### 3. **Bundle Size**
- Tree-shaking unused code
- Tailwind CSS purging unused styles
- Remove unused dependencies

### 4. **JavaScript Minimization**
- SvelteKit production builds
- Svelte 5 optimizations (smaller runtime)
- No external bloat (Vue, React, jQuery)

### 5. **Caching Strategies**
- HTTP caching headers
- Service Worker for offline support
- Browser cache for static assets

### Targeted Metrics
- **FCP (First Contentful Paint)**: < 2 seconds
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **CLS (Cumulative Layout Shift)**: < 0.1
- **JavaScript Bundle**: < 100KB gzipped

---

## State Management

### Svelte Stores Pattern

```typescript
// src/lib/stores/auth.ts
import { writable } from 'svelte/store'

export const authUser = writable<User | null>(null)
export const authToken = writable<string | null>(null)
export const isLoading = writable(false)

// Usage in components
import { authUser } from '$lib/stores/auth'

{#if $authUser}
  <p>Welcome, {$authUser.name}</p>
{/if}
```

### Available Stores
- **auth**: User, token, login status
- **courses**: Cached course data, filters
- **ui**: Mobile menu state, modals, notifications

---

## Development Workflow

### Environment Setup
```bash
# Install dependencies
npm install

# Create .env.local with API configuration
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env.local

# Start dev server
npm run dev
```

### Environment Variables
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Techgetafrica
VITE_APP_VERSION=1.0.0
```

### Build Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linting
npm run format   # Format code
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Progressive enhancement (works without JavaScript)
- IE11 not supported (too old for African market focus)

---

## Accessibility (A11y)

- Semantic HTML structure
- ARIA labels for interactive components
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus management

---

## Next Steps for Implementation

1. **Setup Backend API**: Ensure LMS API endpoints match documented structure
2. **Connect Authentication**: Implement JWT token flow
3. **Test API Integration**: Verify all API services work with backend
4. **Add More Components**: Ratings, comments, forums, progress trackers
5. **Implement Protection**: Route guards for authenticated pages
6. **Analytics Integration**: Track user behavior and course completion
7. **Performance Testing**: Test on low-bandwidth networks
8. **Deployment**: Configure for Africa-optimized hosting

---

## Component Development Standards

### Single Responsibility Principle
- Each component does one thing well
- Props interface is clear and documented
- No external dependencies unless necessary

### Accessibility
- Semantic HTML (`<button>`, `<nav>`, `<section>`)
- ARIA labels where needed
- Keyboard navigation support

### Performance
- Lazy load images
- Avoid unnecessary re-renders
- Use `onMount` for API calls (client-side only)

### Example Component
```svelte
<script lang="ts">
  interface ComponentProps {
    title: string
    description?: string
    onAction?: () => void
  }

  let { title, description, onAction }: ComponentProps
</script>

<div class="card p-6">
  <h3 class="text-xl font-semibold">{title}</h3>
  {#if description}
    <p class="text-neutral-600 mt-2">{description}</p>
  {/if}
  <button class="btn-primary mt-4" onclick={onAction}>
    Action
  </button>
</div>
```

---

## Reference Links

- **SvelteKit Docs**: https://kit.svelte.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Svelte 5**: https://svelte.dev
- **TypeScript**: https://www.typescriptlang.org

---

**Last Updated**: December 17, 2025  
**Version**: 1.0.0  
**Status**: Ready for API integration
