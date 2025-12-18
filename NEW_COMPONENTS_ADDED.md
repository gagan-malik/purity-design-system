# New Components Added to Storybook

Based on the shadcn/ui changelog analysis, the following missing components have been added to the Purity Design System:

## Components Created

### 1. **Spinner** (`Atoms/Spinner`)
- Simple loading indicator component
- Sizes: sm, md, lg
- Variants: primary, secondary, muted
- Can be used in buttons and standalone
- **Location**: `design-system/src/components/Spinner/`

### 2. **Kbd** (`Atoms/Kbd`)
- Keyboard key display component
- Supports single keys and key combinations via `KbdGroup`
- Sizes: sm, md, lg
- **Location**: `design-system/src/components/Kbd/`

### 3. **InputGroup** (`Molecules/InputGroup`)
- Enhanced input with addons (icons, buttons, text)
- Components: `InputGroup`, `InputGroupInput`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`
- Supports icons on both sides, text prefixes/suffixes, and buttons
- **Location**: `design-system/src/components/InputGroup/`

### 4. **Field** (`Molecules/Field`)
- Form field abstraction component
- Components: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldContent`, `FieldSet`, `FieldLegend`, `FieldGroup`, `FieldSeparator`, `FieldTitle`
- Supports vertical, horizontal, and responsive orientations
- Works with all form controls (inputs, checkboxes, selects, etc.)
- **Location**: `design-system/src/components/Field/`

### 5. **Item** (`Molecules/Item`)
- Flexible container for lists and cards
- Components: `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemGroup`, `ItemSeparator`
- Supports icons, avatars, images
- Can be used as links with `asChild` prop
- **Location**: `design-system/src/components/Item/`

### 6. **Sidebar** (`Organisms/Sidebar`)
- Sidebar navigation component
- Components: `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarMenuItem`
- Variants: default, inset
- Customizable width
- **Location**: `design-system/src/components/Sidebar/`

### 7. **ToggleGroup** (`Molecules/ToggleGroup`)
- Group of toggle buttons
- Components: `ToggleGroup`, `ToggleGroupItem`
- Types: single, multiple
- Orientations: horizontal, vertical
- **Location**: `design-system/src/components/ToggleGroup/`

### 8. **NativeSelect** (`Atoms/NativeSelect`)
- Native HTML select wrapper
- Supports label, helper text, and error messages
- Can use options array or children
- **Location**: `design-system/src/components/NativeSelect/`

## Components Already Existed

The following components from the shadcn/ui changelog were already present in Purity:
- ✅ **Resizable** - Already exists
- ✅ **ScrollArea** - Already exists  
- ✅ **ButtonGroup** - Already exists
- ✅ **EmptyState** - Already exists (shadcn has "Empty", but functionality is similar)

## Storybook Stories

All components have been added with comprehensive Storybook stories including:
- Basic usage examples
- Variant demonstrations
- Size options
- Integration examples
- Interactive examples where applicable

## Exports

All components have been exported from:
- `design-system/src/components/index.ts`
- Individual component `index.ts` files

## Next Steps

1. **Test in Storybook**: Run `yarn storybook` to view all new components
2. **Verify functionality**: Test interactive features (ToggleGroup state, etc.)
3. **Add to website**: Components will automatically appear in the components page after rebuild
4. **Documentation**: Consider adding usage examples and API documentation

## Notes

- All components follow the existing Purity design system patterns
- Components use ThemeProvider for theme support
- SVG icons are used inline in stories (no external icon library dependency)
- Components are TypeScript-typed and follow React best practices
