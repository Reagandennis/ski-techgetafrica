# TECHGETAFRICA - VISUAL DESIGN GUIDE

## Design Philosophy

**"Institutional, Professional, Trustworthy"**

- NOT flashy or colorful (not Udemy-style)
- NOT corporate dark (not Skillshare)
- **IS** clean, spacious, academic (like Coursera)
- **IS** focused on credibility and learning outcomes

---

## Color System

### Primary Brand Colors

#### **#EF4444** - Brand Red (Primary Action)
- **Usage**: Primary buttons, CTAs, badges, active states
- **Hover**: `#DC2626` (darker)
- **Light**: `#F87171` (backgrounds)
- **Rule**: Only use for the MOST important actions
  - "Enroll Now" buttons
  - Primary CTAs in hero
  - Active navigation states
  - Certificate badges
  - Primary feature highlights

```svelte
<!-- ✅ CORRECT USAGE -->
<button class="btn-primary">Enroll Now</button>
<span class="badge badge-primary">Professional Certificate</span>

<!-- ❌ WRONG USAGE -->
<button class="btn-primary">Learn More</button>  <!-- Too many red buttons -->
<div class="bg-brand-red p-4">Course Details</div>  <!-- Don't overuse -->
```

#### **#1F2937** - Brand Black (Strong Text)
- **Usage**: Page titles, section headings, brand identity
- **Darker**: `#111827` (very strong contrast)
- **Rule**: Use for emphasis and hierarchy

```svelte
<!-- ✅ CORRECT -->
<h1 class="text-5xl font-extrabold text-brand-black-dark">
  Master Technology. Shape Your Future.
</h1>

<!-- ❌ WRONG -->
<p class="text-brand-black-dark">Read this course description</p>
```

### Neutral Grays (Complete Scale)

```
neutral-50:   #F9FAFB   (Very light background)
neutral-100:  #F3F4F6   (Light background)
neutral-200:  #E5E7EB   (Borders, dividers, subtle backgrounds)
neutral-300:  #D1D5DB   (Darker borders)
neutral-400:  #9CA3AF   (Disabled state)
neutral-500:  #6B7280   (Secondary text)
neutral-600:  #4B5563   (Primary body text)
neutral-700:  #374151   (Emphasis text)
neutral-800:  #1F2937   (Strong text = brand-black)
neutral-900:  #111827   (Darkest = brand-black-dark)
```

**Usage Guide**:
- `neutral-50` / `neutral-100`: Section backgrounds
- `neutral-200`: Card borders, subtle dividers
- `neutral-400`: Disabled buttons, placeholder text
- `neutral-600`: Body text (most common)
- `neutral-700`: Labels, secondary headings

### Supporting Colors

#### **#2563EB** - Accent Blue (Secondary Actions)
- Info boxes
- Secondary buttons
- Links (hover states)
- Info badges

#### **#10B981** - Success Green (Positive Actions)
- Completion states
- Success messages
- Progress indicators

#### **#F59E0B** - Warning Amber (Alerts)
- Warning messages
- Important notices
- Caution states

#### **#EF4444** - Error Red (Negative Actions)
- Error messages
- Delete confirmations
- Validation errors

---

## Typography System

### Font Family: **Inter**
- Clean, modern, highly readable
- Perfect for both headings and body text
- Download from Google Fonts
- Web-optimized, fast loading

### Type Scale & Hierarchy

```
H1 (Largest)       3rem  / 48px   font-extrabold (800)
├─ Page titles
├─ Hero headlines
└─ Major section headers

H2                 1.875rem / 30px  font-bold (700)
├─ Major section titles
└─ Emphasis headings

H3                 1.5rem / 24px    font-semibold (600)
├─ Subsection titles
└─ Card titles

H4                 1.25rem / 20px   font-semibold (600)
├─ Component headings
└─ Form labels

Body               1rem / 16px      font-normal (400)
├─ Paragraph text (most common)
└─ Regular reading content

Small              0.875rem / 14px  font-normal (400)
├─ Helper text
├─ Metadata (dates, counts)
└─ Form captions

Caption            0.75rem / 12px   font-normal (400)
├─ Fine print
└─ Copyright notices
```

### Font Weight Usage
```
Light (300):       Not typically used
Regular (400):     Body text, captions, small text
Medium (500):      Emphasis within body, breadcrumbs
Semibold (600):    Subheadings, card titles, labels
Bold (700):        Section headings (H2, H3)
Extrabold (800):   Page titles, hero headlines (H1)
```

### Line Height (Readability)
```
Headings:    leading-tight (1.1) - Compact
Body Text:   leading-relaxed (1.625) - Spacious, readable
```

---

## Spacing & Layout

### The "Generous Principle"

