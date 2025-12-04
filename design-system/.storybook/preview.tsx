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
    options: {
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
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
  },

  decorators: [
    (Story, context) => {
      const componentTheme = context.globals.theme || 'light';
      
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
      }, [componentTheme, context]);

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

