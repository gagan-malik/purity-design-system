# Backlog: Missing Components (Audit: shadcn/ui + Fluent UI + Salesforce Lightning)

This backlog lists **components/patterns commonly found in popular design systems** that are currently missing (or not available as a first-class primitive) in this repository.

Scope sources:
- shadcn/ui (component patterns and primitives)
- Fluent UI (Microsoft)
- Salesforce Lightning Design System (SLDS)

## P0 — Highest leverage (build first)

### AI Agentic UI (foundational)
- **ChatMessage**: message bubble primitives (user/assistant/system/tool), markdown-capable, code blocks.
- **ChatMessageList**: virtualized/auto-scroll message list with “new messages” affordance.
- **ChatComposer / PromptInput**: multiline input, submit/stop, shift+enter, character counting, disabled states.
- **StreamingIndicator**: typing/streaming cursor indicator + “generating…” state.
- **MessageActions**: copy/regenerate/like/dislike, overflow menu.
- **AttachmentPicker**: file/image attachments UI + upload progress.
- **Citation**: inline citations + expandable “sources” list.
- **ErrorBanner**: inline recoverable error state (“retry”, “report”).

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

### AI Agentic UI (agent workflows)
- **ToolCallCard**: render tool/function calls with status (queued/running/succeeded/failed) and inputs/outputs.
- **RunTimeline / StepList**: agent step-by-step timeline (plan → tool calls → results).
- **ApprovalCard**: “requires approval” UI for risky actions (send email, run code, delete, etc.).
- **ArtifactPanel**: side panel to show generated artifacts (code diff, files, tables, charts).
- **ConversationList**: history sidebar (search, pin, rename, delete).
- **ModelSelector**: model picker + context window + temperature (or simplified presets).
- **TokenUsageMeter**: usage / cost meter (optional but common).
- **SafetyNotice**: policy banner + “sensitive action” warning pattern.

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

## Proposed additions (next candidates)

These are not strictly “missing vs Fluent/SLDS/shadcn”, but are **high-impact** for modern product + agentic UIs.

### AI / agent UX
- **MarkdownViewer**: consistent markdown rendering (same rules as `ChatMessage`) for non-chat surfaces.
- **CodeBlock**: code rendering with copy button, wrap/scroll options.
- **DiffViewer**: unified/split diff rendering for patch previews (pairs well with `ArtifactPanel`).
- **FileTree**: file explorer for generated artifacts (pairs with `TreeView` but adds file semantics).
- **PromptTemplatePicker**: browse/select prompt templates with variables and preview.
- **ContextChips**: compact “context included” chips (files, URLs, tools) with remove.
- **ToolResultViewer**: standard viewer for JSON/table/text tool outputs.

### Enterprise / product
- **PaginationControl**: standalone pagination component (for DataGrid and lists).
- **FilterBar**: reusable filter chips + field filters + clear all.
- **BulkActionsBar**: appears when selection > 0 (works with DataGrid/Table).

## Notes
- P0 items should ship with **Storybook stories** and be **exported from** `design-system/src/components/index.ts`.
- For complex components (DataGrid, virtualization), prefer well-supported internals (e.g. TanStack Table / react-window) to reduce maintenance risk.