Techgetafrica is **not cramped**. We use generous spacing to signal professionalism and trust.

#### Vertical Spacing (Between Sections)
```
Mobile:   py-16   (64px)
Tablet:   sm:py-24 (96px)
Desktop:  lg:py-32 (128px)

This is applied to all major sections
```

#### Horizontal Spacing (Container)
```
Mobile:   px-4    (16px padding on each side)
Tablet:   sm:px-6 (24px)
Desktop:  lg:px-8 (32px)
Max width: 80rem  (1280px - not full width on ultra-wide)
```

#### Gap Between Elements
```
Cards in grid:     gap-8    (32px)
Section elements:  gap-6 to gap-8
Component padding: p-5 to p-8 (not cramped)
```

### Container Structure
```svelte
<!-- All page content follows this pattern -->
<div class="container-md">
  <!-- max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -->
</div>

<!-- Full-width colored sections -->
<section class="bg-brand-red section-py">
  <div class="container-md">
    <!-- Content inside -->
  </div>
</section>
```

---

## Component Styling Patterns

### Buttons

#### Primary Button (Red)
```svelte
<button class="btn-primary">Enroll Now</button>
```
- Red background `#EF4444`
- White text
- Hover: darker red `#DC2626`
- Padding: `px-6 py-3` (medium)
- Rounded: `lg` (0.75rem radius)
- Shadow: Subtle `shadow-md`

#### Secondary Button (Black Border)
```svelte
<button class="btn-secondary">Learn More</button>
```
- White background
- Black border (2px) `#1F2937`
- Black text
- Hover: light gray background
- Same padding and radius as primary

#### Tertiary Button (Link Style)
```svelte
<a href="..." class="btn-tertiary">Read More</a>
```
- No background
- Red text
- Hover: darker red

### Cards

```svelte
<div class="card">
  <!-- Content -->
</div>
```
- White background
- Subtle border `border-neutral-200`
- Rounded corners `rounded-xl`
- Hover: elevation (shadow grows)
- Transition: Smooth 300ms ease-in-out

### Badges

```svelte
<!-- Primary Badge (Red) -->
<span class="badge badge-primary">Professional Certificate</span>

<!-- Secondary Badge (Blue) -->
<span class="badge badge-secondary">Best Seller</span>

<!-- Neutral Badge -->
<span class="badge badge-neutral">Beginner</span>
```

---

## Layout Examples

### Hero Section
```
┌────────────────────────────────────────────────┐
│                    HEADER                       │
├────────────────────────────────────────────────┤
│                                                 │
│  [Logo] Techgetafrica                          │
│                                                 │
│  Master Technology.                            │
│  Shape Your Future.                            │
│                                                 │
│  Professional certifications for African      │
│  professionals...                              │
│                                                 │
│  [Enroll] [Watch Demo]                        │
│                                                 │
│  50K+          95%           1000+             │
│  Students      Satisfaction  Job Placements    │
│                                                 │
│  ─────────────────────────────────────        │
│  [Illustration Space]                         │
│                                                 │
└────────────────────────────────────────────────┘
```

### Course Card (3 columns on desktop)
```
┌─────────────────────────┐
│ [Course Image/Thumbnail]│ ← 100% width, maintain aspect
│                         │
│ [Org Logo] Org Name     │
│                         │
│ Course Title (2-line    │
│ maximum with clamp)     │
│                         │
│ [Badge] Professional... │
│ ⭐ 4.8 (2543 reviews)   │
│ Duration: 4 weeks       │
│                         │
│ ─────────────────────── │
│ $299      [Enroll Now]  │ ← Red button
└─────────────────────────┘
```

### Filter Section + Course Grid
```
┌──────────────────────────────────────────────┐
│ Sidebar (1 col)     │ Main (3 cols grid)     │
│                     │                         │
│ [Search Box]        │ Card | Card | Card    │
│                     │ Card | Card | Card    │
│ Difficulty         │ Card | Card | Card    │
│ ○ All Levels       │                         │
│ ○ Beginner         │ Pagination             │
│ ○ Intermediate     │ << 1 2 3 ... >>        │
│ ○ Advanced         │                         │
│                     │                         │
│ Rating             │                         │
│ ○ All              │                         │
│ ○ 4.5+             │                         │
│ ○ 4.0+             │                         │
│                     │                         │
│ [Clear Filters]     │                         │
└──────────────────────────────────────────────┘
```

---

## Responsive Breakpoints

```
Mobile:   < 640px   (sm)
Tablet:   640px+    (md) to 1024px
Desktop:  1024px+   (lg) to 1280px
Large:    1280px+   (xl)
```

