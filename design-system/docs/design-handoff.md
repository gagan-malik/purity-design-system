# Design Handoff Guide

This guide helps designers specify components in Figma and communicate design decisions to developers. Follow these guidelines to ensure smooth handoff and consistent implementation.

## Table of Contents

1. [Component Specification](#component-specification)
2. [Spacing Measurement Guide](#spacing-measurement-guide)
3. [Color Usage Rules](#color-usage-rules)
4. [Responsive Breakpoints](#responsive-breakpoints)
5. [Animation Specifications](#animation-specifications)
6. [Component Prop Mapping](#component-prop-mapping)
7. [Best Practices](#best-practices)

---

## Component Specification

### How to Specify Components in Figma

When designing components in Figma, follow these guidelines:

#### 1. Use Component Variants

- **Create variants** for different states (default, hover, active, disabled, error)
- **Name variants clearly**: `Button/Default`, `Button/Hover`, `Button/Disabled`
- **Use boolean properties** for toggles (e.g., `disabled`, `loading`)
- **Use text properties** for labels and content

#### 2. Component Structure

```
Component Name
├── States (variants)
│   ├── Default
│   ├── Hover
│   ├── Active
│   ├── Disabled
│   └── Error
├── Sizes (if applicable)
│   ├── Small
│   ├── Medium
│   └── Large
└── Variants (if applicable)
    ├── Primary
    ├── Secondary
    └── Tertiary
```

#### 3. Naming Conventions

- **Component names**: Use PascalCase (e.g., `Button`, `Input`, `Card`)
- **Variant names**: Use descriptive names (e.g., `Primary`, `Secondary`, `Ghost`)
- **Layer names**: Use clear, semantic names (e.g., `Icon`, `Label`, `Container`)

#### 4. Auto Layout

- **Use Auto Layout** for all components to ensure proper spacing
- **Set padding** using design tokens (see Spacing Measurement Guide)
- **Use constraints** appropriately (left/right, top/bottom, center)

#### 5. Component Properties

Document the following in Figma:

- **Props**: List all props and their types
- **Default values**: Specify default prop values
- **Required vs Optional**: Mark which props are required
- **Examples**: Show examples of different prop combinations

---

## Spacing Measurement Guide

Always use design tokens for spacing. Never use arbitrary pixel values.

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-none` | `0px` | No spacing |
| `spacing-xs` | `4px` | Tight spacing (icon padding) |
| `spacing-sm` | `8px` | Small spacing (compact layouts) |
| `spacing-md` | `16px` | Medium spacing (default) |
| `spacing-lg` | `24px` | Large spacing (sections) |
| `spacing-xl` | `32px` | Extra large spacing (major sections) |
| `spacing-2xl` | `48px` | 2X large spacing |
| `spacing-3xl` | `64px` | 3X large spacing |

### How to Measure Spacing in Figma

1. **Select the element** you want to measure
2. **Check the spacing** in the right panel (Auto Layout spacing)
3. **Match to nearest token**: Round to the nearest token value
4. **Document in comments**: Add a comment with the token name

**Example:**
```
Padding: 16px → Use `spacing-md`
Gap: 8px → Use `spacing-sm`
Margin: 24px → Use `spacing-lg`
```

### Common Spacing Patterns

- **Button padding**: `spacing-sm` to `spacing-md` (8px-16px)
- **Card padding**: `spacing-md` to `spacing-lg` (16px-24px)
- **Section spacing**: `spacing-xl` to `spacing-2xl` (32px-48px)
- **Grid gaps**: `spacing-md` to `spacing-lg` (16px-24px)

---

## Color Usage Rules

### Semantic Tokens vs Raw Colors

**Always use semantic tokens** instead of raw color values.

#### ✅ DO: Use Semantic Tokens

```css
/* Good */
background: var(--bg-primary);
color: var(--text-primary);
border-color: var(--border-secondary);
```

#### ❌ DON'T: Use Raw Colors

```css
/* Bad */
background: #FFFFFF;
color: #000000;
border-color: #E5E5E5;
```

### Semantic Token Categories

#### Background Tokens
- `--bg-primary` - Main background
- `--bg-secondary` - Secondary background (cards, panels)
- `--bg-tertiary` - Tertiary background (nested elements)
- `--bg-brand-primary` - Brand color background
- `--bg-brand-secondary` - Brand color background (lighter)

#### Text Tokens
- `--text-primary` - Primary text (headings, body)
- `--text-secondary` - Secondary text (captions, hints)
- `--text-tertiary` - Tertiary text (disabled, placeholders)
- `--text-brand-primary` - Brand color text
- `--text-error-primary` - Error text
- `--text-success-primary` - Success text

#### Border Tokens
- `--border-primary` - Primary border
- `--border-secondary` - Secondary border (subtle)
- `--border-tertiary` - Tertiary border (very subtle)

#### Interactive Tokens
- `--interactive-primary` - Primary interactive color
- `--interactive-hover` - Hover state
- `--interactive-active` - Active/pressed state
- `--interactive-disabled` - Disabled state

### Color Specification in Figma

1. **Use style tokens** in Figma (if available)
2. **Document semantic token** in component description
3. **Show color values** for reference (but emphasize semantic tokens)
4. **Include dark mode** variants when applicable

**Example Component Description:**
```
Button Component

Colors:
- Background: var(--bg-brand-primary)
- Text: var(--text-brand-primary)
- Border: var(--border-primary)

States:
- Default: bg-brand-primary
- Hover: bg-brand-secondary
- Disabled: bg-tertiary + opacity 50%
```

---

## Responsive Breakpoints

Use these breakpoints for responsive design:

| Breakpoint | Value | Usage |
|------------|-------|-------|
| `mobile` | `320px` | Small mobile devices |
| `mobile-lg` | `375px` | Large mobile devices |
| `tablet` | `768px` | Tablets |
| `desktop` | `1024px` | Desktop screens |
| `desktop-lg` | `1280px` | Large desktop screens |
| `desktop-xl` | `1536px` | Extra large screens |

### Breakpoint Tokens

```css
/* Mobile */
@media (min-width: 320px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### Responsive Design Patterns

1. **Mobile-first**: Design for mobile, then enhance for larger screens
2. **Breakpoint strategy**: Use min-width media queries
3. **Content reflow**: Stack vertically on mobile, horizontal on desktop
4. **Touch targets**: Minimum 44px × 44px on mobile

### Specifying Responsive Behavior in Figma

- **Create frames** for each breakpoint
- **Document breakpoints** in component description
- **Show layout changes** at different breakpoints
- **Specify when** components should change (e.g., "Stack at < 768px")

---

## Animation Specifications

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | `0ms` | No animation |
| `duration-fast` | `150ms` | Quick interactions (hover, focus) |
| `duration-normal` | `250ms` | Standard transitions |
| `duration-slow` | `350ms` | Complex animations |
| `duration-slower` | `500ms` | Page transitions |

### Easing Functions

| Easing | Value | Usage |
|--------|-------|-------|
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements entering |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements exiting |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `ease-linear` | `linear` | Linear animations |

### Common Animations

#### Button Hover
- **Duration**: `duration-fast` (150ms)
- **Easing**: `ease-out`
- **Property**: `background-color`, `transform` (scale 1.02)

#### Modal Open/Close
- **Duration**: `duration-normal` (250ms)
- **Easing**: `ease-in-out`
- **Property**: `opacity`, `transform` (scale/translate)

#### Dropdown Open
- **Duration**: `duration-fast` (150ms)
- **Easing**: `ease-out`
- **Property**: `opacity`, `transform` (translateY)

### Specifying Animations in Figma

1. **Use Figma Prototyping** to show animations
2. **Document timing** in component description
3. **Specify easing** function
4. **Show before/after** states

**Example:**
```
Button Hover Animation
- Duration: 150ms
- Easing: ease-out
- Properties: background-color, transform (scale 1.02)
```

---

## Component Prop Mapping

### Figma Variant → React Prop Mapping

When creating variants in Figma, map them to React props:

#### Button Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Button/Primary` | `variant` | `"solid"` |
| `Button/Secondary` | `variant` | `"outline"` |
| `Button/Ghost` | `variant` | `"ghost"` |
| `Button/Small` | `size` | `"sm"` |
| `Button/Medium` | `size` | `"md"` |
| `Button/Large` | `size` | `"lg"` |
| `Button/Disabled` | `disabled` | `true` |
| `Button/Loading` | `loading` | `true` |

#### Input Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Input/Default` | `variant` | `"default"` |
| `Input/Error` | `error` | `true` |
| `Input/Disabled` | `disabled` | `true` |
| `Input/WithLabel` | `label` | `"Label text"` |
| `Input/WithHint` | `hintText` | `"Hint text"` |

#### Card Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Card/Default` | `variant` | `"default"` |
| `Card/WithHeader` | `title` | `"Card Title"` |
| `Card/WithFooter` | `footer` | `{...}` |

### Prop Documentation Template

For each component, document:

```markdown
## ComponentName

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"solid" \| "outline" \| "ghost"` | `"solid"` | No | Button style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | No | Button size |
| `disabled` | `boolean` | `false` | No | Disable button |
| `loading` | `boolean` | `false` | No | Show loading state |

### Variant Mapping

- `Button/Primary` → `variant="solid"`
- `Button/Secondary` → `variant="outline"`
- `Button/Ghost` → `variant="ghost"`
```

---

## Best Practices

### ✅ DO's

1. **Use design tokens** for all spacing, colors, and typography
2. **Create component variants** for all states
3. **Document props** in component descriptions
4. **Show responsive behavior** at different breakpoints
5. **Include dark mode** variants
6. **Use Auto Layout** for proper spacing
7. **Name layers semantically** (not "Rectangle 1", "Group 2")
8. **Document animations** with timing and easing
9. **Provide examples** of different prop combinations
10. **Keep components organized** in a component library

### ❌ DON'Ts

1. **Don't use arbitrary values** - always use tokens
2. **Don't skip states** - design all interactive states
3. **Don't forget responsive** - design for all breakpoints
4. **Don't use hardcoded colors** - use semantic tokens
5. **Don't create one-off components** - use the design system
6. **Don't skip documentation** - document props and usage
7. **Don't ignore accessibility** - ensure proper contrast and focus states
8. **Don't mix design patterns** - follow established patterns

### Handoff Checklist

Before handing off a design, ensure:

- [ ] All components use design tokens
- [ ] All states are designed (default, hover, active, disabled, error)
- [ ] Responsive behavior is documented
- [ ] Props are mapped to Figma variants
- [ ] Colors use semantic tokens
- [ ] Spacing uses token scale
- [ ] Animations are specified with timing and easing
- [ ] Dark mode variants are included (if applicable)
- [ ] Accessibility considerations are documented
- [ ] Component descriptions include usage guidelines

---

## Related Documentation

- **Figma-to-Code Mapping**: See `figma-to-code.md` for component name mappings
- **Component Specs**: See `component-specs/` for detailed component specifications
- **Design Tokens**: See `Foundations/Tokens` in Storybook for all available tokens
- **Patterns**: See `Patterns/` in Storybook for component usage patterns

---

**Last Updated**: December 18, 2025
