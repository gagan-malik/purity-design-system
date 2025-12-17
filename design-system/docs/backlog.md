# Backlog: Missing Components (Audit: shadcn/ui + Fluent UI + Salesforce Lightning)

This backlog lists **components/patterns commonly found in popular design systems** that are currently missing (or not available as a first-class primitive) in this repository.

Scope sources:
- shadcn/ui (component patterns and primitives)
- Fluent UI (Microsoft)
- Salesforce Lightning Design System (SLDS)

## P0 — Highest leverage (build first)

### Forms & Inputs
- **Combobox (Autocomplete)**: searchable single-select input.
- **MultiSelect (searchable)**: multi-select with selected chips + keyboard nav.
- **Chip / Tag**: removable pill primitive (+ selectable/disabled states).
- **TagInput**: freeform entry producing chips; backspace to remove; paste support.
- **NumberInput / SpinButton**: stepper buttons, min/max, formatting hooks.
- **PasswordInput**: reveal toggle, optional strength slot.
- **MaskedInput**: pattern mask (phone/currency/date), controlled/uncontrolled.
- **OTP / PIN Input**: segmented inputs with auto-advance + paste.

### Data display / enterprise essentials
- **DataGrid**: sorting, filtering, selection, column resize, sticky header (baseline).
- **VirtualizedList**: performant list rendering for large datasets.
- **TreeView**: hierarchical list with expand/collapse + keyboard support.

### Feedback / messaging
- **MessageBar**: inline banner with intent + action + dismiss.
- **EmptyState**: standardized empty/zero/error state block.
- **ProgressRing / Spinner**: determinate/indeterminate progress indicator.

## P1 — High value (build after P0)

### Date & time
- **TimePicker**
- **DateTimePicker**

### Navigation & command surfaces
- **Menubar**: app-style menu bar with nested menus.
- **CommandBar**: action bar with overflow behavior (Fluent-like).
- **AppShell**: composable header/side nav/content layout primitives.

### Coaching / onboarding
- **TeachingBubble / Coachmark**: anchored onboarding callout.
- **Callout**: anchored surface for rich, dismissible content (distinct from tooltip).

### Salesforce patterns
- **PathStepper**: milestone/path indicator (SLDS Path-like).
- **DualListbox**: move items between two lists with search + bulk actions.
- **Lookup / PeoplePicker**: entity/person picker with async suggestions + selected personas.

## P2 — Nice to have / product-dependent

### Editors & specialized inputs
- **ColorPicker**
- **RichTextEditor** (lightweight baseline)

### Other common primitives
- **Rating**
- **Timeline / Activity feed**

## Notes
- P0 items should ship with **Storybook stories** and be **exported from** `design-system/src/components/index.ts`.
- For complex components (DataGrid, virtualization), prefer well-supported internals (e.g. TanStack Table / react-window) to reduce maintenance risk.

