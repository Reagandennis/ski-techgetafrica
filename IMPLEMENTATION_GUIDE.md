# TECHGETAFRICA FRONTEND - IMPLEMENTATION GUIDE

## Quick Start

### 1. Initial Setup
```bash
cd /Users/reagan/Desktop/ski-techgetafrica

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your backend API URL
# VITE_API_BASE_URL=http://your-backend-api.com/api
```

### 2. Start Development Server
```bash
npm run dev
# Opens http://localhost:5173
```

### 3. Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

---

## Design System Overview

### Color Palette (Strictly Enforced)
- **Primary Action**: `#EF4444` (Brand Red) - Use ONLY for primary CTAs
- **Strong Text**: `#1F2937` (Brand Black) - For headings and emphasis
- **Body Text**: `#4B5563` (Neutral 600) - Standard reading text
- **Borders**: `#E5E7EB` (Neutral 200) - Card borders, dividers
- **Background**: `#FFFFFF` (White) - Primary background

### Typography
- **Font**: Inter (loaded from Google Fonts)
- **Headings**: Extra bold (800) for impact
- **Body**: Regular weight (400) for readability
- **Scale**: Use Tailwind's standard scale (sm, base, lg, xl, 2xl, etc.)

### Spacing Philosophy
**"Generous and spacious"** - Not cramped. Professional.
- Between sections: `py-16 sm:py-24 lg:py-32`
- Between cards: `gap-8`
- Within cards: `p-5` to `p-8`

---

## Component Development Guide

### Creating New Components

#### 1. **Example: Custom Button Component**

```svelte
<!-- src/lib/components/Button.svelte -->
<script lang="ts">
  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'tertiary'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    onclick?: () => void
  }

  let { variant = 'primary', size = 'md', disabled = false, onclick }: ButtonProps
</script>

<button
  class="
    transition-all duration-200 ease-in-out
    font-semibold rounded-lg
    
    {variant === 'primary'
      ? 'bg-brand-red text-white hover:bg-brand-red-dark shadow-md'
      : variant === 'secondary'
        ? 'border-2 border-brand-black text-brand-black hover:bg-neutral-100'
        : 'text-brand-red hover:text-brand-red-dark'}
    
    {size === 'sm'
      ? 'px-4 py-2 text-sm'
      : size === 'lg'
        ? 'px-8 py-4 text-lg'
        : 'px-6 py-3 text-base'}
    
    {disabled ? 'opacity-50 cursor-not-allowed' : ''}
  "
  {disabled}
  {onclick}
  {...$$restProps}
>
  <slot />
</button>
```

#### 2. **Usage**
```svelte
<script>
  import Button from '$lib/components/Button.svelte'
</script>

<Button variant="primary" size="lg" onclick={() => console.log('Clicked!')}>
  Enroll Now
</Button>
```

### Component Best Practices

1. **Props Interface**
   - Always define clear props interface
   - Use TypeScript for type safety
   - Document each prop with JSDoc comments

2. **Accessibility**
   - Use semantic HTML (`<button>`, `<a>`, `<nav>`)
   - Add ARIA labels for screen readers
   - Support keyboard navigation

3. **Styling**
   - Use Tailwind classes (no inline styles)
   - Follow color palette strictly
   - Use consistent spacing

4. **Performance**
   - Lazy load images with `loading="lazy"`
   - Avoid animations on mount
   - Use `onMount` only for client-side logic

---

## API Integration Patterns

### 1. **Fetching Data in Components**

```svelte
<!-- src/routes/courses/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte'
  import { courseApi } from '$lib/services/api'

  let courses = []
  let loading = true
  let error = null

  onMount(async () => {
    try {
      const response = await courseApi.getAll({ limit: 20 })
      if (response.success) {
        courses = response.data
      } else {
        error = response.error
      }
    } catch (err) {
      error = 'Failed to load courses'
    } finally {
      loading = false
    }
  })
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p class="text-error-red">{error}</p>
{:else}
  {#each courses as course (course.id)}
    <CourseCard {...course} />
  {/each}
{/if}
```

### 2. **Authentication Flow**

```svelte
<script lang="ts">
  import { authApi } from '$lib/services/api'
  import { authActions } from '$lib/stores/auth'
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let loading = false
  let error = ''

  async function handleSignIn() {
    loading = true
    error = ''

    const response = await authApi.signIn(email, password)

    if (response.success && response.data) {
      // Store auth in global state
      authActions.setAuth(response.data.user, response.data.token)
      
      // Redirect to dashboard
      await goto('/dashboard')
    } else {
      error = response.error || 'Sign in failed'
    }

    loading = false
  }
</script>

<form onsubmit|preventDefault={handleSignIn}>
  <input bind:value={email} type="email" placeholder="Email" required />
  <input bind:value={password} type="password" placeholder="Password" required />
  {#if error}
    <p class="text-error-red">{error}</p>
  {/if}
  <button class="btn-primary" disabled={loading}>
    {loading ? 'Signing in...' : 'Sign In'}
  </button>
</form>
```

### 3. **Error Handling**

```svelte
<script lang="ts">
  import { courseApi } from '$lib/services/api'

  async function enrollCourse(courseId) {
    try {
      const response = await courseApi.enroll(courseId)

      if (response.statusCode === 401) {
        // Not authenticated - redirect to sign in
        await goto('/auth/signin')
        return
      }

      if (response.statusCode === 403) {
        // Forbidden
        showError('You do not have permission to enroll in this course')
        return
      }

      if (!response.success) {
        showError(response.error || 'Enrollment failed')
        return
      }

      // Success
      showSuccess('Successfully enrolled!')
    } catch (error) {
      showError('Network error. Please try again.')
    }
  }
</script>
```

