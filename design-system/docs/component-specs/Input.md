# Input Component Specification

## Overview

The Input component is used for text input fields in forms. It supports labels, hints, validation states, icons, and mobile optimizations.

## Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No | Input label |
| `hintText` | `string` | - | No | Helper text below input |
| `showHelpTooltip` | `boolean` | `false` | No | Show help tooltip icon |
| `helpText` | `string` | - | No | Tooltip content |
| `showCopyButton` | `boolean` | `false` | No | Show copy button |
| `iconUrl` | `string` | - | No | Icon URL (left side) |
| `rounded` | `boolean` | `true` | No | Use rounded corners |
| `dropdownOptions` | `Array<{value: string, label: string}>` | - | No | Dropdown options (prefix) |
| `onDropdownChange` | `(value: string) => void` | - | No | Dropdown change handler |
| `dropdownAlignment` | `"left" \| "right"` | `"left"` | No | Dropdown alignment |
| `type` | `string` | `"text"` | No | Input type (text, email, password, etc.) |
| `required` | `boolean` | `false` | No | Mark as required |
| `disabled` | `boolean` | `false` | No | Disable input |
| `error` | `boolean` | `false` | No | Show error state |
| `keyboardType` | `"default" \| "numeric" \| "tel" \| "email" \| "url" \| "decimal"` | - | No | Mobile keyboard type |
| `autoComplete` | `string` | - | No | Auto-complete hint |
| `mobileOptimized` | `boolean` | `true` | No | Optimize for mobile |
| `customClass` | `string` | - | No | Back-compat class (deprecated) |
| `className` | `string` | - | No | Additional CSS classes |
| `value` | `string` | - | No | Input value |
| `onChange` | `(event: ChangeEvent) => void` | - | No | Change handler |
| `placeholder` | `string` | - | No | Placeholder text |
| All standard HTML input attributes | - | - | No | Supports all standard input props |

## Visual States

### Default State
- Background: `var(--bg-primary)`
- Border: `var(--border-secondary)`
- Text: `var(--text-primary)`
- Placeholder: `var(--text-tertiary)`

### Focus State
- Border: `var(--border-primary)`
- Ring: `var(--ring-ring/50)` (3px)
- Background: `var(--bg-primary)`

### Error State
- Border: `var(--border-error)` or `var(--border-destructive)`
- Ring: `var(--ring-destructive/20)` (dark: `var(--ring-destructive/40)`)
- Text: `var(--text-error-primary)`
- Hint text: `var(--text-error-primary)`

### Disabled State
- Background: `var(--bg-tertiary)`
- Border: `var(--border-tertiary)`
- Text: `var(--text-tertiary)`
- Cursor: `not-allowed`
- Opacity: `0.6`

## Spacing Measurements

| Element | Spacing | Token |
|---------|---------|-------|
| Label margin bottom | `8px` | `var(--spacing-sm)` |
| Input padding (horizontal) | `16px` | `var(--spacing-md)` |
| Input padding (vertical) | `12px` | `var(--spacing-sm)` |
| Icon padding (left) | `12px` | `var(--spacing-sm)` |
| Icon gap | `8px` | `var(--spacing-sm)` |
| Hint text margin top | `4px` | `var(--spacing-xs)` |
| Border width | `1px` | - |
| Focus ring width | `3px` | - |

## Typography

| Element | Font Size | Font Weight | Line Height | Token |
|---------|-----------|-------------|-------------|-------|
| Label | `14px` | `500` | `1.5` | `var(--font-size-sm)`, `var(--font-weight-medium)` |
| Input text | `16px` | `400` | `1.5` | `var(--font-size-md)`, `var(--font-weight-normal)` |
| Placeholder | `16px` | `400` | `1.5` | `var(--font-size-md)`, `var(--font-weight-normal)` |
| Hint text | `12px` | `400` | `1.5` | `var(--font-size-xs)`, `var(--font-weight-normal)` |

