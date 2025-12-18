# Modal Component Specification

## Overview

The Modal component displays content in an overlay dialog. It supports multiple sizes, mobile optimizations, and various footer configurations.

## Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | `boolean` | `false` | Yes | Control modal visibility |
| `onClose` | `() => void` | - | Yes | Close handler |
| `header` | `string \| React.ReactNode` | - | Yes | Modal header content |
| `footer` | `React.ReactNode` | - | Yes | Modal footer content |
| `children` | `React.ReactNode` | - | No | Modal body content |
| `widthVariant` | `"small" \| "default" \| "large" \| "full" \| "reportmodal"` | `"default"` | No | Modal width |
| `headerTitle` | `string` | - | No | Header title (alternative to `header`) |
| `headerDescription` | `string` | - | No | Header description |
| `useDefaultFooter` | `boolean` | `false` | No | Use default footer buttons |
| `closeActionLabel` | `string` | - | No | Close button label |
| `actionLabel` | `string` | - | No | Action button label |
| `onShown` | `() => void` | - | No | Callback when modal is shown |
| `highlightDescription` | `boolean` | `false` | No | Highlight description text |
| `disableAction` | `boolean` | `false` | No | Disable action button |
| `cancelButtonVariant` | `ButtonVariant` | `"outlined"` | No | Cancel button variant |
| `actionButtonVariant` | `ButtonVariant` | `"filled"` | No | Action button variant |
| `cancelButtonColor` | `ButtonColor` | `"secondary"` | No | Cancel button color |
| `actionButtonColor` | `ButtonColor` | `"primary"` | No | Action button color |
| `headerIconUrl` | `string \| React.ReactNode` | - | No | Header icon |
| `showCrossIcon` | `boolean` | `true` | No | Show close (X) icon |
| `mobileFullscreen` | `boolean` | `true` | No | Fullscreen on mobile |
| `swipeToDismiss` | `boolean` | `true` | No | Swipe to dismiss (mobile) |
| `preventScroll` | `boolean` | `true` | No | Prevent body scroll when open |
| `mobileMaxHeight` | `number` | `0.95` | No | Max height on mobile (0-1) |
| `className` | `string` | - | No | Additional CSS classes |
| `customClass` | `string` | - | No | Back-compat class (deprecated) |

## Visual States

### Default State
- Background (overlay): `rgba(0, 0, 0, 0.5)` (backdrop)
- Background (modal): `var(--bg-primary)`
- Border: `var(--border-secondary)`
- Shadow: `var(--shadow-xl)`

### Mobile State
- Fullscreen or near-fullscreen
- Swipeable to dismiss
- Body scroll prevented

## Spacing Measurements

| Element | Spacing | Token |
|---------|---------|-------|
| Modal padding | `24px` | `var(--spacing-lg)` |
| Header padding | `24px` | `var(--spacing-lg)` |
| Body padding | `24px` | `var(--spacing-lg)` |
| Footer padding | `24px` | `var(--spacing-lg)` |
| Header margin bottom | `16px` | `var(--spacing-md)` |
| Footer margin top | `16px` | `var(--spacing-md)` |
| Gap between buttons | `12px` | `var(--spacing-sm)` |

## Typography

| Element | Font Size | Font Weight | Line Height | Token |
|---------|-----------|-------------|-------------|-------|
| Header title | `20px` | `600` | `1.5` | `var(--font-size-lg)`, `var(--font-weight-semibold)` |
| Header description | `14px` | `400` | `1.5` | `var(--font-size-sm)`, `var(--font-weight-normal)` |
| Body text | `16px` | `400` | `1.5` | `var(--font-size-md)`, `var(--font-weight-normal)` |

## Token Reference

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| Background (modal) | `--bg-primary` | Modal background |
| Background (overlay) | `rgba(0, 0, 0, 0.5)` | Backdrop overlay |
| Border | `--border-secondary` | Modal border |
| Border Radius | `--radius-lg` | Modal corner radius |
| Shadow | `--shadow-xl` | Modal shadow |
| Text (header) | `--text-primary` | Header text color |
| Text (body) | `--text-primary` | Body text color |
| Text (description) | `--text-secondary` | Description text color |
| Spacing (padding) | `--spacing-lg` | Modal padding |
| Spacing (gap) | `--spacing-md` | Section spacing |

## Dimensions

| Width Variant | Desktop Width | Mobile Width |
|---------------|---------------|--------------|
| `small` | `400px` | Full width |
| `default` | `500px` | Full width |
| `large` | `800px` | Full width |
| `full` | `100%` | Full width |
| `reportmodal` | Custom | Full width |

| Property | Value | Notes |
|----------|-------|-------|
| Border Radius | `12px` | `var(--radius-lg)` |
| Max Height (mobile) | `95%` | `mobileMaxHeight` prop |
| Min Height | Auto | Based on content |
| Z-Index | `50` | Above other content |

## Accessibility Requirements

### Keyboard Navigation
- **Escape**: Close modal
- **Tab**: Focus trap within modal
- **Shift+Tab**: Reverse focus trap
- **Enter**: Activate primary action (if in form)
- Focus returns to trigger element when closed

### Screen Reader Support
- Modal must have `role="dialog"` or `role="alertdialog"`
- Modal must have `aria-labelledby` pointing to header
- Modal must have `aria-describedby` pointing to body (if applicable)
- Backdrop must be properly announced
- Focus must be trapped within modal

### Focus Management
- Focus moves to first focusable element when opened
- Focus trap prevents tabbing outside modal
- Focus returns to trigger when closed
- Focus ring must be visible on all interactive elements

### Mobile Optimizations
- `mobileFullscreen`: Fullscreen on mobile devices
- `swipeToDismiss`: Swipe down to dismiss
- `preventScroll`: Prevents body scroll when open
- `mobileMaxHeight`: Limits modal height on mobile

## Usage Examples

### Basic Modal
```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  header="Confirm Action"
  footer={
    <>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="solid" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Modal with Default Footer
```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  header="Delete Item"
  useDefaultFooter
  closeActionLabel="Cancel"
  actionLabel="Delete"
  actionButtonColor="destructive"
>
  <p>This action cannot be undone.</p>
</Modal>
```

### Large Modal
```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  header="Settings"
  widthVariant="large"
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
>
  <div>Settings content...</div>
</Modal>
```

### Alert Dialog Variant
```tsx
<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Warning"
  description="This action is irreversible."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={handleDelete}
/>
```

## Related Documentation

- **Design Specs**: See `Modal.stories.tsx` → DesignSpecs story
- **Usage Guidelines**: See `Modal.stories.tsx` → Usage story
- **Patterns**: See `Patterns/LoginForm` for modal usage in forms

---

**Last Updated**: December 18, 2025