### Responsive Text Sizes
```
Page Title:  text-4xl (mobile) → text-5xl (tablet) → text-6xl (desktop)
Section:     text-2xl (mobile) → text-3xl (tablet) → text-4xl (desktop)
Card Title:  text-lg (mobile) → text-xl (tablet) → text-xl (desktop)
Body:        text-base (all sizes)
```

### Responsive Spacing
```
py-8 sm:py-12 lg:py-16  ← Standard section spacing

p-4 sm:p-6 lg:p-8       ← Standard card padding

gap-4 sm:gap-6 lg:gap-8 ← Flexible gap between items
```

---

## Icons & Imagery

### Icon Style
- Outline style (not filled)
- Line weight: 1.5 to 2
- Size: Usually 20-24px in UI, 48-64px in sections
- Color: Match text color (inherit)

### Images & Illustrations
- Placeholder: Subtle gradient or geometric patterns
- Course images: High quality, 16:9 aspect ratio
- Optimization: WebP with JPG fallback
- Lazy load: `loading="lazy"` on all images

### Illustrations
- Keep minimal and institutional
- Use brand red sparingly
- Focus on clarity, not decoration

---

## Dark Mode / Future Considerations

Currently: **Light mode only** (matches Coursera)

If adding dark mode in future:
```css
Dark background: #0F1419
Dark card: #1A1F2E
Reduce red intensity for dark backgrounds
Increase neutral contrast
```

---

## Accessibility Standards

### Color Contrast
- Text on background: Minimum 4.5:1 (AA standard)
- Brand Red (#EF4444) on White: 3.9:1 (passes large text)
- Brand Black (#1F2937) on White: 13:1 (passes all)

### Touch Targets
- Minimum 44x44px (mobile buttons)
- Minimum 40x40px (desktop buttons)
- Proper spacing to avoid accidental clicks

### Keyboard Navigation
- Tab order follows visual order
- Focus states clearly visible
- All interactive elements keyboard accessible

---

## Animation & Transitions

### Standard Timing
```
Fast:     duration-150  (button hover)
Normal:   duration-200  (default transitions)
Slow:     duration-300  (card elevation)
Slowest:  duration-500  (modal opening)
```

### Standard Easing
```
ease-in-out (default)
ease-in (for entrances)
ease-out (for exits)
```

### Keep It Minimal
- No auto-playing animations
- No infinite spinning loaders
- Focus on purposeful, brief animations
- Desktop users should prefer reduced motion

---

## When to Break the Rules

✅ **You CAN modify**:
- Copy/messaging
- Logo and branding
- Color brightness (slightly)
- Font sizes (within scale)
- Section order
- Component arrangement

❌ **Don't modify**:
- Basic color system (red, black, grays)
- Fundamental spacing philosophy
- Typography hierarchy
- Institutional aesthetic
- Desktop-first responsiveness

---

## Quick Reference

### Most Used Classes
```svelte
<!-- Container -->
<div class="container-md">

<!-- Section padding -->
<section class="section-py">

<!-- Buttons -->
<button class="btn-primary">
<button class="btn-secondary">
<a class="btn-tertiary">

<!-- Cards -->
<div class="card">

<!-- Badges -->
<span class="badge badge-primary">

<!-- Spacing helpers -->
<div class="flex-between">    <!-- justify-between -->
<div class="flex-center">     <!-- items/justify-center -->

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

<!-- Text truncation -->
<p class="text-truncate">      <!-- One line ellipsis -->
<p class="text-clamp-2">       <!-- 2 lines ellipsis -->
```

---

## Common Mistakes to Avoid

❌ **Too many colors** - Stick to the palette  
❌ **Too much text** - Use whitespace  
❌ **Auto-playing content** - Respect user control  
❌ **Flashing/blinking** - Accessibility issue  
❌ **Multiple CTAs in red** - Only the PRIMARY action  
❌ **Tiny touch targets** - Minimum 44x44px  
❌ **All caps text** - Hard to read, only for labels  
❌ **Shadows everywhere** - Use subtly for hierarchy  

---

## Resources

- **Color Picker**: https://colorpicker.com
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Font**: https://fonts.google.com/specimen/Inter
- **Icon Library**: https://heroicons.com (Headless UI)
- **Responsive Design**: Use Chrome DevTools device emulation

---

**Last Updated**: December 17, 2025  
**Status**: Design System Complete  
**Theme**: Coursera-Inspired Professional

---

## Summary

Techgetafrica's visual design is:
- ✅ **Professional** - Institutional, trustworthy
- ✅ **Clean** - Minimal, spacious, not cluttered
- ✅ **Accessible** - High contrast, keyboard nav
- ✅ **Performant** - Optimized for low bandwidth
- ✅ **Responsive** - Mobile-first, all devices
- ✅ **Focused** - On learning outcomes, not distraction

When in doubt, ask: *"Would Coursera do this?"*

🎨 **Design well!**
