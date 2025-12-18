# Patterns

This document describes common UI patterns built with Purity Design System components. Patterns show how to combine multiple components to solve real-world design problems.

## Overview

Patterns are reusable compositions of components that solve specific user interface challenges. Each pattern includes:

- Complete working examples
- Component breakdown
- Responsive behavior
- Accessibility considerations
- When to use / when not to use guidelines

## Available Patterns

### 1. Login Form

**Location**: `Patterns/LoginForm` in Storybook

Complete authentication flow with validation, error handling, and accessibility.

**Components Used**:
- `Input` - Email and password fields
- `Button` - Submit action
- `Label` - Form field labels (integrated in Input)

**Key Features**:
- Form validation with error messages
- Loading states
- Remember me checkbox
- Forgot password link
- Responsive mobile/desktop layouts

**When to Use**:
- User authentication flows
- Account login pages
- Registration forms
- Password reset flows

**When Not to Use**:
- Simple contact forms (use Forms pattern)
- Search interfaces (use SearchInput component)
- Settings forms with multiple sections

---

### 2. Data Table

**Location**: `Patterns/DataTable` in Storybook

Data table with filters, search, sorting, and pagination for large datasets.

**Components Used**:
- `Table` - Core table component
- `SearchInput` - Global search
- `Button` - Action buttons (Add, Export, etc.)

**Key Features**:
- Column sorting and filtering
- Global search across data
- Pagination controls
- Multi-row selection
- Responsive (table on desktop, cards on mobile)

**When to Use**:
- Displaying large datasets (10+ rows)
- Data that needs sorting and filtering
- User management interfaces
- Admin dashboards
- Any tabular data requiring search and pagination

**When Not to Use**:
- Simple lists (use Item or List components)
- Small datasets (< 10 items)
- Non-tabular data (use Card grid instead)
- Read-only displays without interaction

---

### 3. Command Palette

**Location**: `Patterns/CommandPalette` in Storybook

Command palette (Cmd+K style) for quick actions, navigation, and search.

**Components Used**:
- `CommandMenu` - Core command palette component
- Keyboard shortcut handlers

**Key Features**:
- Cmd+K / Ctrl+K keyboard shortcut
- Real-time search filtering
- Grouped commands
- Full keyboard navigation
- Screen reader support

**Keyboard Shortcuts**:
- `⌘K` or `Ctrl+K` - Open/Close
- `↑` `↓` - Navigate items
- `Enter` - Execute command
- `Esc` - Close

**When to Use**:
- Quick actions and shortcuts
- Navigation to different pages/sections
- Searching across application features
- Power user workflows
- Applications with many actions/commands

**When Not to Use**:
- Simple navigation (use NavigationMenu instead)
- Context-specific actions (use ContextMenu instead)
- Mobile-only interfaces (use BottomNav or Sheet)
- Applications with very few actions

---

### 4. Dashboard

**Location**: `Patterns/Dashboard` in Storybook

Dashboard layout with cards, charts, navigation, and responsive grid.

**Components Used**:
- `CardDashboard` - Container for dashboard sections
- `AreaChart`, `PieChart` - Data visualization
- `SideNav` or custom navigation
- CSS Grid for responsive layout

**Key Features**:
- Responsive grid layout (1-4 columns)
- Stat cards with metrics
- Chart visualizations
- Sidebar navigation
- Action buttons

**Responsive Behavior**:
- **Mobile**: Cards stack vertically, sidebar becomes drawer
- **Tablet**: 2-3 columns for cards
- **Desktop**: 4+ columns, sidebar always visible

**When to Use**:
- Admin dashboards and analytics pages
- Data visualization interfaces
- Overview pages with multiple metrics
- Executive summaries and reports
- Monitoring and status dashboards

**When Not to Use**:
- Simple content pages (use standard layout)
- Mobile-first apps (use MobileNavigation pattern)
- Single-purpose interfaces
- Forms or wizards (use Forms pattern)

---

### 5. Mobile Navigation

**Location**: `Patterns/MobileNavigation` in Storybook

Mobile app navigation patterns optimized for touch interactions.

**Components Used**:
- `BottomNav` - Primary bottom navigation
- `MenuDrawer` - Slide-up drawer menu
- `ActionSheet` - Action selection sheet
- `MobileSheet` - Flexible bottom sheet

**Key Features**:
- Fixed bottom navigation (3-5 items)
- Touch-friendly targets (44px minimum)
- Safe area inset support
- Gesture support (swipe to dismiss)
- Haptic feedback

**When to Use BottomNav**:
- Primary app navigation (3-5 main sections)
- Mobile-first applications
- Thumb-friendly navigation zones
- Apps with frequent section switching

**When to Use Drawer**:
- Secondary navigation and settings
- User account menus
- Workspace/project selection
- Contextual actions

