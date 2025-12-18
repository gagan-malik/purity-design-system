import type { Preview } from "@storybook/react-webpack5";
import React from "react";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import { lightTheme, darkTheme } from './theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Disable addon-driven a11y failures in automated runs (legacy stories still exist).
      // CI enforcement is done via the custom test runner (scoped to Pages/*).
      disable: true,
    },
    options: {
      storySort: (a, b) => {
        // Priority order for Foundations subcategories
        const foundationsOrder = [
          "overview",
          "tokens",
          "colors",
          "typography",
          "spacing",
          "shadows",
          "border-radius",
          "breakpoints",
          "accessibility",
          "theming",
        ];

        const isFoundations = (id: string) => {
          return id.toLowerCase().includes("foundations");
        };

        const getFoundationsSubcategory = (id: string) => {
          const lowerId = id.toLowerCase();
          if (lowerId.includes("overview")) return "overview";
          if (lowerId.includes("tokens") && !lowerId.includes("colors")) return "tokens";
          if (lowerId.includes("colors") || lowerId.includes("color")) return "colors";
          if (lowerId.includes("typography")) return "typography";
          if (lowerId.includes("spacing")) return "spacing";
          if (lowerId.includes("shadow")) return "shadows";
          if (lowerId.includes("border-radius") || lowerId.includes("radius")) return "border-radius";
          if (lowerId.includes("breakpoint")) return "breakpoints";
          if (lowerId.includes("accessibility")) return "accessibility";
          if (lowerId.includes("theming") || lowerId.includes("theme")) return "theming";
          return null;
        };

        const isFoundationsA = isFoundations(a.id);
        const isFoundationsB = isFoundations(b.id);

        // Foundations first
        if (isFoundationsA && !isFoundationsB) return -1;
        if (!isFoundationsA && isFoundationsB) return 1;

        // If both are Foundations, sort by Foundations subcategory priority
        if (isFoundationsA && isFoundationsB) {
          const subcatA = getFoundationsSubcategory(a.id);
          const subcatB = getFoundationsSubcategory(b.id);
          
          if (subcatA && subcatB) {
            const subIndexA = foundationsOrder.indexOf(subcatA);
            const subIndexB = foundationsOrder.indexOf(subcatB);
            if (subIndexA !== subIndexB) {
              // If not found in order, put at end
              if (subIndexA === -1) return 1;
              if (subIndexB === -1) return -1;
              return subIndexA - subIndexB;
            }
          } else if (subcatA && !subcatB) return -1;
          else if (!subcatA && subcatB) return 1;
        }

        // Otherwise, sort alphabetically
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#030712' },
        light: { name: 'Light', value: '#FFFFFF' }
      }
    },
    docs: {
      theme: lightTheme,
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark', icon: 'circle' },
          { value: 'system', title: 'System', icon: 'sidebar' },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      description: "Global accent (brand) color",
      defaultValue: "neutral",
      toolbar: {
        title: "Accent",
        icon: "contrast",
        items: [
          { value: "neutral", title: "Neutral" },
          { value: "blue", title: "Blue" },
          { value: "emerald", title: "Emerald" },
          { value: "rose", title: "Rose" },
          { value: "amber", title: "Amber" },
        ],
        dynamicTitle: true,
      },
    },
    radius: {
      description: "Global radius scale",
      defaultValue: "md",
      toolbar: {
        title: "Radius",
        icon: "circle",
        items: [
          { value: "sm", title: "Sm" },
          { value: "md", title: "Md" },
          { value: "lg", title: "Lg" },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: "Global density (spacing)",
      defaultValue: "comfortable",
      toolbar: {
        title: "Density",
        icon: "sidebaralt",
        items: [
          { value: "comfortable", title: "Comfortable" },
          { value: "compact", title: "Compact" },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: "Global motion preference",
      defaultValue: "full",
      toolbar: {
        title: "Motion",
        icon: "play",
        items: [
          { value: "full", title: "Full" },
          { value: "reduced", title: "Reduced" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const componentTheme = context.globals.theme || 'light';
      const accent = context.globals.accent || "neutral";
      const radius = context.globals.radius || "md";
      const density = context.globals.density || "comfortable";
      const motion = context.globals.motion || "full";
      
      // Apply component theme to document
      React.useEffect(() => {
        const root = document.documentElement;
        const isDark = componentTheme === 'dark' || 
          (componentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
          root.classList.add('dark');
          // Update docs theme for dark mode
          context.parameters.docs.theme = darkTheme;
        } else {
          root.classList.remove('dark');
          // Update docs theme for light mode
          context.parameters.docs.theme = lightTheme;
        }

        // Apply additional theme dimensions for primitives.
        root.setAttribute("data-color", String(accent));
        root.setAttribute("data-radius", String(radius));
        root.setAttribute("data-density", String(density));
        root.setAttribute("data-motion", String(motion));
      }, [componentTheme, accent, radius, density, motion, context]);

      return (
        <ThemeProvider defaultTheme={componentTheme}>
          <div className="min-h-screen bg-bg-primary text-text-primary transition-colors">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;