---

## Building New Pages

### Page Structure
```svelte
<!-- src/routes/[section]/+page.svelte -->
<script lang="ts">
  // Imports
  import { onMount } from 'svelte'
  import { sectionApi } from '$lib/services/api'

  // State
  let data = null
  let loading = true
  let error = null

  // Lifecycle
  onMount(async () => {
    // Load data from API
  })

  // Functions
  function handleAction() {
    // Handle user actions
  }
</script>

<svelte:head>
  <title>Page Title - Techgetafrica</title>
  <meta name="description" content="Page description" />
</svelte:head>

<!-- Page Header -->
<div class="bg-gradient-to-b from-brand-black-dark to-brand-black text-white section-py">
  <div class="container-md">
    <h1 class="text-5xl font-bold mb-4">Page Title</h1>
    <p class="text-xl text-neutral-300">Page description</p>
  </div>
</div>

<!-- Main Content -->
<div class="section-py bg-white">
  <div class="container-md">
    {#if loading}
      <!-- Loading state -->
    {:else if error}
      <!-- Error state -->
    {:else}
      <!-- Content -->
    {/if}
  </div>
</div>
```

---

## Performance Optimization Checklist

### Images
- [ ] Use `.webp` format with `.jpg` fallback
- [ ] Add `loading="lazy"` attribute
- [ ] Specify `width` and `height` to prevent CLS
- [ ] Optimize file size (< 200KB for course images)

### Code
- [ ] Remove unused imports
- [ ] Don't load entire libraries for one function
- [ ] Use dynamic imports for heavy components
- [ ] Keep bundle size < 100KB gzipped

### Assets
- [ ] Minify CSS/JS in production
- [ ] Compress SVGs
- [ ] Use CSS classes instead of inline styles
- [ ] Lazy load non-critical components

### Network
- [ ] Enable gzip compression
- [ ] Set appropriate cache headers
- [ ] Use CDN for static assets
- [ ] Minimize API requests (batch when possible)

### Monitoring
- [ ] Test on slow networks (2G/3G)
- [ ] Check Core Web Vitals
- [ ] Monitor real user metrics
- [ ] Test with DevTools throttling

---

## Testing Strategy

### Component Testing
```typescript
// src/lib/components/CourseCard.test.ts
import { render } from '@testing-library/svelte'
import CourseCard from './CourseCard.svelte'

describe('CourseCard', () => {
  it('renders course information', () => {
    const props = {
      id: '1',
      title: 'Test Course',
      organizationName: 'Test Org',
      certificationType: 'Professional Certificate',
      rating: 4.5,
      ratingCount: 100,
      href: '/courses/1',
    }

    const { getByText } = render(CourseCard, { props })
    expect(getByText('Test Course')).toBeTruthy()
  })
})
```

### E2E Testing
```bash
# Use Playwright or Cypress for E2E tests
npm install -D @playwright/test
npx playwright test
```

---

## Deployment

### Build Process
```bash
# Build for production
npm run build

# Output: build/ directory ready for deployment
```

### Environment Configuration
```bash
# Development
VITE_API_BASE_URL=http://localhost:3000/api

# Staging
VITE_API_BASE_URL=https://api-staging.techgetafrica.com/api

# Production
VITE_API_BASE_URL=https://api.techgetafrica.com/api
```

### Hosting Options (Africa-optimized)
- **Vercel**: Automatic deployment, great CDN
- **Netlify**: Similar to Vercel, good DX
- **AWS CloudFront + S3**: More control, scalable
- **Cloudflare Pages**: Excellent edge performance

---

## Common Tasks

### Adding a New API Endpoint
1. Add to `API_ENDPOINTS` in `src/lib/config/routes.ts`
2. Create method in `src/lib/services/api.ts`
3. Use in component with type safety

### Creating a Protected Route
```svelte
<!-- src/routes/protected/+page.ts (server load) -->
import { redirect } from '@sveltejs/kit'

export async function load({ parent }) {
  const { session } = await parent()
  if (!session?.user) {
    throw redirect(303, '/auth/signin')
  }
}
```

### Adding Form Validation
```svelte
<script>
  import { validateForm, type FormRules } from '$lib/utils/validation'

  const rules: FormRules = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Invalid email' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'password' },
    ],
  }

  function handleSubmit(e) {
    const errors = validateForm(formData, rules)
    if (errors.length > 0) {
      // Show errors
    }
  }
</script>
```

---

## Troubleshooting

### API Connection Issues
- Check `VITE_API_BASE_URL` in `.env.local`
- Verify backend is running
- Check CORS headers in backend
- Use browser DevTools Network tab

### Build Errors
- Clear `.svelte-kit` directory: `rm -rf .svelte-kit`
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run check`

### Performance Issues
- Check bundle size: `npm run build`
- Use DevTools Performance tab
- Profile with Lighthouse
- Check image sizes and formats

---

## Support & Resources

- **Project Architecture**: See `PROJECT_ARCHITECTURE.md`
- **SvelteKit Docs**: https://kit.svelte.dev
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org

---

**Last Updated**: December 17, 2025  
**Status**: Ready for Development
