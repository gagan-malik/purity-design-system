# Card Component Specification

## Overview

The Card component (CardDashboard) is used for grouping related content, displaying metrics, and organizing information in dashboard layouts.

## Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | Yes | Card title |
| `subTitle` | `string` | - | No | Card subtitle |
| `children` | `React.ReactNode` | - | Yes | Card content |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | No | Internal spacing between elements |
| `trendData` | `{data: string \| number, percentageChange: number, trendDescription: string}` | - | No | Trend data for header |
| `onDeleteClick` | `() => void` | - | No | Delete button handler |
| `onRefreshClick` | `() => void` | - | No | Refresh button handler |

## Visual States

### Default State
- Background: `var(--bg-primary)`
- Border: `var(--border-secondary)`
- Shadow: `var(--shadow-xs)`

### Hover State (if interactive)
- Shadow: `var(--shadow-sm)`
- Transform: `translateY(-2px)`
- Transition: `150ms ease-out`

## Spacing Measurements

| Gap Size | Value | Token |
|---------|-------|-------|
| `sm` | `20px` | `gap-5` (custom) |
| `md` | `24px` | `gap-6` (custom) |
| `lg` | `28px` | `gap-7` (custom) |

| Element | Spacing | Token |
|---------|---------|-------|
| Card padding | `24px` | `var(--spacing-lg)` |
| Header margin bottom | Based on `gap` | - |
| Content spacing | Based on `gap` | - |

## Typography

| Element | Font Size | Font Weight | Line Height | Token |
|---------|-----------|-------------|-------------|-------|
| Title | `16px` | `600` | `1.5` | `var(--font-size-md)`, `var(--font-weight-semibold)` |
| Subtitle | `14px` | `400` | `1.5` | `var(--font-size-sm)`, `var(--font-weight-normal)` |
| Content | `14px` | `400` | `1.5` | `var(--font-size-sm)`, `var(--font-weight-normal)` |

## Token Reference

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| Background | `--bg-primary` | Card background |
| Border | `--border-secondary` | Card border |
| Border Radius | `--radius-xl` | Card corner radius (24px) |
| Shadow | `--shadow-xs` | Default shadow |
| Shadow (hover) | `--shadow-sm` | Hover shadow |
| Spacing (padding) | `--spacing-lg` | Card padding (24px) |
| Spacing (gap) | Custom (`gap-5`, `gap-6`, `gap-7`) | Internal spacing |
| Text (title) | `--text-primary` | Title color |
| Text (subtitle) | `--text-secondary` | Subtitle color |
| Text (content) | `--text-primary` | Content color |

## Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| Border Radius | `24px` | `var(--radius-xl)` or `rounded-2xl` |
| Padding | `24px` | `var(--spacing-lg)` or `p-6` |
| Border Width | `1px` | - |
| Min Height | Auto | Based on content |
| Max Width | 100% | Responsive |

## Accessibility Requirements

### Keyboard Navigation
- If card is clickable, must be keyboard accessible
- Focus ring must be visible when focused

### Screen Reader Support
- Title should be in heading element (`<h2>`, `<h3>`, etc.)
- Card should have proper semantic structure
- Interactive elements within card must be accessible

### Color Contrast
- Text must meet WCAG AA contrast (4.5:1)
- Border must be visible against background

## Usage Examples

### Basic Card
```tsx
<CardDashboard title="Total Users" gap="md">
  <div>12,345</div>
</CardDashboard>
```

### Card with Trend Data
```tsx
<CardDashboard 
  title="Revenue" 
  gap="md"
  trendData={{
    data: "$45,678",
    percentageChange: 12.5,
    trendDescription: "from last month"
  }}
>
  <div>Chart content</div>
</CardDashboard>
```

### Card with Actions
```tsx
<CardDashboard 
  title="Dashboard" 
  gap="lg"
  onDeleteClick={() => console.log("Delete")}
  onRefreshClick={() => console.log("Refresh")}
>
  <div>Card content</div>
</CardDashboard>
```

## Related Documentation

- **Design Specs**: See `DashboardCard.stories.tsx` → DesignSpecs story
- **Usage Guidelines**: See `DashboardCard.stories.tsx` → Usage story
- **Patterns**: See `Patterns/Dashboard` for dashboard card usage

---

**Last Updated**: December 18, 2025