**When to Use ActionSheet**:
- Quick action selection (photo, share, etc.)
- iOS/Android native-style actions
- Destructive actions with confirmation

**When Not to Use**:
- Desktop-only applications (use SideNav or NavigationMenu)
- Complex navigation hierarchies (use SideNav with nesting)
- Web applications that aren't mobile-first

---

## Pattern Recipes

### Recipe: Form with Validation

```tsx
import { Input } from '@purity/design-system';
import { Button } from '@purity/design-system';

function FormWithValidation() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!email.includes("@")) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); validate(); }}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        hintText={errors.email}
        className={errors.email ? "border-error" : ""}
      />
      <Button type="submit" tone="brand" variant="solid">
        Submit
      </Button>
    </form>
  );
}
```

### Recipe: Responsive Card Grid

```tsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
}}>
  {items.map((item) => (
    <CardDashboard key={item.id} title={item.title}>
      {item.content}
    </CardDashboard>
  ))}
</div>
```

### Recipe: Mobile Bottom Navigation

```tsx
import { BottomNav } from '@purity/design-system';

const navItems = [
  { icon: homeIcon, iconSelected: homeSelectedIcon, label: "Home", href: "/" },
  { icon: searchIcon, iconSelected: searchSelectedIcon, label: "Search", href: "/search" },
  { icon: profileIcon, iconSelected: profileSelectedIcon, label: "Profile", href: "/profile" },
];

<BottomNav navItems={navItems} activePath={currentPath} />
```

---

## Do's and Don'ts

### ✅ Do's

- **Do** use patterns as starting points and customize for your needs
- **Do** maintain consistent spacing using design tokens
- **Do** ensure all patterns are keyboard accessible
- **Do** test patterns on mobile devices
- **Do** follow responsive breakpoints consistently
- **Do** use semantic tokens for colors

### ❌ Don'ts

- **Don't** copy patterns without understanding the components
- **Don't** mix patterns inappropriately (e.g., BottomNav on desktop)
- **Don't** skip accessibility considerations
- **Don't** hardcode spacing values (use tokens)
- **Don't** ignore responsive behavior
- **Don't** use raw color values (use semantic tokens)

---

## Component Combinations

### Forms
- `Input` + `Label` + `Button` = Basic form
- `Input` + `TextArea` + `Select` + `Button` = Complex form
- `FormGroup` + `Input` + `Button` = Grouped form fields

### Navigation
- `BottomNav` = Mobile primary navigation
- `SideNav` = Desktop sidebar navigation
- `NavigationMenu` = Horizontal navigation with dropdowns
- `MenuDrawer` = Mobile secondary navigation

### Data Display
- `Table` + `SearchInput` + `Pagination` = Data table
- `CardDashboard` + `AreaChart` = Dashboard card
- `CardDashboard` + `PieChart` = Distribution card

### Overlays
- `Modal` + `ModalHeader` + `ModalFooter` = Standard modal
- `ActionSheet` = Mobile action selection
- `MobileSheet` = Mobile content sheet
- `Popover` = Contextual popup

---

## Responsive Patterns

### Mobile-First Approach

1. **Start with mobile layout** (single column, stacked)
2. **Add tablet breakpoints** (2-3 columns)
3. **Add desktop enhancements** (4+ columns, sidebars)

### Breakpoint Strategy

- **Mobile**: < 768px - Single column, bottom navigation
- **Tablet**: 768px - 1024px - 2-3 columns, collapsible sidebar
- **Desktop**: ≥ 1024px - 4+ columns, always-visible sidebar

### Touch Targets

- Minimum 44px × 44px for all interactive elements
- Adequate spacing between targets (8px minimum)
- Consider thumb zones for bottom navigation

---

## Accessibility Patterns

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order (left-to-right, top-to-bottom)
- Escape key closes modals/drawers
- Enter/Space activates buttons

### Focus Management
- Visible focus rings on all interactive elements
- Focus trapped in modals
- Focus returns to trigger after closing

### Screen Reader Support
- Proper ARIA labels and roles
- Error messages associated with inputs
- Loading states announced
- Navigation landmarks

---

## Related Documentation

- **Components**: See individual component stories in Storybook
- **Tokens**: See `Foundations/Tokens` for design tokens
- **Theming**: See `Foundations/Theming` for theme customization
- **Accessibility**: See `Foundations/Accessibility` for a11y guidelines

---

## Contributing Patterns

When adding new patterns:

1. Create pattern story in `src/stories/Patterns/`
2. Include complete working example
3. Document component breakdown
4. Add responsive behavior notes
5. Include accessibility considerations
6. Add "when to use" / "when not to use" guidelines
7. Update this documentation file

---

**Last Updated**: December 18, 2025
