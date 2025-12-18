# Select Component Specification

## Overview

The Select component provides a dropdown menu for selecting from a list of options. It supports search, multi-select, custom rendering, and mobile optimizations.

## Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `Array<ISelectData>` | - | Yes | Select options |
| `onClick` | `(item: ISelectData) => void` | - | Yes | Selection handler |
| `label` | `string` | - | No | Select label |
| `placeholder` | `string` | - | No | Placeholder text |
| `value` | `string \| number` | - | No | Selected value |
| `defaultValue` | `string \| number` | - | No | Default selected value |
| `disabled` | `boolean` | `false` | No | Disable select |
| `error` | `boolean` | `false` | No | Show error state |
| `hintText` | `string` | - | No | Helper text below select |
| `searchable` | `boolean` | `false` | No | Enable search/filter |
| `multiple` | `boolean` | `false` | No | Allow multiple selection |
| `className` | `string` | - | No | Additional CSS classes |

### ISelectData Interface

```typescript
interface ISelectData {
  id: string | number;
  name: string;
  render?: Function; // Custom render function
  disable?: boolean; // Disable this option
  menuRender?: SelectMenuData; // Custom menu rendering
}
```

### SelectMenuData Interface

```typescript
interface SelectMenuData {
  heading?: string;
  title?: string;
  img?: string;
  subHeading?: string;
  badge?: string | React.JSX.Element;
  onClick?: Function;
  imgSize?: string;
}
```

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

### Open State
- Dropdown appears below input
- Background: `var(--bg-primary)`
- Border: `var(--border-primary)`
- Shadow: `var(--shadow-md)`

### Error State
- Border: `var(--border-destructive)`
- Ring: `var(--ring-destructive/20)` (dark: `var(--ring-destructive/40)`)
- Text: `var(--text-error-primary)`
- Hint text: `var(--text-error-primary)`

### Disabled State
- Background: `var(--bg-tertiary)`
- Border: `var(--border-tertiary)`
- Text: `var(--text-tertiary)`
- Cursor: `not-allowed`
- Opacity: `0.6`

### Option Hover State
- Background: `var(--bg-secondary)`
- Text: `var(--text-primary)`

### Option Selected State
- Background: `var(--bg-brand-primary)`
- Text: `var(--text-brand-primary)`
- Check icon visible

## Spacing Measurements

| Element | Spacing | Token |
|---------|---------|-------|
| Label margin bottom | `8px` | `var(--spacing-sm)` |
| Select padding (horizontal) | `16px` | `var(--spacing-md)` |
| Select padding (vertical) | `12px` | `var(--spacing-sm)` |
| Icon padding (right) | `12px` | `var(--spacing-sm)` |
| Icon gap | `8px` | `var(--spacing-sm)` |
| Hint text margin top | `4px` | `var(--spacing-xs)` |
| Option padding | `12px 16px` | `var(--spacing-sm)` `var(--spacing-md)` |
| Dropdown gap | `4px` | `var(--spacing-xs)` |
| Border width | `1px` | - |
| Focus ring width | `3px` | - |

## Typography

| Element | Font Size | Font Weight | Line Height | Token |
|---------|-----------|-------------|-------------|-------|
| Label | `14px` | `500` | `1.5` | `var(--font-size-sm)`, `var(--font-weight-medium)` |
| Select text | `16px` | `400` | `1.5` | `var(--font-size-md)`, `var(--font-weight-normal)` |
| Placeholder | `16px` | `400` | `1.5` | `var(--font-size-md)`, `var(--font-weight-normal)` |
| Option text | `16px` | `400` | `1.5` | `var(--font-size-md)`, `var(--font-weight-normal)` |
| Hint text | `12px` | `400` | `1.5` | `var(--font-size-xs)`, `var(--font-weight-normal)` |

