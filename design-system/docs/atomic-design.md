# Atomic Design taxonomy (Brad Frost)

This document categorizes **all components in** `design-system/src/components/` using Brad Frost’s Atomic Design model:

- **Atoms**: smallest UI primitives (single responsibility, reusable everywhere)
- **Molecules**: small compositions of atoms that form a discrete control/pattern
- **Organisms**: complex UI sections composed of molecules/atoms; feature-level building blocks
- **Templates**: layout scaffolds (where major regions live, but not “real content”)
- **Pages**: concrete examples / demo pages (usually product-specific or Storybook-only)

> Note: Some components could reasonably fit multiple categories. This mapping prioritizes **how the component is typically used** in product UIs.

## Atoms

- `AspectRatio`
- `Badge`
- `BasicButton`
- `Button`
- `ButtonV2`
- `Checkbox`
- `Chip`
- `Heading`
- `Icons`
- `Label`
- `Link`
- `Loader`
- `ProgressBar`
- `ProgressSpinner`
- `RadioButton`
- `Rating`
- `Separator`
- `Skeleton`
- `Slider`
- `StreamingIndicator`
- `Toggle`
- `Typography`

## Molecules

- `Accordion`
- `Alert`
- `AvatarLabelGroup`
- `BreadCrumb`
- `ButtonGroup`
- `Callout`
- `Citation`
- `ColorPicker`
- `Combobox`
- `DateTimePicker`
- `EmptyState`
- `ErrorBanner`
- `Form`
- `FormGroup`
- `FormInput`
- `HoverCard`
- `Lookup` (also exports `PeoplePicker`)
- `MaskedInput`
- `Menubar`
- `MessageActions`
- `MessageBar`
- `MetricItem`
- `ModelSelector`
- `MultiSelect`
- `NumberInput`
- `OTPInput`
- `Pagination`
- `PagginationDotGroup`
- `PasswordInput`
- `Popover`
- `Popup`
- `SafetyNotice`
- `SearchInput`
- `SectionLabel`
- `SegmentTabs`
- `Select`
- `Stepper`
- `TagInput`
- `TeachingBubble`
- `TimePicker`
- `ToastAlert`
- `TokenUsageMeter`
- `ToolTip`

## Organisms

- `ActionSheet`
- `AlCreditsCard`
- `ApprovalCard`
- `AreaChart`
- `ArtifactPanel`
- `AssistantInput`
- `AttachmentPicker`
- `AuthLayout`
- `Avatar`
- `BillingCard`
- `BottomNav`
- `Calendar`
- `Card`
- `Carousel`
- `ChatComposer`
- `ChatMessage`
- `ChatMessageList`
- `Collapsible`
- `CommandBar`
- `CommandMenu`
- `Comments`
- `Confetti`
- `ContentBox`
- `ContextMenu`
- `ConversationList`
- `DataGrid`
- `DatePicker`
- `DateRangePicker`
- `DateRangePickerV2`
- `DonutChart`
- `DragAndDrop`
- `Draggable`
- `Drawer`
- `Dropdown`
- `DropdownMenu`
- `DualListbox`
- `FeedCard`
- `FileManager`
- `FloatingToolbar`
- `HomeCard`
- `HomeCardGroup`
- `InfiniteScroll`
- `InfoChart`
- `InfoContainer`
- `LiquidGlassTabBar`
- `MenuPopover`
- `MobileSheet`
- `Modal`
- `NavigationMenu`
- `Notifications`
- `PathStepper`
- `PaymentCard`
- `PaymentCardDetails`
- `PickerView`
- `PieChart`
- `PlanList`
- `PullToRefresh`
- `RadioGroup`
- `Resizable`
- `RichTextEditor`
- `RunTimeline`
- `ScrollArea`
- `SearchAndFilter`
- `Sheet`
- `SideDrawer`
- `SideNav`
- `Stackchart`
- `StatusBar`
- `SwipeableCard`
- `Table`
- `TemplateCard`
- `ThemeSelector`
- `ThemeToggle`
- `Timeline`
- `ToastNotification`
- `ToolCallCard`
- `Toolbar`
- `TreeView`
- `VirtualizedList`

## Templates

- `AppShell`
- `Container`
- `Grid`
- `Header`
- `TopBar`

## Pages

- `PlayGround`
- `ThemeShowcase`

