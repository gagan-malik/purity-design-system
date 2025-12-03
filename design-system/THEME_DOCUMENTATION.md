# Theme System Documentation

The Purity Design System includes comprehensive support for light and dark modes with automatic theme switching based on system preferences.

## Features

- ✅ **Light & Dark Modes** - Full support for both themes
- ✅ **System Preference** - Automatically follows OS theme preference
- ✅ **Persistent Storage** - Theme choice is saved in localStorage
- ✅ **Smooth Transitions** - Seamless theme switching
- ✅ **Tailwind Integration** - Uses Tailwind's dark mode with CSS variables

## Quick Start

### 1. Wrap Your App with ThemeProvider

```tsx
import { ThemeProvider } from "@purity/design-system";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use Theme Controls

```tsx
import { ThemeToggle, ThemeSelector } from "@purity/design-system";

function Header() {
  return (
    <header>
      <ThemeToggle showLabel />
      {/* OR */}
      <ThemeSelector />
    </header>
  );
}
```

### 3. Access Theme in Components

```tsx
import { useTheme } from "@purity/design-system";

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Components

### ThemeProvider

Manages theme state and applies theme classes to the document.

**Props:**
- `children` (ReactNode) - Your app content
- `defaultTheme` ("light" | "dark" | "system") - Default theme (default: "system")
- `storageKey` (string) - localStorage key for persistence (default: "purity-theme")

**Example:**
```tsx
<ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
  <App />
</ThemeProvider>
```

### ThemeToggle

Simple button to toggle between light and dark modes.

**Props:**
- `showLabel` (boolean) - Show text labels (default: false)
- `size` ("sm" | "md" | "lg") - Button size (default: "md")
- `className` (string) - Additional CSS classes

**Example:**
```tsx
<ThemeToggle showLabel size="lg" />
```

### ThemeSelector

Full theme selector with light, dark, and system options.

**Props:**
- `showLabels` (boolean) - Show text labels (default: true)
- `size` ("sm" | "md" | "lg") - Button size (default: "md")
- `className` (string) - Additional CSS classes

**Example:**
```tsx
<ThemeSelector showLabels size="md" />
```

### useTheme Hook

Hook to access and control theme state.

**Returns:**
```tsx
{
  theme: "light" | "dark" | "system";      // Selected theme
  resolvedTheme: "light" | "dark";          // Actual theme (resolves system)
  setTheme: (theme: Theme) => void;        // Set theme
  toggleTheme: () => void;                  // Toggle between light/dark
}
```

**Example:**
```tsx
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

## How It Works

### CSS Variables

The theme system uses CSS variables defined in `tailwind-theme.css`. Variables automatically switch based on the `.dark` class on the document root.

**Light Mode:**
```css
:root {
  --bg-primary: var(--base-white);
  --text-primary: var(--gray-900);
  /* ... */
}
```

**Dark Mode:**
```css
.dark {
  --bg-primary: var(--base-black);
  --text-primary: var(--gray-50);
  /* ... */
}
```

### Tailwind Configuration

Tailwind is configured with `darkMode: "selector"`, which means it uses the `.dark` class for dark mode styles.

```js
// tailwind.config.js
module.exports = {
  darkMode: "selector",
  // ...
};
```

### Automatic Theme Application

The ThemeProvider automatically:
1. Applies/removes the `.dark` class on `document.documentElement`
2. Listens to system preference changes when theme is "system"
3. Persists theme choice to localStorage
4. Resolves system preference to actual theme

## Using Dark Mode in Components

### With Tailwind Classes

Use the `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

### With CSS Variables

Use the design system CSS variables (automatically switch):

```tsx
<div className="bg-bg-primary text-text-primary">
  Content automatically adapts to theme
</div>
```

### Best Practices

1. **Use CSS Variables** - Prefer design system variables over hardcoded colors
2. **Test Both Themes** - Always test components in light and dark modes
3. **Avoid Hardcoded Colors** - Use theme-aware utilities
4. **Consider Contrast** - Ensure text is readable in both themes

## Examples

### Basic Setup

```tsx
import { ThemeProvider, ThemeToggle } from "@purity/design-system";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg-primary">
        <header className="p-4 border-b border-border-secondary">
          <ThemeToggle />
        </header>
        <main className="p-8">
          {/* Your content */}
        </main>
      </div>
    </ThemeProvider>
  );
}
```

### Custom Theme Control

```tsx
import { useTheme } from "@purity/design-system";

function CustomThemeControl() {
  const { theme, setTheme } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

### Conditional Rendering Based on Theme

```tsx
import { useTheme } from "@purity/design-system";

function ThemedImage() {
  const { resolvedTheme } = useTheme();
  
  return (
    <img 
      src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"} 
      alt="Logo"
    />
  );
}
```

## Storybook Integration

The theme system is integrated into Storybook with a toolbar control:

1. **Theme Toolbar** - Use the theme selector in Storybook toolbar
2. **Automatic Wrapping** - Stories are automatically wrapped with ThemeProvider
3. **Global Decorator** - All stories can access theme controls

## Migration Guide

If you're adding themes to an existing app:

1. **Wrap with ThemeProvider** at the root level
2. **Replace hardcoded colors** with CSS variables
3. **Test components** in both themes
4. **Add theme controls** to your UI

## Troubleshooting

### Theme Not Applying

- Ensure `ThemeProvider` wraps your app
- Check that CSS variables are loaded
- Verify Tailwind config has `darkMode: "selector"`

### Styles Not Updating

- Clear browser cache
- Check CSS variable definitions
- Ensure `.dark` class is being applied to document root

### System Preference Not Working

- Check browser supports `prefers-color-scheme`
- Verify theme is set to "system"
- Test in different browsers

## API Reference

See the component documentation in Storybook for complete API details.

---

For more information, visit the [Storybook Theme Showcase](../../design-system/src/components/ThemeShowcase/ThemeShowcase.stories.tsx).