## Token Reference

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| Background | `--bg-primary` | Select background |
| Background (disabled) | `--bg-tertiary` | Disabled background |
| Background (option hover) | `--bg-secondary` | Option hover background |
| Background (option selected) | `--bg-brand-primary` | Selected option background |
| Text | `--text-primary` | Select text color |
| Text (placeholder) | `--text-tertiary` | Placeholder text |
| Text (hint) | `--text-secondary` | Hint text color |
| Text (error) | `--text-error-primary` | Error text color |
| Text (selected option) | `--text-brand-primary` | Selected option text |
| Border (default) | `--border-secondary` | Default border |
| Border (focus) | `--border-primary` | Focus border |
| Border (error) | `--border-destructive` | Error border |
| Border (disabled) | `--border-tertiary` | Disabled border |
| Border Radius | `--radius-md` | Select corner radius |
| Shadow (dropdown) | `--shadow-md` | Dropdown shadow |
| Ring (focus) | `--ring-ring/50` | Focus ring color |
| Ring (error) | `--ring-destructive/20` | Error ring (light) |
| Ring (error dark) | `--ring-destructive/40` | Error ring (dark) |
| Spacing (padding) | `--spacing-md` | Horizontal padding |
| Spacing (padding vertical) | `--spacing-sm` | Vertical padding |
| Spacing (gap) | `--spacing-sm` | Icon-text gap |
| Font Size | `--font-size-md` | Select text size |
| Font Size (label) | `--font-size-sm` | Label size |
| Font Size (hint) | `--font-size-xs` | Hint text size |

## Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| Min Height | `44px` | Mobile touch target |
| Default Height | `44px` | Standard height |
| Border Radius | `8px` | `var(--radius-md)` |
| Icon Size | `20px` | Chevron icon size |
| Check Icon Size | `16px` | Selected indicator |
| Dropdown Max Height | `300px` | Scrollable if needed |
| Border Width | `1px` | - |
| Focus Ring Width | `3px` | - |

## Accessibility Requirements

### Keyboard Navigation
- **Tab**: Focus select
- **Enter/Space**: Open dropdown
- **Arrow Up/Down**: Navigate options
- **Enter**: Select option
- **Escape**: Close dropdown
- **Home/End**: First/last option
- **Type to search**: If `searchable` is true

### Screen Reader Support
- Label must be associated with select (via `label` prop or `aria-label`)
- Error state must be announced (`aria-invalid="true"`)
- Hint text should be associated (`aria-describedby`)
- Selected option must be communicated
- Dropdown state must be announced (`aria-expanded`)

### Focus Management
- Focus moves to first option when opened
- Focus returns to select when closed
- Focus ring must be visible

### Color Contrast
- Text must meet WCAG AA contrast (4.5:1)
- Selected option must be clearly distinguishable
- Hover state must be visible

## Usage Examples

### Basic Select
```tsx
<Select
  label="Country"
  options={[
    { id: "us", name: "United States" },
    { id: "uk", name: "United Kingdom" },
    { id: "ca", name: "Canada" }
  ]}
  onClick={(item) => console.log(item)}
/>
```

### Select with Search
```tsx
<Select
  label="Search Country"
  placeholder="Type to search..."
  searchable
  options={countries}
  onClick={(item) => console.log(item)}
/>
```

### Select with Error
```tsx
<Select
  label="Country"
  error
  hintText="Please select a country"
  options={countries}
  onClick={(item) => console.log(item)}
/>
```

### Multi-Select
```tsx
<Select
  label="Select Tags"
  multiple
  options={tags}
  onClick={(item) => console.log(item)}
/>
```

### Select with Custom Rendering
```tsx
<Select
  label="User"
  options={users.map(user => ({
    id: user.id,
    name: user.name,
    menuRender: {
      heading: user.name,
      subHeading: user.email,
      img: user.avatar
    }
  }))}
  onClick={(item) => console.log(item)}
/>
```

## Related Documentation

- **Design Specs**: See `Select.stories.tsx` → DesignSpecs story
- **Usage Guidelines**: See `Select.stories.tsx` → Usage story
- **Patterns**: See `Patterns/LoginForm` for select usage in forms

---

**Last Updated**: December 18, 2025
