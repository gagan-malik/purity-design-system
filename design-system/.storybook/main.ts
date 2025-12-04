// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-docs"),
    "@chromatic-com/storybook",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],

  typescript: {
    check: false, // Disable type-checking during build to avoid blocking on type errors
    reactDocgen: 'react-docgen-typescript',
    skipBabel: false,
  },

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      builder: {
        useSWC: true,
        fsCache: true,
      },
    },
  },
  
  features: {
    buildStoriesJson: false,
  },
  
  webpackFinal: async (config: any) => {
    // Handle @vitest/mocker resolution issues
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    
    // Alias @vitest/mocker packages to empty module
    config.resolve.alias['@vitest/mocker'] = false;
    config.resolve.alias['@vitest/mocker/browser'] = false;
    
    // Also add to externals
    const externals = config.externals || [];
    const externalsArray = Array.isArray(externals) ? externals : [externals];
    config.externals = [
      ...externalsArray.filter((e: any) => e !== null && e !== undefined),
      '@vitest/mocker',
      '@vitest/mocker/browser',
    ];
    
    return config;
  },

  staticDirs: [],
  outputDir: 'storybook-static'
};

export default config;
