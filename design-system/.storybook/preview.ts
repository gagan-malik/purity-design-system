import type { Preview } from "@storybook/react";

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
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`.
      // This is used for sorting on folder level in stories by alphabetic order
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    marker: {
      destination: "66fbd290b2e262a893c00700", // <- Your unique destination ID
      mode: "fullscreen",
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#030712' },
        { name: 'Light', value: '#FFFFFF' }
      ],
      default: 'Light',
    },
  }
};

export default preview;
