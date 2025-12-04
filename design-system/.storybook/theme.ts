import { create } from 'storybook/theming/create';

// Light theme with modern, polished design
export const lightTheme = create({
  base: 'light',
  
  // Branding
  brandTitle: '✨ Purity Design System',
  brandUrl: 'https://github.com/gagan-malik/purity-design-system',
  brandImage: undefined,
  brandTarget: '_blank',

  // Color palette - modern brand colors with gradients
  colorPrimary: '#1570ef', // brand-600 - primary blue
  colorSecondary: '#7c3aed', // purple accent for variety

  // UI colors - clean and modern
  appBg: '#fafbfc', // subtle gray background
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e5e7eb', // softer border
  appBorderRadius: 12,

  // Text colors - improved contrast
  textColor: '#0f172a', // near black for better readability
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b', // softer gray

  // Toolbar - modern styling
  barTextColor: '#475569',
  barSelectedColor: '#1570ef',
  barBg: '#ffffff',
  barHoverColor: '#2e90fa', // lighter blue on hover

  // Form colors - clean inputs
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputTextColor: '#0f172a',
  inputBorderRadius: 8,

  // Button colors - vibrant and modern
  buttonBg: '#1570ef',
  buttonBorder: '#1570ef',
  booleanBg: '#f1f5f9',
  booleanSelectedBg: '#1570ef',

  // Typography - modern font stack
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode: '"Fira Code", "Monaco", "Courier New", monospace',
});

// Dark theme for modern dark mode support
export const darkTheme = create({
  base: 'dark',
  
  // Branding
  brandTitle: '✨ Purity Design System',
  brandUrl: 'https://github.com/gagan-malik/purity-design-system',
  brandImage: undefined,
  brandTarget: '_blank',

  // Color palette - dark mode friendly
  colorPrimary: '#60a5fa', // brighter blue for dark mode
  colorSecondary: '#a78bfa', // purple accent

  // UI colors - dark and modern
  appBg: '#0f172a', // dark slate
  appContentBg: '#1e293b', // slightly lighter
  appPreviewBg: '#1e293b',
  appBorderColor: '#334155', // subtle borders
  appBorderRadius: 12,

  // Text colors - high contrast for dark mode
  textColor: '#f1f5f9', // light gray
  textInverseColor: '#0f172a',
  textMutedColor: '#94a3b8', // muted gray

  // Toolbar - dark styling
  barTextColor: '#cbd5e1',
  barSelectedColor: '#60a5fa',
  barBg: '#1e293b',
  barHoverColor: '#3b82f6',

  // Form colors - dark inputs
  inputBg: '#1e293b',
  inputBorder: '#475569',
  inputTextColor: '#f1f5f9',
  inputBorderRadius: 8,

  // Button colors - vibrant on dark
  buttonBg: '#3b82f6',
  buttonBorder: '#3b82f6',
  booleanBg: '#334155',
  booleanSelectedBg: '#60a5fa',

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode: '"Fira Code", "Monaco", "Courier New", monospace',
});

// Export light theme as default
export default lightTheme;

