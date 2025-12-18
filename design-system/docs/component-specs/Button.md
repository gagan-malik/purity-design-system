# Button Component Specification

## Overview

The Button component is a primary interactive element used for user actions throughout the application. It supports multiple variants, sizes, tones, and states.

## Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `"solid" \| "outline" \| "ghost" \| "link"` | `"solid"` | No | Button style variant |
| `tone` | `"brand" \| "neutral" \| "danger"` | `"brand"` | No | Semantic intent (preferred over `color`) |
| `color` | `"primary" \| "secondary" \| "destructive" \| "label" \| "gradient"` | `"primary"` | No | Back-compat color (deprecated, use `tone`) |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "mini"` | `"md"` | No | Button size |
| `shape` | `"circle" \| "square"` | `"square"` | No | Button shape |
| `fullWidth` | `boolean` | `false` | No | Make button full width |
| `startIcon` | `React.ReactNode` | - | No | Icon before text |
| `endIcon` | `React.ReactNode` | - | No | Icon after text |
| `loading` | `boolean` | `false` | No | Show loading state |
| `loadingText` | `string` | - | No | Text to show while loading |
| `spinnerPlacement` | `"start" \| "end"` | `"start"` | No | Spinner placement |
| `disabled` | `boolean` | `false` | No | Disable button |
| `disabledReason` | `string` | - | No | Tooltip content when disabled |
| `minTouchSize` | `"default" \| "large"` | `"default"` | No | Minimum touch target (44px or 48px) |
| `hapticFeedback` | `boolean` | `false` | No | Enable haptic feedback (mobile) |
| `asChild` | `boolean` | `false` | No | Render styles onto child element |
| `imgSrc` | `string` | - | No | Back-compat icon (deprecated) |
| `imagePlacement` | `"left" \| "right"` | - | No | Back-compat icon placement (deprecated) |
| `children` | `React.ReactNode` | - | Yes | Button label/content |
| `onClick` | `(event: MouseEvent) => void` | - | No | Click handler |
| `className` | `string` | - | No | Additional CSS classes |
| All standard HTML button attributes | - | - | No | Supports all standard button props |

## Visual States

### Default State
- Background: `var(--bg-brand-primary)` (solid) or transparent (outline/ghost)
- Text: `var(--text-brand-primary)` (solid) or `var(--text-primary)` (outline/ghost)
- Border: `var(--border-primary)` (outline) or none (solid/ghost)

### Hover State
- Background: `var(--bg-brand-secondary)` (solid) or `var(--bg-secondary)` (outline/ghost)
- Text: `var(--text-brand-primary)` (solid) or `var(--text-primary)` (outline/ghost)
- Border: `var(--border-primary)` (outline) or none (solid/ghost)
- Transition: `150ms ease-out`

### Active/Pressed State
- Background: `var(--bg-brand-primary)` with reduced opacity
- Text: `var(--text-brand-primary)`
- Transform: `scale(0.98)`
- Transition: `100ms ease-in`

### Disabled State
- Background: `var(--bg-tertiary)`
- Text: `var(--text-tertiary)`
- Opacity: `0.5`
- Cursor: `not-allowed`
- Pointer events: `none`

### Loading State
- Shows spinner (replaces or alongside text)
- Disables interaction
- Spinner color: `var(--text-primary)`

## Spacing Measurements

| Size | Padding (Horizontal) | Padding (Vertical) | Icon Gap | Min Height |
|------|----------------------|-------------------|----------|------------|
| `xs` | `var(--spacing-sm)` (8px) | `var(--spacing-xs)` (4px) | `var(--spacing-xs)` (4px) | `24px` |
| `sm` | `var(--spacing-md)` (16px) | `var(--spacing-sm)` (8px) | `var(--spacing-sm)` (8px) | `32px` |
| `md` | `var(--spacing-md)` (16px) | `var(--spacing-sm)` (8px) | `var(--spacing-sm)` (8px) | `40px` |
| `lg` | `var(--spacing-lg)` (24px) | `var(--spacing-md)` (16px) | `var(--spacing-md)` (16px) | `48px` |
| `mini` | `var(--spacing-xs)` (4px) | `var(--spacing-xs)` (4px) | `var(--spacing-xs)` (4px) | `20px` |

## Typography

| Size | Font Size | Font Weight | Line Height |
|------|-----------|-------------|-------------|
| `xs` | `var(--font-size-sm)` (14px) | `var(--font-weight-medium)` (500) | `var(--line-height-normal)` (1.5) |
| `sm` | `var(--font-size-sm)` (14px) | `var(--font-weight-semibold)` (600) | `var(--line-height-normal)` (1.5) |
| `md` | `var(--font-size-md)` (16px) | `var(--font-weight-semibold)` (600) | `var(--line-height-normal)` (1.5) |
| `lg` | `var(--font-size-lg)` (18px) | `var(--font-weight-semibold)` (600) | `var(--line-height-normal)` (1.5) |
| `mini` | `var(--font-size-xs)` (12px) | `var(--font-weight-medium)` (500) | `var(--line-height-normal)` (1.5) |

## Token Reference

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| Background (solid) | `--bg-brand-primary` | Default background |
| Background (hover) | `--bg-brand-secondary` | Hover state background |
| Background (disabled) | `--bg-tertiary` | Disabled state background |
| Text (solid) | `--text-brand-primary` | Text color (solid variant) |
| Text (outline/ghost) | `--text-primary` | Text color (outline/ghost variants) |
| Text (disabled) | `--text-tertiary` | Disabled text color |
| Border (outline) | `--border-primary` | Border color (outline variant) |
| Border Radius | `--radius-md` | Button corner radius |
| Shadow | `--shadow-xs` | Subtle elevation |
| Spacing (padding) | `--spacing-sm` to `--spacing-lg` | Internal padding |
| Spacing (gap) | `--spacing-xs` to `--spacing-sm` | Icon-text gap |
| Font Size | `--font-size-sm` to `--font-size-lg` | Text size |
| Font Weight | `--font-weight-medium` to `--font-weight-semibold` | Text weight |
| Transition Duration | `--duration-fast` (150ms) | Hover/active transitions |
| Transition Easing | `ease-out` | Transition curve |

## Accessibility Requirements

### Keyboard Navigation
- **Tab**: Focus button
- **Enter/Space**: Activate button
- **Focus Ring**: Visible focus indicator using `var(--border-ring)` and `var(--ring-ring/50)`

### Screen Reader Support
- Button must have accessible label (via `children` or `aria-label`)
- Loading state must be announced
- Disabled state must be communicated
- `disabledReason` is shown as tooltip on hover/focus when disabled

### Touch Targets
- Minimum size: `44px × 44px` (Apple HIG)
- `minTouchSize="large"` provides `48px × 48px` target
- Adequate spacing between buttons (minimum `8px`)

### Color Contrast
- Text must meet WCAG AA contrast ratio (4.5:1 for normal text)
- Focus indicators must be clearly visible
- Disabled state must be distinguishable

## Usage Examples

### Basic Button
```tsx
<Button variant="solid" tone="brand" size="md">
  Click me
</Button>
```

### Button with Icon
```tsx
<Button variant="outline" startIcon={<Icon />}>
  Save
</Button>
```

### Loading Button
```tsx
<Button variant="solid" loading loadingText="Saving...">
  Save
</Button>
```

### Disabled Button
```tsx
<Button variant="solid" disabled disabledReason="Please fill all fields">
  Submit
</Button>
```

### Full Width Button
```tsx
<Button variant="solid" fullWidth>
  Submit Form
</Button>
```

## Related Documentation

- **Design Specs**: See `Button.stories.tsx` → DesignSpecs story
- **Usage Guidelines**: See `Button.stories.tsx` → Usage story
- **Patterns**: See `Patterns/LoginForm` for form button usage

---

**Last Updated**: December 18, 2025
