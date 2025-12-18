# Figma-to-Code Mapping

This document maps Figma component names to React component names, variants to props, and token naming conventions. Use this as a reference when implementing designs from Figma.

## Table of Contents

1. [Component Name Mapping](#component-name-mapping)
2. [Variant to Prop Mapping](#variant-to-prop-mapping)
3. [Token Naming Conventions](#token-naming-conventions)
4. [MCP Sync Reference](#mcp-sync-reference)

---

## Component Name Mapping

### Core Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `Button` | `Button` | `@purity/design-system` |
| `Input` | `Input` | `@purity/design-system` |
| `TextArea` | `TextArea` | `@purity/design-system` |
| `Select` | `Select` | `@purity/design-system` |
| `Checkbox` | `Checkbox` | `@purity/design-system` |
| `Radio` | `RadioGroup` | `@purity/design-system` |
| `Toggle` | `Toggle` | `@purity/design-system` |
| `Switch` | `Toggle` (variant) | `@purity/design-system` |
| `Card` | `CardDashboard` | `@purity/design-system` |
| `Modal` | `Modal` | `@purity/design-system` |
| `AlertDialog` | `Modal` (variant) | `@purity/design-system` |
| `Dropdown` | `Dropdown` | `@purity/design-system` |
| `DropdownMenu` | `DropdownMenu` | `@purity/design-system` |
| `Tooltip` | `Tooltip` | `@purity/design-system` |
| `Popover` | `Popover` | `@purity/design-system` |
| `Label` | `Label` | `@purity/design-system` |
| `Badge` | `Badge` | `@purity/design-system` |
| `Avatar` | `Avatar` | `@purity/design-system` |
| `Separator` | `Separator` | `@purity/design-system` |
| `Skeleton` | `Skeleton` | `@purity/design-system` |
| `Slider` | `Slider` | `@purity/design-system` |
| `Stepper` | `Stepper` | `@purity/design-system` |
| `Accordion` | `Accordion` | `@purity/design-system` |
| `Carousel` | `Carousel` | `@purity/design-system` |
| `ContextMenu` | `ContextMenu` | `@purity/design-system` |
| `CommandMenu` | `CommandMenu` | `@purity/design-system` |
| `PickerView` | `PickerView` | `@purity/design-system` |

### Navigation Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `NavigationMenu` | `NavigationMenu` | `@purity/design-system` |
| `SideNav` | `SideNav` | `@purity/design-system` |
| `BottomNav` | `BottomNav` | `@purity/design-system` |
| `Breadcrumb` | `BreadCrumb` | `@purity/design-system` |
| `Pagination` | `Pagination` | `@purity/design-system` |
| `Tabs` | `SegmentTabs` | `@purity/design-system` |

### Layout Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `Container` | `Container` | `@purity/design-system` |
| `Grid` | `Grid` | `@purity/design-system` |
| `Sheet` | `Sheet` | `@purity/design-system` |
| `Drawer` | `Drawer` | `@purity/design-system` |
| `MenuDrawer` | `MenuDrawer` | `@purity/design-system` |
| `MobileSheet` | `MobileSheet` | `@purity/design-system` |
| `ActionSheet` | `ActionSheet` | `@purity/design-system` |
| `Resizable` | `Resizable` | `@purity/design-system` |
| `AspectRatio` | `AspectRatio` | `@purity/design-system` |
| `Collapsible` | `Collapsible` | `@purity/design-system` |

### Data Display Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `Table` | `Table` | `@purity/design-system` |
| `DataGrid` | `DataGrid` | `@purity/design-system` |
| `List` | `Item` | `@purity/design-system` |
| `TreeView` | `TreeView` | `@purity/design-system` |
| `Timeline` | `Timeline` | `@purity/design-system` |

### Form Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `Form` | `Form` | `@purity/design-system` |
| `Field` | `Field` | `@purity/design-system` |
| `InputGroup` | `InputGroup` | `@purity/design-system` |
| `DatePicker` | `DatePicker` | `@purity/design-system` |
| `DateRangePicker` | `DateRangePicker` | `@purity/design-system` |
| `Combobox` | `Combobox` | `@purity/design-system` |
| `MultiSelect` | `MultiSelect` | `@purity/design-system` |
| `OTPInput` | `OTPInput` | `@purity/design-system` |
| `FileUpload` | `FileUpload` | `@purity/design-system` |

### Feedback Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `Alert` | `Alert` | `@purity/design-system` |
| `Toast` | `ToastNotification` | `@purity/design-system` |
| `Progress` | `Progress` | `@purity/design-system` |
| `Spinner` | `Spinner` | `@purity/design-system` |
| `Loading` | `Loader` | `@purity/design-system` |

### Chart Components

| Figma Component | React Component | Import Path |
|----------------|-----------------|-------------|
| `AreaChart` | `AreaChart` | `@purity/design-system` |
| `PieChart` | `PieChart` | `@purity/design-system` |
| `DonutChart` | `DonutChart` | `@purity/design-system` |
| `StackChart` | `Stackchart` | `@purity/design-system` |
| `InfoChart` | `InfoChart` | `@purity/design-system` |

---

## Variant to Prop Mapping

### Button Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Button/Primary` | `variant` | `"solid"` |
| `Button/Secondary` | `variant` | `"outline"` |
| `Button/Ghost` | `variant` | `"ghost"` |
| `Button/Text` | `variant` | `"text"` |
| `Button/Small` | `size` | `"sm"` |
| `Button/Medium` | `size` | `"md"` |
| `Button/Large` | `size` | `"lg"` |
| `Button/Brand` | `tone` | `"brand"` |
| `Button/Neutral` | `tone` | `"neutral"` |
| `Button/Destructive` | `tone` | `"destructive"` |
| `Button/Disabled` | `disabled` | `true` |
| `Button/Loading` | `loading` | `true` |

**Example:**
```tsx
// Figma: Button/Primary/Medium/Brand
<Button variant="solid" size="md" tone="brand">Click me</Button>

// Figma: Button/Secondary/Small/Disabled
<Button variant="outline" size="sm" disabled>Disabled</Button>
```

### Input Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Input/Default` | `variant` | `"default"` |
| `Input/Error` | `error` | `true` |
| `Input/Disabled` | `disabled` | `true` |
| `Input/WithLabel` | `label` | `"Label text"` |
| `Input/WithHint` | `hintText` | `"Hint text"` |
| `Input/WithIcon` | `icon` | `{...}` |
| `Input/Password` | `type` | `"password"` |
| `Input/Email` | `type` | `"email"` |
| `Input/Number` | `type` | `"number"` |

**Example:**
```tsx
// Figma: Input/WithLabel/Error
<Input label="Email" error hintText="Invalid email address" />

// Figma: Input/Disabled
<Input label="Name" disabled placeholder="Cannot edit" />
```

### Card Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Card/Default` | - | Default props |
| `Card/WithHeader` | `title` | `"Card Title"` |
| `Card/WithFooter` | `footer` | `{...}` |
| `Card/Small` | `gap` | `"sm"` |
| `Card/Medium` | `gap` | `"md"` |
| `Card/Large` | `gap` | `"lg"` |

**Example:**
```tsx
// Figma: Card/WithHeader/Medium
<CardDashboard title="Dashboard Card" gap="md">
  Content here
</CardDashboard>
```

### Modal Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Modal/Default` | `variant` | `"default"` |
| `Modal/AlertDialog` | `variant` | `"alert"` |
| `Modal/Small` | `size` | `"sm"` |
| `Modal/Medium` | `size` | `"md"` |
| `Modal/Large` | `size` | `"lg"` |
| `Modal/FullScreen` | `size` | `"full"` |

**Example:**
```tsx
// Figma: Modal/AlertDialog/Medium
<Modal variant="alert" size="md" open={open} onClose={onClose}>
  <ModalHeader>Confirm Action</ModalHeader>
  <ModalBody>Are you sure?</ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>Cancel</Button>
    <Button variant="solid" tone="destructive" onClick={onConfirm}>Delete</Button>
  </ModalFooter>
</Modal>
```

### Select Component

| Figma Variant | React Prop | Value |
|---------------|------------|-------|
| `Select/Default` | `variant` | `"default"` |
| `Select/Error` | `error` | `true` |
| `Select/Disabled` | `disabled` | `true` |
| `Select/WithLabel` | `label` | `"Label text"` |
| `Select/WithHint` | `hintText` | `"Hint text"` |
| `Select/Searchable` | `searchable` | `true` |
| `Select/Multi` | `multiple` | `true` |

**Example:**
```tsx
// Figma: Select/WithLabel/Searchable
<Select label="Country" searchable>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</Select>
```

---

## Token Naming Conventions

### Figma Token → CSS Variable Mapping

#### Colors

| Figma Token | CSS Variable | Usage |
|-------------|--------------|-------|
| `color.bg.primary` | `--bg-primary` | Main background |
| `color.bg.secondary` | `--bg-secondary` | Secondary background |
| `color.bg.tertiary` | `--bg-tertiary` | Tertiary background |
| `color.bg.brand.primary` | `--bg-brand-primary` | Brand background |
| `color.text.primary` | `--text-primary` | Primary text |
| `color.text.secondary` | `--text-secondary` | Secondary text |
| `color.text.tertiary` | `--text-tertiary` | Tertiary text |
| `color.text.brand.primary` | `--text-brand-primary` | Brand text |
| `color.border.primary` | `--border-primary` | Primary border |
| `color.border.secondary` | `--border-secondary` | Secondary border |

#### Spacing

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `spacing.none` | `--spacing-none` | `0px` |
| `spacing.xs` | `--spacing-xs` | `4px` |
| `spacing.sm` | `--spacing-sm` | `8px` |
| `spacing.md` | `--spacing-md` | `16px` |
| `spacing.lg` | `--spacing-lg` | `24px` |
| `spacing.xl` | `--spacing-xl` | `32px` |
| `spacing.2xl` | `--spacing-2xl` | `48px` |
| `spacing.3xl` | `--spacing-3xl` | `64px` |

#### Typography

| Figma Token | CSS Variable | Usage |
|-------------|--------------|-------|
| `typography.fontSize.xs` | `--font-size-xs` | Extra small text |
| `typography.fontSize.sm` | `--font-size-sm` | Small text |
| `typography.fontSize.md` | `--font-size-md` | Medium text (default) |
| `typography.fontSize.lg` | `--font-size-lg` | Large text |
| `typography.fontSize.xl` | `--font-size-xl` | Extra large text |
| `typography.fontWeight.normal` | `--font-weight-normal` | `400` |
| `typography.fontWeight.medium` | `--font-weight-medium` | `500` |
| `typography.fontWeight.semibold` | `--font-weight-semibold` | `600` |
| `typography.fontWeight.bold` | `--font-weight-bold` | `700` |
| `typography.lineHeight.tight` | `--line-height-tight` | `1.25` |
| `typography.lineHeight.normal` | `--line-height-normal` | `1.5` |
| `typography.lineHeight.relaxed` | `--line-height-relaxed` | `1.75` |

#### Shadows

| Figma Token | CSS Variable | Usage |
|-------------|--------------|-------|
| `shadow.xs` | `--shadow-xs` | Subtle elevation |
| `shadow.sm` | `--shadow-sm` | Small elevation |
| `shadow.md` | `--shadow-md` | Medium elevation |
| `shadow.lg` | `--shadow-lg` | Large elevation |
| `shadow.xl` | `--shadow-xl` | Extra large elevation |
| `shadow.modal` | `--shadow-modal` | Modal overlay |

#### Border Radius

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `radius.none` | `--radius-none` | `0px` |
| `radius.sm` | `--radius-sm` | `4px` |
| `radius.md` | `--radius-md` | `8px` |
| `radius.lg` | `--radius-lg` | `12px` |
| `radius.xl` | `--radius-xl` | `16px` |
| `radius.full` | `--radius-full` | `9999px` |

---

## MCP Sync Reference

The MCP (Model Context Protocol) server can sync Figma components to code. This section documents how the sync works for reference.

### How MCP Sync Works

1. **Figma Plugin**: Connects to Figma file and extracts component data
2. **MCP Server**: Receives component data and maps to React components
3. **Code Generation**: Generates React component code with proper props
4. **Token Mapping**: Converts Figma tokens to CSS variables
5. **File Creation**: Creates component files in the design system

### Sync Process

```
Figma Component
    ↓
Figma Plugin (extracts data)
    ↓
MCP Server (maps to React)
    ↓
Code Generator (generates code)
    ↓
Design System (component file)
```

### Supported Sync Features

- ✅ Component name mapping
- ✅ Variant to prop mapping
- ✅ Token conversion (Figma → CSS variables)
- ✅ Spacing token mapping
- ✅ Color token mapping
- ✅ Typography token mapping

### Limitations

- ⚠️ Complex animations may need manual implementation
- ⚠️ Custom logic requires manual coding
- ⚠️ Some Figma features may not map directly

### Using MCP Sync

1. **Install Figma Plugin**: Install the Purity Design System Figma plugin
2. **Select Component**: Select the component in Figma
3. **Run Sync**: Click "Sync to Code" in the plugin
4. **Review Generated Code**: Review the generated React component
5. **Adjust if Needed**: Make manual adjustments if necessary

---

## Quick Reference

### Common Mappings

```tsx
// Button
Figma: Button/Primary/Medium/Brand
Code: <Button variant="solid" size="md" tone="brand">Text</Button>

// Input
Figma: Input/WithLabel/Error
Code: <Input label="Label" error hintText="Error message" />

// Card
Figma: Card/WithHeader/Medium
Code: <CardDashboard title="Title" gap="md">Content</CardDashboard>

// Modal
Figma: Modal/AlertDialog/Medium
Code: <Modal variant="alert" size="md" open={open} onClose={onClose}>...</Modal>
```

### Token Usage

```css
/* Colors */
background: var(--bg-primary);
color: var(--text-primary);
border-color: var(--border-secondary);

/* Spacing */
padding: var(--spacing-md);
margin: var(--spacing-lg);
gap: var(--spacing-sm);

/* Typography */
font-size: var(--font-size-md);
font-weight: var(--font-weight-semibold);
line-height: var(--line-height-normal);

/* Shadows */
box-shadow: var(--shadow-md);

/* Border Radius */
border-radius: var(--radius-md);
```

---

## Related Documentation

- **Design Handoff Guide**: See `design-handoff.md` for how to specify components in Figma
- **Component Specs**: See `component-specs/` for detailed component specifications
- **Design Tokens**: See `Foundations/Tokens` in Storybook for all available tokens

---

**Last Updated**: December 18, 2025