## Token Reference

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| Background | `--bg-primary` | Input background |
| Background (disabled) | `--bg-tertiary` | Disabled background |
| Text | `--text-primary` | Input text color |
| Text (placeholder) | `--text-tertiary` | Placeholder text |
| Text (hint) | `--text-secondary` | Hint text color |
| Text (error) | `--text-error-primary` | Error text color |
| Border (default) | `--border-secondary` | Default border |
| Border (focus) | `--border-primary` | Focus border |
| Border (error) | `--border-destructive` | Error border |
| Border (disabled) | `--border-tertiary` | Disabled border |
| Border Radius | `--radius-md` | Input corner radius (rounded) |
| Border Radius (square) | `--radius-sm` | Square corner radius |
| Ring (focus) | `--ring-ring/50` | Focus ring color |
| Ring (error) | `--ring-destructive/20` | Error ring (light) |
| Ring (error dark) | `--ring-destructive/40` | Error ring (dark) |
| Spacing (padding) | `--spacing-md` | Horizontal padding |
| Spacing (padding vertical) | `--spacing-sm` | Vertical padding |
| Spacing (gap) | `--spacing-sm` | Icon-text gap |
| Font Size | `--font-size-md` | Input text size |
| Font Size (label) | `--font-size-sm` | Label size |
| Font Size (hint) | `--font-size-xs` | Hint text size |

## Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| Min Height | `44px` | Mobile touch target |
| Default Height | `44px` | Standard height |
| Border Radius (rounded) | `9999px` | Fully rounded |
| Border Radius (square) | `8px` | `var(--radius-md)` |
| Icon Size | `20px` | Standard icon size |
| Copy Button Size | `20px` | Copy icon size |

## Accessibility Requirements

### Keyboard Navigation
- **Tab**: Focus input
- **Enter**: Submit form (if in form)
- **Arrow Keys**: Navigate dropdown (if present)
- **Focus Ring**: Visible focus indicator

### Screen Reader Support
- Label must be associated with input (via `label` prop or `aria-label`)
- Error state must be announced (`aria-invalid="true"`)
- Hint text should be associated (`aria-describedby`)
- Required state must be communicated (`aria-required="true"`)

### Mobile Optimizations
- `keyboardType` sets appropriate mobile keyboard
- `autoComplete` provides hints for autofill
- `mobileOptimized` enables mobile-specific optimizations
- Minimum touch target: `44px × 44px`

### Color Contrast
- Text must meet WCAG AA contrast (4.5:1)
- Placeholder text must be distinguishable
- Error states must be clearly visible

## Usage Examples

### Basic Input
```tsx
<Input label="Email" type="email" placeholder="Enter your email" />
```

### Input with Hint
```tsx
<Input 
  label="Password" 
  type="password" 
  hintText="Must be at least 8 characters"
/>
```

### Input with Error
```tsx
<Input 
  label="Email" 
  type="email" 
  error 
  hintText="Invalid email address"
/>
```

### Input with Icon
```tsx
<Input 
  label="Search" 
  iconUrl="/icons/search.svg"
  placeholder="Search..."
/>
```

### Input with Dropdown
```tsx
<Input 
  label="Phone" 
  dropdownOptions={[
    { value: "+1", label: "+1" },
    { value: "+44", label: "+44" }
  ]}
  onDropdownChange={(value) => console.log(value)}
/>
```

### Mobile-Optimized Input
```tsx
<Input 
  label="Phone Number" 
  type="tel"
  keyboardType="tel"
  autoComplete="tel"
  mobileOptimized
/>
```

## Related Documentation

- **Design Specs**: See `Input.stories.tsx` → DesignSpecs story
- **Usage Guidelines**: See `Input.stories.tsx` → Usage story
- **Patterns**: See `Patterns/LoginForm` for form input usage

---

**Last Updated**: December 18, 2025
